'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Play, RotateCcw, Check, X, Lightbulb, Code2,
  Send, Loader2, Trophy, BookOpen, ChevronRight,
} from 'lucide-react';
import { usePython } from '@/hooks/usePython';
import { PROBLEM_BANK } from '@/lib/problem-bank';
import { PROBLEM_BANK_2 } from '@/lib/problem-bank-part2';
import { PROBLEM_BANK_3 } from '@/lib/problem-bank-part3';
import type { Problem } from '@/lib/problem-bank';
import { recordProblemSolved } from '@/lib/gamification-store';
import { markProblemSolved } from '@/lib/solved-tracker';
import { useToast } from '@/components/common/Toast';

// ─── Merge all problem banks into a slug-based lookup ───
const ALL_PROBLEMS: Record<string, Problem> = {};
[...PROBLEM_BANK, ...PROBLEM_BANK_2, ...PROBLEM_BANK_3].forEach((p) => {
  ALL_PROBLEMS[p.slug] = p;
});

// Add original practice problems that have full data
const ORIGINAL_FULL_PROBLEMS: Problem[] = [
  {
    id: 1001, slug: 'hello-world', title: 'Hello World - In Ra Màn Hình',
    description: 'Viết chương trình in ra dòng chữ "Hello, World!" (không có dấu ngoặc kép).',
    difficulty: 'easy', tags: ['Nhập xuất', 'Cơ bản'], acceptanceRate: 95, xp: 10,
    starterCode: '# In ra "Hello, World!"\n',
    testCases: [{ input: '', expectedOutput: 'Hello, World!', isHidden: false }],
    hints: ['Dùng hàm print()', 'print("Hello, World!")'],
    editorial: { approach: 'Dùng hàm print() để in chuỗi ra màn hình.', code: 'print("Hello, World!")', complexity: 'O(1)' },
  },
  {
    id: 1002, slug: 'tinh-tong-hai-so', title: 'Tính Tổng Hai Số',
    description: 'Cho hai số nguyên a và b (mỗi số trên một dòng). In ra tổng a + b.',
    difficulty: 'easy', tags: ['Toán', 'Nhập xuất'], acceptanceRate: 92, xp: 10,
    starterCode: 'a = int(input())\nb = int(input())\n# In tổng\n',
    testCases: [
      { input: '3\n5', expectedOutput: '8', isHidden: false },
      { input: '-1\n10', expectedOutput: '9', isHidden: false },
      { input: '0\n0', expectedOutput: '0', isHidden: true },
    ],
    hints: ['Dùng toán tử +', 'print(a + b)'],
    editorial: { approach: 'Đọc 2 số và in tổng.', code: 'a = int(input())\nb = int(input())\nprint(a + b)', complexity: 'O(1)' },
  },
  {
    id: 1003, slug: 'kiem-tra-chan-le', title: 'Kiểm Tra Chẵn Lẻ',
    description: 'Cho số nguyên n. In "Chan" nếu n chẵn, "Le" nếu n lẻ.',
    difficulty: 'easy', tags: ['Điều kiện', 'Toán'], acceptanceRate: 90, xp: 10,
    starterCode: 'n = int(input())\n# Kiểm tra chẵn lẻ\n',
    testCases: [
      { input: '4', expectedOutput: 'Chan', isHidden: false },
      { input: '7', expectedOutput: 'Le', isHidden: false },
      { input: '0', expectedOutput: 'Chan', isHidden: true },
    ],
    hints: ['n % 2 == 0 là chẵn', 'Dùng if/else'],
    editorial: { approach: 'Kiểm tra n chia hết cho 2.', code: 'n = int(input())\nprint("Chan" if n % 2 == 0 else "Le")', complexity: 'O(1)' },
  },
  {
    id: 1004, slug: 'tinh-giai-thua', title: 'Tính Giai Thừa',
    description: 'Cho số nguyên không âm n. Tính n! (giai thừa). 0! = 1.',
    difficulty: 'easy', tags: ['Vòng lặp', 'Toán'], acceptanceRate: 85, xp: 15,
    starterCode: 'n = int(input())\n# Tính n!\n',
    testCases: [
      { input: '5', expectedOutput: '120', isHidden: false },
      { input: '0', expectedOutput: '1', isHidden: false },
      { input: '10', expectedOutput: '3628800', isHidden: true },
    ],
    hints: ['Nhân dồn từ 1 đến n', 'Khởi tạo result = 1'],
    editorial: { approach: 'Vòng for nhân dồn.', code: 'n = int(input())\nresult = 1\nfor i in range(1, n+1):\n    result *= i\nprint(result)', complexity: 'O(n)' },
  },
  {
    id: 1005, slug: 'day-fibonacci', title: 'Dãy Fibonacci',
    description: 'Cho số nguyên n. In số Fibonacci thứ n (F(0)=0, F(1)=1).',
    difficulty: 'easy', tags: ['Vòng lặp', 'Toán'], acceptanceRate: 80, xp: 15,
    starterCode: 'n = int(input())\n# Tính Fibonacci thứ n\n',
    testCases: [
      { input: '6', expectedOutput: '8', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: false },
      { input: '10', expectedOutput: '55', isHidden: true },
    ],
    hints: ['Dùng 2 biến a, b', 'Lặp n lần: a, b = b, a+b'],
    editorial: { approach: 'Vòng lặp với 2 biến.', code: 'n = int(input())\na, b = 0, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)', complexity: 'O(n)' },
  },
  {
    id: 1006, slug: 'dem-nguyen-am', title: 'Đếm Nguyên Âm Trong Chuỗi',
    description: 'Nhập chuỗi s. Đếm số nguyên âm (a,e,i,o,u không phân biệt hoa thường).',
    difficulty: 'easy', tags: ['Chuỗi', 'Vòng lặp'], acceptanceRate: 82, xp: 10,
    starterCode: 's = input()\n# Đếm nguyên âm\n',
    testCases: [
      { input: 'Hello World', expectedOutput: '3', isHidden: false },
      { input: 'Python', expectedOutput: '1', isHidden: false },
      { input: 'aeiou', expectedOutput: '5', isHidden: true },
    ],
    hints: ['Duyệt từng ký tự', 'Kiểm tra c.lower() in "aeiou"'],
    editorial: { approach: 'Duyệt và đếm.', code: 's = input()\nprint(sum(1 for c in s.lower() if c in "aeiou"))', complexity: 'O(n)' },
  },
  {
    id: 1007, slug: 'dao-nguoc-chuoi', title: 'Đảo Ngược Chuỗi',
    description: 'Nhập chuỗi s. In ra chuỗi đảo ngược.',
    difficulty: 'easy', tags: ['Chuỗi', 'Cơ bản'], acceptanceRate: 87, xp: 10,
    starterCode: 's = input()\n# Đảo ngược\n',
    testCases: [
      { input: 'Python', expectedOutput: 'nohtyP', isHidden: false },
      { input: 'hello', expectedOutput: 'olleh', isHidden: false },
      { input: 'a', expectedOutput: 'a', isHidden: true },
    ],
    hints: ['Dùng slicing [::-1]'],
    editorial: { approach: 'Slice ngược.', code: 's = input()\nprint(s[::-1])', complexity: 'O(n)' },
  },
  {
    id: 1008, slug: 'kiem-tra-so-nguyen-to', title: 'Kiểm Tra Số Nguyên Tố',
    description: 'Cho số nguyên dương n. In "True" nếu n nguyên tố, "False" nếu không.',
    difficulty: 'medium', tags: ['Toán', 'Vòng lặp'], acceptanceRate: 65, xp: 25,
    starterCode: 'n = int(input())\n# Kiểm tra nguyên tố\n',
    testCases: [
      { input: '7', expectedOutput: 'True', isHidden: false },
      { input: '4', expectedOutput: 'False', isHidden: false },
      { input: '1', expectedOutput: 'False', isHidden: true },
      { input: '2', expectedOutput: 'True', isHidden: true },
    ],
    hints: ['Số < 2 không nguyên tố', 'Kiểm tra chia hết từ 2 đến sqrt(n)'],
    editorial: { approach: 'Duyệt từ 2 đến sqrt(n).', code: 'n = int(input())\nif n < 2:\n    print(False)\nelse:\n    print(all(n % i != 0 for i in range(2, int(n**0.5)+1)))', complexity: 'O(√n)' },
  },
  {
    id: 1009, slug: 'sap-xep-noi-bot', title: 'Sắp Xếp Nổi Bọt',
    description: 'Cho n số nguyên trên 1 dòng. Sắp xếp tăng dần bằng bubble sort. In kết quả cách nhau dấu cách.',
    difficulty: 'medium', tags: ['Mảng', 'Sắp xếp'], acceptanceRate: 60, xp: 25,
    starterCode: 'arr = list(map(int, input().split()))\n# Bubble sort\n',
    testCases: [
      { input: '5 3 1 4 2', expectedOutput: '1 2 3 4 5', isHidden: false },
      { input: '3 1 2', expectedOutput: '1 2 3', isHidden: false },
      { input: '1', expectedOutput: '1', isHidden: true },
    ],
    hints: ['Hai vòng for lồng nhau', 'Đổi chỗ nếu arr[j] > arr[j+1]'],
    editorial: { approach: 'Bubble sort cổ điển.', code: 'arr = list(map(int, input().split()))\nn = len(arr)\nfor i in range(n-1):\n    for j in range(n-1-i):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]\nprint(" ".join(map(str, arr)))', complexity: 'O(n²)' },
  },
  {
    id: 1010, slug: 'tim-kiem-nhi-phan', title: 'Tìm Kiếm Nhị Phân',
    description: 'Dòng 1: n số nguyên đã sắp xếp tăng dần. Dòng 2: số x cần tìm. In vị trí (0-indexed) hoặc -1.',
    difficulty: 'medium', tags: ['Mảng', 'Tìm kiếm'], acceptanceRate: 58, xp: 25,
    starterCode: 'arr = list(map(int, input().split()))\nx = int(input())\n# Binary search\n',
    testCases: [
      { input: '1 3 5 7 9\n5', expectedOutput: '2', isHidden: false },
      { input: '1 3 5 7 9\n4', expectedOutput: '-1', isHidden: false },
      { input: '1\n1', expectedOutput: '0', isHidden: true },
    ],
    hints: ['Dùng 2 con trỏ left, right', 'mid = (left + right) // 2'],
    editorial: { approach: 'Binary search cổ điển.', code: 'arr = list(map(int, input().split()))\nx = int(input())\nl, r = 0, len(arr)-1\nresult = -1\nwhile l <= r:\n    m = (l+r)//2\n    if arr[m] == x:\n        result = m\n        break\n    elif arr[m] < x:\n        l = m+1\n    else:\n        r = m-1\nprint(result)', complexity: 'O(log n)' },
  },
];

