'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/20'
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/20'
          }`}
        />
      </div>

      <div className="relative text-center px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {/* 404 Number */}
          <div
            className={`text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          >
            404
          </div>

          {/* Message */}
          <h1
            className={`text-2xl md:text-3xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Không tìm thấy trang
          </h1>
          <p
            className={`text-base mb-8 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            Hãy quay lại trang chủ hoặc thử tìm kiếm nội dung khác.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
            <Link
              href="/"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border transition-colors ${
                theme === 'dark'
                  ? 'border-white/20 text-slate-300 hover:bg-white/10'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
