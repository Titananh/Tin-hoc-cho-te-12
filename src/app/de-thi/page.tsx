'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { exams } from '@/data/exams';
import { Clock, FileText, Target, ArrowRight } from 'lucide-react';

export default function DeThiPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📝 Đề thi minh hoạ tốt nghiệp THPT
          </h1>
          <p className="text-muted text-lg">
            Luyện tập với đề thi theo đúng cấu trúc Bộ GD&ĐT: 40 câu trắc nghiệm, 50 phút.
          </p>
        </div>

        {/* Danh sách đề thi */}
        <div className="space-y-6">
          {exams.map((exam, idx) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/de-thi/${exam.slug}`}>
                <div className="group bg-surface rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {exam.title}
                      </h2>
                      <p className="text-sm text-muted mb-4">{exam.description}</p>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                        <div className="flex items-center gap-1.5">
                          <FileText size={14} />
                          <span>{exam.questions.length} câu hỏi</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{exam.duration_minutes} phút</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Target size={14} />
                          <span>Đạt: ≥ {exam.passing_score}%</span>
                        </div>
                      </div>

                      {/* Topics covered */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exam.topics.map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {t.replace('_', '-')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                      <span className="text-sm font-medium">Làm bài</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Source */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-xs text-muted">Nguồn: {exam.source}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Hướng dẫn */}
        <div className="mt-8 p-5 bg-surface-elevated rounded-xl border border-border">
          <h3 className="font-semibold text-foreground mb-2">💡 Hướng dẫn ôn thi</h3>
          <ul className="text-sm text-muted space-y-1.5">
            <li>• Làm bài đúng thời gian quy định (50 phút) để rèn luyện tốc độ.</li>
            <li>• Sau khi nộp bài, xem lại từng câu sai để hiểu giải thích.</li>
            <li>• Ưu tiên ôn chủ đề D (SQL) và E (Python/Thuật toán) vì chiếm tỷ trọng cao.</li>
            <li>• Mỗi tuần nên làm ít nhất 1 đề để duy trì phong độ.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
