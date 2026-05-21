/**
 * Real lesson content for the 10 levels following SGK Tin học 12 Cánh Diều.
 * Each level has 5 lessons, 50 in total. Content is markdown-flavoured plain
 * text covering: mục tiêu, lý thuyết, ví dụ kèm code, lưu ý, bài tập tự luyện.
 *
 * The lesson API route falls back to this content when running in dev mode.
 */

export interface LessonContent {
  id: number;
  course_id: number;
  module_id: number;
  order_index: number;
  title: string;
  slug: string;
  description: string;
  estimated_minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  content: string;
  is_published: boolean;
}

const L = (
  id: number,
  level: number,
  order: number,
  title: string,
  description: string,
  difficulty: 'easy' | 'medium' | 'hard',
  content: string
): LessonContent => ({
  id,
  course_id: level,
  module_id: level,
  order_index: order,
  title,
  slug: `cap-${level}-bai-${order}`,
  description,
  estimated_minutes: 15,
  difficulty,
  xp_reward: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 30 : 40,
  is_published: true,
  content: content.trim(),
});

/* eslint-disable max-lines */

export const LESSONS: LessonContent[] = [
  // ─── CẤP 1: GIỚI THIỆU PYTHON ─────────────────────────────────────────────

  L(1, 1, 1, 'Bài 1: Python là gì?', 'Tổng quan về Python và môi trường lập trình', 'easy', `
## 🎯 Mục tiêu bài học
Sau bài học này, bạn sẽ:
- Hiểu Python là gì và vì sao nó phổ biến nhất thế giới
- Biết cách chạy code Python ngay trên trình duyệt
- Viết được chương trình đầu tiên

---

## 🐍 Python là gì?

Python là **ngôn ngữ lập trình bậc cao** do Guido van Rossum tạo ra năm 1991. Hiện tại Python đứng **#1 thế giới** về độ phổ biến (theo TIOBE Index 2026).

### Tại sao chọn Python?

| Đặc điểm | Giải thích |
|-----------|-----------|
| 📖 Dễ đọc | Cú pháp gần tiếng Anh, không cần dấu \`;\` hay \`{}\` |
| 🚀 Đa năng | Web, AI, Data Science, Game, IoT... |
| 📚 Thư viện khổng lồ | 400,000+ packages trên PyPI |
| 👥 Cộng đồng lớn | Stack Overflow, GitHub, Reddit |
| 💼 Việc làm nhiều | Google, Netflix, Instagram đều dùng Python |

### Python dùng ở đâu trong thực tế?

\`\`\`
🤖 AI/Machine Learning  → ChatGPT, xe tự lái
📊 Data Science         → Phân tích dữ liệu, biểu đồ
🌐 Web Development      → Instagram, Spotify backend
🎮 Game                 → Pygame, Ren'Py
🔬 Khoa học             → NASA, nghiên cứu y học
\`\`\`

---

## 💻 Chương trình đầu tiên

\`\`\`python
# Chương trình Python đầu tiên của bạn!
print("Xin chào lớp 12!")
print("Tôi đang học Python 🐍")
\`\`\`

**Giải thích từng dòng:**
- \`#\` → Dòng ghi chú (comment), Python bỏ qua
- \`print()\` → Hàm in giá trị ra màn hình
- \`"..."\` → Chuỗi ký tự (string)

> 🧪 **Thử ngay:** Nhấn nút "Bắt đầu" ở bài tập bên dưới, thay \`"Xin chào lớp 12!"\` bằng tên của bạn rồi chạy!

---

## ⚠️ Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| \`NameError: name 'Print' is not defined\` | Viết hoa chữ P | Đổi thành \`print\` (chữ thường) |
| \`SyntaxError: EOL while scanning\` | Thiếu dấu ngoặc kép đóng | Thêm \`"\` ở cuối chuỗi |
| \`SyntaxError: unexpected indent\` | Thụt lề sai | Xóa khoảng trắng đầu dòng |

---

## 💡 Mẹo hay
- Python phân biệt **chữ hoa/thường**: \`Print\` ≠ \`print\`
- Mỗi câu lệnh viết trên **1 dòng riêng**
- Dùng \`#\` để ghi chú giải thích code cho người đọc

---

## ✏️ Bài tập tự luyện
1. In ra dòng chữ \`"Tôi đang học Python"\`
2. In tên đầy đủ và lớp của bạn ra **2 dòng riêng**
3. Thử viết \`Print("test")\` xem lỗi gì xảy ra, rồi sửa lại
`),
  L(2, 1, 2, 'Bài 2: Biến và kiểu dữ liệu cơ bản', 'Khai báo biến, các kiểu int/float/str/bool', 'easy', `
## 🎯 Mục tiêu bài học
- Hiểu khái niệm **biến** (variable) trong lập trình
- Phân biệt 4 kiểu dữ liệu cơ bản: \`int\`, \`float\`, \`str\`, \`bool\`
- Sử dụng hàm \`type()\` để kiểm tra kiểu

---

## 📦 Biến là gì?

Hãy tưởng tượng biến như một **chiếc hộp có tên**, bên trong chứa một giá trị:

\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  ten = "An" │    │  tuoi = 17  │    │ diem = 8.5  │
│  ┌───────┐  │    │  ┌───────┐  │    │  ┌───────┐  │
│  │ "An"  │  │    │  │  17   │  │    │  │  8.5  │  │
│  └───────┘  │    │  └───────┘  │    │  └───────┘  │
│    (str)    │    │    (int)    │    │   (float)   │
└─────────────┘    └─────────────┘    └─────────────┘
\`\`\`

### Cú pháp khai báo biến:
\`\`\`python
ten = "An"          # Chuỗi (str)
tuoi = 17           # Số nguyên (int)
diem = 8.5          # Số thực (float)
da_dang_ki = True   # Logic (bool)
\`\`\`

> ⚡ **Khác với Toán:** Dấu \`=\` trong Python là **gán giá trị**, không phải "bằng". \`x = 5\` nghĩa là "đặt giá trị 5 vào hộp x".

---

## 📊 4 Kiểu dữ liệu cơ bản

| Kiểu | Ý nghĩa | Ví dụ | Khi nào dùng? |
|------|---------|-------|---------------|
| \`int\` | Số nguyên | \`17\`, \`-5\`, \`0\`, \`1000\` | Đếm, chỉ số, tuổi |
| \`float\` | Số thực | \`3.14\`, \`-2.5\`, \`9.0\` | Điểm số, tiền, đo lường |
| \`str\` | Chuỗi ký tự | \`"Hà Nội"\`, \`'Python'\` | Tên, địa chỉ, văn bản |
| \`bool\` | Đúng/Sai | \`True\`, \`False\` | Điều kiện, trạng thái |

---

## 🔍 Kiểm tra kiểu với \`type()\`

\`\`\`python
x = 10
y = 3.14
z = "Hello"
w = True

print(type(x))   # <class 'int'>
print(type(y))   # <class 'float'>
print(type(z))   # <class 'str'>
print(type(w))   # <class 'bool'>
\`\`\`

> 🧪 **Thử ngay:** Gõ \`print(type(3.14))\` và \`print(type("3.14"))\` — kết quả khác nhau!

---

## 📝 Quy tắc đặt tên biến

✅ **Được phép:**
- Bắt đầu bằng chữ cái hoặc \`_\`: \`ten\`, \`_count\`, \`diem_tb\`
- Chứa chữ, số, gạch dưới: \`hoc_sinh_1\`, \`x2\`

❌ **Không được:**
- Bắt đầu bằng số: ~~\`1x\`~~, ~~\`2diem\`~~
- Chứa dấu cách: ~~\`ho ten\`~~ → dùng \`ho_ten\`
- Trùng từ khóa: ~~\`if\`~~, ~~\`for\`~~, ~~\`print\`~~

---

## ⚠️ Lỗi thường gặp

\`\`\`python
# ❌ Sai: chưa khai báo biến
print(ten)  # NameError: name 'ten' is not defined

# ✅ Đúng: khai báo trước, dùng sau
ten = "An"
print(ten)  # An
\`\`\`

---

## ✏️ Bài tập tự luyện
1. Khai báo 3 biến \`ho_ten\`, \`lop\`, \`diem_tb\` rồi in ra bằng \`print()\`
2. Dùng \`type()\` kiểm tra kiểu của \`3.14\` và \`"3.14"\` — giải thích sự khác biệt
3. Thử gán \`x = 5\` rồi \`x = "năm"\` — Python có báo lỗi không? Tại sao?
`),
  L(3, 1, 3, 'Bài 3: Nhập / xuất dữ liệu', 'input() và print() có format', 'easy', `
## 🎯 Mục tiêu bài học
- Sử dụng \`input()\` để đọc dữ liệu từ bàn phím
- Hiểu cách ép kiểu (type casting)
- Dùng f-string để in dữ liệu đẹp

---

## 📥 Đọc dữ liệu với \`input()\`

\`input()\` luôn trả về **chuỗi (str)**. Muốn dùng làm số → phải ép kiểu.

\`\`\`python
ten = input("Nhập tên: ")           # → str
tuoi = int(input("Nhập tuổi: "))    # → int
diem = float(input("Nhập điểm: "))  # → float
\`\`\`

### Luồng dữ liệu:
\`\`\`
Bàn phím → input() → "17" (str) → int() → 17 (int)
\`\`\`

> ⚠️ **Lỗi phổ biến:** Nếu user nhập "abc" mà bạn dùng \`int()\`, Python sẽ báo \`ValueError\`!

---

## 📤 In dữ liệu với \`print()\`

### Cách 1: In nhiều giá trị
\`\`\`python
print("Xin chào", ten)              # Tự thêm dấu cách
print("a", "b", "c", sep="-")       # a-b-c
print("không xuống dòng", end=" ")   # Giữ nguyên dòng
\`\`\`

### Cách 2: f-string (⭐ khuyên dùng)
\`\`\`python
ten = "An"
tuoi = 17
print(f"Xin chào {ten}, {tuoi} tuổi")
# → Xin chào An, 17 tuổi
\`\`\`

### Cách 3: Định dạng số
\`\`\`python
pi = 3.14159
print(f"{pi:.2f}")      # 3.14 (2 chữ số thập phân)
print(f"{1000000:,}")   # 1,000,000 (phân cách hàng nghìn)
\`\`\`

---

## 🔄 Ép kiểu (Type Casting)

\`\`\`
int("17")    → 17        str → int
float("3.5") → 3.5       str → float
str(100)     → "100"     int → str
int(3.9)     → 3         float → int (cắt phần thập phân)
\`\`\`

> 🧪 **Thử ngay:** Gõ \`print(int(3.9))\` — kết quả là 3 chứ không phải 4!

---

## ⚠️ Lỗi thường gặp

| Code | Lỗi | Cách sửa |
|------|------|----------|
| \`int("abc")\` | ValueError | Kiểm tra input trước khi ép kiểu |
| \`print(f"{ten")\` | SyntaxError | Thiếu \`}\` đóng |
| \`tuoi = input()\` rồi \`tuoi + 1\` | TypeError | Cần \`int(input())\` |

---

## ✏️ Bài tập tự luyện
1. Hỏi tên người dùng, in ra \`"Xin chào, <tên>!"\`
2. Đọc 2 số nguyên a, b → in tổng, hiệu, tích
3. Đọc bán kính hình tròn → in diện tích (làm tròn 2 chữ số)
`),
  L(4, 1, 4, 'Bài 4: Toán tử số học và gán', 'Phép toán + - * / // % ** và phép gán', 'easy', `
## 🎯 Mục tiêu bài học
- Nắm vững 7 toán tử số học trong Python
- Hiểu sự khác biệt giữa \`/\` và \`//\`
- Sử dụng toán tử gán rút gọn

---

## ➕ 7 Toán tử số học

| Toán tử | Tên | Ví dụ | Kết quả | Ghi chú |
|---------|-----|-------|---------|---------|
| \`+\` | Cộng | \`5 + 2\` | \`7\` | |
| \`-\` | Trừ | \`5 - 2\` | \`3\` | |
| \`*\` | Nhân | \`5 * 2\` | \`10\` | |
| \`/\` | Chia | \`5 / 2\` | \`2.5\` | ⚠️ Luôn trả float |
| \`//\` | Chia lấy nguyên | \`5 // 2\` | \`2\` | Bỏ phần thập phân |
| \`%\` | Chia lấy dư | \`5 % 2\` | \`1\` | Modulo |
| \`**\` | Lũy thừa | \`5 ** 2\` | \`25\` | 5² = 25 |

### Minh họa \`/\` vs \`//\` vs \`%\`:
\`\`\`
17 / 5  = 3.4    (chia thường → float)
17 // 5 = 3      (phần nguyên)
17 % 5  = 2      (phần dư)

Kiểm tra: 5 × 3 + 2 = 17 ✓
\`\`\`

> 💡 **Mẹo:** \`n % 2 == 0\` → n chẵn. \`n % 2 == 1\` → n lẻ.

---

## 📝 Toán tử gán rút gọn

Thay vì viết \`x = x + 5\`, Python cho phép viết ngắn:

\`\`\`python
x = 10
x += 5    # x = x + 5  → 15
x -= 3    # x = x - 3  → 12
x *= 2    # x = x * 2  → 24
x //= 5   # x = x // 5 → 4
x %= 3    # x = x % 3  → 1
\`\`\`

---

## 📐 Thứ tự ưu tiên (giống Toán)

\`\`\`
Cao nhất:  **  (lũy thừa)
           * / // %
Thấp nhất: + -

Ví dụ: 3 + 4 * 5 = 3 + 20 = 23 (nhân trước)
       (3 + 4) * 5 = 7 * 5 = 35 (ngoặc trước)
\`\`\`

> 🧪 **Thử ngay:** So sánh \`2 ** 3 ** 2\` với \`(2 ** 3) ** 2\` — kết quả khác nhau!

---

## ⚠️ Lỗi thường gặp

| Code | Vấn đề | Giải thích |
|------|--------|-----------|
| \`5 / 0\` | ZeroDivisionError | Không thể chia cho 0 |
| \`"3" + 2\` | TypeError | Không cộng str với int |
| \`10 / 3\` = 3.33... | Không phải 3 | Dùng \`//\` nếu muốn 3 |

---

## ✏️ Bài tập tự luyện
1. Tính \`(3 + 4) * 5\` và \`3 + 4 * 5\` — giải thích sự khác biệt
2. Cho a = 17, b = 5. In thương nguyên và phần dư
3. Tính diện tích hình tròn bán kính r (nhập từ bàn phím), dùng \`pi = 3.14159\`
`),
  L(5, 1, 5, 'Bài 5: Chuỗi ký tự cơ bản', 'Khai báo, nối, slicing, format', 'easy', `
## 🎯 Mục tiêu bài học
- Khai báo và thao tác với chuỗi (string)
- Hiểu indexing và slicing
- Sử dụng các phương thức chuỗi phổ biến

---

## 📝 Khai báo chuỗi

\`\`\`python
s1 = "Hà Nội"          # Dấu ngoặc kép
s2 = 'Việt Nam'         # Dấu ngoặc đơn
s3 = """Chuỗi           # Ba dấu ngoặc (nhiều dòng)
nhiều dòng"""
\`\`\`

---

## 🔗 Nối và nhân chuỗi

\`\`\`python
ho = "Nguyễn"
ten = "An"
print(ho + " " + ten)   # Nguyễn An
print("ha" * 3)          # hahaha
print("-" * 20)          # --------------------
\`\`\`

---

## 🔢 Indexing và Slicing

\`\`\`
Chuỗi:  P  y  t  h  o  n
Index:   0  1  2  3  4  5
Âm:     -6 -5 -4 -3 -2 -1
\`\`\`

\`\`\`python
s = "Python"
s[0]      # "P"
s[-1]     # "n"
s[1:4]    # "yth"
s[::-1]   # "nohtyP" (đảo ngược)
\`\`\`

---

## 🛠️ Phương thức chuỗi hay dùng

| Phương thức | Ví dụ | Kết quả |
|-------------|-------|---------|
| \`.lower()\` | \`"HI".lower()\` | \`"hi"\` |
| \`.upper()\` | \`"hi".upper()\` | \`"HI"\` |
| \`.strip()\` | \`"  hi  ".strip()\` | \`"hi"\` |
| \`.split(",")\` | \`"a,b,c".split(",")\` | \`['a','b','c']\` |
| \`.replace()\` | \`"hi".replace("h","H")\` | \`"Hi"\` |
| \`.count()\` | \`"hello".count("l")\` | \`2\` |
| \`len()\` | \`len("Python")\` | \`6\` |

> 🧪 **Thử ngay:** Gõ \`"Hello World"[6:]\` — kết quả là gì?

---

## ✏️ Bài tập tự luyện
1. Đọc một chuỗi → in chuỗi đảo ngược
2. Đếm số ký tự "a" trong chuỗi đầu vào
3. Đọc họ tên → in ra chữ cái đầu viết hoa, còn lại viết thường
`),

  // ─── CẤP 2: BIỂU THỨC VÀ TOÁN TỬ ─────────────────────────────────────────

  L(6, 2, 1, 'Bài 1: Biểu thức và phép so sánh', '<, <=, >, >=, ==, !=', 'easy', `
## 🎯 Mục tiêu bài học
- Hiểu khái niệm **biểu thức** (expression) trong Python
- Nắm vững 6 toán tử so sánh và kết quả trả về
- Phân biệt \`=\` (gán) và \`==\` (so sánh)
- So sánh chuỗi theo thứ tự Unicode

---

## 📊 Biểu thức là gì?

**Biểu thức** là tổ hợp các giá trị, biến và toán tử mà Python **tính ra một giá trị mới**.

\`\`\`
┌─────────────────────────────────────────────┐
│           BIỂU THỨC (Expression)            │
├─────────────────────────────────────────────┤
│  Giá trị:    5, "An", True                  │
│  Biến:       x, tuoi, diem                  │
│  Phép toán:  x + 5, tuoi > 18              │
│  Gọi hàm:   len("abc"), max(1, 2)          │
│  Kết hợp:    (x + y) * 2 > 10              │
└─────────────────────────────────────────────┘
\`\`\`

\`\`\`python
# Mỗi dòng dưới đây là một biểu thức
5 + 3           # → 8 (biểu thức số học)
x > 10          # → True/False (biểu thức logic)
"Xin" + " chào" # → "Xin chào" (biểu thức chuỗi)
\`\`\`

---

## 🔍 6 Toán tử so sánh

Toán tử so sánh luôn trả về **\`True\`** hoặc **\`False\`** (kiểu \`bool\`).

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|-------|---------|
| \`==\` | Bằng | \`5 == 5\` | \`True\` |
| \`!=\` | Khác | \`5 != 3\` | \`True\` |
| \`<\` | Nhỏ hơn | \`3 < 5\` | \`True\` |
| \`>\` | Lớn hơn | \`3 > 5\` | \`False\` |
| \`<=\` | Nhỏ hơn hoặc bằng | \`5 <= 5\` | \`True\` |
| \`>=\` | Lớn hơn hoặc bằng | \`3 >= 5\` | \`False\` |

### Minh họa trực quan:

\`\`\`
Trục số:  ──1──2──3──4──5──6──7──8──9──10──▶

  3 < 7?   3 nằm BÊN TRÁI 7 → True ✓
  9 <= 5?  9 nằm BÊN PHẢI 5 → False ✗
  5 == 5?  Cùng vị trí       → True ✓
\`\`\`

---

## ⚡ Phân biệt \`=\` và \`==\`

\`\`\`python
# = là GÁN giá trị (đặt vào hộp)
x = 10          # Đặt 10 vào biến x

# == là SO SÁNH (hỏi có bằng không?)
x == 10         # True (x đang là 10)
x == 5          # False
\`\`\`

> ⚠️ **Lỗi kinh điển:** Viết \`if x = 5\` thay vì \`if x == 5\` → Python báo SyntaxError!

---

## 📝 So sánh chuỗi

Python so sánh chuỗi theo **thứ tự Unicode** (gần giống bảng chữ cái):

\`\`\`python
print("a" < "b")      # True (a đứng trước b)
print("apple" < "banana")  # True
print("A" < "a")      # True (chữ hoa < chữ thường)
print("abc" == "abc")  # True
print("ab" < "abc")   # True (ngắn hơn = nhỏ hơn)
\`\`\`

### Bảng Unicode phổ biến:
\`\`\`
'0'-'9': 48-57
'A'-'Z': 65-90
'a'-'z': 97-122

→ '0' < 'A' < 'a'
\`\`\`

---

## 🔗 So sánh chuỗi (chain comparison)

Python cho phép viết so sánh chuỗi rất tự nhiên:

\`\`\`python
x = 15
# Thay vì: x >= 10 and x <= 20
print(10 <= x <= 20)   # True — x nằm trong [10, 20]

# Kiểm tra 3 số tăng dần
a, b, c = 1, 2, 3
print(a < b < c)       # True
\`\`\`

> 🧪 **Thử ngay:** Gõ \`print(1 < 2 < 3)\` và \`print(1 < 2 > 3)\` — giải thích kết quả!

---

## ⚠️ Lỗi thường gặp

| Code | Lỗi | Cách sửa |
|------|------|----------|
| \`if x = 5:\` | SyntaxError | Đổi thành \`if x == 5:\` |
| \`"10" > "9"\` trả về \`False\` | So sánh chuỗi, không phải số | Ép kiểu: \`int("10") > int("9")\` |
| \`0.1 + 0.2 == 0.3\` → \`False\` | Lỗi số thực dấu phẩy động | Dùng \`abs(a - b) < 1e-9\` |

---

## 💡 Mẹo hay
- Dùng \`==\` để so sánh, \`=\` để gán — đừng nhầm!
- So sánh chuỗi phân biệt hoa/thường: \`"An" != "an"\`
- Muốn so sánh không phân biệt hoa/thường: \`s1.lower() == s2.lower()\`
- Dùng chain comparison cho gọn: \`0 < x < 100\`

---

## ✏️ Bài tập tự luyện
1. Đọc 2 số a, b từ bàn phím. In ra \`True\` nếu a lớn hơn b, ngược lại \`False\`
2. Kiểm tra một số n có nằm trong đoạn [1, 100] không (dùng chain comparison)
3. Đọc 2 chuỗi, so sánh chúng không phân biệt hoa/thường và in kết quả
`),

  L(7, 2, 2, 'Bài 2: Toán tử logic and / or / not', 'Kết hợp nhiều điều kiện', 'easy', `
## 🎯 Mục tiêu bài học
- Hiểu 3 toán tử logic: \`and\`, \`or\`, \`not\`
- Đọc và xây dựng bảng chân trị
- Áp dụng đoản mạch (short-circuit evaluation)
- Kết hợp nhiều điều kiện trong bài toán thực tế

---

## 📊 Bảng chân trị (Truth Table)

\`\`\`
┌───────┬───────┬─────────┬────────┬───────┐
│   a   │   b   │ a and b │ a or b │ not a │
├───────┼───────┼─────────┼────────┼───────┤
│ True  │ True  │  True   │  True  │ False │
│ True  │ False │  False  │  True  │ False │
│ False │ True  │  False  │  True  │  True │
│ False │ False │  False  │ False  │  True │
└───────┴───────┴─────────┴────────┴───────┘
\`\`\`

### Cách nhớ nhanh:
- **\`and\`** = "VÀ" → cả hai phải đúng mới đúng
- **\`or\`** = "HOẶC" → chỉ cần một cái đúng là đúng
- **\`not\`** = "KHÔNG" → đảo ngược

---

## 🔍 Ví dụ thực tế

\`\`\`python
tuoi = 17
diem = 8.5

# Kiểm tra học sinh THPT giỏi
if tuoi >= 15 and tuoi <= 18 and diem >= 8:
    print("Học sinh THPT giỏi")

# Kiểm tra được miễn thi
if diem >= 9 or (diem >= 8 and hanh_kiem == "tot"):
    print("Được miễn thi")

# Kiểm tra KHÔNG phải số âm
n = 5
if not (n < 0):
    print("Số không âm")
\`\`\`

---

## ⚡ Đoản mạch (Short-circuit Evaluation)

Python **dừng sớm** khi đã biết kết quả:

\`\`\`
and: Nếu vế trái = False → DỪNG (kết quả chắc chắn False)
or:  Nếu vế trái = True  → DỪNG (kết quả chắc chắn True)
\`\`\`

\`\`\`python
# Ứng dụng: tránh lỗi chia cho 0
x = 0
if x != 0 and 10 / x > 2:   # x = 0 → vế trái False → DỪNG
    print("OK")              # Không bị ZeroDivisionError!

# Ứng dụng: giá trị mặc định
ten = input("Tên: ") or "Khách"  # Nếu nhập rỗng → dùng "Khách"
\`\`\`

---

## 📐 Thứ tự ưu tiên

\`\`\`
Cao nhất:  not
           and
Thấp nhất: or

Ví dụ: not True or False and True
     = (not True) or (False and True)
     = False or False
     = False
\`\`\`

> 🧪 **Thử ngay:** Gõ \`print(True or False and False)\` — kết quả là gì? Tại sao?

---

## 🛠️ Bài toán thực tế: Xét tuyển đại học

\`\`\`python
diem_toan = float(input("Điểm Toán: "))
diem_ly = float(input("Điểm Lý: "))
diem_hoa = float(input("Điểm Hóa: "))

tong = diem_toan + diem_ly + diem_hoa
khong_mon_liet = diem_toan >= 1 and diem_ly >= 1 and diem_hoa >= 1

if tong >= 18 and khong_mon_liet:
    print("ĐỖ đại học!")
else:
    print("Chưa đủ điểm")
\`\`\`

---

## ⚠️ Lỗi thường gặp

| Code | Lỗi | Cách sửa |
|------|------|----------|
| \`if x == 1 or 2:\` | Luôn True (2 là truthy) | \`if x == 1 or x == 2:\` |
| \`if not x == 5:\` | Khó đọc | \`if x != 5:\` |
| \`if x and y > 0:\` | Chỉ kiểm tra y > 0 | \`if x > 0 and y > 0:\` |

---

## 💡 Mẹo hay
- Dùng ngoặc \`()\` khi kết hợp \`and\` và \`or\` để rõ ràng
- \`x in [1, 2, 3]\` thay cho \`x == 1 or x == 2 or x == 3\`
- Đoản mạch giúp tránh lỗi runtime (chia 0, index ngoài mảng)

---

## ✏️ Bài tập tự luyện
1. Kiểm tra số n có phải **số chẵn dương** không (n > 0 và n chia hết 2)
2. Đọc điểm 3 môn. In "ĐỖ" nếu trung bình >= 5 VÀ không môn nào dưới 3
3. Đọc năm sinh. Kiểm tra có phải năm nhuận: chia hết 4 VÀ (không chia hết 100 HOẶC chia hết 400)
`),
  L(8, 2, 3, 'B├ái 3: ├ëp kiß╗âu (type casting)', 'int() float() str() bool()', 'easy', `
## V├¼ sao cß║ºn ├⌐p kiß╗âu?
\`input()\` lu├┤n trß║ú \`str\`. Khi cß║ºn t├¡nh to├ín bß║ín phß║úi ├⌐p sang \`int\` hoß║╖c \`float\`.

\`\`\`python
n = int(input("Nhß║¡p sß╗æ: "))
giam_gia = float(input("Giß║úm gi├í: ")) / 100
\`\`\`

## C├íc h├ám ├⌐p kiß╗âu
\`\`\`python
int("12")     # 12
int(3.7)      # 3 (cß║»t phß║ºn thß║¡p ph├ón)
float("3.14") # 3.14
str(42)       # '42'
bool(0)       # False
bool("")      # False
bool("a")     # True
\`\`\`

## L╞░u ├╜
- \`int("3.5")\` sß║╜ lß╗ùi v├¼ chuß╗ùi kh├┤ng phß║úi sß╗æ nguy├¬n
- D├╣ng \`int(float("3.5"))\` ─æß╗â chuyß╗ân an to├án

## B├ái tß║¡p
1. ─Éß╗ìc 1 chuß╗ùi, kiß╗âm tra n├│ c├│ thß╗â chuyß╗ân th├ánh sß╗æ nguy├¬n kh├┤ng
2. ─Éß╗ìc tuß╗òi v├á in xem c├│ phß║úi tuß╗òi vß╗ï th├ánh ni├¬n (12-17)
`),
  L(9, 2, 4, 'B├ái 4: H├ám to├ín hß╗ìc chuß║⌐n', 'abs, round, pow, math.sqrt, math.pi', 'easy', `
## H├ám c├│ sß║╡n
\`\`\`python
abs(-5)       # 5
round(3.7)    # 4
round(3.14, 1)# 3.1
pow(2, 10)    # 1024
max(1, 5, 3)  # 5
min(1, 5, 3)  # 1
\`\`\`

## Module math
\`\`\`python
import math

print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...
print(math.floor(3.7))# 3
print(math.ceil(3.2)) # 4
\`\`\`

## B├ái tß║¡p
1. T├¡nh diß╗çn t├¡ch h├¼nh tr├▓n b├ín k├¡nh r (d├╣ng math.pi)
2. Cho a, b, c. In nghiß╗çm x = (-b + sqrt(b^2 - 4ac)) / 2a
`),
  L(10, 2, 5, 'B├ái 5: To├ín tß╗¡ tr├¬n chuß╗ùi', 'in, count, find, replace', 'easy', `
## Kiß╗âm tra chß╗⌐a vß╗¢i in
\`\`\`python
"py" in "python"     # True
"x" not in "python"  # True
\`\`\`

## ─Éß║┐m v├á t├¼m
\`\`\`python
"banana".count("a")     # 3
"hello".find("l")        # 2 (vß╗ï tr├¡ ─æß║ºu ti├¬n)
"hello".find("z")        # -1 (kh├┤ng t├¼m thß║Ñy)
\`\`\`

## Thay thß║┐
\`\`\`python
"abc".replace("a", "X")   # 'Xbc'
\`\`\`

## B├ái tß║¡p
1. ─Éß║┐m sß╗æ nguy├¬n ├óm trong chuß╗ùi ─æß║ºu v├áo
2. Thay tß║Ñt cß║ú khoß║úng trß║»ng trong chuß╗ùi bß║▒ng dß║Ñu gß║ích d╞░ß╗¢i
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 3: C├éU Lß╗åNH ─ÉIß╗ÇU KIß╗åN ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(11, 3, 1, 'B├ái 1: C├óu lß╗çnh if', 'C├║ ph├íp v├á indent', 'easy', `
## C├║ ph├íp
\`\`\`python
if ─æiß╗üu_kiß╗çn:
    # khß╗æi lß╗çnh khi ─æ├║ng
\`\`\`

\`\`\`python
n = int(input())
if n > 0:
    print("Sß╗æ d╞░╞íng")
\`\`\`

## Indent (thß╗Ñt ─æß║ºu d├▓ng)
Python d├╣ng **indent** thay v├¼ \`{ }\`. Quy ╞░ß╗¢c 4 dß║Ñu c├ích. Sai indent = lß╗ùi.

## B├ái tß║¡p
1. Cho ─æiß╗âm trung b├¼nh, nß║┐u >= 5 in "─Éß╗ù"
2. Cho 1 sß╗æ, nß║┐u l├á sß╗æ chß║╡n d╞░╞íng in "OK"
`),
  L(12, 3, 2, 'B├ái 2: if / else', 'Hai nh├ính ─æß╗æi lß║¡p', 'easy', `
\`\`\`python
n = int(input())
if n % 2 == 0:
    print("CHAN")
else:
    print("LE")
\`\`\`

## Kß║┐t hß╗úp nhiß╗üu ─æiß╗üu kiß╗çn
C├│ thß╗â ─æß║╖t biß╗âu thß╗⌐c phß╗⌐c tß║íp vß╗¢i \`and\`, \`or\`:
\`\`\`python
if 0 < n < 100 and n % 2 == 0:
    print("Sß╗æ chß║╡n trong [1, 99]")
\`\`\`

## B├ái tß║¡p
1. Cho tuß╗òi, in "Trß║╗ em" nß║┐u < 16, ng╞░ß╗úc lß║íi in "Ng╞░ß╗¥i lß╗¢n"
2. Kiß╗âm tra n─âm c├│ phß║úi n─âm nhuß║¡n: chia hß║┐t 4 v├á (kh├┤ng chia hß║┐t 100 hoß║╖c chia hß║┐t 400)
`),
  L(13, 3, 3, 'B├ái 3: if / elif / else', 'Nhiß╗üu nh├ính', 'easy', `
\`\`\`python
diem = float(input())
if diem >= 9:
    xep_loai = "Xuß║Ñt sß║»c"
elif diem >= 7:
    xep_loai = "Kh├í"
elif diem >= 5:
    xep_loai = "Trung b├¼nh"
else:
    xep_loai = "Yß║┐u"
print(xep_loai)
\`\`\`

## L╞░u ├╜
- Chß╗ë mß╗Öt nh├ính ─æ╞░ß╗úc chß║íy
- Thß╗⌐ tß╗▒ kiß╗âm tra rß║Ñt quan trß╗ìng

## B├ái tß║¡p
1. Cho th├íng, in sß╗æ ng├áy cß╗ºa th├íng ─æ├│ (x├⌐t 28/29 cho th├íng 2)
2. Cho ─æiß╗âm 3 m├┤n, t├¡nh trung b├¼nh v├á xß║┐p loß║íi
`),
  L(14, 3, 4, 'B├ái 4: Lß╗ông if', 'if trong if', 'medium', `
\`\`\`python
diem = float(input())
hanh_kiem = input()  # tot/kha/trung-binh

if diem >= 8:
    if hanh_kiem == "tot":
        print("Hß╗ìc sinh giß╗Åi")
    else:
        print("Cß║ºn cß╗æ gß║»ng hß║ính kiß╗âm")
else:
    print("Cß║ºn cß╗æ gß║»ng hß╗ìc tß║¡p")
\`\`\`

## Mß║╣o
C├│ thß╗â thay lß╗ông if bß║▒ng \`and\` ─æß╗â dß╗à ─æß╗ìc h╞ín:
\`\`\`python
if diem >= 8 and hanh_kiem == "tot":
    ...
\`\`\`

## B├ái tß║¡p
1. Ph├ón loß║íi tam gi├íc tß╗½ 3 cß║ính: ─æß╗üu, c├ón, vu├┤ng, th╞░ß╗¥ng
2. Cho n─âm v├á th├íng, in sß╗æ ng├áy cß╗ºa th├íng ─æ├│
`),
  L(15, 3, 5, 'B├ái 5: To├ín tß╗¡ ba ng├┤i', 'value_if_true if cond else value_if_false', 'medium', `
## C├║ ph├íp
\`\`\`python
ket_qua = "CHAN" if n % 2 == 0 else "LE"
print(ket_qua)
\`\`\`

Ho├án to├án t╞░╞íng ─æ╞░╞íng vß╗¢i:
\`\`\`python
if n % 2 == 0:
    ket_qua = "CHAN"
else:
    ket_qua = "LE"
\`\`\`

## Khi n├áo d├╣ng?
- Khi g├ín biß║┐n ─æ╞ín giß║ún dß╗▒a tr├¬n ─æiß╗üu kiß╗çn
- Khi muß╗æn code ngß║»n gß╗ìn

## B├ái tß║¡p
1. Cho 2 sß╗æ a, b. D├╣ng to├ín tß╗¡ ba ng├┤i in sß╗æ lß╗¢n h╞ín
2. ─Éß╗ìc tuß╗òi, in "─Éß╗º tuß╗òi" / "Ch╞░a ─æß╗º tuß╗òi" l├íi xe (>= 18)
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 4: V├ÆNG Lß║╢P ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(16, 4, 1, 'B├ái 1: V├▓ng lß║╖p for vß╗¢i range', 'range(n), range(a,b), range(a,b,step)', 'easy', `
## C├║ ph├íp
\`\`\`python
for i in range(5):       # 0 1 2 3 4
    print(i)

for i in range(1, 11):   # 1..10
    print(i)

for i in range(10, 0, -1):  # 10..1
    print(i)
\`\`\`

## In bß║úng cß╗¡u ch╞░╞íng
\`\`\`python
n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
\`\`\`

## B├ái tß║¡p
1. In c├íc sß╗æ tß╗½ 1..N
2. T├¡nh tß╗òng 1 + 2 + ... + N
`),
  L(17, 4, 2, 'B├ái 2: V├▓ng lß║╖p while', 'Lß║╖p khi ─æiß╗üu kiß╗çn ─æ├║ng', 'easy', `
\`\`\`python
n = int(input())
i = 1
tong = 0
while i <= n:
    tong += i
    i += 1
print(tong)
\`\`\`

## Khi n├áo d├╣ng while thay for?
- Khi kh├┤ng biß║┐t tr╞░ß╗¢c sß╗æ lß║ºn lß║╖p
- Khi ─æiß╗üu kiß╗çn kß║┐t th├║c phß╗Ñ thuß╗Öc dß╗» liß╗çu nhß║¡p

## L╞░u ├╜
Phß║úi ─æß║úm bß║úo ─æiß╗üu kiß╗çn sß║╜ trß╗ƒ th├ánh False ─æß╗â tr├ính **v├▓ng lß║╖p v├┤ tß║¡n**.

## B├ái tß║¡p
1. ─Éß╗ìc sß╗æ nguy├¬n ─æß║┐n khi gß║╖p 0, in tß╗òng c├íc sß╗æ ─æ├│ (kh├┤ng kß╗â 0)
2. T├¼m sß╗æ b╞░ß╗¢c cß║ºn ─æß╗â chia n cho 2 ─æß║┐n khi n = 1 (v├¡ dß╗Ñ n=8 ΓåÆ 3 b╞░ß╗¢c)
`),
  L(18, 4, 3, 'B├ái 3: break v├á continue', 'Tho├ít sß╗¢m v├á bß╗Å qua', 'medium', `
## break - tho├ít v├▓ng lß║╖p
\`\`\`python
for i in range(100):
    if i * i > 50:
        break
    print(i)
\`\`\`

## continue - bß╗Å qua l╞░ß╗út hiß╗çn tß║íi
\`\`\`python
for i in range(10):
    if i % 2 == 0:
        continue   # bß╗Å qua sß╗æ chß║╡n
    print(i)
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc N sß╗æ. Dß╗½ng nhß║¡p khi gß║╖p sß╗æ ├óm
2. In c├íc sß╗æ trong [1, 100] kh├┤ng chia hß║┐t cho 7
`),
  L(19, 4, 4, 'B├ái 4: V├▓ng lß║╖p lß╗ông', 'For trong for', 'medium', `
## In ma trß║¡n sao *
\`\`\`python
n = int(input())
for i in range(1, n + 1):
    for j in range(i):
        print("*", end="")
    print()
\`\`\`

## T├¡ch ch├⌐o
\`\`\`python
for i in range(2, 5):
    for j in range(2, 5):
        print(f"{i} * {j} = {i * j}")
\`\`\`

## B├ái tß║¡p
1. In bß║úng nh├ón 1..9
2. ─Éß║┐m sß╗æ cß║╖p (i, j) sao cho i + j = N vß╗¢i i, j thuß╗Öc [1, N]
`),
  L(20, 4, 5, 'B├ái 5: Ph├⌐p tß╗òng / t├¡ch / ─æß║┐m', 'Mß║½u accumulator', 'medium', `
## Mß║½u cß╗Öng dß╗ôn
\`\`\`python
tong = 0
for i in range(1, n + 1):
    tong += i
\`\`\`

## Mß║½u nh├ón dß╗ôn
\`\`\`python
tich = 1
for i in range(1, n + 1):
    tich *= i  # giai thß╗½a n!
\`\`\`

## Mß║½u ─æß║┐m
\`\`\`python
dem = 0
for ch in s:
    if ch in "aeiou":
        dem += 1
\`\`\`

## B├ái tß║¡p
1. T├¡nh n!
2. ─Éß║┐m sß╗æ ╞░ß╗¢c sß╗æ cß╗ºa n
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 5: H├ÇM TRONG PYTHON ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(21, 5, 1, 'B├ái 1: ─Éß╗ïnh ngh─⌐a v├á gß╗ìi h├ám', 'def, return', 'easy', `
\`\`\`python
def chao(ten):
    print(f"Xin ch├áo {ten}")

chao("An")
chao("B├¼nh")
\`\`\`

## H├ám c├│ gi├í trß╗ï trß║ú vß╗ü
\`\`\`python
def cong(a, b):
    return a + b

print(cong(3, 5))  # 8
\`\`\`

## Lß╗úi ├¡ch cß╗ºa h├ám
- Tr├ính lß║╖p lß║íi code
- Dß╗à bß║úo tr├¼ v├á ─æß╗ìc
- C├│ thß╗â test ri├¬ng tß╗½ng h├ám

## B├ái tß║¡p
1. Viß║┐t h├ám \`tinh_giai_thua(n)\`
2. Viß║┐t h├ám \`la_so_nguyen_to(n)\` trß║ú vß╗ü True/False
`),
  L(22, 5, 2, 'B├ái 2: Tham sß╗æ mß║╖c ─æß╗ïnh', 'def f(x, y=0)', 'easy', `
\`\`\`python
def chao(ten, loi="Xin ch├áo"):
    print(f"{loi}, {ten}")

chao("An")             # Xin ch├áo, An
chao("B├¼nh", "Hello")  # Hello, B├¼nh
\`\`\`

## Tham sß╗æ c├│ t├¬n
\`\`\`python
chao(loi="Hi", ten="C╞░ß╗¥ng")
\`\`\`

## L╞░u ├╜
Tham sß╗æ mß║╖c ─æß╗ïnh n├¬n l├á **immutable** (sß╗æ, chuß╗ùi). Tr├ính d├╣ng list/dict mß║╖c ─æß╗ïnh v├¼ sß║╜ chia sß║╗ giß╗»a c├íc lß║ºn gß╗ìi.

## B├ái tß║¡p
1. H├ám \`luy_thua(co_so, mu=2)\` mß║╖c ─æß╗ïnh b├¼nh ph╞░╞íng
2. H├ám \`tao_chao(ten, gio=8)\` ch├áo theo giß╗¥ (s├íng/chiß╗üu/tß╗æi)
`),
  L(23, 5, 3, 'B├ái 3: Phß║ím vi biß║┐n', 'Biß║┐n cß╗Ñc bß╗Ö v├á to├án cß╗Ñc', 'medium', `
## Biß║┐n cß╗Ñc bß╗Ö
Biß║┐n khai b├ío b├¬n trong h├ám chß╗ë tß╗ôn tß║íi trong h├ám.
\`\`\`python
def f():
    x = 10  # cß╗Ñc bß╗Ö
    print(x)

f()
# print(x)  # NameError
\`\`\`

## Biß║┐n to├án cß╗Ñc
\`\`\`python
dem = 0

def tang():
    global dem
    dem += 1

tang()
tang()
print(dem)  # 2
\`\`\`

## L╞░u ├╜
Hß║ín chß║┐ d├╣ng \`global\`. Tß╗æt h╞ín l├á **trß║ú vß╗ü gi├í trß╗ï** tß╗½ h├ám.

## B├ái tß║¡p
1. Viß║┐t h├ám ─æß║┐m sß╗æ lß║ºn mß╗Öt k├╜ tß╗▒ xuß║Ñt hiß╗çn trong chuß╗ùi
2. Viß║┐t h├ám \`hoan_doi(a, b)\` trß║ú vß╗ü tuple (b, a)
`),
  L(24, 5, 4, 'B├ái 4: ─Éß╗ç quy c╞í bß║ún', 'H├ám tß╗▒ gß╗ìi ch├¡nh n├│', 'medium', `
\`\`\`python
def giai_thua(n):
    if n == 0:
        return 1
    return n * giai_thua(n - 1)

print(giai_thua(5))  # 120
\`\`\`

## Y├¬u cß║ºu cß╗ºa ─æß╗ç quy
1. **Tr╞░ß╗¥ng hß╗úp dß╗½ng** (base case)
2. **Lß╗¥i gß╗ìi ─æß╗ç quy** tiß║┐n gß║ºn h╞ín vß╗ü base case

## Fibonacci ─æß╗ç quy
\`\`\`python
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
\`\`\`

ΓÜá∩╕Å ─Éß╗ç quy kh├┤ng nhß╗¢ rß║Ñt chß║¡m vß╗¢i n lß╗¢n. N├¬n d├╣ng v├▓ng lß║╖p hoß║╖c memoization.

## B├ái tß║¡p
1. H├ám t├¡nh tß╗òng 1 + 2 + ... + n bß║▒ng ─æß╗ç quy
2. H├ám ─æß║┐m sß╗æ chß╗» sß╗æ cß╗ºa n
`),
  L(25, 5, 5, 'B├ái 5: H├ám lambda v├á map/filter', 'H├ám v├┤ danh', 'medium', `
## Lambda
\`\`\`python
binh_phuong = lambda x: x * x
print(binh_phuong(5))  # 25
\`\`\`

## D├╣ng vß╗¢i map / filter
\`\`\`python
arr = [1, 2, 3, 4, 5]
print(list(map(lambda x: x * 2, arr)))      # [2, 4, 6, 8, 10]
print(list(filter(lambda x: x % 2 == 0, arr)))  # [2, 4]
\`\`\`

## sorted vß╗¢i key
\`\`\`python
hs = [("An", 8), ("B├¼nh", 9), ("C╞░ß╗¥ng", 7)]
print(sorted(hs, key=lambda x: x[1], reverse=True))
\`\`\`

## B├ái tß║¡p
1. Sß║»p xß║┐p danh s├ích chuß╗ùi theo ─æß╗Ö d├ái
2. Lß╗ìc c├íc sß╗æ > 0 trong list nhß║¡p tß╗½ b├án ph├¡m
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 6: DANH S├üCH V├Ç TUPLE ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(26, 6, 1, 'B├ái 1: List c╞í bß║ún', 'Khai b├ío, truy cß║¡p, cß║¡p nhß║¡t', 'easy', `
## Khai b├ío
\`\`\`python
arr = [1, 2, 3]
arr2 = ["a", "b", "c"]
arr3 = []
\`\`\`

## Truy cß║¡p
\`\`\`python
arr[0]    # 1 (phß║ºn tß╗¡ ─æß║ºu)
arr[-1]   # 3 (phß║ºn tß╗¡ cuß╗æi)
arr[1] = 99  # g├ín
\`\`\`

## Slicing
\`\`\`python
arr = [10, 20, 30, 40, 50]
arr[1:3]   # [20, 30]
arr[:3]    # [10, 20, 30]
arr[::2]   # [10, 30, 50]
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc N sß╗æ rß╗ôi in ra theo thß╗⌐ tß╗▒ ng╞░ß╗úc lß║íi
2. In phß║ºn tß╗¡ lß╗¢n nhß║Ñt v├á nhß╗Å nhß║Ñt cß╗ºa list
`),
  L(27, 6, 2, 'B├ái 2: Ph╞░╞íng thß╗⌐c list', 'append, insert, remove, pop, sort', 'easy', `
\`\`\`python
arr = [3, 1, 4, 1, 5]

arr.append(9)     # [3, 1, 4, 1, 5, 9]
arr.insert(0, 0)  # [0, 3, 1, 4, 1, 5, 9]
arr.remove(1)     # bß╗Å phß║ºn tß╗¡ ─æß║ºu ti├¬n c├│ gi├í trß╗ï 1
arr.pop()         # bß╗Å phß║ºn tß╗¡ cuß╗æi, trß║ú vß╗ü n├│
arr.sort()        # sß║»p xß║┐p t─âng dß║ºn
arr.sort(reverse=True)
arr.reverse()
\`\`\`

## Mß╗Öt sß╗æ h├ám hß╗»u ├¡ch
\`\`\`python
sum(arr)
len(arr)
min(arr)
max(arr)
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc N sß╗æ, ─æß║┐m sß╗æ chß║╡n
2. ─Éß╗ìc N sß╗æ, in tß╗òng v├á trung b├¼nh
`),
  L(28, 6, 3, 'B├ái 3: List comprehension', '[expr for x in iterable if cond]', 'medium', `
\`\`\`python
binh_phuong = [x * x for x in range(1, 6)]
# [1, 4, 9, 16, 25]

chan = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, ..., 18]
\`\`\`

## Lß╗úi ├¡ch
- Ngß║»n gß╗ìn, dß╗à ─æß╗ìc
- Th╞░ß╗¥ng nhanh h╞ín v├▓ng for th├┤ng th╞░ß╗¥ng

## L╞░u ├╜
─Éß╗½ng nhß╗ôi nh├⌐t qu├í nhiß╗üu logic. Khi phß╗⌐c tß║íp n├¬n d├╣ng v├▓ng for th╞░ß╗¥ng ─æß╗â dß╗à ─æß╗ìc.

## B├ái tß║¡p
1. Tß║ío list c├íc sß╗æ chia hß║┐t cho 3 trong [1, 50] bß║▒ng comprehension
2. Tß║ío list b├¼nh ph╞░╞íng c├íc sß╗æ nguy├¬n tß╗æ < 30
`),
  L(29, 6, 4, 'B├ái 4: Tuple v├á unpacking', 'Tuple bß║Ñt biß║┐n, ho├ín ─æß╗òi biß║┐n', 'medium', `
## Tuple - "list bß║Ñt biß║┐n"
\`\`\`python
toa_do = (3, 4)
toa_do[0] = 5  # TypeError, kh├┤ng g├ín ─æ╞░ß╗úc
\`\`\`

## Unpacking
\`\`\`python
a, b = 10, 20
a, b = b, a   # ho├ín ─æß╗òi

ten, tuoi = ("An", 17)
\`\`\`

## Trß║ú vß╗ü nhiß╗üu gi├í trß╗ï
\`\`\`python
def chia_du(a, b):
    return a // b, a % b

q, r = chia_du(17, 5)
\`\`\`

## B├ái tß║¡p
1. Viß║┐t h├ám trß║ú vß╗ü cß║ú max v├á min cß╗ºa list
2. Ho├ín ─æß╗òi 2 biß║┐n a, b trong 1 d├▓ng
`),
  L(30, 6, 5, 'B├ái 5: Duyß╗çt v├á lß╗ìc list', 'Mß║½u thuß║¡t to├ín c╞í bß║ún tr├¬n list', 'medium', `
## T├¼m phß║ºn tß╗¡
\`\`\`python
def tim(arr, x):
    for i, v in enumerate(arr):
        if v == x:
            return i
    return -1
\`\`\`

## ─Éß║┐m
\`\`\`python
def dem_chan(arr):
    return sum(1 for x in arr if x % 2 == 0)
\`\`\`

## Tß╗òng / trung b├¼nh
\`\`\`python
trung_binh = sum(arr) / len(arr) if arr else 0
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc N sß╗æ, in chß╗ë sß╗æ cß╗ºa phß║ºn tß╗¡ lß╗¢n nhß║Ñt
2. ─Éß╗ìc N sß╗æ, in c├íc sß╗æ > trung b├¼nh cß╗ºa list
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 7: CHUß╗ûI K├¥ Tß╗░ ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(31, 7, 1, 'B├ái 1: Duyß╗çt chuß╗ùi', 'for ch in s', 'easy', `
\`\`\`python
s = input()
for ch in s:
    print(ch.upper())
\`\`\`

## Kiß╗âm tra ph├ón loß║íi k├╜ tß╗▒
\`\`\`python
"a".isalpha()   # True
"3".isdigit()   # True
"a3".isalnum()  # True
" ".isspace()   # True
\`\`\`

## B├ái tß║¡p
1. ─Éß║┐m sß╗æ chß╗» c├íi v├á sß╗æ chß╗» sß╗æ trong chuß╗ùi
2. In chuß╗ùi m├á mß╗ùi k├╜ tß╗▒ ─æ╞░ß╗úc lß║╖p lß║íi 2 lß║ºn
`),
  L(32, 7, 2, 'B├ái 2: T├ích v├á gh├⌐p chuß╗ùi', 'split, join', 'easy', `
\`\`\`python
"a,b,c".split(",")     # ['a', 'b', 'c']
"  hi  bro  ".split()  # ['hi', 'bro'] (t├ích theo khoß║úng trß║»ng)

" - ".join(["a", "b"]) # 'a - b'
\`\`\`

## ─Éß╗ìc nhiß╗üu sß╗æ trong 1 d├▓ng
\`\`\`python
arr = list(map(int, input().split()))
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc d├▓ng "t├¬n,tuß╗òi" v├á in ra t├ích rß╗¥i
2. Tß╗òng c├íc sß╗æ trong d├▓ng nhß║¡p
`),
  L(33, 7, 3, 'B├ái 3: Xß╗¡ l├╜ in/out chuß╗ùi', 'format, f-string n├óng cao', 'medium', `
\`\`\`python
ten = "An"
diem = 8.567
print(f"{ten:>10} - {diem:>5.2f}")
\`\`\`

## Cß╗¥ ─æß╗ïnh dß║íng
| Cß╗¥ | T├íc dß╗Ñng |
|---|---|
| \`>n\` | c─ân phß║úi, ─æß╗Ö rß╗Öng n |
| \`<n\` | c─ân tr├íi |
| \`^n\` | c─ân giß╗»a |
| \`.kf\` | k chß╗» sß╗æ thß║¡p ph├ón |

## B├ái tß║¡p
1. In bß║úng ─æiß╗âm c├│ cß╗Öt thß║│ng h├áng
2. In sß╗æ c├│ ─æ├║ng 3 chß╗» sß╗æ (─æß╗çm sß╗æ 0 ph├¡a tr╞░ß╗¢c)
`),
  L(34, 7, 4, 'B├ái 4: Chuß╗ùi ─æß╗æi xß╗⌐ng (palindrome)', 'Kiß╗âm tra chuß╗ùi ─æß║úo == ch├¡nh n├│', 'medium', `
\`\`\`python
s = input().lower().replace(" ", "")
if s == s[::-1]:
    print("YES")
else:
    print("NO")
\`\`\`

## Mß╗ƒ rß╗Öng
- Bß╗Å dß║Ñu c├óu tr╞░ß╗¢c khi kiß╗âm tra
- T├¼m chuß╗ùi con ─æß╗æi xß╗⌐ng d├ái nhß║Ñt

## B├ái tß║¡p
1. ─Éß║┐m sß╗æ chuß╗ùi con ─æß╗æi xß╗⌐ng ─æß╗Ö d├ái 3 trong chuß╗ùi ─æß║ºu v├áo
2. Cho list chuß╗ùi, in c├íc chuß╗ùi ─æß╗æi xß╗⌐ng
`),
  L(35, 7, 5, 'B├ái 5: M├ú ho├í / giß║úi m├ú ─æ╞ín giß║ún', 'Caesar cipher', 'hard', `
\`\`\`python
def ma_hoa(s, k):
    res = ""
    for ch in s:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            res += chr((ord(ch) - base + k) % 26 + base)
        else:
            res += ch
    return res

print(ma_hoa("Hello", 3))  # Khoor
\`\`\`

## ord() v├á chr()
- \`ord("A")\` = 65
- \`chr(65)\` = "A"

## B├ái tß║¡p
1. Viß║┐t h├ám giß║úi m├ú Caesar
2. ─Éß║┐m tß║ºn suß║Ñt k├╜ tß╗▒ trong chuß╗ùi (bß╗Å qua hoa th╞░ß╗¥ng)
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 8: Tß╗¬ ─ÉIß╗éN V├Ç Tß║¼P Hß╗óP ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(36, 8, 1, 'B├ái 1: Dictionary c╞í bß║ún', 'Khai b├ío, get, set', 'easy', `
\`\`\`python
hs = {"ten": "An", "tuoi": 17, "diem": 8.5}

print(hs["ten"])      # An
hs["tuoi"] = 18
hs["lop"] = "12A"
del hs["diem"]
\`\`\`

## get() an to├án
\`\`\`python
hs.get("dia_chi")           # None
hs.get("dia_chi", "N/A")    # 'N/A'
\`\`\`

## B├ái tß║¡p
1. Tß║ío dict ─æiß╗âm 3 m├┤n rß╗ôi in
2. Cho dict hß╗ìc sinh, ─æß╗òi tuß╗òi tß╗½ 17 th├ánh 18
`),
  L(37, 8, 2, 'B├ái 2: Duyß╗çt dictionary', 'keys, values, items', 'easy', `
\`\`\`python
hs = {"An": 8, "B├¼nh": 9, "C╞░ß╗¥ng": 7}

for ten in hs:
    print(ten)

for ten, diem in hs.items():
    print(f"{ten}: {diem}")

print(list(hs.values()))  # [8, 9, 7]
\`\`\`

## ─Éß║┐m tß║ºn suß║Ñt bß║▒ng dict
\`\`\`python
dem = {}
for ch in "banana":
    dem[ch] = dem.get(ch, 0) + 1
print(dem)   # {'b': 1, 'a': 3, 'n': 2}
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc N tß╗½, in tß║ºn suß║Ñt xuß║Ñt hiß╗çn
2. T├¼m key c├│ value lß╗¢n nhß║Ñt
`),
  L(38, 8, 3, 'B├ái 3: Set', 'Tß║¡p hß╗úp kh├┤ng tr├╣ng lß║╖p', 'medium', `
\`\`\`python
s = {1, 2, 3, 2, 1}
print(s)  # {1, 2, 3}

s.add(4)
s.remove(1)
\`\`\`

## Ph├⌐p to├ín tß║¡p hß╗úp
\`\`\`python
A = {1, 2, 3}
B = {3, 4, 5}
A | B   # hß╗úp {1, 2, 3, 4, 5}
A & B   # giao {3}
A - B   # hiß╗çu {1, 2}
\`\`\`

## Loß║íi bß╗Å tr├╣ng trong list
\`\`\`python
arr = [1, 2, 1, 3, 2]
unique = list(set(arr))
\`\`\`

## B├ái tß║¡p
1. ─Éß║┐m sß╗æ k├╜ tß╗▒ kh├íc nhau trong chuß╗ùi
2. Cho 2 list, in c├íc phß║ºn tß╗¡ c├│ ß╗ƒ cß║ú hai
`),
  L(39, 8, 4, 'B├ái 4: B├ái to├ín ─æß║┐m vß╗¢i dict', 'Counter pattern', 'medium', `
\`\`\`python
from collections import Counter

c = Counter("abracadabra")
print(c)             # Counter({'a': 5, 'b': 2, 'r': 2, ...})
print(c.most_common(3))  # [('a', 5), ('b', 2), ('r', 2)]
\`\`\`

## B├ái tß║¡p
1. ─Éß║┐m tß║ºn suß║Ñt c├íc tß╗½ trong c├óu (t├ích theo khoß║úng trß║»ng)
2. T├¼m k├╜ tß╗▒ xuß║Ñt hiß╗çn nhiß╗üu nhß║Ñt trong chuß╗ùi
`),
  L(40, 8, 5, 'B├ái 5: Quß║ún l├╜ danh s├ích hß╗ìc sinh', 'D├╣ng dict + list kß║┐t hß╗úp', 'medium', `
\`\`\`python
hs_list = [
    {"ten": "An", "diem": 8.5},
    {"ten": "B├¼nh", "diem": 7.2},
    {"ten": "C╞░ß╗¥ng", "diem": 9.0},
]

# Sß║»p theo ─æiß╗âm
hs_sorted = sorted(hs_list, key=lambda x: x["diem"], reverse=True)
for hs in hs_sorted:
    print(hs["ten"], hs["diem"])
\`\`\`

## Lß╗ìc
\`\`\`python
gioi = [hs for hs in hs_list if hs["diem"] >= 8]
\`\`\`

## B├ái tß║¡p
1. T├¡nh trung b├¼nh ─æiß╗âm cß║ú lß╗¢p
2. Ph├ón loß║íi hß╗ìc sinh th├ánh G/K/TB/Y
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 9: Tß╗åP TIN ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(41, 9, 1, 'B├ái 1: ─Éß╗ìc file v─ân bß║ún', 'open(), read(), readlines()', 'easy', `
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    noi_dung = f.read()
print(noi_dung)
\`\`\`

## ─Éß╗ìc theo d├▓ng
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
\`\`\`

## V├¼ sao d├╣ng with
- Tß╗▒ ─æß╗Öng ─æ├│ng file
- An to├án khi gß║╖p lß╗ùi

## B├ái tß║¡p
1. ─Éß╗ìc file, ─æß║┐m sß╗æ d├▓ng
2. ─Éß╗ìc file, ─æß║┐m sß╗æ tß╗½
`),
  L(42, 9, 2, 'B├ái 2: Ghi file v─ân bß║ún', 'mode "w" v├á "a"', 'easy', `
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Xin ch├áo\\n")
    f.write("H├┤m nay hß╗ìc Python\\n")
\`\`\`

## Mode
- \`"w"\`: ghi mß╗¢i (xo├í nß╗Öi dung c┼⌐)
- \`"a"\`: ghi th├¬m
- \`"r"\`: chß╗ë ─æß╗ìc

## B├ái tß║¡p
1. ─Éß╗ìc N sß╗æ rß╗ôi ghi v├áo file output.txt
2. Ghi log thß╗¥i gian khß╗ƒi ─æß╗Öng ch╞░╞íng tr├¼nh
`),
  L(43, 9, 3, 'B├ái 3: File CSV', 'Module csv', 'medium', `
\`\`\`python
import csv

with open("hs.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)  # ['An', '17', '8.5']

# Ghi
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["T├¬n", "Tuß╗òi", "─Éiß╗âm"])
    writer.writerow(["An", 17, 8.5])
\`\`\`

## DictReader / DictWriter
\`\`\`python
reader = csv.DictReader(f)
for row in reader:
    print(row["T├¬n"], row["─Éiß╗âm"])
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc CSV ─æiß╗âm, t├¡nh trung b├¼nh
2. Ghi danh s├ích hß╗ìc sinh ra CSV
`),
  L(44, 9, 4, 'B├ái 4: Bß║»t lß╗ùi try/except', 'Xß╗¡ l├╜ ngoß║íi lß╗ç', 'medium', `
\`\`\`python
try:
    n = int(input())
    print(10 / n)
except ValueError:
    print("Phß║úi nhß║¡p sß╗æ")
except ZeroDivisionError:
    print("Kh├┤ng chia ─æ╞░ß╗úc cho 0")
except Exception as e:
    print(f"Lß╗ùi: {e}")
\`\`\`

## finally
Khß╗æi lu├┤n chß║íy d├╣ c├│ lß╗ùi hay kh├┤ng.
\`\`\`python
try:
    f = open("data.txt")
finally:
    f.close()
\`\`\`

## B├ái tß║¡p
1. ─Éß╗ìc sß╗æ nguy├¬n ─æß║┐n khi nhß║¡p ─æ├║ng
2. ─Éß╗ìc file, in th├┤ng b├ío lß╗ùi nß║┐u file kh├┤ng tß╗ôn tß║íi
`),
  L(45, 9, 5, 'B├ái 5: Mini app sß╗ò li├¬n lß║íc', 'CRUD vß╗¢i file CSV', 'hard', `
\`\`\`python
import csv

FILE = "danh_ba.csv"

def them(ten, sdt):
    with open(FILE, "a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([ten, sdt])

def liet_ke():
    try:
        with open(FILE, encoding="utf-8") as f:
            for ten, sdt in csv.reader(f):
                print(ten, sdt)
    except FileNotFoundError:
        print("Ch╞░a c├│ ai")
\`\`\`

## B├ái tß║¡p
1. Th├¬m chß╗⌐c n─âng t├¼m theo t├¬n
2. Th├¬m chß╗⌐c n─âng xo├í theo sß╗æ ─æiß╗çn thoß║íi
`),

  // ΓöÇΓöÇΓöÇ Cß║ñP 10: THUß║¼T TO├üN ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  L(46, 10, 1, 'B├ái 1: T├¼m kiß║┐m tuyß║┐n t├¡nh', 'Linear search', 'easy', `
\`\`\`python
def tim(arr, x):
    for i, v in enumerate(arr):
        if v == x:
            return i
    return -1
\`\`\`

## ─Éß╗Ö phß╗⌐c tß║íp
- Tß╗æt nhß║Ñt O(1) (phß║ºn tß╗¡ ─æß║ºu)
- Tß╗ç nhß║Ñt O(n)

## B├ái tß║¡p
1. T├¼m vß╗ï tr├¡ ─æß║ºu ti├¬n cß╗ºa x trong list
2. ─Éß║┐m sß╗æ lß║ºn x xuß║Ñt hiß╗çn
`),
  L(47, 10, 2, 'B├ái 2: T├¼m kiß║┐m nhß╗ï ph├ón', 'Binary search tr├¬n d├úy ─æ├ú sß║»p', 'medium', `
\`\`\`python
def bsearch(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2
        if arr[m] == x:
            return m
        elif arr[m] < x:
            l = m + 1
        else:
            r = m - 1
    return -1
\`\`\`

## Y├¬u cß║ºu
Mß║úng phß║úi **─æ├ú sß║»p xß║┐p**.

## ─Éß╗Ö phß╗⌐c tß║íp
- O(log n)

## B├ái tß║¡p
1. C├ái binary search ─æß╗ç quy
2. T├¼m phß║ºn tß╗¡ ─æß║ºu ti├¬n >= x
`),
  L(48, 10, 3, 'B├ái 3: Sß║»p xß║┐p nß╗òi bß╗ìt', 'Bubble sort', 'medium', `
\`\`\`python
def bubble(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
\`\`\`

## ─Éß╗Ö phß╗⌐c tß║íp
- O(n┬▓) trung b├¼nh
- O(n) tß╗æt nhß║Ñt nß║┐u ─æ├ú sß║»p

## B├ái tß║¡p
1. C├ái selection sort
2. C├ái insertion sort
`),
  L(49, 10, 4, 'B├ái 4: B├ái to├ín quy hoß║ích ─æß╗Öng ─æ╞ín giß║ún', 'Memoization', 'hard', `
\`\`\`python
memo = {}

def fib(n):
    if n < 2:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]
\`\`\`

## Hoß║╖c bottom-up
\`\`\`python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\`

## B├ái tß║¡p
1. ─Éß║┐m sß╗æ c├ích leo cß║ºu thang n bß║¡c, mß╗ùi b╞░ß╗¢c 1 hoß║╖c 2
2. Tß╗òng lß╗¢n nhß║Ñt c├íc phß║ºn tß╗¡ kh├┤ng kß╗ü nhau
`),
  L(50, 10, 5, 'B├ái 5: Tß╗òng kß║┐t v├á project nhß╗Å', '├üp dß╗Ñng tß╗òng hß╗úp', 'hard', `
## Y├¬u cß║ºu
X├óy dß╗▒ng ch╞░╞íng tr├¼nh **quß║ún l├╜ ─æiß╗âm thi tß╗æt nghiß╗çp** cho 1 lß╗¢p:
1. ─Éß╗ìc danh s├ích hß╗ìc sinh tß╗½ file CSV (t├¬n, ─æiß╗âm 6 m├┤n)
2. T├¡nh tß╗òng, trung b├¼nh, ph├ón loß║íi G/K/TB/Y
3. Sß║»p xß║┐p theo ─æiß╗âm trung b├¼nh giß║úm dß║ºn
4. Cho ph├⌐p tra cß╗⌐u ─æiß╗âm theo t├¬n
5. Xuß║Ñt b├ío c├ío ra file mß╗¢i

## Gß╗úi ├╜ ph├ón chia
- \`doc_du_lieu(file)\` ΓåÆ list dict
- \`tinh_tb(hs)\` ΓåÆ float
- \`xep_loai(tb)\` ΓåÆ str
- \`xuat_bao_cao(hs_list, file_out)\`

## Tß╗▒ ─æ├ính gi├í
- Γ£à Code chß║íy kh├┤ng lß╗ùi
- Γ£à T├ích h├ám r├╡ r├áng
- Γ£à C├│ comment giß║úi th├¡ch
- Γ£à D├╣ng try/except cho file
- Γ£à Test vß╗¢i ├¡t nhß║Ñt 5 hß╗ìc sinh

Ch├║c bß║ín ho├án th├ánh tß╗æt v├á sß║╡n s├áng cho kß╗│ thi tß╗æt nghiß╗çp! ≡ƒÄô
`),
];

export function getLessonContent(id: number): LessonContent | null {
  return LESSONS.find((l) => l.id === id) ?? null;
}

export function getLessonsByLevel(courseId: number): LessonContent[] {
  return LESSONS.filter((l) => l.course_id === courseId).sort(
    (a, b) => a.order_index - b.order_index
  );
}
