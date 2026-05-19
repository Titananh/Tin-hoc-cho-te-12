import { LESSONS as REAL_LESSONS, type LessonContent } from './lesson-content';

export const DEV_LEVELS = [
  { id: 1, title: 'Cấp 1: Giới thiệu Python', order_index: 1, description: 'Làm quen với Python, biến, kiểu dữ liệu cơ bản', is_published: true, color: '#3B82F6', icon: '🐍' },
  { id: 2, title: 'Cấp 2: Biểu thức và toán tử', order_index: 2, description: 'Toán tử số học, so sánh, logic', is_published: true, color: '#8B5CF6', icon: '➕' },
  { id: 3, title: 'Cấp 3: Câu lệnh điều kiện', order_index: 3, description: 'if, elif, else và rẽ nhánh', is_published: true, color: '#06B6D4', icon: '🔀' },
  { id: 4, title: 'Cấp 4: Vòng lặp', order_index: 4, description: 'for, while và lặp có điều kiện', is_published: true, color: '#10B981', icon: '🔁' },
  { id: 5, title: 'Cấp 5: Hàm trong Python', order_index: 5, description: 'Định nghĩa hàm, tham số, return', is_published: true, color: '#F59E0B', icon: '🔧' },
  { id: 6, title: 'Cấp 6: Danh sách và Tuple', order_index: 6, description: 'List, tuple, slicing, comprehension', is_published: true, color: '#EF4444', icon: '📋' },
  { id: 7, title: 'Cấp 7: Chuỗi ký tự', order_index: 7, description: 'String, format, xử lý văn bản', is_published: true, color: '#EC4899', icon: '📝' },
  { id: 8, title: 'Cấp 8: Từ điển và Tập hợp', order_index: 8, description: 'Dict, set, ánh xạ key-value', is_published: true, color: '#14B8A6', icon: '📚' },
  { id: 9, title: 'Cấp 9: Tệp tin', order_index: 9, description: 'Đọc, ghi tệp văn bản và CSV', is_published: true, color: '#F97316', icon: '📁' },
  { id: 10, title: 'Cấp 10: Thuật toán', order_index: 10, description: 'Sắp xếp, tìm kiếm, đệ quy', is_published: true, color: '#6366F1', icon: '🧠' },
];

export const DEV_LESSONS_PER_LEVEL = 5;
export const DEV_EXERCISES_PER_LESSON = 3;

export interface DevLesson {
  id: number;
  module_id: number;
  course_id: number;
  title: string;
  slug: string;
  order_index: number;
  content: string;
  is_published: boolean;
  duration_minutes: number;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_minutes: number;
  xp_reward: number;
}

export interface DevExercise {
  id: number;
  lesson_id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starter_code: string;
  test_cases: Array<{ input: string; expected_output: string; is_hidden: boolean }>;
  hints: string[];
  is_published: boolean;
  order_index: number;
}

// Build all lessons and exercises deterministically from real lesson content
export const DEV_LESSONS: DevLesson[] = REAL_LESSONS.map((l: LessonContent) => ({
  id: l.id,
  module_id: l.module_id,
  course_id: l.course_id,
  title: l.title,
  slug: l.slug,
  order_index: l.order_index,
  content: l.content,
  is_published: l.is_published,
  duration_minutes: l.estimated_minutes,
  description: l.description,
  difficulty: l.difficulty,
  estimated_minutes: l.estimated_minutes,
  xp_reward: l.xp_reward,
}));

import { EXERCISES as REAL_EXERCISES_P1 } from './exercise-content';
import { EXERCISES_PART2 as REAL_EXERCISES_P2 } from './exercise-content-part2';

const ALL_REAL_EXERCISES = [...REAL_EXERCISES_P1, ...REAL_EXERCISES_P2];

export const DEV_EXERCISES: DevExercise[] = ALL_REAL_EXERCISES.map((ex) => ({
  id: ex.id,
  lesson_id: ex.lesson_id,
  title: ex.title,
  description: ex.description,
  difficulty: ex.difficulty,
  starter_code: ex.starter_code,
  test_cases: ex.test_cases,
  hints: ex.hints,
  is_published: true,
  order_index: ex.order_index,
}));

export const DEV_BADGES = [
  { id: 1, name: 'Người mới bắt đầu', slug: 'beginner', description: 'Hoàn thành bài học đầu tiên', icon: '🌱', color: '#10B981', rarity: 'common', criteria: { type: 'lessons_completed', value: 1 } },
  { id: 2, name: 'Học viên chăm chỉ', slug: 'diligent', description: 'Streak 7 ngày liên tiếp', icon: '🔥', color: '#F59E0B', rarity: 'rare', criteria: { type: 'streak', value: 7 } },
  { id: 3, name: 'Lập trình viên', slug: 'coder', description: 'Giải 50 bài tập', icon: '💻', color: '#3B82F6', rarity: 'rare', criteria: { type: 'exercises_solved', value: 50 } },
  { id: 4, name: 'Bậc thầy XP', slug: 'xp-master', description: 'Đạt 1000 XP', icon: '⭐', color: '#8B5CF6', rarity: 'epic', criteria: { type: 'xp_total', value: 1000 } },
  { id: 5, name: 'Pythonista', slug: 'pythonista', description: 'Hoàn thành 10 cấp độ', icon: '🐍', color: '#EC4899', rarity: 'legendary', criteria: { type: 'levels_completed', value: 10 } },
];

