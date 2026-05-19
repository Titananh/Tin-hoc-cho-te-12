'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_hours: number;
  is_published: boolean;
  xp_reward: number;
  created_at: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [page, setPage] = useState(1);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (difficultyFilter) params.set('difficulty', difficultyFilter);

      const res = await fetch(`/api/admin/projects?${params.toString()}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể tải danh sách dự án');
      }

      const data = await res.json();
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, difficultyFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDifficultyChange = (value: string) => {
    setDifficultyFilter(value);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể xóa dự án');
      }

      setDeleteTarget(null);
      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi xóa');
    } finally {
      setDeleting(false);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Dễ
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Trung bình
          </span>
        );
      case 'hard':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
            Khó
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý dự án
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Xem, tạo và quản lý tất cả dự án lập trình trên hệ thống
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Tạo dự án mới
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="difficulty-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Độ khó:
          </label>
          <select
            id="difficulty-filter"
            value={difficultyFilter}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          >
            <option value="">Tất cả</option>
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
        </div>
      </div>

      {/* Stats summary */}
      {pagination && !loading && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Hiển thị {projects.length} / {pagination.total} dự án
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
            onClick={() => { setError(null); fetchProjects(); }}
            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Projects table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Tiêu đề
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Độ khó
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Thời gian (giờ)
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Xuất bản
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
                  <td className="px-4 py-3"><div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" /></td>
                </tr>
              ))
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {debouncedSearch || difficultyFilter
                    ? 'Không tìm thấy dự án phù hợp với bộ lọc.'
                    : 'Chưa có dự án nào trong hệ thống.'}
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      {project.description && (
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {getDifficultyBadge(project.difficulty)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {project.estimated_hours || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {project.is_published ? (
                      <span className="inline-flex items-center gap-1 text-green-700 dark:text-green-400">
                        <CheckCircleIcon className="h-4 w-4" />
                        Đã xuất bản
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <DraftIcon className="h-4 w-4" />
                        Bản nháp
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <EditIcon className="mr-1 h-3.5 w-3.5" />
                        Sửa
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="inline-flex items-center rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm transition-colors hover:bg-red-50 dark:border-red-700 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <TrashIcon className="mr-1 h-3.5 w-3.5" />
                        Xóa
                      </button>
                    </div>
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

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Xác nhận xóa dự án
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Bạn có chắc chắn muốn xóa dự án{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                &ldquo;{deleteTarget.title}&rdquo;
              </span>
              ? Hành động này không thể hoàn tác và sẽ xóa tất cả bài nộp liên quan.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  'Xóa dự án'
                )}
              </button>
            </div>
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

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function DraftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
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

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
