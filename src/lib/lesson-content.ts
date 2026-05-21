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
## Đọc dữ liệu từ bàn phím
Hàm \`input()\` luôn trả về **chuỗi**. Muốn dùng làm số thì cần ép kiểu.
\`\`\`python
ten = input("Nhập tên: ")
tuoi = int(input("Nhập tuổi: "))
print(f"Xin chào {ten}, {tuoi} tuổi")
\`\`\`

## In dữ liệu
\`\`\`python
print("Xin chào", ten)              # ngăn cách dấu cách
print("a", "b", sep="-")            # a-b
print("không xuống dòng", end=" ")  # giữ nguyên dòng
print(f"{ten} có {tuoi} tuổi")      # f-string
\`\`\`

## f-string định dạng số
\`\`\`python
pi = 3.14159
print(f"{pi:.2f}")  # 3.14
\`\`\`

## Bài tập tự luyện
1. Viết chương trình hỏi tên người dùng và in ra "Xin chào, <tên>"
2. Đọc 2 số nguyên rồi in tổng của chúng
`),
  L(4, 1, 4, 'Bài 4: Toán tử số học và gán', 'Phép toán + - * / // % ** và phép gán', 'easy', `
## Toán tử số học
| Toán tử | Tác dụng | Ví dụ | Kết quả |
|---|---|---|---|
| \`+\` | cộng | \`5 + 2\` | 7 |
| \`-\` | trừ | \`5 - 2\` | 3 |
| \`*\` | nhân | \`5 * 2\` | 10 |
| \`/\` | chia | \`5 / 2\` | 2.5 |
| \`//\` | chia lấy nguyên | \`5 // 2\` | 2 |
| \`%\` | chia lấy dư | \`5 % 2\` | 1 |
| \`**\` | luỹ thừa | \`5 ** 2\` | 25 |

## Toán tử gán rút gọn
\`\`\`python
x = 10
x += 5   # x = 15
x -= 3   # x = 12
x *= 2   # x = 24
x //= 5  # x = 4
\`\`\`

## Lưu ý ưu tiên phép toán
Tương tự toán học: \`** > * / // % > + -\`. Dùng dấu ngoặc khi cần.

## Bài tập tự luyện
1. Tính \`(3 + 4) * 5\`, sau đó so sánh với \`3 + 4 * 5\`
2. Cho 2 số a, b. In thương và phần dư khi chia a cho b
`),
  L(5, 1, 5, 'Bài 5: Chuỗi ký tự cơ bản', 'Khai báo, nối, slicing, format', 'easy', `
## Khai báo chuỗi
\`\`\`python
s1 = "Hà Nội"
s2 = 'Việt Nam'
s3 = """Chuỗi
nhiều dòng"""
\`\`\`

## Nối và nhân chuỗi
\`\`\`python
print("Xin " + "chào")     # Xin chào
print("ha" * 3)             # hahaha
\`\`\`

## Slicing s[start:end:step]
\`\`\`python
s = "Python"
print(s[0])    # P
print(s[1:4])  # yth
print(s[::-1]) # nohtyP (đảo ngược)
\`\`\`

## Một số phương thức hữu ích
\`\`\`python
"Hello".lower()      # 'hello'
"hello".upper()      # 'HELLO'
"  hi  ".strip()     # 'hi'
"a,b,c".split(",")   # ['a', 'b', 'c']
"-".join(["a","b"])  # 'a-b'
\`\`\`

## Bài tập tự luyện
1. Đọc một chuỗi và in chuỗi đảo ngược
2. Đếm số ký tự "a" trong chuỗi đầu vào
`),

  // ─── CẤP 2: BIỂU THỨC VÀ TOÁN TỬ ─────────────────────────────────────────
  L(6, 2, 1, 'Bài 1: Biểu thức và phép so sánh', '<, <=, >, >=, ==, !=', 'easy', `
## Biểu thức là gì?
**Biểu thức** là tổ hợp các giá trị, biến và toán tử cho ra một giá trị mới.

## Toán tử so sánh
Trả về \`True\` hoặc \`False\`.
| Toán tử | Ý nghĩa |
|---|---|
| \`==\` | bằng |
| \`!=\` | khác |
| \`<\`, \`>\`, \`<=\`, \`>=\` | so sánh |

\`\`\`python
print(5 == 5)    # True
print(3 != 3)    # False
print("a" < "b") # True (so sánh theo Unicode)
\`\`\`

## Bài tập
1. Đọc 2 số, in ra số nào lớn hơn
2. Kiểm tra một số có nằm trong [1, 100]
`),
  L(7, 2, 2, 'Bài 2: Toán tử logic and / or / not', 'Kết hợp nhiều điều kiện', 'easy', `
## Bảng chân trị
| a | b | a and b | a or b | not a |
|---|---|---|---|---|
| T | T | T | T | F |
| T | F | F | T | F |
| F | T | F | T | T |
| F | F | F | F | T |

\`\`\`python
tuoi = 17
if tuoi >= 16 and tuoi <= 18:
    print("Là học sinh THPT")
\`\`\`

## Đoản mạch (short-circuit)
- \`a and b\`: nếu a sai thì không cần xét b
- \`a or b\`: nếu a đúng thì không cần xét b

## Bài tập
1. Kiểm tra số n có phải số chẵn dương
2. Kiểm tra điểm thi: đỗ nếu trung bình >= 5 và không môn nào < 3
`),
  L(8, 2, 3, 'Bài 3: Ép kiểu (type casting)', 'int() float() str() bool()', 'easy', `
## Vì sao cần ép kiểu?
\`input()\` luôn trả \`str\`. Khi cần tính toán bạn phải ép sang \`int\` hoặc \`float\`.

\`\`\`python
n = int(input("Nhập số: "))
giam_gia = float(input("Giảm giá: ")) / 100
\`\`\`

## Các hàm ép kiểu
\`\`\`python
int("12")     # 12
int(3.7)      # 3 (cắt phần thập phân)
float("3.14") # 3.14
str(42)       # '42'
bool(0)       # False
bool("")      # False
bool("a")     # True
\`\`\`

## Lưu ý
- \`int("3.5")\` sẽ lỗi vì chuỗi không phải số nguyên
- Dùng \`int(float("3.5"))\` để chuyển an toàn

## Bài tập
1. Đọc 1 chuỗi, kiểm tra nó có thể chuyển thành số nguyên không
2. Đọc tuổi và in xem có phải tuổi vị thành niên (12-17)
`),
  L(9, 2, 4, 'Bài 4: Hàm toán học chuẩn', 'abs, round, pow, math.sqrt, math.pi', 'easy', `
## Hàm có sẵn
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

## Bài tập
1. Tính diện tích hình tròn bán kính r (dùng math.pi)
2. Cho a, b, c. In nghiệm x = (-b + sqrt(b^2 - 4ac)) / 2a
`),
  L(10, 2, 5, 'Bài 5: Toán tử trên chuỗi', 'in, count, find, replace', 'easy', `
## Kiểm tra chứa với in
\`\`\`python
"py" in "python"     # True
"x" not in "python"  # True
\`\`\`

## Đếm và tìm
\`\`\`python
"banana".count("a")     # 3
"hello".find("l")        # 2 (vị trí đầu tiên)
"hello".find("z")        # -1 (không tìm thấy)
\`\`\`

## Thay thế
\`\`\`python
"abc".replace("a", "X")   # 'Xbc'
\`\`\`

## Bài tập
1. Đếm số nguyên âm trong chuỗi đầu vào
2. Thay tất cả khoảng trắng trong chuỗi bằng dấu gạch dưới
`),

  // ─── CẤP 3: CÂU LỆNH ĐIỀU KIỆN ───────────────────────────────────────────
  L(11, 3, 1, 'Bài 1: Câu lệnh if', 'Cú pháp và indent', 'easy', `
## Cú pháp
\`\`\`python
if điều_kiện:
    # khối lệnh khi đúng
\`\`\`

\`\`\`python
n = int(input())
if n > 0:
    print("Số dương")
\`\`\`

## Indent (thụt đầu dòng)
Python dùng **indent** thay vì \`{ }\`. Quy ước 4 dấu cách. Sai indent = lỗi.

## Bài tập
1. Cho điểm trung bình, nếu >= 5 in "Đỗ"
2. Cho 1 số, nếu là số chẵn dương in "OK"
`),
  L(12, 3, 2, 'Bài 2: if / else', 'Hai nhánh đối lập', 'easy', `
\`\`\`python
n = int(input())
if n % 2 == 0:
    print("CHAN")
else:
    print("LE")
\`\`\`

## Kết hợp nhiều điều kiện
Có thể đặt biểu thức phức tạp với \`and\`, \`or\`:
\`\`\`python
if 0 < n < 100 and n % 2 == 0:
    print("Số chẵn trong [1, 99]")
\`\`\`

## Bài tập
1. Cho tuổi, in "Trẻ em" nếu < 16, ngược lại in "Người lớn"
2. Kiểm tra năm có phải năm nhuận: chia hết 4 và (không chia hết 100 hoặc chia hết 400)
`),
  L(13, 3, 3, 'Bài 3: if / elif / else', 'Nhiều nhánh', 'easy', `
\`\`\`python
diem = float(input())
if diem >= 9:
    xep_loai = "Xuất sắc"
elif diem >= 7:
    xep_loai = "Khá"
elif diem >= 5:
    xep_loai = "Trung bình"
else:
    xep_loai = "Yếu"
print(xep_loai)
\`\`\`

## Lưu ý
- Chỉ một nhánh được chạy
- Thứ tự kiểm tra rất quan trọng

## Bài tập
1. Cho tháng, in số ngày của tháng đó (xét 28/29 cho tháng 2)
2. Cho điểm 3 môn, tính trung bình và xếp loại
`),
  L(14, 3, 4, 'Bài 4: Lồng if', 'if trong if', 'medium', `
\`\`\`python
diem = float(input())
hanh_kiem = input()  # tot/kha/trung-binh

if diem >= 8:
    if hanh_kiem == "tot":
        print("Học sinh giỏi")
    else:
        print("Cần cố gắng hạnh kiểm")
else:
    print("Cần cố gắng học tập")
\`\`\`

## Mẹo
Có thể thay lồng if bằng \`and\` để dễ đọc hơn:
\`\`\`python
if diem >= 8 and hanh_kiem == "tot":
    ...
\`\`\`

## Bài tập
1. Phân loại tam giác từ 3 cạnh: đều, cân, vuông, thường
2. Cho năm và tháng, in số ngày của tháng đó
`),
  L(15, 3, 5, 'Bài 5: Toán tử ba ngôi', 'value_if_true if cond else value_if_false', 'medium', `
## Cú pháp
\`\`\`python
ket_qua = "CHAN" if n % 2 == 0 else "LE"
print(ket_qua)
\`\`\`

Hoàn toàn tương đương với:
\`\`\`python
if n % 2 == 0:
    ket_qua = "CHAN"
else:
    ket_qua = "LE"
\`\`\`

## Khi nào dùng?
- Khi gán biến đơn giản dựa trên điều kiện
- Khi muốn code ngắn gọn

## Bài tập
1. Cho 2 số a, b. Dùng toán tử ba ngôi in số lớn hơn
2. Đọc tuổi, in "Đủ tuổi" / "Chưa đủ tuổi" lái xe (>= 18)
`),

  // ─── CẤP 4: VÒNG LẶP ─────────────────────────────────────────────────────
  L(16, 4, 1, 'Bài 1: Vòng lặp for với range', 'range(n), range(a,b), range(a,b,step)', 'easy', `
## Cú pháp
\`\`\`python
for i in range(5):       # 0 1 2 3 4
    print(i)

for i in range(1, 11):   # 1..10
    print(i)

for i in range(10, 0, -1):  # 10..1
    print(i)
\`\`\`

## In bảng cửu chương
\`\`\`python
n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
\`\`\`

## Bài tập
1. In các số từ 1..N
2. Tính tổng 1 + 2 + ... + N
`),
  L(17, 4, 2, 'Bài 2: Vòng lặp while', 'Lặp khi điều kiện đúng', 'easy', `
\`\`\`python
n = int(input())
i = 1
tong = 0
while i <= n:
    tong += i
    i += 1
print(tong)
\`\`\`

## Khi nào dùng while thay for?
- Khi không biết trước số lần lặp
- Khi điều kiện kết thúc phụ thuộc dữ liệu nhập

## Lưu ý
Phải đảm bảo điều kiện sẽ trở thành False để tránh **vòng lặp vô tận**.

## Bài tập
1. Đọc số nguyên đến khi gặp 0, in tổng các số đó (không kể 0)
2. Tìm số bước cần để chia n cho 2 đến khi n = 1 (ví dụ n=8 → 3 bước)
`),
  L(18, 4, 3, 'Bài 3: break và continue', 'Thoát sớm và bỏ qua', 'medium', `
## break - thoát vòng lặp
\`\`\`python
for i in range(100):
    if i * i > 50:
        break
    print(i)
\`\`\`

## continue - bỏ qua lượt hiện tại
\`\`\`python
for i in range(10):
    if i % 2 == 0:
        continue   # bỏ qua số chẵn
    print(i)
\`\`\`

## Bài tập
1. Đọc N số. Dừng nhập khi gặp số âm
2. In các số trong [1, 100] không chia hết cho 7
`),
  L(19, 4, 4, 'Bài 4: Vòng lặp lồng', 'For trong for', 'medium', `
## In ma trận sao *
\`\`\`python
n = int(input())
for i in range(1, n + 1):
    for j in range(i):
        print("*", end="")
    print()
\`\`\`

## Tích chéo
\`\`\`python
for i in range(2, 5):
    for j in range(2, 5):
        print(f"{i} * {j} = {i * j}")
\`\`\`

## Bài tập
1. In bảng nhân 1..9
2. Đếm số cặp (i, j) sao cho i + j = N với i, j thuộc [1, N]
`),
  L(20, 4, 5, 'Bài 5: Phép tổng / tích / đếm', 'Mẫu accumulator', 'medium', `
## Mẫu cộng dồn
\`\`\`python
tong = 0
for i in range(1, n + 1):
    tong += i
\`\`\`

## Mẫu nhân dồn
\`\`\`python
tich = 1
for i in range(1, n + 1):
    tich *= i  # giai thừa n!
\`\`\`

## Mẫu đếm
\`\`\`python
dem = 0
for ch in s:
    if ch in "aeiou":
        dem += 1
\`\`\`

## Bài tập
1. Tính n!
2. Đếm số ước số của n
`),

  // ─── CẤP 5: HÀM TRONG PYTHON ─────────────────────────────────────────────
  L(21, 5, 1, 'Bài 1: Định nghĩa và gọi hàm', 'def, return', 'easy', `
\`\`\`python
def chao(ten):
    print(f"Xin chào {ten}")

chao("An")
chao("Bình")
\`\`\`

## Hàm có giá trị trả về
\`\`\`python
def cong(a, b):
    return a + b

print(cong(3, 5))  # 8
\`\`\`

## Lợi ích của hàm
- Tránh lặp lại code
- Dễ bảo trì và đọc
- Có thể test riêng từng hàm

## Bài tập
1. Viết hàm \`tinh_giai_thua(n)\`
2. Viết hàm \`la_so_nguyen_to(n)\` trả về True/False
`),
  L(22, 5, 2, 'Bài 2: Tham số mặc định', 'def f(x, y=0)', 'easy', `
\`\`\`python
def chao(ten, loi="Xin chào"):
    print(f"{loi}, {ten}")

chao("An")             # Xin chào, An
chao("Bình", "Hello")  # Hello, Bình
\`\`\`

## Tham số có tên
\`\`\`python
chao(loi="Hi", ten="Cường")
\`\`\`

## Lưu ý
Tham số mặc định nên là **immutable** (số, chuỗi). Tránh dùng list/dict mặc định vì sẽ chia sẻ giữa các lần gọi.

## Bài tập
1. Hàm \`luy_thua(co_so, mu=2)\` mặc định bình phương
2. Hàm \`tao_chao(ten, gio=8)\` chào theo giờ (sáng/chiều/tối)
`),
  L(23, 5, 3, 'Bài 3: Phạm vi biến', 'Biến cục bộ và toàn cục', 'medium', `
## Biến cục bộ
Biến khai báo bên trong hàm chỉ tồn tại trong hàm.
\`\`\`python
def f():
    x = 10  # cục bộ
    print(x)

f()
# print(x)  # NameError
\`\`\`

## Biến toàn cục
\`\`\`python
dem = 0

def tang():
    global dem
    dem += 1

tang()
tang()
print(dem)  # 2
\`\`\`

## Lưu ý
Hạn chế dùng \`global\`. Tốt hơn là **trả về giá trị** từ hàm.

## Bài tập
1. Viết hàm đếm số lần một ký tự xuất hiện trong chuỗi
2. Viết hàm \`hoan_doi(a, b)\` trả về tuple (b, a)
`),
  L(24, 5, 4, 'Bài 4: Đệ quy cơ bản', 'Hàm tự gọi chính nó', 'medium', `
\`\`\`python
def giai_thua(n):
    if n == 0:
        return 1
    return n * giai_thua(n - 1)

print(giai_thua(5))  # 120
\`\`\`

## Yêu cầu của đệ quy
1. **Trường hợp dừng** (base case)
2. **Lời gọi đệ quy** tiến gần hơn về base case

## Fibonacci đệ quy
\`\`\`python
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
\`\`\`

⚠️ Đệ quy không nhớ rất chậm với n lớn. Nên dùng vòng lặp hoặc memoization.

## Bài tập
1. Hàm tính tổng 1 + 2 + ... + n bằng đệ quy
2. Hàm đếm số chữ số của n
`),
  L(25, 5, 5, 'Bài 5: Hàm lambda và map/filter', 'Hàm vô danh', 'medium', `
## Lambda
\`\`\`python
binh_phuong = lambda x: x * x
print(binh_phuong(5))  # 25
\`\`\`

## Dùng với map / filter
\`\`\`python
arr = [1, 2, 3, 4, 5]
print(list(map(lambda x: x * 2, arr)))      # [2, 4, 6, 8, 10]
print(list(filter(lambda x: x % 2 == 0, arr)))  # [2, 4]
\`\`\`

## sorted với key
\`\`\`python
hs = [("An", 8), ("Bình", 9), ("Cường", 7)]
print(sorted(hs, key=lambda x: x[1], reverse=True))
\`\`\`

## Bài tập
1. Sắp xếp danh sách chuỗi theo độ dài
2. Lọc các số > 0 trong list nhập từ bàn phím
`),

  // ─── CẤP 6: DANH SÁCH VÀ TUPLE ───────────────────────────────────────────
  L(26, 6, 1, 'Bài 1: List cơ bản', 'Khai báo, truy cập, cập nhật', 'easy', `
## Khai báo
\`\`\`python
arr = [1, 2, 3]
arr2 = ["a", "b", "c"]
arr3 = []
\`\`\`

## Truy cập
\`\`\`python
arr[0]    # 1 (phần tử đầu)
arr[-1]   # 3 (phần tử cuối)
arr[1] = 99  # gán
\`\`\`

## Slicing
\`\`\`python
arr = [10, 20, 30, 40, 50]
arr[1:3]   # [20, 30]
arr[:3]    # [10, 20, 30]
arr[::2]   # [10, 30, 50]
\`\`\`

## Bài tập
1. Đọc N số rồi in ra theo thứ tự ngược lại
2. In phần tử lớn nhất và nhỏ nhất của list
`),
  L(27, 6, 2, 'Bài 2: Phương thức list', 'append, insert, remove, pop, sort', 'easy', `
\`\`\`python
arr = [3, 1, 4, 1, 5]

arr.append(9)     # [3, 1, 4, 1, 5, 9]
arr.insert(0, 0)  # [0, 3, 1, 4, 1, 5, 9]
arr.remove(1)     # bỏ phần tử đầu tiên có giá trị 1
arr.pop()         # bỏ phần tử cuối, trả về nó
arr.sort()        # sắp xếp tăng dần
arr.sort(reverse=True)
arr.reverse()
\`\`\`

## Một số hàm hữu ích
\`\`\`python
sum(arr)
len(arr)
min(arr)
max(arr)
\`\`\`

## Bài tập
1. Đọc N số, đếm số chẵn
2. Đọc N số, in tổng và trung bình
`),
  L(28, 6, 3, 'Bài 3: List comprehension', '[expr for x in iterable if cond]', 'medium', `
\`\`\`python
binh_phuong = [x * x for x in range(1, 6)]
# [1, 4, 9, 16, 25]

chan = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, ..., 18]
\`\`\`

## Lợi ích
- Ngắn gọn, dễ đọc
- Thường nhanh hơn vòng for thông thường

## Lưu ý
Đừng nhồi nhét quá nhiều logic. Khi phức tạp nên dùng vòng for thường để dễ đọc.

## Bài tập
1. Tạo list các số chia hết cho 3 trong [1, 50] bằng comprehension
2. Tạo list bình phương các số nguyên tố < 30
`),
  L(29, 6, 4, 'Bài 4: Tuple và unpacking', 'Tuple bất biến, hoán đổi biến', 'medium', `
## Tuple - "list bất biến"
\`\`\`python
toa_do = (3, 4)
toa_do[0] = 5  # TypeError, không gán được
\`\`\`

## Unpacking
\`\`\`python
a, b = 10, 20
a, b = b, a   # hoán đổi

ten, tuoi = ("An", 17)
\`\`\`

## Trả về nhiều giá trị
\`\`\`python
def chia_du(a, b):
    return a // b, a % b

q, r = chia_du(17, 5)
\`\`\`

## Bài tập
1. Viết hàm trả về cả max và min của list
2. Hoán đổi 2 biến a, b trong 1 dòng
`),
  L(30, 6, 5, 'Bài 5: Duyệt và lọc list', 'Mẫu thuật toán cơ bản trên list', 'medium', `
## Tìm phần tử
\`\`\`python
def tim(arr, x):
    for i, v in enumerate(arr):
        if v == x:
            return i
    return -1
\`\`\`

## Đếm
\`\`\`python
def dem_chan(arr):
    return sum(1 for x in arr if x % 2 == 0)
\`\`\`

## Tổng / trung bình
\`\`\`python
trung_binh = sum(arr) / len(arr) if arr else 0
\`\`\`

## Bài tập
1. Đọc N số, in chỉ số của phần tử lớn nhất
2. Đọc N số, in các số > trung bình của list
`),

  // ─── CẤP 7: CHUỖI KÝ TỰ ──────────────────────────────────────────────────
  L(31, 7, 1, 'Bài 1: Duyệt chuỗi', 'for ch in s', 'easy', `
\`\`\`python
s = input()
for ch in s:
    print(ch.upper())
\`\`\`

## Kiểm tra phân loại ký tự
\`\`\`python
"a".isalpha()   # True
"3".isdigit()   # True
"a3".isalnum()  # True
" ".isspace()   # True
\`\`\`

## Bài tập
1. Đếm số chữ cái và số chữ số trong chuỗi
2. In chuỗi mà mỗi ký tự được lặp lại 2 lần
`),
  L(32, 7, 2, 'Bài 2: Tách và ghép chuỗi', 'split, join', 'easy', `
\`\`\`python
"a,b,c".split(",")     # ['a', 'b', 'c']
"  hi  bro  ".split()  # ['hi', 'bro'] (tách theo khoảng trắng)

" - ".join(["a", "b"]) # 'a - b'
\`\`\`

## Đọc nhiều số trong 1 dòng
\`\`\`python
arr = list(map(int, input().split()))
\`\`\`

## Bài tập
1. Đọc dòng "tên,tuổi" và in ra tách rời
2. Tổng các số trong dòng nhập
`),
  L(33, 7, 3, 'Bài 3: Xử lý in/out chuỗi', 'format, f-string nâng cao', 'medium', `
\`\`\`python
ten = "An"
diem = 8.567
print(f"{ten:>10} - {diem:>5.2f}")
\`\`\`

## Cờ định dạng
| Cờ | Tác dụng |
|---|---|
| \`>n\` | căn phải, độ rộng n |
| \`<n\` | căn trái |
| \`^n\` | căn giữa |
| \`.kf\` | k chữ số thập phân |

## Bài tập
1. In bảng điểm có cột thẳng hàng
2. In số có đúng 3 chữ số (đệm số 0 phía trước)
`),
  L(34, 7, 4, 'Bài 4: Chuỗi đối xứng (palindrome)', 'Kiểm tra chuỗi đảo == chính nó', 'medium', `
\`\`\`python
s = input().lower().replace(" ", "")
if s == s[::-1]:
    print("YES")
else:
    print("NO")
\`\`\`

## Mở rộng
- Bỏ dấu câu trước khi kiểm tra
- Tìm chuỗi con đối xứng dài nhất

## Bài tập
1. Đếm số chuỗi con đối xứng độ dài 3 trong chuỗi đầu vào
2. Cho list chuỗi, in các chuỗi đối xứng
`),
  L(35, 7, 5, 'Bài 5: Mã hoá / giải mã đơn giản', 'Caesar cipher', 'hard', `
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

## ord() và chr()
- \`ord("A")\` = 65
- \`chr(65)\` = "A"

## Bài tập
1. Viết hàm giải mã Caesar
2. Đếm tần suất ký tự trong chuỗi (bỏ qua hoa thường)
`),

  // ─── CẤP 8: TỪ ĐIỂN VÀ TẬP HỢP ───────────────────────────────────────────
  L(36, 8, 1, 'Bài 1: Dictionary cơ bản', 'Khai báo, get, set', 'easy', `
\`\`\`python
hs = {"ten": "An", "tuoi": 17, "diem": 8.5}

print(hs["ten"])      # An
hs["tuoi"] = 18
hs["lop"] = "12A"
del hs["diem"]
\`\`\`

## get() an toàn
\`\`\`python
hs.get("dia_chi")           # None
hs.get("dia_chi", "N/A")    # 'N/A'
\`\`\`

## Bài tập
1. Tạo dict điểm 3 môn rồi in
2. Cho dict học sinh, đổi tuổi từ 17 thành 18
`),
  L(37, 8, 2, 'Bài 2: Duyệt dictionary', 'keys, values, items', 'easy', `
\`\`\`python
hs = {"An": 8, "Bình": 9, "Cường": 7}

for ten in hs:
    print(ten)

for ten, diem in hs.items():
    print(f"{ten}: {diem}")

print(list(hs.values()))  # [8, 9, 7]
\`\`\`

## Đếm tần suất bằng dict
\`\`\`python
dem = {}
for ch in "banana":
    dem[ch] = dem.get(ch, 0) + 1
print(dem)   # {'b': 1, 'a': 3, 'n': 2}
\`\`\`

## Bài tập
1. Đọc N từ, in tần suất xuất hiện
2. Tìm key có value lớn nhất
`),
  L(38, 8, 3, 'Bài 3: Set', 'Tập hợp không trùng lặp', 'medium', `
\`\`\`python
s = {1, 2, 3, 2, 1}
print(s)  # {1, 2, 3}

s.add(4)
s.remove(1)
\`\`\`

## Phép toán tập hợp
\`\`\`python
A = {1, 2, 3}
B = {3, 4, 5}
A | B   # hợp {1, 2, 3, 4, 5}
A & B   # giao {3}
A - B   # hiệu {1, 2}
\`\`\`

## Loại bỏ trùng trong list
\`\`\`python
arr = [1, 2, 1, 3, 2]
unique = list(set(arr))
\`\`\`

## Bài tập
1. Đếm số ký tự khác nhau trong chuỗi
2. Cho 2 list, in các phần tử có ở cả hai
`),
  L(39, 8, 4, 'Bài 4: Bài toán đếm với dict', 'Counter pattern', 'medium', `
\`\`\`python
from collections import Counter

c = Counter("abracadabra")
print(c)             # Counter({'a': 5, 'b': 2, 'r': 2, ...})
print(c.most_common(3))  # [('a', 5), ('b', 2), ('r', 2)]
\`\`\`

## Bài tập
1. Đếm tần suất các từ trong câu (tách theo khoảng trắng)
2. Tìm ký tự xuất hiện nhiều nhất trong chuỗi
`),
  L(40, 8, 5, 'Bài 5: Quản lý danh sách học sinh', 'Dùng dict + list kết hợp', 'medium', `
\`\`\`python
hs_list = [
    {"ten": "An", "diem": 8.5},
    {"ten": "Bình", "diem": 7.2},
    {"ten": "Cường", "diem": 9.0},
]

# Sắp theo điểm
hs_sorted = sorted(hs_list, key=lambda x: x["diem"], reverse=True)
for hs in hs_sorted:
    print(hs["ten"], hs["diem"])
\`\`\`

## Lọc
\`\`\`python
gioi = [hs for hs in hs_list if hs["diem"] >= 8]
\`\`\`

## Bài tập
1. Tính trung bình điểm cả lớp
2. Phân loại học sinh thành G/K/TB/Y
`),

  // ─── CẤP 9: TỆP TIN ──────────────────────────────────────────────────────
  L(41, 9, 1, 'Bài 1: Đọc file văn bản', 'open(), read(), readlines()', 'easy', `
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    noi_dung = f.read()
print(noi_dung)
\`\`\`

## Đọc theo dòng
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
\`\`\`

## Vì sao dùng with
- Tự động đóng file
- An toàn khi gặp lỗi

## Bài tập
1. Đọc file, đếm số dòng
2. Đọc file, đếm số từ
`),
  L(42, 9, 2, 'Bài 2: Ghi file văn bản', 'mode "w" và "a"', 'easy', `
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Xin chào\\n")
    f.write("Hôm nay học Python\\n")
\`\`\`

## Mode
- \`"w"\`: ghi mới (xoá nội dung cũ)
- \`"a"\`: ghi thêm
- \`"r"\`: chỉ đọc

## Bài tập
1. Đọc N số rồi ghi vào file output.txt
2. Ghi log thời gian khởi động chương trình
`),
  L(43, 9, 3, 'Bài 3: File CSV', 'Module csv', 'medium', `
\`\`\`python
import csv

with open("hs.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)  # ['An', '17', '8.5']

# Ghi
with open("out.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Tên", "Tuổi", "Điểm"])
    writer.writerow(["An", 17, 8.5])
\`\`\`

## DictReader / DictWriter
\`\`\`python
reader = csv.DictReader(f)
for row in reader:
    print(row["Tên"], row["Điểm"])
\`\`\`

## Bài tập
1. Đọc CSV điểm, tính trung bình
2. Ghi danh sách học sinh ra CSV
`),
  L(44, 9, 4, 'Bài 4: Bắt lỗi try/except', 'Xử lý ngoại lệ', 'medium', `
\`\`\`python
try:
    n = int(input())
    print(10 / n)
except ValueError:
    print("Phải nhập số")
except ZeroDivisionError:
    print("Không chia được cho 0")
except Exception as e:
    print(f"Lỗi: {e}")
\`\`\`

## finally
Khối luôn chạy dù có lỗi hay không.
\`\`\`python
try:
    f = open("data.txt")
finally:
    f.close()
\`\`\`

## Bài tập
1. Đọc số nguyên đến khi nhập đúng
2. Đọc file, in thông báo lỗi nếu file không tồn tại
`),
  L(45, 9, 5, 'Bài 5: Mini app sổ liên lạc', 'CRUD với file CSV', 'hard', `
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
        print("Chưa có ai")
\`\`\`

## Bài tập
1. Thêm chức năng tìm theo tên
2. Thêm chức năng xoá theo số điện thoại
`),

  // ─── CẤP 10: THUẬT TOÁN ──────────────────────────────────────────────────
  L(46, 10, 1, 'Bài 1: Tìm kiếm tuyến tính', 'Linear search', 'easy', `
\`\`\`python
def tim(arr, x):
    for i, v in enumerate(arr):
        if v == x:
            return i
    return -1
\`\`\`

## Độ phức tạp
- Tốt nhất O(1) (phần tử đầu)
- Tệ nhất O(n)

## Bài tập
1. Tìm vị trí đầu tiên của x trong list
2. Đếm số lần x xuất hiện
`),
  L(47, 10, 2, 'Bài 2: Tìm kiếm nhị phân', 'Binary search trên dãy đã sắp', 'medium', `
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

## Yêu cầu
Mảng phải **đã sắp xếp**.

## Độ phức tạp
- O(log n)

## Bài tập
1. Cài binary search đệ quy
2. Tìm phần tử đầu tiên >= x
`),
  L(48, 10, 3, 'Bài 3: Sắp xếp nổi bọt', 'Bubble sort', 'medium', `
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

## Độ phức tạp
- O(n²) trung bình
- O(n) tốt nhất nếu đã sắp

## Bài tập
1. Cài selection sort
2. Cài insertion sort
`),
  L(49, 10, 4, 'Bài 4: Bài toán quy hoạch động đơn giản', 'Memoization', 'hard', `
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

## Hoặc bottom-up
\`\`\`python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\`

## Bài tập
1. Đếm số cách leo cầu thang n bậc, mỗi bước 1 hoặc 2
2. Tổng lớn nhất các phần tử không kề nhau
`),
  L(50, 10, 5, 'Bài 5: Tổng kết và project nhỏ', 'Áp dụng tổng hợp', 'hard', `
## Yêu cầu
Xây dựng chương trình **quản lý điểm thi tốt nghiệp** cho 1 lớp:
1. Đọc danh sách học sinh từ file CSV (tên, điểm 6 môn)
2. Tính tổng, trung bình, phân loại G/K/TB/Y
3. Sắp xếp theo điểm trung bình giảm dần
4. Cho phép tra cứu điểm theo tên
5. Xuất báo cáo ra file mới

## Gợi ý phân chia
- \`doc_du_lieu(file)\` → list dict
- \`tinh_tb(hs)\` → float
- \`xep_loai(tb)\` → str
- \`xuat_bao_cao(hs_list, file_out)\`

## Tự đánh giá
- ✅ Code chạy không lỗi
- ✅ Tách hàm rõ ràng
- ✅ Có comment giải thích
- ✅ Dùng try/except cho file
- ✅ Test với ít nhất 5 học sinh

Chúc bạn hoàn thành tốt và sẵn sàng cho kỳ thi tốt nghiệp! 🎓
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
