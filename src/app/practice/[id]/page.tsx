'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { exercises } from '@/data/content';
import { Exercise, TestCase } from '@/types';
import CodeEditor from '@/components/editor/CodeEditor';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Send,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick,
  Trophy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Info,
  Code2,
  BarChart3,
  Star,
} from 'lucide-react';

// Find exercise by id
function findExercise(id: string): Exercise | null {
  return exercises.find(e => e.id === id) || null;
}

// Mock test case result
interface TestResult {
  passed: boolean;
  output: string;
  expected_output: string;
  runtime: number;
  memory: number;
}

interface RunResult {
  testResults: TestResult[];
  passedCount: number;
  totalCount: number;
  score: number;
  totalRuntime: number;
  totalMemory: number;
}

// Mock run function
function runCode(code: string, testCases: TestCase[], mode: 'run' | 'submit'): RunResult {
  // Simulate running code
  const results: TestResult[] = testCases.map(tc => {
    // Simulate passing/failing based on some simple heuristics
    // In real app, this would call a backend service
    const hasInputHandling = code.includes('input()');
    const hasPrint = code.includes('print(');
    const hasLoop = code.includes('for') || code.includes('while');
    
    // Simulate different scenarios
    const passed = mode === 'run' ? true : Math.random() > 0.3;
    const output = passed ? tc.expected_output : tc.is_hidden ? '***' : 'Sai kết quả';
    
    return {
      passed: mode === 'run' ? true : passed,
      output: tc.is_hidden && mode === 'run' ? '***' : output,
      expected_output: tc.expected_output,
      runtime: Math.floor(Math.random() * 100) + 10,
      memory: Math.floor(Math.random() * 50) + 10,
    };
  });

  const passedCount = results.filter(r => r.passed).length;
  
  return {
    testResults: results,
    passedCount,
    totalCount: testCases.length,
    score: Math.round((passedCount / testCases.length) * 100),
    totalRuntime: results.reduce((sum, r) => sum + r.runtime, 0),
    totalMemory: Math.round(results.reduce((sum, r) => sum + r.memory, 0) / results.length),
  };
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  extreme: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

const difficultyLabels = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
  extreme: 'Cực khó',
};

