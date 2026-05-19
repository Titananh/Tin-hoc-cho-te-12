/**
 * Gamification Store - Client-side state manager
 * Hệ thống gamification phía client sử dụng localStorage
 * Python Master 12
 */

// ============================================================
// Interfaces
// ============================================================

export interface RankInfo {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';
  name: string;
  icon: string;
  color: string;
  minXP: number;
  maxXP: number;
  progress: number;
}

export interface StreakInfo {
  current: number;
  longest: number;
  lastActivityDate: string;
  milestones: Array<{ days: number; reached: boolean; reward: number }>;
}

export interface WeeklyGoalInfo {
  problemsTarget: number;
  problemsDone: number;
  xpTarget: number;
  xpEarned: number;
  weekStart: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'speed' | 'mastery' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  condition: string;
}

export interface ActivityEntry {
  type: 'problem_solved' | 'lesson_completed' | 'streak_maintained' | 'achievement_unlocked' | 'xp_earned';
  description: string;
  xp: number;
  timestamp: string;
}

export interface GamificationState {
  totalXP: number;
  level: number;
  rank: RankInfo;
  streak: StreakInfo;
  weeklyGoals: WeeklyGoalInfo;
  achievements: Achievement[];
  unlockedAchievements: string[];
  activityLog: ActivityEntry[];
  problemsSolved: number;
  lessonsCompleted: number;
  problemsSolvedToday: number;
  problemsSolvedWithoutHints: number;
  fastSolves: number;
  hardProblemsSolved: number;
  weeklyGoalsCompleted: number;
}


// ============================================================
// Constants
// ============================================================

const STORAGE_KEY = 'python_master_gamification';

const RANK_TIERS: Omit<RankInfo, 'progress'>[] = [
  { tier: 'bronze', name: 'Tân binh', icon: '🥉', color: '#CD7F32', minXP: 0, maxXP: 500 },
  { tier: 'silver', name: 'Chiến binh', icon: '🥈', color: '#C0C0C0', minXP: 500, maxXP: 2000 },
  { tier: 'gold', name: 'Kiếm sĩ', icon: '🥇', color: '#FFD700', minXP: 2000, maxXP: 5000 },
  { tier: 'platinum', name: 'Pháp sư', icon: '💎', color: '#E5E4E2', minXP: 5000, maxXP: 10000 },
  { tier: 'diamond', name: 'Bậc thầy', icon: '💠', color: '#B9F2FF', minXP: 10000, maxXP: 20000 },
  { tier: 'master', name: 'Huyền thoại', icon: '👑', color: '#FF4500', minXP: 20000, maxXP: 999999 },
];

const LEVEL_TITLES: Record<number, string> = {
  1: 'Người mới bắt đầu',
  5: 'Học viên chăm chỉ',
  10: 'Lập trình viên tập sự',
  15: 'Coder đầy triển vọng',
  20: 'Nhà phát triển trẻ',
  25: 'Kỹ sư phần mềm',
  30: 'Chuyên gia Python',
  35: 'Kiến trúc sư code',
  40: 'Bậc thầy thuật toán',
  45: 'Thiên tài lập trình',
  50: 'Huyền thoại Python',
};

const STREAK_MILESTONES = [
  { days: 7, reward: 50 },
  { days: 14, reward: 100 },
  { days: 30, reward: 250 },
  { days: 60, reward: 500 },
  { days: 100, reward: 1000 },
  { days: 365, reward: 5000 },
];


// ============================================================
// 30 Achievements
// ============================================================

