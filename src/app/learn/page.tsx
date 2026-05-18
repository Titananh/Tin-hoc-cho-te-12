'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Sparkles,
  RefreshCw,
  ListChecks,
  Puzzle,
  FolderOpen,
  Target,
  Brain,
  Zap,
  Rocket,
  Trophy,
  Play
} from 'lucide-react';

interface Level {
  id: number;
  slug: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  lessons: number;
  description: string;
  progress: number;
  status: 'completed' | 'current' | 'locked';
}

const levels: Level[] = [
  {
    id: 1,
    slug: 'nhap-mon-python',
    title: 'Nhập môn Python',
    icon: Sparkles,
    color: '#3B82F6',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500',
    lessons: 8,
    description: 'Làm quen với Python, biến, kiểu dữ liệu và câu lệnh cơ bản',
    progress: 100,
    status: 'completed',
  },
  {
    id: 2,
    slug: 'dieu-kien-va-vong-lap',
    title: 'Điều kiện và Vòng lặp',
    icon: RefreshCw,
    color: '#8B5CF6',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500',
    lessons: 6,
    description: 'If/else, for, while và các toán tử so sánh',
    progress: 100,
    status: 'completed',
  },
  {
    id: 3,
    slug: 'cau-truc-du-lieu-co-ban',
    title: 'Cấu trúc dữ liệu cơ bản',
    icon: ListChecks,
    color: '#06B6D4',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500',
    lessons: 8,
    description: 'List, tuple, dictionary, set và các thao tác cơ bản',
    progress: 100,
    status: 'completed',
  },
  {
    id: 4,
    slug: 'ham-va-tu-duy-lap-trinh',
    title: 'Hàm và Tư duy lập trình',
    icon: Puzzle,
    color: '#10B981',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500',
    lessons: 6,
    description: 'Định nghĩa hàm, tham số, giá trị trả về và tư duy modular',
    progress: 60,
    status: 'current',
  },
  {
    id: 5,
    slug: 'xu-ly-file-va-ngoai-le',
    title: 'Xử lý file và Ngoại lệ',
    icon: FolderOpen,
    color: '#F97316',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
    lessons: 5,
    description: 'Đọc/ghi file, try/except, xử lý lỗi và debug',
    progress: 0,
    status: 'locked',
  },
  {
    id: 6,
    slug: 'lap-trinh-huong-doi-tuong',
    title: 'Lập trình hướng đối tượng',
    icon: Target,
    color: '#EF4444',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500',
    lessons: 6,
    description: 'Class, object, inheritance, polymorphism và encapsulation',
    progress: 0,
    status: 'locked',
  },
  {
    id: 7,
    slug: 'thuat-toan-cho-lop-12',
    title: 'Thuật toán cho học sinh lớp 12',
    icon: Brain,
    color: '#EC4899',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500',
    lessons: 8,
    description: 'Sắp xếp, tìm kiếm, đệ quy, quy hoạch động',
    progress: 0,
    status: 'locked',
  },
  {
    id: 8,
    slug: 'python-nang-cao',
    title: 'Python nâng cao',
    icon: Zap,
    color: '#6366F1',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500',
    lessons: 5,
    description: 'Decorator, generator, context manager, metaclasses',
    progress: 0,
    status: 'locked',
  },
  {
    id: 9,
    slug: 'ung-dung-thuc-te',
    title: 'Ứng dụng thực tế',
    icon: Rocket,
    color: '#14B8A6',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500',
    lessons: 6,
    description: 'Web scraping, API, automation và các project thực tế',
    progress: 0,
    status: 'locked',
  },
  {
    id: 10,
    slug: 'du-an-cuoi-khoa',
    title: 'Dự án cuối khóa',
    icon: Trophy,
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500',
    lessons: 4,
    description: 'Xây dựng project hoàn chỉnh, portfolio và thuyết trình',
    progress: 0,
    status: 'locked',
  },
];

function LevelCard({ level, index }: { level: Level; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = level.icon;
  const isLocked = level.status === 'locked';
  const isCompleted = level.status === 'completed';
  const isCurrent = level.status === 'current';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Connecting line */}
      {index < levels.length - 1 && (
        <div 
          className="absolute left-6 top-16 w-0.5 h-full -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, ${level.color}40, ${levels[index + 1].color}40)`
          }}
        />
      )}

      <Link href={isLocked ? '#' : `/lesson/${level.slug}`}>
        <div
          className={`
            relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-300
            ${isLocked 
              ? 'bg-surface/50 border-border cursor-not-allowed opacity-60' 
              : isCurrent 
                ? 'bg-surface border-border hover:border-primary glow-primary' 
                : 'bg-surface border-border hover:shadow-lg hover:-translate-y-1'
            }
          `}
          style={{
            boxShadow: isCurrent ? `0 0 30px ${level.color}30` : undefined,
          }}
        >
          {/* Level number circle */}
          <div 
            className={`
              relative z-10 flex items-center justify-center w-12 h-12 rounded-full shrink-0
              ${isLocked ? 'bg-muted/20' : isCompleted ? 'bg-success' : isCurrent ? '' : ''}
            `}
            style={{
              background: isLocked ? undefined : level.color,
              boxShadow: isCurrent ? `0 0 20px ${level.color}50` : undefined,
            }}
          >
            {isLocked ? (
              <Lock className="w-5 h-5 text-muted" />
            ) : isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
              <Icon className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-muted">Cấp độ {level.id}</span>
              {isCurrent && (
                <span 
                  className="px-2 py-0.5 text-xs font-medium rounded-full text-white"
                  style={{ background: level.color }}
                >
                  Đang học
                </span>
              )}
            </div>
            
            <h3 className={`text-lg font-semibold mb-1 ${isLocked ? 'text-muted' : ''}`}>
              {level.title}
            </h3>
            
            <p className={`text-sm mb-3 ${isLocked ? 'text-muted/60' : 'text-muted'}`}>
              {level.description}
            </p>

            {/* Lessons count and progress */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-muted" />
                <span className="text-sm text-muted">{level.lessons} bài học</span>
              </div>
              
              {!isLocked && (
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${level.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: level.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted">{level.progress}%</span>
                </div>
              )}
            </div>

            {/* Play button for current level */}
            {isCurrent && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white"
                  style={{ background: level.color }}
                >
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Python Master 12
          </div>
          <h1 className="text-4xl font-bold mb-3 gradient-text">
            Lộ trình học Python
          </h1>
          <p className="text-lg text-muted">
            Từ zero đến hero trong 10 cấp độ
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-surface rounded-xl p-4 text-center border border-border">
            <div className="text-2xl font-bold text-success">3</div>
            <div className="text-sm text-muted">Hoàn thành</div>
          </div>
          <div className="bg-surface rounded-xl p-4 text-center border border-border">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-sm text-muted">Đang học</div>
          </div>
          <div className="bg-surface rounded-xl p-4 text-center border border-border">
            <div className="text-2xl font-bold text-muted">6</div>
            <div className="text-sm text-muted">Khóa mở</div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-4">
          {levels.map((level, index) => (
            <LevelCard key={level.id} level={level} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-muted mb-4">
            Hoàn thành tất cả cấp độ để nhận chứng chỉ hoàn thành khóa học!
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 text-amber-600 font-medium">
            <Trophy className="w-5 h-5" />
            Chứng chỉ hoàn thành
          </div>
        </motion.div>
      </div>
    </div>
  );
}