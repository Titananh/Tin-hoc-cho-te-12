'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Code,
  HelpCircle,
  FolderGit2,
  Award,
  BarChart3,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Ban,
  Bell,
  TrendingUp,
  Calendar,
  Flame,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Menu,
  X,
  Zap,
  Activity,
  FileText,
  Send
} from 'lucide-react';

// Types
interface MockUser {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  streak: number;
  status: 'active' | 'banned' | 'inactive';
  avatar: string;
  joinDate: string;
}

interface MockLesson {
  id: string;
  title: string;
  module: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'published' | 'draft' | 'archived';
  xp: number;
  duration: number;
}

interface RecentActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'submission' | 'badge' | 'lesson' | 'achievement';
}

// Mock Data
const mockUsers: MockUser[] = [
  { id: '1', name: 'Nguyễn Văn Minh', email: 'minh.nv@example.com', level: 12, xp: 15420, streak: 28, status: 'active', avatar: 'NM', joinDate: '2024-01-15' },
  { id: '2', name: 'Trần Thị Lan', email: 'lan.tt@example.com', level: 8, xp: 8920, streak: 14, status: 'active', avatar: 'TL', joinDate: '2024-02-20' },
  { id: '3', name: 'Lê Hoàng Nam', email: 'nam.lh@example.com', level: 15, xp: 22100, streak: 45, status: 'active', avatar: 'LN', joinDate: '2023-11-08' },
  { id: '4', name: 'Phạm Thu Hà', email: 'ha.pt@example.com', level: 6, xp: 5400, streak: 7, status: 'inactive', avatar: 'PH', joinDate: '2024-03-12' },
  { id: '5', name: 'Đặng Quốc Khánh', email: 'khanh.dq@example.com', level: 10, xp: 12000, streak: 21, status: 'banned', avatar: 'DK', joinDate: '2024-01-28' },
];

const mockLessons: MockLesson[] = [
  { id: '1', title: 'Biến và Kiểu dữ liệu', module: 'Python Cơ bản', difficulty: 'easy', status: 'published', xp: 100, duration: 15 },
  { id: '2', title: 'Câu lệnh điều kiện', module: 'Python Cơ bản', difficulty: 'easy', status: 'published', xp: 120, duration: 20 },
  { id: '3', title: 'Vòng lặp For và While', module: 'Python Cơ bản', difficulty: 'medium', status: 'published', xp: 150, duration: 25 },
  { id: '4', title: 'Hàm và Đệ quy', module: 'Python Nâng cao', difficulty: 'medium', status: 'draft', xp: 200, duration: 35 },
  { id: '5', title: 'List và Dictionary', module: 'Python Cơ bản', difficulty: 'easy', status: 'published', xp: 130, duration: 22 },
  { id: '6', title: 'Xử lý File', module: 'Python Nâng cao', difficulty: 'hard', status: 'archived', xp: 250, duration: 40 },
];

const mockActivities: RecentActivity[] = [
  { id: '1', user: 'Minh Nguyễn', action: 'hoàn thành', target: 'Bài 5: List và Dictionary', time: '5 phút trước', type: 'lesson' },
  { id: '2', user: 'Lan Trần', action: 'nhận được', target: 'Huy hiệu "Coder 30 ngày"', time: '12 phút trước', type: 'badge' },
  { id: '3', user: 'Nam Lê', action: 'nộp bài', target: 'Bài tập: Fibonacci', time: '18 phút trước', type: 'submission' },
  { id: '4', user: 'Hà Phạm', action: 'đạt streak', target: '7 ngày liên tiếp', time: '25 phút trước', type: 'achievement' },
  { id: '5', user: 'Khánh Đặng', action: 'hoàn thành', target: 'Quiz: OOP Basics', time: '1 giờ trước', type: 'submission' },
];

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

