import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';
import { submitCode } from '@/lib/judge0';

// Code length limit
const MAX_CODE_LENGTH = 10000;

interface TestCase {
  id: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
  order_index: number;
}

interface TestResultItem {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

/**
 * POST /api/admin/exercises/[exerciseId]/test
 * Allows admin to test a solution code against all test cases of an exercise.
 * This is a simpler version of the student submission endpoint - no XP, no storage, just test and return results.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    // 1. Require admin authorization
    const guard = await requireAdmin();
    if (guard) return guard;

    const { exerciseId } = params;
    const parsedId = parseInt(exerciseId, 10);

    if (!exerciseId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ.' },
        { status: 400 }
      );
    }

    // 2. Parse request body - accepts { code: string }
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
        { error: 'Vui lòng nhập code để kiểm tra.' },
        { status: 400 }
      );
    }

    if (code.trim().length === 0) {
      return NextResponse.json(
        { error: 'Code không được để trống.' },
        { status: 400 }
      );
    }

    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          error: `Code không được vượt quá ${MAX_CODE_LENGTH.toLocaleString()} ký tự. Hiện tại: ${code.length.toLocaleString()} ký tự.`,
        },
        { status: 400 }
      );
    }

    // 3. Verify exercise exists
    const { data: exercise, error: exerciseError } = await supabaseAdmin
      .from('exercises')
      .select('id, title')
      .eq('id', parsedId)
      .single();

    if (exerciseError || !exercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập.' },
        { status: 404 }
      );
    }

    // 4. Fetch test cases from database
    const { data: testCases, error: tcError } = await supabaseAdmin
      .from('test_cases')
      .select('*')
      .eq('exercise_id', parsedId)
      .order('order_index', { ascending: true });

    if (tcError) {
      console.error('Lỗi khi tải test cases:', tcError);
      return NextResponse.json(
        { error: 'Không thể tải test cases. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (!testCases || testCases.length === 0) {
      return NextResponse.json(
        { error: 'Bài tập này chưa có test case nào. Vui lòng thêm test case trước khi kiểm tra.' },
        { status: 400 }
      );
    }

    // 5. Run code against all test cases via Judge0 API
    const results: TestResultItem[] = [];
    let passedCount = 0;

    for (const tc of testCases as TestCase[]) {
      try {
        const execResult = await submitCode(code, tc.input);

        // Compare actual output with expected output
        // Exact string match after trimming trailing whitespace/newline
        const actualOutput = execResult.stdout.replace(/\s+$/, '');
        const expectedOutput = tc.expected_output.replace(/\s+$/, '');
        const passed = execResult.status === 'success' && actualOutput === expectedOutput;

        if (passed) {
          passedCount++;
        }

        results.push({
          input: tc.input,
          expectedOutput: tc.expected_output,
          actualOutput: execResult.status === 'success' ? execResult.stdout : execResult.stderr,
          passed,
        });
      } catch (error) {
        // If Judge0 fails for a test case, mark it as failed
        results.push({
          input: tc.input,
          expectedOutput: tc.expected_output,
          actualOutput: error instanceof Error ? error.message : 'Lỗi thực thi code',
          passed: false,
        });
      }
    }

    const total = testCases.length;
    const allPassed = passedCount === total;

    // 6. Return results
    return NextResponse.json({
      passed: passedCount,
      total,
      results,
      allPassed,
    });
  } catch (error) {
    console.error('Lỗi khi kiểm tra bài tập:', error);

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
      { error: 'Đã xảy ra lỗi khi kiểm tra code. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
