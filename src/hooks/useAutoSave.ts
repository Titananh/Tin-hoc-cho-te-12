'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoSaveOptions {
  /** localStorage key to save under */
  key: string;
  /** Value to save */
  value: string;
  /** Debounce delay in milliseconds (default: 30000ms = 30s) */
  delay?: number;
}

interface UseAutoSaveReturn {
  /** Timestamp of last successful save */
  lastSaved: Date | null;
  /** Whether a save is currently in progress */
  isSaving: boolean;
  /** The value loaded from localStorage on mount */
  savedValue: string | null;
}

/**
 * Auto-saves a value to localStorage at a debounced interval.
 * Also saves on component unmount and loads saved value on mount.
 */
export function useAutoSave({
  key,
  value,
  delay = 30000,
}: UseAutoSaveOptions): UseAutoSaveReturn {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedValue, setSavedValue] = useState<string | null>(null);

  const valueRef = useRef(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep valueRef in sync
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Load saved value from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setSavedValue(stored);
      }
    } catch {
      // localStorage may be unavailable
    }
  }, [key]);

  // Save function
  const save = useCallback(() => {
    setIsSaving(true);
    try {
      localStorage.setItem(key, valueRef.current);
      setLastSaved(new Date());
    } catch {
      // localStorage may be full or unavailable
    } finally {
      setIsSaving(false);
    }
  }, [key]);

  // Debounced auto-save: restart timer whenever value changes
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      save();
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay, save]);

  // Save on unmount
  useEffect(() => {
    return () => {
      save();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    lastSaved,
    isSaving,
    savedValue,
  };
}
