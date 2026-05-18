/**
 * Constants
 * Application-wide constants for Python Master 12
 */

/**
 * Array of 10 level names for the gamification system
 */
export const LEVEL_NAMES: string[] = [
  'Tân Binh',      // Level 1 - Beginner
  'Người Tập Sự',  // Level 2 - Apprentice
  'Học Viên',      // Level 3 - Learner
  'Thợ Code',      // Level 4 - Coder
  'Lập Trình Viên', // Level 5 - Programmer
  'Kỹ Sư',         // Level 6 - Engineer
  'Chuyên Gia',    // Level 7 - Expert
  'Bậc Thầy',      // Level 8 - Master
  'Đại Sư',        // Level 9 - Grandmaster
  'Huyền Thoại',   // Level 10 - Legend
];

/**
 * Object mapping difficulty levels to their corresponding colors
 */
export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#22c55e',     // Green
  medium: '#eab308',    // Yellow
  hard: '#f97316',      // Orange
  expert: '#ef4444',    // Red
};

/**
 * Amount of XP required to complete each level
 */
export const XP_PER_LEVEL: number = 500;

/**
 * Bonus XP awarded for maintaining a streak
 */
export const STREAK_BONUS_XP: number = 10;

/**
 * XP awarded for completing a lesson
 */
export const LESSON_COMPLETE_XP: number = 50;

/**
 * XP awarded for completing an exercise
 */
export const EXERCISE_COMPLETE_XP: number = 100;