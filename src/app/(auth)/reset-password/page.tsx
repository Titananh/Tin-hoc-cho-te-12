'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Code2, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength checks
  const passwordChecks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
  };

  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!isPasswordStrong) {
      setError('Mật khẩu chưa đủ mạnh. Vui lòng kiểm tra các yêu cầu bên dưới.');
      return;
    }

    if (password.length > 128) {
      setError('Mật khẩu không được quá 128 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!token) {
      setError('Liên kết đặt lại mật khẩu không hợp lệ. Vui lòng yêu cầu liên kết mới.');
      return;
    }

    setIsLoading(true);

    try {
      // Supabase handles the token from the URL automatically via session
      const { getSupabase, isSupabaseConfigured } = await import('@/lib/supabase-browser');
      
      if (!isSupabaseConfigured()) {
        setError('Chức năng đặt lại mật khẩu chưa được cấu hình.');
        return;
      }

      const supabase = getSupabase()!;
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setIsSuccess(true);
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  // Supabase recovery flow: user arrives here after clicking email link.
  // The session is automatically set by Supabase from the URL hash.
  // No explicit token check needed.

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Đặt lại mật khẩu thành công!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập bằng mật khẩu mới.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Đăng nhập ngay
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Mật khẩu mới
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tối thiểu 8 ký tự"
              required
              minLength={8}
              maxLength={128}
              className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Indicators */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1">
              <PasswordCheck
                passed={passwordChecks.minLength}
                label="Tối thiểu 8 ký tự"
              />
              <PasswordCheck
                passed={passwordChecks.hasUppercase}
                label="Ít nhất 1 chữ hoa (A-Z)"
              />
              <PasswordCheck
                passed={passwordChecks.hasLowercase}
                label="Ít nhất 1 chữ thường (a-z)"
              />
              <PasswordCheck
                passed={passwordChecks.hasDigit}
                label="Ít nhất 1 chữ số (0-9)"
              />
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              required
              className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {confirmPassword.length > 0 && password !== confirmPassword && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              Mật khẩu xác nhận không khớp
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang xử lý...</span>
            </>
          ) : (
            <span>Đặt Lại Mật Khẩu</span>
          )}
        </button>
      </form>

      {/* Back to Login */}
      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại đăng nhập
        </Link>
      </p>
    </>
  );
}

// Password check indicator component
function PasswordCheck({ passed, label }: { passed: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        className={`w-4 h-4 ${
          passed ? 'text-green-500' : 'text-slate-300 dark:text-slate-600'
        }`}
      />
      <span
        className={`text-xs ${
          passed
            ? 'text-green-600 dark:text-green-400'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Python Master 12
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Đặt Lại Mật Khẩu
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Nhập mật khẩu mới cho tài khoản của bạn.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
