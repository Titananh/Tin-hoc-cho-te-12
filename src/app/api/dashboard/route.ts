import { NextResponse } from 'next/server';
import { courses } from '@/data/content';
import { topics } from '@/data/canhdieu';
import { badges } from '@/data/content';
import { Lesson, TopicCode } from '@/types';

/**
 * GET /api/dashboard — Dữ liệu dashboard cho học sinh.
 * Trả về bài gần đây, gợi ý, badges, tiến độ theo chủ đề.
 */
export async function GET() {
  // Lấy 3 bài gần nhất từ canhdieu (ưu tiên) + content
  const recentLessons: Lesson[] = [];

  // Bài đầu tiên từ mỗi chủ đề nặng (D, E, G_CS)
  for (const topic of topics) {
    if (['D', 'E', 'G_CS'].includes(topic.id) && topic.lessons.length > 0) {
      recentLessons.push(topic.lessons[0]);
    }
    if (recentLessons.length >= 3) break;
  }

  // Gợi ý bài tiếp theo (bài 2 của chủ đề D — SQL)
  const suggestedLesson = topics.find(t => t.id === 'D')?.lessons[1] || null;

  // Tiến độ theo chủ đề (mock — 0% vì chưa có tracking thật)
  const topicProgress: { topic_code: TopicCode; completed: number; total: number }[] =
    topics.map(t => ({
      topic_code: t.id,
      completed: 0,
      total: t.lessons.length,
    }));

  // Tổng số bài
  let totalLessons = 0;
  for (const topic of topics) totalLessons += topic.lessons.length;
  for (const course of courses) {
    for (const mod of course.modules) totalLessons += mod.lessons.length;
  }

  // Weekly progress (mock static — sẽ replace khi có DB)
  const weeklyProgress = [
    { day: 'T2', xp: 0 },
    { day: 'T3', xp: 0 },
    { day: 'T4', xp: 0 },
    { day: 'T5', xp: 0 },
    { day: 'T6', xp: 0 },
    { day: 'T7', xp: 0 },
    { day: 'CN', xp: 0 },
  ];

  return NextResponse.json({
    recent_lessons: recentLessons,
    suggested_lesson: suggestedLesson,
    weekly_progress: weeklyProgress,
    badges: badges.slice(0, 4),
    topic_progress: topicProgress,
    total_lessons: totalLessons,
    completed_lessons: 0,
  });
}
