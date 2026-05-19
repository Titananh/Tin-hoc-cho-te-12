'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * OptimizedImage - Wrapper quanh next/image với lazy loading,
 * blur placeholder, và responsive sizes
 */
interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /** Hiển thị blur placeholder khi đang tải */
  showBlur?: boolean;
  /** Custom blur data URL (base64) */
  blurDataUrl?: string;
  /** Aspect ratio cho container (ví dụ: "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Fallback khi ảnh lỗi */
  fallbackSrc?: string;
  /** CSS class cho container */
  containerClassName?: string;
}

// Placeholder blur mặc định - 1x1 pixel xám nhạt
const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=';

/**
 * Responsive sizes mặc định cho các breakpoints phổ biến
 * Mobile: 100vw, Tablet: 50vw, Desktop: 33vw
 */
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  showBlur = true,
  blurDataUrl,
  aspectRatio,
  fallbackSrc,
  containerClassName = '',
  className = '',
  sizes,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Nếu ảnh lỗi và có fallback
  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  // Xác định placeholder props
  const placeholderProps = showBlur
    ? {
        placeholder: 'blur' as const,
        blurDataURL: blurDataUrl || DEFAULT_BLUR_DATA_URL,
      }
    : {};

  const containerStyle = aspectRatio
    ? { aspectRatio }
    : undefined;

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={containerStyle}
    >
      {/* Loading skeleton khi ảnh chưa tải xong */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700 rounded" />
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes || DEFAULT_SIZES}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        {...placeholderProps}
        {...props}
      />

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded">
          <div className="text-center text-slate-400 dark:text-slate-500">
            <svg
              className="mx-auto h-8 w-8 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
            <span className="text-xs">Không tải được ảnh</span>
          </div>
        </div>
      )}
    </div>
  );
}
