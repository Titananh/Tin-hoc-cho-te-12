import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { submitCode } from '@/lib/judge0';
import { validateCodeSecurity } from '@/lib/code-security';

// Code length limit
const MAX_CODE_LENGTH = 10000;

// XP rewards by difficulty
const XP_BY_DIFFICULTY: Record<string, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
};

interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

interface TestResult {
  testCase: number;
  passed: boolean;
  actualOutput: string | null;
  expectedOutput: string | null;
}

/**
 * POST /api/exercises/[exerciseId]/submit
 * Submit code for an exercise, run against test cases, calculate score, award XP
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    // 1. Require authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để nộp bài' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const exerciseId = parseInt(params.exerciseId, 10);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ' },
        { status: 400 }
      );
    }

    // 2. Parse request body - accepts { code: string }
    let body: { code?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ' },
        { status: 400 }
      );
    }

    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Vui lòng nhập code để nộp bài' },
        { status: 400 }
      );
    }

    // 3. Validate code length (≤ 10,000 chars)
    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          error: `Code không được vượt quá ${MAX_CODE_LENGTH.toLocaleString()} ký tự. Hiện tại: ${code.length.toLocaleString()} ký tự.`,
        },
        { status: 400 }
      );
    }

    // 4. Run security checks (restricted imports/builtins)
    const securityResult = validateCodeSecurity(code);
    if (!securityResult.isValid) {
      return NextResponse.json(
        { error: securityResult.error },
        { status: 400 }
      );
    }

    // 5. Fetch exercise and test_cases from database
    const { data: exercise, error: exerciseError } = await supabaseAdmin
      .from('exercises')
      .select('id, difficulty, xp_reward, test_cases')
      .eq('id', exerciseId)
      .single();

    if (exerciseError || !exercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập này' },
        { status: 404 }
      );
    }

    const testCases: TestCase[] = (exercise.test_cases as TestCase[]) ?? [];

    if (testCases.length === 0) {
      return NextResponse.json(
        { error: 'Bài tập này chưa có test case. Vui lòng liên hệ quản trị viên.' },
        { status: 500 }
      );
    }

    // 6. Execute code against each test case via Judge0 API
    const results: TestResult[] = [];
    let passedCount = 0;
    let totalRuntime = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];

      try {
        const execResult = await submitCode(code, tc.input);
        totalRuntime += execResult.time;

        // 7. Compare actual output with expected output
        // Exact string match after trimming trailing whitespace/newline
        const actualOutput = execResult.stdout.replace(/\s+$/, '');
        const expectedOutput = tc.expected_output.replace(/\s+$/, '');
        const passed = execResult.status === 'success' && actualOutput === expectedOutput;

        if (passed) {
          passedCount++;
        }

        // 12. Hidden test cases: don't reveal input/expected in results
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
        // If Judge0 fails for a test case, mark it as failed
        if (tc.is_hidden) {
          results.push({
            testCase: i + 1,
            passed: false,
            actualOutput: null,
            expectedOutput: null,
          });
        } else {
          results.push({
            testCase: i + 1,
            passed: false,
            actualOutput: error instanceof Error ? error.message : 'Lỗi thực thi',
            expectedOutput: tc.expected_output,
          });
        }
      }
    }

    const total = testCases.length;

    // 8. Calculate score as (passed / total) × 100, rounded to nearest integer
    const score = Math.round((passedCount / total) * 100);

    // Determine status
    const status = score === 100 ? 'accepted' : 'failed';

    // 9. Store submission in submissions table
    const { data: submission, error: insertError } = await supabaseAdmin
      .from('submissions')
      .insert({
        user_id: userId,
        exercise_id: exerciseId,
        code,
        status,
        runtime: totalRuntime,
        score,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error storing submission:', insertError);
      return NextResponse.json(
        { error: 'Đã xảy ra lỗi khi lưu bài nộp. Vui lòng thử lại.' },
        { status: 500 }
      );
    }

    // 10. If score = 100 and exercise not previously completed: award XP
    let xpEarned = 0;

    if (score === 100) {
      // Check if exercise was previously completed by this user
      const { data: previousCompletion } = await supabaseAdmin
        .from('submissions')
        .select('id')
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId)
        .eq('score', 100)
        .neq('id', submission.id)
        .limit(1);

      const previouslyCompleted = previousCompletion && previousCompletion.length > 0;

      if (!previouslyCompleted) {
        // Award XP based on difficulty
        const difficulty = exercise.difficulty as string;
        xpEarned = XP_BY_DIFFICULTY[difficulty] ?? 10;

        // Log XP transaction
        await supabaseAdmin
          .from('xp_logs')
          .insert({
            user_id: userId,
            amount: xpEarned,
            reason: `Hoàn thành bài tập #${exerciseId}`,
          });

        // Update user total XP
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('xp')
          .eq('id', userId)
          .single();

        if (userData) {
          const newXp = (userData.xp ?? 0) + xpEarned;
          await supabaseAdmin
            .from('users')
            .update({ xp: newXp })
            .eq('id', userId);
        }
      }
    }

    // 11. Build response message
    let message: string;
    if (score === 100) {
      message = xpEarned > 0
        ? `Chúc mừng! Bạn đã hoàn thành bài tập và nhận được ${xpEarned} XP!`
        : 'Chúc mừng! Bạn đã hoàn thành bài tập!';
    } else if (score >= 50) {
      message = `Bạn đã vượt qua ${passedCount}/${total} test case. Hãy thử lại!`;
    } else {
      message = `Bạn mới vượt qua ${passedCount}/${total} test case. Hãy xem lại code và thử lại.`;
    }

    // 11. Return response
    return NextResponse.json({
      score,
      passed: passedCount,
      total,
      results,
      xpEarned,
      message,
    });
  } catch (error) {
    console.error('Error in POST /api/exercises/[exerciseId]/submit:', error);

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
      { error: 'Đã xảy ra lỗi khi chấm bài. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
