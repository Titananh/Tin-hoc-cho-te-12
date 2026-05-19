'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePython } from '@/hooks/usePython';
import { recordProblemSolved } from '@/lib/gamification-store';

// ============================================================
// Contest Data
// ============================================================

interface TestCase {
  input: string;
  expected: string;
}

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  testCases: TestCase[];
}

const CONTEST_PROBLEMS: Problem[] = [
  {
    id: 'A',
    title: 'Tổng Hai Số',
    difficulty: 'Easy',
    points: 100,
    description: 'Cho hai số nguyên a và b trên cùng một dòng, hãy tính và in ra tổng của chúng.',
    examples: [
      { input: '3 5', output: '8', explanation: '3 + 5 = 8' },
      { input: '-1 10', output: '9', explanation: '-1 + 10 = 9' },
    ],
    constraints: ['-10^9 ≤ a, b ≤ 10^9', 'Input gồm 2 số nguyên cách nhau bởi dấu cách'],
    testCases: [
      { input: '3 5', expected: '8' },
      { input: '-1 10', expected: '9' },
      { input: '1000000000 1000000000', expected: '2000000000' },
    ],
  },
  {
    id: 'B',
    title: 'Đếm Số Nguyên Tố Trong Khoảng',
    difficulty: 'Medium',
    points: 200,
    description: 'Cho hai số nguyên dương a và b (a ≤ b), đếm số lượng số nguyên tố trong đoạn [a, b].',
    examples: [
      { input: '1 10', output: '4', explanation: 'Các số nguyên tố: 2, 3, 5, 7' },
      { input: '10 20', output: '4', explanation: 'Các số nguyên tố: 11, 13, 17, 19' },
    ],
    constraints: ['1 ≤ a ≤ b ≤ 10^6', 'Input gồm 2 số trên một dòng'],
    testCases: [
      { input: '1 10', expected: '4' },
      { input: '10 20', expected: '4' },
      { input: '1 1', expected: '0' },
      { input: '2 2', expected: '1' },
    ],
  },
  {
    id: 'C',
    title: 'Chuỗi Con Dài Nhất Không Lặp',
    difficulty: 'Medium',
    points: 200,
    description: 'Cho một chuỗi s, tìm độ dài của chuỗi con (substring) dài nhất mà không có ký tự nào lặp lại.',
    examples: [
      { input: 'abcabcbb', output: '3', explanation: 'Chuỗi con dài nhất là "abc" có độ dài 3' },
      { input: 'bbbbb', output: '1', explanation: 'Chuỗi con dài nhất là "b" có độ dài 1' },
    ],
    constraints: ['0 ≤ len(s) ≤ 10^5', 's chỉ chứa ký tự ASCII'],
    testCases: [
      { input: 'abcabcbb', expected: '3' },
      { input: 'bbbbb', expected: '1' },
      { input: 'pwwkew', expected: '3' },
      { input: '', expected: '0' },
    ],
  },
  {
    id: 'D',
    title: 'Đường Đi Ngắn Nhất Trong Lưới',
    difficulty: 'Hard',
    points: 300,
    description: 'Cho một lưới n×n gồm các ô 0 (đi được) và 1 (tường). Tìm đường đi ngắn nhất từ ô (0,0) đến ô (n-1,n-1). Chỉ được di chuyển lên/xuống/trái/phải. In ra số bước tối thiểu hoặc -1 nếu không có đường đi.',
    examples: [
      { input: '3\n0 0 0\n0 1 0\n0 0 0', output: '4', explanation: 'Đi: (0,0)→(1,0)→(2,0)→(2,1)→(2,2) = 4 bước' },
      { input: '2\n0 1\n1 0', output: '-1', explanation: 'Không có đường đi từ (0,0) đến (1,1)' },
    ],
    constraints: ['1 ≤ n ≤ 100', 'Ô (0,0) và (n-1,n-1) luôn là 0', 'Dòng đầu là n, n dòng tiếp theo là lưới'],
    testCases: [
      { input: '3\n0 0 0\n0 1 0\n0 0 0', expected: '4' },
      { input: '2\n0 1\n1 0', expected: '-1' },
      { input: '1\n0', expected: '0' },
      { input: '4\n0 0 0 0\n1 1 1 0\n0 0 0 0\n0 1 1 0', expected: '6' },
    ],
  },
];


