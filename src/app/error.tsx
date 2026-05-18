'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { logError } from '@/lib/logger';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorContent({ error, reset }: ErrorPageProps) {
  // Log error to console
  logError('ErrorPage', error, { digest: error.digest });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[400px] flex items-center justify-center p-8"
    >
      <div className="text-center max-w-md">
        {/* Error Illustration */}
        <div className="mb-6 relative">
          <div className="w-32 h-32 mx-auto bg-error/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-error" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center">
            <span className="text-lg">!</span>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold mb-3">Đã xảy ra lỗi</h2>
        <p className="text-muted mb-6">
          Chúng tôi đã gặp một sự cố không mong muốn. Vui lòng thử lại hoặc quay về trang chủ.
        </p>

        {/* Technical Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-surface rounded-xl border border-border text-left">
            <p className="text-xs font-mono text-error break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-foreground font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Quay về trang chủ
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-all hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <ErrorBoundary>
      <ErrorContent error={error} reset={reset} />
    </ErrorBoundary>
  );
}