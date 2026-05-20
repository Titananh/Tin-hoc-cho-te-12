'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, logout, type User as ClientUser } from '@/lib/client-auth';
import { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Dumbbell,
  Trophy,
  Flame,
  BookOpen,
  Newspaper,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings as SettingsIcon,
  Menu,
  X,
  Code2,
  Gift,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/learn', label: 'Học tập', icon: GraduationCap },
  { href: '/practice', label: 'Luyện tập', icon: Dumbbell },
  { href: '/contests', label: 'Thi đấu', icon: Trophy },
  { href: '/challenge', label: 'Thử thách', icon: Flame },
  { href: '/projects', label: 'Dự án', icon: BookOpen },
  { href: '/blog', label: 'Chia sẻ', icon: Newspaper },
  { href: '/leaderboard', label: 'Xếp hạng', icon: Trophy },
  { href: '/rewards', label: 'Phần thưởng', icon: Gift },
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<ClientUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isAuthenticated = user !== null;

  // Hide navbar on the public landing page (it has its own header) and on the
  // auth pages (login / register / forgot-password / reset-password).
  const HIDDEN_PATHS = ['/login', '/register', '/forgot-password', '/reset-password'];
  if (pathname === '/' || HIDDEN_PATHS.some((p) => pathname?.startsWith(p))) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white hidden sm:inline">
              Python Master 12
            </span>
          </Link>

          {/* Main nav (desktop) */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right area */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              href="/search"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors w-44"
            >
              <Search className="w-4 h-4" />
              <span>Tìm kiếm...</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/notifications"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                  aria-label="Thông báo"
                >
                  <Bell className="w-5 h-5" />
                </Link>

                {/* Profile dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:inline" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Bảng điều khiển
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Trang cá nhân
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Cài đặt
                      </Link>
                      <button
                        onClick={() => { logout(); window.location.href = '/'; }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity shadow-md"
                >
                  Đăng ký
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            {!isAuthenticated && (
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-center rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-center rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
