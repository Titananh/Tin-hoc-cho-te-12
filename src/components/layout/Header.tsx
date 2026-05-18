'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, Bell, Moon, Sun, User, 
  BookOpen, Home, Trophy, MessageCircle, Settings, LogOut, PenTool
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import { Sidebar } from './Sidebar';

interface HeaderProps {
  showSidebar?: boolean;
}

export function Header({ showSidebar = true }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { href: '/', icon: Home, label: 'Trang chủ' },
    { href: '/learn', icon: BookOpen, label: 'Học' },
    { href: '/practice', icon: PenTool, label: 'Bài tập' },
    { href: '/tutor', icon: MessageCircle, label: 'AI Tutor' },
    { href: '/badges', icon: Trophy, label: 'Huy hiệu' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25">
                Py
              </div>
              <span className="font-bold text-lg hidden sm:block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Python Master 12
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm bài học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border 
                           focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
                           transition-all text-sm dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
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
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

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

            {/* Notification Bell */}
            <button 
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              aria-label="Thông báo"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Hồ sơ"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
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
                    {/* User Info Header */}
                    <div className="p-4 border-b border-border bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{user?.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                        <span className="flex items-center gap-1.5 text-sm">
                          <span className="font-bold text-blue-600 dark:text-blue-400">{user?.xp || 0} XP</span>
                        </span>
                        <span className="text-muted">•</span>
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Level {user?.level || 1}</span>
                        <span className="text-muted">•</span>
                        <span className="text-sm text-orange-500">🔥 {user?.streak_count || 0} day streak</span>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="p-2">
                      <Link 
                        href="/dashboard" 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Hồ sơ</span>
                      </Link>
                      <Link 
                        href="/settings" 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm font-medium">Cài đặt</span>
                      </Link>
                    </div>
                    
                    {/* Logout */}
                    <div className="p-2 border-t border-border">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Đăng xuất</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

        {/* Mobile Search Expanded */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border px-4 py-3 bg-background"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-accent border border-border outline-none focus:border-primary"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)} 
        />
      )}
    </>
  );
}

export default Header;