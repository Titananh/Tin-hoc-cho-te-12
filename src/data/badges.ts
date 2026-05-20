import { Badge } from '@/types';

export const badges: Badge[] = [
  // Learning Milestones
  {
    id: 'badge-first-lesson',
    name: 'Bước chân đầu tiên',
    slug: 'first-lesson',
    description: 'Hoàn thành bài học đầu tiên',
    icon: '🎓',
    color: '#3B82F6',
    requirement: 'complete_1_lesson',
    xp_reward: 50,
  },
  {
    id: 'badge-10-lessons',
    name: 'Người học chăm chỉ',
    slug: '10-lessons',
    description: 'Hoàn thành 10 bài học',
    icon: '📚',
    color: '#8B5CF6',
    requirement: 'complete_10_lessons',
    xp_reward: 200,
  },
  {
    id: 'badge-50-lessons',
    name: 'Bậc thầy kiến thức',
    slug: '50-lessons',
    description: 'Hoàn thành 50 bài học',
    icon: '🧠',
    color: '#F59E0B',
    requirement: 'complete_50_lessons',
    xp_reward: 500,
  },
  {
    id: 'badge-100-lessons',
    name: 'Tri thức vô tận',
    slug: '100-lessons',
    description: 'Hoàn thành 100 bài học',
    icon: '💎',
    color: '#EC4899',
    requirement: 'complete_100_lessons',
    xp_reward: 1000,
  },

  // Streak Achievements
  {
    id: 'badge-streak-3',
    name: 'Khởi đầu kiên trì',
    slug: 'streak-3',
    description: 'Duy trì streak 3 ngày',
    icon: '🔥',
    color: '#EF4444',
    requirement: 'streak_3_days',
    xp_reward: 75,
  },
  {
    id: 'badge-streak-7',
    name: 'Một tuần không ngừng',
    slug: 'streak-7',
    description: 'Duy trì streak 7 ngày',
    icon: '⚡',
    color: '#F97316',
    requirement: 'streak_7_days',
    xp_reward: 150,
  },
  {
    id: 'badge-streak-14',
    name: 'Nửa tháng kiên trì',
    slug: 'streak-14',
    description: 'Duy trì streak 14 ngày',
    icon: '🌟',
    color: '#EAB308',
    requirement: 'streak_14_days',
    xp_reward: 300,
  },
  {
    id: 'badge-streak-30',
    name: 'Tháng với ngọn lửa',
    slug: 'streak-30',
    description: 'Duy trì streak 30 ngày',
    icon: '🏆',
    color: '#22C55E',
    requirement: 'streak_30_days',
    xp_reward: 600,
  },
  {
    id: 'badge-streak-100',
    name: 'Huyền thoại kiên trì',
    slug: 'streak-100',
    description: 'Duy trì streak 100 ngày',
    icon: '👑',
    color: '#A855F7',
    requirement: 'streak_100_days',
    xp_reward: 2000,
  },

  // Algorithm Achievements
  {
    id: 'badge-first-problem',
    name: 'Lập trình viên mới',
    slug: 'first-problem',
    description: 'Giải quyết bài toán đầu tiên',
    icon: '💻',
    color: '#06B6D4',
    requirement: 'solve_1_problem',
    xp_reward: 50,
  },
  {
    id: 'badge-10-problems',
    name: 'Người giải quyết vấn đề',
    slug: '10-problems',
    description: 'Giải quyết 10 bài toán',
    icon: '🔧',
    color: '#0EA5E9',
    requirement: 'solve_10_problems',
    xp_reward: 200,
  },
  {
    id: 'badge-50-problems',
    name: 'Thuật toán gia',
    slug: '50-problems',
    description: 'Giải quyết 50 bài toán',
    icon: '⚙️',
    color: '#6366F1',
    requirement: 'solve_50_problems',
    xp_reward: 500,
  },
  {
    id: 'badge-100-problems',
    name: 'Bậc thầy thuật toán',
    slug: '100-problems',
    description: 'Giải quyết 100 bài toán',
    icon: '🎯',
    color: '#8B5CF6',
    requirement: 'solve_100_problems',
    xp_reward: 1000,
  },

  // Project Achievements
  {
    id: 'badge-first-project',
    name: 'Nhà xây dựng',
    slug: 'first-project',
    description: 'Hoàn thành dự án đầu tiên',
    icon: '🏗️',
    color: '#14B8A6',
    requirement: 'complete_1_project',
    xp_reward: 100,
  },
  {
    id: 'badge-5-projects',
    name: 'Người xây dựng cổ phần',
    slug: '5-projects',
    description: 'Hoàn thành 5 dự án',
    icon: '🏢',
    color: '#0D9488',
    requirement: 'complete_5_projects',
    xp_reward: 400,
  },
  {
    id: 'badge-10-projects',
    name: 'Kiến trúc sư',
    slug: '10-projects',
    description: 'Hoàn thành 10 dự án',
    icon: '🏛️',
    color: '#059669',
    requirement: 'complete_10_projects',
    xp_reward: 800,
  },

  // Social Achievements
  {
    id: 'badge-first-friend',
    name: 'Kết bạn',
    slug: 'first-friend',
    description: 'Mời thêm bạn đầu tiên',
    icon: '🤝',
    color: '#10B981',
    requirement: 'invite_1_friend',
    xp_reward: 100,
  },
  {
    id: 'badge-5-friends',
    name: 'Người xây dựng cộng đồng',
    slug: '5-friends',
    description: 'Mời 5 người bạn',
    icon: '👥',
    color: '#3B82F6',
    requirement: 'invite_5_friends',
    xp_reward: 300,
  },
  {
    id: 'badge-10-friends',
    name: 'Đại sứ cộng đồng',
    slug: '10-friends',
    description: 'Mời 10 người bạn',
    icon: '🌍',
    color: '#8B5CF6',
    requirement: 'invite_10_friends',
    xp_reward: 600,
  },
];

export interface UserAchievement {
  badge_id: string;
  earned_at: string | null;
  progress: number;
  target: number;
}

export const userAchievements: Record<string, UserAchievement> = {};

export const userStats = {
  totalAchievementsUnlocked: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalXP: 0,
};

export const recentAchievements: Array<{ badge_id: string; earned_at: string; icon: string; name: string }> = [];

export const milestoneTimeline: Array<{ date: string; label: string; type: string }> = [];
