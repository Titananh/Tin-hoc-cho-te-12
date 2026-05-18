'use client';

import React, { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';

interface PasswordRequirement {
  label: string;
  met: boolean;
}

function getPasswordStrength(password: string): { level: 'weak' | 'fair' | 'strong'; checks: PasswordRequirement[] } {
  const checks: PasswordRequirement[] = [
    { label: 'Ít nhất 8 ký tự', met: password.length >= 8 },
    { label: 'Ít nhất 1 chữ hoa', met: /[A-Z]/.test(password) },
    { label: 'Ít nhất 1 số', met: /[0-9]/.test(password) },
    { label: 'Ít nhất 1 ký tự đặc biệt', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const metCount = checks.filter(c => c.met).length;
  let level: 'weak' | 'fair' | 'strong';

  if (metCount <= 1) {
    level = 'weak';
  } else if (metCount <= 3) {
    level = 'fair';
  } else {
    level = 'strong';
  }

  return { level, checks };
}

function getStrengthColor(level: 'weak' | 'fair' | 'strong'): string {
  switch (level) {
    case 'weak': return 'bg-error';
    case 'fair': return 'bg-warning';
    case 'strong': return 'bg-success';
  }
}

function getStrengthText(level: 'weak' | 'fair' | 'strong'): string {
  switch (level) {
    case 'weak': return 'Yếu';
    case 'fair': return 'Trung bình';
    case 'strong': return 'Mạnh';
  }
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 20 } },
  exit: { opacity: 0, scale: 0.9 },
};

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (passwordStrength.level === 'weak') {
      newErrors.password = 'Mật khẩu quá yếu';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn cần đồng ý với điều khoản sử dụng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await register(formData.fullName, formData.email, formData.password);
    if (success) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.push('/dashboard');
      }, 2500);
    }
  };

  const handleGoogleRegister = () => {
    console.log('Register with Google');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 p-12 flex flex-col justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3v1H9V8c0-1.66 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">Python Master 12</span>
            </Link>
          </motion.div>

          {/* Python Mascot */}
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="flex-1 flex items-center justify-center"
          >
            <div className="relative">
              {/* Python Snake SVG */}
              <svg viewBox="0 0 200 200" className="w-64 h-64 text-white/90">
                <motion.path
                  d="M100 20 C140 20, 180 60, 180 100 C180 140, 140 180, 100 180 C60 180, 20 140, 20 100 C20 60, 60 20, 100 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M100 40 C130 40, 160 70, 160 100 C160 130, 130 160, 100 160"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="10 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                />
                {/* Eyes */}
                <circle cx="75" cy="70" r="8" fill="currentColor" />
                <circle cx="125" cy="70" r="8" fill="currentColor" />
                <circle cx="75" cy="68" r="3" fill="#0F172A" />
                <circle cx="125" cy="68" r="3" fill="#0F172A" />
                {/* Tongue */}
                <motion.path
                  d="M100 170 L95 185 L100 180 L105 185 L100 170"
                  fill="#EF4444"
                  animate={{ scaleY: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </svg>

              {/* Floating Code Elements */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-mono"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                print("Hello")
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-8 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-mono"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                def learn():
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-12 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-mono"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
              >
                if success:
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-white">Bắt đầu hành trình lập trình</h2>
            <p className="text-white/80 text-lg max-w-md">
              Đăng ký ngay để truy cập hơn 50 bài học, 500+ bài tập và AI Tutor 24/7
            </p>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Miễn phí forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Không thẻ tín dụng</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/20 blur-xl" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay về trang chủ</span>
          </Link>

          {/* Form Card */}
          <div className="glass rounded-2xl p-8 border border-border shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Tạo tài khoản mới</h1>
              <p className="text-muted">Tham gia cùng hàng nghìn học sinh lớp 12</p>
            </div>

            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Full Name */}
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-surface border ${
                      errors.fullName ? 'border-error' : 'border-border'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                </div>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    {errors.fullName}
                  </motion.p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-surface border ${
                      errors.email ? 'border-error' : 'border-border'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ít nhất 8 ký tự"
                    className={`w-full pl-11 pr-12 py-3 rounded-xl bg-surface border ${
                      errors.password ? 'border-error' : 'border-border'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Độ mạnh:</span>
                      <span className={`font-medium ${
                        passwordStrength.level === 'weak' ? 'text-error' :
                        passwordStrength.level === 'fair' ? 'text-warning' : 'text-success'
                      }`}>
                        {getStrengthText(passwordStrength.level)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: passwordStrength.level === 'weak' ? '33%' :
                                 passwordStrength.level === 'fair' ? '66%' : '100%'
                        }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${getStrengthColor(passwordStrength.level)} rounded-full`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {passwordStrength.checks.map((check, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1.5 text-xs ${
                            check.met ? 'text-success' : 'text-muted'
                          }`}
                        >
                          {check.met ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          <span>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    className={`w-full pl-11 pr-12 py-3 rounded-xl bg-surface border ${
                      errors.confirmPassword ? 'border-error' : 'border-border'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>

              {/* Terms Checkbox */}
              <motion.div variants={fieldVariants} className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted">
                    Tôi đồng ý với{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Chính sách bảo mật
                    </Link>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    {errors.agreeTerms}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fieldVariants}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Đăng ký</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Divider */}
              <motion.div variants={fieldVariants} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface text-muted">hoặc</span>
                </div>
              </motion.div>

              {/* Google Button */}
              <motion.div variants={fieldVariants}>
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className="w-full py-3.5 rounded-xl bg-surface border border-border hover:bg-muted/50 transition-colors flex items-center justify-center gap-3 font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Đăng ký với Google</span>
                </button>
              </motion.div>
            </motion.form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center text-muted"
            >
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Đăng nhập
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass rounded-2xl p-8 max-w-sm w-full text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 mx-auto rounded-full gradient-bg flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-bold">Chào mừng bạn!</h2>
            <p className="text-muted">
              Tài khoản đã được tạo thành công. Đang chuyển hướng đến dashboard...
            </p>
            <div className="flex items-center justify-center gap-1 text-sm text-muted">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Vui lòng đợi</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}