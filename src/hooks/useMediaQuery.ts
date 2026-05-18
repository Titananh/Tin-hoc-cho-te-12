'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design using CSS media queries.
 * Detects and tracks changes to media query matching state.
 * 
 * @param {string} query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} Boolean indicating if the media query matches
 * 
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * 
 * // Mobile-first responsive component
 * return (
 *   <div className={isDesktop ? 'grid-cols-3' : 'grid-cols-1'}>
 *     Content
 *   </div>
 * );
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // Create the media query list
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers (addEventListener is supported)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      
      // Cleanup listener
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      // Legacy browsers (for older Safari versions)
      mediaQuery.addListener(handleChange);
      
      // Cleanup listener
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
}