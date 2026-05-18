'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

const floatingCodeSnippets = [
  { code: 'def learn():\n    return True', position: 'top-20 left-10', delay: 0, floatRange: 15 },
  { code: 'for i in range(10):\n    print(i)', position: 'top-32 right-16', delay: 0.5, floatRange: 12 },
  { code: 'class Python:\n    pass', position: 'bottom-40 left-20', delay: 1, floatRange: 18 },
  { code: 'if error:\n    try_again()', position: 'bottom-32 right-10', delay: 1.5, floatRange: 14 },
  { code: 'list = [1, 2, 3]\nsum(list)', position: 'top-48 left-1/4', delay: 0.3, floatRange: 16 },
  { code: 'import happiness\nhappiness++', position: 'bottom-48 right-1/4', delay: 0.8, floatRange: 20 },
];

const bracketDecorations = [
  { symbol: '{', position: 'top-16 left-1/4', size: 'text-6xl', rotation: '-rotate-12' },
  { symbol: '}', position: 'bottom-24 right-1/6', size: 'text-7xl', rotation: 'rotate-6' },
  { symbol: '(', position: 'top-1/3 right-20', size: 'text-5xl', rotation: 'rotate-45' },
  { symbol: ')', position: 'bottom-1/3 left-20', size: 'text-5xl', rotation: '-rotate-45' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const codeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: [0, 0.7, 0.7, 0],
    scale: [0.8, 1, 1, 0.8],
    y: [0, -30, 30, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      delay: i * 0.8,
      ease: 'easeInOut' as const,
    },
  }),
};

const bracketVariants = {
  hidden: { opacity: 0, rotate: 0 },
  visible: (i: number) => ({
    opacity: [0, 0.3, 0.3, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      delay: i * 0.5,
      ease: 'easeInOut' as const,
    },
  }),
};

const catVariant = {
  hidden: { opacity: 0, y: 50, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const catIdleVariant = {
  animation: {
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

export default function ErrorPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = () => {
    window.location.href = '/search';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-background via-background to-muted/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingCodeSnippets.map((snippet, i) => (
          <motion.div
            key={`code-${i}`}
            custom={i}
            variants={codeVariants}
            initial="hidden"
            animate="visible"
            className={`absolute ${snippet.position} hidden sm:block`}
          >
            <pre className="text-xs font-mono bg-surface/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-border/50 dark:border-gray-700/50 text-foreground/80 dark:text-gray-300/80 shadow-xl shadow-primary/5">
              <code>{snippet.code}</code>
            </pre>
          </motion.div>
        ))}

        {/* Bracket Decorations */}
        {bracketDecorations.map((bracket, i) => (
          <motion.div
            key={`bracket-${i}`}
            custom={i}
            variants={bracketVariants}
            initial="hidden"
            animate="visible"
            className={`absolute ${bracket.position} hidden md:block`}
          >
            <span className={`${bracket.size} font-bold text-border/30 dark:text-gray-700/50 ${bracket.rotation}`}>
              {bracket.symbol}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Cat Illustration */}
        <motion.div
          variants={catVariant}
          className="mb-6 relative inline-block"
        >
          <motion.div
            animate={catIdleVariant.animation}
            className="relative"
          >
            {/* Simple Cute Robot/Cat SVG */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
              {/* Robot Body */}
              <rect x="35" y="50" width="50" height="45" rx="8" fill="#3B82F6" className="dark:fill-blue-600" />
              {/* Robot Head */}
              <rect x="40" y="25" width="40" height="30" rx="6" fill="#3B82F6" className="dark:fill-blue-600" />
              {/* Antenna */}
              <line x1="60" y1="10" x2="60" y2="25" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" className="dark:stroke-purple-500" />
              <circle cx="60" cy="8" r="5" fill="#8B5CF6" className="dark:fill-purple-500" />
              {/* Eyes */}
              <circle cx="50" cy="38" r="6" fill="white" />
              <circle cx="70" cy="38" r="6" fill="white" />
              <circle cx="50" cy="38" r="3" fill="#1F2937" className="dark:fill-gray-900" />
              <circle cx="70" cy="38" r="3" fill="#1F2937" className="dark:fill-gray-900" />
              {/* Eye shine */}
              <circle cx="51" cy="37" r="1.5" fill="white" />
              <circle cx="71" cy="37" r="1.5" fill="white" />
              {/* Mouth - sad */}
              <path d="M52 48 Q60 44 68 48" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" className="dark:stroke-gray-900" />
              {/* Arms */}
              <rect x="22" y="55" width="15" height="8" rx="4" fill="#8B5CF6" className="dark:fill-purple-500" />
              <rect x="83" y="55" width="15" height="8" rx="4" fill="#8B5CF6" className="dark:fill-purple-500" />
              {/* Legs */}
              <rect x="45" y="92" width="10" height="15" rx="3" fill="#6B7280" className="dark:fill-gray-600" />
              <rect x="65" y="92" width="10" height="15" rx="3" fill="#6B7280" className="dark:fill-gray-600" />
              {/* Screen on body */}
              <rect x="48" y="58" width="24" height="18" rx="3" fill="#1F2937" className="dark:fill-gray-800" />
              {/* Text on screen */}
              <text x="60" y="70" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="monospace" fontWeight="bold">404</text>
              {/* Question mark above head */}
              <text x="85" y="20" fill="#F59E0B" fontSize="16" fontFamily="monospace" fontWeight="bold">?</text>
            </svg>
          </motion.div>
          
          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -top-2 right-0 bg-surface dark:bg-gray-800 px-3 py-1.5 rounded-xl shadow-lg border border-border/50 dark:border-gray-700/50"
          >
            <span className="text-sm text-muted-foreground dark:text-gray-400">Hmm...?</span>
          </motion.div>
        </motion.div>

        {/* 404 Number */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none select-none mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
              404
            </span>
          </h1>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          variants={itemVariants}
          className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-6 rounded-full"
        />

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground"
        >
          Trang không tìm thấy
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground dark:text-gray-400 max-w-md mx-auto mb-10 text-base sm:text-lg"
        >
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Quay về trang chủ
          </Link>
          
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-border/50 dark:border-gray-700 bg-surface dark:bg-gray-800/50 text-foreground dark:text-gray-200 font-semibold hover:bg-muted/30 dark:hover:bg-gray-700/50 transition-all hover:scale-105"
          >
            <Search className="w-5 h-5" />
            Tìm kiếm
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-muted-foreground dark:text-gray-500"
        >
          Nếu bạn nghĩ đây là lỗi, vui lòng{' '}
          <Link href="/" className="text-primary hover:underline">
            liên hệ hỗ trợ
          </Link>
        </motion.p>
      </motion.div>

      {/* Decorative Elements - Animated Dots */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-blue-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-1/4 right-8 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-12 w-2 h-2 bg-pink-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/3 right-16 w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.3s' }} />
    </div>
  );
}