'use client';

import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import Link from 'next/link';
import { Play, Route, Code2, Sparkles, Braces, Terminal, GitBranch } from 'lucide-react';

const codeLines = [
  { text: 'print(', color: 'text-accent' },
  { text: '"Xin chào học sinh lớp 12!"', color: 'text-secondary' },
  { text: ')', color: 'text-accent' },
  { text: '\n# Chương trình Python đầu tiên', color: 'text-muted' },
  { text: '\nfor i in range(5):', color: 'text-primary' },
  { text: '\n    print(f"Lần chạy #{i+1}")', color: 'text-accent' },
];

const floatingElements = [
  { icon: Code2, position: 'top-16 left-[8%]', delay: 0, size: 'w-12 h-12' },
  { icon: Terminal, position: 'top-32 right-[12%]', delay: 0.5, size: 'w-10 h-10' },
  { icon: Braces, position: 'bottom-28 left-[6%]', delay: 1, size: 'w-11 h-11' },
  { icon: Sparkles, position: 'bottom-20 right-[8%]', delay: 1.5, size: 'w-9 h-9' },
  { icon: GitBranch, position: 'top-1/3 left-[3%]', delay: 0.3, size: 'w-8 h-8' },
  { icon: Route, position: 'top-1/4 right-[4%]', delay: 0.8, size: 'w-10 h-10' },
];

const FloatingElement = ({ icon: Icon, position, delay, size }: {
  icon: React.ElementType;
  position: string;
  delay: number;
  size: string;
}) => {
  return (
    <motion.div
      className={`absolute ${position} hidden lg:block`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scale: [0.8, 1.1, 0.8],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className={`${size} glass rounded-2xl p-3 shadow-lg`}>
        <Icon className="w-full h-full text-primary/80" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating decorative elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left Content - Text */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Mới: AI Tutor PyMate thông minh</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Học Python</span> từ cơ bản đến nâng cao
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-muted">
                Dành riêng cho học sinh lớp 12 Việt Nam
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-xl mx-auto lg:mx-0">
              Nền tảng học lập trình Python hiện đại với lộ trình bài bản,
              bài tập thực hành và trợ lý AI hỗ trợ 24/7
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white gradient-bg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              <Play className="w-5 h-5" />
              Bắt đầu miễn phí
              <motion.span
                className="absolute inset-0 rounded-xl bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/learn"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold glass border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:scale-105"
            >
              <Route className="w-5 h-5 text-primary" />
              Xem lộ trình học
            </Link>
          </motion.div>

          {/* Stats preview */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
          >
            {[
              { value: '10,000+', label: 'Học sinh' },
              { value: '50+', label: 'Bài học' },
              { value: '100+', label: 'Bài tập' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Code Editor Preview */}
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden glass shadow-2xl">
            {/* Editor Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="flex-1 text-center text-sm text-muted font-mono">
                python-master-12.py
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 bg-surface/50 code-editor">
              <div className="space-y-1">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.5 }}
                    className={`${line.color} flex items-center gap-1`}
                  >
                    <span className="w-8 text-muted/50 select-none text-right">
                      {index + 1}
                    </span>
                    <span>{line.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="text-sm text-muted mb-2">Output:</div>
                <div className="space-y-1 text-accent font-semibold">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.3 }}
                  >
                    Xin chào học sinh lớp 12!
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.3 }}
                  >
                    Lần chạy #1
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6, duration: 0.3 }}
                  >
                    Lần chạy #2
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8, duration: 0.3 }}
                  >
                    Lần chạy #3
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.0, duration: 0.3 }}
                    className="text-primary"
                  >
                    ...
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 -z-10 blur-xl" />
          </div>

          {/* Python icon floating */}
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 glass rounded-2xl p-3 shadow-lg"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
              <path
                fill="currentColor"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 14.142 4.5 10 7.858 2.5 12 2.5zm-3 4.5v9c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5v.5c0 .553.448 1 1 1h1c.552 0 1-.447 1-1v-8.5h-2zm7 0v9c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5v.5c0 .553.448 1 1 1h1c.552 0 1-.447 1-1v-8.5h-2z"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}