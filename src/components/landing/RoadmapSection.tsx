'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  BookOpen, GitBranch, Database, FunctionSquare, FileCode2, 
  ChevronRight 
} from 'lucide-react';

interface Level {
  id: number;
  icon: React.ElementType;
  title: string;
  lessonCount: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

const levels: Level[] = [
  {
    id: 1,
    icon: BookOpen,
    title: 'Nhập môn Python',
    lessonCount: 8,
    color: '#3B82F6',
    bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    borderColor: 'border-blue-500/30 dark:border-blue-500/50',
  },
  {
    id: 2,
    icon: GitBranch,
    title: 'Điều kiện và Vòng lặp',
    lessonCount: 10,
    color: '#8B5CF6',
    bgColor: 'bg-violet-500/10 dark:bg-violet-500/20',
    borderColor: 'border-violet-500/30 dark:border-violet-500/50',
  },
  {
    id: 3,
    icon: Database,
    title: 'Cấu trúc dữ liệu',
    lessonCount: 12,
    color: '#06B6D4',
    bgColor: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    borderColor: 'border-cyan-500/30 dark:border-cyan-500/50',
  },
  {
    id: 4,
    icon: FunctionSquare,
    title: 'Hàm và Tư duy lập trình',
    lessonCount: 10,
    color: '#10B981',
    bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    borderColor: 'border-emerald-500/30 dark:border-emerald-500/50',
  },
  {
    id: 5,
    icon: FileCode2,
    title: 'Xử lý file và Ngoại lệ',
    lessonCount: 8,
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    borderColor: 'border-amber-500/30 dark:border-amber-500/50',
  },
];

function LevelCard({ level, index }: { level: Level; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = level.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative group"
    >
      {/* Gradient line connector - hidden on mobile, shown on tablet+ */}
      {index < levels.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 h-0.5 w-12 lg:w-16 z-0">
          <div 
            className="h-full w-full"
            style={{
              background: `linear-gradient(90deg, ${level.color} 0%, ${levels[index + 1].color} 100%)`,
            }}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{ backgroundColor: levels[index + 1].color }}
          />
        </div>
      )}

      <div 
        className={`
          relative p-5 lg:p-6 rounded-2xl lg:rounded-3xl 
          border-2 backdrop-blur-sm transition-all duration-300
          ${level.bgColor} ${level.borderColor}
          group-hover:shadow-lg group-hover:scale-[1.02]
        `}
        style={{
          boxShadow: `0 4px 20px ${level.color}20`,
        }}
      >
        {/* Level number badge */}
        <div 
          className="absolute -top-3 -left-3 w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-lg"
          style={{ backgroundColor: level.color }}
        >
          {level.id}
        </div>

        {/* Icon */}
        <div 
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${level.color}20` }}
        >
          <Icon className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: level.color }} />
        </div>

        {/* Content */}
        <h3 className="font-semibold text-base lg:text-lg mb-2 pr-4" style={{ color: level.color }}>
          {level.title}
        </h3>
        <p className="text-sm text-muted">
          {level.lessonCount} bài học
        </p>

        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${level.color}40`,
          }}
        />

        {/* Arrow indicator on hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
          <ChevronRight className="w-5 h-5" style={{ color: level.color }} />
        </div>
      </div>
    </motion.div>
  );
}

export function RoadmapSection() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-50px' });

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Lộ trình học</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Từ cơ bản đến nâng cao, xây dựng nền tảng Python vững chắc qua 5 cấp độ
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scroll indicator */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>Kéo để xem thêm</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide snap-x snap-mandatory">
            {levels.map((level, index) => (
              <div key={level.id} className="snap-start">
                <LevelCard level={level} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {levels.map((level, index) => (
            <LevelCard key={level.id} level={level} index={index} />
          ))}
        </div>

        {/* Progress summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-medium">48 bài học</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-sm font-medium">5 cấp độ</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm font-medium">Hoàn thành trong 12 tuần</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}