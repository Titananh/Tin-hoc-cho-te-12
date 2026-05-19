import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { submitCode } from '@/lib/judge0';
import { validateCodeSecurity } from '@/lib/code-security';

// Maximum code length
const MAX_CODE_LENGTH = 10000;

// Maximum submissions per project per user
const MAX_SUBMISSIONS_PER_PROJECT = 20;

// XP reward for first 100% completion
const PROJECT_XP_REWARD = 500;

interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

/**
 * POST /api/projects/[projectId]/submit
 * Accepts { code: string }
 * Runs code against project test cases.
 * Awards 500 XP on first 100% completion.
 * Max 20 submissions per project per user.
 * Vietnamese error messages.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    // 1. Require authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để nộp dự án.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const projectId = parseInt(params.projectId, 10);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'ID dự án không hợp lệ.' },
        { status: 400 }
      );
    }

    // 2. Parse request body
    let body: { code?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ.' },
        { status: 400 }
      );
    }

    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Vui lòng nhập code để nộp dự án.' },
        { status: 400 }
      );
    }

    // 3. Validate code length
    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          error: `Code không được vượt quá ${MAX_CODE_LENGTH.toLocaleString()} ký tự. Hiện tại: ${code.length.toLocaleString()} ký tự.`,
        },
        { status: 400 }
      );
    }

    // 4. Security validation
    const securityResult = validateCodeSecurity(code);
    if (!securityResult.isValid) {
      return NextResponse.json(
        { error: securityResult.error },
        { status: 400 }
      );
    }

    // 5. Fetch project from database
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('is_published', true)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Không tìm thấy dự án này.' },
        { status: 404 }
      );
    }

    // 6. Check user level requirement
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('level, xp')
      .eq('id', userId)
      .single();

    const userLevel = userData?.level ?? 0;
    const minLevelRequired = project.min_level_required ?? 1;

    if (userLevel < minLevelRequired) {
      return NextResponse.json(
        {
          error: `Bạn cần đạt cấp độ ${minLevelRequired} để nộp dự án này. Cấp độ hiện tại của bạn: ${userLevel}.`,
        },
        { status: 403 }
      );
    }

    // 7. Check submission limit (max 20 per project per user)
    const { count: submissionCount } = await supabaseAdmin
      .from('project_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('project_id', projectId);

    if ((submissionCount ?? 0) >= MAX_SUBMISSIONS_PER_PROJECT) {
      return NextResponse.json(
        {
          error: `Bạn đã đạt giới hạn ${MAX_SUBMISSIONS_PER_PROJECT} lần nộp cho dự án này. Không thể nộp thêm.`,
        },
        { status: 429 }
      );
    }

    // 8. Get test cases for the project
    const testCases: TestCase[] = (project.test_cases as TestCase[]) ?? [];

    if (testCases.length === 0) {
      return NextResponse.json(
        { error: 'Dự án này chưa có test case. Vui lòng liên hệ quản trị viên.' },
        { status: 500 }
      );
    }

    // 9. Execute code against each test case
    let passedCount = 0;
    const totalTests = testCases.length;
    const results: Array<{
      testCase: number;
      passed: boolean;
      actualOutput: string | null;
      expectedOutput: string | null;
    }> = [];

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];

      try {
        const execResult = await submitCode(code, tc.input);

        // Compare output (trim trailing whitespace/newline)
        const actualOutput = execResult.stdout.replace(/\s+$/, '');
        const expectedOutput = tc.expected_output.replace(/\s+$/, '');
        const passed = execResult.status === 'success' && actualOutput === expectedOutput;

        if (passed) {
          passedCount++;
        }

        // Hidden test cases: don't reveal details
        if (tc.is_hidden) {
          results.push({
            testCase: i + 1,
            passed,
            actualOutput: null,
            expectedOutput: null,
          });
        } else {
          results.push({
            testCase: i + 1,
            passed,
            actualOutput: execResult.status === 'success' ? execResult.stdout : execResult.stderr,
            expectedOutput: tc.expected_output,
          });
        }
      } catch (error) {
        results.push({
          testCase: i + 1,
          passed: false,
          actualOutput: tc.is_hidden ? null : (error instanceof Error ? error.message : 'Lỗi thực thi'),
          expectedOutput: tc.is_hidden ? null : tc.expected_output,
        });
      }
    }

    // 10. Calculate score
    const score = Math.round((passedCount / totalTests) * 100);

    // 11. Store submission
    const { error: insertError } = await supabaseAdmin
      .from('project_submissions')
      .insert({
        user_id: userId,
        project_id: projectId,
        code,
        score,
        status: score === 100 ? 'accepted' : 'failed',
        submitted_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Lỗi khi lưu bài nộp dự án:', insertError);
      return NextResponse.json(
        { error: 'Đã xảy ra lỗi khi lưu bài nộp. Vui lòng thử lại.' },
        { status: 500 }
      );
    }

    // 12. Award XP on first 100% completion
    let xpEarned = 0;

    if (score === 100) {
      // Check if project was previously completed
      const { data: previousCompletion } = await supabaseAdmin
        .from('project_submissions')
        .select('id')
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .eq('score', 100)
        .limit(2);

      // If this is the first 100% submission (only 1 record with score 100 = the one we just inserted)
      const previouslyCompleted = previousCompletion && previousCompletion.length > 1;

      if (!previouslyCompleted) {
        xpEarned = project.xp_reward ?? PROJECT_XP_REWARD;

        // Log XP transaction
        await supabaseAdmin
          .from('xp_logs')
          .insert({
            user_id: userId,
            amount: xpEarned,
            reason: `Hoàn thành dự án: ${project.title}`,
          });

        // Update user total XP
        if (userData) {
          const newXp = (userData.xp ?? 0) + xpEarned;
          await supabaseAdmin
            .from('users')
            .update({ xp: newXp })
            .eq('id', userId);
        }
      }
    }

    // 13. Build response message
    let message: string;
    if (score === 100) {
      message = xpEarned > 0
        ? `Xuất sắc! Bạn đã hoàn thành dự án và nhận được ${xpEarned} XP!`
        : 'Xuất sắc! Bạn đã hoàn thành dự án!';
    } else if (score >= 70) {
      message = `Bạn đã vượt qua ${passedCount}/${totalTests} test case (${score}%). Gần hoàn thành rồi!`;
    } else if (score >= 40) {
      message = `Bạn đã vượt qua ${passedCount}/${totalTests} test case (${score}%). Hãy kiểm tra lại logic và thử lại.`;
    } else {
      message = `Bạn mới vượt qua ${passedCount}/${totalTests} test case (${score}%). Hãy xem lại yêu cầu dự án và thử lại.`;
    }

    return NextResponse.json({
      score,
      passed: passedCount,
      total: totalTests,
      results,
      xpEarned,
      message,
      submissions_remaining: MAX_SUBMISSIONS_PER_PROJECT - ((submissionCount ?? 0) + 1),
    });
  } catch (error) {
    console.error('Lỗi khi nộp dự án:', error);

    // Handle known Judge0 errors
    if (error instanceof Error && error.message.startsWith('Dịch vụ')) {
      return NextResponse.json(
        { error: error.message },
        { status: 503 }
      );
    }

    if (error instanceof Error && error.message.startsWith('Không thể')) {
      return NextResponse.json(
        { error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi chấm dự án. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
