'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Folder,
  Clock,
  Lock,
  Star,
  CheckCircle2,
  Code2,
  Lightbulb,
  Rocket,
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  difficulty_label: string;
  estimated_hours: number;
  estimatedHours: number;
  isLocked: boolean;
  prerequisiteMessage?: string;
  xpReward: number;
  minLevelRequired: number;
}

const DIFFICULTY_COLOR = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

// Local seed details per project (since the API is mocked)
const PROJECT_DETAIL: Record<string, {
  overview: string;
  objectives: string[];
  hints: string[];
  starterCode: string;
}> = {
  '1': {
    overview: 'Xây dựng máy tính bỏ túi đơn giản trong Python với 4 phép toán cộng, trừ, nhân, chia. Yêu cầu xử lý lỗi chia cho 0.',
    objectives: ['Đọc 2 số và toán tử từ người dùng', 'Thực hiện phép tính theo toán tử', 'Hiển thị kết quả với 2 chữ số thập phân', 'Bắt lỗi chia cho 0'],
    hints: ['Dùng input() để đọc dữ liệu', 'if/elif/else cho từng toán tử', 'try/except để bắt ZeroDivisionError'],
    starterCode: 'a = float(input("Nhap so a: "))\nb = float(input("Nhap so b: "))\nop = input("Nhap toan tu (+, -, *, /): ")\n\n# Viet code cua ban\n',
  },
  '2': {
    overview: 'Game đoán số: máy chọn 1 số ngẫu nhiên trong [1, 100], người chơi đoán cho đến khi đúng. In số lần đoán.',
    objectives: ['Sinh số ngẫu nhiên', 'Vòng lặp nhập đoán', 'Gợi ý cao/thấp', 'In kết quả + số lượt đoán'],
    hints: ['import random', 'while True: với break khi đoán đúng', 'Đếm số lần lặp'],
    starterCode: 'import random\n\nso_can_doan = random.randint(1, 100)\nso_lan = 0\n\n# Viet code cua ban\n',
  },
};

const FALLBACK_DETAIL = {
  overview: 'Mô tả chi tiết của dự án sẽ hiện ở đây.',
  objectives: ['Phân tích đề bài', 'Lên ý tưởng', 'Cài đặt từng bước', 'Kiểm thử kỹ'],
  hints: ['Đọc kỹ đề', 'Chia nhỏ vấn đề', 'Test từng phần'],
  starterCode: '# Viet code cua ban\n',
};

export default function ProjectDetailPage() {
  const params = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const list: Project[] = Array.isArray(data.projects) ? data.projects : [];
        const p = list.find((x) => String(x.id) === params.projectId);
        if (!p) {
          setError('Không tìm thấy dự án');
        } else {
          setProject(p);
          const detail = PROJECT_DETAIL[params.projectId] ?? FALLBACK_DETAIL;
          setCode(detail.starterCode);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.projectId]);

  const detail = PROJECT_DETAIL[params.projectId] ?? FALLBACK_DETAIL;

  async function runCode() {
    setRunning(true);
    setOutput('');
    try {
      const { runPython } = await import('@/lib/pyodide-runner');
      const result = await runPython(code, '');
      setOutput(result.stdout || result.stderr || '');
    } catch (e) {
      setOutput(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Đang tải dự án...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Folder className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            {error ?? 'Không tìm thấy dự án'}
          </h2>
          <Link href="/projects" className="text-blue-600 hover:underline">
            ← Quay lại danh sách dự án
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách dự án
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
              <Folder className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h1>
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                    DIFFICULTY_COLOR[project.difficulty]
                  }`}
                >
                  {project.difficulty_label}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" /> {project.estimatedHours} giờ
                </span>
                <span className="inline-flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4" /> +{project.xpReward} XP
                </span>
                <span className="inline-flex items-center gap-1 text-purple-600">
                  Cấp tối thiểu: {project.minLevelRequired}
                </span>
                {project.isLocked && (
                  <span className="inline-flex items-center gap-1 text-red-600">
                    <Lock className="w-4 h-4" /> Đang khóa
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-500" /> Mô tả
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300">{detail.overview}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Yêu cầu cần đạt
              </h2>
              <ul className="space-y-2">
                {detail.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" /> Gợi ý
              </h2>
              <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                {detail.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: code editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-fit"
          >
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 bg-slate-50 dark:bg-slate-900">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">main.py</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-72 p-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none resize-none"
            />
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
              <button
                onClick={runCode}
                disabled={running}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {running ? 'Đang chạy...' : '▶ Chạy thử'}
              </button>
            </div>
            {output && (
              <div className="mx-4 mb-4 p-3 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
                <div className="text-slate-400 text-[10px] mb-1">OUTPUT</div>
                <pre>{output}</pre>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
