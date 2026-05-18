export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: 'student' | 'admin';
  xp: number;
  level: number;
  streak_count: number;
  created_at: string;
  last_active: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  is_published: boolean;
  modules: Module[];
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  description: string;
  content: LessonContent;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_minutes: number;
  order_index: number;
  xp_reward: number;
  is_published: boolean;
}

export interface LessonContent {
  objectives: string[];
  theory: string;
  examples: CodeExample[];
  video_url?: string;
  quiz: QuizQuestion[];
  exercises: Exercise[];
}

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
  output?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  starter_code: string;
  solution_code: string;
  hints: string[];
  xp_reward: number;
  test_cases: TestCase[];
}

export interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface Submission {
  id: string;
  user_id: string;
  exercise_id: string;
  code: string;
  status: 'pending' | 'accepted' | 'wrong' | 'error';
  runtime: number;
  score: number;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  xp_reward: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  completed_at: string | null;
  time_spent: number;
  score: number;
}

export interface XPLog {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  created_at: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: 'achievement' | 'reminder' | 'streak' | 'info';
  is_read: boolean;
  created_at: string;
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface DashboardData {
  user: User;
  recent_lessons: Lesson[];
  suggested_lesson: Lesson | null;
  weekly_progress: { day: string; xp: number }[];
  badges: Badge[];
  current_streak: number;
  total_xp: number;
  completed_lessons: number;
  total_lessons: number;
}