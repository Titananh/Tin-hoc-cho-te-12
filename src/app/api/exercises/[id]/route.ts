import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/data/content';
import { topics } from '@/data/canhdieu';
import { Exercise } from '@/types';
import { grade } from '@/lib/grader';

/**
 * Tìm exercise theo id trong cả 2 nguồn dữ liệu.
 */
function findExercise(id: string): Exercise | undefined {
  // Trong content.ts
  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        const found = lesson.content.exercises.find(e => e.id === id);
        if (found) return found;
      }
    }
  }

  // Trong canhdieu.ts
  for (const topic of topics) {
    for (const lesson of topic.lessons) {
      const found = lesson.content.exercises.find(e => e.id === id);
      if (found) return found;
    }
  }

  return undefined;
}

/**
 * GET /api/exercises/[id] — Lấy thông tin bài tập (không kèm solution).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const exercise = findExercise(id);

  if (!exercise) {
    return NextResponse.json({ error: 'Không tìm thấy bài tập.' }, { status: 404 });
  }

  // Trả về exercise nhưng ẩn solution_code và hidden test cases
  const safeExercise = {
    ...exercise,
    solution_code: undefined,
    test_cases: exercise.test_cases.map(tc => ({
      input: tc.input,
      expected_output: tc.is_hidden ? '(ẩn)' : tc.expected_output,
      is_hidden: tc.is_hidden,
    })),
  };

  return NextResponse.json({ exercise: safeExercise });
}

/**
 * POST /api/exercises/[id] — Nộp bài, chấm điểm.
 * Body: { code: string }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const exercise = findExercise(id);

  if (!exercise) {
    return NextResponse.json({ error: 'Không tìm thấy bài tập.' }, { status: 404 });
  }

  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Thiếu code.' }, { status: 400 });
    }

    // Chấm bài bằng grader thật
    const language = exercise.language || 'python';
    const result = grade(code, exercise.test_cases, language);

    return NextResponse.json({
      status: result.status,
      score: result.score,
      message: result.message,
      details: result.details,
      xp_earned: result.status === 'accepted' ? exercise.xp_reward : 0,
    });
  } catch {
    return NextResponse.json({ error: 'Lỗi server.' }, { status: 500 });
  }
}
