'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook đồng bộ state với localStorage.
 * SSR-safe: trả về initialValue trên server, đồng bộ sau khi mount.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // SSR-safe: luôn khởi tạo với initialValue
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Đọc từ localStorage sau khi mount (client-side only)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Lỗi đọc localStorage key "${key}":`, error);
    }
    setIsHydrated(true);
  }, [key]);

  // Lưu vào localStorage khi giá trị thay đổi
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Lỗi ghi localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Xóa giá trị khỏi localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Lỗi xóa localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
