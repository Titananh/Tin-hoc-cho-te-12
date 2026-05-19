'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Statistics {
  totalUsers: number;
  activeUsersThisWeek: number;
  totalLessons: number;
  totalExercises: number;
  totalSubmissions: number;
  totalBadgesEarned: number;
}

interface RecentRegistration {
  name: string;
  email: string;
  createdAt: string;
}

interface DailyActiveUser {
  date: string;
  count: number;
}

interface EngagementMetrics {
  dailyActiveUsers: DailyActiveUser[];
  lessonsCompletedPerDay: { date: string; count: number }[];
  exercisesSubmittedPerDay: { date: string; count: number }[];
}

interface TopPerformer {
  userId: number;
  name: string;
  email: string;
  xpThisWeek: number;
}

interface AdminDashboardData {
  statistics: Statistics;
  recentActivity: RecentRegistration[];
  engagementMetrics: EngagementMetrics;
  topPerformers: TopPerformer[];
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-40 bg-gray-100 dark:bg-gray-700/50 rounded" />
      </div>

      {/* Table and performers skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded" />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Statistics Card Component ───────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString('vi-VN')}
          </p>
        </div>
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ─── Bar Chart Component (Inline SVG) ────────────────────────────────────────

function DailyActiveUsersChart({ data }: { data: DailyActiveUser[] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const chartHeight = 160;
  const barWidth = Math.max(6, Math.floor(700 / data.length) - 4);
  const chartWidth = data.length * (barWidth + 4);

  return (
    <div className="overflow-x-auto">
      <svg
        width="100%"
        height={chartHeight + 30}
        viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
        preserveAspectRatio="xMidYMid meet"
        className="min-w-[500px]"
      >
        {/* Bars */}
        {data.map((day, i) => {
          const barHeight = maxCount > 0 ? (day.count / maxCount) * chartHeight : 0;
          const x = i * (barWidth + 4);
          const y = chartHeight - barHeight;

          return (
            <g key={day.date}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 2)}
                rx={3}
                className="fill-blue-500 dark:fill-blue-400"
                opacity={day.count > 0 ? 1 : 0.2}
              >
                <title>{`${formatShortDate(day.date)}: ${day.count} người dùng`}</title>
              </rect>
              {/* Date label (show every 5th) */}
              {i % 5 === 0 && (
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 16}
                  textAnchor="middle"
                  className="fill-gray-400 dark:fill-gray-500 text-[9px]"
                  fontSize="9"
                >
                  {formatShortDate(day.date)}
                </text>
              )}
            </g>
          );
        })}
        {/* Y-axis max label */}
        <text
          x={chartWidth - 4}
          y={12}
          textAnchor="end"
          className="fill-gray-400 dark:fill-gray-500 text-[10px]"
          fontSize="10"
        >
          max: {maxCount}
        </text>
      </svg>
    </div>
  );
}

// ─── Recent Registrations Table ──────────────────────────────────────────────

function RecentRegistrationsTable({ registrations }: { registrations: RecentRegistration[] }) {
  if (registrations.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
        Chưa có đăng ký nào.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">
              Tên
            </th>
            <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">
              Email
            </th>
            <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">
              Ngày đăng ký
            </th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((user, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <td className="py-2.5 px-3 text-gray-900 dark:text-white font-medium">
                {user.name}
              </td>
              <td className="py-2.5 px-3 text-gray-600 dark:text-gray-300">
                {user.email}
              </td>
              <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400">
                {formatDate(user.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Top Performers Component ────────────────────────────────────────────────

function TopPerformersSection({ performers }: { performers: TopPerformer[] }) {
  if (performers.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
        Chưa có dữ liệu tuần này.
      </p>
    );
  }

  const medals = ['🥇', '🥈', '🥉', '4', '5'];

  return (
    <div className="space-y-3">
      {performers.map((performer, index) => (
        <div
          key={performer.userId}
          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold flex-shrink-0">
            {index < 3 ? (
              <span>{medals[index]}</span>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {performer.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {performer.email}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {performer.xpThisWeek.toLocaleString('vi-VN')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">XP</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Admin Dashboard Page ───────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/dashboard');

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Không thể tải dữ liệu bảng điều khiển');
      }

      const json: AdminDashboardData = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ─── Loading State ─────────────────────────────────────────────────────────

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  // ─── Error State ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{error}</p>
          <button
            onClick={fetchDashboard}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { statistics, recentActivity, engagementMetrics, topPerformers } = data;

  // ─── Main Render ───────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ─── Statistics Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Tổng người dùng"
          value={statistics.totalUsers}
          color="#3B82F6"
          icon={
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
        />
        <StatCard
          label="Hoạt động 7 ngày"
          value={statistics.activeUsersThisWeek}
          color="#10B981"
          icon={
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          }
        />
        <StatCard
          label="Tổng bài học"
          value={statistics.totalLessons}
          color="#8B5CF6"
          icon={
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          }
        />
        <StatCard
          label="Tổng bài tập"
          value={statistics.totalExercises}
          color="#F59E0B"
          icon={
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          }
        />
        <StatCard
          label="Tổng bài nộp"
          value={statistics.totalSubmissions}
          color="#06B6D4"
          icon={
            <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          }
        />
        <StatCard
          label="Huy hiệu đã trao"
          value={statistics.totalBadgesEarned}
          color="#EC4899"
          icon={
            <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.996.178-1.768.563-2.15 1.14a2.25 2.25 0 0 0 .907 3.098c.355.21.755.348 1.18.416M18.75 4.236c.996.178 1.768.563 2.15 1.14a2.25 2.25 0 0 1-.907 3.098 3.197 3.197 0 0 1-1.18.416M12 2.25a4.5 4.5 0 0 0-4.5 4.5 7.5 7.5 0 0 0 3.518 6.346 1.125 1.125 0 0 0 1.214-.058A7.5 7.5 0 0 0 16.5 6.75a4.5 4.5 0 0 0-4.5-4.5Z" />
            </svg>
          }
        />
      </div>

      {/* ─── Engagement Chart ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          Người dùng hoạt động hàng ngày (30 ngày)
        </h2>
        <DailyActiveUsersChart data={engagementMetrics.dailyActiveUsers} />
      </div>

      {/* ─── Recent Registrations + Top Performers ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registrations */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
            Đăng ký gần đây
          </h2>
          <RecentRegistrationsTable registrations={recentActivity} />
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            Top tuần này
          </h2>
          <TopPerformersSection performers={topPerformers} />
        </div>
      </div>
    </div>
  );
}
