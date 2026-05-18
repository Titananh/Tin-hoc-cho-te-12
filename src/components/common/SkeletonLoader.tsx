'use client';

import React from 'react';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'card' | 'button';

interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const variantStyles: Record<SkeletonVariant, { defaultHeight: string; defaultWidth: string; rounded: string }> = {
  text: {
    defaultHeight: '1rem',
    defaultWidth: '100%',
    rounded: 'rounded',
  },
  title: {
    defaultHeight: '1.5rem',
    defaultWidth: '60%',
    rounded: 'rounded',
  },
  avatar: {
    defaultHeight: '3rem',
    defaultWidth: '3rem',
    rounded: 'rounded-full',
  },
  card: {
    defaultHeight: '200px',
    defaultWidth: '100%',
    rounded: 'rounded-xl',
  },
  button: {
    defaultHeight: '2.5rem',
    defaultWidth: '120px',
    rounded: 'rounded-lg',
  },
};

export function SkeletonLoader({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const { defaultHeight, defaultWidth, rounded } = variantStyles[variant];

  const style = {
    width: width ?? defaultWidth,
    height: height ?? defaultHeight,
  };

  const skeletonElements = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`skeleton ${rounded} ${className}`}
      style={style}
    />
  ));

  return count === 1 ? skeletonElements[0] : <div className="flex flex-col gap-3">{skeletonElements}</div>;
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-surface rounded-xl p-4 border border-border ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonLoader variant="avatar" width="48px" height="48px" />
        <div className="flex-1">
          <SkeletonLoader variant="title" width="60%" height="1rem" />
          <div className="mt-2">
            <SkeletonLoader variant="text" width="40%" height="0.75rem" />
          </div>
        </div>
      </div>
      <SkeletonLoader variant="text" count={3} />
      <div className="mt-4 flex gap-2">
        <SkeletonLoader variant="button" width="80px" />
        <SkeletonLoader variant="button" width="100px" />
      </div>
    </div>
  );
}

interface SkeletonListProps {
  count?: number;
  itemHeight?: string;
}

export function SkeletonList({ count = 5, itemHeight = '60px' }: SkeletonListProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="bg-surface rounded-xl p-4 border border-border flex items-center gap-4"
          style={{ height: itemHeight }}
        >
          <SkeletonLoader variant="avatar" width="40px" height="40px" />
          <div className="flex-1">
            <SkeletonLoader variant="title" width="50%" height="0.875rem" />
          </div>
          <SkeletonLoader variant="button" width="80px" />
        </div>
      ))}
    </div>
  );
}