const ALL_ACHIEVEMENTS: Achievement[] = [
  // Learning category
  { id: 'first_problem', title: 'Bước đầu tiên', description: 'Giải bài tập đầu tiên', icon: '🎯', category: 'learning', rarity: 'common', xpReward: 20, condition: 'Giải 1 bài tập' },
  { id: 'solve_10', title: 'Khởi động tốt', description: 'Giải được 10 bài tập', icon: '📝', category: 'learning', rarity: 'common', xpReward: 50, condition: 'Giải 10 bài tập' },
  { id: 'solve_50', title: 'Kiên trì luyện tập', description: 'Giải được 50 bài tập', icon: '💪', category: 'learning', rarity: 'rare', xpReward: 200, condition: 'Giải 50 bài tập' },
  { id: 'solve_100', title: 'Bách chiến bách thắng', description: 'Giải được 100 bài tập', icon: '🏆', category: 'learning', rarity: 'epic', xpReward: 500, condition: 'Giải 100 bài tập' },
  { id: 'solve_500', title: 'Huyền thoại giải bài', description: 'Giải được 500 bài tập', icon: '👑', category: 'learning', rarity: 'legendary', xpReward: 2000, condition: 'Giải 500 bài tập' },
  { id: 'first_lesson', title: 'Học sinh mới', description: 'Hoàn thành bài học đầu tiên', icon: '📖', category: 'learning', rarity: 'common', xpReward: 15, condition: 'Hoàn thành 1 bài học' },
  { id: 'complete_10_lessons', title: 'Học trò chăm chỉ', description: 'Hoàn thành 10 bài học', icon: '📚', category: 'learning', rarity: 'common', xpReward: 100, condition: 'Hoàn thành 10 bài học' },
  { id: 'complete_30_lessons', title: 'Nhà nghiên cứu', description: 'Hoàn thành 30 bài học', icon: '🎓', category: 'learning', rarity: 'rare', xpReward: 300, condition: 'Hoàn thành 30 bài học' },

  // Streak category
  { id: 'streak_7', title: 'Tuần lễ rực lửa', description: 'Duy trì streak 7 ngày liên tiếp', icon: '🔥', category: 'streak', rarity: 'common', xpReward: 50, condition: 'Streak 7 ngày' },
  { id: 'streak_14', title: 'Hai tuần bền bỉ', description: 'Duy trì streak 14 ngày liên tiếp', icon: '🔥', category: 'streak', rarity: 'rare', xpReward: 100, condition: 'Streak 14 ngày' },
  { id: 'streak_30', title: 'Tháng không nghỉ', description: 'Duy trì streak 30 ngày liên tiếp', icon: '🌟', category: 'streak', rarity: 'epic', xpReward: 300, condition: 'Streak 30 ngày' },
  { id: 'streak_60', title: 'Chiến binh kiên cường', description: 'Duy trì streak 60 ngày liên tiếp', icon: '⚡', category: 'streak', rarity: 'epic', xpReward: 600, condition: 'Streak 60 ngày' },
  { id: 'streak_100', title: 'Bất khả chiến bại', description: 'Duy trì streak 100 ngày liên tiếp', icon: '💫', category: 'streak', rarity: 'legendary', xpReward: 1500, condition: 'Streak 100 ngày' },
  { id: 'streak_365', title: 'Huyền thoại bất diệt', description: 'Duy trì streak 365 ngày liên tiếp', icon: '🏅', category: 'streak', rarity: 'legendary', xpReward: 5000, condition: 'Streak 365 ngày' },

  // Speed category
  { id: 'speed_demon', title: 'Tốc độ ánh sáng', description: 'Giải bài trong dưới 2 phút', icon: '⚡', category: 'speed', rarity: 'rare', xpReward: 75, condition: 'Giải bài < 2 phút' },
  { id: 'five_in_day', title: 'Ngày năng suất', description: 'Giải 5 bài trong 1 ngày', icon: '🚀', category: 'speed', rarity: 'common', xpReward: 60, condition: 'Giải 5 bài/ngày' },
  { id: 'ten_in_day', title: 'Siêu năng suất', description: 'Giải 10 bài trong 1 ngày', icon: '💥', category: 'speed', rarity: 'rare', xpReward: 150, condition: 'Giải 10 bài/ngày' },
  { id: 'twenty_in_day', title: 'Cỗ máy giải bài', description: 'Giải 20 bài trong 1 ngày', icon: '🤖', category: 'speed', rarity: 'epic', xpReward: 400, condition: 'Giải 20 bài/ngày' },

  // Mastery category
  { id: 'hard_solver', title: 'Thách thức bản thân', description: 'Giải một bài khó (Hard)', icon: '🧠', category: 'mastery', rarity: 'rare', xpReward: 100, condition: 'Giải 1 bài Hard' },
  { id: 'hard_10', title: 'Bộ não siêu việt', description: 'Giải 10 bài khó (Hard)', icon: '🧬', category: 'mastery', rarity: 'epic', xpReward: 500, condition: 'Giải 10 bài Hard' },
  { id: 'no_hints_3', title: 'Tự lực cánh sinh', description: 'Giải 3 bài không dùng gợi ý', icon: '🎖️', category: 'mastery', rarity: 'common', xpReward: 40, condition: 'Giải 3 bài không gợi ý' },
  { id: 'no_hints_10', title: 'Độc lập tư duy', description: 'Giải 10 bài không dùng gợi ý', icon: '🏅', category: 'mastery', rarity: 'rare', xpReward: 150, condition: 'Giải 10 bài không gợi ý' },
  { id: 'xp_1000', title: 'Tích lũy kinh nghiệm', description: 'Đạt 1000 XP tổng cộng', icon: '⭐', category: 'mastery', rarity: 'common', xpReward: 50, condition: 'Đạt 1000 XP' },
  { id: 'xp_5000', title: 'Chiến binh dày dạn', description: 'Đạt 5000 XP tổng cộng', icon: '🌟', category: 'mastery', rarity: 'rare', xpReward: 200, condition: 'Đạt 5000 XP' },
  { id: 'xp_10000', title: 'Bậc thầy kinh nghiệm', description: 'Đạt 10000 XP tổng cộng', icon: '💎', category: 'mastery', rarity: 'epic', xpReward: 500, condition: 'Đạt 10000 XP' },
  { id: 'xp_20000', title: 'Huyền thoại XP', description: 'Đạt 20000 XP tổng cộng', icon: '👑', category: 'mastery', rarity: 'legendary', xpReward: 1000, condition: 'Đạt 20000 XP' },

  // Social/Weekly category
  { id: 'weekly_goal_first', title: 'Mục tiêu tuần đầu', description: 'Hoàn thành mục tiêu tuần lần đầu', icon: '🎯', category: 'social', rarity: 'common', xpReward: 75, condition: 'Hoàn thành 1 mục tiêu tuần' },
  { id: 'weekly_goal_4', title: 'Tháng hoàn hảo', description: 'Hoàn thành mục tiêu tuần 4 lần', icon: '📅', category: 'social', rarity: 'rare', xpReward: 200, condition: 'Hoàn thành 4 mục tiêu tuần' },
  { id: 'weekly_goal_12', title: 'Quý vàng', description: 'Hoàn thành mục tiêu tuần 12 lần', icon: '🏆', category: 'social', rarity: 'epic', xpReward: 600, condition: 'Hoàn thành 12 mục tiêu tuần' },
];


