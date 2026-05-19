'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Medal,
  Sparkles,
  Filter,
} from 'lucide-react';

type ContestStatus = 'upcoming' | 'live' | 'ended';

interface Contest {
  id: number;
  slug: string;
  title: string;
  description: string;
  startAt: string;
  durationMinutes: number;
  status: ContestStatus;
  participants: number;
  prize: string;
  difficulty: string;
}

const CONTESTS: Contest[] = [
  {
    id: 1,
    slug: 'thi-tin-12-thang-5-2026',
    title: 'Thi Tin học 12 - Tháng 5/2026',
    description: 'Cuộc thi hàng tháng dành cho học sinh lớp 12 chuẩn bị thi tốt nghiệp THPT, gồm 5 bài tập từ dễ đến khó.',
    startAt: '2026-05-25T19:00:00',
    durationMinutes: 120,
    status: 'upcoming',
    participants: 348,
    prize: '300,000đ + Huy hiệu Vô địch tháng',
    difficulty: 'Dễ - Khó',
  },
  {
    id: 2,
    slug: 'duong-dua-python-vong-1',
    title: 'Đường đua Python - Vòng 1',
    description: 'Vòng loại của giải đấu Python toàn quốc dành cho học sinh THPT.',
    startAt: '2026-05-19T20:00:00',
    durationMinutes: 90,
    status: 'live',
    participants: 1245,
    prize: '500,000đ + Suất vào vòng chung kết',
    difficulty: 'Trung bình',
  },
  {
    id: 3,
    slug: 'mini-contest-thuat-toan',
    title: 'Mini Contest - Thuật toán cơ bản',
    description: 'Bài tập thuật toán nhanh trong 30 phút, phù hợp khởi động cuối tuần.',
    startAt: '2026-05-17T15:00:00',
    durationMinutes: 30,
    status: 'ended',
    participants: 567,
    prize: 'Huy hiệu + 200 XP',
    difficulty: 'Dễ',
  },
  {
    id: 4,
    slug: 'on-thi-tot-nghiep-thpt',
    title: 'Tổng ôn Tin học THPT 2026',
    description: 'Đề thi mô phỏng kỳ thi tốt nghiệp THPT môn Tin học, theo cấu trúc Bộ Giáo dục.',
    startAt: '2026-06-15T08:00:00',
    durationMinutes: 90,
    status: 'upcoming',
    participants: 892,
    prize: 'Top 10 nhận học bổng 1,000,000đ',
    difficulty: 'Trung bình',
  },
  {
    id: 5,
    slug: 'codejam-hoc-sinh',
    title: 'CodeJam Học Sinh 2026',
    description: 'Sân chơi lập trình lớn nhất năm cho học sinh trung học, với đề khó từ chuyên gia FPT.',
    startAt: '2026-04-20T19:00:00',
    durationMinutes: 180,
    status: 'ended',
    participants: 2104,
    prize: '5,000,000đ + Cơ hội thực tập tại FPT',
    difficulty: 'Khó',
  },
];

const STATUS_LABEL: Record<ContestStatus, string> = {
  upcoming: 'Sắp diễn ra',
  live: 'Đang diễn ra',
  ended: 'Đã kết thúc',
};

const STATUS_COLOR: Record<ContestStatus, string> = {
  upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  live: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 animate-pulse',
  ended: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export default function ContestsPage() {
  const [filter, setFilter] = useState<'all' | ContestStatus>('all');

  const filtered = filter === 'all' ? CONTESTS : CONTESTS.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-3">
            <Trophy className="w-4 h-4" />
            Cuộc thi lập trình
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Tham gia thi đấu cùng các học sinh khác
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Thử sức với các bài tập thử thách, tích lũy XP, săn huy hiệu và cơ hội học bổng từ FPT
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-6 overflow-x-auto">
          {(['all', 'live', 'upcoming', 'ended'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {f === 'all' ? 'Tất cả' : STATUS_LABEL[f]}
            </button>
          ))}
        </div>

        {/* Contest cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((contest, i) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    STATUS_COLOR[contest.status]
                  }`}
                >
                  {contest.status === 'live' && <Sparkles className="w-3 h-3" />}
                  {STATUS_LABEL[contest.status]}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">
                  {contest.difficulty}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {contest.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                {contest.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(contest.startAt)}
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {contest.durationMinutes} phút
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Users className="w-3.5 h-3.5" />
                  {contest.participants.toLocaleString('vi-VN')} người tham gia
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <Medal className="w-3.5 h-3.5" />
                  Có giải thưởng
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2.5 mb-4 border border-amber-100 dark:border-amber-900/30">
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-0.5">
                  🏆 Giải thưởng
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-200">{contest.prize}</div>
              </div>

              <Link
                href={`/contests/${contest.slug}`}
                className={`block w-full text-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  contest.status === 'ended'
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                {contest.status === 'live'
                  ? 'Tham gia ngay'
                  : contest.status === 'upcoming'
                  ? 'Đăng ký tham gia'
                  : 'Xem kết quả'}
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Không có cuộc thi nào trong mục này
          </div>
        )}
      </div>
    </div>
  );
}
