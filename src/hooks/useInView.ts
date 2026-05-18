'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInViewOptions {
  /**
   * Threshold value between 0 and 1 indicating the percentage
   * of the element that should be visible before triggering.
   * 0 means any small part visible, 1 means fully visible.
   * @default 0
   */
  threshold?: number;
  /**
   * Margin around the root (viewport) in CSS units.
   * Allows expanding/shrinking the detection area.
   * @default '0px'
   */
  rootMargin?: string;
  /**
   * If true, stops detection once element becomes visible.
   * If false, continues detecting (element exits and re-enters).
   * @default true
   */
  once?: boolean;
}

/**
 * Custom hook that detects when an element enters the viewport.
 * Uses the Intersection Observer API for efficient detection.
 * 
 * @param {UseInViewOptions} options - Configuration options
 * @returns {[React.RefObject<HTMLElement>, boolean]} Tuple containing:
 *   - ref: Ref to attach to the element to track
 *   - isInView: Boolean indicating if element is currently in view
 * 
 * @example
 * const [ref, isInView] = useInView({ threshold: 0.5, once: true });
 * 
 * return (
 *   <div ref={ref}>
 *     {isInView && <Content />}
 *   </div>
 * );
 * 
 * @example With rootMargin
 * const [ref, isInView] = useInView({ 
 *   threshold: 0,
 *   rootMargin: '100px' // Start loading when 100px away from viewport
 * });
 */
export function useInView({
  threshold = 0,
  rootMargin = '0px',
  once = true,
}: UseInViewOptions = {}): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (once) {
        // When 'once' is true, only trigger on enter
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once triggered, disconnect observer if 'once' is enabled
          observerRef.current?.disconnect();
        }
      } else {
        // When 'once' is false, toggle based on intersection state
        setIsInView(entry.isIntersecting);
      }
    },
    [once]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create observer with options
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current = observer;

    // Start observing
    observer.observe(element);

    // Cleanup on unmount or when dependencies change
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection]);

  return [ref, isInView];
}