// ============================================================
// Core Functions
// ============================================================

/** Tính level từ XP: level = floor(sqrt(totalXP / 50)) + 1 */
export function getLevel(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

/** Tính XP cần cho level tiếp theo */
export function getXPForLevel(level: number): number {
  return (level - 1) * (level - 1) * 50;
}

/** Tính XP cần cho level tiếp theo từ level hiện tại */
export function getXPToNextLevel(currentXP: number): { current: number; needed: number; progress: number } {
  const currentLevel = getLevel(currentXP);
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  const progress = ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return {
    current: currentXP - currentLevelXP,
    needed: nextLevelXP - currentLevelXP,
    progress: Math.min(100, Math.max(0, progress)),
  };
}

/** Lấy title cho level */
export function getLevelTitle(level: number): string {
  const titles = Object.entries(LEVEL_TITLES)
    .map(([k, v]) => ({ level: parseInt(k), title: v }))
    .sort((a, b) => b.level - a.level);
  for (const t of titles) {
    if (level >= t.level) return t.title;
  }
  return 'Người mới bắt đầu';
}

/** Lấy rank từ XP */
export function getRank(xp: number): RankInfo {
  let rankData = RANK_TIERS[0];
  for (const tier of RANK_TIERS) {
    if (xp >= tier.minXP) {
      rankData = tier;
    }
  }
  const progress = rankData.maxXP === 999999
    ? 100
    : ((xp - rankData.minXP) / (rankData.maxXP - rankData.minXP)) * 100;
  return {
    ...rankData,
    progress: Math.min(100, Math.max(0, progress)),
  };
}

/** Lấy ngày hiện tại dạng YYYY-MM-DD */
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/** Lấy ngày đầu tuần (Thứ Hai) */
function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().split('T')[0];
}


