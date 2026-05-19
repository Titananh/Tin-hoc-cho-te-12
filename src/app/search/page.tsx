'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search as SearchIcon,
  Code2,
  GraduationCap,
  Folder,
  Newspaper,
  Trophy,
} from 'lucide-react';

type ResultType = 'lesson' | 'practice' | 'project' | 'blog' | 'contest';

interface SearchResult {
  type: ResultType;
  title: string;
  description: string;
  href: string;
  tags?: string[];
}

const TYPE_META: Record<ResultType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  lesson: { label: 'Bài học', icon: GraduationCap, color: 'text-blue-500' },
  practice: { label: 'Bài luyện tập', icon: Code2, color: 'text-green-500' },
  project: { label: 'Dự án', icon: Folder, color: 'text-purple-500' },
  blog: { label: 'Bài viết', icon: Newspaper, color: 'text-pink-500' },
  contest: { label: 'Cuộc thi', icon: Trophy, color: 'text-amber-500' },
};

// Static index for dev mode — pulls together searchable items
const INDEX: SearchResult[] = [
  // Lessons (10 levels x 5)
  ...Array.from({ length: 10 }, (_, lv) =>
    Array.from({ length: 5 }, (_, i) => ({
      type: 'lesson' as const,
      title: `Cấp ${lv + 1} - Bài ${i + 1}`,
      description: `Bài học số ${i + 1} thuộc cấp ${lv + 1} theo SGK Cánh Diều`,
      href: `/learn/${lv + 1}/lessons/${lv * 5 + i + 1}`,
      tags: ['Cánh Diều', `Cấp ${lv + 1}`],
    }))
  ).flat(),
  // Practice problems
  { type: 'practice', title: 'Tính tổng 2 số nguyên', description: 'Đọc 2 số và in tổng', href: '/practice/tinh-tong-2-so', tags: ['Dễ', 'Nhập xuất'] },
  { type: 'practice', title: 'Kiểm tra chẵn lẻ', description: 'Kiểm tra số chẵn hay lẻ', href: '/practice/kiem-tra-chan-le', tags: ['Dễ', 'Điều kiện'] },
  { type: 'practice', title: 'Kiểm tra số nguyên tố', description: 'Số nguyên tố hay không', href: '/practice/kiem-tra-so-nguyen-to', tags: ['Dễ', 'Toán'] },
  { type: 'practice', title: 'Dãy Fibonacci', description: 'Tính số Fibonacci thứ N', href: '/practice/fibonacci', tags: ['TB', 'Quy hoạch động'] },
  // Projects
  { type: 'project', title: 'Máy tính đơn giản', description: 'Dự án làm máy tính bỏ túi', href: '/projects/1', tags: ['Dự án', 'Cấp 1'] },
  { type: 'project', title: 'Trò chơi đoán số', description: 'Mini game ngẫu nhiên', href: '/projects/2', tags: ['Dự án', 'Cấp 2'] },
  // Blog
  { type: 'blog', title: 'Lộ trình học Python cho học sinh lớp 12 từ A đến Z', description: 'Hướng dẫn lộ trình học Python', href: '/blog/lo-trinh-hoc-python-cho-hoc-sinh-12', tags: ['Python', 'Lớp 12'] },
  { type: 'blog', title: 'Top 10 dạng câu hỏi thi tốt nghiệp THPT môn Tin học 2026', description: 'Phân tích đề thi', href: '/blog/top-10-cau-hoi-thi-tot-nghiep-tin-hoc', tags: ['THPT'] },
  // Contests
  { type: 'contest', title: 'Thi Tin học 12 - Tháng 5/2026', description: 'Cuộc thi hàng tháng', href: '/contests', tags: ['Cuộc thi', 'Tháng 5'] },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | ResultType>('all');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return INDEX.filter((item) => {
      if (filter !== 'all' && item.type !== filter) return false;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
        >
          <SearchIcon className="w-7 h-7 text-blue-500" />
          Tìm kiếm
        </motion.h1>

        <div className="relative mb-4">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm bài học, bài tập, dự án, bài viết..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {(['all', 'lesson', 'practice', 'project', 'blog', 'contest'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {f === 'all' ? 'Tất cả' : TYPE_META[f].label}
            </button>
          ))}
        </div>

        {!query.trim() ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Nhập từ khóa để tìm kiếm
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <SearchIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600 dark:text-slate-300">
              Không tìm thấy kết quả nào cho &quot;{query}&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Tìm thấy {results.length} kết quả
            </p>
            {results.map((r, i) => {
              const meta = TYPE_META[r.type];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Link
                    href={r.href}
                    className="flex gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-300 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 ${meta.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {meta.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {r.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                        {r.description}
                      </p>
                      {r.tags && (
                        <div className="flex gap-1 mt-1.5">
                          {r.tags.map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
