'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  Lightbulb,
  Send,
  Clock,
  Trophy,
  History,
  Eye,
  ChevronDown,
  ChevronUp,
  Loader2,
  XCircle,
  Code2,
} from 'lucide-react';
import CodeEditorWithControls from '@/components/editor/CodeEditorWithControls';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

interface SubmissionHistoryItem {
  id: string;
  status: string;
  runtime: number | null;
  score: number | null;
  submittedAt: string;
}

interface UserProgress {
  submissionHistory: SubmissionHistoryItem[];
  bestScore: number | null;
  attemptCount: number;
  isCompleted: boolean;
}

interface ExerciseData {
  id: number;
  lessonId: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starterCode: string;
  hints: string[];
  xpReward: number;
  testCases: TestCase[];
  allTestCases?: TestCase[];
  hiddenTestCaseCount: number;
  totalTestCases: number;
  userProgress?: UserProgress;
}

interface SubmissionResult {
  submissionId: string;
  score: number;
  passedTests: number;
  totalTests: number;
  executionTimeMs: number;
  testResults: Array<{
    testCaseId: number;
    passed: boolean;
    input?: string;
    expectedOutput?: string;
    actualOutput?: string;
    errorMessage?: string;
  }>;
  xpEarned: number;
  isNewBest: boolean;
  isCompleted: boolean;
}

interface HintData {
  exerciseId: number;
  hints: Array<{ order: number; content: string }>;
  totalHints: number;
  viewedCount: number;
  hasMoreHints: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'Dễ';
    case 'medium':
      return 'Trung Bình';
    case 'hard':
      return 'Khó';
    default:
      return 'Trung Bình';
  }
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 ring-1 ring-green-200/50 dark:ring-green-800/50';
    case 'medium':
      return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400 ring-1 ring-yellow-200/50 dark:ring-yellow-800/50';
    case 'hard':
      return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400 ring-1 ring-red-200/50 dark:ring-red-800/50';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


