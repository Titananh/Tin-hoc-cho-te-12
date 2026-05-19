-- Migration 003: Seed initial data for Python Master 12
-- Database: PostgreSQL (Supabase)

-- ============================================
-- 1. Admin User
-- ============================================
INSERT INTO users (name, email, role, xp, level, streak_count, created_at, updated_at, last_active)
VALUES (
  'Admin',
  'admin@pythonmaster12.com',
  'admin',
  0,
  1,
  0,
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 2. Sample Courses
-- ============================================
INSERT INTO courses (title, slug, description, icon, color, order_index, is_published, created_at)
VALUES
  ('Python Basics', 'python-basics', 'Introduction to Python programming', '🐍', '#3776AB', 1, TRUE, NOW()),
  ('Data Structures', 'data-structures', 'Lists, dictionaries, sets, and more', '📦', '#FDD835', 2, TRUE, NOW()),
  ('Object-Oriented Programming', 'oop', 'Classes, inheritance, and polymorphism', '🏗️', '#E91E63', 3, TRUE, NOW()),
  ('Web Development', 'web-dev', 'Flask, Django, and web basics', '🌐', '#4CAF50', 4, TRUE, NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. Sample Badges
-- ============================================
INSERT INTO badges (name, slug, description, icon, color, requirement, xp_reward, created_at)
VALUES
  ('First Steps', 'first-steps', 'Complete your first lesson', '🎓', '#3B82F6', 'lesson_count:1', 10, NOW()),
  ('Streak Starter', 'streak-starter', 'Maintain a 3-day streak', '🔥', '#EF4444', 'streak:3', 25, NOW()),
  ('Code Warrior', 'code-warrior', 'Submit 10 exercises', '⚔️', '#8B5CF6', 'submissions:10', 50, NOW()),
  ('Python Master', 'python-master', 'Complete all courses', '🐍', '#F59E0B', 'courses_completed:all', 500, NOW()),
  ('Speed Demon', 'speed-demon', 'Complete 5 exercises in one day', '⚡', '#06B6D4', 'daily_exercises:5', 75, NOW()),
  ('Perfect Score', 'perfect-score', 'Get 100% on any exercise', '💯', '#22C55E', 'perfect_score:1', 30, NOW()),
  ('Night Owl', 'night-owl', 'Study after midnight', '🦉', '#6366F1', 'late_night_study:1', 20, NOW()),
  ('Helping Hand', 'helping-hand', 'Share a code snippet', '🤝', '#10B981', 'share_snippet:1', 15, NOW()),
  ('Bug Hunter', 'bug-hunter', 'Fix 10 code errors', '🐛', '#F97316', 'fix_errors:10', 100, NOW()),
  ('Marathon Runner', 'marathon-runner', 'Study for 7 consecutive days', '🏃', '#EC4899', 'streak:7', 150, NOW()),
  ('Scholar', 'scholar', 'Complete 25 lessons', '📖', '#14B8A6', 'lesson_count:25', 200, NOW()),
  ('Grandmaster', 'grandmaster', 'Reach level 10', '👑', '#A855F7', 'reach_level:10', 1000, NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. Default Flashcard Categories (sample cards)
-- ============================================

-- python-basics category
INSERT INTO flashcards (term, definition, category, difficulty, created_at)
VALUES
  ('print()', 'Hàm dùng để in giá trị ra màn hình console. Ví dụ: print("Hello World")', 'python-basics', 'beginner', NOW()),
  ('input()', 'Hàm dùng để nhận dữ liệu từ bàn phím. Trả về kiểu string. Ví dụ: name = input("Nhập tên: ")', 'python-basics', 'beginner', NOW()),
  ('Variable (Biến)', 'Vùng nhớ dùng để lưu trữ dữ liệu. Khai báo: ten_bien = gia_tri. Python tự động xác định kiểu dữ liệu.', 'python-basics', 'beginner', NOW()),
  ('int', 'Kiểu số nguyên trong Python. Ví dụ: x = 42, y = -10', 'python-basics', 'beginner', NOW()),
  ('float', 'Kiểu số thực (số thập phân) trong Python. Ví dụ: pi = 3.14', 'python-basics', 'beginner', NOW());

-- data-structures category
INSERT INTO flashcards (term, definition, category, difficulty, created_at)
VALUES
  ('List (Danh sách)', 'Cấu trúc dữ liệu có thứ tự, có thể thay đổi. Khai báo: my_list = [1, 2, 3]', 'data-structures', 'beginner', NOW()),
  ('Dictionary (Từ điển)', 'Cấu trúc dữ liệu key-value. Khai báo: my_dict = {"name": "Python", "version": 3}', 'data-structures', 'intermediate', NOW()),
  ('Tuple', 'Cấu trúc dữ liệu có thứ tự, không thể thay đổi. Khai báo: my_tuple = (1, 2, 3)', 'data-structures', 'beginner', NOW()),
  ('Set (Tập hợp)', 'Cấu trúc dữ liệu không có thứ tự, không trùng lặp. Khai báo: my_set = {1, 2, 3}', 'data-structures', 'intermediate', NOW()),
  ('append()', 'Phương thức thêm phần tử vào cuối list. Ví dụ: my_list.append(4)', 'data-structures', 'beginner', NOW());

-- oop-concepts category
INSERT INTO flashcards (term, definition, category, difficulty, created_at)
VALUES
  ('Class (Lớp)', 'Bản thiết kế để tạo đối tượng. Khai báo: class MyClass: pass', 'oop-concepts', 'intermediate', NOW()),
  ('Object (Đối tượng)', 'Thể hiện cụ thể của một class. Tạo: obj = MyClass()', 'oop-concepts', 'intermediate', NOW()),
  ('Inheritance (Kế thừa)', 'Cơ chế cho phép class con thừa hưởng thuộc tính và phương thức từ class cha. Ví dụ: class Dog(Animal)', 'oop-concepts', 'advanced', NOW()),
  ('__init__()', 'Phương thức khởi tạo (constructor) được gọi khi tạo đối tượng mới. Ví dụ: def __init__(self, name): self.name = name', 'oop-concepts', 'intermediate', NOW()),
  ('self', 'Tham chiếu đến đối tượng hiện tại trong class. Dùng để truy cập thuộc tính và phương thức.', 'oop-concepts', 'intermediate', NOW());

-- algorithms category
INSERT INTO flashcards (term, definition, category, difficulty, created_at)
VALUES
  ('Thuật toán sắp xếp nổi bọt (Bubble Sort)', 'So sánh và hoán đổi các phần tử liền kề. Độ phức tạp: O(n²)', 'algorithms', 'intermediate', NOW()),
  ('Tìm kiếm nhị phân (Binary Search)', 'Tìm kiếm trong mảng đã sắp xếp bằng cách chia đôi. Độ phức tạp: O(log n)', 'algorithms', 'intermediate', NOW()),
  ('Đệ quy (Recursion)', 'Hàm gọi lại chính nó. Cần có điều kiện dừng (base case) để tránh vòng lặp vô hạn.', 'algorithms', 'advanced', NOW()),
  ('Big O Notation', 'Ký hiệu mô tả độ phức tạp thời gian/không gian của thuật toán. Ví dụ: O(1), O(n), O(n²)', 'algorithms', 'advanced', NOW()),
  ('Stack (Ngăn xếp)', 'Cấu trúc dữ liệu LIFO (Last In First Out). Thao tác: push, pop, peek.', 'algorithms', 'intermediate', NOW());

-- best-practices category
INSERT INTO flashcards (term, definition, category, difficulty, created_at)
VALUES
  ('PEP 8', 'Quy chuẩn viết code Python. Bao gồm: thụt lề 4 spaces, tên biến snake_case, dòng tối đa 79 ký tự.', 'best-practices', 'beginner', NOW()),
  ('DRY (Don''t Repeat Yourself)', 'Nguyên tắc không lặp lại code. Sử dụng hàm, class để tái sử dụng code.', 'best-practices', 'intermediate', NOW()),
  ('Comment và Docstring', 'Comment (#) giải thích code ngắn. Docstring (triple quotes) mô tả hàm/class chi tiết.', 'best-practices', 'beginner', NOW()),
  ('Try/Except', 'Xử lý ngoại lệ (exception handling). Bắt lỗi runtime để chương trình không bị crash.', 'best-practices', 'intermediate', NOW()),
  ('Virtual Environment', 'Môi trường ảo cách ly dependencies cho mỗi project. Tạo: python -m venv myenv', 'best-practices', 'intermediate', NOW());