// Stats Card Component
function StatsCard({ icon: Icon, label, value, trend, color, delay }: {
  icon: React.ElementType;
  label: string;
  value: number;
  trend?: string;
  color: string;
  delay: number;
}) {
  const { count, ref } = useAnimatedCounter(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="flex items-center text-sm text-success font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground">{count.toLocaleString()}</p>
        <p className="text-muted text-sm mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

// Activity Item Component
function ActivityItem({ activity, index }: { activity: RecentActivity; index: number }) {
  const icons = {
    submission: CheckCircle2,
    badge: Award,
    lesson: BookOpen,
    achievement: Flame
  };
  const colors = {
    submission: 'bg-success/10 text-success',
    badge: 'bg-warning/10 text-warning',
    lesson: 'bg-primary/10 text-primary',
    achievement: 'bg-secondary/10 text-secondary'
  };

  const Icon = icons[activity.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface/50 transition-colors"
    >
      <div className={`p-2 rounded-lg ${colors[activity.type]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium text-foreground">{activity.user}</span>{' '}
          <span className="text-muted">{activity.action}</span>{' '}
          <span className="font-medium text-foreground">{activity.target}</span>
        </p>
        <p className="text-xs text-muted mt-0.5">{activity.time}</p>
      </div>
    </motion.div>
  );
}

// Quick Action Button
function QuickAction({ icon: Icon, label, onClick, color }: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-surface/80 transition-all w-full text-left"
    >
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="font-medium text-foreground">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted ml-auto" />
    </motion.button>
  );
}

// User Table Row
function UserRow({ user, onView, onEdit, onToggleBan }: {
  user: MockUser;
  onView: () => void;
  onEdit: () => void;
  onToggleBan: () => void;
}) {
  const statusColors = {
    active: 'bg-success/10 text-success',
    banned: 'bg-error/10 text-error',
    inactive: 'bg-muted/10 text-muted'
  };
  const statusLabels = {
    active: 'Hoạt động',
    banned: 'Bị cấm',
    inactive: 'Không hoạt động'
  };

  return (
    <tr className="border-b border-border hover:bg-surface/50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium text-sm">
            {user.avatar}
          </div>
          <div>
            <p className="font-medium text-foreground">{user.name}</p>
            <p className="text-sm text-muted">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
          Level {user.level}
        </span>
      </td>
      <td className="py-4 px-4 text-muted">{user.xp.toLocaleString()} XP</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1 text-warning">
          <Flame className="w-4 h-4" />
          <span className="font-medium">{user.streak}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[user.status]}`}>
          {statusLabels[user.status]}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button onClick={onView} className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-primary">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={onEdit} className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-secondary">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onToggleBan} className={`p-2 hover:bg-surface rounded-lg transition-colors ${user.status === 'banned' ? 'text-success hover:text-success' : 'text-error hover:text-error'}`}>
            {user.status === 'banned' ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
          </button>
        </div>
      </td>
    </tr>
  );
}

// Lesson Row
function LessonRow({ lesson, onEdit, onDelete }: {
  lesson: MockLesson;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const difficultyColors = {
    easy: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    hard: 'bg-error/10 text-error'
  };
  const statusColors = {
    published: 'bg-success/10 text-success',
    draft: 'bg-warning/10 text-warning',
    archived: 'bg-muted/10 text-muted'
  };
  const difficultyLabels = {
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó'
  };
  const statusLabels = {
    published: 'Đã đăng',
    draft: 'Nháp',
    archived: 'Lưu trữ'
  };

  return (
    <tr className="border-b border-border hover:bg-surface/50 transition-colors">
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-foreground">{lesson.title}</p>
          <p className="text-sm text-muted">{lesson.module}</p>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[lesson.difficulty]}`}>
          {difficultyLabels[lesson.difficulty]}
        </span>
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[lesson.status]}`}>
          {statusLabels[lesson.status]}
        </span>
      </td>
      <td className="py-4 px-4 text-muted">{lesson.xp} XP</td>
      <td className="py-4 px-4 text-muted">{lesson.duration} phút</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-secondary">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-error">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Sidebar Navigation Item
function NavItem({ icon: Icon, label, active, onClick }: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
        active
          ? 'bg-primary text-white shadow-lg shadow-primary/25'
          : 'text-muted hover:bg-surface hover:text-foreground'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}

// Main Admin Page
export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [users, setUsers] = useState(mockUsers);

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Tổng quan' },
    { id: 'users', icon: Users, label: 'Người dùng' },
    { id: 'lessons', icon: BookOpen, label: 'Bài học' },
    { id: 'exercises', icon: Code, label: 'Bài tập' },
    { id: 'quiz', icon: HelpCircle, label: 'Quiz' },
    { id: 'projects', icon: FolderGit2, label: 'Dự án' },
    { id: 'badges', icon: Award, label: 'Huy hiệu' },
    { id: 'statistics', icon: BarChart3, label: 'Thống kê' },
  ];

  const handleToggleBan = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'banned' ? 'active' : 'banned' };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard icon={Users} label="Tổng Users" value={1250} trend="+12%" color="bg-primary" delay={0} />
              <StatsCard icon={BookOpen} label="Bài học" value={48} color="bg-secondary" delay={1} />
              <StatsCard icon={Code} label="Bài tập" value={156} color="bg-accent" delay={2} />
              <StatsCard icon={FileText} label="Bài nộp hôm nay" value={342} trend="+8%" color="bg-success" delay={3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Hoạt động gần đây
                </h3>
                <div className="space-y-1">
                  {mockActivities.map((activity, index) => (
                    <ActivityItem key={activity.id} activity={activity} index={index} />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Thao tác nhanh
                </h3>
                <div className="space-y-3">
                  <QuickAction
                    icon={Plus}
                    label="Thêm bài học"
                    onClick={() => setActiveSection('lessons')}
                    color="bg-primary"
                  />
                  <QuickAction
                    icon={Code}
                    label="Tạo bài tập"
                    onClick={() => setActiveSection('exercises')}
                    color="bg-secondary"
                  />
                  <QuickAction
                    icon={Bell}
                    label="Gửi thông báo"
                    onClick={() => {}}
                    color="bg-accent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-foreground">Quản lý Người dùng</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                  />
                </div>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-4 py-2 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="all">Tất cả</option>
                  <option value="active">Hoạt động</option>
                  <option value="banned">Bị cấm</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-surface/50">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Người dùng</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Level</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">XP</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Streak</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Trạng thái</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onView={() => {}}
                      onEdit={() => {}}
                      onToggleBan={() => handleToggleBan(user.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'lessons':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-foreground">Quản lý Bài học</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/25"
              >
                <Plus className="w-4 h-4" />
                Thêm bài học
              </motion.button>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-surface/50">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Bài học</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Độ khó</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Trạng thái</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">XP</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Thời lượng</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {navItems.find(item => item.id === activeSection)?.label}
            </h3>
            <p className="text-muted">Tính năng đang được phát triển...</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold text-foreground">Quản lý hệ thống</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-foreground">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-foreground">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-r border-border"
            >
              <div className="w-[260px] p-4 space-y-2">
                {navItems.map((item) => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                  />
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}