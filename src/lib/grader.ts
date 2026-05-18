/**
 * Grader — Chấm bài tập Python (và SQL) bằng phân tích tĩnh output.
 *
 * Vì chưa có Pyodide, grader hoạt động theo nguyên lý:
 * 1. Trích xuất tất cả chuỗi bên trong print(...) từ code người dùng.
 * 2. So khớp với expected_output của test case.
 * 3. Nếu code phức tạp (biến, f-string có expression, input()) → trả "unsupported".
 *
 * Khi tích hợp Pyodide (Pha 5), grader sẽ chạy code thật trong Web Worker.
 */

import { TestCase, Submission } from '@/types';

export interface GradeResult {
  status: Submission['status'];
  score: number; // 0–100
  details: TestCaseResult[];
  message?: string;
}

export interface TestCaseResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

/**
 * Trích xuất output dự đoán từ code Python bằng regex.
 * Hỗ trợ:
 * - print("chuỗi") / print('chuỗi')
 * - print(f"...{biến}...") → cố gắng, nếu không resolve được thì bỏ qua
 * - Nhiều print() liên tiếp
 */
function extractPrintOutputs(code: string): string[] | null {
  const lines = code.split('\n');
  const outputs: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Bỏ qua comment
    if (trimmed.startsWith('#')) continue;

    // Match print("...") hoặc print('...')
    const printMatch = trimmed.match(
      /^print\s*\(\s*(?:f?)(["'])(.*?)\1\s*\)$/
    );
    if (printMatch) {
      let content = printMatch[2];
      // Nếu là f-string có {expression} phức tạp → trả null
      if (content.includes('{') && trimmed.includes('f"') || trimmed.includes("f'")) {
        // Có f-string → không giải quyết được nếu chứa biểu thức
        // Nhưng nếu chỉ là {biến_literal} thì cũng khó → skip
        return null;
      }
      // Xử lý escape sequences cơ bản
      content = content.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      outputs.push(content);
    }

    // Match print(số) hoặc print(biểu_thức_đơn_giản)
    const printNumMatch = trimmed.match(/^print\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
    if (printNumMatch) {
      outputs.push(printNumMatch[1]);
    }

    // Nếu có input() → unsupported
    if (trimmed.includes('input(')) {
      return null;
    }
  }

  return outputs.length > 0 ? outputs : null;
}

/**
 * Chuẩn hoá output để so sánh (bỏ trailing whitespace, lowercase không).
 */
function normalizeOutput(s: string): string {
  return s
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

/**
 * Chấm bài Python.
 */
export function gradePython(code: string, testCases: TestCase[]): GradeResult {
  const trimmedCode = code.trim();

  // Code rỗng
  if (!trimmedCode) {
    return {
      status: 'wrong',
      score: 0,
      details: [],
      message: 'Bạn chưa viết code. Hãy thử viết và nộp lại!',
    };
  }

  // Trích xuất output
  const predictedOutputs = extractPrintOutputs(trimmedCode);

  if (predictedOutputs === null) {
    // Code có input(), f-string phức tạp, hoặc không có print
    return {
      status: 'unsupported',
      score: 0,
      details: [],
      message:
        'Code của bạn sử dụng input() hoặc biểu thức phức tạp trong print(). ' +
        'Hiện tại trình chấm chỉ hỗ trợ so khớp output tĩnh. ' +
        'Hãy kiểm tra code bằng cách chạy trên máy tính của bạn.',
    };
  }

  const predictedOutput = predictedOutputs.join('\n');
  const details: TestCaseResult[] = [];
  let passedCount = 0;

  for (const tc of testCases) {
    const expected = normalizeOutput(tc.expected_output);
    const actual = normalizeOutput(predictedOutput);
    const passed = actual === expected;
    if (passed) passedCount++;

    details.push({
      input: tc.input,
      expected: tc.is_hidden ? '(ẩn)' : expected,
      actual: tc.is_hidden ? '(ẩn)' : actual,
      passed,
    });
  }

  const score = testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 0;
  const status: Submission['status'] = score === 100 ? 'accepted' : 'wrong';

  return {
    status,
    score,
    details,
    message:
      status === 'accepted'
        ? 'Chúc mừng! Code của bạn đã đúng tất cả test cases! 🎉'
        : `Đúng ${passedCount}/${testCases.length} test cases. Hãy kiểm tra lại output.`,
  };
}

/**
 * Chấm bài SQL — so khớp câu lệnh (bỏ whitespace thừa, case-insensitive).
 */
export function gradeSQL(code: string, testCases: TestCase[]): GradeResult {
  const trimmedCode = code.trim();

  if (!trimmedCode) {
    return {
      status: 'wrong',
      score: 0,
      details: [],
      message: 'Bạn chưa viết câu SQL. Hãy thử viết và nộp lại!',
    };
  }

  // Chuẩn hoá SQL: bỏ ; cuối, lowercase, bỏ whitespace thừa
  const normalizeSQL = (s: string) =>
    s
      .replace(/;$/, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const details: TestCaseResult[] = [];
  let passedCount = 0;

  for (const tc of testCases) {
    const expected = normalizeSQL(tc.expected_output);
    const actual = normalizeSQL(trimmedCode);
    const passed = actual === expected;
    if (passed) passedCount++;

    details.push({
      input: tc.input,
      expected: tc.is_hidden ? '(ẩn)' : tc.expected_output,
      actual: tc.is_hidden ? '(ẩn)' : trimmedCode,
      passed,
    });
  }

  const score = testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 0;
  const status: Submission['status'] = score === 100 ? 'accepted' : 'wrong';

  return {
    status,
    score,
    details,
    message:
      status === 'accepted'
        ? 'Câu SQL chính xác! 🎉'
        : 'Câu SQL chưa đúng. Kiểm tra lại cú pháp và điều kiện.',
  };
}

/**
 * Grader tổng hợp — tự chọn grader theo ngôn ngữ.
 */
export function grade(
  code: string,
  testCases: TestCase[],
  language: 'python' | 'sql' | 'html' | 'pseudocode' = 'python'
): GradeResult {
  switch (language) {
    case 'sql':
      return gradeSQL(code, testCases);
    case 'python':
      return gradePython(code, testCases);
    case 'html':
    case 'pseudocode':
      return {
        status: 'unsupported',
        score: 0,
        details: [],
        message: `Trình chấm ${language.toUpperCase()} đang được phát triển. Hãy tự kiểm tra kết quả.`,
      };
    default:
      return gradePython(code, testCases);
  }
}
