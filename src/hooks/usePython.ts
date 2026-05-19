'use client';

import { useCallback, useEffect, useState } from 'react';
import { loadPyodide, runPython, type PyodideRunResult } from '@/lib/pyodide-runner';

export interface UsePythonState {
  /** True while Pyodide WebAssembly is downloading + initializing */
  loading: boolean;
  /** True when Pyodide is ready and runs are fast */
  ready: boolean;
  /** True while a code execution is in progress */
  running: boolean;
  /** Error message during initialization, if any */
  loadError: string | null;
}

export interface UsePython extends UsePythonState {
  run: (code: string, stdin?: string) => Promise<PyodideRunResult>;
}

/**
 * React hook that manages Pyodide lifecycle and exposes a run() function.
 * Pyodide is downloaded once per session (~10MB cached) then runs are
 * fully client-side and instantaneous.
 */
export function usePython(): UsePython {
  const [state, setState] = useState<UsePythonState>({
    loading: false,
    ready: false,
    running: false,
    loadError: null,
  });

  // Kick off background loading on mount so first run feels fast
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
    loadPyodide()
      .then(() => {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, ready: true, loadError: null }));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          ready: false,
          loadError: err instanceof Error ? err.message : 'Không thể tải Python runtime',
        }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const run = useCallback(async (code: string, stdin = '') => {
    setState((s) => ({ ...s, running: true }));
    try {
      const result = await runPython(code, stdin);
      return result;
    } finally {
      setState((s) => ({ ...s, running: false }));
    }
  }, []);

  return { ...state, run };
}
