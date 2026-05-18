'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { topics } from '@/data/canhdieu';
import { TopicCode } from '@/types';
import { BookOpen, Clock, Zap, Star, ArrowLeft, CheckCircle } from 'lucide-react';

export default function TopicDetailPage() {
  const params = useParams();
  const topicId = params.topicId as string;

  const topic = topics.find(t => t.id === topicId as TopicCode);

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy chủ đề</h1>
          <p className="text-muted mb-4">Chủ đề "{topicId}" không tồn tại.</p>
          <Link href="/chu-de" className="text-primary hover:underline">
            ← Quay lại danh sách chủ đề
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link href="/chu-de" className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} />
          <span>Quay lại danh sách chủ đề</span>
        </Link>

        {/* Topic Header */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{topic.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Chủ đề {topic.id.replace('_', '-')}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: topic.exam_weight }).map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {topic.title}
              </h1>
              <p className="text-muted mt-1">{topic.description}</p>
            </div>
          </div>

          {/* Yêu cầu cần đạt */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Yêu cầu cần đạt (theo SGK)
            </h3>
            <ul className="space-y-2">
              {topic.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Danh sách bài học */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          Bài học ({topic.lessons.length})
        </h2>

        <div className="space-y-4">
          {topic.lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/lesson/${lesson.slug}`}>
                <div className="group bg-surface rounded-xl p-5 border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Số thứ tự */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: topic.color }}
                      >
                        {idx + 1}
                      </div>

                      {/* Nội dung */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-muted truncate">{lesson.description}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="hidden md:flex items-center gap-4 ml-4 text-sm text-muted">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{lesson.estimated_minutes} phút</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap size={14} className="text-yellow-500" />
                        <span>{lesson.xp_reward} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{lesson.content.quiz.length} câu hỏi</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        lesson.difficulty === 'easy' ? 'bg-green-500/10 text-green-500' :
                        lesson.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {lesson.difficulty === 'easy' ? 'Dễ' : lesson.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ghi chú */}
        {topic.lessons.length === 0 && (
          <div className="text-center py-12 bg-surface rounded-xl border border-border">
            <p className="text-muted">🚧 Nội dung chủ đề này đang được cập nhật. Hãy quay lại sau!</p>
          </div>
        )}
      </div>
    </div>
  );
}
