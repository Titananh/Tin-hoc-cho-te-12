'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  Zap,
  Flame,
  Calendar,
  BookOpen,
  Code2,
  FileText,
  Award,
  Loader2,
  AlertCircle,
  KeyRound,
  UserCog,
  Ban,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserDetail {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role: string;
  total_xp: number;
  current_level: number;
  created_at: string;
  last_active: string | null;
  is_active: boolean;
}

interface UserStats {
  lessonsCompleted: number;
  exercisesSolved: number;
  totalSubmissions: number;
}

interface UserStreak {
  current_streak: number;
  longest_streak: number;
}

interface BadgeItem {
  id: string;
  badge_id: string;
  earned_at: string;
  badges: {
    name: string;
    description: string;
    icon_url: string;
    rarity: string;
  } | null;
}

interface ActivityItem {
  id: string;
  amount: number;
  source: string;
  description: string;
  created_at: string;
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

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getRoleBadge(role: string) {
  if (role === 'admin') {
    return { label: 'Quản trị viên', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' };
  }
  return { label: 'Học sinh', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' };
}

function getSourceLabel(source: string): string {
  const map: Record<string, string> = {
    lesson: 'Hoàn thành bài học',
    exercise: 'Giải bài tập',
    quiz: 'Hoàn thành quiz',
    project: 'Hoàn thành dự án',
    admin_adjustment: 'Điều chỉnh bởi admin',
    streak: 'Streak bonus',
    badge: 'Nhận huy hiệu',
  };
  return map[source] || source;
}


// ─── Confirmation Dialog Component ──────────────────────────────────────────

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  confirmColor,
  isLoading,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 ${confirmColor}`}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}


// ─── Main Page Component ─────────────────────────────────────────────────────

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  // Data state
  const [user, setUser] = useState<UserDetail | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Action states
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dialog states
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showXpDialog, setShowXpDialog] = useState(false);

  // Form states
  const [newPassword, setNewPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [xpAmount, setXpAmount] = useState('');
  const [xpReason, setXpReason] = useState('');

  // ─── Fetch Data ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  async function fetchUserData() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Không thể tải thông tin người dùng');
      }

      const data = await res.json();
      setUser(data.user);
      setStats(data.stats);
      setStreak(data.streak);
      setBadges(data.badges);
      setRecentActivity(data.recentActivity);
      setSelectedRole(data.user.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  }

  // ─── Action Handlers ─────────────────────────────────────────────────────

  async function performAction(body: Record<string, unknown>) {
    setActionLoading(true);
    setActionMessage(null);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Thao tác thất bại');
      }

      setActionMessage({ type: 'success', text: data.message });
      // Refresh user data
      await fetchUserData();
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Đã xảy ra lỗi',
      });
    } finally {
      setActionLoading(false);
    }
  }

  function handleChangeRole() {
    if (selectedRole && selectedRole !== user?.role) {
      performAction({ action: 'changeRole', role: selectedRole });
    }
    setShowRoleDialog(false);
  }

  function handleResetPassword() {
    if (newPassword.length >= 8) {
      performAction({ action: 'resetPassword', newPassword });
      setNewPassword('');
    }
    setShowResetPasswordDialog(false);
  }

  function handleAdjustXp() {
    const amount = parseInt(xpAmount, 10);
    if (!isNaN(amount) && amount !== 0) {
      performAction({ action: 'adjustXp', amount, reason: xpReason });
      setXpAmount('');
      setXpReason('');
    }
    setShowXpDialog(false);
  }

  function handleDeactivate() {
    const action = user?.is_active ? 'deactivate' : 'activate';
    performAction({ action });
    setShowDeactivateDialog(false);
  }

  async function handleDelete() {
    setActionLoading(true);
    setActionMessage(null);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể xóa tài khoản');
      }

      setActionMessage({ type: 'success', text: data.message });
      // Redirect back to users list after short delay
      setTimeout(() => router.push('/admin/users'), 2000);
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Đã xảy ra lỗi',
      });
    } finally {
      setActionLoading(false);
      setShowDeleteDialog(false);
    }
  }


  // ─── Loading State ───────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Đang tải thông tin người dùng...
          </p>
        </div>
      </div>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!user || !stats) return null;

  const roleBadge = getRoleBadge(user.role);

  // ─── Main Render ─────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Link>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-sm font-medium ${
            actionMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
              : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
          }`}
        >
          {actionMessage.text}
        </motion.div>
      )}

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white dark:ring-slate-700 shadow-lg flex-shrink-0">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h2>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge.color}`}>
                <Shield className="w-3 h-3" />
                {roleBadge.label}
              </span>
              {!user.is_active && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  <Ban className="w-3 h-3" />
                  Đã vô hiệu hóa
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-500" />
                {user.total_xp.toLocaleString()} XP
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-500" />
                Cấp {user.current_level}
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                {streak?.current_streak ?? 0} ngày streak
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-green-500" />
                Tham gia {formatDate(user.created_at)}
              </span>
            </div>

            {user.last_active && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                Hoạt động lần cuối: {formatDateTime(user.last_active)}
              </p>
            )}
          </div>
        </div>
      </motion.div>


      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Thống kê học tập
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.lessonsCompleted}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Bài học hoàn thành
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.exercisesSolved}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Bài tập đã giải
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalSubmissions}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tổng lượt nộp bài
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Admin Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Thao tác quản trị
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Change Role */}
          <button
            onClick={() => setShowRoleDialog(true)}
            disabled={actionLoading}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left disabled:opacity-50"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <UserCog className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Đổi vai trò</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin / Học sinh</p>
            </div>
          </button>

          {/* Reset Password */}
          <button
            onClick={() => setShowResetPasswordDialog(true)}
            disabled={actionLoading}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left disabled:opacity-50"
          >
            <div className="w-9 h-9 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
              <KeyRound className="w-4.5 h-4.5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Đặt lại mật khẩu</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tạo mật khẩu mới</p>
            </div>
          </button>

          {/* Adjust XP */}
          <button
            onClick={() => setShowXpDialog(true)}
            disabled={actionLoading}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left disabled:opacity-50"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Điều chỉnh XP</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Cộng / trừ điểm</p>
            </div>
          </button>

          {/* Deactivate / Activate */}
          <button
            onClick={() => setShowDeactivateDialog(true)}
            disabled={actionLoading}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left disabled:opacity-50"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              user.is_active
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-green-100 dark:bg-green-900/30'
            }`}>
              {user.is_active ? (
                <Ban className="w-4.5 h-4.5 text-red-600 dark:text-red-400" />
              ) : (
                <CheckCircle2 className="w-4.5 h-4.5 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user.is_active ? 'Vô hiệu hóa' : 'Kích hoạt lại'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.is_active ? 'Tạm khóa tài khoản' : 'Mở khóa tài khoản'}
              </p>
            </div>
          </button>
        </div>

        {/* Delete Account - Separate danger zone */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setShowDeleteDialog(true)}
            disabled={actionLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Xóa tài khoản vĩnh viễn
          </button>
        </div>
      </motion.div>


      {/* Badges Section */}
      {badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Huy hiệu đã đạt ({badges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
                  {badge.badges?.name ?? 'Huy hiệu'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.amount > 0
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <Zap className={`w-4 h-4 ${
                      activity.amount > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {getSourceLabel(activity.source)}
                    </p>
                    {activity.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    activity.amount > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {activity.amount > 0 ? '+' : ''}{activity.amount} XP
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {formatDateTime(activity.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}


      {/* ─── Dialogs ──────────────────────────────────────────────────────────── */}

      {/* Change Role Dialog */}
      {showRoleDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowRoleDialog(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Thay đổi vai trò
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Chọn vai trò mới cho <strong>{user.name}</strong>:
            </p>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="student">Học sinh</option>
              <option value="admin">Quản trị viên</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRoleDialog(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleChangeRole}
                disabled={actionLoading || selectedRole === user.role}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Xác nhận
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reset Password Dialog */}
      {showResetPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowResetPasswordDialog(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Đặt lại mật khẩu
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Nhập mật khẩu mới cho <strong>{user.name}</strong> (tối thiểu 8 ký tự):
            </p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mật khẩu mới..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              minLength={8}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowResetPasswordDialog(false); setNewPassword(''); }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleResetPassword}
                disabled={actionLoading || newPassword.length < 8}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Đặt lại
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Adjust XP Dialog */}
      {showXpDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowXpDialog(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Điều chỉnh XP
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Nhập số XP cần điều chỉnh cho <strong>{user.name}</strong> (số dương để cộng, số âm để trừ):
            </p>
            <input
              type="number"
              value={xpAmount}
              onChange={(e) => setXpAmount(e.target.value)}
              placeholder="Ví dụ: 100 hoặc -50"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <input
              type="text"
              value={xpReason}
              onChange={(e) => setXpReason(e.target.value)}
              placeholder="Lý do (tùy chọn)..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowXpDialog(false); setXpAmount(''); setXpReason(''); }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAdjustXp}
                disabled={actionLoading || !xpAmount || parseInt(xpAmount) === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Điều chỉnh
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Deactivate/Activate Confirmation */}
      <ConfirmDialog
        isOpen={showDeactivateDialog}
        title={user.is_active ? 'Vô hiệu hóa tài khoản' : 'Kích hoạt tài khoản'}
        message={
          user.is_active
            ? `Bạn có chắc muốn vô hiệu hóa tài khoản "${user.name}"? Người dùng sẽ không thể đăng nhập cho đến khi được kích hoạt lại.`
            : `Bạn có chắc muốn kích hoạt lại tài khoản "${user.name}"? Người dùng sẽ có thể đăng nhập trở lại.`
        }
        confirmLabel={user.is_active ? 'Vô hiệu hóa' : 'Kích hoạt'}
        confirmColor={user.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
        isLoading={actionLoading}
        onConfirm={handleDeactivate}
        onCancel={() => setShowDeactivateDialog(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Xóa tài khoản"
        message={`Bạn có chắc muốn xóa tài khoản "${user.name}" (${user.email})? Hành động này sẽ vô hiệu hóa tài khoản vĩnh viễn và không thể hoàn tác.`}
        confirmLabel="Xóa vĩnh viễn"
        confirmColor="bg-red-600 hover:bg-red-700"
        isLoading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
