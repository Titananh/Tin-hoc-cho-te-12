'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  User,
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
  Shield,
  Star,
  Loader2,
  AlertCircle,
  FileText,
  TrendingUp,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role: string;
  xp: number;
  level: number;
  streak_count: number;
  created_at: string;
  badges_earned: number;
  lessons_completed: number;
  exercises_solved: number;
}

interface UserStats {
  total_xp: number;
  current_level: number;
  current_streak: number;
  longest_streak: number;
  badges_count: number;
  lessons_completed: number;
  exercises_solved: number;
  projects_finished: number;
  join_date: string;
}

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned_at: string;
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getLevelTitle(level: number): string {
  if (level >= 10) return 'Bậc Thầy Python';
  if (level >= 8) return 'Chuyên Gia';
  if (level >= 6) return 'Lập Trình Viên';
  if (level >= 4) return 'Học Viên Nâng Cao';
  if (level >= 2) return 'Học Viên';
  return 'Người Mới Bắt Đầu';
}

function getLevelColor(level: number): string {
  if (level >= 10) return '#F59E0B';
  if (level >= 8) return '#8B5CF6';
  if (level >= 6) return '#3B82F6';
  if (level >= 4) return '#10B981';
  if (level >= 2) return '#06B6D4';
  return '#6B7280';
}

// ─── Badge Icon Mapping ──────────────────────────────────────────────────────

function getBadgeIcon(iconName: string) {
  const iconMap: Record<string, typeof Trophy> = {
    trophy: Trophy,
    flame: Flame,
    star: Star,
    zap: Zap,
    award: Award,
    shield: Shield,
    book: BookOpen,
    code: Code2,
    briefcase: Briefcase,
  };
  return iconMap[iconName] || Award;
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
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
    </motion.div>
  );
}

function BadgeCard({ badge, index }: { badge: BadgeItem; index: number }) {
  const IconComponent = getBadgeIcon(badge.icon);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${badge.color}20` }}
      >
        <IconComponent className="w-6 h-6" style={{ color: badge.color }} />
      </div>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
        {badge.name}
      </span>
    </motion.div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inline edit state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  // Avatar upload state
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Fetch Data ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfileData();
    }
  }, [status]);

  async function fetchProfileData() {
    setIsLoading(true);
    setError(null);

    try {
      const [profileRes, statsRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/stats'),
      ]);

      if (!profileRes.ok) {
        throw new Error('Không thể tải thông tin cá nhân');
      }

      if (!statsRes.ok) {
        throw new Error('Không thể tải thống kê');
      }

      const profileData = await profileRes.json();
      const statsData = await statsRes.json();

      setProfile(profileData.user);
      setStats(statsData.stats);
      setEditName(profileData.user.name);

      // Fetch badges (mock for now since no dedicated badges endpoint for user)
      setBadges([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  }

  // ─── Name Edit Handlers ──────────────────────────────────────────────────

  function startEditingName() {
    setIsEditingName(true);
    setNameError(null);
  }

  function cancelEditingName() {
    setIsEditingName(false);
    setEditName(profile?.name || '');
    setNameError(null);
  }

  async function saveDisplayName() {
    const trimmed = editName.trim();

    if (trimmed.length < 2 || trimmed.length > 50) {
      setNameError('Tên phải từ 2 đến 50 ký tự');
      return;
    }

    setIsSavingName(true);
    setNameError(null);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Không thể cập nhật tên');
      }

      const data = await res.json();
      setProfile((prev) => (prev ? { ...prev, name: data.user.name } : prev));
      setIsEditingName(false);
    } catch (err) {
      setNameError(err instanceof Error ? err.message : 'Lỗi cập nhật');
    } finally {
      setIsSavingName(false);
    }
  }

  // ─── Avatar Upload Handlers ──────────────────────────────────────────────

  function triggerAvatarUpload() {
    fileInputRef.current?.click();
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ chấp nhận file ảnh JPEG, PNG hoặc WebP');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 2MB');
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Không thể tải ảnh lên');
      }

      const data = await res.json();
      setProfile((prev) => (prev ? { ...prev, avatar_url: data.avatar_url } : prev));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi tải ảnh');
    } finally {
      setIsUploadingAvatar(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  // ─── Loading State ───────────────────────────────────────────────────────

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Đang tải thông tin...</p>
        </motion.div>
      </div>
    );
  }

  // ─── Unauthenticated State ───────────────────────────────────────────────

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
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
        </motion.div>
      </div>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <button
            onClick={fetchProfileData}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Thử lại
          </button>
        </motion.div>
      </div>
    );
  }

  if (!profile || !stats) return null;

  // ─── Main Render ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
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
            {/* Avatar */}
            <div className="relative group">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer ring-4 ring-white dark:ring-slate-700 shadow-lg"
                onClick={triggerAvatarUpload}
                role="button"
                aria-label="Thay đổi ảnh đại diện"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && triggerAvatarUpload()}
              >
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUploadingAvatar ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
                aria-label="Chọn ảnh đại diện"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Name with inline edit */}
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
                      disabled={isSavingName}
                      className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
                      aria-label="Lưu tên"
                    >
                      {isSavingName ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
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
                      {profile.name}
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

              {/* Name error */}
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

              {/* Level badge */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${getLevelColor(profile.level)}20`,
                    color: getLevelColor(profile.level),
                  }}
                >
                  <Star className="w-3.5 h-3.5" />
                  Cấp {profile.level} - {getLevelTitle(profile.level)}
                </span>
              </div>

              {/* Quick stats row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  {stats.total_xp.toLocaleString()} XP
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {stats.current_streak} ngày streak
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Tham gia {formatDate(profile.created_at)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
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
              value={stats.lessons_completed}
              label="Bài học hoàn thành"
              color="#3B82F6"
              index={0}
            />
            <StatCard
              icon={Code2}
              value={stats.exercises_solved}
              label="Bài tập đã giải"
              color="#10B981"
              index={1}
            />
            <StatCard
              icon={Briefcase}
              value={stats.projects_finished}
              label="Dự án hoàn thành"
              color="#8B5CF6"
              index={2}
            />
            <StatCard
              icon={Award}
              value={stats.badges_count}
              label="Huy hiệu đạt được"
              color="#F59E0B"
              index={3}
            />
          </div>
        </motion.div>

        {/* Badges Section */}
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

          {badges.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {badges.map((badge, index) => (
                <BadgeCard key={badge.id} badge={badge} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                {stats.badges_count > 0
                  ? `Bạn đã đạt ${stats.badges_count} huy hiệu. Xem chi tiết tại trang Thành tựu.`
                  : 'Chưa có huy hiệu nào. Hãy hoàn thành bài học để nhận huy hiệu đầu tiên!'}
              </p>
              {stats.badges_count > 0 && (
                <a
                  href="/achievements"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Xem tất cả thành tựu
                  <Star className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Certificates Section (Placeholder) */}
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
