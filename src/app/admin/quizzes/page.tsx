'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface QuizLesson {
  id: number;
  title: string;
  slug: string;
  difficulty: string;
  module_id: number;
  is_published: boolean;
  question_count: number;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function AdminQuizzesPage() {
  const [quizLessons, setQuizLessons] = useState<QuizLesson[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      if (debouncedSearch) params.set('search', debouncedSearch);

      const res = await fetch(`/api/admin/quizzes?${params.toString()}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể tải danh sách quiz');
      }

      const data = await res.json();
      setQuizLessons(data.lessons);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Cơ bản
          </span>
        );
      case 'intermediate':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Trung bình
          </span>
        );
      case 'advanced':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
            Nâng cao
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {difficulty}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý trắc nghiệm
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Xem và chỉnh sửa câu hỏi trắc nghiệm trong các bài học
          </p>
        </div>
      </div>

      {/* Search filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bài học..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Stats summary */}
      {pagination && !loading && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Hiển thị {quizLessons.length} / {pagination.total} bài học có trắc nghiệm
          {debouncedSearch && (
            <span> — kết quả tìm kiếm cho &ldquo;{debouncedSearch}&rdquo;</span>
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => { setError(null); fetchQuizzes(); }}
            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Quizzes table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Bài học
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Độ khó
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Số câu hỏi
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Trạng thái
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                </tr>
              ))
            ) : quizLessons.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {debouncedSearch
                    ? 'Không tìm thấy bài học có trắc nghiệm phù hợp.'
                    : 'Chưa có bài học nào có câu hỏi trắc nghiệm.'}
                </td>
              </tr>
            ) : (
              quizLessons.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        ID: {lesson.id}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {getDifficultyBadge(lesson.difficulty)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <span className="inline-flex items-center gap-1.5">
                      <QuestionIcon className="h-4 w-4 text-blue-500" />
                      {lesson.question_count} câu
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {lesson.is_published ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Đã xuất bản
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Bản nháp
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                    <Link
                      href={`/admin/quizzes/${lesson.id}/edit`}
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      <EditIcon className="mr-1 h-3.5 w-3.5" />
                      Sửa Quiz
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Trang {pagination.page} / {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrev}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <ChevronLeftIcon className="mr-1 h-4 w-4" />
              Trước
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNext}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Sau
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Icon Components ---

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}


// --- Quiz Editor Component ---

function QuizEditor({
  lessonTitle,
  questions,
  loading,
  saving,
  saveMessage,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onUpdateOption,
  onSave,
  onClose,
}: {
  lessonTitle: string;
  questions: QuizQuestion[];
  loading: boolean;
  saving: boolean;
  saveMessage: string | null;
  onAddQuestion: () => void;
  onRemoveQuestion: (index: number) => void;
  onUpdateQuestion: (index: number, field: keyof QuizQuestion, value: unknown) => void;
  onUpdateOption: (qIndex: number, optIndex: number, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Đang tải quiz...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa Quiz
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bài học: {lessonTitle}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          title="Đóng"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Questions list */}
      <div className="p-6 space-y-6">
        {questions.length === 0 && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
            Chưa có câu hỏi nào. Nhấn &ldquo;Thêm câu hỏi&rdquo; để bắt đầu.
          </p>
        )}

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-600"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Câu {qIndex + 1}
              </span>
              <button
                onClick={() => onRemoveQuestion(qIndex)}
                className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Xóa câu hỏi"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Question text */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nội dung câu hỏi
              </label>
              <textarea
                value={q.question}
                onChange={(e) => onUpdateQuestion(qIndex, 'question', e.target.value)}
                rows={2}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Nhập nội dung câu hỏi..."
              />
            </div>

            {/* Options */}
            <div className="mb-3 space-y-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Đáp án (chọn đáp án đúng)
              </label>
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correct_answer === optIndex}
                    onChange={() => onUpdateQuestion(qIndex, 'correct_answer', optIndex)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => onUpdateOption(qIndex, optIndex, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder={`Đáp án ${optIndex + 1}`}
                  />
                  {q.correct_answer === optIndex && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Đúng</span>
                  )}
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Giải thích
              </label>
              <textarea
                value={q.explanation}
                onChange={(e) => onUpdateQuestion(qIndex, 'explanation', e.target.value)}
                rows={2}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Giải thích tại sao đáp án đúng..."
              />
            </div>
          </div>
        ))}

        {/* Add question button */}
        <button
          onClick={onAddQuestion}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
        >
          <PlusIcon className="h-4 w-4" />
          Thêm câu hỏi
        </button>
      </div>

      {/* Footer with save */}
      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
        <div>
          {saveMessage && (
            <p className={`text-sm ${saveMessage.includes('thành công') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {saveMessage}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            disabled={saving || questions.length === 0}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              'Lưu quiz'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
