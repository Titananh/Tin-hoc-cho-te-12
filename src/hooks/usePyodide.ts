'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// Pyodide types (simplified)
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  globals: { get: (name: string) => unknown };
  setStdout: (options: { batched: (msg: string) => void }) => void;
  setStderr: (options: { batched: (msg: string) => void }) => void;
  setStdin: (options: { stdin: () => string }) => void;
}

interface PyodideRunResult {
  output: string;
  error: string | null;
  executionTime: number;
}

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

let pyodideInstance: PyodideInterface | null = null;
let pyodideLoadingPromise: Promise<PyodideInterface> | null = null;

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';

async function loadPyodideRuntime(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = new Promise<PyodideInterface>((resolve, reject) => {
    // Load the script if not already loaded
    if (!window.loadPyodide) {
      const script = document.createElement('script');
      script.src = `${PYODIDE_CDN}pyodide.js`;
      script.async = true;
      script.onload = async () => {
        try {
          const pyodide = await window.loadPyodide({
            indexURL: PYODIDE_CDN,
          });
          pyodideInstance = pyodide;
          resolve(pyodide);
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = () => reject(new Error('Failed to load Pyodide script'));
      document.head.appendChild(script);
    } else {
      window.loadPyodide({ indexURL: PYODIDE_CDN })
        .then((pyodide) => {
          pyodideInstance = pyodide;
          resolve(pyodide);
        })
        .catch(reject);
    }
  });

  return pyodideLoadingPromise;
}

export function usePyodide() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(!!pyodideInstance);
  const [loadError, setLoadError] = useState<string | null>(null);
  const inputQueueRef = useRef<string[]>([]);

  // Load Pyodide on first use
  const loadPyodide = useCallback(async () => {
    if (pyodideInstance) {
      setIsReady(true);
      return;
    }
    
    setIsLoading(true);
    setLoadError(null);
    
    try {
      await loadPyodideRuntime();
      setIsReady(true);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load Python runtime');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-load on mount
  useEffect(() => {
    loadPyodide();
  }, [loadPyodide]);

  // Run Python code
  const runCode = useCallback(async (
    code: string,
    inputs: string[] = []
  ): Promise<PyodideRunResult> => {
    if (!pyodideInstance) {
      await loadPyodideRuntime();
    }

    const pyodide = pyodideInstance!;
    const outputLines: string[] = [];
    const errorLines: string[] = [];
    inputQueueRef.current = [...inputs];

    // Redirect stdout
    pyodide.setStdout({
      batched: (msg: string) => {
        outputLines.push(msg);
      }
    });

    // Redirect stderr
    pyodide.setStderr({
      batched: (msg: string) => {
        errorLines.push(msg);
      }
    });

    // Set stdin for input() calls
    pyodide.setStdin({
      stdin: () => {
        if (inputQueueRef.current.length > 0) {
          return inputQueueRef.current.shift()!;
        }
        return '';
      }
    });

    const startTime = performance.now();

    try {
      await pyodide.runPythonAsync(code);
      const executionTime = Math.round(performance.now() - startTime);

      return {
        output: outputLines.join('\n'),
        error: errorLines.length > 0 ? errorLines.join('\n') : null,
        executionTime
      };
    } catch (err) {
      const executionTime = Math.round(performance.now() - startTime);
      const errorMsg = err instanceof Error ? err.message : String(err);
      
      // Clean up Pyodide error messages for readability
      const cleanError = errorMsg
        .replace(/PythonError: Traceback \(most recent call last\):\n\s+File "<exec>", line/, 'Traceback:\n  File "<code>", line')
        .replace(/PythonError:\s*/, '');

      return {
        output: outputLines.join('\n'),
        error: cleanError,
        executionTime
      };
    }
  }, []);

  // Run code with test cases
  const runWithTestCases = useCallback(async (
    code: string,
    testCases: Array<{ input: string; expected_output: string; is_hidden: boolean }>
  ): Promise<{
    results: Array<{ passed: boolean; actual: string; expected: string; input: string }>;
    passedCount: number;
    totalCount: number;
  }> => {
    const results: Array<{ passed: boolean; actual: string; expected: string; input: string }> = [];

    for (const tc of testCases) {
      const inputs = tc.input.split('\n').filter(s => s.length > 0);
      const result = await runCode(code, inputs);
      
      const actual = (result.error ? `Error: ${result.error}` : result.output).trim();
      const expected = tc.expected_output.trim();
      const passed = actual === expected;

      results.push({
        passed,
        actual,
        expected,
        input: tc.input
      });
    }

    return {
      results,
      passedCount: results.filter(r => r.passed).length,
      totalCount: results.length
    };
  }, [runCode]);

  return {
    isLoading,
    isReady,
    loadError,
    loadPyodide,
    runCode,
    runWithTestCases
  };
}
