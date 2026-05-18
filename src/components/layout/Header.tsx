'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, Bell, Moon, Sun, User, 
  BookOpen, Home, Trophy, MessageCircle, Settings, LogOut, FileText, Database, Globe
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { href: '/', icon: Home, label: 'Trang chủ' },
    { href: '/chu-de', icon: BookOpen, label: 'Chủ đề SGK' },
    { href: '/de-thi', icon: FileText, label: 'Đề thi' },
    { href: '/sql-playground', icon: Database, label: 'SQL' },
    { href: '/web-playground', icon: Globe, label: 'Web' },
    { href: '/tutor', icon: MessageCircle, label: 'Gia sư AI' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25">
                12
              </div>
              <span className="font-bold text-lg hidden sm:block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tin học 12
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <Link href="/search" className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <div className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-sm text-muted cursor-pointer hover:border-primary/50 transition-colors">
                Tìm kiếm bài học, chủ đề...
              </div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Link
              href="/search"
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Đổi giao diện"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div 
                    key="moon" 
                    initial={{ rotate: -90, opacity: 0 }} 
                    animate={{ rotate: 0, opacity: 1 }} 
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="sun" 
                    initial={{ rotate: 90, opacity: 0 }} 
                    animate={{ rotate: 0, opacity: 1 }} 
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* User Avatar / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Hồ sơ"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl bg-background border border-border shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-border">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-sm text-muted truncate">{user.email}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="font-bold text-primary">{user.xp} XP</span>
                          <span className="text-muted">•</span>
                          <span className="font-medium">Cấp {user.level}</span>
                          <span className="text-muted">•</span>
                          <span className="text-orange-500">🔥 {user.streak_count} ngày</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsProfileOpen(false)}>
                          <Home className="w-4 h-4" /> <span className="text-sm">Bảng điều khiển</span>
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsProfileOpen(false)}>
                          <User className="w-4 h-4" /> <span className="text-sm">Hồ sơ</span>
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsProfileOpen(false)}>
                          <Settings className="w-4 h-4" /> <span className="text-sm">Cài đặt</span>
                        </Link>
                      </div>
                      <div className="p-2 border-t border-border">
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600"
                        >
                          <LogOut className="w-4 h-4" /> <span className="text-sm font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Đăng nhập
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-background"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <Link href="/badges" className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <Trophy className="w-5 h-5" /> <span className="font-medium">Huy hiệu</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />}
    </>
  );
}

export default Header;
