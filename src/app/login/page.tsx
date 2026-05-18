'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  Code,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const codeSnippets = [
  { code: 'def hello():\n    print("Python!")', x: 10, y: 20, delay: 0 },
  { code: 'for i in range(10):\n    print(i)', x: 70, y: 15, delay: 0.5 },
  { code: 'class MyClass:\n    pass', x: 25, y: 60, delay: 1 },
  { code: 'import numpy as np', x: 60, y: 70, delay: 1.5 },
  { code: 'list comprehension:\n[x for x in range(5)]', x: 15, y: 45, delay: 0.8 },
  { code: '@decorator\ndef func():\n    pass', x: 75, y: 40, delay: 1.2 },
];

const floatingElements = [
  { icon: Code, x: 20, y: 30, delay: 0.3 },
  { icon: Sparkles, x: 80, y: 25, delay: 0.7 },
  { icon: Layers, x: 50, y: 80, delay: 1.1 },
  { icon: Zap, x: 30, y: 75, delay: 0.9 },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email không được để trống';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setErrors({ general: 'Email hoặc mật khẩu không đúng' });
      }
    } catch {
      setErrors({ general: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden gradient-bg">
        {/* Dark mode overlay */}
        <div className="dark:opacity-90 opacity-100 transition-opacity duration-500" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30" />
        
        {/* Floating code snippets */}
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 0.9, 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: snippet.delay,
              ease: 'easeInOut',
            }}
            className="absolute glass rounded-xl p-4 text-sm code-editor text-white/90"
            style={{ 
              left: `${snippet.x}%`, 
              top: `${snippet.y}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <pre className="whitespace-pre-wrap">{snippet.code}</pre>
          </motion.div>
        ))}
        
        {/* Floating icons */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut',
            }}
            className="absolute glass rounded-2xl p-4 text-white"
            style={{ 
              left: `${element.x}%`, 
              top: `${element.y}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <element.icon className="w-6 h-6" />
          </motion.div>
        ))}
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl glass flex items-center justify-center"
            >
              <Code className="w-10 h-10" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Python Master 12</h1>
            <p className="text-xl text-white/80 mb-8 max-w-md">
              Nền tảng học lập trình Python hiện đại dành riêng cho học sinh Việt Nam
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Tutor
              </span>
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4" /> 200+ Bài học
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> Thực hành
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          <motion.div variants={item} className="glass rounded-3xl p-8 border border-border">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Chào mừng trở lại!</h2>
              <p className="text-muted">Đăng nhập để tiếp tục hành trình học Python</p>
            </div>

            {/* General error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface border ${
                      errors.email ? 'border-error' : 'border-border'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-error">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-surface border ${
                      errors.password ? 'border-error' : 'border-border'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-error">{errors.password}</p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-surface text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="text-sm">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || authLoading}
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng nhập
                    <LogIn className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-surface text-sm text-muted">hoặc</span>
              </div>
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3.5 rounded-xl bg-surface border border-border hover:bg-muted/50 transition-colors flex items-center justify-center gap-3 font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Đăng nhập với Google
            </button>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-muted">
              Chưa có tài khoản?{' '}
              <a href="#" className="text-primary hover:underline font-medium flex items-center justify-center gap-1">
                Đăng ký
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </motion.div>

          {/* Footer note */}
          <motion.p variants={item} className="mt-6 text-center text-xs text-muted">
            Bằng việc đăng nhập, bạn đồng ý với{' '}
            <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a>
            {' '}và{' '}
            <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}