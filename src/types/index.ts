// =====================================================================
// Tin học 12 Cánh Diều — TypeScript types
// =====================================================================

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

// ---------------------------------------------------------------------
// Course / Module / Lesson — giữ nguyên schema cũ để không phá UI
// ---------------------------------------------------------------------

export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

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
  difficulty: Exclude<Difficulty, 'extreme'>;
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

// ---------------------------------------------------------------------
// Quiz
// ---------------------------------------------------------------------

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Index của đáp án đúng. Hỗ trợ legacy `correct_index` (single). */
  correct_index: number;
  /**
   * Nếu là câu nhiều đáp án đúng (chọn nhiều), liệt kê index ở đây.
   * Khi field này có thì UI sẽ render dạng checkbox.
   */
  correct_indexes?: number[];
  explanation: string;
  /** Mức Bloom: nhận biết / thông hiểu / vận dụng / vận dụng cao */
  bloom_level?: 'recall' | 'understand' | 'apply' | 'analyze';
  /** Tag chủ đề SGK Cánh Diều, ví dụ 'D' hoặc 'E'. */
  topic_code?: TopicCode;
}

// ---------------------------------------------------------------------
// Exercise
// ---------------------------------------------------------------------

export type ExerciseLanguage = 'python' | 'sql' | 'html' | 'pseudocode';

export interface Exercise {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  /** Ngôn ngữ thực hành. Mặc định 'python'. */
  language?: ExerciseLanguage;
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
  status: 'pending' | 'accepted' | 'wrong' | 'error' | 'unsupported';
  runtime: number;
  score: number;
  created_at: string;
}

// ---------------------------------------------------------------------
// Topic — bám 7 chủ đề SGK Cánh Diều A → G
// ---------------------------------------------------------------------

export type TopicCode =
  | 'A'      // Máy tính và xã hội tri thức
  | 'B'      // Mạng máy tính và Internet
  | 'C'      // Đạo đức, pháp luật, văn hoá môi trường số
  | 'D'      // Ứng dụng tin học (CSDL & SQL)
  | 'E'      // Giải quyết vấn đề với máy tính (Python, thuật toán)
  | 'F'      // Hướng nghiệp với Tin học
  | 'G_CS'   // Định hướng Khoa học máy tính
  | 'G_TUD'; // Định hướng Tin học ứng dụng

export interface Topic {
  /** Mã định danh trong URL: 'A', 'B', ..., 'G_CS', 'G_TUD'. */
  id: TopicCode;
  /** Số thứ tự sắp xếp menu (1..n). */
  order_index: number;
  /** Tên chủ đề theo SGK. */
  title: string;
  /** Mô tả ngắn 1‑2 câu. */
  description: string;
  /** Emoji hoặc tên Lucide icon. */
  icon: string;
  /** HEX màu chủ đạo. */
  color: string;
  /** Tỷ trọng đề thi: 1 (ít) → 4 (rất nhiều). */
  exam_weight: 1 | 2 | 3 | 4;
  /** Yêu cầu cần đạt theo SGK Cánh Diều. */
  outcomes: string[];
  /** Danh sách bài học (tái dùng schema Lesson). */
  lessons: Lesson[];
}

// ---------------------------------------------------------------------
// Đề thi minh hoạ tốt nghiệp THPT
// ---------------------------------------------------------------------

export interface ExamSet {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Phút làm bài, mặc định 50. */
  duration_minutes: number;
  /** Điểm đạt, mặc định 50%. */
  passing_score: number;
  /** Nguồn ra đề: "Bộ GD&ĐT 2024", "Đề tự soạn 2025", ... */
  source: string;
  /** Mã các chủ đề được phủ. */
  topics: TopicCode[];
  /** Danh sách câu hỏi. */
  questions: QuizQuestion[];
}

// ---------------------------------------------------------------------
// Badge / Progress / XP / Notifications / Flashcard
// ---------------------------------------------------------------------

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
  /** Khi assistant trả lời, ghi chủ đề liên quan để FE link sang. */
  topic_code?: TopicCode;
  /** Nếu có thể, kèm slug bài học gợi ý. */
  related_lesson_slug?: string;
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
  difficulty: Exclude<Difficulty, 'extreme'>;
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
  /** Thông tin tiến độ theo từng chủ đề SGK. */
  topic_progress?: { topic_code: TopicCode; completed: number; total: number }[];
}
