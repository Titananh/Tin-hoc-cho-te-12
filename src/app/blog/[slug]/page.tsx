'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Heart, User, Share2 } from 'lucide-react';

interface BlogPostFull {
  slug: string;
  title: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readMinutes: number;
  views: number;
  likes: number;
  coverEmoji: string;
  tags: string[];
  body: string;
}

const POSTS: Record<string, BlogPostFull> = {
  'lo-trinh-hoc-python-cho-hoc-sinh-12': {
    slug: 'lo-trinh-hoc-python-cho-hoc-sinh-12',
    title: 'Lộ trình học Python cho học sinh lớp 12 từ A đến Z',
    author: 'Thầy Nguyễn Minh',
    authorAvatar: 'N',
    publishedAt: '2026-05-18',
    readMinutes: 8,
    views: 12450,
    likes: 892,
    coverEmoji: '🐍',
    tags: ['Python', 'Lớp 12', 'Lộ trình'],
    body: `## Mở đầu

Python là ngôn ngữ lập trình được Bộ Giáo dục đưa vào SGK Cánh Diều dành cho học sinh lớp 12. Bài viết này sẽ vạch ra lộ trình học rõ ràng giúp bạn vừa nắm vững kiến thức trong sách, vừa chuẩn bị tốt cho kỳ thi tốt nghiệp THPT.

## Giai đoạn 1: Kiến thức cơ bản (2 tuần)

- Cài đặt Python và môi trường lập trình.
- Biến, kiểu dữ liệu cơ bản (số, chuỗi, boolean).
- Toán tử, biểu thức, lệnh điều kiện if/elif/else.

## Giai đoạn 2: Cấu trúc lặp và hàm (3 tuần)

- Vòng lặp for, while.
- Định nghĩa hàm, tham số, giá trị trả về.
- Bài tập thực hành: tính giai thừa, dãy Fibonacci, kiểm tra số nguyên tố.

## Giai đoạn 3: Cấu trúc dữ liệu (3 tuần)

- Danh sách (list), tuple, set.
- Từ điển (dict) - cực kỳ hữu ích.
- Chuỗi và xử lý văn bản.

## Giai đoạn 4: Tệp tin và thuật toán (3 tuần)

- Đọc/ghi file .txt và .csv.
- Thuật toán sắp xếp, tìm kiếm.
- Bài toán quy hoạch động cơ bản.

## Mẹo ôn thi

1. Làm đề thi mẫu của Bộ ít nhất 5 lần.
2. Ghi chép từng dạng bài và cách tiếp cận.
3. Sử dụng AI Tutor khi bí.

Chúc các bạn học tốt! 🎓`,
  },
  'top-10-cau-hoi-thi-tot-nghiep-tin-hoc': {
    slug: 'top-10-cau-hoi-thi-tot-nghiep-tin-hoc',
    title: 'Top 10 dạng câu hỏi thi tốt nghiệp THPT môn Tin học 2026',
    author: 'Cô Trần Hằng',
    authorAvatar: 'T',
    publishedAt: '2026-05-15',
    readMinutes: 6,
    views: 8920,
    likes: 654,
    coverEmoji: '📝',
    tags: ['THPT', 'Đề thi', 'Tin học'],
    body: `Đề thi tốt nghiệp THPT môn Tin học năm 2026 tập trung vào 10 dạng chính sau:

1. **Đọc - viết code Python cơ bản** (15% câu hỏi)
2. **Lệnh điều kiện và vòng lặp** (20%)
3. **Hàm và đệ quy** (15%)
4. **Cấu trúc dữ liệu list/dict** (15%)
5. **Xử lý chuỗi** (10%)
6. **Đọc/ghi tệp** (5%)
7. **Thuật toán sắp xếp & tìm kiếm** (10%)
8. **Bài toán thực tế** (5%)
9. **Phân tích độ phức tạp** (3%)
10. **Câu hỏi lý thuyết về máy tính** (2%)

Hãy luyện tập đều mỗi dạng và làm đề thử để đo thời gian.`,
  },
};

const FALLBACK: BlogPostFull = {
  slug: '',
  title: 'Bài viết không tồn tại',
  author: '',
  authorAvatar: '',
  publishedAt: '',
  readMinutes: 0,
  views: 0,
  likes: 0,
  coverEmoji: '📭',
  tags: [],
  body: 'Bài viết này hiện chưa có nội dung. Vui lòng quay lại sau.',
};

function formatDate(s: string): string {
  if (!s) return '';
  return new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' });
}

function renderBody(body: string): React.ReactNode {
  // Very small markdown-ish renderer: ## headings, bullet lists, **bold**, paragraphs
  const lines = body.split('\n');
  const out: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  function flushList() {
    if (listBuffer.length) {
      out.push(
        <ul key={out.length} className="list-disc pl-5 my-3 space-y-1">
          {listBuffer.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      );
      listBuffer = [];
    }
  }
  function renderInline(s: string) {
    return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      out.push(
        <h2 key={out.length} className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      listBuffer.push(line.replace(/^\d+\.\s/, ''));
    } else {
      flushList();
      out.push(
        <p
          key={out.length}
          className="text-slate-700 dark:text-slate-300 leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: renderInline(line) }}
        />
      );
    }
  }
  flushList();
  return out;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = POSTS[params.slug] ?? FALLBACK;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách bài viết
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
        >
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center text-8xl">
            {post.coverEmoji}
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold text-[10px]">
                    {post.authorAvatar}
                  </div>
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {formatDate(post.publishedAt)} • {post.readMinutes} phút đọc
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> {post.views.toLocaleString('vi-VN')}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" /> {post.likes}
              </span>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {renderBody(post.body)}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
