'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DailyMetric {
  date: string;
  count: number;
}

interface CourseCompletion {
  levelId: number;
  title: string;
  completionRate: number;
}

interface AnalyticsData {
  dailyActiveUsers: DailyMetric[];
  lessonsCompletedPerDay: DailyMetric[];
  exercisesSubmittedPerDay: DailyMetric[];
  topCoursesByCompletion: CourseCompletion[];
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

// ─── Bar Chart Component ─────────────────────────────────────────────────────

function BarChart({
  data,
  color,
  label,
}: {
  data: DailyMetric[];
  color: string;
  label: string;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const barWidth = Math.max(8, Math.floor(600 / data.length) - 4);
  const chartHeight = 140;
  const chartWidth = data.length * (barWidth + 4);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        {label}
      </h3>
      <div className="overflow-x-auto">
        <svg
          width="100%"
          height={chartHeight + 30}
          viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
          preserveAspectRatio="xMidYMid meet"
          className="min-w-[400px]"
        >
          {data.map((item, i) => {
            const barHeight = maxCount > 0 ? (item.count / maxCount) * chartHeight : 0;
            const x = i * (barWidth + 4);
            const y = chartHeight - barHeight;

            return (
              <g key={item.date}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  rx={3}
                  fill={color}
                  opacity={item.count > 0 ? 0.85 : 0.15}
                >
                  <title>{`${formatShortDate(item.date)}: ${item.count}`}</title>
                </rect>
                {i % Math.ceil(data.length / 7) === 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 16}
                    textAnchor="middle"
                    className="fill-gray-400 dark:fill-gray-500"
                    fontSize="9"
                  >
                    {formatShortDate(item.date)}
                  </text>
                )}
              </g>
            );
          })}
          <text
            x={chartWidth - 4}
            y={12}
            textAnchor="end"
            className="fill-gray-400 dark:fill-gray-500"
            fontSize="10"
          >
            max: {maxCount}
          </text>
        </svg>
      </div>
    </div>
  );
}

// ─── Completion Rate Chart ───────────────────────────────────────────────────

function CompletionRateChart({ data }: { data: CourseCompletion[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Tỷ lệ hoàn thành theo khóa học
      </h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
          Chưa có dữ liệu.
        </p>
      ) : (
        <div className="space-y-3">
          {data.map((course) => (
            <div key={course.levelId} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 dark:text-gray-300 w-40 truncate flex-shrink-0">
                {course.title}
              </span>
              <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(course.completionRate, 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
                {course.completionRate.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
        >
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="h-36 bg-gray-100 dark:bg-gray-700/50 rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Main Analytics Page ─────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/dashboard');

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Không thể tải dữ liệu phân tích');
      }

      const json = await res.json();

      // Map from dashboard API response to analytics data
      const analyticsData: AnalyticsData = {
        dailyActiveUsers: json.engagementMetrics?.dailyActiveUsers || [],
        lessonsCompletedPerDay: json.engagementMetrics?.lessonsCompletedPerDay || [],
        exercisesSubmittedPerDay: json.engagementMetrics?.exercisesSubmittedPerDay || [],
        topCoursesByCompletion: json.topCoursesByCompletion || [],
      };

      setData(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // ─── Loading ───────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          📊 Phân tích & Thống kê
        </h1>
        <AnalyticsSkeleton />
      </div>
    );
  }

  // ─── Error ─────────────────────────────────────────────────────────────────

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
            onClick={fetchAnalytics}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
        Phân tích & Thống kê
      </h1>

      <div className="space-y-6">
        {/* Người dùng hoạt động hàng ngày (30 ngày) */}
        <BarChart
          data={data.dailyActiveUsers}
          color="#3B82F6"
          label="👥 Người dùng hoạt động hàng ngày (30 ngày)"
        />

        {/* Bài học hoàn thành mỗi ngày (7 ngày) */}
        <BarChart
          data={data.lessonsCompletedPerDay}
          color="#10B981"
          label="📚 Bài học hoàn thành mỗi ngày (7 ngày)"
        />

        {/* Bài tập nộp mỗi ngày (7 ngày) */}
        <BarChart
          data={data.exercisesSubmittedPerDay}
          color="#F59E0B"
          label="💻 Bài tập nộp mỗi ngày (7 ngày)"
        />

        {/* Tỷ lệ hoàn thành theo khóa học */}
        <CompletionRateChart data={data.topCoursesByCompletion} />
      </div>
    </div>
  );
}
