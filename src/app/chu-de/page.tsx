'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { topics } from '@/data/canhdieu';
import { BookOpen, Star, ArrowRight } from 'lucide-react';

export default function ChuDePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📚 7 Chủ đề SGK Cánh Diều
          </h1>
          <p className="text-muted text-lg">
            Nội dung ôn thi Tin học 12 theo chương trình GDPT 2018. Chọn chủ đề để bắt đầu học.
          </p>
        </div>

        {/* Grid chủ đề */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, idx) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/chu-de/${topic.id}`}>
                <div
                  className="group relative bg-surface rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full"
                >
                  {/* Icon + Trọng số */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{topic.icon}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: topic.exam_weight }).map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      {Array.from({ length: 4 - topic.exam_weight }).map((_, i) => (
                        <Star key={i} size={14} className="text-muted/30" />
                      ))}
                    </div>
                  </div>

                  {/* Tên chủ đề */}
                  <h2 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    Chủ đề {topic.id.replace('_', '-')}: {topic.title}
                  </h2>

                  {/* Mô tả */}
                  <p className="text-sm text-muted mb-4 line-clamp-2">
                    {topic.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <BookOpen size={14} />
                      <span>{topic.lessons.length} bài học</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Vào học</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  {/* Color accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: topic.color }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ghi chú */}
        <div className="mt-8 p-4 bg-surface-elevated rounded-xl border border-border">
          <p className="text-sm text-muted">
            ⭐ <strong>Trọng số đề thi</strong>: Số sao thể hiện tỷ trọng chủ đề trong đề thi tốt nghiệp THPT.
            Chủ đề D (CSDL & SQL) và E (Python & Thuật toán) chiếm tỷ lệ cao nhất.
          </p>
        </div>
      </div>
    </div>
  );
}
