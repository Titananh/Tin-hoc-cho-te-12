'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Code2,
  Zap,
  Tag,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ArrowUpDown,
  BarChart3,
  Trophy,
  Target,
  Flame,
  X,
} from 'lucide-react';
import { PROBLEM_BANK, type Problem } from '@/lib/problem-bank';
import { PROBLEM_BANK_2 } from '@/lib/problem-bank-part2';
import { PROBLEM_BANK_3 } from '@/lib/problem-bank-part3';
import { getSolvedProblems } from '@/lib/solved-tracker';

// ==================== TYPES ====================
type Difficulty = 'easy' | 'medium' | 'hard';
type Status = 'solved' | 'tried' | 'unsolved';
type SortField = 'id' | 'title' | 'difficulty' | 'acceptanceRate';
type SortOrder = 'asc' | 'desc';

interface PracticeProblem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  acceptanceRate: number;
  xp: number;
  status: Status;
}

// ==================== ORIGINAL 20 PROBLEMS ====================
const ORIGINAL_PROBLEMS: PracticeProblem[] = [
  { id: 1, slug: 'hello-world', title: 'Hello World - In Ra Màn Hình', difficulty: 'easy', tags: ['Nhập xuất', 'Cơ bản'], acceptanceRate: 95, xp: 10, status: 'unsolved' },
  { id: 2, slug: 'tinh-tong-hai-so', title: 'Tính Tổng Hai Số', difficulty: 'easy', tags: ['Toán', 'Nhập xuất'], acceptanceRate: 92, xp: 10, status: 'unsolved' },
  { id: 3, slug: 'kiem-tra-chan-le', title: 'Kiểm Tra Chẵn Lẻ', difficulty: 'easy', tags: ['Điều kiện', 'Toán'], acceptanceRate: 90, xp: 10, status: 'unsolved' },
  { id: 4, slug: 'tim-so-lon-nhat', title: 'Tìm Số Lớn Nhất Trong 3 Số', difficulty: 'easy', tags: ['Điều kiện', 'Logic'], acceptanceRate: 88, xp: 10, status: 'unsolved' },
  { id: 5, slug: 'tinh-giai-thua', title: 'Tính Giai Thừa', difficulty: 'easy', tags: ['Vòng lặp', 'Toán'], acceptanceRate: 85, xp: 15, status: 'unsolved' },
  { id: 6, slug: 'day-fibonacci', title: 'Dãy Fibonacci', difficulty: 'easy', tags: ['Vòng lặp', 'Toán'], acceptanceRate: 80, xp: 15, status: 'unsolved' },
  { id: 7, slug: 'dem-nguyen-am', title: 'Đếm Nguyên Âm Trong Chuỗi', difficulty: 'easy', tags: ['Chuỗi', 'Vòng lặp'], acceptanceRate: 82, xp: 10, status: 'unsolved' },
  { id: 8, slug: 'dao-nguoc-chuoi', title: 'Đảo Ngược Chuỗi', difficulty: 'easy', tags: ['Chuỗi', 'Cơ bản'], acceptanceRate: 87, xp: 10, status: 'unsolved' },
  { id: 9, slug: 'kiem-tra-so-nguyen-to', title: 'Kiểm Tra Số Nguyên Tố', difficulty: 'medium', tags: ['Toán', 'Vòng lặp'], acceptanceRate: 65, xp: 25, status: 'unsolved' },
  { id: 10, slug: 'sap-xep-noi-bot', title: 'Sắp Xếp Nổi Bọt', difficulty: 'medium', tags: ['Mảng', 'Sắp xếp'], acceptanceRate: 60, xp: 25, status: 'unsolved' },
  { id: 11, slug: 'tim-kiem-nhi-phan', title: 'Tìm Kiếm Nhị Phân', difficulty: 'medium', tags: ['Mảng', 'Tìm kiếm'], acceptanceRate: 58, xp: 25, status: 'unsolved' },
  { id: 12, slug: 'dem-tu-trong-chuoi', title: 'Đếm Từ Trong Chuỗi', difficulty: 'medium', tags: ['Chuỗi', 'Vòng lặp'], acceptanceRate: 62, xp: 25, status: 'unsolved' },
  { id: 13, slug: 'ma-tran-chuyen-vi', title: 'Ma Trận Chuyển Vị', difficulty: 'medium', tags: ['Mảng', 'Ma trận'], acceptanceRate: 55, xp: 30, status: 'unsolved' },
  { id: 14, slug: 'xoa-phan-tu-trung', title: 'Xóa Phần Tử Trùng Lặp', difficulty: 'medium', tags: ['Mảng', 'Hash Set'], acceptanceRate: 63, xp: 25, status: 'unsolved' },
  { id: 15, slug: 'chuyen-doi-co-so', title: 'Chuyển Đổi Cơ Số', difficulty: 'medium', tags: ['Toán', 'Chuỗi'], acceptanceRate: 50, xp: 30, status: 'unsolved' },
  { id: 16, slug: 'thap-ha-noi', title: 'Tháp Hà Nội', difficulty: 'hard', tags: ['Đệ quy', 'Thuật toán'], acceptanceRate: 40, xp: 50, status: 'unsolved' },
  { id: 17, slug: 'sap-xep-nhanh', title: 'Sắp Xếp Nhanh (Quick Sort)', difficulty: 'hard', tags: ['Mảng', 'Sắp xếp', 'Đệ quy'], acceptanceRate: 38, xp: 50, status: 'unsolved' },
  { id: 18, slug: 'bai-toan-n-queen', title: 'Bài Toán N-Queen', difficulty: 'hard', tags: ['Đệ quy', 'Quay lui'], acceptanceRate: 32, xp: 50, status: 'unsolved' },
  { id: 19, slug: 'duong-di-ngan-nhat', title: 'Đường Đi Ngắn Nhất (BFS)', difficulty: 'hard', tags: ['Đồ thị', 'BFS'], acceptanceRate: 35, xp: 50, status: 'unsolved' },
  { id: 20, slug: 'quy-hoach-dong-co-ban', title: 'Quy Hoạch Động - Bài Cơ Bản', difficulty: 'hard', tags: ['Quy hoạch động', 'Thuật toán'], acceptanceRate: 30, xp: 50, status: 'unsolved' },
];

