'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LessonEditorForm from '../../_components/LessonEditorForm';

interface LessonData {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: Record<string, unknown>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_minutes: number;
  xp_reward: number;
  module_id: number;
  is_published: boolean;
  modules?: {
    id: number;
    title: string;
    slug: string;
    course_id: number;
    courses?: { id: number; title: string; slug: string };
  };
}

export default function EditLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLesson = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Không thể tải bài học');
      }
      const data = await res.json();
      setLesson(data.lesson);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  if (loading) {
    return <EditorSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lỗi tải bài học</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchLesson}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Thử lại
            </button>
            <button
              onClick={() => router.push('/admin/lessons')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <LessonEditorForm
      mode="edit"
      lessonId={parseInt(lessonId, 10)}
      initialData={{
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description ?? '',
        content: lesson.content,
        difficulty: lesson.difficulty,
        estimated_minutes: lesson.estimated_minutes,
        xp_reward: lesson.xp_reward,
        module_id: lesson.module_id,
        is_published: lesson.is_published,
      }}
    />
  );
}

function EditorSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
          </div>
        ))}
        <div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-40 w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
