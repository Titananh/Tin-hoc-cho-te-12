'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home, BookOpen, Code, MessageCircle, Trophy,
  User, Settings, ChevronRight, FileText, Database, Globe
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Bảng điều khiển' },
  { href: '/chu-de', icon: BookOpen, label: 'Chủ đề SGK' },
  { href: '/de-thi', icon: FileText, label: 'Đề thi' },
  { href: '/sql-playground', icon: Database, label: 'Sân chơi SQL' },
  { href: '/web-playground', icon: Globe, label: 'Sân chơi Web' },
  { href: '/learn', icon: Code, label: 'Python (nâng cao)' },
  { href: '/tutor', icon: MessageCircle, label: 'Gia sư AI' },
  { href: '/badges', icon: Trophy, label: 'Huy hiệu' },
];

const bottomNavItems = [
  { href: '/profile', icon: User, label: 'Hồ sơ' },
  { href: '/settings', icon: Settings, label: 'Cài đặt' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-surface h-[calc(100vh-64px)] sticky top-16">
      {user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="text-primary font-medium">{user.xp} XP</span>
                <span>•</span>
                <span className="text-warning">Cấp {user.level}</span>
              </div>
            </div>
          </div>
          
          {user.streak_count > 0 && (
            <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-warning/10 text-warning text-sm">
              <span>🔥 {user.streak_count} ngày liên tiếp!</span>
            </div>
          )}
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'hover:bg-background'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:text-primary'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background transition-colors text-muted"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  
  const mobileItems = [
    { href: '/chu-de', icon: BookOpen, label: 'Chủ đề' },
    { href: '/de-thi', icon: FileText, label: 'Đề thi' },
    { href: '/sql-playground', icon: Database, label: 'SQL' },
    { href: '/tutor', icon: MessageCircle, label: 'Gia sư' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="flex items-center justify-around py-2">
        {mobileItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? 'text-primary' : 'text-muted'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