// ==================== BUILD UNIFIED PROBLEM LIST ====================
function buildProblemList(): PracticeProblem[] {
  const problems: PracticeProblem[] = [...ORIGINAL_PROBLEMS];

  // Add PROBLEM_BANK (50 problems, IDs 151-200)
  for (const pb of PROBLEM_BANK) {
    problems.push({
      id: pb.id,
      slug: pb.slug,
      title: pb.title,
      difficulty: pb.difficulty,
      tags: pb.tags,
      acceptanceRate: pb.acceptanceRate,
      xp: pb.xp,
      status: 'unsolved',
    });
  }

  // Add PROBLEM_BANK_2 (50 problems, IDs 201-250)
  for (const pb of PROBLEM_BANK_2) {
    problems.push({
      id: pb.id,
      slug: pb.slug,
      title: pb.title,
      difficulty: pb.difficulty,
      tags: pb.tags,
      acceptanceRate: pb.acceptanceRate,
      xp: pb.xp,
      status: 'unsolved',
    });
  }

  // Add PROBLEM_BANK_3 (50 problems, IDs 251-300)
  for (const pb of PROBLEM_BANK_3) {
    problems.push({
      id: pb.id,
      slug: pb.slug,
      title: pb.title,
      difficulty: pb.difficulty,
      tags: pb.tags,
      acceptanceRate: pb.acceptanceRate,
      xp: pb.xp,
      status: 'unsolved',
    });
  }

  return problems;
}

const ALL_PROBLEMS = buildProblemList();

// ==================== CONSTANTS ====================
const ITEMS_PER_PAGE = 20;

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
};

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  easy: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  medium: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  hard: 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800',
};

const DIFFICULTY_ORDER: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 };

const STATUS_ICON: Record<Status, string> = {
  solved: '✅',
  tried: '⭕',
  unsolved: '⬜',
};

const TAG_COLORS: Record<string, string> = {
  'Toán': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Mảng': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Chuỗi': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'Vòng lặp': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Đệ quy': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'Sắp xếp': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Tìm kiếm': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'Điều kiện': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Nhập xuất': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Cơ bản': 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300',
  'Logic': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Hash Set': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Ma trận': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Đồ thị': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'BFS': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Quy hoạch động': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  'Quay lui': 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  'Thuật toán': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
}

