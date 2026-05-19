'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Sun,
  Moon,
  Bell,
  Shield,
  User,
  Globe,
  Save,
  Check,
  AlertTriangle,
  Trash2,
  KeyRound,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Types
interface NotificationPreferences {
  lessonCompletion: boolean;
  badgeEarned: boolean;
  levelUp: boolean;
  streakReminder: boolean;
}

interface PrivacySettings {
  leaderboardOptOut: boolean;
}

interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
}

const STORAGE_KEY = 'python-master-12-settings';

function loadPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return getDefaultPreferences();
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore parse errors
  }
  return getDefaultPreferences();
}

function getDefaultPreferences(): UserPreferences {
  return {
    notifications: {
      lessonCompletion: true,
      badgeEarned: true,
      levelUp: true,
      streakReminder: true,
    },
    privacy: {
      leaderboardOptOut: false,
    },
  };
}

function savePreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage errors
  }
}

// Toggle Switch Component
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}

function ToggleSwitch({ enabled, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
          enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// Delete Account Confirmation Modal
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Xóa tài khoản
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Hành động này không thể hoàn tác
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              Bạn có chắc chắn muốn xóa tài khoản? Tất cả dữ liệu học tập, tiến độ, huy hiệu và
              thành tích của bạn sẽ bị xóa vĩnh viễn.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Xóa tài khoản
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Section Card Component
interface SectionCardProps {
  icon: typeof Settings;
  iconColor: string;
  title: string;
  children: React.ReactNode;
  index: number;
}

function SectionCard({ icon: Icon, iconColor, title, children, index }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState<UserPreferences>(getDefaultPreferences());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load preferences from localStorage on mount
  useEffect(() => {
    setPreferences(loadPreferences());
  }, []);

  // Save preferences whenever they change
  const updatePreferences = (updater: (prev: UserPreferences) => UserPreferences) => {
    setPreferences((prev) => {
      const next = updater(prev);
      savePreferences(next);
      showSaveIndicator();
      return next;
    });
  };

  const showSaveIndicator = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 300);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // TODO: Call API to delete account
    alert('Tính năng xóa tài khoản sẽ được triển khai khi kết nối API.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Cài đặt
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Tùy chỉnh trải nghiệm học tập của bạn
          </p>
        </motion.div>

        {/* Save Status Indicator */}
        <AnimatePresence>
          {saveStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-4 right-4 z-40 flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shadow-lg border border-green-200 dark:border-green-800"
            >
              {saveStatus === 'saving' ? (
                <Save className="w-4 h-4 animate-pulse" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {saveStatus === 'saving' ? 'Đang lưu...' : 'Đã lưu'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {/* Theme Section */}
          <SectionCard icon={Sun} iconColor="#F59E0B" title="Giao diện" index={0}>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Chọn chế độ hiển thị phù hợp với bạn
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* Light Theme Option */}
              <button
                onClick={() => setTheme('light')}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {theme === 'light' && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-3">
                  {/* Light theme preview */}
                  <div className="w-full aspect-[4/3] rounded-lg bg-white border border-slate-200 p-2 overflow-hidden">
                    <div className="w-full h-2 bg-slate-200 rounded mb-1.5" />
                    <div className="flex gap-1">
                      <div className="w-1/3 h-8 bg-slate-100 rounded" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 bg-slate-200 rounded w-3/4" />
                        <div className="h-2 bg-slate-100 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Sáng
                    </span>
                  </div>
                </div>
              </button>

              {/* Dark Theme Option */}
              <button
                onClick={() => setTheme('dark')}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {theme === 'dark' && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-3">
                  {/* Dark theme preview */}
                  <div className="w-full aspect-[4/3] rounded-lg bg-slate-800 border border-slate-700 p-2 overflow-hidden">
                    <div className="w-full h-2 bg-slate-700 rounded mb-1.5" />
                    <div className="flex gap-1">
                      <div className="w-1/3 h-8 bg-slate-700 rounded" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 bg-slate-600 rounded w-3/4" />
                        <div className="h-2 bg-slate-700 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Tối
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </SectionCard>

          {/* Notification Preferences */}
          <SectionCard icon={Bell} iconColor="#3B82F6" title="Thông báo" index={1}>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Quản lý các loại thông báo bạn muốn nhận
            </p>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              <ToggleSwitch
                enabled={preferences.notifications.lessonCompletion}
                onChange={(val) =>
                  updatePreferences((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, lessonCompletion: val },
                  }))
                }
                label="Hoàn thành bài học"
                description="Thông báo khi bạn hoàn thành một bài học"
              />
              <ToggleSwitch
                enabled={preferences.notifications.badgeEarned}
                onChange={(val) =>
                  updatePreferences((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, badgeEarned: val },
                  }))
                }
                label="Nhận huy hiệu"
                description="Thông báo khi bạn đạt được huy hiệu mới"
              />
              <ToggleSwitch
                enabled={preferences.notifications.levelUp}
                onChange={(val) =>
                  updatePreferences((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, levelUp: val },
                  }))
                }
                label="Lên cấp"
                description="Thông báo khi bạn đạt cấp độ mới"
              />
              <ToggleSwitch
                enabled={preferences.notifications.streakReminder}
                onChange={(val) =>
                  updatePreferences((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, streakReminder: val },
                  }))
                }
                label="Nhắc nhở streak"
                description="Nhắc bạn học bài để duy trì chuỗi ngày học liên tục"
              />
            </div>
          </SectionCard>

          {/* Privacy Settings */}
          <SectionCard icon={Shield} iconColor="#22C55E" title="Quyền riêng tư" index={2}>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Kiểm soát thông tin hiển thị công khai
            </p>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              <ToggleSwitch
                enabled={preferences.privacy.leaderboardOptOut}
                onChange={(val) =>
                  updatePreferences((prev) => ({
                    ...prev,
                    privacy: { ...prev.privacy, leaderboardOptOut: val },
                  }))
                }
                label="Ẩn khỏi bảng xếp hạng"
                description="Tên của bạn sẽ không hiển thị trên bảng xếp hạng công khai"
              />
            </div>
          </SectionCard>

          {/* Account Section */}
          <SectionCard icon={User} iconColor="#8B5CF6" title="Tài khoản" index={3}>
            <div className="space-y-3">
              {/* Change Password */}
              <a
                href="/forgot-password"
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <KeyRound className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Đổi mật khẩu
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Cập nhật mật khẩu đăng nhập của bạn
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
              </a>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group border border-red-200 dark:border-red-900/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      Xóa tài khoản
                    </p>
                    <p className="text-xs text-red-500 dark:text-red-500/70">
                      Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors" />
              </button>
            </div>
          </SectionCard>

          {/* Language Section */}
          <SectionCard icon={Globe} iconColor="#06B6D4" title="Ngôn ngữ" index={4}>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇻🇳</span>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Tiếng Việt
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ngôn ngữ hiển thị mặc định
                  </p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium">
                Mặc định
              </span>
            </div>
          </SectionCard>
        </div>

        {/* Footer spacing */}
        <div className="h-8" />
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
