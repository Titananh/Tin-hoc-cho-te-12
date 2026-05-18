import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/data/content';
import { topics } from '@/data/canhdieu';
import { Lesson } from '@/types';

/**
 * Tìm lesson theo id hoặc slug trong CẢ HAI nguồn:
 * 1. src/data/content.ts (Python 10 levels)
 * 2. src/data/canhdieu.ts (7 chủ đề SGK)
 */
function findLesson(idOrSlug: string): Lesson | undefined {
  // Tìm trong content.ts (courses → modules → lessons)
  for (const course of courses) {
    for (const mod of course.modules) {
      const found = mod.lessons.find(
        l => l.id === idOrSlug || l.slug === idOrSlug
      );
      if (found) return found;
    }
  }

  // Tìm trong canhdieu.ts (topics → lessons)
  for (const topic of topics) {
    const found = topic.lessons.find(
      l => l.id === idOrSlug || l.slug === idOrSlug
    );
    if (found) return found;
  }

  return undefined;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const lesson = findLesson(id);

  if (!lesson) {
    return NextResponse.json(
      { error: 'Không tìm thấy bài học.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ lesson });
}