const ALL_TAGS = Array.from(new Set(ALL_PROBLEMS.flatMap((p) => p.tags))).sort();


// ==================== COMPONENT ====================
export default function PracticePage() {
  // Filter states
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');

  // Sort states
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Tag cloud expanded
  const [showAllTags, setShowAllTags] = useState(false);

  // Solved problems from localStorage
  const [solvedSlugs, setSolvedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSolvedSlugs(getSolvedProblems());
  }, []);

  // Get problem status (for now all unsolved — no persistence)
  const getStatus = useCallback((id: number): Status => {
    const problem = ALL_PROBLEMS.find(p => p.id === id);
    if (problem && solvedSlugs.has(problem.slug)) return 'solved';
    return 'unsolved';
  }, [solvedSlugs]);

  // Filtered and sorted problems
  const filteredProblems = useMemo(() => {
    let result = ALL_PROBLEMS.map(p => ({ ...p, status: getStatus(p.id) }));

    // Apply filters
    if (difficulty !== 'all') {
      result = result.filter(p => p.difficulty === difficulty);
    }
    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
    }
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.id.toString() === q
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'id':
          cmp = a.id - b.id;
          break;
        case 'title':
          cmp = a.title.localeCompare(b.title, 'vi');
          break;
        case 'difficulty':
          cmp = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
          break;
        case 'acceptanceRate':
          cmp = a.acceptanceRate - b.acceptanceRate;
          break;
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, difficulty, selectedTags, statusFilter, sortField, sortOrder, getStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  // Stats
  const stats = useMemo(() => ({
    total: ALL_PROBLEMS.length,
    easy: ALL_PROBLEMS.filter(p => p.difficulty === 'easy').length,
    medium: ALL_PROBLEMS.filter(p => p.difficulty === 'medium').length,
    hard: ALL_PROBLEMS.filter(p => p.difficulty === 'hard').length,
    solved: ALL_PROBLEMS.filter(p => solvedSlugs.has(p.slug)).length,
  }), [solvedSlugs]);

  // Random problem
  const goToRandomProblem = () => {
    const unsolved = filteredProblems.filter(p => p.status === 'unsolved');
    const pool = unsolved.length > 0 ? unsolved : ALL_PROBLEMS;
    const random = pool[Math.floor(Math.random() * pool.length)];
    window.location.href = `/practice/${random.slug}`;
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setDifficulty('all');
    setSelectedTags([]);
    setStatusFilter('all');
    setSortField('id');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || difficulty !== 'all' || selectedTags.length > 0 || statusFilter !== 'all';

  // Toggle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ==================== PAGE HEADER ==================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            🏋️ Luyện Tập
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Rèn luyện tư duy lập trình qua {stats.total} bài tập từ cơ bản đến nâng cao. Giải bài, tích XP, trở thành lập trình viên giỏi!
          </p>
        </motion.div>

        {/* ==================== STATS CARDS ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Tổng cộng</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Dễ</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.easy}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Trung bình</span>
            </div>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.medium}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Khó</span>
            </div>
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{stats.hard}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Đã giải</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.solved}/{stats.total}</p>
          </div>
        </motion.div>

        {/* ==================== FILTER BAR ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm bài tập theo tên, tag, hoặc ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
              {search && (
                <button onClick={() => { setSearch(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value as 'all' | Difficulty); setCurrentPage(1); }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Tất cả độ khó</option>
              <option value="easy">🟢 Dễ</option>
              <option value="medium">🟡 Trung bình</option>
              <option value="hard">🔴 Khó</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as 'all' | Status); setCurrentPage(1); }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="solved">✅ Đã giải</option>
              <option value="tried">⭕ Đã thử</option>
              <option value="unsolved">⬜ Chưa giải</option>
            </select>

            {/* Sort */}
            <select
              value={`${sortField}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
                setSortField(field);
                setSortOrder(order);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="id-asc">Sắp xếp: ID ↑</option>
              <option value="id-desc">Sắp xếp: ID ↓</option>
              <option value="title-asc">Sắp xếp: Tên A-Z</option>
              <option value="title-desc">Sắp xếp: Tên Z-A</option>
              <option value="difficulty-asc">Sắp xếp: Dễ → Khó</option>
              <option value="difficulty-desc">Sắp xếp: Khó → Dễ</option>
              <option value="acceptanceRate-asc">Sắp xếp: Tỉ lệ ↑</option>
              <option value="acceptanceRate-desc">Sắp xếp: Tỉ lệ ↓</option>
            </select>

            {/* Random Button */}
            <button
              onClick={goToRandomProblem}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden sm:inline">Ngẫu nhiên</span>
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <X className="w-4 h-4" />
                Xóa lọc
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Hiển thị {filteredProblems.length} / {stats.total} bài tập</span>
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className="w-3 h-3" />
                {selectedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"
                  >
                    {tag} <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ==================== TAG CLOUD ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chủ đề:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(showAllTags ? ALL_TAGS : ALL_TAGS.slice(0, 12)).map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  selectedTags.includes(tag)
                    ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-900 scale-105'
                    : 'hover:scale-105'
                } ${getTagColor(tag)} border-transparent`}
              >
                {tag}
                {selectedTags.includes(tag) && ' ✓'}
              </button>
            ))}
            {ALL_TAGS.length > 12 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                {showAllTags ? 'Thu gọn' : `+${ALL_TAGS.length - 12} thêm`}
              </button>
            )}
          </div>
        </motion.div>

        {/* ==================== PROBLEM TABLE (Desktop) ==================== */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-[40px_60px_1fr_200px_100px_80px_60px] gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="text-center">TT</div>
              <button onClick={() => handleSort('id')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                # {sortField === 'id' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <button onClick={() => handleSort('title')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Tiêu đề {sortField === 'title' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <div>Tags</div>
              <button onClick={() => handleSort('difficulty')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Độ khó {sortField === 'difficulty' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <button onClick={() => handleSort('acceptanceRate')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                AC% {sortField === 'acceptanceRate' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <div className="text-center">XP</div>
            </div>

            {/* Table Body */}
            <AnimatePresence mode="popLayout">
              {paginatedProblems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  <Code2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">Không tìm thấy bài tập nào</p>
                  <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </motion.div>
              ) : (
                paginatedProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Link
                      href={`/practice/${problem.slug}`}
                      className="grid grid-cols-[40px_60px_1fr_200px_100px_80px_60px] gap-2 px-4 py-3 items-center border-b border-gray-100 dark:border-gray-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                    >
                      {/* Status */}
                      <div className="text-center text-lg">{STATUS_ICON[problem.status]}</div>
                      {/* ID */}
                      <div className="text-sm font-mono text-gray-500 dark:text-gray-400">{problem.id}</div>
                      {/* Title */}
                      <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {problem.title}
                      </div>
                      {/* Tags */}
                      <div className="flex gap-1 flex-wrap">
                        {problem.tags.slice(0, 3).map(tag => (
                          <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Difficulty */}
                      <div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${DIFFICULTY_COLOR[problem.difficulty]}`}>
                          {DIFFICULTY_LABEL[problem.difficulty]}
                        </span>
                      </div>
                      {/* Acceptance Rate */}
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {problem.acceptanceRate}%
                      </div>
                      {/* XP */}
                      <div className="text-center">
                        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-yellow-600 dark:text-yellow-400">
                          <Zap className="w-3 h-3" />
                          {problem.xp}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ==================== PROBLEM CARDS (Mobile) ==================== */}
        <div className="lg:hidden">
          <AnimatePresence mode="popLayout">
            {paginatedProblems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                <Code2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">Không tìm thấy bài tập nào</p>
                <p className="text-sm mt-1">Thử thay đổi bộ lọc</p>
              </motion.div>
            ) : (
              <div className="grid gap-3">
                {paginatedProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      href={`/practice/${problem.slug}`}
                      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{STATUS_ICON[problem.status]}</span>
                          <span className="text-xs font-mono text-gray-400">#{problem.id}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${DIFFICULTY_COLOR[problem.difficulty]}`}>
                          {DIFFICULTY_LABEL[problem.difficulty]}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {problem.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {problem.tags.slice(0, 3).map(tag => (
                          <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          AC: {problem.acceptanceRate}%
                        </span>
                        <span className="flex items-center gap-0.5 font-bold text-yellow-600 dark:text-yellow-400">
                          <Zap className="w-3 h-3" />
                          {problem.xp} XP
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ==================== PAGINATION ==================== */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {getPageNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                  page === currentPage
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              Trang {currentPage} / {totalPages}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
