'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Braces, Sparkles } from 'lucide-react';

// Floating decorative elements
const floatingElements = [
  { icon: Code2, position: 'top-10 left-[10%]', delay: 0 },
  { icon: Terminal, position: 'top-20 right-[15%]', delay: 0.5 },
  { icon: Braces, position: 'bottom-32 left-[8%]', delay: 1 },
  { icon: Sparkles, position: 'bottom-20 right-[10%]', delay: 1.5 },
  // Python logo shapes
  { icon: Code2, position: 'top-1/3 left-[5%]', delay: 0.3 },
  { icon: Terminal, position: 'top-1/4 right-[5%]', delay: 0.8 },
];

const FloatingElement = ({ icon: Icon, position, delay }: { 
  icon: React.ElementType; 
  position: string; 
  delay: number;
}) => {
  return (
    <motion.div
      className={`absolute ${position} hidden md:block`}
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
      <div className="glass rounded-2xl p-4 shadow-lg">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white/90" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
};

// Glassmorphism orb elements
const GlassOrb = ({ size, position, colorClass }: {
  size: string;
  position: string;
  colorClass: string;
}) => {
  return (
    <div className={`absolute ${size} ${position} rounded-full ${colorClass} blur-3xl opacity-40`} />
  );
};

export default function CTASection({
  onStartFree,
  onExplorePath,
}: {
  onStartFree?: () => void;
  onExplorePath?: () => void;
}) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Dark mode gradient adjustment */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 dark:to-background/60" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-25"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Glassmorphism overlay elements */}
      <GlassOrb 
        size="w-40 h-40 md:w-64 md:h-64" 
        position="top-0 left-1/4 bg-white/10" 
        colorClass="bg-white/10" 
      />
      <GlassOrb 
        size="w-32 h-32 md:w-48 md:h-48" 
        position="bottom-0 right-1/3 bg-purple-400/20" 
        colorClass="bg-purple-400/20" 
      />

      {/* Floating decorative elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      {/* Content container */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
        {/* Main headline */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Sẵn sàng bắt đầu hành trình Python của bạn?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Tham gia 10,000+ học sinh đang học Python cùng chúng tôi
        </motion.p>

        {/* Buttons container */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          {/* Primary button - Bắt đầu miễn phí */}
          <motion.button
            onClick={onStartFree}
            className="group relative px-8 py-4 md:px-10 md:py-5 rounded-xl bg-white text-primary font-semibold text-lg shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Button glow on hover */}
            <div className="absolute inset-0 rounded-xl glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10">Bắt đầu miễn phí</span>
          </motion.button>

          {/* Secondary button - Khám phá lộ trình */}
          <motion.button
            onClick={onExplorePath}
            className="group relative px-8 py-4 md:px-10 md:py-5 rounded-xl border-2 border-white/60 text-white font-semibold text-lg backdrop-blur-sm overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Border glow effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl" />
            
            <span className="relative z-10">Khám phá lộ trình</span>
          </motion.button>
        </motion.div>

        {/* Stats / Social proof */}
        <motion.div
          className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { value: '10,000+', label: 'Học sinh' },
            { value: '500+', label: 'Bài học' },
            { value: '50+', label: 'Dự án thực tế' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm md:text-base text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Light mode overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent dark:hidden" />
    </section>
  );
}