// ============================================================
// State Management
// ============================================================

function getDefaultState(): GamificationState {
  return {
    totalXP: 0,
    level: 1,
    rank: getRank(0),
    streak: {
      current: 0,
      longest: 0,
      lastActivityDate: '',
      milestones: STREAK_MILESTONES.map((m) => ({ days: m.days, reached: false, reward: m.reward })),
    },
    weeklyGoals: {
      problemsTarget: 10,
      problemsDone: 0,
      xpTarget: 200,
      xpEarned: 0,
      weekStart: getWeekStart(),
      completed: false,
    },
    achievements: ALL_ACHIEVEMENTS,
    unlockedAchievements: [],
    activityLog: [],
    problemsSolved: 0,
    lessonsCompleted: 0,
    problemsSolvedToday: 0,
    problemsSolvedWithoutHints: 0,
    fastSolves: 0,
    hardProblemsSolved: 0,
    weeklyGoalsCompleted: 0,
  };
}

/** Load state từ localStorage */
export function getGamificationState(): GamificationState {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultState();

    const state = JSON.parse(stored) as GamificationState;
    // Ensure achievements list is always up to date
    state.achievements = ALL_ACHIEVEMENTS;
    // Recalculate derived values
    state.level = getLevel(state.totalXP);
    state.rank = getRank(state.totalXP);
    return state;
  } catch {
    return getDefaultState();
  }
}

/** Save state vào localStorage */
function saveState(state: GamificationState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Lỗi lưu gamification state:', e);
  }
}

/** Thêm activity log entry */
function addActivity(state: GamificationState, entry: Omit<ActivityEntry, 'timestamp'>): void {
  state.activityLog.unshift({
    ...entry,
    timestamp: new Date().toISOString(),
  });
  // Giữ tối đa 100 entries
  if (state.activityLog.length > 100) {
    state.activityLog = state.activityLog.slice(0, 100);
  }
}


// ============================================================
// Public API
// ============================================================

/** Thêm XP, kiểm tra level up và achievements */
export function addXP(amount: number, source: string): { leveledUp: boolean; newLevel: number; newAchievements: Achievement[] } {
  const state = getGamificationState();
  const oldLevel = state.level;

  state.totalXP += amount;
  state.level = getLevel(state.totalXP);
  state.rank = getRank(state.totalXP);

  // Update weekly XP
  const currentWeekStart = getWeekStart();
  if (state.weeklyGoals.weekStart !== currentWeekStart) {
    resetWeeklyGoals();
  }
  state.weeklyGoals.xpEarned += amount;

  addActivity(state, {
    type: 'xp_earned',
    description: `+${amount} XP: ${source}`,
    xp: amount,
  });

  const leveledUp = state.level > oldLevel;

  saveState(state);

  // Check achievements after saving
  const newAchievements = checkAchievements();

  return { leveledUp, newLevel: state.level, newAchievements };
}

