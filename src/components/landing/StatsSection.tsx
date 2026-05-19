'use client';

import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Học Sinh Đang Học', color: 'from-blue-500 to-cyan-500' },
  { icon: Award, value: '10', label: 'Cấp Độ Học Tập', color: 'from-purple-500 to-pink-500' },
  { icon: TrendingUp, value: '200+', label: 'Bài Tập Thực Hành', color: 'from-yellow-500 to-orange-500' },
  { icon: Zap, value: '24/7', label: 'AI Tutor Hỗ Trợ', color: 'from-green-500 to-emerald-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