// ─── Loading Skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-8 animate-pulse" />
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-4 animate-pulse" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-8 animate-pulse" />
        <div className="h-[400px] bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ExercisePage() {
  const params = useParams();
  const levelId = params.levelId as string;
  const exerciseId = params.exerciseId as string;

  const [exercise, setExercise] = useState<ExerciseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Hints state
  const [hintData, setHintData] = useState<HintData | null>(null);
  const [isLoadingHints, setIsLoadingHints] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Solution approach state
  const [showApproach, setShowApproach] = useState(false);

  // History state
  const [showHistory, setShowHistory] = useState(false);

  // Code ref for submit
  const [currentCode, setCurrentCode] = useState('');

  // Preload Pyodide in background
  useEffect(() => {
    import('@/lib/pyodide-runner').then(m => m.loadPyodide()).catch(() => {});
  }, []);

  // ─── Fetch Exercise Data ─────────────────────────────────────────────────

  useEffect(() => {
    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  async function fetchExercise() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/exercises/${exerciseId}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Không tìm thấy bài tập này');
        }
        throw new Error('Không thể tải bài tập');
      }

      const data: ExerciseData = await res.json();
      setExercise(data);
      setCurrentCode(data.starterCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  }

  // ─── Custom stdin for "Run" button ──────────────────────────────────────
  const [customStdin, setCustomStdin] = useState('');

  // Auto-fill stdin from first visible test case
  useEffect(() => {
    if (exercise && exercise.testCases.length > 0) {
      setCustomStdin(exercise.testCases[0].input || '');
    }
  }, [exercise]);

  // ─── Run Code Handler (uses Pyodide in-browser, no API) ─────────────────

  const handleRun = async (code: string) => {
    setCurrentCode(code);
    const { runPython } = await import('@/lib/pyodide-runner');
    const result = await runPython(code, customStdin);
    return {
      output: result.stdout,
      error: result.stderr,
      executionTime: result.timeMs,
    };
  };

  // ─── Format Code Handler ─────────────────────────────────────────────────

  const handleFormat = useCallback(async (code: string) => {
    setCurrentCode(code);
    const res = await fetch('/api/code/format', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      throw new Error('Lỗi khi định dạng code');
    }

    const data = await res.json();
    const formatted = data.formattedCode || code;
    setCurrentCode(formatted);
    return formatted;
  }, []);

  // ─── Submit Handler (uses Pyodide client-side for test evaluation) ──────

  const handleSubmit = useCallback(async () => {
    if (!exercise || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionResult(null);
    setError(null);

    try {
      const { runPython } = await import('@/lib/pyodide-runner');

      // Run code against all test cases client-side
      const allTests = exercise.allTestCases ?? exercise.testCases;
      const testResults: Array<{ passed: boolean; input: string; expected: string; actual: string; isHidden: boolean }> = [];
      let passedCount = 0;

      for (const tc of allTests) {
        try {
          const result = await Promise.race([
            runPython(currentCode, tc.input),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout: code chạy quá 10 giây')), 10000))
          ]);
          const actual = result.stdout.trim();
          const expected = tc.expectedOutput.trim();
          const passed = actual === expected;
          if (passed) passedCount++;
          testResults.push({
            passed,
            input: tc.input,
            expected,
            actual,
            isHidden: tc.isHidden ?? false,
          });
        } catch (runErr) {
          testResults.push({
            passed: false,
            input: tc.input,
            expected: tc.expectedOutput.trim(),
            actual: runErr instanceof Error ? runErr.message : 'Runtime error',
            isHidden: tc.isHidden ?? false,
          });
        }
      }

      const totalTests = allTests.length;
      const score = Math.round((passedCount / totalTests) * 100);

      const submissionData: SubmissionResult = {
        submissionId: `local-${Date.now()}`,
        score,
        passedTests: passedCount,
        totalTests,
        executionTimeMs: 0,
        testResults: testResults.map((tr, idx) => ({
          testCaseId: idx + 1,
          passed: tr.passed,
          input: tr.isHidden ? '(ẩn)' : tr.input,
          expectedOutput: tr.isHidden ? '(ẩn)' : tr.expected,
          actualOutput: tr.actual,
        })),
        xpEarned: score === 100 ? (exercise.xpReward ?? 20) : 0,
        isNewBest: true,
        isCompleted: score === 100,
      };

      setSubmissionResult(submissionData);
      setShowResults(true);

      // Wire gamification
      if (score === 100) {
        const { recordProblemSolved } = await import('@/lib/gamification-store');
        recordProblemSolved(exercise.id, exercise.difficulty, false);
      }

      // Also try to report to server (non-blocking, for persistence when DB is available)
      fetch(`/api/exercises/${exerciseId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: currentCode }),
      }).catch(() => { /* ignore server errors in dev mode */ });

    } catch (err) {
      setSubmissionResult({
        submissionId: '',
        score: 0,
        passedTests: 0,
        totalTests: exercise.allTestCases?.length ?? exercise.testCases?.length ?? 0,
        executionTimeMs: 0,
        testResults: [],
        xpEarned: 0,
        isNewBest: false,
        isCompleted: false,
      });
      setShowResults(true);
      setError(err instanceof Error ? err.message : 'Lỗi khi nộp bài');
    } finally {
      setIsSubmitting(false);
    }
  }, [exercise, exerciseId, currentCode, isSubmitting]);

  // ─── Hints Handler ───────────────────────────────────────────────────────

  const handleLoadHints = useCallback(async () => {
    if (isLoadingHints) return;

    setIsLoadingHints(true);

    try {
      const res = await fetch(`/api/exercises/${exerciseId}/hints`);

      if (!res.ok) {
        throw new Error('Không thể tải gợi ý');
      }

      const data: HintData = await res.json();
      setHintData(data);
      setShowHints(true);
    } catch (err) {
      console.error('Error loading hints:', err);
    } finally {
      setIsLoadingHints(false);
    }
  }, [exerciseId, isLoadingHints]);

  // ─── Loading State ─────────────────────────────────────────────────────────

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // ─── Error State ───────────────────────────────────────────────────────────

  if (error && !exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Không thể tải bài tập
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={fetchExercise}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
            <Link
              href={`/learn/${levelId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!exercise) return null;

  const isCompleted = exercise.userProgress?.isCompleted ?? false;

  // ─── Main Render ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href={`/learn/${levelId}/lessons/${exercise.lessonId}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại bài học
          </Link>
        </motion.div>

        {/* Exercise Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              {/* Completion checkmark */}
              {isCompleted && (
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {exercise.title}
              </h1>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                  exercise.difficulty
                )}`}
              >
                {getDifficultyLabel(exercise.difficulty)}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                <Zap className="w-3 h-3" />
                +{exercise.xpReward} XP
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <Trophy className="w-3 h-3" />
                  Đã hoàn thành
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {exercise.description}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Editor + Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Code Editor */}
            <CodeEditorWithControls
              initialCode={exercise.starterCode}
              onRun={handleRun}
              onFormat={handleFormat}
              onCodeChange={setCurrentCode}
              height="350px"
              showOutput={true}
            />

            {/* Custom Input (stdin) */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  📥 Input (stdin)
                </label>
                <div className="flex gap-1">
                  {exercise.testCases.map((tc, i) => (
                    <button
                      key={i}
                      onClick={() => setCustomStdin(tc.input)}
                      className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      VD {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={customStdin}
                onChange={(e) => setCustomStdin(e.target.value)}
                placeholder="Nhập dữ liệu đầu vào ở đây (mỗi giá trị 1 dòng)..."
                className="w-full h-20 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                spellCheck={false}
              />
              <p className="text-xs text-slate-400 mt-1">
                💡 Nhấn &quot;VD 1&quot;, &quot;VD 2&quot; để tự động điền input từ ví dụ kiểm thử
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-3">
              {isSubmitting && (
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tải Python runtime & chấm bài...</span>
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang chấm...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Nộp bài
                  </>
                )}
              </button>

              {exercise.userProgress && exercise.userProgress.bestScore !== null && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Điểm cao nhất: <span className="font-semibold text-blue-600 dark:text-blue-400">{exercise.userProgress.bestScore}%</span>
                </span>
              )}
            </div>

            {/* Submission Results */}
            <AnimatePresence>
              {showResults && submissionResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <SubmissionResultPanel result={submissionResult} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Detailed Explanation after perfect score */}
            {submissionResult && submissionResult.score === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl border border-emerald-200 dark:border-emerald-800/50 p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Giải thích chi tiết</h3>
                    <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70">Phân tích cách giải tối ưu</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                    <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-1">Thuật toán</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Bài này sử dụng kỹ thuật cơ bản: đọc input → xử lý → in output. Hãy chú ý cách ép kiểu và format output.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                    <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-1">Độ phức tạp</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Thời gian: O(1) — Không gian: O(1)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                    <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-1">Bài học rút ra</h4>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>Luôn ép kiểu khi đọc input: int() cho số nguyên, float() cho số thực</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>Dùng f-string để format output theo yêu cầu đề bài</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>Kiểm tra kỹ format output (dấu cách, xuống dòng) trước khi nộp</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Solution Approach - shown as expandable panel */}
            {exercise.hints && exercise.hints.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-xl border border-amber-200 dark:border-amber-800/50 p-5 shadow-sm">
                <button
                  onClick={() => setShowApproach(!showApproach)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">Gợi ý cách giải</h3>
                      <p className="text-xs text-amber-700/70 dark:text-amber-400/70">Nhấn để xem hướng dẫn từng bước</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-amber-600 transition-transform ${showApproach ? 'rotate-180' : ''}`} />
                </button>
                
                {showApproach && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 space-y-3"
                  >
                    {exercise.hints.map((hint, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="flex gap-3 items-start"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center text-xs font-bold text-amber-800 dark:text-amber-200">
                          {i + 1}
                        </div>
                        <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed pt-0.5">{hint}</p>
                      </motion.div>
                    ))}
                    
                    <div className="mt-4 p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50 dark:border-amber-700/30">
                      <p className="text-xs text-amber-800 dark:text-amber-300 italic">
                        💡 Mẹo: Hãy thử tự giải trước khi xem gợi ý. Nếu bí, hãy đọc từng bước một và suy nghĩ trước khi đọc bước tiếp theo.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column: Test Cases, Hints, History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Visible Test Cases */}
            <TestCasesPanel testCases={exercise.testCases} hiddenCount={exercise.hiddenTestCaseCount} />

            {/* Hints Section */}
            <HintsPanel
              hintData={hintData}
              showHints={showHints}
              isLoading={isLoadingHints}
              onLoadHints={handleLoadHints}
              onToggle={() => setShowHints(!showHints)}
            />

            {/* Submission History */}
            {exercise.userProgress && exercise.userProgress.submissionHistory.length > 0 && (
              <HistoryPanel
                history={exercise.userProgress.submissionHistory}
                showHistory={showHistory}
                onToggle={() => setShowHistory(!showHistory)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


// ─── Submission Result Panel ─────────────────────────────────────────────────

function SubmissionResultPanel({ result }: { result: SubmissionResult }) {
  const isPerfect = result.score === 100;
  const hasFailed = result.score < 100;

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 ${
        isPerfect
          ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800'
          : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'
      }`}
    >
      {/* Score Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {isPerfect ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-500" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {isPerfect ? 'Chính xác!' : 'Kết quả nộp bài'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {result.passedTests}/{result.totalTests} test cases đạt
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${isPerfect ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
            {result.score}%
          </p>
          {result.xpEarned > 0 && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              +{result.xpEarned} XP
            </p>
          )}
        </div>
      </div>

      {/* Execution Time */}
      {result.executionTimeMs > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Thời gian thực thi: {result.executionTimeMs}ms
        </p>
      )}

      {/* Per-test-case Results */}
      {result.testResults.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Chi tiết kết quả:
          </h4>
          {result.testResults.map((tr, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-3 text-sm ${
                tr.passed
                  ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {tr.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
                <span className={`font-medium ${tr.passed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  Test {idx + 1}: {tr.passed ? 'Đạt' : 'Không đạt'}
                </span>
              </div>

              {!tr.passed && (
                <div className="ml-6 space-y-1 mt-2">
                  {tr.input && (
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Đầu vào:</span>{' '}
                      <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">{tr.input}</code>
                    </p>
                  )}
                  {tr.expectedOutput && (
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Kết quả mong đợi:</span>{' '}
                      <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">{tr.expectedOutput}</code>
                    </p>
                  )}
                  {tr.actualOutput && (
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Kết quả thực tế:</span>{' '}
                      <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">{tr.actualOutput}</code>
                    </p>
                  )}
                  {tr.errorMessage && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                      <span className="font-medium">Lỗi:</span> {tr.errorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Best indicator */}
      {result.isNewBest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium"
        >
          <Trophy className="w-4 h-4" />
          Kỷ lục mới!
        </motion.div>
      )}
    </div>
  );
}

// ─── Test Cases Panel ────────────────────────────────────────────────────────

function TestCasesPanel({ testCases, hiddenCount }: { testCases: TestCase[]; hiddenCount: number }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-5 h-5 text-blue-500" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Ví dụ kiểm thử
        </h3>
      </div>

      {testCases.length > 0 ? (
        <div className="space-y-3">
          {testCases.map((tc, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700"
            >
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Ví dụ {idx + 1}
              </p>
              <div className="space-y-1.5">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Đầu vào:</span>
                  <pre className="text-xs font-mono bg-slate-100 dark:bg-slate-800 rounded px-2 py-1 mt-0.5 text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all">
                    {tc.input || '(không có)'}
                  </pre>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Kết quả mong đợi:</span>
                  <pre className="text-xs font-mono bg-slate-100 dark:bg-slate-800 rounded px-2 py-1 mt-0.5 text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all">
                    {tc.expectedOutput}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Không có ví dụ kiểm thử công khai
        </p>
      )}

      {hiddenCount > 0 && (
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          + {hiddenCount} test ẩn
        </p>
      )}
    </div>
  );
}

// ─── Hints Panel ─────────────────────────────────────────────────────────────

function HintsPanel({
  hintData,
  showHints,
  isLoading,
  onLoadHints,
  onToggle,
}: {
  hintData: HintData | null;
  showHints: boolean;
  isLoading: boolean;
  onLoadHints: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Gợi ý
          </h3>
        </div>

        {!hintData ? (
          <button
            onClick={onLoadHints}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Eye className="w-3 h-3" />
            )}
            Xem gợi ý
          </button>
        ) : (
          <button
            onClick={onToggle}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showHints && hintData && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2">
              {hintData.hints.map((hint) => (
                <div
                  key={hint.order}
                  className="bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-3 border border-yellow-100 dark:border-yellow-900/30"
                >
                  <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                    Gợi ý {hint.order}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {hint.content}
                  </p>
                </div>
              ))}

              {hintData.hasMoreHints && (
                <button
                  onClick={onLoadHints}
                  disabled={isLoading}
                  className="w-full text-center py-2 text-xs font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Đang tải...' : `Xem gợi ý tiếp theo (${hintData.viewedCount}/${hintData.totalHints})`}
                </button>
              )}

              {!hintData.hasMoreHints && hintData.hints.length > 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-1">
                  Đã xem hết gợi ý ({hintData.viewedCount}/{hintData.totalHints})
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── History Panel ───────────────────────────────────────────────────────────

function HistoryPanel({
  history,
  showHistory,
  onToggle,
}: {
  history: SubmissionHistoryItem[];
  showHistory: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-purple-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Lịch sử nộp bài
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            ({history.length})
          </span>
        </div>
        {showHistory ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2">
              {history.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    {item.score !== null && item.score === 100 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.score !== null ? `${item.score}%` : item.status}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {formatDate(item.submittedAt)}
                      </p>
                    </div>
                  </div>
                  {item.runtime !== null && (
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {item.runtime}ms
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