export const DEV_PROJECTS = [
  { id: 1, title: 'Máy tính đơn giản', slug: 'simple-calculator', description: 'Xây dựng máy tính cộng trừ nhân chia', difficulty: 'easy', xp_reward: 100, required_level: 1, is_published: true, estimated_hours: 2, checklist: [{ task: 'Nhập 2 số' }, { task: 'Thực hiện phép tính' }, { task: 'Hiển thị kết quả' }] },
  { id: 2, title: 'Trò chơi đoán số', slug: 'guess-number', description: 'Game đoán số ngẫu nhiên', difficulty: 'easy', xp_reward: 150, required_level: 2, is_published: true, estimated_hours: 3, checklist: [{ task: 'Sinh số ngẫu nhiên' }, { task: 'Vòng lặp đoán' }, { task: 'Thông báo kết quả' }] },
  { id: 3, title: 'Quản lý sổ liên lạc', slug: 'contact-manager', description: 'Quản lý danh bạ với file CSV', difficulty: 'medium', xp_reward: 250, required_level: 5, is_published: true, estimated_hours: 6, checklist: [{ task: 'Đọc/ghi CSV' }, { task: 'Tìm kiếm liên hệ' }, { task: 'Sửa/xoá liên hệ' }] },
  { id: 4, title: 'Phân tích điểm thi', slug: 'exam-analyzer', description: 'Phân tích bảng điểm và xuất báo cáo', difficulty: 'medium', xp_reward: 300, required_level: 6, is_published: true, estimated_hours: 5, checklist: [{ task: 'Đọc dữ liệu điểm' }, { task: 'Tính trung bình' }, { task: 'Xuất báo cáo' }] },
  { id: 5, title: 'AI dự đoán điểm', slug: 'ai-grade-predictor', description: 'Mini ML dự đoán điểm thi', difficulty: 'hard', xp_reward: 500, required_level: 9, is_published: true, estimated_hours: 10, checklist: [{ task: 'Chuẩn bị dữ liệu' }, { task: 'Huấn luyện mô hình' }, { task: 'Dự đoán & đánh giá' }] },
];

export const DEV_FLASHCARDS = [
  { id: 1, term: 'print()', definition: 'Hàm in giá trị ra màn hình', category: 'Hàm built-in', difficulty: 'easy' },
  { id: 2, term: 'input()', definition: 'Hàm nhận dữ liệu từ bàn phím', category: 'Hàm built-in', difficulty: 'easy' },
  { id: 3, term: 'len()', definition: 'Trả về độ dài của chuỗi/danh sách', category: 'Hàm built-in', difficulty: 'easy' },
  { id: 4, term: 'list comprehension', definition: 'Cú pháp tạo danh sách ngắn gọn: [x for x in iterable]', category: 'Cú pháp', difficulty: 'medium' },
  { id: 5, term: 'dict', definition: 'Kiểu dữ liệu lưu cặp key-value', category: 'Kiểu dữ liệu', difficulty: 'easy' },
];

/**
 * Generate empty dashboard data for a fresh dev user.
 */
export function getDevDashboardData(userId: string, name: string) {
  const today = new Date();
  const buildDays = (n: number) => {
    const arr: { date: string; active: boolean; xp: number }[] = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      arr.push({
        date: d.toISOString().split('T')[0],
        active: false,
        xp: 0,
      });
    }
    return arr;
  };

  const calendar = buildDays(30).map((d) => ({ date: d.date, active: d.active }));
  const xpPerDay = buildDays(7).map((d) => ({ date: d.date, xp: d.xp }));

  return {
    user: {
      id: userId,
      name,
      avatarUrl: null,
      level: 1,
      totalXp: 0,
      currentStreak: 0,
      longestStreak: 0,
    },
    progressOverview: DEV_LEVELS.map((level) => ({
      courseId: level.id,
      courseTitle: level.title,
      orderIndex: level.order_index,
      totalExercises: DEV_LESSONS_PER_LEVEL * DEV_EXERCISES_PER_LESSON,
      completedExercises: 0,
      progressPercentage: 0,
    })),
    nextRecommended: {
      type: 'lesson' as const,
      id: 1,
      title: DEV_LESSONS[0].title,
    },
    recentBadges: [],
    incompleteExercises: DEV_EXERCISES.slice(0, 20).map((ex) => {
      const lesson = DEV_LESSONS.find((l) => l.id === ex.lesson_id)!;
      return {
        exerciseId: ex.id,
        lessonId: ex.lesson_id,
        courseOrderIndex: lesson.course_id,
        moduleOrderIndex: lesson.order_index,
      };
    }),
    learningCalendar: calendar,
    xpPerDay,
    dailyGoals: {
      exercisesCompleted: 0,
      exercisesTarget: 3,
      xpEarned: 0,
      xpTarget: 50,
    },
    flashcardsDueToday: DEV_FLASHCARDS.length,
  };
}
