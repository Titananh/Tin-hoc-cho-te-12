'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  streak_count: number;
  created_at: string;
  last_active: string | null;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search change
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (role) params.set('role', role);

      const res = await fetch(`/api/admin/users?${params.toString()}`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể tải danh sách người dùng');
      }

      const data = await res.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    setPage(1);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Chưa hoạt động';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleBadge = (userRole: string) => {
    if (userRole === 'admin') {
      return (
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          Quản trị viên
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
        Học sinh
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý người dùng
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Xem và quản lý tất cả người dùng trên hệ thống
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Role filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="role-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Vai trò:
          </label>
          <select
            id="role-filter"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          >
            <option value="">Tất cả</option>
            <option value="student">Học sinh</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
      </div>

      {/* Stats summary */}
      {pagination && !loading && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Hiển thị {users.length} / {pagination.total} người dùng
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
            onClick={fetchUsers}
            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Users table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Tên
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Email
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Vai trò
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Cấp độ
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                XP
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Hoạt động cuối
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {debouncedSearch || role
                    ? 'Không tìm thấy người dùng phù hợp với bộ lọc.'
                    : 'Chưa có người dùng nào trong hệ thống.'}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => router.push(`/admin/users/${user.id}`)}
                  className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {user.level}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {user.xp?.toLocaleString('vi-VN') ?? 0}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(user.last_active)}
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
