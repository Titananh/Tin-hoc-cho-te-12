'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeEditor from './CodeEditor';
import { useTheme } from '@/hooks/useTheme';

// ─── Props Interface ────────────────────────────────────────────────────────────

export interface CodeEditorWithControlsProps {
  /** Initial code content / template */
  initialCode: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Callback to execute code - returns output, error, and execution time */
  onRun?: (code: string) => Promise<{ output: string; error: string; executionTime: number }>;
  /** Callback to format code - returns formatted code */
  onFormat?: (code: string) => Promise<string>;
  /** Callback when code changes (for parent to track current code) */
  onCodeChange?: (code: string) => void;
  /** Editor height */
  height?: string;
  /** Whether to show the output panel */
  showOutput?: boolean;
}

// ─── Execution Result Interface ─────────────────────────────────────────────────

interface ExecutionResult {
  output: string;
  error: string;
  executionTime: number;
}

// ─── CodeEditorWithControls Component ───────────────────────────────────────────

export default function CodeEditorWithControls({
  initialCode,
  language = 'python',
  onRun,
  onFormat,
  onCodeChange,
  height = '400px',
  showOutput = true,
}: CodeEditorWithControlsProps) {
  const { theme } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Notify parent when code changes
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  }, [onCodeChange]);

  // Auto-save: load saved code from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `code_autosave_${initialCode.slice(0, 20)}`;
    const saved = localStorage.getItem(key);
    if (saved && saved !== initialCode) {
      setCode(saved);
      onCodeChange?.(saved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save: persist code to localStorage on change
  useEffect(() => {
    if (typeof window === 'undefined' || !code || code === initialCode) return;
    const key = `code_autosave_${initialCode.slice(0, 20)}`;
    localStorage.setItem(key, code);
  }, [code, initialCode]);

  // ─── Run Code ───────────────────────────────────────────────────────────────

  // Use ref to always have latest onRun (avoids stale closure with stdin)
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;

  const handleRun = useCallback(async () => {
    if (!onRunRef.current || isRunning) return;

    setIsRunning(true);
    setExecutionResult(null);

    try {
      const result = await onRunRef.current(code);
      setExecutionResult(result);
    } catch (err) {
      setExecutionResult({
        output: '',
        error: err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định',
        executionTime: 0,
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning]);

  // ─── Format Code ───────────────────────────────────────────────────────────

  const handleFormat = useCallback(async () => {
    if (!onFormat) return;

    try {
      const formatted = await onFormat(code);
      setCode(formatted);
    } catch (err) {
      // Silently fail formatting - user can see the code is unchanged
    }
  }, [code, onFormat]);

  // ─── Reset Code ─────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setShowResetConfirm(false);
    setExecutionResult(null);
  }, [initialCode]);

  // ─── Copy Code ──────────────────────────────────────────────────────────────

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch {
      // Clipboard API not available - fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [code]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!e.shiftKey) {
          handleRun(); // Ctrl+Enter = Run
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleRun]);

  return (
    <div className="w-full flex flex-col gap-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* ─── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {/* Run Button */}
        {onRun && (
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md
              bg-green-600 hover:bg-green-700 text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-150"
          >
            {isRunning ? (
              <>
                <LoadingSpinner />
                <span>Đang chạy...</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>Chạy</span>
              </>
            )}
          </button>
        )}
        <span className="text-[10px] text-gray-400 dark:text-gray-500 hidden sm:inline ml-2">
          Ctrl+Enter = Chạy
        </span>

        {/* Format Button */}
        {onFormat && (
          <button
            onClick={handleFormat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md
              bg-purple-600 hover:bg-purple-700 text-white
              transition-colors duration-150"
          >
            <span>✨</span>
            <span>Định dạng</span>
          </button>
        )}

        {/* Reset Button */}
        <button
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md
            bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
            text-gray-700 dark:text-gray-200
            transition-colors duration-150"
        >
          <span>↺</span>
          <span>Đặt lại</span>
        </button>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md
            bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
            text-gray-700 dark:text-gray-200
            transition-colors duration-150"
        >
          <span>📋</span>
          <span>{isCopied ? 'Đã sao chép ✓' : 'Sao chép'}</span>
        </button>
      </div>

      {/* ─── Reset Confirmation ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                Bạn có chắc muốn đặt lại code về ban đầu?
              </span>
              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-xs font-medium rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2.5 py-1 text-xs font-medium rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors"
              >
                Hủy
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Code Editor ─────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          language={language}
          theme={theme}
          height={height}
          onRun={handleRun}
        />
      </div>

      {/* ─── Output Panel ────────────────────────────────────────────────────── */}
      {showOutput && (
        <div className="min-h-[100px] max-h-[250px] overflow-auto bg-gray-900 dark:bg-gray-950 p-3">
          {isRunning ? (
            <div className="flex items-center gap-2 text-blue-400">
              <LoadingSpinner />
              <span className="text-sm">Đang chạy...</span>
            </div>
          ) : executionResult ? (
            <div className="space-y-1 font-mono text-sm">
              {/* stdout */}
              {executionResult.output && (
                <pre className="text-green-400 whitespace-pre-wrap break-words">
                  {executionResult.output}
                </pre>
              )}
              {/* stderr */}
              {executionResult.error && (
                <pre className="text-red-400 whitespace-pre-wrap break-words">
                  {executionResult.error}
                </pre>
              )}
              {/* Execution time */}
              <p className="text-gray-500 text-xs mt-2">
                ⏱ Thời gian thực thi: {executionResult.executionTime}ms
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Nhấn &quot;▶ Chạy&quot; để thực thi code
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Loading Spinner Component ──────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