ORIGINAL_FULL_PROBLEMS.forEach(p => { ALL_PROBLEMS[p.slug] = p; });

// ─── Helpers ───
const DIFF_LABEL = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' } as const;
const DIFF_COLOR = {
  easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
} as const;

function highlightPython(code: string): string {
  const keywords = ['def','return','if','elif','else','for','while','in','not','and','or','import','from','class','try','except','finally','with','as','pass','break','continue','True','False','None','print','input','range','len','int','str','float','list','dict','set','map','enumerate','min','max','sum','sorted','zip'];
  let html = code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/#.*$/gm, '<span class="text-emerald-500">$&</span>')
    .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-orange-400">$&</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-purple-400">$1</span>');
  keywords.forEach((kw) => {
    html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span class="text-blue-400 font-semibold">$1</span>');
  });
  return html;
}

function LineNumbers({ count }: { count: number }) {
  return (
    <div className="select-none text-right pr-3 text-slate-600 text-xs leading-[1.625rem] font-mono pt-4 min-w-[2.5rem]">
      {Array.from({ length: count }, (_, i) => (<div key={i}>{i + 1}</div>))}
    </div>
  );
}

// ─── Main Page ───
export default function PracticeProblemPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const problem = useMemo(() => ALL_PROBLEMS[slug], [slug]);

  // If problem not found, show not-found page
  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Bài tập không tồn tại</h2>
          <Link href="/practice" className="text-blue-400 hover:underline">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  return <ProblemView problem={problem} />;
}

