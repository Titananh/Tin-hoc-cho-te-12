'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Newspaper,
  Clock,
  User,
  Eye,
  Heart,
  TrendingUp,
  Sparkles,
  Filter,
} from 'lucide-react';

type BlogCategory = 'all' | 'noi-bat' | 'xu-huong' | 'moi-nhat' | 'huong-dan';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readMinutes: number;
  views: number;
  likes: number;
  coverEmoji: string;
  tags: string[];
}

const POSTS: BlogPost[] = [
  {
    slug: 'lo-trinh-hoc-python-cho-hoc-sinh-12',
    title: 'Lộ trình học Python cho học sinh lớp 12 từ A đến Z',
    excerpt: 'Hướng dẫn chi tiết các bước học Python từ kiến thức cơ bản đến nâng cao theo SGK Cánh Diều, giúp bạn tự tin thi tốt nghiệp THPT và chuẩn bị vào đại học CNTT.',
    category: 'noi-bat',
    author: 'Thầy Nguyễn Minh',
    authorAvatar: 'N',
    publishedAt: '2026-05-18',
    readMinutes: 8,
    views: 12450,
    likes: 892,
    coverEmoji: '🐍',
    tags: ['Python', 'Lớp 12', 'Lộ trình'],
  },
  {
    slug: 'top-10-cau-hoi-thi-tot-nghiep-tin-hoc',
    title: 'Top 10 dạng câu hỏi thi tốt nghiệp THPT môn Tin học 2026',
    excerpt: 'Phân tích cấu trúc đề thi mới nhất, chiến lược làm bài và các lỗi thường gặp để tránh.',
    category: 'xu-huong',
    author: 'Cô Trần Hằng',
    authorAvatar: 'T',
    publishedAt: '2026-05-15',
    readMinutes: 6,
    views: 8920,
    likes: 654,
    coverEmoji: '📝',
    tags: ['THPT', 'Đề thi', 'Tin học'],
  },
  {
    slug: 'thuat-toan-sap-xep-don-gian',
    title: 'Hiểu sâu các thuật toán sắp xếp đơn giản: Bubble, Selection, Insertion',
    excerpt: 'Giải thích từng thuật toán bằng hình ảnh trực quan kèm code Python và phân tích độ phức tạp.',
    category: 'huong-dan',
    author: 'Anh Phạm Tuấn',
    authorAvatar: 'P',
    publishedAt: '2026-05-12',
    readMinutes: 10,
    views: 5670,
    likes: 423,
    coverEmoji: '🔢',
    tags: ['Thuật toán', 'Sắp xếp'],
  },
  {
    slug: 'lam-game-doan-so-bang-python',
    title: 'Làm game đoán số bằng Python trong 30 phút',
    excerpt: 'Dự án Python đầu tay đơn giản nhưng đầy đủ logic, vòng lặp, điều kiện - cực phù hợp cho học sinh mới học.',
    category: 'huong-dan',
    author: 'Em Lê Mai',
    authorAvatar: 'L',
    publishedAt: '2026-05-10',
    readMinutes: 5,
    views: 4320,
    likes: 312,
    coverEmoji: '🎮',
    tags: ['Dự án', 'Game', 'Python'],
  },
  {
    slug: 'ai-trong-giao-duc-2026',
    title: 'AI thay đổi cách học lập trình như thế nào?',
    excerpt: 'Phân tích vai trò của AI Tutor, Copilot trong việc học code của học sinh, sinh viên Việt Nam hiện nay.',
    category: 'xu-huong',
    author: 'Thầy Hoàng Vũ',
    authorAvatar: 'H',
    publishedAt: '2026-05-08',
    readMinutes: 7,
    views: 9876,
    likes: 745,
    coverEmoji: '🤖',
    tags: ['AI', 'Giáo dục'],
  },
  {
    slug: 'bi-quyet-on-tap-truoc-ki-thi',
    title: 'Bí quyết ôn tập 30 ngày cuối trước kỳ thi tốt nghiệp',
    excerpt: 'Kế hoạch ôn tập chi tiết theo tuần kèm bộ đề luyện tập, giúp bạn chinh phục điểm cao môn Tin học.',
    category: 'moi-nhat',
    author: 'Cô Nguyễn Hà',
    authorAvatar: 'N',
    publishedAt: '2026-05-19',
    readMinutes: 9,
    views: 1230,
    likes: 89,
    coverEmoji: '📚',
    tags: ['Ôn thi', 'THPT'],
  },
];

const CATEGORY_LABEL: Record<BlogCategory, string> = {
  all: 'Tất cả',
  'noi-bat': 'Nổi bật',
  'xu-huong': 'Xu hướng',
  'moi-nhat': 'Mới nhất',
  'huong-dan': 'Hướng dẫn',
};

function formatRelativeDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hôm nay';
  if (diff === 1) return 'Hôm qua';
  if (diff < 7) return `${diff} ngày trước`;
  if (diff < 30) return `${Math.floor(diff / 7)} tuần trước`;
  return d.toLocaleDateString('vi-VN');
}

export default function BlogPage() {
  const [category, setCategory] = useState<BlogCategory>('all');

  const filtered = category === 'all' ? POSTS : POSTS.filter((p) => p.category === category);
  const featured = POSTS.find((p) => p.category === 'noi-bat');
  const others = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-purple-500" />
            Chia sẻ kiến thức
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Bài viết từ cộng đồng giáo viên, học sinh và lập trình viên Việt Nam
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {(Object.keys(CATEGORY_LABEL) as BlogCategory[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === c
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {category === 'all' && featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="block bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-shadow group"
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">
                  <Sparkles className="w-3 h-3" /> NỔI BẬT
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="text-7xl">{featured.coverEmoji}</div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:underline">
                    {featured.title}
                  </h2>
                  <p className="text-white/85 mb-4 line-clamp-2">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {featured.readMinutes} phút đọc
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> {featured.views.toLocaleString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4" /> {featured.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(category === 'all' ? others : filtered).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow h-full group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center text-6xl">
                  {post.coverEmoji}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold text-[10px]">
                        {post.authorAvatar}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <span>{formatRelativeDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readMinutes} phút
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views.toLocaleString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" /> {post.likes}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Chưa có bài viết nào trong mục này
          </div>
        )}
      </div>
    </div>
  );
}
