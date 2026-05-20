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
  // ─── Dự án mới bổ sung ───
  { id: 6, title: 'Ứng dụng To-Do List', slug: 'todo-app', description: 'Xây dựng ứng dụng quản lý công việc với thêm/xóa/đánh dấu hoàn thành', difficulty: 'easy', xp_reward: 120, required_level: 2, is_published: true, estimated_hours: 3, checklist: [{ task: 'Thêm công việc mới' }, { task: 'Hiển thị danh sách' }, { task: 'Đánh dấu hoàn thành' }, { task: 'Xóa công việc' }] },
  { id: 7, title: 'Bộ chuyển đổi đơn vị', slug: 'unit-converter', description: 'Chuyển đổi giữa các đơn vị đo lường: nhiệt độ, chiều dài, khối lượng', difficulty: 'easy', xp_reward: 100, required_level: 1, is_published: true, estimated_hours: 2, checklist: [{ task: 'Menu chọn loại đơn vị' }, { task: 'Nhập giá trị' }, { task: 'Tính và hiển thị kết quả' }] },
  { id: 8, title: 'Trò chơi Oẳn Tù Tì', slug: 'rock-paper-scissors', description: 'Game kéo búa bao với máy tính, đếm điểm qua nhiều lượt', difficulty: 'easy', xp_reward: 130, required_level: 2, is_published: true, estimated_hours: 3, checklist: [{ task: 'Nhập lựa chọn người chơi' }, { task: 'Máy chọn ngẫu nhiên' }, { task: 'So sánh kết quả' }, { task: 'Đếm điểm nhiều lượt' }] },
  { id: 9, title: 'Mã hóa Caesar Cipher', slug: 'caesar-cipher', description: 'Mã hóa và giải mã văn bản bằng thuật toán Caesar', difficulty: 'easy', xp_reward: 140, required_level: 3, is_published: true, estimated_hours: 3, checklist: [{ task: 'Nhập văn bản và khóa' }, { task: 'Mã hóa ký tự' }, { task: 'Giải mã ngược lại' }, { task: 'Xử lý ký tự đặc biệt' }] },
  { id: 10, title: 'Quản lý chi tiêu cá nhân', slug: 'expense-tracker', description: 'Ghi chép thu chi, phân loại và tính tổng theo tháng', difficulty: 'medium', xp_reward: 280, required_level: 5, is_published: true, estimated_hours: 6, checklist: [{ task: 'Thêm khoản thu/chi' }, { task: 'Phân loại (ăn uống, học tập...)' }, { task: 'Tính tổng theo tháng' }, { task: 'Lưu vào file' }] },
  { id: 11, title: 'Trắc nghiệm Quiz App', slug: 'quiz-app', description: 'Ứng dụng trắc nghiệm với ngân hàng câu hỏi, tính điểm và xếp hạng', difficulty: 'medium', xp_reward: 260, required_level: 4, is_published: true, estimated_hours: 5, checklist: [{ task: 'Tạo ngân hàng câu hỏi' }, { task: 'Hiển thị câu hỏi ngẫu nhiên' }, { task: 'Kiểm tra đáp án' }, { task: 'Tính điểm và xếp hạng' }] },
  { id: 12, title: 'Trò chơi Hangman', slug: 'hangman-game', description: 'Game đoán từ cổ điển với giao diện text-based', difficulty: 'medium', xp_reward: 250, required_level: 4, is_published: true, estimated_hours: 5, checklist: [{ task: 'Chọn từ ngẫu nhiên' }, { task: 'Hiển thị từ ẩn' }, { task: 'Xử lý đoán ký tự' }, { task: 'Đếm số lần sai' }, { task: 'Vẽ hình người' }] },
  { id: 13, title: 'Hệ thống quản lý thư viện', slug: 'library-system', description: 'Quản lý sách: thêm, tìm kiếm, mượn/trả với file JSON', difficulty: 'medium', xp_reward: 320, required_level: 6, is_published: true, estimated_hours: 7, checklist: [{ task: 'Thêm/xóa sách' }, { task: 'Tìm kiếm theo tên/tác giả' }, { task: 'Mượn/trả sách' }, { task: 'Lưu dữ liệu JSON' }, { task: 'Báo cáo thống kê' }] },
  { id: 14, title: 'Web Scraper đơn giản', slug: 'web-scraper', description: 'Thu thập dữ liệu từ trang web và lưu vào CSV', difficulty: 'medium', xp_reward: 300, required_level: 7, is_published: true, estimated_hours: 6, checklist: [{ task: 'Gửi HTTP request' }, { task: 'Parse HTML' }, { task: 'Trích xuất dữ liệu' }, { task: 'Lưu vào CSV' }] },
  { id: 15, title: 'Chatbot hỏi đáp', slug: 'chatbot-qa', description: 'Chatbot trả lời câu hỏi dựa trên từ khóa và pattern matching', difficulty: 'medium', xp_reward: 280, required_level: 6, is_published: true, estimated_hours: 6, checklist: [{ task: 'Định nghĩa patterns' }, { task: 'Nhận input người dùng' }, { task: 'Matching và trả lời' }, { task: 'Xử lý câu không hiểu' }] },
  { id: 16, title: 'Trò chơi Tic-Tac-Toe', slug: 'tic-tac-toe', description: 'Game cờ caro 3x3 chơi với máy tính (AI minimax)', difficulty: 'hard', xp_reward: 450, required_level: 8, is_published: true, estimated_hours: 8, checklist: [{ task: 'Vẽ bàn cờ' }, { task: 'Xử lý lượt chơi' }, { task: 'Kiểm tra thắng/thua' }, { task: 'AI minimax' }, { task: 'Chế độ 2 người' }] },
  { id: 17, title: 'Phân tích dữ liệu COVID', slug: 'covid-data-analysis', description: 'Đọc dữ liệu CSV, vẽ biểu đồ thống kê ca nhiễm theo ngày', difficulty: 'hard', xp_reward: 480, required_level: 9, is_published: true, estimated_hours: 9, checklist: [{ task: 'Đọc file CSV' }, { task: 'Xử lý dữ liệu thiếu' }, { task: 'Tính thống kê' }, { task: 'Vẽ biểu đồ' }, { task: 'Xuất báo cáo' }] },
  { id: 18, title: 'Hệ thống mã hóa RSA', slug: 'rsa-encryption', description: 'Triển khai thuật toán mã hóa RSA từ đầu', difficulty: 'hard', xp_reward: 550, required_level: 10, is_published: true, estimated_hours: 10, checklist: [{ task: 'Sinh số nguyên tố' }, { task: 'Tính khóa public/private' }, { task: 'Mã hóa message' }, { task: 'Giải mã message' }, { task: 'Demo end-to-end' }] },
  { id: 19, title: 'Game Snake (Rắn săn mồi)', slug: 'snake-game', description: 'Trò chơi rắn săn mồi text-based với điều khiển bàn phím', difficulty: 'hard', xp_reward: 500, required_level: 8, is_published: true, estimated_hours: 9, checklist: [{ task: 'Vẽ bản đồ' }, { task: 'Di chuyển rắn' }, { task: 'Sinh thức ăn' }, { task: 'Phát hiện va chạm' }, { task: 'Tính điểm' }] },
  { id: 20, title: 'Hệ thống đề xuất phim', slug: 'movie-recommender', description: 'Đề xuất phim dựa trên sở thích người dùng (collaborative filtering)', difficulty: 'hard', xp_reward: 600, required_level: 10, is_published: true, estimated_hours: 12, checklist: [{ task: 'Đọc dataset phim' }, { task: 'Tính similarity' }, { task: 'Đề xuất top-N' }, { task: 'Đánh giá accuracy' }, { task: 'Giao diện người dùng' }] },
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
    incompleteExercises: [],
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
