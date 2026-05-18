'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Palette, GraduationCap, Bell, Lock, Globe,
  Sun, Moon, Monitor, ChevronDown, Camera,
  Check, X, LogOut, Smartphone, Clock
} from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';
type CodeFont = 'JetBrains Mono' | 'Fira Code' | 'Source Code Pro';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {label && <p className="font-medium">{label}</p>}
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
        />
      </button>
    </div>
  );
}

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
  formatValue?: (value: number) => string;
}

function Slider({ value, min, max, onChange, label, formatValue }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary font-medium">
            {formatValue ? formatValue(value) : value}
          </p>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--primary) ${percentage}%, var(--muted) ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
}

interface RadioOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
            value === option.value
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:bg-surface'
          }`}
        >
          {option.icon && <option.icon className="w-5 h-5" />}
          <span className="text-sm font-medium">{option.label}</span>
          {value === option.value && (
            <motion.div
              layoutId="radioIndicator"
              className="w-2 h-2 rounded-full bg-primary"
            />
          )}
        </button>
      ))}
    </div>
  );
}

interface SettingsCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function SettingsCard({ title, icon, children, defaultOpen = false }: SettingsCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => isMobile && setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-surface/50 transition-colors lg:cursor-default"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>
        {isMobile && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted" />
          </motion.div>
        )}
      </button>
      {(isMobile ? isOpen : true) && (
        <motion.div
          initial={isMobile ? { height: 0, opacity: 0 } : false}
          animate={isMobile ? { height: 'auto', opacity: 1 } : false}
          transition={{ duration: 0.3 }}
          className="border-t border-border"
        >
          <div className="p-5 space-y-6">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState(false);

  // Profile state
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0912 345 678',
    bio: 'Yêu thích học Python và lập trình web',
  });

  // Appearance state
  const [theme, setTheme] = useState<Theme>('system');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [codeFont, setCodeFont] = useState<CodeFont>('JetBrains Mono');
  const [showAnimations, setShowAnimations] = useState(true);

  // Learning state
  const [dailyGoal, setDailyGoal] = useState(3);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [focusMode, setFocusMode] = useState(false);
  const [pomodoroWork, setPomodoroWork] = useState(25);
  const [pomodoroBreak, setPomodoroBreak] = useState(5);

  // Notifications state
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    streakNotification: true,
    newExercises: true,
    aiFeedback: false,
    emailNotifications: false,
  });
  const [quietHours, setQuietHours] = useState({ enabled: false, start: '22:00', end: '07:00' });

  // Security state
  const [sessions] = useState([
    { id: 1, device: 'Chrome trên Windows', location: 'Hà Nội, VN', lastActive: 'Hiện tại' },
    { id: 2, device: 'Safari trên iPhone', location: 'Hà Nội, VN', lastActive: '2 giờ trước' },
  ]);

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
    { id: 'learning', label: 'Học tập', icon: GraduationCap },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'security', label: 'Bảo mật', icon: Lock },
    { id: 'language', label: 'Ngôn ngữ', icon: Globe },
  ];

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleSaveProfile = () => {
    showToast();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={item} className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              Cài đặt
            </h1>
            <p className="text-muted mt-1">Quản lý tài khoản và tùy chỉnh trải nghiệm của bạn</p>
          </motion.div>

          {/* Tab Navigation - Desktop */}
          <motion.div variants={item} className="hidden lg:flex mb-6">
            <div className="glass rounded-2xl p-2 border border-border flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'hover:bg-surface'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Navigation - Mobile */}
          <motion.div variants={item} className="lg:hidden mb-6">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface border border-border appearance-none cursor-pointer"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Settings Content */}
          <motion.div variants={item} className="space-y-6">
            {/* Profile Section */}
            {(activeTab === 'profile') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SettingsCard title="Hồ sơ" icon={<User className="w-5 h-5" />} defaultOpen>
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                        {avatar ? (
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-10 h-10 text-white" />
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Ảnh đại diện</p>
                      <p className="text-sm text-muted">JPG, PNG hoặc GIF. Kích thước tối đa 2MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tên</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Giới thiệu</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="w-full p-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Lưu thay đổi
                    </button>
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {/* Appearance Section */}
            {(activeTab === 'appearance') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SettingsCard title="Giao diện" icon={<Palette className="w-5 h-5" />} defaultOpen>
                  <div>
                    <p className="font-medium mb-3">Chủ đề</p>
                    <RadioGroup
                      value={theme}
                      onChange={(v) => setTheme(v as Theme)}
                      options={[
                        { value: 'light', label: 'Sáng', icon: Sun },
                        { value: 'dark', label: 'Tối', icon: Moon },
                        { value: 'system', label: 'Hệ thống', icon: Monitor },
                      ]}
                    />
                  </div>

                  <div>
                    <p className="font-medium mb-3">Cỡ chữ</p>
                    <RadioGroup
                      value={fontSize}
                      onChange={(v) => setFontSize(v as FontSize)}
                      options={[
                        { value: 'small', label: 'Nhỏ' },
                        { value: 'medium', label: 'Vừa' },
                        { value: 'large', label: 'Lớn' },
                      ]}
                    />
                  </div>

                  <div>
                    <p className="font-medium mb-2">Font code</p>
                    <select
                      value={codeFont}
                      onChange={(e) => setCodeFont(e.target.value as CodeFont)}
                      className="w-full p-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="JetBrains Mono">JetBrains Mono</option>
                      <option value="Fira Code">Fira Code</option>
                      <option value="Source Code Pro">Source Code Pro</option>
                    </select>
                  </div>

                  <Toggle
                    checked={showAnimations}
                    onChange={setShowAnimations}
                    label="Hiệu ứng chuyển động"
                    description="Bật/tắt các hiệu ứng animation trên trang"
                  />
                </SettingsCard>
              </motion.div>
            )}

            {/* Learning Section */}
            {(activeTab === 'learning') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SettingsCard title="Học tập" icon={<GraduationCap className="w-5 h-5" />} defaultOpen>
                  <Slider
                    value={dailyGoal}
                    min={1}
                    max={5}
                    onChange={setDailyGoal}
                    label="Mục tiêu hàng ngày"
                    formatValue={(v) => `${v} bài học`}
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nhắc nhở học tập</p>
                      <p className="text-sm text-muted">Thiết lập thời gian nhắc nhở mỗi ngày</p>
                    </div>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="p-3 rounded-xl bg-surface border border-border"
                    />
                  </div>

                  <Toggle
                    checked={focusMode}
                    onChange={setFocusMode}
                    label="Chế độ tập trung"
                    description="Ẩn các yếu tố gây phân tâm khi học"
                  />

                  <div className="space-y-4">
                    <p className="font-medium">Timer Pomodoro</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-muted mb-2">Thời gian làm việc</label>
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={pomodoroWork}
                          onChange={(e) => setPomodoroWork(Number(e.target.value))}
                          className="w-full p-3 rounded-xl bg-surface border border-border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted mb-2">Thời gian nghỉ</label>
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={pomodoroBreak}
                          onChange={(e) => setPomodoroBreak(Number(e.target.value))}
                          className="w-full p-3 rounded-xl bg-surface border border-border"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setPomodoroWork(25); setPomodoroBreak(5); }}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          pomodoroWork === 25 ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                        }`}
                      >
                        25/5
                      </button>
                      <button
                        onClick={() => { setPomodoroWork(50); setPomodoroBreak(10); }}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          pomodoroWork === 50 ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                        }`}
                      >
                        50/10
                      </button>
                    </div>
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {/* Notifications Section */}
            {(activeTab === 'notifications') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SettingsCard title="Thông báo" icon={<Bell className="w-5 h-5" />} defaultOpen>
                  <div className="space-y-4">
                    <Toggle
                      checked={notifications.dailyReminder}
                      onChange={(v) => setNotifications({ ...notifications, dailyReminder: v })}
                      label="Nhắc học hàng ngày"
                      description="Nhận thông báo nhắc nhở học tập mỗi ngày"
                    />
                    <Toggle
                      checked={notifications.streakNotification}
                      onChange={(v) => setNotifications({ ...notifications, streakNotification: v })}
                      label="Thông báo streak"
                      description="Cảnh báo khi chuỗi ngày học có thể bị gián đoạn"
                    />
                    <Toggle
                      checked={notifications.newExercises}
                      onChange={(v) => setNotifications({ ...notifications, newExercises: v })}
                      label="Bài tập mới"
                      description="Thông báo khi có bài tập mới được thêm vào"
                    />
                    <Toggle
                      checked={notifications.aiFeedback}
                      onChange={(v) => setNotifications({ ...notifications, aiFeedback: v })}
                      label="Feedback từ AI"
                      description="Nhận phản hồi từ AI Tutor về bài làm của bạn"
                    />
                    <Toggle
                      checked={notifications.emailNotifications}
                      onChange={(v) => setNotifications({ ...notifications, emailNotifications: v })}
                      label="Email notifications"
                      description="Nhận thông báo qua email"
                    />
                  </div>
                </SettingsCard>

                <SettingsCard title="Giờ yên tĩnh" icon={<Clock className="w-5 h-5" />}>
                  <Toggle
                    checked={quietHours.enabled}
                    onChange={(v) => setQuietHours({ ...quietHours, enabled: v })}
                    label="Bật giờ yên tĩnh"
                    description="Tắt tất cả thông báo trong khoảng thời gian này"
                  />
                  {quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-muted mb-2">Từ</label>
                        <input
                          type="time"
                          value={quietHours.start}
                          onChange={(e) => setQuietHours({ ...quietHours, start: e.target.value })}
                          className="w-full p-3 rounded-xl bg-surface border border-border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted mb-2">Đến</label>
                        <input
                          type="time"
                          value={quietHours.end}
                          onChange={(e) => setQuietHours({ ...quietHours, end: e.target.value })}
                          className="w-full p-3 rounded-xl bg-surface border border-border"
                        />
                      </div>
                    </div>
                  )}
                </SettingsCard>
              </motion.div>
            )}

            {/* Security Section */}
            {(activeTab === 'security') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SettingsCard title="Đổi mật khẩu" icon={<Lock className="w-5 h-5" />}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        className="w-full p-3 rounded-xl bg-surface border border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        className="w-full p-3 rounded-xl bg-surface border border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        className="w-full p-3 rounded-xl bg-surface border border-border"
                      />
                    </div>
                    <button className="px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity">
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </SettingsCard>

                <SettingsCard title="Xác thực hai yếu tố" icon={<Smartphone className="w-5 h-5" />}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">2FA qua ứng dụng</p>
                      <p className="text-sm text-muted">Bảo vệ tài khoản bằng 2 lớp xác thực</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl border border-border hover:bg-surface transition-colors text-sm">
                      Sắp ra mắt
                    </button>
                  </div>
                </SettingsCard>

                <SettingsCard title="Phiên đăng nhập" icon={<Clock className="w-5 h-5" />}>
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-surface"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-sm text-muted">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {session.lastActive === 'Hiện tại' && (
                          <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">
                            Hiện tại
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-3 rounded-xl border border-error text-error hover:bg-error/10 transition-colors flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Đăng xuất tất cả thiết bị
                  </button>
                </SettingsCard>
              </motion.div>
            )}

            {/* Language Section */}
            {(activeTab === 'language') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SettingsCard title="Ngôn ngữ" icon={<Globe className="w-5 h-5" />} defaultOpen>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ngôn ngữ hiển thị</p>
                      <p className="text-sm text-muted">Chọn ngôn ngữ giao diện ứng dụng</p>
                    </div>
                    <div className="relative">
                      <select
                        value="vi"
                        disabled
                        className="p-3 pr-10 rounded-xl bg-surface border border-border appearance-none cursor-not-allowed opacity-75"
                      >
                        <option value="vi">Tiếng Việt</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                          Sắp ra mắt
                        </span>
                        <ChevronDown className="w-4 h-4 text-muted" />
                      </div>
                    </div>
                  </div>
                </SettingsCard>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="glass rounded-2xl px-6 py-4 border border-border shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="font-medium">Đã lưu thay đổi</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}