/** Ghi nhận giải bài tập */
export function recordProblemSolved(problemId: number, difficulty: string, usedHints: boolean = false, solveTimeSeconds: number = 999): void {
  const state = getGamificationState();
  const today = getToday();

  state.problemsSolved += 1;

  // Track daily problems
  if (state.streak.lastActivityDate === today) {
    state.problemsSolvedToday += 1;
  } else {
    state.problemsSolvedToday = 1;
  }

  // Track hints
  if (!usedHints) {
    state.problemsSolvedWithoutHints += 1;
  }

  // Track fast solves (< 2 minutes)
  if (solveTimeSeconds < 120) {
    state.fastSolves += 1;
  }

  // Track hard problems
  if (difficulty.toLowerCase() === 'hard' || difficulty.toLowerCase() === 'khó') {
    state.hardProblemsSolved += 1;
  }

  // Update weekly goals
  const currentWeekStart = getWeekStart();
  if (state.weeklyGoals.weekStart !== currentWeekStart) {
    // New week, reset
    state.weeklyGoals = {
      problemsTarget: 10,
      problemsDone: 0,
      xpTarget: 200,
      xpEarned: 0,
      weekStart: currentWeekStart,
      completed: false,
    };
  }
  state.weeklyGoals.problemsDone += 1;

  // Check weekly goal completion
  if (!state.weeklyGoals.completed &&
      state.weeklyGoals.problemsDone >= state.weeklyGoals.problemsTarget &&
      state.weeklyGoals.xpEarned >= state.weeklyGoals.xpTarget) {
    state.weeklyGoals.completed = true;
    state.weeklyGoalsCompleted += 1;
    addActivity(state, {
      type: 'xp_earned',
      description: 'Hoàn thành mục tiêu tuần! +100 XP thưởng',
      xp: 100,
    });
    state.totalXP += 100;
  }

  // Calculate XP based on difficulty
  let xpEarned = 10;
  switch (difficulty.toLowerCase()) {
    case 'easy':
    case 'dễ':
      xpEarned = 10;
      break;
    case 'medium':
    case 'trung bình':
      xpEarned = 25;
      break;
    case 'hard':
    case 'khó':
      xpEarned = 50;
      break;
  }

  // Streak bonus
  const streakBonus = Math.min(state.streak.current * 10, 100);
  xpEarned += streakBonus;

  state.totalXP += xpEarned;
  state.weeklyGoals.xpEarned += xpEarned;
  state.level = getLevel(state.totalXP);
  state.rank = getRank(state.totalXP);

  addActivity(state, {
    type: 'problem_solved',
    description: `Giải bài #${problemId} (${difficulty})${streakBonus > 0 ? ` +${streakBonus} streak bonus` : ''}`,
    xp: xpEarned,
  });

  // Update streak
  if (state.streak.lastActivityDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (state.streak.lastActivityDate === yesterdayStr) {
      state.streak.current += 1;
    } else if (state.streak.lastActivityDate === '') {
      state.streak.current = 1;
    } else {
      state.streak.current = 1;
    }

    state.streak.lastActivityDate = today;
    if (state.streak.current > state.streak.longest) {
      state.streak.longest = state.streak.current;
    }

    // Check streak milestones
    state.streak.milestones = state.streak.milestones.map((m) => {
      if (!m.reached && state.streak.current >= m.days) {
        state.totalXP += m.reward;
        addActivity(state, {
          type: 'streak_maintained',
          description: `Đạt mốc streak ${m.days} ngày! +${m.reward} XP`,
          xp: m.reward,
        });
        return { ...m, reached: true };
      }
      return m;
    });
  }

  saveState(state);
  checkAchievements();
}

/** Ghi nhận hoàn thành bài học */
export function recordLessonCompleted(lessonId: number): void {
  const state = getGamificationState();

  state.lessonsCompleted += 1;
  const xpEarned = 15;
  state.totalXP += xpEarned;
  state.weeklyGoals.xpEarned += xpEarned;
  state.level = getLevel(state.totalXP);
  state.rank = getRank(state.totalXP);

  addActivity(state, {
    type: 'lesson_completed',
    description: `Hoàn thành bài học #${lessonId}`,
    xp: xpEarned,
  });

  saveState(state);
  checkAchievements();
}


