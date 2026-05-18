'use client';

import React, { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value with a specified delay.
 * Useful for search inputs, auto-save, and other scenarios where
 * you want to delay processing until the user stops changing a value.
 * 
 * @template T - The type of value to debounce
 * @param {T} value - The value to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {T} The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // API call will only fire 500ms after user stops typing
 *   fetchResults(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timeout if value changes
    // within the delay period
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}