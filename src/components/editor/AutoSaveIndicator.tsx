'use client';

import { useEffect, useState } from 'react';

export interface AutoSaveIndicatorProps {
  /** Timestamp of last successful save */
  lastSaved: Date | null;
  /** Whether a save is currently in progress */
  isSaving: boolean;
}

/**
 * Small indicator showing auto-save status.
 * Displays "Đang lưu..." when saving, "Đã lưu" with timestamp when saved.
 */
export function AutoSaveIndicator({ lastSaved, isSaving }: AutoSaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  // Show "Đã lưu" indicator briefly after a save completes
  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => {
        setShowSaved(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  if (isSaving) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400">
        <svg
          className="h-3.5 w-3.5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span>Đang lưu...</span>
      </div>
    );
  }

  if (showSaved && lastSaved) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
        <svg
          className="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>Đã lưu tự động</span>
      </div>
    );
  }

  if (lastSaved) {
    const timeStr = lastSaved.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <svg
          className="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>Đã lưu lúc {timeStr}</span>
      </div>
    );
  }

  return null;
}

export default AutoSaveIndicator;