const difficultyXPColors = {
  easy: 'text-green-500',
  medium: 'text-yellow-500',
  hard: 'text-red-500',
  extreme: 'text-purple-500',
};

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { theme } = useTheme();

  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'testcases'>('output');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const exercise = findExercise(id);

  // Load saved code from localStorage
  useEffect(() => {
    if (exercise) {
      const savedCode = localStorage.getItem(`exercise-code-${exercise.id}`);
      setCode(savedCode || exercise.starter_code);
      const attempts = localStorage.getItem(`exercise-attempts-${exercise.id}`);
      setFailedAttempts(attempts ? parseInt(attempts) : 0);
    }
  }, [exercise]);

  // Save code to localStorage on change
  useEffect(() => {
    if (exercise && code !== exercise.starter_code) {
      localStorage.setItem(`exercise-code-${exercise.id}`, code);
    }
  }, [code, exercise]);

  // Find next and previous exercises
  const currentIndex = exercises.findIndex(e => e.id === id);
  const prevExercise = currentIndex > 0 ? exercises[currentIndex - 1] : null;
  const nextExercise = currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

  const handleRun = useCallback(async () => {
    if (!exercise) return;
    setIsRunning(true);
    setShowResults(false);
    setConsoleOutput([]);
    
    // Simulate running with delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For 'run' mode, we simulate output without checking correctness
    const result = runCode(code, exercise.test_cases, 'run');
    
    // Show console-like output
    setConsoleOutput([
      '>>> Đang chạy code...',
      `>>> Hoàn thành trong ${result.totalRuntime}ms`,
      `>>> Bộ nhớ sử dụng: ${result.totalMemory}KB`,
      '',
      'Kết quả:',
      ...result.testResults
        .filter(tc => !tc.output.includes('***'))
        .map((tc, i) => `Test case ${i + 1}: ${tc.output}`),
    ]);
    
    setIsRunning(false);
  }, [code, exercise]);

  const handleSubmit = useCallback(async () => {
    if (!exercise) return;
    setIsRunning(true);
    setShowResults(false);
    
    // Simulate running with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = runCode(code, exercise.test_cases, 'submit');
    setRunResult(result);
    setShowResults(true);
    setActiveTab('testcases');
    
    if (result.passedCount < result.totalCount) {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      localStorage.setItem(`exercise-attempts-${exercise.id}`, newFailedAttempts.toString());
    }
    
    setIsRunning(false);
  }, [code, exercise, failedAttempts]);

  const handleReset = () => {
    if (exercise && confirm('Bạn có muốn đặt lại code về trạng thái ban đầu?')) {
      setCode(exercise.starter_code);
      setOutput([]);
      setRunResult(null);
      setShowResults(false);
      setConsoleOutput([]);
      localStorage.removeItem(`exercise-code-${exercise.id}`);
    }
  };

  const revealNextHint = () => {
    if (exercise && hintsRevealed < exercise.hints.length) {
      setHintsRevealed(prev => prev + 1);
    }
  };

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-surface rounded-2xl p-8 shadow-xl"
        >
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Không tìm thấy bài tập</h1>
          <p className="text-muted mb-6">
            Bài tập bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay về trang chủ
          </a>
        </motion.div>
      </div>
    );
  }

  const visibleTestCases = exercise.test_cases.filter(tc => !tc.is_hidden);
  const hiddenTestCasesCount = exercise.test_cases.filter(tc => tc.is_hidden).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 rounded-lg hover:bg-border transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-foreground">{exercise.title}</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
                  {difficultyLabels[exercise.difficulty]}
                </span>
                <span className={`flex items-center gap-1 ${difficultyXPColors[exercise.difficulty]}`}>
                  <Trophy className="w-3.5 h-3.5" />
                  {exercise.xp_reward} XP
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevExercise && router.push(`/practice/${prevExercise.id}`)}
              disabled={!prevExercise}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-border hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Bài trước</span>
            </button>
            <span className="text-sm text-muted px-2">
              {currentIndex + 1} / {exercises.length}
            </span>
            <button
              onClick={() => nextExercise && router.push(`/practice/${nextExercise.id}`)}
              disabled={!nextExercise}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-border hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Bài sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Exercise Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-96 bg-surface border-b lg:border-b-0 lg:border-r border-border overflow-y-auto"
        >
          <div className="p-4 space-y-4">
            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Mô tả
              </h2>
              <p className="text-sm text-muted leading-relaxed">{exercise.description}</p>
            </div>

            {/* Input/Output Format */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Định dạng Input/Output
              </h2>
              <div className="bg-muted/20 rounded-lg p-3 text-sm font-mono">
                <p className="text-muted mb-1">Input: standard input</p>
                <p className="text-muted">Output: standard output</p>
              </div>
            </div>

            {/* Example Test Cases */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Ví dụ Test Cases
              </h2>
              <div className="space-y-3">
                {visibleTestCases.map((tc, index) => (
                  <div key={index} className="bg-muted/20 rounded-lg overflow-hidden">
                    <div className="px-3 py-2 border-b border-border">
                      <span className="text-xs font-medium text-muted">Test Case {index + 1}</span>
                    </div>
                    <div className="p-3 space-y-2">
                      <div>
                        <span className="text-xs text-muted uppercase tracking-wide">Input</span>
                        <pre className="mt-1 text-sm font-mono bg-background rounded p-2 whitespace-pre-wrap">{tc.input}</pre>
                      </div>
                      <div>
                        <span className="text-xs text-muted uppercase tracking-wide">Output</span>
                        <pre className="mt-1 text-sm font-mono bg-background rounded p-2 whitespace-pre-wrap">{tc.expected_output}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Test Cases */}
            {hiddenTestCasesCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <EyeOff className="w-4 h-4" />
                <span>{hiddenTestCasesCount} test case ẩn</span>
              </div>
            )}

            {/* Hints */}
            <div>
              <button
                onClick={() => setHintsExpanded(!hintsExpanded)}
                className="w-full flex items-center justify-between text-sm font-semibold text-foreground mb-2"
              >
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  Gợi ý ({hintsRevealed}/{exercise.hints.length})
                </span>
                {hintsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {hintsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {exercise.hints.slice(0, hintsRevealed).map((hint, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-warning/10 rounded-lg">
                        <span className="text-warning font-bold">{index + 1}.</span>
                        <span className="text-sm text-foreground">{hint}</span>
                      </div>
                    ))}
                    {hintsRevealed < exercise.hints.length && (
                      <button
                        onClick={revealNextHint}
                        className="w-full py-2 text-sm text-warning hover:bg-warning/10 rounded-lg transition-colors"
                      >
                        + Reveal hint {hintsRevealed + 1}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Constraints */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2">Ràng buộc</h2>
              <ul className="text-sm text-muted space-y-1">
                <li>• 1 ≤ n ≤ 10^5</li>
                <li>• Độ phức tạp: O(n)</li>
              </ul>
            </div>
          </div>
        </motion.aside>

        {/* Editor & Output Area */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* Tabs */}
          <div className="flex items-center border-b border-border bg-surface px-4">
            <button
              onClick={() => setActiveTab('output')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'output'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              Console
            </button>
            <button
              onClick={() => setActiveTab('testcases')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'testcases'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              Kết quả Test Cases
              {showResults && runResult && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  runResult.passedCount === runResult.totalCount
                    ? 'bg-success/20 text-success'
                    : 'bg-error/20 text-error'
                }`}>
                  {runResult.passedCount}/{runResult.totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Code Editor */}
          <div className="flex-1 min-h-[300px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              height="100%"
            />
          </div>

          {/* Output Panel */}
          <div className="h-64 border-t border-border bg-surface">
            <AnimatePresence mode="wait">
              {activeTab === 'output' ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                    <span className="text-sm font-medium text-muted">Output</span>
                    {consoleOutput.length > 0 && (
                      <button
                        onClick={() => setConsoleOutput([])}
                        className="text-xs text-muted hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex-1 overflow-auto p-4 font-mono text-sm">
                    {consoleOutput.length > 0 ? (
                      consoleOutput.map((line, i) => (
                        <div key={i} className={line.startsWith('>>>') ? 'text-muted' : 'text-foreground'}>
                          {line}
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted">
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Nhấn &quot;Chạy&quot; để xem kết quả</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="testcases"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full overflow-auto p-4"
                >
                  {showResults && runResult ? (
                    <div className="space-y-4">
                      {/* Score Summary */}
                      <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl">
                        <div className={`text-3xl font-bold ${
                          runResult.score === 100 ? 'text-success' : runResult.score >= 50 ? 'text-warning' : 'text-error'
                        }`}>
                          {runResult.score}%
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-border rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                runResult.score === 100 ? 'bg-success' : runResult.score >= 50 ? 'bg-warning' : 'bg-error'
                              }`}
                              style={{ width: `${runResult.score}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm text-muted">
                          {runResult.passedCount}/{runResult.totalCount} passed
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 p-3 bg-muted/10 rounded-lg">
                          <Clock className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted">Runtime</p>
                            <p className="font-medium">{runResult.totalRuntime}ms</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-muted/10 rounded-lg">
                          <MemoryStick className="w-4 h-4 text-secondary" />
                          <div>
                            <p className="text-xs text-muted">Memory</p>
                            <p className="font-medium">{runResult.totalMemory}KB</p>
                          </div>
                        </div>
                      </div>

                      {/* Test Results */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-foreground">Chi tiết test cases</h3>
                        {runResult.testResults.map((result, index) => {
                          const tc = exercise.test_cases[index];
                          return (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${
                                result.passed
                                  ? 'border-success/30 bg-success/5'
                                  : 'border-error/30 bg-error/5'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {result.passed ? (
                                    <CheckCircle2 className="w-4 h-4 text-success" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-error" />
                                  )}
                                  <span className="text-sm font-medium">
                                    Test Case {index + 1}
                                    {tc.is_hidden && <span className="ml-2 text-xs text-muted">(ẩn)</span>}
                                  </span>
                                </div>
                                <span className="text-xs text-muted">{result.runtime}ms</span>
                              </div>
                              {!tc.is_hidden && (
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-xs text-muted uppercase">Output</span>
                                    <pre className="mt-1 font-mono bg-background rounded p-2">{result.output}</pre>
                                  </div>
                                  <div>
                                    <span className="text-xs text-muted uppercase">Expected</span>
                                    <pre className="mt-1 font-mono bg-background rounded p-2">{result.expected_output}</pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Show Solution Button */}
                      {failedAttempts >= 3 && !showSolution && (
                        <button
                          onClick={() => setShowSolution(true)}
                          className="w-full py-3 bg-secondary/10 text-secondary rounded-lg font-medium hover:bg-secondary/20 transition-colors"
                        >
                          Xem lời giải
                        </button>
                      )}

                      {/* Solution */}
                      {showSolution && (
                        <div className="mt-4">
                          <h3 className="text-sm font-semibold text-foreground mb-2">Lời giải</h3>
                          <pre className="p-4 bg-muted/20 rounded-lg font-mono text-sm overflow-x-auto">
                            {exercise.solution_code}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted">
                      <div className="text-center">
                        <Send className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Nhấn &quot;Nộp bài&quot; để chạy tất cả test cases</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border-t border-border px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {isRunning ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              Chạy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50"
            >
              {isRunning ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Nộp bài
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-border transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={revealNextHint}
              disabled={hintsRevealed >= exercise.hints.length}
              className="flex items-center gap-2 px-4 py-2.5 border border-warning/30 text-warning rounded-lg font-medium hover:bg-warning/10 transition-colors disabled:opacity-50"
            >
              <Lightbulb className="w-4 h-4" />
              Hint ({hintsRevealed}/{exercise.hints.length})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showResults && runResult && runResult.score === 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowResults(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-surface rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2 gradient-text">Chúc mừng!</h2>
              <p className="text-muted mb-2">Bạn đã hoàn thành bài tập với điểm số:</p>
              <div className="text-4xl font-bold text-success mb-4">{runResult.score}%</div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {runResult.totalRuntime}ms
                </span>
                <span className="flex items-center gap-1">
                  <MemoryStick className="w-4 h-4" />
                  {runResult.totalMemory}KB
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  +{exercise.xp_reward} XP
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResults(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg font-medium hover:bg-border transition-colors"
                >
                  Tiếp tục
                </button>
                {nextExercise && (
                  <a
                    href={`/practice/${nextExercise.id}`}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Bài tiếp theo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}