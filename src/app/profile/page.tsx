'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User as UserIcon,
  Camera,
  Edit3,
  Check,
  X,
  Award,
  Flame,
  Zap,
  BookOpen,
  Code2,
  Briefcase,
  Calendar,
  Trophy,
  Star,
  Loader2,
  AlertCircle,
  FileText,
  TrendingUp,
} from 'lucide-react';

import {
  getCurrentUser,
  type User as ClientUser,
} from '@/lib/client-auth';
import {
  getGamificationState,
  getLevelTitle,
  type GamificationState,
} from '@/lib/gamification-store';
import { getSolvedCount } from '@/lib/solved-tracker';

// ─── Helpers ────────────────────────────────────────────────────────────────

const PROFILE_KEY = 'python_master_profile';

interface ExtraProfile {
  displayName?: string;
  avatarDataUrl?: string;
}

function getExtraProfile(): ExtraProfile {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveExtraProfile(p: ExtraProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getLevelColor(level: number): string {
  if (level >= 30) return '#F59E0B';
  if (level >= 20) return '#8B5CF6';
  if (level >= 10) return '#3B82F6';
  if (level >= 5) return '#10B981';
  if (level >= 2) return '#06B6D4';
  return '#6B7280';
}

// ─── Components ──────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  value,
  label,
  color,
  index,
}: {
  icon: typeof Trophy;
  value: string | number;
  label: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [authUser, setAuthUser] = useState<ClientUser | null>(null);
  const [extra, setExtra] = useState<ExtraProfile>({});
  const [state, setState] = useState<GamificationState | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Inline edit state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = getCurrentUser();
    setAuthUser(u);
    setExtra(getExtraProfile());
    setState(getGamificationState());
    setSolvedCount(getSolvedCount());
    setIsLoading(false);
  }, []);

  if (isLoading || !state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Bạn cần đăng nhập
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Vui lòng đăng nhập để xem trang cá nhân
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Đăng Nhập
          </a>
        </div>
      </div>
    );
  }

  const displayName = extra.displayName ?? authUser.name;
  const avatarUrl = extra.avatarDataUrl ?? null;

  function startEditingName() {
    setEditName(displayName);
    setIsEditingName(true);
    setNameError(null);
  }

  function cancelEditingName() {
    setIsEditingName(false);
    setEditName('');
    setNameError(null);
  }

  function saveDisplayName() {
    const trimmed = editName.trim();
    if (trimmed.length < 2 || trimmed.length > 50) {
      setNameError('Tên phải từ 2 đến 50 ký tự');
      return;
    }
    const next = { ...extra, displayName: trimmed };
    setExtra(next);
    saveExtraProfile(next);
    setIsEditingName(false);
  }

  function triggerAvatarUpload() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ chấp nhận file ảnh JPEG, PNG hoặc WebP');
      return;
    }
    if (file.size > 1024 * 1024) {
      alert('Kích thước file không được vượt quá 1MB (do lưu trên trình duyệt)');
      return;
    }

    setIsUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const next = { ...extra, avatarDataUrl: dataUrl };
      setExtra(next);
      saveExtraProfile(next);
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.onerror = () => {
      alert('Không thể đọc file ảnh');
      setIsUploadingAvatar(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Trang Cá Nhân
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý thông tin và theo dõi tiến độ học tập
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer ring-4 ring-white dark:ring-slate-700 shadow-lg"
                onClick={triggerAvatarUpload}
                role="button"
                aria-label="Thay đổi ảnh đại diện"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && triggerAvatarUpload()}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-white" />
                )}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUploadingAvatar ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
                aria-label="Chọn ảnh đại diện"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                      autoFocus
                      maxLength={50}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveDisplayName();
                        if (e.key === 'Escape') cancelEditingName();
                      }}
                    />
                    <button
                      onClick={saveDisplayName}
                      className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      aria-label="Lưu tên"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEditingName}
                      className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      aria-label="Hủy"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {displayName}
                    </h2>
                    <button
                      onClick={startEditingName}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      aria-label="Chỉnh sửa tên"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              <AnimatePresence>
                {nameError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-red-500 mb-1"
                  >
                    {nameError}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {authUser.email}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${getLevelColor(state.level)}20`,
                    color: getLevelColor(state.level),
                  }}
                >
                  <Star className="w-3.5 h-3.5" />
                  Cấp {state.level} - {getLevelTitle(state.level)}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  {state.totalXP.toLocaleString()} XP
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {state.streak.current} ngày streak
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Tham gia {formatDate(authUser.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Thống Kê Học Tập
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={BookOpen}
              value={state.lessonsCompleted}
              label="Bài học hoàn thành"
              color="#3B82F6"
              index={0}
            />
            <StatCard
              icon={Code2}
              value={state.problemsSolved + solvedCount}
              label="Bài tập đã giải"
              color="#10B981"
              index={1}
            />
            <StatCard
              icon={Briefcase}
              value={state.hardProblemsSolved}
              label="Bài khó hoàn thành"
              color="#8B5CF6"
              index={2}
            />
            <StatCard
              icon={Award}
              value={state.unlockedAchievements.length}
              label="Huy hiệu đạt được"
              color="#F59E0B"
              index={3}
            />
          </div>
        </motion.div>

        {/* Badges section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Huy Hiệu Đã Đạt
          </h3>
          {state.unlockedAchievements.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                Chưa có huy hiệu nào. Hãy hoàn thành bài học để nhận huy hiệu đầu tiên!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {state.unlockedAchievements.map((id) => {
                const achievement = state.achievements.find((a) => a.id === id);
                if (!achievement) return null;
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
                      {achievement.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Certificates placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Chứng Chỉ
          </h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              Chứng chỉ sẽ được cấp khi bạn hoàn thành các cấp độ học tập
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Hoàn thành tất cả bài học và bài tập trong một cấp độ để nhận chứng chỉ
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
