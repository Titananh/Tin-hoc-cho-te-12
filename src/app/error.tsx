'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { theme } = useTheme();

  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);
  }, [error]);

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
            theme === 'dark' ? 'bg-red-500/10' : 'bg-red-500/20'
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-500/20'
          }`}
        />
      </div>

      <div className="relative text-center px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', delay: 0.1 }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 ${
              theme === 'dark'
                ? 'bg-red-500/20 border border-red-500/30'
                : 'bg-red-500/10 border border-red-200 shadow-xl'
            } backdrop-blur-xl`}
          >
            <AlertTriangle
              className={`w-10 h-10 ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}
            />
          </motion.div>

          {/* Message */}
          <h1
            className={`text-2xl md:text-3xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Đã xảy ra lỗi
          </h1>
          <p
            className={`text-base mb-8 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Rất tiếc, đã có lỗi xảy ra khi tải trang này.
            Vui lòng thử lại hoặc quay về trang chủ.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-5 h-5" />
              Thử lại
            </button>
            <Link
              href="/"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border transition-colors ${
                theme === 'dark'
                  ? 'border-white/20 text-slate-300 hover:bg-white/10'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
