-- ============================================================
-- Migration 010: Seed Python Content - Level 1 "Giới thiệu Python"
-- Tạo nội dung mẫu cho Level 1 với 2 chapters, 4 lessons, 2 exercises
-- ============================================================

-- ─── Level 1 ─────────────────────────────────────────────────────────────────

INSERT INTO levels (id, title, description, "order", xp_required, is_published)
VALUES (
  1,
  'Giới thiệu Python',
  'Làm quen với ngôn ngữ lập trình Python - cú pháp cơ bản, biến, kiểu dữ liệu và chương trình đầu tiên.',
  1,
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  xp_required = EXCLUDED.xp_required,
  is_published = EXCLUDED.is_published;

-- ─── Chapter 1: Làm quen Python ─────────────────────────────────────────────

INSERT INTO chapters (id, level_id, title, description, "order", estimated_minutes, is_published)
VALUES (
  1,
  1,
  'Làm quen Python',
  'Tìm hiểu Python là gì, tại sao nên học Python, và cách cài đặt môi trường lập trình.',
  1,
  45,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  estimated_minutes = EXCLUDED.estimated_minutes,
  is_published = EXCLUDED.is_published;

-- ─── Chapter 2: Chương trình đầu tiên ───────────────────────────────────────

INSERT INTO chapters (id, level_id, title, description, "order", estimated_minutes, is_published)
VALUES (
  2,
  1,
  'Chương trình đầu tiên',
  'Viết chương trình Python đầu tiên, học cách sử dụng biến và các phép toán cơ bản.',
  2,
  60,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  estimated_minutes = EXCLUDED.estimated_minutes,
  is_published = EXCLUDED.is_published;

-- ─── Lesson 1: Python là gì? ────────────────────────────────────────────────

INSERT INTO lessons (id, chapter_id, title, content, "order", xp_reward, estimated_minutes, difficulty, is_published)
VALUES (
  1,
  1,
  'Python là gì?',
  '# Python là gì?

## Mục tiêu bài học
- Hiểu Python là ngôn ngữ lập trình gì
- Biết lý do tại sao Python phổ biến
- Biết các ứng dụng thực tế của Python

## Lý thuyết

**Python** là ngôn ngữ lập trình bậc cao, được tạo ra bởi Guido van Rossum vào năm 1991. Python nổi tiếng với cú pháp đơn giản, dễ đọc và dễ học.

### Tại sao nên học Python?

1. **Dễ học**: Cú pháp gần với ngôn ngữ tự nhiên (tiếng Anh)
2. **Đa năng**: Web, AI, Data Science, Game, Automation
3. **Cộng đồng lớn**: Hàng triệu lập trình viên trên thế giới
4. **Thư viện phong phú**: NumPy, Pandas, Django, Flask, TensorFlow

### Ví dụ đầu tiên

```python
# Chương trình Python đầu tiên
print("Xin chào! Tôi đang học Python!")
```

### Ứng dụng thực tế
- **Instagram**: Backend viết bằng Python (Django)
- **YouTube**: Xử lý video với Python
- **Google**: Nhiều hệ thống nội bộ dùng Python
- **NASA**: Phân tích dữ liệu vũ trụ

## Quiz nhanh
Python được tạo ra vào năm nào? → 1991',
  1,
  50,
  10,
  'easy',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  xp_reward = EXCLUDED.xp_reward,
  is_published = EXCLUDED.is_published;

-- ─── Lesson 2: Cài đặt Python ───────────────────────────────────────────────

INSERT INTO lessons (id, chapter_id, title, content, "order", xp_reward, estimated_minutes, difficulty, is_published)
VALUES (
  2,
  1,
  'Cài đặt Python và IDE',
  '# Cài đặt Python và IDE

## Mục tiêu bài học
- Biết cách cài đặt Python trên máy tính
- Biết cách sử dụng trình soạn thảo code
- Chạy được chương trình Python đầu tiên trên máy

## Lý thuyết

### Cài đặt Python

1. Truy cập [python.org](https://python.org)
2. Tải phiên bản Python mới nhất (3.12+)
3. Khi cài đặt, **nhớ tick "Add Python to PATH"**

### Kiểm tra cài đặt

Mở Terminal/Command Prompt và gõ:

```python
python --version
# Kết quả: Python 3.12.x
```

### IDE khuyên dùng

| IDE | Ưu điểm | Phù hợp |
|-----|----------|----------|
| VS Code | Miễn phí, nhẹ, nhiều extension | Mọi cấp độ |
| PyCharm | Đầy đủ tính năng | Dự án lớn |
| Thonny | Đơn giản, dễ dùng | Người mới |

### Chạy chương trình đầu tiên

Tạo file `hello.py`:

```python
print("Xin chào Python!")
print("Tôi là học sinh lớp 12")
print(2 + 3)
```

Chạy trong terminal:
```bash
python hello.py
```

Kết quả:
```
Xin chào Python!
Tôi là học sinh lớp 12
5
```

## Lưu ý
- Trên nền tảng Python Master 12, bạn không cần cài đặt gì - code trực tiếp trên trình duyệt!
- Tuy nhiên, biết cách cài đặt trên máy sẽ giúp bạn luyện tập thêm ở nhà.',
  2,
  50,
  15,
  'easy',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  xp_reward = EXCLUDED.xp_reward,
  is_published = EXCLUDED.is_published;

-- ─── Lesson 3: Biến và kiểu dữ liệu ────────────────────────────────────────

INSERT INTO lessons (id, chapter_id, title, content, "order", xp_reward, estimated_minutes, difficulty, is_published)
VALUES (
  3,
  2,
  'Biến và kiểu dữ liệu',
  '# Biến và Kiểu dữ liệu trong Python

## Mục tiêu bài học
- Hiểu khái niệm biến (variable)
- Biết các kiểu dữ liệu cơ bản: int, float, str, bool
- Biết cách khai báo và sử dụng biến

## Lý thuyết

### Biến là gì?

Biến giống như một **hộp chứa** dữ liệu. Bạn đặt tên cho hộp và bỏ giá trị vào trong.

```python
# Khai báo biến
ten = "Minh"
tuoi = 18
diem_tb = 8.5
da_tot_nghiep = False
```

### Kiểu dữ liệu cơ bản

| Kiểu | Mô tả | Ví dụ |
|------|--------|-------|
| `int` | Số nguyên | `42`, `-7`, `0` |
| `float` | Số thực | `3.14`, `-2.5` |
| `str` | Chuỗi ký tự | `"Xin chào"`, `''Python''` |
| `bool` | Đúng/Sai | `True`, `False` |

### Kiểm tra kiểu dữ liệu

```python
x = 42
print(type(x))  # <class ''int''>

y = "Hello"
print(type(y))  # <class ''str''>
```

### Quy tắc đặt tên biến

✅ Đúng:
```python
ho_ten = "Nguyễn Văn A"
diemToan = 9
so_luong_2 = 10
```

❌ Sai:
```python
2bien = 5        # Không bắt đầu bằng số
ho ten = "A"     # Không có khoảng trắng
class = "12A"    # Không dùng từ khóa Python
```

## Ví dụ thực hành

```python
# Thông tin học sinh
ho_ten = "Trần Thị B"
lop = "12A1"
diem_toan = 9.0
diem_ly = 8.5
diem_hoa = 9.5

# Tính điểm trung bình
diem_tb = (diem_toan + diem_ly + diem_hoa) / 3
print(f"Học sinh: {ho_ten}")
print(f"Lớp: {lop}")
print(f"Điểm TB: {diem_tb:.2f}")
```',
  1,
  50,
  20,
  'easy',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  xp_reward = EXCLUDED.xp_reward,
  is_published = EXCLUDED.is_published;

-- ─── Lesson 4: Input/Output và phép toán ────────────────────────────────────

INSERT INTO lessons (id, chapter_id, title, content, "order", xp_reward, estimated_minutes, difficulty, is_published)
VALUES (
  4,
  2,
  'Input/Output và phép toán',
  '# Input/Output và Phép toán

## Mục tiêu bài học
- Biết cách nhập dữ liệu từ bàn phím (input)
- Biết cách xuất dữ liệu ra màn hình (print)
- Thực hiện các phép toán cơ bản

## Lý thuyết

### Hàm print() - Xuất dữ liệu

```python
# In chuỗi
print("Xin chào!")

# In nhiều giá trị
print("Tên:", "Minh", "- Tuổi:", 18)

# f-string (khuyên dùng)
ten = "Minh"
tuoi = 18
print(f"Tên: {ten}, Tuổi: {tuoi}")
```

### Hàm input() - Nhập dữ liệu

```python
# Nhập chuỗi
ten = input("Nhập tên của bạn: ")

# Nhập số (cần chuyển đổi kiểu)
tuoi = int(input("Nhập tuổi: "))
diem = float(input("Nhập điểm: "))
```

### Phép toán cơ bản

| Phép toán | Ký hiệu | Ví dụ | Kết quả |
|-----------|----------|-------|---------|
| Cộng | `+` | `5 + 3` | `8` |
| Trừ | `-` | `10 - 4` | `6` |
| Nhân | `*` | `3 * 7` | `21` |
| Chia | `/` | `15 / 4` | `3.75` |
| Chia lấy nguyên | `//` | `15 // 4` | `3` |
| Chia lấy dư | `%` | `15 % 4` | `3` |
| Lũy thừa | `**` | `2 ** 3` | `8` |

### Ví dụ: Tính diện tích hình tròn

```python
import math

ban_kinh = float(input("Nhập bán kính: "))
dien_tich = math.pi * ban_kinh ** 2
chu_vi = 2 * math.pi * ban_kinh

print(f"Diện tích: {dien_tich:.2f}")
print(f"Chu vi: {chu_vi:.2f}")
```

### Ví dụ: Đổi nhiệt độ

```python
celsius = float(input("Nhập nhiệt độ (°C): "))
fahrenheit = celsius * 9/5 + 32
print(f"{celsius}°C = {fahrenheit}°F")
```',
  2,
  50,
  20,
  'easy',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  xp_reward = EXCLUDED.xp_reward,
  is_published = EXCLUDED.is_published;

-- ─── Exercise 1: Hello World ─────────────────────────────────────────────────

INSERT INTO exercises (id, lesson_id, title, description, starter_code, difficulty, xp_reward, time_limit_seconds, memory_limit_mb, is_published)
VALUES (
  1,
  3,
  'Khai báo biến và in ra màn hình',
  '## Mô tả

Viết chương trình khai báo các biến sau và in ra màn hình:
- Biến `ten` chứa tên của bạn (chuỗi)
- Biến `tuoi` chứa tuổi (số nguyên)
- Biến `lop` chứa tên lớp (chuỗi)

Sau đó in ra theo định dạng:
```
Xin chao, toi la [ten]
Toi [tuoi] tuoi, hoc lop [lop]
```

## Ví dụ

**Input**: Không có input

**Output** (nếu ten="An", tuoi=18, lop="12A1"):
```
Xin chao, toi la An
Toi 18 tuoi, hoc lop 12A1
```

## Gợi ý
- Sử dụng f-string để format chuỗi
- Nhớ đúng chính tả trong output',
  '# Khai bao bien
ten = ""  # Thay bang ten cua ban
tuoi = 0  # Thay bang tuoi cua ban
lop = ""  # Thay bang lop cua ban

# In ra man hinh
print(f"Xin chao, toi la {ten}")
print(f"Toi {tuoi} tuoi, hoc lop {lop}")',
  'easy',
  10,
  10,
  256,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  starter_code = EXCLUDED.starter_code,
  is_published = EXCLUDED.is_published;

-- ─── Exercise 2: Tính diện tích ─────────────────────────────────────────────

INSERT INTO exercises (id, lesson_id, title, description, starter_code, difficulty, xp_reward, time_limit_seconds, memory_limit_mb, is_published)
VALUES (
  2,
  4,
  'Tính diện tích hình chữ nhật',
  '## Mô tả

Viết chương trình nhập chiều dài và chiều rộng của hình chữ nhật, sau đó tính và in ra diện tích và chu vi.

## Input
- Dòng 1: Chiều dài (số thực)
- Dòng 2: Chiều rộng (số thực)

## Output
- Dòng 1: `Dien tich: [kết quả]`
- Dòng 2: `Chu vi: [kết quả]`

Kết quả làm tròn 2 chữ số thập phân.

## Ví dụ

**Input**:
```
5
3
```

**Output**:
```
Dien tich: 15.00
Chu vi: 16.00
```

## Công thức
- Diện tích = chiều dài × chiều rộng
- Chu vi = 2 × (chiều dài + chiều rộng)',
  '# Nhap chieu dai va chieu rong
chieu_dai = float(input())
chieu_rong = float(input())

# Tinh dien tich va chu vi
dien_tich = 0  # TODO: Tinh dien tich
chu_vi = 0     # TODO: Tinh chu vi

# In ket qua
print(f"Dien tich: {dien_tich:.2f}")
print(f"Chu vi: {chu_vi:.2f}")',
  'easy',
  10,
  10,
  256,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  starter_code = EXCLUDED.starter_code,
  is_published = EXCLUDED.is_published;

-- ─── Test Cases for Exercise 1 ──────────────────────────────────────────────

INSERT INTO test_cases (id, exercise_id, input, expected_output, is_hidden, "order")
VALUES
  (1, 1, '', 'Xin chao, toi la An\nToi 18 tuoi, hoc lop 12A1', false, 1),
  (2, 1, '', 'Xin chao, toi la An\nToi 18 tuoi, hoc lop 12A1', true, 2)
ON CONFLICT (id) DO NOTHING;

-- ─── Test Cases for Exercise 2 ──────────────────────────────────────────────

INSERT INTO test_cases (id, exercise_id, input, expected_output, is_hidden, "order")
VALUES
  (3, 2, '5\n3', 'Dien tich: 15.00\nChu vi: 16.00', false, 1),
  (4, 2, '10\n4', 'Dien tich: 40.00\nChu vi: 28.00', false, 2),
  (5, 2, '7.5\n2.5', 'Dien tich: 18.75\nChu vi: 20.00', true, 3),
  (6, 2, '1\n1', 'Dien tich: 1.00\nChu vi: 4.00', true, 4),
  (7, 2, '100\n50', 'Dien tich: 5000.00\nChu vi: 300.00', true, 5)
ON CONFLICT (id) DO NOTHING;

-- ─── Seed initial badges ────────────────────────────────────────────────────

INSERT INTO badges (id, name, slug, description, icon, criteria, xp_reward, rarity)
VALUES
  (1, 'Bước đầu tiên', 'first-lesson', 'Hoàn thành bài học đầu tiên', '📖', 'Hoàn thành 1 bài học', 10, 'common'),
  (2, 'Người giải bài', 'first-problem', 'Giải đúng bài tập đầu tiên', '✅', 'Giải đúng 1 bài tập (100 điểm)', 10, 'common'),
  (3, 'Siêng năng', '10-lessons', 'Hoàn thành 10 bài học', '📚', 'Hoàn thành 10 bài học', 50, 'common'),
  (4, 'Lập trình viên', '10-problems', 'Giải đúng 10 bài tập', '💻', 'Giải đúng 10 bài tập khác nhau', 50, 'rare'),
  (5, 'Kiên trì', 'streak-7', 'Duy trì streak 7 ngày', '🔥', 'Học liên tục 7 ngày', 30, 'common'),
  (6, 'Không ngừng nghỉ', 'streak-30', 'Duy trì streak 30 ngày', '⚡', 'Học liên tục 30 ngày', 100, 'rare'),
  (7, 'Huyền thoại', 'streak-100', 'Duy trì streak 100 ngày', '🏆', 'Học liên tục 100 ngày', 500, 'legendary'),
  (8, 'Chuyên gia', '50-lessons', 'Hoàn thành 50 bài học', '🎓', 'Hoàn thành 50 bài học', 100, 'rare'),
  (9, 'Bậc thầy', '100-lessons', 'Hoàn thành 100 bài học', '👑', 'Hoàn thành 100 bài học', 200, 'epic'),
  (10, 'Dự án đầu tay', 'first-project', 'Hoàn thành dự án đầu tiên', '🚀', 'Hoàn thành 1 dự án (100 điểm)', 50, 'rare')
ON CONFLICT (id) DO NOTHING;