/** Kiểm tra streak khi load trang */
export function checkStreak(): void {
  const state = getGamificationState();
  const today = getToday();

  if (state.streak.lastActivityDate === today) {
    // Already active today
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (state.streak.lastActivityDate !== yesterdayStr && state.streak.lastActivityDate !== '') {
    // Streak broken
    if (state.streak.current > 0) {
      state.streak.current = 0;
      state.problemsSolvedToday = 0;
      addActivity(state, {
        type: 'streak_maintained',
        description: 'Streak bị mất! Hãy giải bài hôm nay để bắt đầu lại.',
        xp: 0,
      });
    }
  }

  saveState(state);
}

/** Lấy tiến độ tuần */
export function getWeeklyProgress(): WeeklyGoalInfo {
  const state = getGamificationState();
  const currentWeekStart = getWeekStart();

  if (state.weeklyGoals.weekStart !== currentWeekStart) {
    resetWeeklyGoals();
    return getGamificationState().weeklyGoals;
  }

  return state.weeklyGoals;
}

/** Reset mục tiêu tuần (tự động vào thứ Hai) */
export function resetWeeklyGoals(): void {
  const state = getGamificationState();
  state.weeklyGoals = {
    problemsTarget: 10,
    problemsDone: 0,
    xpTarget: 200,
    xpEarned: 0,
    weekStart: getWeekStart(),
    completed: false,
  };
  saveState(state);
}

/** Kiểm tra và mở khóa achievements mới */
export function checkAchievements(): Achievement[] {
  const state = getGamificationState();
  const newlyUnlocked: Achievement[] = [];

  for (const achievement of ALL_ACHIEVEMENTS) {
    if (state.unlockedAchievements.includes(achievement.id)) continue;

    let unlocked = false;

    switch (achievement.id) {
      case 'first_problem': unlocked = state.problemsSolved >= 1; break;
      case 'solve_10': unlocked = state.problemsSolved >= 10; break;
      case 'solve_50': unlocked = state.problemsSolved >= 50; break;
      case 'solve_100': unlocked = state.problemsSolved >= 100; break;
      case 'solve_500': unlocked = state.problemsSolved >= 500; break;
      case 'first_lesson': unlocked = state.lessonsCompleted >= 1; break;
      case 'complete_10_lessons': unlocked = state.lessonsCompleted >= 10; break;
      case 'complete_30_lessons': unlocked = state.lessonsCompleted >= 30; break;
      case 'streak_7': unlocked = state.streak.longest >= 7; break;
      case 'streak_14': unlocked = state.streak.longest >= 14; break;
      case 'streak_30': unlocked = state.streak.longest >= 30; break;
      case 'streak_60': unlocked = state.streak.longest >= 60; break;
      case 'streak_100': unlocked = state.streak.longest >= 100; break;
      case 'streak_365': unlocked = state.streak.longest >= 365; break;
      case 'speed_demon': unlocked = state.fastSolves >= 1; break;
      case 'five_in_day': unlocked = state.problemsSolvedToday >= 5; break;
      case 'ten_in_day': unlocked = state.problemsSolvedToday >= 10; break;
      case 'twenty_in_day': unlocked = state.problemsSolvedToday >= 20; break;
      case 'hard_solver': unlocked = state.hardProblemsSolved >= 1; break;
      case 'hard_10': unlocked = state.hardProblemsSolved >= 10; break;
      case 'no_hints_3': unlocked = state.problemsSolvedWithoutHints >= 3; break;
      case 'no_hints_10': unlocked = state.problemsSolvedWithoutHints >= 10; break;
      case 'xp_1000': unlocked = state.totalXP >= 1000; break;
      case 'xp_5000': unlocked = state.totalXP >= 5000; break;
      case 'xp_10000': unlocked = state.totalXP >= 10000; break;
      case 'xp_20000': unlocked = state.totalXP >= 20000; break;
      case 'weekly_goal_first': unlocked = state.weeklyGoalsCompleted >= 1; break;
      case 'weekly_goal_4': unlocked = state.weeklyGoalsCompleted >= 4; break;
      case 'weekly_goal_12': unlocked = state.weeklyGoalsCompleted >= 12; break;
    }

    if (unlocked) {
      state.unlockedAchievements.push(achievement.id);
      state.totalXP += achievement.xpReward;
      newlyUnlocked.push(achievement);

      addActivity(state, {
        type: 'achievement_unlocked',
        description: `Mở khóa thành tựu: ${achievement.title} (+${achievement.xpReward} XP)`,
        xp: achievement.xpReward,
      });
    }
  }

  if (newlyUnlocked.length > 0) {
    state.level = getLevel(state.totalXP);
    state.rank = getRank(state.totalXP);
    saveState(state);
  }

  return newlyUnlocked;
}

/** Export constants for use in UI */
export { ALL_ACHIEVEMENTS, RANK_TIERS, STREAK_MILESTONES, LEVEL_TITLES };
