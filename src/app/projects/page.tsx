'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  Lock,
  Clock,
  CheckCircle2,
  Star,
  ListChecks,
  Trophy,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Types
type Difficulty = 'easy' | 'medium' | 'hard';

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  checklistCount: number;
  completedChecklist: number;
  isCompleted: boolean;
  isLocked: boolean;
  prerequisiteMessage?: string;
  bestScore: number | null;
  xpReward: number;
  minLevelRequired: number;
}

// Difficulty config
const difficultyConfig: Record<Difficulty, { label: string; color: string; bgColor: string }> = {
  easy: {
    label: 'Dễ',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  medium: {
    label: 'Trung Bình',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  hard: {
    label: 'Khó',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
};

// Tab configuration
const tabs: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Dễ' },
  { id: 'medium', label: 'Trung Bình' },
  { id: 'hard', label: 'Khó' },
];

// Project card component
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const config = difficultyConfig[project.difficulty];

  const handleClick = () => {
    if (!project.isLocked) {
      window.location.href = `/projects/${project.id}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={!project.isLocked ? { y: -4 } : undefined}
      onClick={handleClick}
      className={`relative group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm transition-all duration-300 ${
        project.isLocked
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:shadow-xl cursor-pointer'
      }`}
    >
      {/* Locked overlay */}
      {project.isLocked && (
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center z-10 backdrop-blur-[1px]">
          <Lock className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center px-4">
            {project.prerequisiteMessage || 'Hoàn thành cấp độ trước để mở khóa'}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <Folder className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {project.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Completion badge */}
        {project.isCompleted && (
          <div className="flex-shrink-0 w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.estimatedHours} giờ</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <ListChecks className="w-3.5 h-3.5" />
          <span>
            {project.completedChecklist}/{project.checklistCount} yêu cầu
          </span>
        </div>
        {project.bestScore !== null && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span>{project.bestScore} điểm</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {!project.isLocked && (
        <div className="w-full">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  project.checklistCount > 0
                    ? (project.completedChecklist / project.checklistCount) * 100
                    : 0
                }%`,
              }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.08 + 0.3 }}
              className={`h-full rounded-full ${
                project.isCompleted
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
            />
          </div>
        </div>
      )}

      {/* XP reward */}
      <div className="mt-3 flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 text-yellow-500" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          +{project.xpReward} XP
        </span>
      </div>
    </motion.div>
  );
}

// Tab button component
function TabButton({
  tab,
  isActive,
  count,
  onClick,
}: {
  tab: { id: Difficulty; label: string };
  isActive: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 font-medium text-sm transition-colors ${
        isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      <span className="flex items-center gap-2">
        {tab.label}
        <span
          className={`px-2 py-0.5 rounded-full text-xs ${
            isActive
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          {count}
        </span>
      </span>
      {isActive && (
        <motion.div
          layoutId="projectActiveTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
        />
      )}
    </button>
  );
}

// Loading skeleton
function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        </div>
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-4" />
      <div className="flex gap-4 mb-4">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
    </div>
  );
}

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<Difficulty>('easy');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error('Không thể tải danh sách dự án');
      }
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => p.difficulty === activeTab);

  const getTabCount = (difficulty: Difficulty) =>
    projects.filter((p) => p.difficulty === difficulty).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Folder className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Dự án thực hành
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Áp dụng kiến thức Python vào các dự án thực tế
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white dark:bg-slate-800 rounded-xl p-1.5 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              count={getTabCount(tab.id)}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Không thể tải dữ liệu
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">
              {error}
            </p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
                  <Folder className="w-16 h-16 text-blue-400 dark:text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Chưa có dự án nào
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
                  Chưa có dự án ở mức độ "{difficultyConfig[activeTab].label}". Hãy tiếp tục học để mở khóa thêm dự án!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
