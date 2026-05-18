'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export interface Tab {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

interface TabBarProps {
  tabs: Tab[];
  className?: string;
}

export function TabBar({ tabs, className = '' }: TabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to active tab on mount and when active changes
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.active);
    if (activeIndex !== -1 && scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const activeTab = scrollContainer.children[activeIndex] as HTMLElement;
      if (activeTab) {
        const containerWidth = scrollContainer.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        const scrollTarget = tabLeft - (containerWidth / 2) + (tabWidth / 2);

        scrollContainer.scrollTo({
          left: scrollTarget,
          behavior: 'smooth',
        });
      }
    }
  }, [tabs]);

  return (
    <div
      className={`relative overflow-hidden bg-surface border-b border-border ${className}`}
    >
      {/* Gradient fade edges for mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none md:hidden" />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide scroll-smooth md:justify-center md:px-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = tab.active;

          return (
            <button
              key={index}
              onClick={tab.onClick}
              className={`relative flex items-center gap-2 py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                isActive
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground hover:bg-surface-elevated'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}

              <span>{tab.label}</span>

              {/* Badge */}
              {tab.badge && tab.badge > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-elevated text-muted'
                  }`}
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Animated underline indicator */}
        {tabs.some((tab) => tab.active) && (
          <motion.div
            layoutId="tabBarIndicator"
            className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            style={{
              width: 'var(--width, 0px)',
              x: 'var(--x, 0px)',
            }}
          />
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}