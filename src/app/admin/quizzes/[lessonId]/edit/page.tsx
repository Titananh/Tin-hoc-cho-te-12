'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct_answer: number;
  explanation: string;
}

interface LessonInfo {
  id: number;
  title: string;
  slug: string;
  difficulty: string;
}

export default function QuizEditorPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonInfo | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch lesson data
  const fetchLesson = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể tải thông tin bài học');
      }

      const data = await res.json();
      const lessonData = data.lesson;

      setLesson({
        id: lessonData.id,
        title: lessonData.title,
        slug: lessonData.slug,
        difficulty: lessonData.difficulty,
      });

      // Load existing quiz questions from content.quiz
      const content = lessonData.content as Record<string, unknown> | null;
      const quiz = content?.quiz as QuizQuestion[] | null;

      if (Array.isArray(quiz) && quiz.length > 0) {
        setQuestions(quiz.map((q) => ({
          question: q.question ?? '',
          options: [
            q.options?.[0] ?? '',
            q.options?.[1] ?? '',
            q.options?.[2] ?? '',
            q.options?.[3] ?? '',
          ] as [string, string, string, string],
          correct_answer: typeof q.correct_answer === 'number' ? q.correct_answer : 0,
          explanation: q.explanation ?? '',
        })));
      } else {
        // Start with one empty question
        setQuestions([createEmptyQuestion()]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  // Auto-dismiss success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  function createEmptyQuestion(): QuizQuestion {
    return {
      question: '',
      options: ['', '', '', ''],
      correct_answer: 0,
      explanation: '',
    };
  }

  // Question management
  const addQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= questions.length) return;

    setQuestions((prev) => {
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: unknown) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const newOptions = [...updated[questionIndex].options] as [string, string, string, string];
      newOptions[optionIndex] = value;
      updated[questionIndex] = { ...updated[questionIndex], options: newOptions };
      return updated;
    });
  };

  // Save quiz
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Validate before saving
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.question.trim()) {
          throw new Error(`Câu hỏi ${i + 1}: Nội dung câu hỏi không được để trống.`);
        }
        for (let j = 0; j < 4; j++) {
          if (!q.options[j].trim()) {
            throw new Error(`Câu hỏi ${i + 1}: Đáp án ${j + 1} không được để trống.`);
          }
        }
        if (!q.explanation.trim()) {
          throw new Error(`Câu hỏi ${i + 1}: Giải thích không được để trống.`);
        }
      }

      const res = await fetch('/api/admin/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson_id: parseInt(lessonId, 10),
          questions,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể lưu quiz');
      }

      setSuccessMessage('Lưu quiz thành công!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi lưu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    );
  }

  if (error && !lesson) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
        <Link
          href="/admin/quizzes"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/quizzes"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Trắc nghiệm
            </Link>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Chỉnh sửa</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Chỉnh sửa Quiz
          </h1>
          {lesson && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Bài học: <span className="font-medium">{lesson.title}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/quizzes"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Hủy
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {saving ? (
              <>
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <SaveIcon className="mr-2 h-4 w-4" />
                Lưu Quiz
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <p className="text-sm text-green-700 dark:text-green-300">{successMessage}</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Summary */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Tổng số câu hỏi: <strong className="text-gray-900 dark:text-white">{questions.length}</strong></span>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Question header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Câu hỏi {qIndex + 1}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveQuestion(qIndex, 'up')}
                  disabled={qIndex === 0}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  title="Di chuyển lên"
                >
                  <ChevronUpIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveQuestion(qIndex, 'down')}
                  disabled={qIndex === questions.length - 1}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  title="Di chuyển xuống"
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeQuestion(qIndex)}
                  disabled={questions.length <= 1}
                  className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                  title="Xóa câu hỏi"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Question text */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nội dung câu hỏi
              </label>
              <textarea
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                rows={2}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                placeholder="Nhập nội dung câu hỏi..."
              />
            </div>

            {/* Options */}
            <div className="mb-4 space-y-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Đáp án (chọn đáp án đúng)
              </label>
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correct_answer === oIndex}
                    onChange={() => updateQuestion(qIndex, 'correct_answer', oIndex)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-5">
                    {String.fromCharCode(65 + oIndex)}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    placeholder={`Đáp án ${String.fromCharCode(65 + oIndex)}`}
                  />
                  {q.correct_answer === oIndex && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      ✓ Đúng
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Giải thích đáp án
              </label>
              <textarea
                value={q.explanation}
                onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                rows={2}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                placeholder="Giải thích tại sao đáp án này đúng..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add question button */}
      <button
        onClick={addQuestion}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white py-4 text-sm font-medium text-gray-600 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:bg-blue-900/10 dark:hover:text-blue-400"
      >
        <PlusIcon className="h-5 w-5" />
        Thêm câu hỏi mới
      </button>

      {/* Bottom save button */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/admin/quizzes"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Quay lại
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {saving ? (
            <>
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <SaveIcon className="mr-2 h-4 w-4" />
              Lưu Quiz
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// --- Icon Components ---

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function SaveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
