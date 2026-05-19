'use client';

import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, Menu, X, ChevronRight, Play, Code2, Users, Award, TrendingUp, Zap } from 'lucide-react';

// Import components
import FeaturesSection from '@/components/landing/FeaturesSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import StatsSection from '@/components/landing/StatsSection';
import Footer from '@/components/layout/Footer';

// Import hooks
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

// Nav link type
interface NavLink {
  label: string;
  href: string;
}

// Navigation links
const navLinks: NavLink[] = [
  { label: 'Tính Năng', href: '#features' },
  { label: 'Lộ Trình', href: '#roadmap' },
  { label: 'Câu Hỏi', href: '#faq' },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Python Master 12
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href.replace('#', ''))}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Chuyển đổi giao diện"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <a
                  href="/dashboard"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Bảng Điều Khiển
                </a>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    Đăng Nhập
                  </a>
                  <a
                    href="/learn"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Bắt Đầu Học
                  </a>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href.replace('#', ''))}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  {isAuthenticated ? (
                    <a href="/dashboard" className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center">
                      Bảng Điều Khiển
                    </a>
                  ) : (
                    <>
                      <a href="/login" className="flex-1 px-4 py-2 text-center text-slate-600 dark:text-slate-300 font-medium">
                        Đăng Nhập
                      </a>
                      <a href="/learn" className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center">
                        Bắt Đầu Học
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Học Lập Trình Python{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dễ Dàng
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Nền tảng học lập trình Python dành cho học sinh lớp 12 theo sách giáo khoa Cánh Diều. Học qua bài tập tương tác, AI Tutor hỗ trợ 24/7, và dự án thực tế.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Bắt Đầu Học
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a
                  href="#features"
                  onClick={(e) => scrollToSection(e, 'features')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Play className="w-5 h-5" />
                  Xem Demo
                </a>
              </div>
            </motion.div>

            {/* Animated Code Snippet - Python */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20" />
              <div className="relative bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-slate-500 text-sm">main.py</span>
                </div>
                <pre className="text-sm">
                  <code className="text-slate-300">
                    <span className="text-pink-400">class</span>{' '}
                    <span className="text-blue-400">HocSinh</span>
                    <span className="text-yellow-400">:</span>
                    {'\n'}{'  '}
                    <span className="text-pink-400">def</span>{' '}
                    <span className="text-blue-300">__init__</span>
                    <span className="text-yellow-400">(</span>
                    <span className="text-orange-400">self</span>
                    <span className="text-white">,</span>{' '}
                    <span className="text-orange-400">ten</span>
                    <span className="text-white">,</span>{' '}
                    <span className="text-orange-400">lop</span>
                    <span className="text-yellow-400">)</span>
                    <span className="text-yellow-400">:</span>
                    {'\n'}{'    '}
                    <span className="text-orange-400">self</span>
                    <span className="text-white">.</span>
                    <span className="text-green-400">ten</span>
                    {' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-orange-400">ten</span>
                    {'\n'}{'    '}
                    <span className="text-orange-400">self</span>
                    <span className="text-white">.</span>
                    <span className="text-green-400">lop</span>
                    {' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-orange-400">lop</span>
                    {'\n'}{'    '}
                    <span className="text-orange-400">self</span>
                    <span className="text-white">.</span>
                    <span className="text-green-400">diem_xp</span>
                    {' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-blue-400">0</span>
                    {'\n\n'}{'  '}
                    <span className="text-pink-400">def</span>{' '}
                    <span className="text-blue-300">hoc_bai</span>
                    <span className="text-yellow-400">(</span>
                    <span className="text-orange-400">self</span>
                    <span className="text-white">,</span>{' '}
                    <span className="text-orange-400">bai_hoc</span>
                    <span className="text-yellow-400">)</span>
                    <span className="text-yellow-400">:</span>
                    {'\n'}{'    '}
                    <span className="text-orange-400">self</span>
                    <span className="text-white">.</span>
                    <span className="text-green-400">diem_xp</span>
                    {' '}
                    <span className="text-white">+=</span>{' '}
                    <span className="text-blue-400">50</span>
                    {'\n'}{'    '}
                    <span className="text-pink-400">return</span>{' '}
                    <span className="text-purple-400">f</span>
                    <span className="text-orange-400">&quot;Hoàn thành: </span>
                    <span className="text-yellow-400">{'{'}</span>
                    <span className="text-orange-400">bai_hoc</span>
                    <span className="text-yellow-400">{'}'}</span>
                    <span className="text-orange-400">&quot;</span>
                    {'\n\n'}
                    <span className="text-slate-500"># Bắt đầu học Python!</span>
                    {'\n'}
                    <span className="text-green-400">em</span>
                    {' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-blue-400">HocSinh</span>
                    <span className="text-yellow-400">(</span>
                    <span className="text-orange-400">&quot;Bạn&quot;</span>
                    <span className="text-white">,</span>{' '}
                    <span className="text-orange-400">&quot;12A1&quot;</span>
                    <span className="text-yellow-400">)</span>
                    {'\n'}
                    <span className="text-blue-300">print</span>
                    <span className="text-yellow-400">(</span>
                    <span className="text-green-400">em</span>
                    <span className="text-white">.</span>
                    <span className="text-blue-300">hoc_bai</span>
                    <span className="text-yellow-400">(</span>
                    <span className="text-orange-400">&quot;Python cơ bản&quot;</span>
                    <span className="text-yellow-400">)</span>
                    <span className="text-yellow-400">)</span>
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Roadmap Section */}
      <section id="roadmap">
        <RoadmapSection />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQSection />
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}


