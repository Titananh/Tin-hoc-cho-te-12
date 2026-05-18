'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { logError } from '@/lib/logger';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to console
    logError('GlobalError', error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-surface rounded-2xl shadow-xl p-8 text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-error/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-error" />
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold mb-3 text-foreground">
                Đã xảy ra lỗi
              </h1>
              <p className="text-muted mb-6">
                Xin lỗi, đã có lỗi không mong muốn xảy ra. Vui lòng quay lại và thử tiếp tục.
              </p>

              {/* Technical Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-6 p-4 bg-background rounded-xl border border-border text-left">
                  <p className="text-xs font-mono text-error break-all">
                    {error.message}
                  </p>
                </div>
              )}

              {/* Back Button */}
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </button>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}