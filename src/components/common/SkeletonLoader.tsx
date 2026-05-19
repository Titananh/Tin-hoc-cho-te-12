'use client';

import React from 'react';

/**
 * Base Skeleton component với hiệu ứng pulse animation
 * Hỗ trợ dark mode tự động
 */
interface SkeletonBaseProps {
  className?: string;
  children?: React.ReactNode;
}

function SkeletonBase({ className = '', children }: SkeletonBaseProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}
      role="status"
      aria-label="Đang tải..."
    >
      {children}
      <span className="sr-only">Đang tải...</span>
    </div>
  );
}

/**
 * Card Skeleton - Hiển thị placeholder cho card content
 */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3">
        <SkeletonBase className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <SkeletonBase className="h-4 w-3/4" />
          <SkeletonBase className="h-3 w-1/2" />
        </div>
      </div>
      {/* Body */}
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-5/6" />
        <SkeletonBase className="h-4 w-4/6" />
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center pt-2">
        <SkeletonBase className="h-8 w-24 rounded-md" />
        <SkeletonBase className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Table Skeleton - Hiển thị placeholder cho bảng dữ liệu
 */
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className = '',
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`w-full space-y-3 ${className}`} role="status" aria-label="Đang tải bảng dữ liệu...">
      {/* Table header */}
      <div className="flex space-x-4 pb-3 border-b border-slate-200 dark:border-slate-700">
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBase key={`header-${i}`} className="h-4 flex-1" />
        ))}
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4 py-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonBase
              key={`cell-${rowIndex}-${colIndex}`}
              className={`h-4 flex-1 ${colIndex === 0 ? 'w-1/4' : ''}`}
            />
          ))}
        </div>
      ))}
      <span className="sr-only">Đang tải bảng dữ liệu...</span>
    </div>
  );
}

/**
 * Text Skeleton - Hiển thị placeholder cho đoạn văn bản
 */
export function TextSkeleton({
  lines = 3,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Đang tải nội dung...">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={`line-${i}`}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
      <span className="sr-only">Đang tải nội dung...</span>
    </div>
  );
}

/**
 * Avatar Skeleton - Hiển thị placeholder cho avatar
 */
export function AvatarSkeleton({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  return (
    <SkeletonBase className={`rounded-full ${sizeClasses[size]} ${className}`} />
  );
}

/**
 * Dashboard Skeleton - Skeleton cho trang dashboard
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-2">
            <SkeletonBase className="h-4 w-1/2" />
            <SkeletonBase className="h-8 w-3/4" />
          </div>
        ))}
      </div>
      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

/**
 * Lesson Skeleton - Skeleton cho trang bài học
 */
export function LessonSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Title */}
      <SkeletonBase className="h-8 w-2/3" />
      {/* Meta info */}
      <div className="flex space-x-4">
        <SkeletonBase className="h-5 w-24 rounded-full" />
        <SkeletonBase className="h-5 w-20 rounded-full" />
        <SkeletonBase className="h-5 w-28 rounded-full" />
      </div>
      {/* Content */}
      <TextSkeleton lines={6} />
      {/* Code block */}
      <SkeletonBase className="h-40 w-full rounded-lg" />
      {/* More text */}
      <TextSkeleton lines={4} />
    </div>
  );
}

export default {
  CardSkeleton,
  TableSkeleton,
  TextSkeleton,
  AvatarSkeleton,
  DashboardSkeleton,
  LessonSkeleton,
};