function ProblemView({ problem }: { problem: Problem }) {
  const py = usePython();
  const { showToast } = useToast();
  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showEditorial, setShowEditorial] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; input: string; expected: string; got: string }> | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [customStdin, setCustomStdin] = useState('');
  const [useCustomInput, setUseCustomInput] = useState(false);

  const visibleTests = useMemo(() => problem.testCases.filter((t) => !t.isHidden), [problem]);

  // Auto-fill custom stdin from first test case
  useEffect(() => {
    if (visibleTests.length > 0) {
      setCustomStdin(visibleTests[0].input);
    }
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true); setError(''); setOutput(''); setTestResults(null);
    try {
      const stdin = useCustomInput ? customStdin : (visibleTests[activeTab]?.input || '');
      const result = await py.run(code, stdin);
      setOutput(result.stdout);
      if (result.stderr) setError(result.stderr);
    } catch (e) { setError(e instanceof Error ? e.message : 'Lỗi runtime'); }
    finally { setIsRunning(false); }
  }, [code, py, visibleTests, activeTab, customStdin, useCustomInput]);

  const submitCode = useCallback(async () => {
    setIsRunning(true); setError(''); setOutput(''); setTestResults(null); setAllPassed(false);
    const results: typeof testResults = [];
    for (const tc of problem.testCases) {
      try {
        const r = await py.run(code, tc.input);
        const got = r.stdout.trim();
        results.push({ passed: got === tc.expectedOutput.trim(), input: tc.isHidden ? '(ẩn)' : tc.input, expected: tc.isHidden ? '(ẩn)' : tc.expectedOutput.trim(), got: tc.isHidden ? (got === tc.expectedOutput.trim() ? '✓' : '✗') : got });
      } catch (e) {
        results.push({ passed: false, input: tc.isHidden ? '(ẩn)' : tc.input, expected: tc.isHidden ? '(ẩn)' : tc.expectedOutput.trim(), got: e instanceof Error ? e.message : 'Error' });
      }
    }
    setTestResults(results);
    if (results.every((r) => r.passed)) { setAllPassed(true); setShowEditorial(true);
      // Track solved + gamification + toast
      markProblemSolved(problem.slug);
      recordProblemSolved(problem.id, problem.difficulty, hintsRevealed > 0);
      showToast({
        type: 'success',
        title: `🎉 Chính xác! +${problem.xp} XP`,
        description: `Bạn đã giải "${problem.title}"`,
      });
    }
    setIsRunning(false);
  }, [code, py, problem.testCases]);

  const lineCount = code.split('\n').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
          <Link href="/practice" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Danh sách
          </Link>
          <div className="h-4 w-px bg-slate-700" />
          <h1 className="text-white font-bold text-lg truncate">{problem.title}</h1>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${DIFF_COLOR[problem.difficulty]}`}>
            {DIFF_LABEL[problem.difficulty]}
          </span>
          <div className="flex items-center gap-2 ml-auto text-xs text-slate-400">
            <span>✓ {problem.acceptanceRate}%</span>
            <span className="text-amber-400">⭐ {problem.xp} XP</span>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto px-4 pb-2 flex gap-1.5 flex-wrap">
          {problem.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[11px] bg-slate-800 text-slate-400 rounded-md border border-slate-700">{t}</span>
          ))}
        </div>
      </div>

      {/* Split View */}
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-0 lg:gap-1 p-2 lg:p-4 lg:h-[calc(100vh-5.5rem)]">
        {/* LEFT PANEL - Problem Description */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:w-[45%] lg:overflow-y-auto lg:pr-2 scrollbar-thin scrollbar-thumb-slate-700 rounded-xl bg-slate-900/50 border border-slate-800 p-5 mb-2 lg:mb-0">
          
          {/* Description */}
          <div className="prose prose-sm prose-invert max-w-none">
            <h3 className="text-slate-200 text-base font-semibold flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-blue-400" /> Mô tả
            </h3>
            <p className="text-slate-300 whitespace-pre-line leading-relaxed">{problem.description}</p>
          </div>

          {/* Examples / Test Cases */}
          <div className="mt-6">
            <h3 className="text-slate-200 text-sm font-semibold mb-3">Ví dụ</h3>
            <div className="flex gap-1 mb-3">
              {visibleTests.map((_, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${activeTab === i ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                  Test {i + 1}
                </button>
              ))}
            </div>
            {visibleTests[activeTab] && (
              <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 space-y-3">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Input</div>
                  <pre className="text-sm text-slate-300 font-mono bg-slate-900 p-2 rounded">{visibleTests[activeTab].input}</pre>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Output mong đợi</div>
                  <pre className="text-sm text-emerald-400 font-mono bg-slate-900 p-2 rounded">{visibleTests[activeTab].expectedOutput}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Hints */}
          <div className="mt-6">
            <button onClick={() => setHintsRevealed((h) => Math.min(h + 1, problem.hints.length))}
              disabled={hintsRevealed >= problem.hints.length}
              className="flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 disabled:opacity-40 transition-colors">
              <Lightbulb className="w-4 h-4" />
              {hintsRevealed >= problem.hints.length ? 'Đã xem hết gợi ý' : `Xem gợi ý (${hintsRevealed}/${problem.hints.length})`}
              {hintsRevealed < problem.hints.length && <ChevronRight className="w-3 h-3" />}
            </button>
            <AnimatePresence>
              {hintsRevealed > 0 && (
                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="mt-2 space-y-1.5 overflow-hidden">
                  {problem.hints.slice(0, hintsRevealed).map((h, i) => (
                    <motion.li key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                      className="text-sm text-slate-300 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
                      💡 {h}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Editorial (shown after passing all tests) */}
          <AnimatePresence>
            {showEditorial && allPassed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                <h3 className="text-emerald-400 font-semibold text-sm flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4" /> Lời giải mẫu
                </h3>
                <p className="text-slate-300 text-sm mb-3">{problem.editorial.approach}</p>
                <pre className="bg-slate-950 text-sm p-3 rounded-lg overflow-x-auto font-mono text-slate-300 border border-slate-800"
                  dangerouslySetInnerHTML={{ __html: highlightPython(problem.editorial.code) }} />
                <p className="text-xs text-slate-500 mt-2">📊 {problem.editorial.complexity}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT PANEL - Code Editor */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:w-[55%] flex flex-col rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6.5rem)]">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
            <span className="text-sm text-slate-300 font-medium flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-400" /> main.py
            </span>
            <div className="flex items-center gap-2">
              {py.loading && <span className="text-[11px] text-slate-500 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Đang tải Pyodide...</span>}
              {py.ready && !isRunning && <span className="text-[11px] text-emerald-500 flex items-center gap-1"><Check className="w-3 h-3" />Python sẵn sàng</span>}
              <button onClick={() => setCode(problem.starterCode)} className="p-1.5 text-slate-500 hover:text-white transition-colors" title="Đặt lại code">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <LineNumbers count={lineCount} />
            <div className="relative flex-1">
              {/* Textarea */}
              <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false}
                className="relative w-full h-full min-h-[280px] p-4 bg-transparent text-slate-100 font-mono text-sm leading-[1.625rem] focus:outline-none resize-none caret-white" />
            </div>
          </div>

          {/* Custom Input (stdin) */}
          <div className="px-4 py-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                📥 Input (stdin)
              </label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-xs text-slate-500 cursor-pointer">
                  <input type="checkbox" checked={useCustomInput} onChange={(e) => setUseCustomInput(e.target.checked)}
                    className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500" />
                  Tự nhập
                </label>
                {!useCustomInput && visibleTests.map((_, i) => (
                  <button key={i} onClick={() => { setActiveTab(i); setCustomStdin(visibleTests[i].input); }}
                    className={`px-1.5 py-0.5 text-[10px] rounded ${activeTab === i ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                    VD{i + 1}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={useCustomInput ? customStdin : (visibleTests[activeTab]?.input || '')}
              onChange={(e) => { setCustomStdin(e.target.value); setUseCustomInput(true); }}
              placeholder="Nhập dữ liệu đầu vào..."
              className="w-full h-16 p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/80 flex flex-wrap gap-2 items-center">
            <button onClick={runCode} disabled={isRunning || py.loading}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 disabled:opacity-40">
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} Chạy thử
            </button>
            <button onClick={submitCode} disabled={isRunning || py.loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 disabled:opacity-40 shadow-lg shadow-blue-500/20">
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Nộp bài
            </button>
          </div>

          {/* Output Area */}
          <div className="px-4 pb-4 overflow-y-auto max-h-[300px] space-y-2">
            {/* Success animation */}
            <AnimatePresence>
              {allPassed && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                    <Trophy className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  </motion.div>
                  <p className="text-emerald-400 font-bold">Chính xác! Tất cả test đều pass 🎉</p>
                  <p className="text-emerald-500/70 text-xs mt-1">+{problem.xp} XP</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Run output */}
            {output && !testResults && (
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Output</div>
                <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{output}</pre>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                <div className="text-[10px] text-rose-400 uppercase tracking-wide mb-1">Lỗi</div>
                <pre className="text-xs text-rose-300 font-mono whitespace-pre-wrap">{error}</pre>
              </div>
            )}

            {/* Test results */}
            {testResults && !allPassed && (
              <div className="space-y-1.5">
                <div className="text-sm text-slate-300 font-medium mb-2">
                  Kết quả: {testResults.filter((r) => r.passed).length}/{testResults.length} test pass
                </div>
                {testResults.map((r, i) => (
                  <div key={i} className={`p-2.5 rounded-lg border text-xs ${r.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {r.passed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-rose-400" />}
                      <span className={r.passed ? 'text-emerald-400' : 'text-rose-400'}>Test {i + 1}</span>
                    </div>
                    {!r.passed && r.input !== '(ẩn)' && (
                      <div className="grid grid-cols-3 gap-2 mt-1.5 font-mono">
                        <div><div className="text-slate-500 mb-0.5">Input</div><div className="text-slate-300">{r.input}</div></div>
                        <div><div className="text-slate-500 mb-0.5">Mong đợi</div><div className="text-emerald-400">{r.expected}</div></div>
                        <div><div className="text-slate-500 mb-0.5">Nhận được</div><div className="text-rose-400">{r.got}</div></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
