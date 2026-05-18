'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Target,
  MessageCircle,
  User,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface BottomNavProps {
  unreadMessages?: number;
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '/', icon: Home },
  { label: 'Học', href: '/learn', icon: BookOpen },
  { label: 'Luyện', href: '/practice', icon: Target },
  { label: 'AI Tutor', href: '/tutor', icon: MessageCircle },
  { label: 'Hồ sơ', href: '/profile', icon: User },
];

export function BottomNav({ unreadMessages = 0 }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Spacer */}
      <div className="hidden md:block h-20" />

      {/* Mobile Bottom Nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isAITutor = item.label === 'AI Tutor';

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors"
                aria-label={item.label}
              >
                <div className="relative">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`p-1.5 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>

                  {/* Badge for AI Tutor */}
                  {isAITutor && unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadMessages > 9 ? '9+' : unreadMessages}
                    </span>
                  )}
                </div>

                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}