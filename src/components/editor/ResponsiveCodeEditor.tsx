'use client';

import { useState, useEffect, useCallback } from 'react';
import CodeEditor from './CodeEditor';
import type { CodeEditorWithControlsProps } from './CodeEditorWithControls';
import { useTheme } from '@/hooks/useTheme';

// ─── Types ──────────────────────────────────────────────────────────────────────

export type EditorLayout = 'split' | 'stacked' | 'editor-only' | 'output-only';

export interface ResponsiveCodeEditorProps extends CodeEditorWithControlsProps {
  /** Layout mode - defaults to 'split' on desktop, 'stacked' on mobile */
  layout?: EditorLayout;
}

// ─── Mobile View Toggle Labels ──────────────────────────────────────────────────

const MOBILE_VIEW_OPTIONS: { value: EditorLayout; label: string }[] = [
  { value: 'editor-only', label: 'Chỉ code' },
  { value: 'split', label: 'Chia đôi' },
  { value: 'output-only', label: 'Chỉ kết quả' },
];

// ─── Hook: Detect Mobile ────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

// ─── Execution Result Interface ─────────────────────────────────────────────────

interface ExecutionResult {
  output: string;
  error: string;
  executionTime: number;
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

// ─── Output Panel Component ─────────────────────────────────────────────────────

function OutputPanel({
  executionResult,
  isRunning,
  minHeight,
}: {
  executionResult: ExecutionResult | null;
  isRunning: boolean;
  minHeight: string;
}) {
  return (
    <div
      className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-900 dark:bg-gray-950"
      style={{ minHeight }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-700 bg-gray-800">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-medium text-gray-300">Kết quả</span>
        {isRunning && (
          <span className="ml-auto text-xs text-blue-400 animate-pulse">
            Đang chạy...
          </span>
        )}
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-3">
        {isRunning ? (
          <div className="flex items-center gap-2 text-blue-400">
            <LoadingSpinner />
            <span className="text-sm">Đang chạy...</span>
          </div>
        ) : executionResult ? (
          <div className="space-y-1 font-mono text-sm">
            {executionResult.output && (
              <pre className="text-green-400 whitespace-pre-wrap break-words">
                {executionResult.output}
              </pre>
            )}
            {executionResult.error && (
              <pre className="text-red-400 whitespace-pre-wrap break-words">
                {executionResult.error}
              </pre>
            )}
            <p className="text-gray-500 text-xs mt-2">
              ⏱ Thời gian: {executionResult.executionTime}ms
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            Nhấn &quot;▶ Chạy&quot; hoặc Ctrl+Enter để thực thi code
          </p>
        )}
      </div>
    </div>
  );
}

// ─── ResponsiveCodeEditor Component ─────────────────────────────────────────────

function ResponsiveCodeEditor({
  initialCode,
  language = 'python',
  onRun,
  onFormat,
  height = '400px',
  showOutput = true,
  layout: layoutProp,
}: ResponsiveCodeEditorProps) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<EditorLayout>('editor-only');
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  // Determine effective layout
  const effectiveLayout = layoutProp ?? (isMobile ? mobileView : 'split');

  // Reset mobile view when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileView('editor-only');
    }
  }, [isMobile]);

  // Determine what to show
  const showEditor = effectiveLayout !== 'output-only';
  const showOutputPanel = showOutput && effectiveLayout !== 'editor-only';

  // Heights based on device
  const editorMinHeight = isMobile ? '200px' : '300px';
  const editorHeight = isMobile ? '200px' : height;

  // ─── Run Code ───────────────────────────────────────────────────────────────

  const handleRun = useCallback(async () => {
    if (!onRun || isRunning) return;

    setIsRunning(true);
    setExecutionResult(null);

    // Auto-switch to output view on mobile after running
    if (isMobile && mobileView === 'editor-only') {
      setMobileView('split');
    }

    try {
      const result = await onRun(code);
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
  }, [code, onRun, isRunning, isMobile, mobileView]);

  // ─── Format Code ───────────────────────────────────────────────────────────

  const handleFormat = useCallback(async () => {
    if (!onFormat) return;
    try {
      const formatted = await onFormat(code);
      setCode(formatted);
    } catch {
      // Silently fail formatting
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
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }, [code]);

  return (
    <div className="w-full">
      {/* ─── Mobile View Toggle ────────────────────────────────────────────── */}
      {isMobile && !layoutProp && (
        <div className="flex items-center gap-1 mb-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
          {MOBILE_VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setMobileView(option.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                mobileView === option.value
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* ─── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 rounded-t-lg border border-b-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
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
      {showResetConfirm && (
        <div className="flex items-center gap-3 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-x border-gray-200 dark:border-gray-700">
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
      )}

      {/* ─── Main Content: Editor + Output ───────────────────────────────────── */}
      <div
        className={`w-full border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg overflow-hidden ${
          effectiveLayout === 'split' && !isMobile
            ? 'grid grid-cols-2'
            : 'flex flex-col'
        }`}
      >
        {/* Editor panel */}
        {showEditor && (
          <div
            className={`w-full ${
              effectiveLayout === 'split' && !isMobile
                ? 'border-r border-gray-200 dark:border-gray-700'
                : ''
            }`}
            style={{ minHeight: editorMinHeight }}
          >
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              theme={theme}
              height={editorHeight}
              onRun={handleRun}
            />
          </div>
        )}

        {/* Output panel */}
        {showOutputPanel && (
          <OutputPanel
            executionResult={executionResult}
            isRunning={isRunning}
            minHeight={editorMinHeight}
          />
        )}
      </div>
    </div>
  );
}

export default ResponsiveCodeEditor;
