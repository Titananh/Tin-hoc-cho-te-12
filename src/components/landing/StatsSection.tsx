'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, FileCode2, ThumbsUp, Quote } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  class: string;
  city: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Học sinh đang học',
    color: '#3B82F6',
  },
  {
    icon: BookOpen,
    value: 50,
    suffix: '+',
    label: 'Bài học chi tiết',
    color: '#8B5CF6',
  },
  {
    icon: FileCode2,
    value: 100,
    suffix: '+',
    label: 'Bài tập thực hành',
    color: '#06B6D4',
  },
  {
    icon: ThumbsUp,
    value: 95,
    suffix: '%',
    label: 'Học sinh hài lòng',
    color: '#10B981',
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Nhờ Python Master 12, tôi đã đậu thi HSG Tin học cấp tỉnh!',
    name: 'Minh',
    class: 'Lớp 12',
    city: 'TP.HCM',
    initials: 'MT',
    gradientFrom: '#3B82F6',
    gradientTo: '#8B5CF6',
  },
  {
    id: 2,
    quote: 'AI Tutor PyMate giải thích rất dễ hiểu, không như sách giáo khoa',
    name: 'Linh',
    class: 'Lớp 12',
    city: 'Hà Nội',
    initials: 'LH',
    gradientFrom: '#8B5CF6',
    gradientTo: '#06B6D4',
  },
  {
    id: 3,
    quote: 'Hệ thống XP và huy hiệu khiến tôi muốn học mỗi ngày!',
    name: 'Tuấn',
    class: 'Lớp 12',
    city: 'Đà Nẵng',
    initials: 'TA',
    gradientFrom: '#06B6D4',
    gradientTo: '#10B981',
  },
];

function AnimatedCounter({
  value,
  suffix,
  duration = 2,
  isInView,
}: {
  value: number;
  suffix: string;
  duration?: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, isInView]);

  return (
    <span>
      {count.toLocaleString('vi-VN')}{suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: StatItem;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div
        className="
          relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl
          glass border border-white/20 dark:border-white/10
          transition-all duration-300
          group-hover:shadow-xl
        "
        style={{
          boxShadow: `0 4px 24px ${stat.color}15`,
        }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ background: `${stat.color}15` }}
        >
          <Icon className="w-7 h-7" style={{ color: stat.color }} />
        </div>

        {/* Value */}
        <div
          className="text-3xl lg:text-4xl font-bold mb-2"
          style={{ color: stat.color }}
        >
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            isInView={isInView}
          />
        </div>

        {/* Label */}
        <p className="text-muted font-medium">{stat.label}</p>

        {/* Subtle glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${stat.color}30`,
          }}
        />

        {/* Decorative corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)',
          }}
        />
      </div>
    </motion.div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div
        className="
          relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl
          glass border border-white/20 dark:border-white/10
          h-full
        "
      >
        {/* Quote icon */}
        <div
          className="absolute -top-4 -left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
          }}
        >
          <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </div>

        {/* Quote text */}
        <p className="text-base lg:text-lg mb-6 leading-relaxed italic text-foreground/90">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
            style={{
              background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
            }}
          >
            {testimonial.initials}
          </div>

          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted">
              {testimonial.class}, {testimonial.city}
            </p>
          </div>
        </div>

        {/* Star rating decoration */}
        <div className="flex gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
              }}
            />
          ))}
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${testimonial.gradientFrom}25`,
          }}
        />
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-50px' });

  return (
    <section className="py-16 lg:py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Số liệu ấn tượng</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Hàng nghìn học sinh đã và đang học Python Master 12 mỗi ngày
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-24">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            <span className="gradient-text">Học sinh nói gì?</span>
          </h3>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Những câu chuyện thành công từ các học sinh đã sử dụng Python Master 12
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}