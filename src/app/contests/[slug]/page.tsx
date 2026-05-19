'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Clock,
  Users,
  Calendar,
  Medal,
  Code2,
} from 'lucide-react';

interface ContestDetail {
  slug: string;
  title: string;
  description: string;
  startAt: string;
  durationMinutes: number;
  participants: number;
  prize: string;
  rules: string[];
  problems: Array<{ id: string; title: string; difficulty: string; xp: number }>;
}

const CONTESTS: Record<string, ContestDetail> = {
  'thi-tin-12-thang-5-2026': {
    slug: 'thi-tin-12-thang-5-2026',
    title: 'Thi Tin học 12 - Tháng 5/2026',
    description: 'Cuộc thi hàng tháng dành cho học sinh lớp 12 chuẩn bị thi tốt nghiệp THPT.',
    startAt: '2026-05-25T19:00:00',
    durationMinutes: 120,
    participants: 348,
    prize: '300,000đ + Huy hiệu Vô địch tháng',
    rules: [
      'Mỗi thí sinh được chấm tự động theo test case ẩn',
      'Không được trao đổi đáp án trong khi thi',
      'Có thể nộp lại tối đa 5 lần / bài',
      'Thí sinh điểm cao + thời gian sớm nhất sẽ thắng',
    ],
    problems: [
      { id: 'tinh-tong-2-so', title: 'Tính tổng 2 số nguyên', difficulty: 'Dễ', xp: 100 },
      { id: 'kiem-tra-chan-le', title: 'Kiểm tra chẵn lẻ', difficulty: 'Dễ', xp: 100 },
      { id: 'kiem-tra-so-nguyen-to', title: 'Kiểm tra số nguyên tố', difficulty: 'Dễ', xp: 200 },
      { id: 'fibonacci', title: 'Dãy Fibonacci', difficulty: 'TB', xp: 300 },
      { id: 'sap-xep-noi-bot', title: 'Sắp xếp nổi bọt', difficulty: 'TB', xp: 300 },
    ],
  },
};

function formatDate(s: string): string {
  const d = new Date(s);
  return d.toLocaleString('vi-VN');
}

export default function ContestDetailPage() {
  const params = useParams<{ slug: string }>();
  const contest = CONTESTS[params.slug];

  if (!contest) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Cuộc thi không tồn tại
          </h2>
          <Link href="/contests" className="text-blue-600 hover:underline">
            ← Quay lại danh sách cuộc thi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/contests"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-amber-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách cuộc thi
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl mb-6"
        >
          <div className="flex items-start gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{contest.title}</h1>
              <p className="text-white/85 mt-1">{contest.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/20 text-sm">
            <div>
              <div className="opacity-80 text-xs flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Bắt đầu</div>
              <div className="font-semibold mt-0.5">{formatDate(contest.startAt)}</div>
            </div>
            <div>
              <div className="opacity-80 text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Thời gian</div>
              <div className="font-semibold mt-0.5">{contest.durationMinutes} phút</div>
            </div>
            <div>
              <div className="opacity-80 text-xs flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Tham gia</div>
              <div className="font-semibold mt-0.5">{contest.participants.toLocaleString('vi-VN')}</div>
            </div>
            <div>
              <div className="opacity-80 text-xs flex items-center gap-1"><Medal className="w-3.5 h-3.5" /> Giải thưởng</div>
              <div className="font-semibold mt-0.5 text-xs">{contest.prize}</div>
            </div>
          </div>
          <button className="mt-5 px-6 py-2.5 bg-white text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors shadow-md">
            Đăng ký tham gia
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Rules */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Thể lệ</h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {contest.rules.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold flex-shrink-0">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Prize */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Cơ cấu giải thưởng</h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2"><span>🥇</span> Giải Nhất: 300,000đ + Huy hiệu</li>
              <li className="flex items-center gap-2"><span>🥈</span> Giải Nhì: 200,000đ + Huy hiệu</li>
              <li className="flex items-center gap-2"><span>🥉</span> Giải Ba: 100,000đ + Huy hiệu</li>
              <li className="flex items-center gap-2"><span>🎖️</span> Top 10: Chứng nhận tham gia</li>
              <li className="flex items-center gap-2"><span>⭐</span> Tất cả thí sinh: 50 XP</li>
            </ul>
          </motion.div>
        </div>

        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-500" />
              Bài thi ({contest.problems.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {contest.problems.map((p, i) => (
              <Link
                key={p.id}
                href={`/practice/${p.id}`}
                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-400 w-5">{i + 1}.</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {p.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {p.difficulty}
                  </span>
                  <span className="text-amber-600 font-semibold">+{p.xp} điểm</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
