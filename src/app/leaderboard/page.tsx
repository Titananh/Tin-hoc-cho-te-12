'use client';

import { useState, useEffect, useCallback } from 'react';

type Period = 'daily' | 'weekly' | 'monthly' | 'all';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
  rankChange: number;
}

interface CurrentUser {
  rank: number;
  name: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
  inTop100: boolean;
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  currentUser: CurrentUser | null;
  period: string;
}

const periodTabs: { key: Period; label: string }[] = [
  { key: 'daily', label: 'Hôm nay' },
  { key: 'weekly', label: 'Tuần này' },
  { key: 'monthly', label: 'Tháng này' },
  { key: 'all', label: 'Tất cả' },
];

/**
 * Leaderboard Page - Bảng xếp hạng
 * Hiển thị top 100 users theo XP.
 * Hỗ trợ lọc theo period (daily/weekly/monthly/all).
 * Highlight user hiện tại.
 * Responsive, dark mode, Vietnamese text.
 */
export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [period, setPeriod] = useState<Period>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async (selectedPeriod: Period) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/leaderboard?period=${selectedPeriod}`);

      if (!res.ok) {
        if (res.status === 401) {
          setError('Bạn cần đăng nhập để xem bảng xếp hạng');
        } else {
          setError('Không thể tải bảng xếp hạng. Vui lòng thử lại sau.');
        }
        return;
      }

      const result = await res.json();
      setData(result);
    } catch {
      setError('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard(period);
  }, [period, fetchLeaderboard]);

  // Rank change indicator
  const RankChange = ({ change }: { change: number }) => {
    if (change > 0) {
      return (
        <span className="inline-flex items-center text-xs font-medium text-green-600 dark:text-green-400">
          <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {change}
        </span>
      );
    }
    if (change < 0) {
      return (
        <span className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400">
          <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {Math.abs(change)}
        </span>
      );
    }
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
    );
  };

  // Rank medal for top 3
  const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return <span className="text-xl" aria-label="Hạng 1">🥇</span>;
    if (rank === 2) return <span className="text-xl" aria-label="Hạng 2">🥈</span>;
    if (rank === 3) return <span className="text-xl" aria-label="Hạng 3">🥉</span>;
    return (
      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 w-8 text-center">
        {rank}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            🏆 Bảng Xếp Hạng
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Top 100 học viên có điểm XP cao nhất
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1" aria-label="Lọc theo thời gian">
            {periodTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPeriod(tab.key)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  period === tab.key
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-current={period === tab.key ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={() => fetchLeaderboard(period)}
              className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Đang tải bảng xếp hạng...</p>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {!isLoading && !error && data && (
          <>
            {/* Current User Card (if not in top 100) */}
            {data.currentUser && !data.currentUser.inTop100 && (
              <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                  Vị trí của bạn
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300 w-8 text-center">
                    #{data.currentUser.rank}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {data.currentUser.avatarUrl ? (
                      <img
                        src={data.currentUser.avatarUrl}
                        alt={data.currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        {data.currentUser.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                      {data.currentUser.name}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Cấp {data.currentUser.level}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                    {data.currentUser.xp.toLocaleString('vi-VN')} XP
                  </span>
                </div>
              </div>
            )}

            {/* Table */}
            {data.leaderboard.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <span className="text-4xl" role="img" aria-label="Trống">📊</span>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Chưa có dữ liệu xếp hạng cho khoảng thời gian này
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="col-span-1 text-center">Hạng</div>
                  <div className="col-span-5">Học viên</div>
                  <div className="col-span-2 text-center">Cấp độ</div>
                  <div className="col-span-2 text-right">XP</div>
                  <div className="col-span-2 text-center">Thay đổi</div>
                </div>

                {/* Table Body */}
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {data.leaderboard.map((entry) => {
                    const isCurrentUser =
                      data.currentUser && String(entry.userId) === String(data.currentUser.rank) ? false :
                      data.currentUser?.inTop100 && data.currentUser.rank === entry.rank;

                    return (
                      <li
                        key={entry.userId}
                        className={`grid grid-cols-12 gap-2 px-4 py-3 items-center transition-colors ${
                          isCurrentUser
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                        }`}
                      >
                        {/* Rank */}
                        <div className="col-span-2 sm:col-span-1 flex justify-center">
                          <RankBadge rank={entry.rank} />
                        </div>

                        {/* User Info */}
                        <div className="col-span-6 sm:col-span-5 flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {entry.avatarUrl ? (
                              <img
                                src={entry.avatarUrl}
                                alt={entry.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {entry.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {entry.name}
                            {isCurrentUser && (
                              <span className="ml-1 text-xs text-blue-600 dark:text-blue-400">(Bạn)</span>
                            )}
                          </span>
                        </div>

                        {/* Level */}
                        <div className="hidden sm:flex col-span-2 justify-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            Lv.{entry.level}
                          </span>
                        </div>

                        {/* XP */}
                        <div className="col-span-3 sm:col-span-2 text-right">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {entry.xp.toLocaleString('vi-VN')}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-0.5">XP</span>
                        </div>

                        {/* Rank Change */}
                        <div className="hidden sm:flex col-span-2 justify-center">
                          <RankChange change={entry.rankChange} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
