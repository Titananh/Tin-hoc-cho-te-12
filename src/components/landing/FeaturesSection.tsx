'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Award, TrendingUp, BookOpen, Shield } from 'lucide-react';

const features = [
  {
    title: 'Viết Code Trực Tuyến',
    description: 'Trình soạn thảo Monaco Editor tích hợp sẵn, viết và chạy code Python ngay trên trình duyệt.',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'AI Tutor (PyMate)',
    description: 'Trợ lý AI hỗ trợ 24/7, giải thích bài học và gợi ý khi gặp khó khăn bằng tiếng Việt.',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Huy Hiệu & XP',
    description: 'Nhận điểm kinh nghiệm và huy hiệu khi hoàn thành bài tập, tạo động lực học tập.',
    icon: Award,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Theo Dõi Tiến Độ',
    description: 'Dashboard trực quan hiển thị tiến độ học tập, streak, và thống kê chi tiết.',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Bám Sát SGK Cánh Diều',
    description: '10 cấp độ nội dung bám sát chương trình Tin học 12, phù hợp ôn thi và học trên lớp.',
    icon: BookOpen,
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Chứng Chỉ Hoàn Thành',
    description: 'Nhận chứng chỉ điện tử có mã QR xác thực khi hoàn thành khóa học.',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
  },
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

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
          >
            Tính Năng
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Mọi Thứ Bạn Cần Để{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Học Python
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Nền tảng cung cấp đầy đủ công cụ và tài nguyên giúp bạn tự tin chinh phục lập trình Python.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