// Fake leaderboard data
const FAKE_LEADERBOARD = [
  { name: 'NguyenVanA', score: 700, time: '78:23' },
  { name: 'TranThiB', score: 600, time: '65:10' },
  { name: 'LeVanC', score: 500, time: '82:45' },
  { name: 'PhamDucD', score: 500, time: '85:00' },
  { name: 'HoangE', score: 400, time: '70:30' },
  { name: 'VuThiF', score: 300, time: '55:20' },
  { name: 'DangVanG', score: 300, time: '60:15' },
  { name: 'BuiH', score: 200, time: '45:00' },
  { name: 'DoThiI', score: 100, time: '30:50' },
  { name: 'NgocK', score: 100, time: '88:00' },
];

const CONTEST_DURATION = 90 * 60; // 90 minutes in seconds
const STORAGE_KEY = 'contest_live_state';

// ============================================================
// Types
// ============================================================

interface ProblemState {
  code: string;
  submissions: number;
  bestScore: number;
  status: 'not_started' | 'attempted' | 'solved';
}

interface ContestState {
  startTime: number;
  problems: Record<string, ProblemState>;
  ended: boolean;
}

// ============================================================
// Component
// ============================================================

export default function LiveContestPage() {
  const { run, ready, loading: pyLoading } = usePython();
  const [activeTab, setActiveTab] = useState(0);
  const [contestState, setContestState] = useState<ContestState | null>(null);
  const [timeLeft, setTimeLeft] = useState(CONTEST_DURATION);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; got: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize contest state
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: ContestState = JSON.parse(stored);
      setContestState(parsed);
      if (parsed.ended) setShowResults(true);
    } else {
      const initial: ContestState = {
        startTime: Date.now(),
        problems: Object.fromEntries(
          CONTEST_PROBLEMS.map((p) => [p.id, { code: '', submissions: 0, bestScore: 0, status: 'not_started' as const }])
        ),
        ended: false,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      setContestState(initial);
    }
  }, []);

  // Timer
  useEffect(() => {
    if (!contestState || contestState.ended) return;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - contestState.startTime) / 1000);
      const remaining = Math.max(0, CONTEST_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        endContest();
      }
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [contestState]);

  const saveState = useCallback((state: ContestState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setContestState({ ...state });
  }, []);

  const endContest = useCallback(() => {
    if (!contestState) return;
    const updated = { ...contestState, ended: true };
    saveState(updated);
    setShowResults(true);
    if (timerRef.current) clearInterval(timerRef.current);
    // Record solved problems to gamification
    CONTEST_PROBLEMS.forEach((p) => {
      const ps = updated.problems[p.id];
      if (ps && ps.status === 'solved') {
        recordProblemSolved(parseInt(p.id, 36), p.difficulty.toLowerCase(), false, 60);
      }
    });
  }, [contestState, saveState]);

  const totalScore = contestState
    ? Object.values(contestState.problems).reduce((sum, ps) => sum + ps.bestScore, 0)
    : 0;

  const currentProblem = CONTEST_PROBLEMS[activeTab];
  const currentCode = contestState?.problems[currentProblem.id]?.code || '';

  const setCode = (code: string) => {
    if (!contestState || contestState.ended) return;
    const updated = { ...contestState };
    updated.problems[currentProblem.id] = { ...updated.problems[currentProblem.id], code };
    saveState(updated);
  };

  const handleRun = async () => {
    if (!ready || isRunning || !currentCode.trim()) return;
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    try {
      const example = currentProblem.examples[0];
      const result = await run(currentCode, example.input);
      setOutput(result.stdout || result.stderr || '(không có output)');
    } catch (e: unknown) {
      setOutput(`Lỗi: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!ready || isRunning || !currentCode.trim() || !contestState || contestState.ended) return;
    setIsRunning(true);
    setOutput('');
    const results: typeof testResults = [];

    for (const tc of currentProblem.testCases) {
      try {
        const result = await run(currentCode, tc.input);
        const got = (result.stdout || '').trim();
        results.push({ passed: got === tc.expected.trim(), input: tc.input, expected: tc.expected, got });
      } catch {
        results.push({ passed: false, input: tc.input, expected: tc.expected, got: 'Runtime Error' });
      }
    }

    setTestResults(results);
    const passedCount = results.filter((r) => r.passed).length;
    const totalTests = results.length;

    // Calculate score
    let earned = 0;
    if (passedCount === totalTests) {
      earned = currentProblem.points;
    } else if (passedCount > totalTests / 2) {
      earned = Math.floor(currentProblem.points * 0.5);
    }

    // Apply penalty
    const updated = { ...contestState };
    const ps = { ...updated.problems[currentProblem.id] };
    ps.submissions += 1;
    if (earned > 0) {
      const penalty = passedCount === totalTests ? 0 : (ps.submissions - 1) * 5;
      earned = Math.max(0, earned - penalty);
    } else {
      // Wrong submission penalty on future correct submissions tracked via submissions count
    }

    if (earned > ps.bestScore) {
      ps.bestScore = earned;
      ps.status = passedCount === totalTests ? 'solved' : 'attempted';
    } else if (ps.status === 'not_started') {
      ps.status = 'attempted';
    }

    updated.problems[currentProblem.id] = ps;
    saveState(updated);

    if (passedCount === totalTests) {
      setOutput(`✅ Tất cả ${totalTests} test cases đều đúng! +${earned} điểm`);
    } else if (passedCount > totalTests / 2) {
      setOutput(`⚠️ ${passedCount}/${totalTests} test cases đúng. Điểm một phần: +${earned}`);
    } else {
      setOutput(`❌ Chỉ ${passedCount}/${totalTests} test cases đúng. Không được điểm.`);
    }
    setIsRunning(false);
  };

  const resetContest = () => {
    localStorage.removeItem(STORAGE_KEY);
    setShowResults(false);
    setTestResults([]);
    setOutput('');
    const initial: ContestState = {
      startTime: Date.now(),
      problems: Object.fromEntries(
        CONTEST_PROBLEMS.map((p) => [p.id, { code: '', submissions: 0, bestScore: 0, status: 'not_started' as const }])
      ),
      ended: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    setContestState(initial);
    setTimeLeft(CONTEST_DURATION);
  };

  // Format time
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300;

  if (!contestState) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Đang tải...</div>;

  // ============================================================
  // Results Modal
  // ============================================================
  if (showResults) {
    const userRank = FAKE_LEADERBOARD.filter((e) => e.score > totalScore).length + 1;
    const leaderboard = [...FAKE_LEADERBOARD, { name: '🧑 Bạn', score: totalScore, time: formatTime(CONTEST_DURATION - timeLeft) }]
      .sort((a, b) => b.score - a.score || a.time.localeCompare(b.time));

    return (
      <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🏆 Kết Quả Cuộc Thi
            </motion.h1>
            <p className="text-gray-400 mt-2">Weekly Contest #1</p>
          </div>

          {/* Score Summary */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 border border-gray-700">
            <div className="text-center">
              <div className="text-6xl font-bold text-yellow-400">{totalScore}</div>
              <div className="text-gray-400 mt-1">/ 800 điểm</div>
              <div className="mt-4 text-2xl">Xếp hạng: <span className="text-green-400 font-bold">#{userRank}</span> / 11</div>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-6">
              {CONTEST_PROBLEMS.map((p) => {
                const ps = contestState.problems[p.id];
                return (
                  <div key={p.id} className="text-center p-3 rounded-lg bg-gray-800/50">
                    <div className="text-sm text-gray-400">Bài {p.id}</div>
                    <div className={`text-xl font-bold ${ps.bestScore > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      {ps.bestScore}/{p.points}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📊 Bảng Xếp Hạng</h2>
            <div className="space-y-2">
              {leaderboard.map((entry, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.name === '🧑 Bạn' ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-gray-800/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 text-center font-bold ${i < 3 ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <span className={entry.name === '🧑 Bạn' ? 'text-yellow-300 font-bold' : ''}>{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">{entry.time}</span>
                    <span className="font-bold text-green-400 w-16 text-right">{entry.score} đ</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-6">
            <button onClick={resetContest}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:from-blue-500 hover:to-purple-500 transition-all">
              🔄 Thi Lại
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // Main Contest UI
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <motion.header initial={{ y: -50 }} animate={{ y: 0 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ⚔️ WEEKLY CONTEST #1
          </span>
          {pyLoading && <span className="text-xs text-yellow-400 animate-pulse">Đang tải Python...</span>}
          {ready && <span className="text-xs text-green-400">● Python sẵn sàng</span>}
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <motion.div animate={isLowTime ? { scale: [1, 1.05, 1] } : {}}
            transition={isLowTime ? { repeat: Infinity, duration: 1 } : {}}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold ${
              isLowTime ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-lg shadow-red-500/20' : 'bg-gray-800 text-cyan-300 border border-gray-600'
            }`}>
            <span>⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </motion.div>

          {/* Score */}
          <div className="px-4 py-2 bg-gray-800 rounded-xl border border-gray-600">
            <span className="text-yellow-400 font-bold">{totalScore}</span>
            <span className="text-gray-400">/800</span>
          </div>

          {/* End button */}
          <button onClick={() => { if (confirm('Bạn có chắc muốn kết thúc cuộc thi?')) endContest(); }}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-500 rounded-xl text-sm font-bold transition-colors">
            Kết thúc
          </button>
        </div>
      </motion.header>

      {/* Problem Tabs */}
      <div className="bg-gray-900/80 border-b border-gray-700 px-4 py-2 flex gap-2">
        {CONTEST_PROBLEMS.map((p, i) => {
          const ps = contestState.problems[p.id];
          const statusIcon = ps.status === 'solved' ? '✅' : ps.status === 'attempted' ? '⭕' : '⬜';
          const isActive = i === activeTab;
          return (
            <motion.button key={p.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveTab(i); setOutput(''); setTestResults([]); }}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}>
              <span>{statusIcon}</span>
              <span>{p.id}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                p.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                p.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{p.points}đ</span>
            </motion.button>
          );
        })}
        {/* Score per problem */}
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
          {CONTEST_PROBLEMS.map((p) => (
            <span key={p.id} className={contestState.problems[p.id].bestScore > 0 ? 'text-green-400' : ''}>
              {p.id}:{contestState.problems[p.id].bestScore}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content: Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Problem Description */}
        <div className="md:w-1/2 overflow-y-auto p-6 border-r border-gray-800">
          <AnimatePresence mode="wait">
            <motion.div key={currentProblem.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">{currentProblem.id}. {currentProblem.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  currentProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  currentProblem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>{currentProblem.difficulty}</span>
                <span className="text-yellow-400 font-bold">{currentProblem.points} điểm</span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{currentProblem.description}</p>

              {/* Examples */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-cyan-400">📋 Ví dụ</h3>
                {currentProblem.examples.map((ex, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Input:</div>
                        <pre className="text-sm text-green-300 font-mono bg-gray-900 p-2 rounded">{ex.input}</pre>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Output:</div>
                        <pre className="text-sm text-yellow-300 font-mono bg-gray-900 p-2 rounded">{ex.output}</pre>
                      </div>
                    </div>
                    {ex.explanation && (
                      <div className="mt-2 text-xs text-gray-400 italic">💡 {ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">⚠️ Ràng buộc</h3>
                <ul className="space-y-1">
                  {currentProblem.constraints.map((c, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="text-cyan-500">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Code Editor + Output */}
        <div className="md:w-1/2 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col p-4 min-h-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-mono">Python 3</span>
              <span className="text-xs text-gray-500">
                Nộp: {contestState.problems[currentProblem.id].submissions} lần
              </span>
            </div>
            <textarea
              value={currentCode}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`# Viết code Python ở đây\n# Đọc input bằng input()\n# In output bằng print()\n\n`}
              className="flex-1 w-full bg-gray-900 text-green-300 font-mono text-sm p-4 rounded-xl border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none resize-none placeholder-gray-600"
              spellCheck={false}
              disabled={contestState.ended}
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleRun} disabled={!ready || isRunning}
                className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {isRunning ? '⏳ Đang chạy...' : '▶️ Chạy thử'}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleSubmit} disabled={!ready || isRunning || contestState.ended}
                className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/20">
                {isRunning ? '⏳ Đang chấm...' : '📤 Nộp bài'}
              </motion.button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="h-48 border-t border-gray-700 p-4 overflow-y-auto bg-gray-900/50">
            <div className="text-xs text-gray-500 mb-2 font-bold uppercase">Kết quả</div>
            {output && (
              <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm font-mono text-gray-300 whitespace-pre-wrap mb-3">{output}</motion.pre>
            )}
            {testResults.length > 0 && (
              <div className="space-y-1.5">
                {testResults.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className={`text-xs p-2 rounded-lg font-mono ${r.passed ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    <span>{r.passed ? '✅' : '❌'} Test {i + 1}: </span>
                    {!r.passed && <span>expected &quot;{r.expected}&quot; got &quot;{r.got}&quot;</span>}
                    {r.passed && <span>Đúng</span>}
                  </motion.div>
                ))}
              </div>
            )}
            {!output && testResults.length === 0 && (
              <div className="text-gray-600 text-sm italic">Nhấn &quot;Chạy thử&quot; hoặc &quot;Nộp bài&quot; để xem kết quả...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
