'use client';

import React from 'react';
import { motion, type Variants } from "framer-motion";
import { Trophy } from 'lucide-react';

interface Feature {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    emoji: '📚',
    title: 'Học theo lộ trình',
    description: 'Lộ trình bài bản từ cơ bản đến nâng cao',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    emoji: '💻',
    title: 'Làm bài tập trực tiếp',
    description: 'Trình soạn code online, chạy ngay lập tức',
    gradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    emoji: '🤖',
    title: 'AI Tutor kèm riêng',
    description: 'PyMate hỗ trợ 24/7, giải đáp mọi thắc mắc',
    gradient: 'from-cyan-500/20 to-purple-500/20',
  },
  {
    emoji: '📊',
    title: 'Theo dõi tiến độ',
    description: 'Dashboard thông minh, biết chính xác bạn đang ở đâu',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    emoji: '🏆',
    title: 'Nhận huy hiệu và XP',
    description: 'Hệ thống gamification, học mà chơi, chơi mà học',
    gradient: 'from-purple-500/20 to-cyan-500/20',
  },
  {
    emoji: '📱',
    title: 'Học mọi lúc mọi nơi',
    description: 'Responsive trên mọi thiết bị',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="group relative glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow duration-300">
          <span className="text-3xl">{feature.emoji}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 gradient-text group-hover:scale-105 transition-transform duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Decorative border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" id="features">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted">Tính năng nổi bật</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Khám phá sức mạnh</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Những công cụ học tập hiện đại được thiết kế riêng cho bạn
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}