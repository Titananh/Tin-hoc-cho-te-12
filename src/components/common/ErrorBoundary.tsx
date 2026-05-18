'use client';

import React, { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

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
            <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
            <p className="text-muted mb-6">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>

            {/* Technical Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-surface rounded-xl border border-border text-left">
                <p className="text-xs font-mono text-error break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Retry Button */}
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;