import { Course, Badge, Flashcard, Lesson, Exercise, QuizQuestion } from '@/types';

export const courses: Course[] = [
  {
    id: 'level-1',
    title: 'Nhập môn Python',
    slug: 'nhap-mon-python',
    description: 'Làm quen với Python từ những khái niệm cơ bản nhất',
    icon: '🐍',
    color: '#3B82F6',
    order_index: 1,
    is_published: true,
    modules: [
      {
        id: 'mod-1-1',
        course_id: 'level-1',
        title: 'Giới thiệu Python',
        slug: 'gioi-thieu-python',
        description: 'Python là gì? Tại sao nên học Python?',
        icon: '📚',
        color: '#3B82F6',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-1-1-1',
            module_id: 'mod-1-1',
            title: 'Python là gì?',
            slug: 'python-la-gi',
            description: 'Tìm hiểu về Python - ngôn ngữ lập trình phổ biến nhất thế giới',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu Python là gì và tại sao nó phổ biến',
                'Biết được ứng dụng của Python trong thực tế',
                'Hiểu lịch sử phát triển của Python'
              ],
              theory:
                "## Python là gì?\n\n" +
                "Python là một ngôn ngữ lập trình bậc cao, thông dịch, được tạo bởi Guido van Rossum và phát hành lần đầu năm 1991. Python được thiết kế với triết lý \"There should be one—and preferably only one—obvious way to do it\", giúp code dễ đọc và dễ hiểu.\n\n" +
                "**Tại sao Python lại phổ biến?**\n\n" +
                "1. **Dễ học**: Cú pháp đơn giản, gần với ngôn ngữ tự nhiên tiếng Anh\n" +
                "2. **Đa năng**: Web, AI, Data Science, Game, Automation, Scripting...\n" +
                "3. **Cộng đồng lớn**: Hàng triệu lập trình viên sử dụng và phát triển\n" +
                "4. **Thư viện phong phú**: PyPI có hơn 300,000 packages sẵn sàng sử dụng\n\n" +
                "**Lịch sử Python:**\n" +
                "- 1991: Phiên bản đầu tiên được phát hành\n" +
                "- 2000: Python 2.0 ra mắt với nhiều cải tiến\n" +
                "- 2008: Python 3.0 với nhiều thay đổi không tương thích ngược\n" +
                "- 2020: Python 2 chính thức ngừng hỗ trợ\n\n" +
                "**Ứng dụng của Python:**\n" +
                "- Data Science và Machine Learning\n" +
                "- Web Development (Django, Flask)\n" +
                "- Automation và Scripting\n" +
                "- Game Development\n" +
                "- DevOps và System Administration",
              examples: [
                {
                  title: 'Chương trình Python đầu tiên',
                  code:
                    "print(\"Xin chao the gioi!\")\n" +
                    "print(\"Toi dang hoc Python!\")",
                  explanation: 'print() là hàm xuất ra màn hình, chuỗi trong dấu ngoặc kép được in nguyên văn',
                  output: 'Xin chao the gioi!\nToi dang hoc Python!'
                },
                {
                  title: 'Chạy Python trong terminal',
                  code:
                    "# Cách chạy Python trên terminal\n" +
                    "python --version\n" +
                    "python -c \"print('Hello from Python')\"",
                  explanation: 'Lệnh python --version kiểm tra phiên bản, python -c chạy lệnh đơn lẻ',
                  output: 'Python 3.10.0\nHello from Python'
                }
              ],
              quiz: [
                { id: 'q1-1-1-1', question: 'Python được tạo bởi ai?', options: ['Guido van Rossum', 'James Gosling', 'Bjarne Stroustrup', 'Dennis Ritchie'], correct_index: 0, explanation: 'Guido van Rossum tạo Python vào năm 1991 và được đặt theo tên nhóm hài kịch Monty Python.' },
                { id: 'q1-1-1-2', question: 'Python thuộc loại ngôn ngữ nào?', options: ['Compiled language', 'Interpreted language (Ngôn ngữ thông dịch)', 'Assembly language', 'Machine language'], correct_index: 1, explanation: 'Python là ngôn ngữ thông dịch, code được đọc và thực thi từng dòng một.' },
                { id: 'q1-1-1-3', question: 'PyPI là gì?', options: ['Một IDE Python', 'Kho lưu trữ packages của Python', 'Một framework web', 'Một ngôn ngữ lập trình'], correct_index: 1, explanation: 'PyPI (Python Package Index) là kho lưu trữ phần mềm cho Python với hơn 300,000 packages.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-1-2',
            module_id: 'mod-1-1',
            title: 'Cài đặt môi trường Python',
            slug: 'cai-dat-moi-truong-python',
            description: 'Hướng dẫn cài đặt Python và IDE để bắt đầu lập trình',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Biết cách tải và cài đặt Python trên máy tính',
                'Làm quen với IDLE - IDE mặc định của Python',
                'Chạy chương trình Python đầu tiên'
              ],
              theory:
                "## Cài đặt môi trường Python\n\n" +
                "Để bắt đầu lập trình Python, bạn cần cài đặt Python trên máy tính của mình. Python hoàn toàn miễn phí và có sẵn trên Windows, macOS và Linux.\n\n" +
                "**Các bước cài đặt Python:**\n\n" +
                "1. Truy cập website chính thức: python.org\n" +
                "2. Tải phiên bản mới nhất (Python 3.x)\n" +
                "3. Chạy file cài đặt và làm theo hướng dẫn\n" +
                "4. **QUAN TRỌNG**: Tick chọn \"Add Python to PATH\"\n\n" +
                "**IDE và Editor phổ biến:**\n\n" +
                "- **IDLE**: IDE mặc định đi kèm Python, đơn giản và dễ dùng\n" +
                "- **VS Code**: Editor miễn phí của Microsoft, hỗ trợ Python qua extension\n" +
                "- **PyCharm**: IDE chuyên nghiệp, phiên bản Community miễn phí\n" +
                "- **Jupyter Notebook**: Dùng cho Data Science, chạy code theo ô\n\n" +
                "**Kiểm tra cài đặt thành công:**\n" +
                "Sau khi cài đặt, mở terminal (Command Prompt trên Windows) và gõ:\n" +
                "```\n" +
                "python --version\n" +
                "```\n" +
                "Nếu hiện phiên bản Python (ví dụ: Python 3.10.0) là cài đặt thành công.\n\n" +
                "**Cách chạy chương trình Python:**\n" +
                "1. Mở IDLE → File → New File → Viết code → Run\n" +
                "2. Hoặc lưu file .py và chạy bằng lệnh `python ten_file.py`",
              examples: [
                {
                  title: 'Kiểm tra phiên bản Python',
                  code:
                    "# Mở terminal và gõ các lệnh sau:\npython --version\npython -V\n\n# Hoặc trong Python interpreter:\n" +
                    "import sys\n" +
                    "print(sys.version)",
                  explanation: 'sys.version cho biết phiên bản chi tiết của Python đang chạy',
                  output: 'Python 3.10.0\nPython 3.10.0\n3.10.0 (tags/v3.10.0:b66a673, May  3 2022, 11:48:32) [...]'
                },
                {
                  title: 'Chạy chương trình đầu tiên',
                  code:
                    "# Lưu đoạn code này vào file hello.py\n# Mở terminal, đến thư mục chứa file và chạy:\n# python hello.py\n\n" +
                    "print(\"Chao mung den voi Python!\")\n" +
                    "print(\"Day la chuong trinh dau tien cua toi\")\n" +
                    "name = input(\"Nhap ten cua ban: \")\n" +
                    "print(\"Xin chao\", name)",
                  explanation: 'input() dùng để nhận dữ liệu từ người dùng, print() xuất ra màn hình',
                  output: 'Chao mung den voi Python!\nDay la chuong trinh dau tien cua toi\nNhap ten cua ban: An\nXin chao An'
                }
              ],
              quiz: [
                { id: 'q1-1-2-1', question: 'Khi cài đặt Python, tại sao phải tick chọn \"Add Python to PATH\"?', options: ['Để tăng tốc độ máy', 'Để có thể chạy python từ mọi thư mục trong terminal', 'Để mã hóa file Python', 'Để Python chạy nhanh hơn'], correct_index: 1, explanation: 'Add Python to PATH cho phép gõ lệnh "python" ở bất kỳ thư mục nào mà không cần chỉ đường dẫn đầy đủ.' },
                { id: 'q1-1-2-2', question: 'IDE nào ĐI KÈM với Python khi cài đặt?', options: ['VS Code', 'PyCharm', 'Jupyter Notebook', 'IDLE'], correct_index: 3, explanation: 'IDLE là IDE mặc định đi kèm khi cài đặt Python, không cần cài thêm.' },
                { id: 'q1-1-2-3', question: 'Lệnh nào để chạy file Python tên là main.py?', options: ['run main.py', 'python main.py', 'execute main.py', 'start main.py'], correct_index: 1, explanation: 'Dùng lệnh "python ten_file.py" để chạy file Python trong terminal.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-1-3',
            module_id: 'mod-1-1',
            title: 'Cú pháp cơ bản của Python',
            slug: 'cu-phap-co-ban',
            description: 'Tìm hiểu các quy tắc viết code Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu các quy tắc viết code trong Python',
                'Biết cách sử dụng comment trong code',
                'Nhận biết lỗi cú pháp thường gặp'
              ],
              theory:
                "## Cú pháp cơ bản của Python\n\n" +
                "Python có cú pháp rất đơn giản và dễ đọc. Khác với các ngôn ngữ khác như C++ hay Java, Python không cần dấu `;` cuối dòng và sử dụng thụt lề (indentation) để phân biệt các khối code.\n\n" +
                "**Quy tắc quan trọng:**\n\n" +
                "1. **Thụt lề (Indentation)**: Python dùng 4 dấu cách (hoặc 1 tab) để thụt lề. KHÔNG thụt lề sẽ gây lỗi.\n" +
                "2. **Không cần dấu chấm phẩy**: Mỗi dòng code là một câu lệnh hoàn chỉnh\n" +
                "3. **Comment**: Dùng `#` cho comment một dòng, `'''` hoặc `\"\"\"` cho comment nhiều dòng\n\n" +
                "**Ví dụ cú pháp đúng:**\n" +
                "```python\n" +
                "if age >= 18:\n" +
                "    print(\"Bạn là người lớn\")\n" +
                "    print(\"Được phép bỏ phiếu\")\n" +
                "```\n\n" +
                "**Ví dụ SAI (thiếu thụt lề):**\n" +
                "```python\n" +
                "if age >= 18:\n" +
                "print(\"Bạn là người lớn\")  # LỖI!\n" +
                "```\n\n" +
                "**Comment trong Python:**\n" +
                "- `#` Comment một dòng\n" +
                "- `''' '''` hoặc `\"\"\" \"\"\"` Comment nhiều dòng\n\n" +
                "**Case Sensitivity**: Python PHÂN BIỆT hoa thường. `Print` và `print` là khác nhau.",
              examples: [
                {
                  title: 'Thụt lề trong Python',
                  code:
                    "# Đúng - có thụt lề\n" +
                    "x = 10\n" +
                    "if x > 5:\n" +
                    "    print(\"x lon hon 5\")\n" +
                    "    print(\"Day la dong thu 2 trong if\")\n" +
                    "print(\"Day la dong ngoai if\")\n\n" +
                    "# Sai - thiếu thụt lề\n" +
                    "if x > 5:\n" +
                    "print(\"Loi!\")  # IndentationError",
                  explanation: 'Thụt lề rất quan trọng trong Python, nó xác định khối code',
                  output: 'x lon hon 5\nDay la dong thu 2 trong if\nDay la dong ngoai if'
                },
                {
                  title: 'Comment trong Python',
                  code:
                    "# Day la comment mot dong\n" +
                    "\"\"\"\n" +
                    "Day la comment\n" +
                    "nhieu dong\n" +
                    "\"\"\"\n\n" +
                    "name = \"Python\"  # Comment sau code\n" +
                    "age = 30\n" +
                    "# print(name)  # Dong nay bi comment nen khong chay",
                  explanation: 'Comment giúp ghi chú code và không ảnh hưởng đến chương trình',
                  output: 'Python'
                }
              ],
              quiz: [
                { id: 'q1-1-3-1', question: 'Python dùng bao nhiêu dấu cách để thụt lề?', options: ['2 dấu cách', '4 dấu cách', '1 tab', 'Tùy ý'], correct_index: 1, explanation: 'Python dùng 4 dấu cách (hoặc 1 tab) để thụt lề. Đây là quy ước chuẩn.' },
                { id: 'q1-1-3-2', question: 'Ký hiệu nào dùng để comment một dòng trong Python?', options: ['//', '#', '/*', '--'], correct_index: 1, explanation: 'Dùng dấu # để comment một dòng trong Python.' },
                { id: 'q1-1-3-3', question: 'Đoạn code nào ĐÚNG?', options: ['if x > 5:\\nprint(x)', 'if x > 5:\\n    print(x)', 'if x > 5:\\n        print(x)\\n    print(x)', 'if x > 5; print(x)'], correct_index: 1, explanation: 'Đoạn code đúng cần có thụt lề 4 dấu cách sau dấu : trong câu điều kiện.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-1-4',
            module_id: 'mod-1-1',
            title: 'Chạy và gỡ lỗi chương trình',
            slug: 'chay-va-go-loi',
            description: 'Học cách chạy chương trình và xử lý lỗi cơ bản',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Biết các cách chạy chương trình Python',
                'Đọc và hiểu thông báo lỗi',
                'Sửa các lỗi cú pháp cơ bản'
              ],
              theory:
                "## Chạy và gỡ lỗi chương trình Python\n\n" +
                "Khi lập trình, bạn sẽ gặp nhiều loại lỗi khác nhau. Biết cách đọc thông báo lỗi và sửa chúng là kỹ năng rất quan trọng.\n\n" +
                "**Các loại lỗi phổ biến:**\n\n" +
                "1. **SyntaxError**: Lỗi cú pháp - code viết sai quy tắc\n" +
                "2. **NameError**: Biến hoặc hàm chưa được định nghĩa\n" +
                "3. **TypeError**: Sai kiểu dữ liệu\n" +
                "4. **IndentationError**: Lỗi thụt lề\n\n" +
                "**Cách đọc thông báo lỗi:**\n" +
                "```\n" +
                "File \"test.py\", line 5\n" +
                "    print(Hello)\n" +
                "          ^\n" +
                "SyntaxError: invalid syntax\n" +
                "```\n" +
                "- File và dòng gây lỗi được ghi rõ\n" +
                "- `^` chỉ vị trí lỗi\n" +
                "- Tên lỗi và mô tả ở dòng cuối\n\n" +
                "**Cách chạy chương trình:**\n\n" +
                "1. **Trong IDLE**: Nhấn F5 hoặc Run → Run Module\n" +
                "2. **Trong terminal**: `python ten_file.py`\n" +
                "3. **Interactive mode**: Gõ `python` để vào chế độ gõ lệnh từng dòng\n\n" +
                "**Mẹo debug:**\n" +
                "- Đọc thông báo lỗi từ TRÊN xuống DƯỚI\n" +
                "- Check dòng được đề cập trong lỗi\n" +
                "- Thử chạy từng phần code riêng lẻ",
              examples: [
                {
                  title: 'SyntaxError - Thiếu dấu ngoặc',
                  code:
                    "# LỖI\n" +
                    "print(\"Hello\")\n\n" +
                    "# SUA\n" +
                    "print(\"Hello\")\n\n" +
                    "# LỖI\n" +
                    "name = \"Python\"\n\n" +
                    "# SUA\n" +
                    "name = \"Python\"",
                  explanation: 'Mỗi dấu ngoặc mở phải có dấu ngoặc đóng tương ứng',
                  output: 'Hello\nHello'
                },
                {
                  title: 'NameError - Biến chưa được định nghĩa',
                  code:
                    "# LỖI\n" +
                    "print(my_variable)  # NameError: name 'my_variable' is not defined\n\n" +
                    "# SUA\n" +
                    "my_variable = \"Hello\"\n" +
                    "print(my_variable)\n\n" +
                    "# LỖI\n" +
                    "result = x + 5  # x chua duoc dinh nghia\n\n" +
                    "# SUA\n" +
                    "x = 10\n" +
                    "result = x + 5\n" +
                    "print(result)",
                  explanation: 'Phải khai báo biến trước khi sử dụng',
                  output: 'Hello\n15'
                }
              ],
              quiz: [
                { id: 'q1-1-4-1', question: 'Lỗi nào xảy ra khi viết sai cú pháp Python?', options: ['NameError', 'SyntaxError', 'TypeError', 'ValueError'], correct_index: 1, explanation: 'SyntaxError là lỗi cú pháp, xảy ra khi code viết không đúng quy tắc của Python.' },
                { id: 'q1-1-4-2', question: 'NameError nghĩa là gì?', options: ['Tên file sai', 'Biến chưa được định nghĩa', 'Tên hàm sai chính tả', 'Tên module không tìm thấy'], correct_index: 1, explanation: 'NameError xảy ra khi sử dụng một biến hoặc hàm chưa được khai báo/định nghĩa.' },
                { id: 'q1-1-4-3', question: 'Nhấn phím nào trong IDLE để chạy chương trình?', options: ['Ctrl+R', 'F5', 'Alt+F4', 'Ctrl+C'], correct_index: 1, explanation: 'Nhấn F5 hoặc chọn Run → Run Module trong IDLE để chạy chương trình.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-1-2',
        course_id: 'level-1',
        title: 'Kiểu dữ liệu cơ bản',
        slug: 'kieu-du-lieu-co-ban',
        description: 'Tìm hiểu về các kiểu dữ liệu cơ bản trong Python',
        icon: '📦',
        color: '#8B5CF6',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-1-2-1',
            module_id: 'mod-1-2',
            title: 'Số nguyên (Integer)',
            slug: 'so-nguyen-integer',
            description: 'Tìm hiểu về kiểu dữ liệu số nguyên trong Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu số nguyên (int) là gì và cách biểu diễn',
                'Biết các phép toán cơ bản với số nguyên',
                'Phân biệt được integer với các kiểu số khác'
              ],
              theory:
                "## Số nguyên (Integer) trong Python\n\n" +
                "**Integer (int)** là kiểu dữ liệu dùng để lưu các số nguyên như: 1, 2, 100, -5, 0...\n\n" +
                "**Đặc điểm của Integer:**\n" +
                "- Không có giới hạn về độ lớn (trong Python 3)\n" +
                "- Có thể dương hoặc âm\n" +
                "- Không có phần thập phân\n\n" +
                "**Khai báo số nguyên:**\n" +
                "```python\n" +
                "a = 42          # Số dương\n" +
                "b = -17         # Số âm\n" +
                "c = 0           # Số không\n" +
                "d = 1_000_000   # Có thể dùng _ để phân cách cho dễ đọc\n" +
                "```\n\n" +
                "**Các phép toán với số nguyên:**\n" +
                "- `+` Cộng\n" +
                "- `-` Trừ\n" +
                "- `*` Nhân\n" +
                "- `//` Chia lấy phần nguyên\n" +
                "- `%` Chia lấy dư\n" +
                "- `**` Lũy thừa\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "print(10 + 5)   # 15\n" +
                "print(10 - 3)   # 7\n" +
                "print(4 * 3)    # 12\n" +
                "print(17 // 5)  # 3\n" +
                "print(17 % 5)   # 2\n" +
                "print(2 ** 4)   # 16\n" +
                "```",
              examples: [
                {
                  title: 'Các phép toán cơ bản',
                  code:
                    "# Phep cong, tru, nhan\n" +
                    "a = 15\n" +
                    "b = 4\n" +
                    "print(\"a + b =\", a + b)\n" +
                    "print(\"a - b =\", a - b)\n" +
                    "print(\"a * b =\", a * b)\n\n" +
                    "# Phep chia lay nguyen va lay du\n" +
                    "print(\"a // b =\", a // b)\n" +
                    "print(\"a % b =\", a % b)",
                  explanation: '// chia lấy phần nguyên, % chia lấy phần dư',
                  output: 'a + b = 19\na - b = 11\na * b = 60\na // b = 3\na % b = 3'
                },
                {
                  title: 'Số nguyên lớn và lũy thừa',
                  code:
                    "# So nguyen khong gioi han\n" +
                    "big_number = 1_000_000_000\n" +
                    "print(\"So lon:\", big_number)\n\n" +
                    "# Luy thua\n" +
                    "print(\"2 mu 10 =\", 2 ** 10)\n" +
                    "print(\"3 mu 4 =\", 3 ** 4)\n\n" +
                    "# So am\n" +
                    "negative = -42\n" +
                    "print(\"So am:\", negative)\n" +
                    "print(\"Tri tuyet doi:\", abs(negative))",
                  explanation: 'Python hỗ trợ số nguyên rất lớn, abs() trả về giá trị tuyệt đối',
                  output: 'So lon: 1000000000\n2 mu 10 = 1024\n3 mu 4 = 81\nSo am: -42\nTri tuyet doi: 42'
                }
              ],
              quiz: [
                { id: 'q1-2-1-1', question: 'Kết quả của 17 // 5 là bao nhiêu?', options: ['3.4', '3', '2', '4'], correct_index: 1, explanation: '// là phép chia lấy phần nguyên, 17 // 5 = 3 dư 2.' },
                { id: 'q1-2-1-2', question: '17 % 5 cho kết quả là bao nhiêu?', options: ['3', '2', '3.4', '4'], correct_index: 1, explanation: '% là phép chia lấy dư, 17 % 5 = 2 vì 17 = 5*3 + 2.' },
                { id: 'q1-2-1-3', question: '2 ** 10 bằng bao nhiêu?', options: ['1024', '1000', '512', '2048'], correct_index: 0, explanation: '** là phép lũy thừa, 2**10 = 1024 (2 mũ 10).' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-2-2',
            module_id: 'mod-1-2',
            title: 'Số thực (Float)',
            slug: 'so-thuc-float',
            description: 'Tìm hiểu về kiểu dữ liệu số thực trong Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu số thực (float) là gì',
                'Biết cách khai báo và sử dụng float',
                'Nắm được các phép toán với số thực'
              ],
              theory:
                "## Số thực (Float) trong Python\n\n" +
                "**Float** là kiểu dữ liệu dùng để lưu các số có phần thập phân như: 3.14, -0.5, 2.71828...\n\n" +
                "**Đặc điểm của Float:**\n" +
                "- Có phần thập phân\n" +
                "- Dùng dấu chấm `.` để phân cách phần nguyên và phần thập phân\n" +
                "- Có thể dùng ký hiệu `e` hoặc `E` cho số mũ (scientific notation)\n\n" +
                "**Khai báo số thực:**\n" +
                "```python\n" +
                "pi = 3.14159\n" +
                "temperature = -12.5\n" +
                "light_speed = 3e8        # 3 x 10^8\n" +
                "small_number = 1.5e-3   # 1.5 x 10^-3\n" +
                "```\n\n" +
                "**Lưu ý quan trọng:**\n" +
                "Float có độ chính xác giới hạn. Khi so sánh số thực, KHÔNG dùng `==` mà nên dùng:\n" +
                "```python\n" +
                "import math\n" +
                "math.isclose(a, b)  # So sánh gần đúng\n" +
                "```\n\n" +
                "**Chuyển đổi giữa int và float:**\n" +
                "- `int(3.7)` → `3` (cắt bỏ phần thập phân)\n" +
                "- `float(5)` → `5.0`",
              examples: [
                {
                  title: 'Khai báo và tính toán float',
                  code:
                    "# Khai bao so thuc\n" +
                    "pi = 3.14159\n" +
                    "radius = 5.0\n\n" +
                    "# Tinh dien tich hinh tron\n" +
                    "area = pi * radius ** 2\n" +
                    "print(\"Dien tich:\", area)\n\n" +
                    "# cac phep toan\n" +
                    "a = 10.5\n" +
                    "b = 3.2\n" +
                    "print(\"a + b =\", a + b)\n" +
                    "print(\"a - b =\", a - b)\n" +
                    "print(\"a * b =\", a * b)\n" +
                    "print(\"a / b =\", a / b)",
                  explanation: 'Float dùng cho các phép toán cần độ chính xác thập phân',
                  output: 'Dien tich: 78.53975\na + b = 13.7\na - b = 7.3\na * b = 33.6\na / b = 3.28125'
                },
                {
                  title: 'Scientific notation và chuyển đổi',
                  code:
                    "# Scientific notation\n" +
                    "big = 1.5e8   # 1.5 x 10^8 = 150,000,000\n" +
                    "small = 2.5e-3  # 2.5 x 10^-3 = 0.0025\n\n" +
                    "print(\"Big:\", big)\n" +
                    "print(\"Small:\", small)\n\n" +
                    "# Chuyen doi int <-> float\n" +
                    "x = 5\n" +
                    "y = 3.7\n\n" +
                    "print(\"int(y) =\", int(y))  # 3 (cat phan thap phan)\n" +
                    "print(\"float(x) =\", float(x))  # 5.0",
                  explanation: 'e8 nghĩa là nhân 10 mũ 8, e-3 nghĩa là nhân 10 mũ -3',
                  output: 'Big: 150000000.0\nSmall: 0.0025\nint(y) = 3\nfloat(x) = 5.0'
                }
              ],
              quiz: [
                { id: 'q1-2-2-1', question: 'Kết quả của int(3.9) là bao nhiêu?', options: ['4', '3', '3.9', 'Error'], correct_index: 1, explanation: 'int() cắt bỏ phần thập phân mà không làm tròn, nên 3.9 thành 3.' },
                { id: 'q1-2-2-2', question: '1.5e3 tương đương với số nào?', options: ['1500', '150', '15000', '1.5'], correct_index: 0, explanation: '1.5e3 = 1.5 x 10^3 = 1500.' },
                { id: 'q1-2-2-3', question: 'Tại sao không nên dùng == để so sánh 2 số float?', options: ['Float không thể so sánh', 'Float có độ chính xác giới hạn nên so sánh có thể sai', 'Float là số nguyên', 'Vì float dùng dấu chấm'], correct_index: 1, explanation: 'Float có độ chính xác giới hạn, ví dụ 0.1 + 0.2 không đúng bằng 0.3 trong máy tính.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-2-3',
            module_id: 'mod-1-2',
            title: 'Chuỗi ký tự (String)',
            slug: 'chuoi-ky-tu-string',
            description: 'Tìm hiểu về kiểu dữ liệu chuỗi trong Python',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu chuỗi (string) là gì và cách khai báo',
                'Biết các thao tác với chuỗi: nối, cắt, định dạng',
                'Sử dụng được các method phổ biến của string'
              ],
              theory:
                "## Chuỗi ký tự (String) trong Python\n\n" +
                "**String (str)** là kiểu dữ liệu dùng để lưu văn bản, một chuỗi các ký tự.\n\n" +
                "**Khai báo chuỗi:**\n" +
                "```python\n" +
                "# Dùng dấu ngoặc đơn hoặc kép\n" +
                "s1 = 'Hello'\n" +
                "s2 = \"World\"\n" +
                "s3 = '''Day la\n" +
                "chuoi nhieu dong'''\n" +
                "s4 = \"\"\"Mot chuoi\n" +
                "nhieu dong\"\"\"\n" +
                "```\n\n" +
                "**Các phép toán với chuỗi:**\n" +
                "- `+` Nối chuỗi: `\"Hello\" + \" \" + \"World\"` → `\"Hello World\"`\n" +
                "- `*` Lặp chuỗi: `\"Ha\" * 3` → `\"HaHaHa\"`\n" +
                "- `len()` Độ dài chuỗi\n\n" +
                "**Indexing và Slicing:**\n" +
                "```python\n" +
                "s = \"Python\"\n" +
                "s[0]    # 'P' - ký tự đầu tiên\n" +
                "s[-1]   # 'n' - ký tự cuối cùng\n" +
                "s[0:3]  # 'Pyt' - từ vị trí 0 đến 2\n" +
                "s[::2]  # 'Pto' - cách 2 ký tự\n" +
                "```\n\n" +
                "**Các method phổ biến:**\n" +
                "- `upper()`, `lower()` - Đổi hoa/thường\n" +
                "- `strip()`, `lstrip()`, `rstrip()` - Xóa khoảng trắng\n" +
                "- `split()` - Tách chuỗi\n" +
                "- `replace()` - Thay thế\n" +
                "- `find()` - Tìm vị trí",
              examples: [
                {
                  title: 'Tạo và nối chuỗi',
                  code:
                    "# Tao chuoi\n" +
                    "name = \"Python\"\n" +
                    "greeting = 'Xin chao '\n" +
                    "version = \"3.10\"\n\n" +
                    "# Noi chuoi\n" +
                    "full_greeting = greeting + name + \"!\"\n" +
                    "print(full_greeting)\n\n" +
                    "# Lap chuoi\n" +
                    "print(\"Ha\" * 3)\n\n" +
                    "# Do dai\n" +
                    "print(\"Do dai:\", len(name))",
                  explanation: 'Dùng + để nối chuỗi, * để lặp chuỗi',
                  output: 'Xin chao Python!\nHaHaHa\nDo dai: 6'
                },
                {
                  title: 'Indexing và Slicing',
                  code:
                    "s = \"Hello World\"\n\n" +
                    "# Lay ky tu theo vi tri\n" +
                    "print(\"Ky tu dau:\", s[0])\n" +
                    "print(\"Ky tu cuoi:\", s[-1])\n\n" +
                    "# Cat chuoi (slicing)\n" +
                    "print(\"Tu 0 den 4:\", s[0:5])\n" +
                    "print(\"Tu 6 den cuoi:\", s[6:])\n" +
                    "print(\"Cuoi 5 ky tu:\", s[-5:])\n\n" +
                    "# Cat nhung ky tu\n" +
                    "print(\"Cach 2:\", s[::2])",
                  explanation: 'Index bắt đầu từ 0, s[0:5] lấy từ vị trí 0 đến 4 (không lấy 5)',
                  output: 'Ky tu dau: H\nKy tu cuoi: d\nTu 0 den 4: Hello\nTu 6 den cuoi: World\nCuoi 5 ky tu: World\nCach 2: HloWrd'
                }
              ],
              quiz: [
                { id: 'q1-2-3-1', question: 'Làm sao lấy 3 ký tự đầu tiên của chuỗi "Python"?', options: ['s[3]', 's[0:3]', 's[:3]', 's[-3:]'], correct_index: 1, explanation: 's[0:3] lấy từ vị trí 0 đến 2, tức 3 ký tự đầu "Pyt".' },
                { id: 'q1-2-3-2', question: '"Ha" * 3 cho kết quả là gì?', options: ['HaHaHa', 'HaHa', '9', 'Ha3'], correct_index: 0, explanation: '* với số nguyên lặp chuỗi "Ha" 3 lần thành "HaHaHa".' },
                { id: 'q1-2-3-3', question: 'Method nào để đổi chuỗi thành chữ hoa?', options: ['lower()', 'upper()', 'capitalize()', 'swapcase()'], correct_index: 1, explanation: 'upper() đổi tất cả thành chữ hoa, lower() đổi thành chữ thường.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-2-4',
            module_id: 'mod-1-2',
            title: 'Kiểu Boolean và so sánh',
            slug: 'kieu-boolean-va-so-sanh',
            description: 'Tìm hiểu về kiểu dữ liệu logic Boolean trong Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 4,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu kiểu Boolean là gì',
                'Biết các phép so sánh trong Python',
                'Sử dụng được các phép logic AND, OR, NOT'
              ],
              theory:
                "## Kiểu Boolean và so sánh\n\n" +
                "**Boolean (bool)** chỉ có 2 giá trị: `True` (đúng) và `False` (sai).\n\n" +
                "**Khai báo:**\n" +
                "```python\n" +
                "is_active = True\n" +
                "is_valid = False\n" +
                "```\n\n" +
                "**Các phép so sánh:**\n" +
                "- `==` Bằng\n" +
                "- `!=` Không bằng (khác)\n" +
                "- `>` Lớn hơn\n" +
                "- `<` Nhỏ hơn\n" +
                "- `>=` Lớn hơn hoặc bằng\n" +
                "- `<=` Nhỏ hơn hoặc bằng\n\n" +
                "**Các phép logic:**\n" +
                "- `and` - VÀ: cả hai đều True mới True\n" +
                "- `or` - HOẶC: một trong hai True là True\n" +
                "- `not` - PHủ định: đổi True thành False và ngược lại\n\n" +
                "**Truthy và Falsy:**\n" +
                "Trong Python, một số giá trị được coi là \"falsy\" (bằng False):\n" +
                "- `0`, `0.0`, `\"\"`, `[]`, `{}`, `None`\n" +
                "Tất cả giá trị khác được coi là \"truthy\" (bằng True).\n\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "x = 10\n" +
                "print(x > 5 and x < 20)  # True\n" +
                "print(x < 5 or x == 10)  # True\n" +
                "print(not x < 5)         # True\n" +
                "```",
              examples: [
                {
                  title: 'Các phép so sánh',
                  code:
                    "a = 10\n" +
                    "b = 5\n" +
                    "c = 10\n\n" +
                    "# So sanh\n" +
                    "print(\"a == c:\", a == c)\n" +
                    "print(\"a != b:\", a != b)\n" +
                    "print(\"a > b:\", a > b)\n" +
                    "print(\"a <= c:\", a <= c)\n\n" +
                    "# Boolean\n" +
                    "is_equal = (a == c)\n" +
                    "print(\"Boolean is_equal:\", is_equal)\n" +
                    "print(\"type(is_equal):\", type(is_equal))",
                  explanation: 'Kết quả của phép so sánh luôn là True hoặc False (bool)',
                  output: 'a == c: True\na != b: True\na > b: True\na <= c: True\nBoolean is_equal: True\ntype(is_equal): <class \'bool\'>'
                },
                {
                  title: 'Các phép logic',
                  code:
                    "age = 25\n" +
                    "has_license = True\n\n" +
                    "# AND - ca hai deu phai True\n" +
                    "can_drive = age >= 18 and has_license == True\n" +
                    "print(\"Co the lai xe:\", can_drive)\n\n" +
                    "# OR - chi can mot trong hai True\n" +
                    "is_student_or_senior = age < 18 or age >= 60\n" +
                    "print(\"Duoc giam gia:\", is_student_or_senior)\n\n" +
                    "# NOT - dao nguoc gia tri\n" +
                    "is_not_child = not (age < 18)\n" +
                    "print(\"Khong phai tre em:\", is_not_child)\n\n" +
                    "# Combined\n" +
                    "can_vote = age >= 18 and age < 65\n" +
                    "print(\"Co quyet dinh bau cu:\", can_vote)",
                  explanation: 'AND yêu cầu cả hai điều kiện, OR chỉ cần một, NOT đảo ngược',
                  output: 'Co the lai xe: True\nDuoc giam gia: False\nKhong phai tre em: True\nCo quyet dinh bau cu: True'
                }
              ],
              quiz: [
                { id: 'q1-2-4-1', question: 'Kết quả của 10 == "10" là gì?', options: ['True', 'False', 'Error', 'None'], correct_index: 1, explanation: '10 là int, "10" là string, chúng khác nhau nên == cho kết quả False.' },
                { id: 'q1-2-4-2', question: 'True and False cho kết quả là gì?', options: ['True', 'False', 'Error', 'None'], correct_index: 1, explanation: 'AND yêu cầu cả hai đều True mới cho True, nên True and False = False.' },
                { id: 'q1-2-4-3', question: 'not (5 > 3) cho kết quả là gì?', options: ['True', 'False', 'Error', 'None'], correct_index: 1, explanation: '5 > 3 = True, not True = False.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-1-3',
        course_id: 'level-1',
        title: 'Toán tử',
        slug: 'toan-tu',
        description: 'Tìm hiểu về các toán tử trong Python',
        icon: '🔢',
        color: '#10B981',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-1-3-1',
            module_id: 'mod-1-3',
            title: 'Toán tử số học',
            slug: 'toan-tu-so-hoc',
            description: 'Các toán tử cộng, trừ, nhân, chia trong Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Nắm được các toán tử số học trong Python',
                'Biết thứ tự ưu tiên của các phép toán',
                'Phân biệt các phép chia //, /, %'
              ],
              theory:
                "## Toán tử số học\n\n" +
                "Python cung cấp các toán tử số học cơ bản để thực hiện các phép tính toán.\n\n" +
                "**Danh sách toán tử số học:**\n\n" +
                "| Toán tử | Ý nghĩa | Ví dụ | Kết quả |\n" +
                "|---------|---------|-------|---------|\n" +
                "| + | Cộng | 5 + 3 | 8 |\n" +
                "| - | Trừ | 5 - 3 | 2 |\n" +
                "| * | Nhân | 5 * 3 | 15 |\n" +
                "| / | Chia | 10 / 3 | 3.333... |\n" +
                "| // | Chia lấy phần nguyên | 10 // 3 | 3 |\n" +
                "| % | Chia lấy dư | 10 % 3 | 1 |\n" +
                "| ** | Lũy thừa | 2 ** 4 | 16 |\n\n" +
                "**Thứ tự ưu tiên (từ cao đến thấp):**\n\n" +
                "1. `**` - Lũy thừa\n" +
                "2. `*`, `/`, `//`, `%` - Nhân, chia\n" +
                "3. `+`, `-` - Cộng, trừ\n\n" +
                "**Dùng ngoặc tròn () để thay đổi thứ tự:**\n" +
                "```python\n" +
                "print(2 + 3 * 4)      # 14 (nhân trước)\n" +
                "print((2 + 3) * 4)    # 20 (cộng trước)\n" +
                "```\n\n" +
                "**Ví dụ nâng cao:**\n" +
                "```python\n" +
                "a = 17\n" +
                "b = 5\n" +
                "print(a + b)   # 22\n" +
                "print(a - b)   # 12\n" +
                "print(a * b)   # 85\n" +
                "print(a / b)   # 3.4\n" +
                "print(a // b)  # 3\n" +
                "print(a % b)   # 2\n" +
                "```",
              examples: [
                {
                  title: 'Các phép toán cơ bản',
                  code:
                    "x = 15\n" +
                    "y = 4\n\n" +
                    "print(\"x + y =\", x + y)\n" +
                    "print(\"x - y =\", x - y)\n" +
                    "print(\"x * y =\", x * y)\n" +
                    "print(\"x / y =\", x / y)\n" +
                    "print(\"x // y =\", x // y)\n" +
                    "print(\"x % y =\", x % y)\n" +
                    "print(\"x ** y =\", x ** y)",
                  explanation: '// chia lấy phần nguyên, % chia lấy dư, ** là lũy thừa',
                  output: 'x + y = 19\nx - y = 11\nx * y = 60\nx / y = 3.75\nx // y = 3\nx % y = 3\nx ** y = 50625'
                },
                {
                  title: 'Thứ tự ưu tiên phép toán',
                  code:
                    "# Thu tu uu tien\n" +
                    "print(\"2 + 3 * 4 =\", 2 + 3 * 4)\n" +
                    "print(\"(2 + 3) * 4 =\", (2 + 3) * 4)\n\n" +
                    "# Phuc tap hon\n" +
                    "result = 10 + 20 / 4 - 2 * 3\n" +
                    "print(\"10 + 20 / 4 - 2 * 3 =\", result)\n\n" +
                    "# Tinh bieu thuc\n" +
                    "a = 5\n" +
                    "b = 2\n" +
                    "c = 3\n" +
                    "result = a ** b + c * a - a / b\n" +
                    "print(\"5 ** 2 + 3 * 5 - 5 / 2 =\", result)",
                  explanation: 'Nhân chia trước cộng trừ sau, dùng () để thay đổi',
                  output: '2 + 3 * 4 = 14\n(2 + 3) * 4 = 20\n10 + 20 / 4 - 2 * 3 = 9.0\n5 ** 2 + 3 * 5 - 5 / 2 = 30.5'
                }
              ],
              quiz: [
                { id: 'q1-3-1-1', question: '10 / 4 cho kết quả là bao nhiêu?', options: ['2', '2.5', '2.0', '3'], correct_index: 1, explanation: 'Phép / luôn trả về float, 10/4 = 2.5.' },
                { id: 'q1-3-1-2', question: '2 ** 3 có nghĩa là gì?', options: ['2 * 3', '2 + 3', '2 * 2 * 2', '2 / 3'], correct_index: 2, explanation: '** là toán tử lũy thừa, 2**3 = 2 mũ 3 = 8.' },
                { id: 'q1-3-1-3', question: 'Thứ tự ưu tiên nào ĐÚNG?', options: ['+ - trước * /', '* / trước + -', 'Từ trái sang phải', 'Tùy ý'], correct_index: 1, explanation: 'Nhân chia (*, /, //, %) có ưu tiên cao hơn cộng trừ (+, -).' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-3-2',
            module_id: 'mod-1-3',
            title: 'Toán tử gán',
            slug: 'toan-tu-gan',
            description: 'Các toán tử gán và cách sử dụng trong Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu các toán tử gán trong Python',
                'Biết cách sử dụng +=, -=, *=, /=',
                'Phân biệt = và các toán tử gán kết hợp'
              ],
              theory:
                "## Toán tử gán\n\n" +
                "Toán tử gán dùng để gán giá trị cho biến. Ngoài `=` (gán đơn giản), Python còn có các toán tử gán kết hợp.\n\n" +
                "**Danh sách toán tử gán:**\n\n" +
                "| Toán tử | Ví dụ | Tương đương |\n" +
                "|---------|-------|-------------|\n" +
                "| = | x = 5 | x = 5 |\n" +
                "| += | x += 3 | x = x + 3 |\n" +
                "| -= | x -= 3 | x = x - 3 |\n" +
                "| *= | x *= 3 | x = x * 3 |\n" +
                "| /= | x /= 3 | x = x / 3 |\n" +
                "| //= | x //= 3 | x = x // 3 |\n" +
                "| %= | x %= 3 | x = x % 3 |\n" +
                "| **= | x **= 3 | x = x ** 3 |\n\n" +
                "**Lưu ý quan trọng:**\n" +
                "- `=` là gán giá trị, KHÔNG phải so sánh!\n" +
                "- Toán tử gán kết hợp thực hiện phép tính rồi gán kết quả cho biến.\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "x = 10\n" +
                "x += 5   # x = 15\n" +
                "x *= 2   # x = 30\n" +
                "x -= 10  # x = 20\n" +
                "```",
              examples: [
                {
                  title: 'Toán tử gán cơ bản',
                  code:
                    "# Gan don gian\n" +
                    "x = 10\n" +
                    "print(\"Sau khi gan: x =\", x)\n\n" +
                    "# += (cong va gan)\n" +
                    "x += 5   # Tuong duong x = x + 5\n" +
                    "print(\"x += 5 -> x =\", x)\n\n" +
                    "# -= (tru va gan)\n" +
                    "x -= 3   # Tuong duong x = x - 3\n" +
                    "print(\"x -= 3 -> x =\", x)\n\n" +
                    "# *= (nhan va gan)\n" +
                    "x *= 2   # Tuong duong x = x * 2\n" +
                    "print(\"x *= 2 -> x =\", x)",
                  explanation: '+= là viết tắt của x = x + 5, tương tự cho các toán tử khác',
                  output: 'Sau khi gan: x = 10\nx += 5 -> x = 15\nx -= 3 -> x = 12\nx *= 2 -> x = 24'
                },
                {
                  title: 'Toán tử gán nâng cao',
                  code:
                    "x = 20\n\n" +
                    "# /= (chia va gan)\n" +
                    "x /= 4   # x = 20 / 4 = 5.0\n" +
                    "print(\"x /= 4 -> x =\", x)\n\n" +
                    "# //= (chia lay nguyen va gan)\n" +
                    "x = 17\n" +
                    "x //= 5  # x = 17 // 5 = 3\n" +
                    "print(\"x //= 5 -> x =\", x)\n\n" +
                    "# %= (chia lay du va gan)\n" +
                    "x = 17\n" +
                    "x %= 5   # x = 17 % 5 = 2\n" +
                    "print(\"x %= 5 -> x =\", x)\n\n" +
                    "# **= (luy thua va gan)\n" +
                    "x = 2\n" +
                    "x **= 4  # x = 2 ** 4 = 16\n" +
                    "print(\"x **= 4 -> x =\", x)",
                  explanation: 'Các toán tử gán kết hợp thực hiện phép tính rồi gán kết quả',
                  output: 'x /= 4 -> x = 5.0\nx //= 5 -> x = 3\nx %= 5 -> x = 2\nx **= 4 -> x = 16'
                }
              ],
              quiz: [
                { id: 'q1-3-2-1', question: 'x = 10 rồi x += 5 thì x bằng bao nhiêu?', options: ['5', '10', '15', '20'], correct_index: 2, explanation: 'x += 5 nghĩa là x = x + 5 = 10 + 5 = 15.' },
                { id: 'q1-3-2-2', question: 'x *= 3 có nghĩa là gì?', options: ['x = 3', 'x = x * 3', 'x = x + 3', 'x = 3 * x'], correct_index: 1, explanation: 'x *= 3 tương đương với x = x * 3.' },
                { id: 'q1-3-2-3', question: 'Sau x = 8, x //= 3 thì x bằng bao nhiêu?', options: ['2', '2.66...', '3', '2.0'], correct_index: 0, explanation: 'x //= 3 nghĩa là x = x // 3 = 8 // 3 = 2 (phần nguyên).' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-3-3',
            module_id: 'mod-1-3',
            title: 'Toán tử so sánh và logic',
            slug: 'toan-tu-so-sanh-va-logic',
            description: 'Các toán tử so sánh và logic trong Python',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Nắm được các toán tử so sánh',
                'Biết cách kết hợp các điều kiện với AND, OR, NOT',
                'Áp dụng vào các bài toán thực tế'
              ],
              theory:
                "## Toán tử so sánh và logic\n\n" +
                "**Toán tử so sánh** dùng để so sánh hai giá trị, luôn trả về True hoặc False.\n\n" +
                "**Danh sách toán tử so sánh:**\n\n" +
                "| Toán tử | Ý nghĩa | Ví dụ |\n" +
                "|---------|---------|-------|\n" +
                "| == | Bằng | 5 == 5 → True |\n" +
                "| != | Khác | 5 != 3 → True |\n" +
                "| > | Lớn hơn | 5 > 3 → True |\n" +
                "| < | Nhỏ hơn | 3 < 5 → True |\n" +
                "| >= | Lớn hơn hoặc bằng | 5 >= 5 → True |\n" +
                "| <= | Nhỏ hơn hoặc bằng | 3 <= 5 → True |\n\n" +
                "**Toán tử logic** dùng để kết hợp nhiều điều kiện:\n\n" +
                "| Toán tử | Mô tả | Ví dụ |\n" +
                "|---------|-------|-------|\n" +
                "| and | Cả hai True mới True | True and False = False |\n" +
                "| or | Một trong hai True là True | True or False = True |\n" +
                "| not | Đảo ngược giá trị | not True = False |\n\n" +
                "**Thứ tự ưu tiên:**\n" +
                "1. `not`\n" +
                "2. `and`\n" +
                "3. `or`\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "age = 25\n" +
                "has_license = True\n" +
                "print(age >= 18 and has_license)  # True\n" +
                "```",
              examples: [
                {
                  title: 'Toán tử so sánh',
                  code:
                    "a = 10\n" +
                    "b = 5\n" +
                    "c = 10\n\n" +
                    "# So sanh\n" +
                    "print(\"a == c:\", a == c)   # True\n" +
                    "print(\"a != b:\", a != b)   # True\n" +
                    "print(\"a > b:\", a > b)     # True\n" +
                    "print(\"a < b:\", a < b)     # False\n" +
                    "print(\"a >= c:\", a >= c)   # True\n" +
                    "print(\"b <= a:\", b <= a)   # True\n\n" +
                    "# So sanh chuoi\n" +
                    "name = \"Python\"\n" +
                    "print(\"name == 'Python':\", name == \"Python\")",
                  explanation: 'Kết quả của phép so sánh luôn là True hoặc False (bool)',
                  output: 'a == c: True\na != b: True\na > b: True\na < b: False\na >= c: True\nb <= a: True\nname == \'Python\': True'
                },
                {
                  title: 'Toán tử logic',
                  code:
                    "age = 25\n" +
                    "income = 50000\n" +
                    "credit_score = 700\n\n" +
                    "# AND - ca hai dieu kien phai dung\n" +
                    "qualifies = age >= 18 and income >= 30000\n" +
                    "print(\"Duoc phep vay:\", qualifies)\n\n" +
                    "# OR - chi can mot trong hai\n" +
                    "is_special = age < 18 or age >= 65\n" +
                    "print(\"La doi tuong dac biet:\", is_special)\n\n" +
                    "# NOT - dao nguoc\n" +
                    "is_not_child = not (age < 18)\n" +
                    "print(\"Khong phai tre em:\", is_not_child)\n\n" +
                    "# Ket hop nhieu\n" +
                    "approved = (income >= 30000 and credit_score >= 650) or age < 25\n" +
                    "print(\"Duoc chap thuan:\", approved)",
                  explanation: 'AND yêu cầu cả hai, OR chỉ cần một, NOT đảo ngược',
                  output: 'Duoc phep vay: True\nLa doi tuong dac biet: False\nKhong phai tre em: True\nDuoc chap thuan: True'
                }
              ],
              quiz: [
                { id: 'q1-3-3-1', question: 'Kết quả của (10 > 5) and (3 < 2) là gì?', options: ['True', 'False', 'Error', 'None'], correct_index: 1, explanation: '10 > 5 = True, 3 < 2 = False, True and False = False.' },
                { id: 'q1-3-3-2', question: 'not (5 != 5) cho kết quả là gì?', options: ['True', 'False', 'Error', 'None'], correct_index: 0, explanation: '5 != 5 = False, not False = True.' },
                { id: 'q1-3-3-3', question: 'Toán tử nào yêu cầu CẢ HAI điều kiện đều đúng?', options: ['or', 'and', 'not', '=='], correct_index: 1, explanation: 'AND (and) yêu cầu cả hai điều kiện đều True mới trả về True.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    title: 'Điều kiện và Vòng lặp',
    slug: 'dieu-kien-va-vong-lap',
    description: 'Học cách điều khiển luồng chương trình với if/else và for/while',
    icon: '🔄',
    color: '#8B5CF6',
    order_index: 2,
    is_published: true,
    modules: [
      {
        id: 'mod-2-1',
        course_id: 'level-2',
        title: 'Câu điều kiện if/else',
        slug: 'cau-dieu-kien-if-else',
        description: 'Học cách rẽ nhánh chương trình với if, elif, else',
        icon: '🔀',
        color: '#8B5CF6',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-2-1-1',
            module_id: 'mod-2-1',
            title: 'Câu điều kiện if',
            slug: 'cau-dieu-kien-if',
            description: 'Cách sử dụng if để kiểm tra điều kiện',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách hoạt động của câu điều kiện if',
                'Biết cách sử dụng if, else trong Python',
                'Áp dụng if để giải quyết bài toán thực tế'
              ],
              theory:
                "## Câu điều kiện if\n\n" +
                "Câu điều kiện `if` cho phép chương trình thực hiện các hành động khác nhau dựa trên việc kiểm tra một điều kiện nào đó.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "if điều_kiện:\n" +
                "    # code bên trong if\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "age = 18\n" +
                "if age >= 18:\n" +
                "    print(\"Bạn là người lớn\")\n" +
                "```\n\n" +
                "**Quy tắc quan trọng:**\n" +
                "- Điều kiện phải là `True` hoặc `False`\n" +
                "- Code bên trong `if` phải được thụt lề (4 dấu cách)\n" +
                "- Dấu `:` cuối dòng là bắt buộc",
              examples: [
                {
                  title: 'Kiểm tra số dương',
                  code:
                    "num = 10\n" +
                    "if num > 0:\n" +
                    "    print(\"Số dương\")",
                  explanation: 'Nếu num > 0 thì in ra "Số dương"',
                  output: 'Số dương'
                },
                {
                  title: 'Kiểm tra đăng nhập',
                  code:
                    "username = \"admin\"\n" +
                    "if username == \"admin\":\n" +
                    "    print(\"Chào mừng admin!\")",
                  explanation: 'So sánh username với chuỗi "admin"',
                  output: 'Chào mừng admin!'
                }
              ],
              quiz: [
                { id: 'q2-1-1-1', question: 'Cú pháp nào đúng cho if?', options: ['if x > 5', 'if (x > 5)', 'if x > 5 then:', 'if x > 5:'], correct_index: 3, explanation: 'Python dùng `if điều_kiện:` với dấu `:` cuối dòng.' },
                { id: 'q2-1-1-2', question: 'Điều gì xảy ra nếu điều kiện trong if là False?', options: ['Chương trình báo lỗi', 'Code bên trong if được thực thi', 'Code bên trong if bị bỏ qua', 'Chương trình dừng'], correct_index: 2, explanation: 'Khi điều kiện là False, code bên trong if sẽ bị bỏ qua.' },
                { id: 'q2-1-1-3', question: 'Tại sao code trong if cần thụt lề?', options: ['Để code đẹp hơn', 'Python yêu cầu thụt lề để xác định khối code', 'Để chạy nhanh hơn', 'Không bắt buộc'], correct_index: 1, explanation: 'Python dùng thụt lề để xác định khối code, không có thụt lề sẽ gây IndentationError.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-1-2',
            module_id: 'mod-2-1',
            title: 'Câu lệnh else',
            slug: 'cau-lenh-else',
            description: 'Cách sử dụng else để xử lý trường hợp không thỏa điều kiện if',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách hoạt động của else',
                'Biết cách kết hợp if và else',
                'Áp dụng vào bài toán thực tế'
              ],
              theory:
                "## Câu lệnh else\n\n" +
                "Câu lệnh `else` được sử dụng cùng với `if`, cho phép thực hiện một khối code khác khi điều kiện trong `if` là False.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "if điều_kiện:\n" +
                "    # code nếu điều kiện đúng\n" +
                "else:\n" +
                "    # code nếu điều kiện sai\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- `else` phải đi sau `if` và cùng thụt lề với `if`\n" +
                "- `else` không có điều kiện riêng, nó chỉ chạy khi `if` không chạy\n" +
                "- Chỉ có một `else` cho mỗi `if`\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "age = 15\n" +
                "if age >= 18:\n" +
                "    print(\"Người lớn\")\n" +
                "else:\n" +
                "    print(\"Trẻ em\")\n" +
                "```",
              examples: [
                {
                  title: 'Kiểm tra số chẵn lẻ',
                  code:
                    "num = 7\n\n" +
                    "if num % 2 == 0:\n" +
                    "    print(num, \"là số chẵn\")\n" +
                    "else:\n" +
                    "    print(num, \"là số lẻ\")",
                  explanation: 'Nếu không chia hết cho 2 thì là số lẻ',
                  output: '7 là số lẻ'
                },
                {
                  title: 'Kiểm tra tuổi lái xe',
                  code:
                    "age = 16\n\n" +
                    "if age >= 18:\n" +
                    "    print(\"Bạn đủ tuổi lái xe\")\n" +
                    "else:\n" +
                    "    print(\"Bạn chưa đủ tuổi lái xe\")\n" +
                    "    print(\"Vui lòng chờ\", 18 - age, \"năm nữa\")",
                  explanation: 'else xử lý trường hợp không đủ điều kiện',
                  output: 'Bạn chưa đủ tuổi lái xe\nVui lòng chờ 2 năm nữa'
                }
              ],
              quiz: [
                { id: 'q2-1-2-1', question: 'else có điều kiện riêng không?', options: ['Có', 'Không', 'Tùy trường hợp', 'Chỉ trong vòng lặp'], correct_index: 1, explanation: 'else không có điều kiện riêng, nó chạy khi điều kiện if là False.' },
                { id: 'q2-1-2-2', question: 'Có thể có else mà không có if không?', options: ['Có', 'Không', 'Chỉ khi dùng vòng lặp', 'Tùy trường hợp'], correct_index: 1, explanation: 'else phải đi cùng với if, không thể đứng độc lập.' },
                { id: 'q2-1-2-3', question: 'Nếu điều kiện if đúng thì else có chạy không?', options: ['Có', 'Không', 'Có thể', 'Tùy trường hợp'], correct_index: 1, explanation: 'Nếu điều kiện if đúng (True), else sẽ bị bỏ qua hoàn toàn.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-1-3',
            module_id: 'mod-2-1',
            title: 'Câu lệnh elif',
            slug: 'cau-lenh-elif',
            description: 'Cách sử dụng elif để kiểm tra nhiều điều kiện',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách hoạt động của elif',
                'Biết cách sử dụng nhiều elif',
                'Kết hợp if, elif, else trong một cấu trúc'
              ],
              theory:
                "## Câu lệnh elif\n\n" +
                "`elif` là viết tắt của \"else if\", cho phép kiểm tra nhiều điều kiện liên tiếp.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "if điều_kiện_1:\n" +
                "    # code 1\n" +
                "elif điều_kiện_2:\n" +
                "    # code 2\n" +
                "elif điều_kiện_3:\n" +
                "    # code 3\n" +
                "else:\n" +
                "    # code nếu không có điều kiện nào đúng\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- Python kiểm tra từ trên xuống dưới\n" +
                "- Nếu điều kiện nào đúng, code của điều kiện đó sẽ chạy và bỏ qua phần còn lại\n" +
                "- `else` là optional (có thể có hoặc không)\n\n" +
                "**Ví dụ xếp loại điểm:**\n" +
                "```python\n" +
                "score = 85\n" +
                "if score >= 90:\n" +
                "    print(\"A\")\n" +
                "elif score >= 80:\n" +
                "    print(\"B\")\n" +
                "elif score >= 70:\n" +
                "    print(\"C\")\n" +
                "else:\n" +
                "    print(\"D\")\n" +
                "```",
              examples: [
                {
                  title: 'Xếp loại điểm số',
                  code:
                    "score = 85\n\n" +
                    "if score >= 90:\n" +
                    "    print(\"Xếp loại: A\")\n" +
                    "elif score >= 80:\n" +
                    "    print(\"Xếp loại: B\")\n" +
                    "elif score >= 70:\n" +
                    "    print(\"Xếp loại: C\")\n" +
                    "elif score >= 60:\n" +
                    "    print(\"Xếp loại: D\")\n" +
                    "else:\n" +
                    "    print(\"Xếp loại: F\")",
                  explanation: 'Kiểm tra lần lượt từ điều kiện đầu tiên',
                  output: 'Xếp loại: B'
                },
                {
                  title: 'Kiểm tra ngày trong tuần',
                  code:
                    "day = 3\n\n" +
                    "if day == 1:\n" +
                    "    print(\"Chủ nhật\")\n" +
                    "elif day == 2:\n" +
                    "    print(\"Thứ hai\")\n" +
                    "elif day == 3:\n" +
                    "    print(\"Thứ ba\")\n" +
                    "elif day == 4:\n" +
                    "    print(\"Thứ tư\")\n" +
                    "elif day == 5:\n" +
                    "    print(\"Thứ năm\")\n" +
                    "elif day == 6:\n" +
                    "    print(\"Thứ sáu\")\n" +
                    "elif day == 7:\n" +
                    "    print(\"Thứ bảy\")\n" +
                    "else:\n" +
                    "    print(\"Ngày không hợp lệ\")",
                  explanation: 'Dùng elif để kiểm tra nhiều trường hợp',
                  output: 'Thứ ba'
                }
              ],
              quiz: [
                { id: 'q2-1-3-1', question: 'elif có thể sử dụng bao nhiêu lần?', options: ['Chỉ 1 lần', 'Tối đa 2 lần', 'Không giới hạn', 'Tùy phiên bản Python'], correct_index: 2, explanation: 'Có thể sử dụng bao nhiêu elif tùy ý trong Python.' },
                { id: 'q2-1-3-2', question: 'Điều gì xảy ra khi nhiều điều kiện đều đúng?', options: ['Chạy tất cả', 'Chỉ chạy điều kiện đầu tiên đúng', 'Báo lỗi', 'Chạy điều kiện cuối cùng'], correct_index: 1, explanation: 'Python chỉ chạy khối code của điều kiện đúng đầu tiên và bỏ qua phần còn lại.' },
                { id: 'q2-1-3-3', question: 'Có thể có elif mà không có else không?', options: ['Có', 'Không', 'Chỉ khi có ít nhất 2 elif', 'Tùy trường hợp'], correct_index: 0, explanation: 'else là optional, có thể có elif mà không có else.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-1-4',
            module_id: 'mod-2-1',
            title: 'Điều kiện lồng nhau',
            slug: 'dieu-kien-long-nhau',
            description: 'Cách sử dụng câu điều kiện lồng nhau',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách điều kiện lồng nhau hoạt động',
                'Biết cách viết câu điều kiện lồng nhau',
                'Tránh các lỗi thường gặp với điều kiện lồng nhau'
              ],
              theory:
                "## Điều kiện lồng nhau\n\n" +
                "Điều kiện lồng nhau (nested conditions) là việc đặt một câu điều kiện bên trong câu điều kiện khác.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "if điều_kiện_1:\n" +
                "    # code 1\n" +
                "    if điều_kiện_2:\n" +
                "        # code 2\n" +
                "    else:\n" +
                "        # code 3\n" +
                "else:\n" +
                "    # code 4\n" +
                "```\n\n" +
                "**Lưu ý:**\n" +
                "- Mỗi cấp lồng nhau cần thụt lề thêm 4 dấu cách\n" +
                "- Không nên lồng quá sâu (thường tối đa 3 cấp)\n" +
                "- Có thể dùng `and` để thay thế cho điều kiện lồng nhau\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "age = 25\n" +
                "has_license = True\n" +
                "if age >= 18:\n" +
                "    if has_license:\n" +
                "        print(\"Có thể lái xe\")\n" +
                "    else:\n" +
                "        print(\"Cần có bằng lái\")\n" +
                "else:\n" +
                "    print(\"Chưa đủ tuổi\")\n" +
                "```",
              examples: [
                {
                  title: 'Kiểm tra đăng nhập nâng cao',
                  code:
                    "username = \"admin\"\n" +
                    "password = \"123456\"\n" +
                    "is_active = True\n\n" +
                    "if username == \"admin\":\n" +
                    "    if password == \"123456\":\n" +
                    "        if is_active:\n" +
                    "            print(\"Đăng nhập thành công!\")\n" +
                    "        else:\n" +
                    "            print(\"Tài khoản bị khóa\")\n" +
                    "    else:\n" +
                    "        print(\"Sai mật khẩu\")\n" +
                    "else:\n" +
                    "    print(\"Tài khoản không tồn tại\")",
                  explanation: 'Kiểm tra nhiều điều kiện lồng nhau',
                  output: 'Đăng nhập thành công!'
                },
                {
                  title: 'Xếp loại học sinh với điều kiện lồng',
                  code:
                    "score = 92\n" +
                    "attendance = 90\n\n" +
                    "if score >= 90:\n" +
                    "    if attendance >= 90:\n" +
                    "        print(\"Xuất sắc\")\n" +
                    "    else:\n" +
                    "        print(\"Giỏi - Cần cải thiện chuyên cần\")\n" +
                    "elif score >= 80:\n" +
                    "    if attendance >= 80:\n" +
                    "        print(\"Giỏi\")\n" +
                    "    else:\n" +
                    "        print(\"Khá - Cần cải thiện chuyên cần\")\n" +
                    "else:\n" +
                    "    print(\"Cần học thêm\")",
                  explanation: 'Kết hợp nhiều điều kiện để xếp loại chính xác hơn',
                  output: 'Xuất sắc'
                }
              ],
              quiz: [
                { id: 'q2-1-4-1', question: 'Điều kiện lồng nhau là gì?', options: ['Nhiều if trong một dòng', 'Điều kiện bên trong điều kiện khác', 'Dùng and để kết hợp điều kiện', 'Điều kiện trong vòng lặp'], correct_index: 1, explanation: 'Điều kiện lồng nhau là đặt câu điều kiện bên trong câu điều kiện khác.' },
                { id: 'q2-1-4-2', question: 'Nên lồng tối đa bao nhiêu cấp?', options: ['1 cấp', '2 cấp', '3 cấp', 'Không giới hạn'], correct_index: 2, explanation: 'Thường tối đa 3 cấp để code dễ đọc và bảo trì.' },
                { id: 'q2-1-4-3', question: 'Cách nào tốt hơn cho điều kiện lồng?', options: ['if lồng if', 'Dùng and để kết hợp', 'Dùng elif', 'Không có cách nào tốt hơn'], correct_index: 1, explanation: 'Dùng `and` giúp code ngắn gọn và dễ đọc hơn so với lồng nhiều cấp.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-2-2',
        course_id: 'level-2',
        title: 'Vòng lặp for',
        slug: 'vong-lap-for',
        description: 'Tìm hiểu về vòng lặp for trong Python',
        icon: '🔁',
        color: '#F59E0B',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-2-2-1',
            module_id: 'mod-2-2',
            title: 'Vòng lặp for cơ bản',
            slug: 'vong-lap-for-co-ban',
            description: 'Cách sử dụng vòng lặp for trong Python',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách hoạt động của vòng lặp for',
                'Biết cú pháp của vòng lặp for',
                'Sử dụng for để lặp qua các phần tử'
              ],
              theory:
                "## Vòng lặp for cơ bản\n\n" +
                "Vòng lặp `for` trong Python được sử dụng để lặp qua một dãy phần tử (list, tuple, string, range,...).\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "for phần_tử in dãy:\n" +
                "    # code bên trong vòng lặp\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- `phần_tử` là biến nhận giá trị của từng phần tử trong dãy\n" +
                "- `dãy` có thể là list, tuple, string, hoặc range\n" +
                "- Vòng lặp chạy cho đến khi hết phần tử trong dãy\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "for i in [1, 2, 3]:\n" +
                "    print(i)\n" +
                "# Output: 1 2 3\n" +
                "```",
              examples: [
                {
                  title: 'Lặp qua list',
                  code:
                    "fruits = [\"táo\", \"cam\", \"xoài\"]\n\n" +
                    "for fruit in fruits:\n" +
                    "    print(fruit)",
                  explanation: 'Mỗi lần lặp, fruit nhận một giá trị từ list',
                  output: 'táo\ncam\nxoài'
                },
                {
                  title: 'Lặp với range',
                  code:
                    "# Lặp 5 lần\n" +
                    "for i in range(5):\n" +
                    "    print(\"Lần thứ\", i + 1)\n\n" +
                    "# Lặp từ 1 đến 5\n" +
                    "for i in range(1, 6):\n" +
                    "    print(\"Số:\", i)",
                  explanation: 'range(5) tạo dãy 0-4, range(1,6) tạo dãy 1-5',
                  output: 'Lần thứ 1\nLần thứ 2\nLần thứ 3\nLần thứ 4\nLần thứ 5\nSố: 1\nSố: 2\nSố: 3\nSố: 4\nSố: 5'
                }
              ],
              quiz: [
                { id: 'q2-2-1-1', question: 'for i in range(3) lặp mấy lần?', options: ['2 lần', '3 lần', '4 lần', '1 lần'], correct_index: 1, explanation: 'range(3) tạo dãy 0, 1, 2 nên lặp 3 lần.' },
                { id: 'q2-2-1-2', question: 'Biến trong vòng for có thể đặt tên gì?', options: ['Chỉ i', 'Chỉ x', 'Tùy ý', 'Chỉ số'], correct_index: 2, explanation: 'Có thể đặt tên biến tùy ý như i, item, fruit, name,...' },
                { id: 'q2-2-1-3', question: 'Vòng for lặp qua string như thế nào?', options: ['Từng ký tự', 'Từng từ', 'Từng câu', 'Không thể'], correct_index: 0, explanation: 'Vòng for lặp qua từng ký tự trong string.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-2-2',
            module_id: 'mod-2-2',
            title: 'Hàm range()',
            slug: 'ham-range',
            description: 'Tìm hiểu cách sử dụng hàm range() trong Python',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách range() tạo ra dãy số',
                'Biết các cách sử dụng range() với 1, 2, 3 tham số',
                'Áp dụng range() vào vòng lặp for'
              ],
              theory:
                "## Hàm range()\n\n" +
                "Hàm `range()` tạo ra một dãy số nguyên, thường được dùng với vòng lặp for.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "range(stop)           # 0 đến stop-1\n" +
                "range(start, stop)    # start đến stop-1\n" +
                "range(start, stop, step)  # với bước nhảy\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "- `range(5)` → 0, 1, 2, 3, 4\n" +
                "- `range(1, 6)` → 1, 2, 3, 4, 5\n" +
                "- `range(0, 10, 2)` → 0, 2, 4, 6, 8\n" +
                "- `range(5, 0, -1)` → 5, 4, 3, 2, 1\n\n" +
                "**Lưu ý:**\n" +
                "- start mặc định là 0\n" +
                "- step mặc định là 1\n" +
                "- range không tạo list, nó tạo đối tượng range (lazy)\n" +
                "- Muốn thành list: `list(range(5))`",
              examples: [
                {
                  title: 'Các dạng range',
                  code:
                    "# range(stop) - từ 0\n" +
                    "print(\"range(5):\")\n" +
                    "for i in range(5):\n" +
                    "    print(i, end=\" \")\n\n" +
                    "print(\"\\n\\nrange(2, 8):\")\n" +
                    "for i in range(2, 8):\n" +
                    "    print(i, end=\" \")\n\n" +
                    "print(\"\\n\\nrange(0, 10, 2):\")\n" +
                    "for i in range(0, 10, 2):\n" +
                    "    print(i, end=\" \")",
                  explanation: 'Các cách dùng range với 1, 2, 3 tham số',
                  output: 'range(5):\n0 1 2 3 4 \n\nrange(2, 8):\n2 3 4 5 6 7 \n\nrange(0, 10, 2):\n0 2 4 6 8 '
                },
                {
                  title: 'Range đếm ngược',
                  code:
                    "# Đếm ngược\n" +
                    "print(\"Đếm ngược từ 5:\")\n" +
                    "for i in range(5, 0, -1):\n" +
                    "    print(i, end=\" \")\n\n" +
                    "# Đếm ngược với bước -2\n" +
                    "print(\"\\n\\nĐếm ngược cách 2:\")\n" +
                    "for i in range(10, 0, -2):\n" +
                    "    print(i, end=\" \")\n\n" +
                    "# Chuyển range thành list\n" +
                    "numbers = list(range(1, 6))\n" +
                    "print(\"\\n\\nList từ range:\", numbers)",
                  explanation: 'Dùng step âm để đếm ngược',
                  output: 'Đếm ngược từ 5:\n5 4 3 2 1 \n\nĐếm ngược cách 2:\n10 8 6 4 2 \n\nList từ range: [1, 2, 3, 4, 5]'
                }
              ],
              quiz: [
                { id: 'q2-2-2-1', question: 'range(1, 10) tạo ra dãy nào?', options: ['1 đến 10', '1 đến 9', '0 đến 9', '0 đến 10'], correct_index: 1, explanation: 'range(1, 10) tạo dãy từ 1 đến 9 (không bao gồm 10).' },
                { id: 'q2-2-2-2', question: 'range(5) tương đương với gì?', options: ['range(1, 5)', 'range(0, 5)', 'range(0, 6)', 'range(5, 0)'], correct_index: 1, explanation: 'Khi chỉ có 1 tham số, start mặc định là 0, stop là tham số đó.' },
                { id: 'q2-2-2-3', question: 'range(0, 10, 2) cho kết quả nào?', options: ['0, 1, 2, 3, 4', '0, 2, 4, 6, 8', '2, 4, 6, 8, 10', '0, 5, 10'], correct_index: 1, explanation: 'Step = 2 nên tăng 2 mỗi lần: 0, 2, 4, 6, 8.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-2-3',
            module_id: 'mod-2-2',
            title: 'Lặp qua chuỗi',
            slug: 'lap-qua-chuoi',
            description: 'Cách lặp qua chuỗi ký tự trong Python',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 3,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách lặp qua từng ký tự trong chuỗi',
                'Biết cách đếm ký tự trong chuỗi',
                'Áp dụng vào các bài toán xử lý chuỗi'
              ],
              theory:
                "## Lặp qua chuỗi\n\n" +
                "Trong Python, chuỗi (string) là một dãy các ký tự. Ta có thể dùng vòng lặp for để lặp qua từng ký tự.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "for ký_tự in chuỗi:\n" +
                "    # xử lý từng ký tự\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "for ch in \"Python\":\n" +
                "    print(ch)\n" +
                "# Output: P y t h o n\n" +
                "```\n\n" +
                "**Ứng dụng:**\n" +
                "- Đếm số ký tự\n" +
                "- Tìm ký tự đặc biệt\n" +
                "- Đảo ngược chuỗi\n" +
                "- Đếm ký tự hoa/thường",
              examples: [
                {
                  title: 'Đếm ký tự trong chuỗi',
                  code:
                    "text = \"Hello\"\n" +
                    "count = 0\n\n" +
                    "for char in text:\n" +
                    "    count += 1\n" +
                    "    print(char)\n\n" +
                    "print(\"\\nTổng số ký tự:\", count)",
                  explanation: 'Lặp qua từng ký tự và đếm',
                  output: 'H\ne\nl\nl\no\n\nTổng số ký tự: 5'
                },
                {
                  title: 'Đếm ký tự hoa và thường',
                  code:
                    "text = \"Hello Python\"\n" +
                    "upper_count = 0\n" +
                    "lower_count = 0\n\n" +
                    "for char in text:\n" +
                    "    if char.isupper():\n" +
                    "        upper_count += 1\n" +
                    "    elif char.islower():\n" +
                    "        lower_count += 1\n\n" +
                    "print(\"Chữ hoa:\", upper_count)\n" +
                    "print(\"Chữ thường:\", lower_count)\n" +
                    "print(\"Tổng ký tự:\", upper_count + lower_count)",
                  explanation: 'Đếm chữ hoa và chữ thường trong chuỗi',
                  output: 'Chữ hoa: 2\nChữ thường: 9\nTổng ký tự: 11'
                }
              ],
              quiz: [
                { id: 'q2-2-3-1', question: 'Lặp qua chuỗi \"Python\" được mấy lần?', options: ['5 lần', '6 lần', '4 lần', '7 lần'], correct_index: 1, explanation: '\"Python\" có 6 ký tự nên lặp 6 lần.' },
                { id: 'q2-2-3-2', question: 'Làm sao đếm ký tự trong chuỗi?', options: ['len(string)', 'count(string)', 'length(string)', 'size(string)'], correct_index: 0, explanation: 'Hàm len() trả về số ký tự trong chuỗi.' },
                { id: 'q2-2-3-3', question: 'Method nào kiểm tra chữ hoa?', options: ['isupper()', 'isUpper()', 'upper()', 'isUpperCase()'], correct_index: 0, explanation: 'isupper() trả về True nếu ký tự là chữ hoa.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-2-4',
            module_id: 'mod-2-2',
            title: 'Vòng lặp for lồng nhau',
            slug: 'vong-lap-for-long-nhau',
            description: 'Cách sử dụng vòng lặp for lồng nhau',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 4,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách vòng lặp for lồng nhau hoạt động',
                'Biết cách tạo bảng nhân',
                'Tránh các lỗi thường gặp với vòng lặp lồng nhau'
              ],
              theory:
                "## Vòng lặp for lồng nhau\n\n" +
                "Vòng lặp lồng nhau là đặt một vòng lặp bên trong vòng lặp khác.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "for i in dãy_1:\n" +
                "    for j in dãy_2:\n" +
                "        # code bên trong\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- Vòng lặp ngoài chạy trước\n" +
                "- Với mỗi lần lặp của vòng ngoài, vòng trong chạy hết\n" +
                "- Vòng trong chạy nhiều lần hơn vòng ngoài\n\n" +
                "**Ví dụ bảng nhân:**\n" +
                "```python\n" +
                "for i in range(1, 4):\n" +
                "    for j in range(1, 4):\n" +
                "        print(i, \"x\", j, \"=\", i*j)\n" +
                "```",
              examples: [
                {
                  title: 'Bảng nhân cơ bản',
                  code:
                    "# Bảng nhân 1 đến 3\n" +
                    "for i in range(1, 4):\n" +
                    "    for j in range(1, 4):\n" +
                    "        print(i, \"x\", j, \"=\", i * j)\n" +
                    "    print(\"-\" * 10)",
                  explanation: 'Mỗi lần lặp vòng ngoài, vòng trong chạy hết 3 lần',
                  output: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n----------\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n----------\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n----------'
                },
                {
                  title: 'Vẽ tam giác sao',
                  code:
                    "# Vẽ tam giác vuông\n" +
                    "n = 5\n\n" +
                    "for i in range(1, n + 1):\n" +
                    "    for j in range(1, i + 1):\n" +
                    "        print(\"*\", end=\" \")\n" +
                    "    print()",
                  explanation: 'Số sao mỗi dòng tăng dần từ 1 đến n',
                  output: '*\n* *\n* * *\n* * * *\n* * * * *'
                }
              ],
              quiz: [
                { id: 'q2-2-4-1', question: 'Vòng for lồng nhau chạy như thế nào?', options: ['Chạy song song', 'Vòng trong chạy hết trước', 'Vòng ngoài chạy trước, mỗi lần vòng ngoài chạy thì vòng trong chạy hết', 'Chỉ chạy vòng trong'], correct_index: 2, explanation: 'Vòng ngoài chạy trước, với mỗi lần lặp của vòng ngoài, vòng trong chạy hết tất cả các lần.' },
                { id: 'q2-2-4-2', question: 'for i in range(2): for j in range(3) chạy tổng bao nhiêu lần?', options: ['5 lần', '6 lần', '2 lần', '3 lần'], correct_index: 1, explanation: '2 lần (vòng ngoài) x 3 lần (vòng trong) = 6 lần.' },
                { id: 'q2-2-4-3', question: 'Lồng quá nhiều vòng for có vấn đề gì?', options: ['Code chạy chậm hơn', 'Code khó đọc, nên tránh', 'Có thể gây lỗi', 'Tất cả đều đúng'], correct_index: 3, explanation: 'Lồng quá nhiều vòng for làm code chậm, khó đọc và khó bảo trì.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-2-3',
        course_id: 'level-2',
        title: 'Vòng lặp while',
        slug: 'vong-lap-while',
        description: 'Tìm hiểu về vòng lặp while trong Python',
        icon: '🔂',
        color: '#EF4444',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-2-3-1',
            module_id: 'mod-2-3',
            title: 'Vòng lặp while cơ bản',
            slug: 'vong-lap-while-co-ban',
            description: 'Cách sử dụng vòng lặp while trong Python',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách hoạt động của vòng lặp while',
                'Biết cú pháp của vòng lặp while',
                'Phân biệt for và while'
              ],
              theory:
                "## Vòng lặp while cơ bản\n\n" +
                "Vòng lặp `while` tiếp tục lặp chừng nào điều kiện còn đúng (True).\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "while điều_kiện:\n" +
                "    # code bên trong vòng lặp\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- Kiểm tra điều kiện trước\n" +
                "- Nếu điều kiện đúng, thực thi code rồi quay lại kiểm tra\n" +
                "- Nếu điều kiện sai, thoát vòng lặp\n" +
                "- Cần thay đổi biến trong điều kiện để tránh vòng lặp vô hạn\n\n" +
                "**So sánh for và while:**\n" +
                "- `for`: khi biết trước số lần lặp\n" +
                "- `while`: khi chưa biết trước số lần lặp, phụ thuộc điều kiện",
              examples: [
                {
                  title: 'Đếm số với while',
                  code:
                    "count = 0\n\n" +
                    "while count < 5:\n" +
                    "    print(\"Count:\", count)\n" +
                    "    count += 1\n\n" +
                    "print(\"Kết thúc\")",
                  explanation: 'Lặp cho đến khi count >= 5',
                  output: 'Count: 0\nCount: 1\nCount: 2\nCount: 3\nCount: 4\nKết thúc'
                },
                {
                  title: 'Tính tổng với while',
                  code:
                    "n = 5\n" +
                    "sum = 0\n" +
                    "i = 1\n\n" +
                    "while i <= n:\n" +
                    "    sum += i\n" +
                    "    i += 1\n\n" +
                    "print(\"Tổng từ 1 đến\", n, \"là:\", sum)",
                  explanation: 'Tính tổng 1+2+3+4+5 = 15',
                  output: 'Tổng từ 1 đến 5 là: 15'
                }
              ],
              quiz: [
                { id: 'q2-3-1-1', question: 'Vòng while chạy cho đến khi nào?', options: ['Điều kiện sai', 'Điều kiện đúng', 'Luôn luôn', 'Không bao giờ'], correct_index: 0, explanation: 'Vòng while tiếp tục chạy chừng nào điều kiện còn True, và dừng khi điều kiện thành False.' },
                { id: 'q2-3-1-2', question: 'Điều gì xảy ra nếu điều kiện while luôn True?', options: ['Chương trình báo lỗi', 'Vòng lặp vô hạn', 'Vòng lặp không chạy', 'Kết thúc ngay'], correct_index: 1, explanation: 'Nếu điều kiện luôn True mà không có break, vòng lặp sẽ chạy mãi mãi (vô hạn).' },
                { id: 'q2-3-1-3', question: 'Khi nào nên dùng while thay vì for?', options: ['Khi biết trước số lần lặp', 'Khi chưa biết trước số lần lặp', 'Khi muốn code nhanh hơn', 'Khi lặp qua list'], correct_index: 1, explanation: 'While dùng khi chưa biết trước số lần lặp, phụ thuộc vào điều kiện bên ngoài.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-3-2',
            module_id: 'mod-2-3',
            title: 'Câu lệnh break',
            slug: 'cau-lenh-break',
            description: 'Cách sử dụng break để thoát vòng lặp',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách break hoạt động',
                'Biết cách dùng break để thoát vòng lặp',
                'Áp dụng break trong các tình huống thực tế'
              ],
              theory:
                "## Câu lệnh break\n\n" +
                "Câu lệnh `break` dùng để thoát vòng lặp ngay lập tức, bất kể điều kiện lặp còn đúng hay không.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "while điều_kiện:\n" +
                "    if điều_kiện_break:\n" +
                "        break\n" +
                "    # code khác\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- Khi gặp break, vòng lặp kết thúc NGAY LẬP TỨC\n" +
                "- Không chạy code còn lại trong vòng lặp\n" +
                "- Thường dùng với if để kiểm tra điều kiện thoát\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "while True:\n" +
                "    if điều_kiện:\n" +
                "        break\n" +
                "```",
              examples: [
                {
                  title: 'Tìm số trong vòng lặp',
                  code:
                    "target = 7\n" +
                    "i = 1\n\n" +
                    "while i <= 10:\n" +
                    "    if i == target:\n" +
                    "        print(\"Tìm thấy:\", i)\n" +
                    "        break\n" +
                    "    print(\"Đang tìm:\", i)\n" +
                    "    i += 1\n\n" +
                    "print(\"Kết thúc tìm kiếm\")",
                  explanation: 'Khi tìm thấy số 7, break thoát ngay khỏi vòng lặp',
                  output: 'Đang tìm: 1\nĐang tìm: 2\nĐang tìm: 3\nĐang tìm: 4\nĐang tìm: 5\nĐang tìm: 6\nTìm thấy: 7\nKết thúc tìm kiếm'
                },
                {
                  title: 'Nhập dữ liệu hợp lệ',
                  code:
                    "while True:\n" +
                    "    answer = input(\"Nhập 'quit' để thoát: \")\n" +
                    "    if answer == \"quit\":\n" +
                    "        print(\"Đã thoát!\")\n" +
                    "        break\n" +
                    "    print(\"Bạn nhập:\", answer)\n\n" +
                    "print(\"Chương trình kết thúc\")",
                  explanation: 'Dùng break để thoát khi người dùng nhập quit',
                  output: 'Nhập quit để thoát: hello\nBạn nhập: hello\nNhập quit để thoát: quit\nĐã thoát!\nChương trình kết thúc'
                }
              ],
              quiz: [
                { id: 'q2-3-2-1', question: 'break có tác dụng gì?', options: ['Bỏ qua lượt lặp hiện tại', 'Thoát ngay khỏi vòng lặp', 'Tiếp tục vòng lặp', 'Đợi một lúc'], correct_index: 1, explanation: 'break thoát ngay lập tức khỏi vòng lặp, không thực thi code còn lại trong vòng lặp.' },
                { id: 'q2-3-2-2', question: 'break có thể dùng trong vòng for không?', options: ['Có', 'Không', 'Chỉ trong while', 'Chỉ trong vòng lồng'], correct_index: 0, explanation: 'break có thể dùng trong cả vòng for và while.' },
                { id: 'q2-3-2-3', question: 'Điều gì xảy ra khi gặp break trong vòng lồng?', options: ['Thoát cả hai vòng', 'Chỉ thoát vòng trong', 'Báo lỗi', 'Tiếp tục'], correct_index: 1, explanation: 'break chỉ thoát vòng lặp gần nhất chứa nó (vòng trong).' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-3-3',
            module_id: 'mod-2-3',
            title: 'Câu lệnh continue',
            slug: 'cau-lenh-continue',
            description: 'Cách sử dụng continue để bỏ qua lượt lặp',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách continue hoạt động',
                'Biết cách dùng continue để bỏ qua lượt lặp',
                'Phân biệt break và continue'
              ],
              theory:
                "## Câu lệnh continue\n\n" +
                "Câu lệnh `continue` bỏ qua lượt lặp hiện tại và chuyển sang lượt lặp tiếp theo.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "while điều_kiện:\n" +
                "    if điều_kiện_continue:\n" +
                "        continue\n" +
                "    # code xử lý\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- Khi gặp continue, bỏ qua PHẦN CÒN LẠI của lượt lặp hiện tại\n" +
                "- Chuyển sang kiểm tra điều kiện và lặp lượt tiếp theo\n" +
                "- Khác với break (thoát hẳn vòng lặp)\n\n" +
                "**So sánh break và continue:**\n" +
                "- `break`: thoát hẳn vòng lặp\n" +
                "- `continue`: bỏ qua lượt hiện tại, sang lượt mới",
              examples: [
                {
                  title: 'Bỏ qua số chẵn',
                  code:
                    "i = 0\n\n" +
                    "while i < 10:\n" +
                    "    i += 1\n" +
                    "    if i % 2 == 0:\n" +
                    "        continue\n" +
                    "    print(i, \"là số lẻ\")\n\n" +
                    "print(\"Kết thúc\")",
                  explanation: 'Khi i là số chẵn, continue bỏ qua không in',
                  output: '1 là số lẻ\n3 là số lẻ\n5 là số lẻ\n7 là số lẻ\n9 là số lẻ\nKết thúc'
                },
                {
                  title: 'Tính tổng các số dương',
                  code:
                    "numbers = [1, -2, 3, -4, 5, -6, 7]\n" +
                    "sum = 0\n\n" +
                    "for num in numbers:\n" +
                    "    if num <= 0:\n" +
                    "        continue\n" +
                    "    sum += num\n" +
                    "    print(\"Thêm:\", num)\n\n" +
                    "print(\"Tổng các số dương:\", sum)",
                  explanation: 'Bỏ qua các số không dương, chỉ cộng số dương',
                  output: 'Thêm: 1\nThêm: 3\nThêm: 5\nThêm: 7\nTổng các số dương: 16'
                }
              ],
              quiz: [
                { id: 'q2-3-3-1', question: 'continue có tác dụng gì?', options: ['Thoát vòng lặp', 'Bỏ qua lượt hiện tại, sang lượt mới', 'Dừng chương trình', 'Chạy tiếp'], correct_index: 1, explanation: 'continue bỏ qua phần còn lại của lượt lặp hiện tại và chuyển sang lượt tiếp theo.' },
                { id: 'q2-3-3-2', question: 'continue có giống break không?', options: ['Có', 'Không', 'Giống nhau', 'Tùy trường hợp'], correct_index: 1, explanation: 'break thoát hẳn vòng lặp, continue chỉ bỏ qua lượt hiện tại.' },
                { id: 'q2-3-3-3', question: 'Khi nào nên dùng continue?', options: ['Khi muốn thoát vòng lặp', 'Khi muốn bỏ qua lượt lặp hiện tại', 'Khi muốn dừng chương trình', 'Khi muốn chạy tiếp'], correct_index: 1, explanation: 'Dùng continue khi muốn bỏ qua xử lý phần còn lại của lượt hiện tại và chuyển sang lượt tiếp theo.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-3',
    title: 'Cấu trúc dữ liệu cơ bản',
    slug: 'cau-truc-du-lieu-co-ban',
    description: 'List, Tuple, Set, Dictionary - cách lưu trữ dữ liệu hiệu quả',
    icon: '📋',
    color: '#06B6D4',
    order_index: 3,
    is_published: true,
    modules: [
      {
        id: 'mod-3-1',
        course_id: 'level-3',
        title: 'List (Danh sách)',
        slug: 'list-danh-sach',
        description: 'Tìm hiểu về List - cấu trúc dữ liệu tuyến tính trong Python',
        icon: '📝',
        color: '#06B6D4',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-3-1-1',
            module_id: 'mod-3-1',
            title: 'Tạo và truy cập List',
            slug: 'tao-va-truy-cap-list',
            description: 'Cách tạo List và truy cập phần tử',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu List là gì',
                'Biết cách tạo List trong Python',
                'Truy cập phần tử theo chỉ số'
              ],
              theory:
                "## List (Danh sách)\n\n" +
                "List là một cấu trúc dữ liệu cho phép lưu trữ nhiều giá trị trong một biến duy nhất.\n\n" +
                "**Tạo List:**\n\n" +
                "```python\n" +
                "ten_list = [phần_tử1, phần_tử2, phần_tử3]\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "fruits = [\"táo\", \"cam\", \"xoài\"]\n" +
                "numbers = [1, 2, 3, 4, 5]\n" +
                "mixed = [\"hello\", 123, True]\n" +
                "```\n\n" +
                "**Truy cập phần tử:**\n" +
                "- Chỉ số bắt đầu từ `0`\n" +
                "- `list[0]` - phần tử đầu tiên\n" +
                "- `list[-1]` - phần tử cuối cùng",
              examples: [
                {
                  title: 'Tạo và truy cập List',
                  code:
                    "fruits = [\"táo\", \"cam\", \"xoài\"]\n" +
                    "print(fruits[0])\n" +
                    "print(fruits[1])\n" +
                    "print(fruits[-1])",
                  explanation: 'Dùng chỉ số để truy cập phần tử',
                  output: 'táo\ncam\nxoài'
                }
              ],
              quiz: [
                { id: 'q3-1-1-1', question: 'Làm sao truy cập phần tử đầu tiên của list?', options: ['list[1]', 'list[0]', 'list(first)'], correct_index: 1, explanation: 'Chỉ số trong Python bắt đầu từ 0.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-1-2',
            module_id: 'mod-3-1',
            title: 'Thêm và xóa phần tử List',
            slug: 'them-xoa-phan-tu-list',
            description: 'Cách thêm và xóa phần tử trong List',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Biết cách thêm phần tử vào List',
                'Biết cách xóa phần tử khỏi List',
                'Phân biệt các phương thức thêm/xóa'
              ],
              theory:
                "## Thêm và xóa phần tử List\n\n" +
                "**Thêm phần tử:**\n\n" +
                "1. `append(item)` - Thêm vào cuối list\n" +
                "2. `insert(index, item)` - Chèn vào vị trí index\n" +
                "3. `extend(list)` - Thêm nhiều phần tử từ list khác\n\n" +
                "**Xóa phần tử:**\n\n" +
                "1. `pop()` - Xóa phần tử cuối, trả về phần tử đã xóa\n" +
                "2. `pop(index)` - Xóa phần tử tại vị trí index\n" +
                "3. `remove(item)` - Xóa phần tử đầu tiên có giá trị = item\n" +
                "4. `clear()` - Xóa tất cả phần tử\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "fruits = [\"táo\", \"cam\"]\n" +
                "fruits.append(\"xoài\")  # [\"táo\", \"cam\", \"xoài\"]\n" +
                "fruits.insert(1, \"bưởi\")  # [\"táo\", \"bưởi\", \"cam\", \"xoài\"]\n" +
                "fruits.pop()  # Xóa \"xoài\"\n" +
                "```",
              examples: [
                {
                  title: 'Thêm phần tử',
                  code:
                    "fruits = [\"táo\", \"cam\"]\n" +
                    "print(\"Ban đầu:\", fruits)\n\n" +
                    "fruits.append(\"xoài\")\n" +
                    "print(\"Sau append:\", fruits)\n\n" +
                    "fruits.insert(1, \"bưởi\")\n" +
                    "print(\"Sau insert:\", fruits)\n\n" +
                    "more_fruits = [\"nho\", \"cherry\"]\n" +
                    "fruits.extend(more_fruits)\n" +
                    "print(\"Sau extend:\", fruits)",
                  explanation: 'append thêm vào cuối, insert chèn vào vị trí, extend thêm nhiều phần tử',
                  output: 'Ban đầu: [\"táo\", \"cam\"]\nSau append: [\"táo\", \"cam\", \"xoài\"]\nSau insert: [\"táo\", \"bưởi\", \"cam\", \"xoài\"]\nSau extend: [\"táo\", \"bưởi\", \"cam\", \"xoài\", \"nho\", \"cherry\"]'
                },
                {
                  title: 'Xóa phần tử',
                  code:
                    "fruits = [\"táo\", \"cam\", \"xoài\", \"bưởi\"]\n" +
                    "print(\"Ban đầu:\", fruits)\n\n" +
                    "removed = fruits.pop()\n" +
                    "print(\"Pop:\", removed)\n" +
                    "print(\"Sau pop:\", fruits)\n\n" +
                    "fruits.remove(\"cam\")\n" +
                    "print(\"Sau remove:\", fruits)",
                  explanation: 'pop xóa phần tử cuối và trả về giá trị, remove xóa theo giá trị',
                  output: 'Ban đầu: [\"táo\", \"cam\", \"xoài\", \"bưởi\"]\nPop: bưởi\nSau pop: [\"táo\", \"cam\", \"xoài\"]\nSau remove: [\"táo\", \"xoài\"]'
                }
              ],
              quiz: [
                { id: 'q3-1-2-1', question: 'Phương thức nào thêm phần tử vào cuối list?', options: ['insert()', 'append()', 'add()'], correct_index: 1, explanation: 'append() thêm phần tử vào cuối list.' },
                { id: 'q3-1-2-2', question: 'remove() xóa phần tử dựa trên gì?', options: ['Chỉ số', 'Giá trị', 'Cả hai'], correct_index: 1, explanation: 'remove() xóa phần tử dựa trên giá trị, không phải chỉ số.' },
                { id: 'q3-1-2-3', question: 'Pop() trả về gì?', options: ['Phần tử đã xóa', 'Vị trí đã xóa', 'Không trả về gì'], correct_index: 0, explanation: 'pop() xóa phần tử và trả về giá trị của phần tử đó.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-1-3',
            module_id: 'mod-3-1',
            title: 'Cắt List (Slicing)',
            slug: 'cat-list',
            description: 'Cách cắt list để lấy một phần của list',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm slicing trong Python',
                'Biết cách cắt list với slicing',
                'Áp dụng slicing vào bài toán thực tế'
              ],
              theory:
                "## Cắt List (Slicing)\n\n" +
                "Slicing cho phép lấy một phần của list bằng cú pháp `list[start:stop]`.\n\n" +
                "**Cú pháp:**\n" +
                "```python\n" +
                "list[start:stop]  # từ start đến stop-1\n" +
                "list[start:]      # từ start đến cuối\n" +
                "list[:stop]       # từ đầu đến stop-1\n" +
                "list[:]           # copy toàn bộ list\n" +
                "```\n\n" +
                "**Tham số step:**\n" +
                "```python\n" +
                "list[start:stop:step]  # cách mỗi step phần tử\n" +
                "list[::-1]            # đảo ngược list\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "numbers = [0, 1, 2, 3, 4, 5]\n" +
                "numbers[1:4]   # [1, 2, 3]\n" +
                "numbers[::2]   # [0, 2, 4]\n" +
                "numbers[::-1]  # [5, 4, 3, 2, 1, 0]\n" +
                "```",
              examples: [
                {
                  title: 'Slicing cơ bản',
                  code:
                    "numbers = [0, 1, 2, 3, 4, 5]\n\n" +
                    "print(\"numbers[1:4]:\", numbers[1:4])\n" +
                    "print(\"numbers[::2]:\", numbers[::2])\n" +
                    "print(\"numbers[::-1]:\", numbers[::-1])\n" +
                    "print(\"numbers[:3]:\", numbers[:3])",
                  explanation: 'Slicing với start, stop và step khác nhau',
                  output: 'numbers[1:4]: [1, 2, 3]\nnumbers[::2]: [0, 2, 4]\nnumbers[::-1]: [5, 4, 3, 2, 1, 0]\nnumbers[:3]: [0, 1, 2]'
                },
                {
                  title: 'Ứng dụng slicing',
                  code:
                    "text = \"Hello Python\"\n" +
                    "chars = list(text)\n\n" +
                    "print(\"3 ký tự đầu:\", chars[:3])\n" +
                    "print(\"3 ký tự cuối:\", chars[-3:])\n" +
                    "print(\"Đảo ngược:\", chars[::-1])\n" +
                    "print(\"Từ ký tự thứ 6:\", chars[6:])",
                  explanation: 'Slicing áp dụng cho cả string',
                  output: '3 ký tự đầu: [\"H\", \"e\", \"l\"]\n3 ký tự cuối: [\"t\", \"h\", \"o\"]\nĐảo ngược: [\"n\", \"o\", \"h\", \"t\", \"y\", \"P\", \" \", \"l\", \"l\", \"e\", \"H\"]\nTừ ký tự thứ 6: [\" \", \"P\", \"y\", \"t\", \"h\", \"o\", \"n\"]'
                }
              ],
              quiz: [
                { id: 'q3-1-3-1', question: 'numbers[1:4] lấy mấy phần tử?', options: ['3', '4', '5', '2'], correct_index: 0, explanation: 'numbers[1:4] lấy từ index 1, 2, 3 (3 phần tử, không bao gồm 4).' },
                { id: 'q3-1-3-2', question: 'numbers[::-1] có tác dụng gì?', options: ['Lấy phần tử thứ 1', 'Đảo ngược list', 'Lấy tất cả'], correct_index: 1, explanation: 'Step = -1 nghĩa là đi ngược, đảo ngược list.' },
                { id: 'q3-1-3-3', question: 'numbers[:3] nghĩa là gì?', options: ['Từ index 0 đến 2', 'Từ index 0 đến 3', 'Từ index 3 đến cuối'], correct_index: 0, explanation: 'Khi không có start, mặc định là 0. [:3] nghĩa là [0:3] = lấy index 0, 1, 2.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-1-4',
            module_id: 'mod-3-1',
            title: 'Các phương thức List',
            slug: 'cac-phuong-thuc-list',
            description: 'Tìm hiểu các phương thức quan trọng của List',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Nắm được các phương thức phổ biến của List',
                'Biết cách sử dụng sort, reverse, count, index',
                'Phân biệt sort và sorted'
              ],
              theory:
                "## Các phương thức List\n\n" +
                "**Phương thức tìm kiếm:**\n" +
                "- `index(item)` - Trả về vị trí đầu tiên của item\n" +
                "- `count(item)` - Đếm số lần xuất hiện của item\n" +
                "- `\"item\" in list` - Kiểm tra item có trong list không\n\n" +
                "**Phương thức sắp xếp:**\n" +
                "- `sort()` - Sắp xếp list tại chỗ (thay đổi list gốc)\n" +
                "- `reverse()` - Đảo ngược list tại chỗ\n" +
                "- `sorted(list)` - Trả về list mới đã sắp xếp\n\n" +
                "**Phương thức khác:**\n" +
                "- `copy()` - Tạo bản copy của list\n" +
                "- `clear()` - Xóa tất cả phần tử\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "numbers = [3, 1, 4, 1, 5]\n" +
                "numbers.sort()  # [1, 1, 3, 4, 5]\n" +
                "numbers.reverse()  # [5, 4, 3, 1, 1]\n" +
                "```",
              examples: [
                {
                  title: 'Tìm kiếm trong List',
                  code:
                    "numbers = [1, 2, 3, 4, 5, 3, 6]\n\n" +
                    "print(\"index(3):\", numbers.index(3))\n" +
                    "print(\"count(3):\", numbers.count(3))\n" +
                    "print(\"3 in numbers:\", 3 in numbers)\n" +
                    "print(\"7 in numbers:\", 7 in numbers)",
                  explanation: 'index trả về vị trí, count đếm số lần, in kiểm tra tồn tại',
                  output: 'index(3): 2\ncount(3): 2\n3 in numbers: True\n7 in numbers: False'
                },
                {
                  title: 'Sắp xếp List',
                  code:
                    "numbers = [3, 1, 4, 1, 5]\n\n" +
                    "# sort() thay đổi list gốc\n" +
                    "numbers.sort()\n" +
                    "print(\"Sau sort():\", numbers)\n\n" +
                    "# sorted() tạo list mới\n" +
                    "numbers2 = [3, 1, 4, 1, 5]\n" +
                    "sorted_nums = sorted(numbers2)\n" +
                    "print(\"sorted():\", sorted_nums)\n" +
                    "print(\"Original:\", numbers2)",
                  explanation: 'sort() thay đổi list gốc, sorted() trả về list mới',
                  output: 'Sau sort(): [1, 1, 3, 4, 5]\nsorted(): [1, 1, 3, 4, 5]\nOriginal: [3, 1, 4, 1, 5]'
                }
              ],
              quiz: [
                { id: 'q3-1-4-1', question: 'sort() và sorted() khác nhau gì?', options: ['Giống nhau', 'sort() thay đổi list gốc, sorted() tạo list mới', 'sorted() thay đổi list gốc'], correct_index: 1, explanation: 'sort() thay đổi list gốc, sorted() trả về list mới và không thay đổi list gốc.' },
                { id: 'q3-1-4-2', question: 'count() trả về gì?', options: ['Vị trí', 'Số lần xuất hiện', 'Boolean'], correct_index: 1, explanation: 'count() đếm và trả về số lần xuất hiện của phần tử trong list.' },
                { id: 'q3-1-4-3', question: 'index() trả về gì khi không tìm thấy?', options: ['-1', 'Error', 'None'], correct_index: 1, explanation: 'index() gây ValueError nếu không tìm thấy phần tử trong list.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-3-2',
        course_id: 'level-3',
        title: 'Tuple và Set',
        slug: 'tuple-va-set',
        description: 'Tìm hiểu về Tuple và Set trong Python',
        icon: '🎯',
        color: '#8B5CF6',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-3-2-1',
            module_id: 'mod-3-2',
            title: 'Tuple - Giới thiệu',
            slug: 'tuple-gioi-thieu',
            description: 'Tìm hiểu về Tuple - cấu trúc dữ liệu bất biến',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu Tuple là gì và cách tạo',
                'Phân biệt Tuple và List',
                'Truy cập phần tử trong Tuple'
              ],
              theory:
                "## Tuple là gì?\n\n" +
                "Tuple là một cấu trúc dữ liệu tương tự List, nhưng có tính bất biến (immutable) - không thể thay đổi sau khi tạo.\n\n" +
                "**Tạo Tuple:**\n\n" +
                "```python\n" +
                "# Dùng dấu ngoặc tròn\n" +
                "my_tuple = (1, 2, 3)\n\n" +
                "# Hoặc không cần dấu ngoặc\n" +
                "my_tuple = 1, 2, 3\n\n" +
                "# Tuple rỗng\n" +
                "empty = ()\n\n" +
                "# Tuple đơn phần tử (cần dấu phẩy)\n" +
                "single = (42,)\n" +
                "```\n\n" +
                "**Tuple vs List:**\n" +
                "| Tuple | List |\n" +
                "|-------|------|\n" +
                "| Dùng () | Dùng [] |\n" +
                "| Bất biến (immutable) | Có thể thay đổi (mutable) |\n" +
                "| Nhanh hơn | Chậm hơn |\n" +
                "| Dùng cho dữ liệu cố định | Dùng cho dữ liệu thay đổi |",
              examples: [
                {
                  title: 'Tạo và truy cập Tuple',
                  code:
                    "# Tạo tuple\n" +
                    "fruits = (\"táo\", \"cam\", \"xoài\")\n" +
                    "print(\"Tuple:\", fruits)\n\n" +
                    "# Truy cập theo chỉ số\n" +
                    "print(\"fruits[0]:\", fruits[0])\n" +
                    "print(\"fruits[-1]:\", fruits[-1])\n\n" +
                    "# Slicing\n" +
                    "print(\"fruits[1:]:\", fruits[1:])",
                  explanation: 'Tuple truy cập giống như List, dùng chỉ số và slicing',
                  output: 'Tuple: (\"táo\", \"cam\", \"xoài\")\nfruits[0]: táo\nfruits[-1]: xoài\nfruits[1:]: (\"cam\", \"xoài\")'
                },
                {
                  title: 'Tuple đơn phần tử',
                  code:
                    "# Tuple với 1 phần tử cần dấu phẩy\n" +
                    "single = (42,)\n" +
                    "print(\"Single tuple:\", single)\n" +
                    "print(\"Type:\", type(single))\n\n" +
                    "# Không có dấu phẩy sẽ thành int\n" +
                    "not_tuple = (42)\n" +
                    "print(\"Not tuple:\", not_tuple)\n" +
                    "print(\"Type:\", type(not_tuple))",
                  explanation: 'Tuple đơn phần tử bắt buộc phải có dấu phẩy',
                  output: 'Single tuple: (42,)\nType: <class \'tuple\'>\nNot tuple: 42\nType: <class \'int\'>'
                }
              ],
              quiz: [
                { id: 'q3-2-1-1', question: 'Tuple khác List ở điểm gì?', options: ['Dùng () thay vì []', 'Không thể thay đổi sau khi tạo', 'Tất cả đều đúng'], correct_index: 2, explanation: 'Tuple dùng () và không thể thay đổi (immutable), List dùng [] và có thể thay đổi.' },
                { id: 'q3-2-1-2', question: 'Tuple đơn phần tử cần gì?', options: ['Không cần gì', 'Dấu phẩy sau phần tử', 'Dấu chấm'], correct_index: 1, explanation: 'Tuple đơn phần tử cần dấu phẩy: (42,) để phân biệt với số nguyên thường.' },
                { id: 'q3-2-1-3', question: 'Có thể thay đổi phần tử tuple không?', options: ['Có', 'Không', 'Tùy trường hợp'], correct_index: 1, explanation: 'Tuple có tính bất biến (immutable), không thể thay đổi phần tử sau khi tạo.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-2-2',
            module_id: 'mod-3-2',
            title: 'Tuple và tính bất biến',
            slug: 'tuple-va-immutability',
            description: 'Tìm hiểu sâu về tính bất biến của Tuple',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu tính bất biến của Tuple',
                'Biết tại sao Tuple lại quan trọng',
                'Áp dụng Tuple trong các tình huống phù hợp'
              ],
              theory:
                "## Tuple và tính bất biến\n\n" +
                "Tuple là immutable - không thể thay đổi sau khi tạo. Điều này có nghĩa:\n\n" +
                "**Không thể làm:**\n" +
                "- Thay đổi phần tử: `t[0] = 1` ❌\n" +
                "- Thêm phần tử: `t.append(4)` ❌\n" +
                "- Xóa phần tử: `t.pop()` ❌\n\n" +
                "**Có thể làm:**\n" +
                "- Truy cập phần tử: `t[0]` ✅\n" +
                "- Slicing: `t[1:3]` ✅\n" +
                "- Kiểm tra: `3 in t` ✅\n" +
                "- Nối tuple: `t1 + t2` ✅\n\n" +
                "**Tại sao dùng Tuple?**\n" +
                "1. **An toàn hơn**: Dữ liệu không bị thay đổi vô tình\n" +
                "2. **Nhanh hơn**: Tuple nhanh hơn List vì không cần cấp phát lại\n" +
                "3. **Dùng làm key dict**: Dictionary keys phải là immutable\n\n" +
                "**Ví dụ dùng Tuple:**\n" +
                "```python\n" +
                "# Tọa độ\n" +
                "point = (10, 20)\n\n" +
                "# Ngày tháng\n" +
                "date = (2024, 1, 15)\n\n" +
                "# Kết quả trả về nhiều giá trị\n" +
                "def get_stats(numbers):\n" +
                "    return (min(numbers), max(numbers), sum(numbers))\n" +
                "```",
              examples: [
                {
                  title: 'Tuple không thể thay đổi',
                  code:
                    "t = (1, 2, 3)\n\n" +
                    "print(\"Tuple ban dau:\", t)\n\n" +
                    "# Cố gắng thay đổi sẽ gây lỗi\n" +
                    "try:\n" +
                    "    t[0] = 10\n" +
                    "except TypeError as e:\n" +
                    "    print(\"Lỗi:\", e)",
                  explanation: 'Tuple không thể thay đổi phần tử, gây TypeError',
                  output: 'Tuple ban dau: (1, 2, 3)\nLỗi: tuple object does not support item assignment'
                },
                {
                  title: 'Tuple làm key Dictionary',
                  code:
                    "# Tuple có thể làm key dictionary\n" +
                    "locations = {\n" +
                    "    (10, 20): \"Hà Nội\",\n" +
                    "    (21, 106): \"TP.HCM\"\n" +
                    "}\n\n" +
                    "print(\"Dict với tuple key:\", locations)\n" +
                    "print(\"Tìm theo key (10, 20):\", locations[(10, 20)])\n\n" +
                    "# List không thể làm key\n" +
                    "try:\n" +
                    "    bad_dict = {[1, 2]: \"value\"}\n" +
                    "except TypeError as e:\n" +
                    "    print(\"List không làm key được:\", e)",
                  explanation: 'Tuple immutable nên có thể làm dict key, List không thể',
                  output: 'Dict với tuple key: {(10, 20): \"Hà Nội\", (21, 106): \"TP.HCM\"}\nTìm theo key (10, 20): Hà Nội\nList không làm key được: unhashable type: list'
                }
              ],
              quiz: [
                { id: 'q3-2-2-1', question: 'Tại sao Tuple nhanh hơn List?', options: ['Ít phần tử hơn', 'Không thể thay đổi nên Python tối ưu hơn', 'Ngắn hơn'], correct_index: 1, explanation: 'Tuple immutable nên Python có thể tối ưu bộ nhớ và tốc độ truy cập.' },
                { id: 'q3-2-2-2', question: 'Có thể dùng List làm Dictionary key không?', options: ['Có', 'Không', 'Tùy trường hợp'], correct_index: 1, explanation: 'Dictionary key phải là immutable, List không thể làm key.' },
                { id: 'q3-2-2-3', question: 'Tuple nối với tuple có tạo tuple mới không?', options: ['Có', 'Không', 'Sửa tuple cũ'], correct_index: 0, explanation: 'Nối tuple tạo tuple mới, không thay đổi tuple gốc vì tuple là immutable.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-2-3',
            module_id: 'mod-3-2',
            title: 'Set - Tạo và thao tác',
            slug: 'set-tao-va-thao-tac',
            description: 'Tìm hiểu về Set - tập hợp các phần tử duy nhất',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu Set là gì và cách tạo',
                'Biết các phương thức cơ bản của Set',
                'Phân biệt Set và List'
              ],
              theory:
                "## Set trong Python\n\n" +
                "Set là một tập hợp các phần tử duy nhất (không trùng lặp), không có thứ tự.\n\n" +
                "**Tạo Set:**\n\n" +
                "```python\n" +
                "# Dùng dấu ngoặc nhọn\n" +
                "my_set = {1, 2, 3}\n\n" +
                "# Từ list\n" +
                "my_set = set([1, 2, 2, 3])  # {1, 2, 3}\n\n" +
                "# Set rỗng\n" +
                "empty = set()  # {} sẽ là dict!\n" +
                "```\n\n" +
                "**Đặc điểm của Set:**\n" +
                "- Không có thứ tự\n" +
                "- Không có phần tử trùng lặp\n" +
                "- Các phần tử phải là immutable (không thể dùng list trong set)\n\n" +
                "**Các phương thức:**\n" +
                "- `add(item)` - Thêm phần tử\n" +
                "- `remove(item)` - Xóa phần tử (lỗi nếu không tìm thấy)\n" +
                "- `discard(item)` - Xóa phần tử (không lỗi)\n" +
                "- `clear()` - Xóa tất cả",
              examples: [
                {
                  title: 'Tạo Set',
                  code:
                    "# Tạo set\n" +
                    "fruits = {\"táo\", \"cam\", \"xoài\"}\n" +
                    "print(\"Set:\", fruits)\n\n" +
                    "# Từ list có trùng lặp\n" +
                    "numbers = [1, 2, 2, 3, 3, 3]\n" +
                    "unique = set(numbers)\n" +
                    "print(\"Set từ list:\", unique)\n\n" +
                    "# Set rỗng\n" +
                    "empty = set()\n" +
                    "print(\"Set rỗng:\", empty)",
                  explanation: 'Set loại bỏ trùng lặp, dùng set() cho empty để tránh confusion với dict',
                  output: 'Set: {\"xoài\", \"táo\", \"cam\"}\nSet từ list: {1, 2, 3}\nSet rỗng: set()'
                },
                {
                  title: 'Thêm và xóa trong Set',
                  code:
                    "fruits = {\"táo\", \"cam\"}\n" +
                    "print(\"Ban đầu:\", fruits)\n\n" +
                    "fruits.add(\"bưởi\")\n" +
                    "print(\"Sau add:\", fruits)\n\n" +
                    "fruits.remove(\"cam\")\n" +
                    "print(\"Sau remove:\", fruits)\n\n" +
                    "# discard không lỗi khi không tìm thấy\n" +
                    "fruits.discard(\"nho\")\n" +
                    "print(\"Sau discard:\", fruits)",
                  explanation: 'add thêm phần tử, remove xóa (lỗi nếu không có), discard xóa (không lỗi)',
                  output: 'Ban đầu: {\"táo\", \"cam\"}\nSau add: {\"bưởi\", \"táo\", \"cam\"}\nSau remove: {\"táo\"}\nSau discard: {\"táo\"}'
                }
              ],
              quiz: [
                { id: 'q3-2-3-1', question: 'Set có cho phép phần tử trùng lặp không?', options: ['Có', 'Không', 'Tùy trường hợp'], correct_index: 1, explanation: 'Set chỉ lưu các phần tử duy nhất, không có trùng lặp.' },
                { id: 'q3-2-3-2', question: 'Set có thứ tự không?', options: ['Có', 'Không', 'Tùy phiên bản Python'], correct_index: 1, explanation: 'Set không có thứ tự, các phần tử được lưu không theo thứ tự nào.' },
                { id: 'q3-2-3-3', question: 'remove() và discard() khác nhau gì?', options: ['Giống nhau', 'remove() lỗi khi không tìm thấy, discard() không', 'discard() lỗi khi không tìm thấy'], correct_index: 1, explanation: 'remove() gây KeyError nếu phần tử không tồn tại, discard() thì không.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-2-4',
            module_id: 'mod-3-2',
            title: 'Các phép toán trên Set',
            slug: 'phep-toan-set',
            description: 'Tìm hiểu các phép toán hợp, giao, hiệu trên Set',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Biết các phép toán hợp, giao, hiệu trên Set',
                'Áp dụng các phép toán Set vào bài toán thực tế',
                'Phân biệt các phép toán Set'
              ],
              theory:
                "## Các phép toán trên Set\n\n" +
                "**Các phép toán cơ bản:**\n\n" +
                "| Phép toán | Ký hiệu | Phương thức | Mô tả |\n" +
                "|-----------|---------|-------------|-------|\n" +
                "| Hợp (Union) | A \\| B | A.union(B) | Tất cả phần tử |\n" +
                "| Giao (Intersection) | A & B | A.intersection(B) | Phần tử chung |\n" +
                "| Hiệu (Difference) | A - B | A.difference(B) | Chỉ có trong A |\n" +
                "| Symmetric Difference | A ^ B | A.symmetric_difference(B) | Không chung |\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "A = {1, 2, 3, 4}\n" +
                "B = {3, 4, 5, 6}\n\n" +
                "A | B   # {1, 2, 3, 4, 5, 6}\n" +
                "A & B   # {3, 4}\n" +
                "A - B   # {1, 2}\n" +
                "A ^ B   # {1, 2, 5, 6}\n" +
                "```",
              examples: [
                {
                  title: 'Phép hợp và giao',
                  code:
                    "A = {1, 2, 3, 4}\n" +
                    "B = {3, 4, 5, 6}\n\n" +
                    "print(\"A:\", A)\n" +
                    "print(\"B:\", B)\n" +
                    "print(\"A | B (hợp):\", A | B)\n" +
                    "print(\"A & B (giao):\", A & B)",
                  explanation: '| là hợp (tất cả), & là giao (chỉ phần chung)',
                  output: 'A: {1, 2, 3, 4}\nB: {3, 4, 5, 6}\nA | B (hợp): {1, 2, 3, 4, 5, 6}\nA & B (giao): {3, 4}'
                },
                {
                  title: 'Phép hiệu và symmetric difference',
                  code:
                    "A = {1, 2, 3, 4}\n" +
                    "B = {3, 4, 5, 6}\n\n" +
                    "print(\"A - B (hiệu):\", A - B)\n" +
                    "print(\"B - A (hiệu):\", B - A)\n" +
                    "print(\"A ^ B (symmetric):\", A ^ B)\n\n" +
                    "# Kiểm tra quan hệ\n" +
                    "C = {1, 2, 3}\n" +
                    "D = {1, 2}\n" +
                    "print(\"D là subset của C:\", D.issubset(C))\n" +
                    "print(\"C là superset của D:\", C.issuperset(D))",
                  explanation: '- là hiệu (chỉ A), ^ là symmetric (không chung), issubset/issuperset kiểm tra quan hệ',
                  output: 'A - B (hiệu): {1, 2}\nB - A (hiệu): {5, 6}\nA ^ B (symmetric): {1, 2, 5, 6}\nD là subset của C: True\nC là superset của D: True'
                }
              ],
              quiz: [
                { id: 'q3-2-4-1', question: 'A | B là phép toán gì?', options: ['Giao', 'Hợp', 'Hiệu'], correct_index: 1, explanation: '| là phép hợp (union), lấy tất cả phần tử từ cả hai set.' },
                { id: 'q3-2-4-2', question: 'A & B cho kết quả là gì?', options: ['Phần tử chung', 'Tất cả phần tử', 'Phần tử khác nhau'], correct_index: 0, explanation: '& là phép giao (intersection), chỉ lấy phần tử có trong cả hai set.' },
                { id: 'q3-2-4-3', question: 'issubset() kiểm tra gì?', options: ['A có là con của B', 'A có là cha của B', 'A có phần tử chung với B'], correct_index: 0, explanation: 'issubset() kiểm tra xem set này có phải là tập con của set kia không.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-3-3',
        course_id: 'level-3',
        title: 'Dictionary',
        slug: 'dictionary',
        description: 'Tìm hiểu về Dictionary - cấu trúc dữ liệu key-value',
        icon: '🔑',
        color: '#EF4444',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-3-3-1',
            module_id: 'mod-3-3',
            title: 'Tạo và truy cập Dictionary',
            slug: 'dictionary-tao-va-truy-cap',
            description: 'Cách tạo Dictionary và truy cập phần tử',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu Dictionary là gì',
                'Biết cách tạo Dictionary',
                'Truy cập giá trị qua key'
              ],
              theory:
                "## Dictionary trong Python\n\n" +
                "Dictionary lưu trữ dữ liệu dưới dạng cặp key-value, giống như từ điển tra từ.\n\n" +
                "**Tạo Dictionary:**\n\n" +
                "```python\n" +
                "# Cú pháp\n" +
                "my_dict = {\n" +
                "    \"key1\": \"value1\",\n" +
                "    \"key2\": \"value2\"\n" +
                "}\n\n" +
                "# Ví dụ\n" +
                "student = {\n" +
                "    \"name\": \"An\",\n" +
                "    \"age\": 20,\n" +
                "    \"grade\": \"A\"\n" +
                "}\n" +
                "```\n\n" +
                "**Truy cập giá trị:**\n" +
                "- `dict[key]` - Truy cập, lỗi KeyError nếu không có\n" +
                "- `dict.get(key)` - Truy cập, trả về None nếu không có\n" +
                "- `dict.get(key, default)` - Truy cập, trả về default nếu không có",
              examples: [
                {
                  title: 'Tạo Dictionary',
                  code:
                    "student = {\n" +
                    "    \"name\": \"An\",\n" +
                    "    \"age\": 20,\n" +
                    "    \"grade\": \"A\"\n" +
                    "}\n\n" +
                    "print(\"Student:\", student)\n" +
                    "print(\"Name:\", student[\"name\"])\n" +
                    "print(\"Age:\", student[\"age\"])",
                  explanation: 'Dictionary truy cập giá trị qua key bằng dấu []',
                  output: 'Student: {\"name\": \"An\", \"age\": 20, \"grade\": \"A\"}\nName: An\nAge: 20'
                },
                {
                  title: 'Dùng get() an toàn hơn',
                  code:
                    "student = {\n" +
                    "    \"name\": \"An\",\n" +
                    "    \"age\": 20\n" +
                    "}\n\n" +
                    "print(\"Grade:\", student.get(\"grade\"))\n" +
                    "print(\"Grade:\", student.get(\"grade\", \"N/A\"))\n" +
                    "print(\"Name:\", student.get(\"name\"))",
                  explanation: 'get() không gây lỗi khi key không tồn tại, có thể đặt giá trị mặc định',
                  output: 'Grade: None\nGrade: N/A\nName: An'
                }
              ],
              quiz: [
                { id: 'q3-3-1-1', question: 'Dictionary lưu dữ liệu dạng gì?', options: ['Key-value', 'Index', 'List'], correct_index: 0, explanation: 'Dictionary lưu dữ liệu dưới dạng cặp key-value.' },
                { id: 'q3-3-1-2', question: 'Làm sao truy cập giá trị trong Dictionary?', options: ['Qua index', 'Qua key', 'Qua position'], correct_index: 1, explanation: 'Truy cập giá trị trong dict qua key, không phải index.' },
                { id: 'q3-3-1-3', question: 'get() khác gì so với []?', options: ['Không lỗi khi key không tồn tại', 'Nhanh hơn', 'Ít dùng'], correct_index: 0, explanation: 'get() không gây KeyError khi key không tồn tại, trả về None hoặc default.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-3-2',
            module_id: 'mod-3-3',
            title: 'Thêm, sửa, xóa trong Dictionary',
            slug: 'dictionary-them-sua-xoa',
            description: 'Cách thêm, sửa, xóa phần tử trong Dictionary',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Biết cách thêm cặp key-value mới',
                'Biết cách sửa giá trị của key',
                'Biết cách xóa phần tử'
              ],
              theory:
                "## Thêm, sửa, xóa trong Dictionary\n\n" +
                "**Thêm và sửa:**\n\n" +
                "```python\n" +
                "# Thêm mới\n" +
                "dict[\"new_key\"] = value\n\n" +
                "# Sửa (key đã tồn tại)\n" +
                "dict[\"existing_key\"] = new_value\n" +
                "```\n\n" +
                "**Xóa:**\n\n" +
                "1. `del dict[key]` - Xóa theo key, lỗi nếu không có\n" +
                "2. `dict.pop(key)` - Xóa và trả về giá trị\n" +
                "3. `dict.popitem()` - Xóa phần tử cuối (Python 3.7+)\n" +
                "4. `dict.clear()` - Xóa tất cả\n\n" +
                "**Kiểm tra key tồn tại:**\n" +
                "```python\n" +
                "\"key\" in dict    # True/False\n" +
                "```",
              examples: [
                {
                  title: 'Thêm và sửa',
                  code:
                    "student = {\"name\": \"An\", \"age\": 20}\n" +
                    "print(\"Ban đầu:\", student)\n\n" +
                    "# Thêm key mới\n" +
                    "student[\"grade\"] = \"A\"\n" +
                    "print(\"Sau thêm grade:\", student)\n\n" +
                    "# Sửa giá trị\n" +
                    "student[\"age\"] = 21\n" +
                    "print(\"Sau sửa age:\", student)",
                  explanation: 'Gán giá trị cho key để thêm mới hoặc sửa',
                  output: 'Ban đầu: {\"name\": \"An\", \"age\": 20}\nSau thêm grade: {\"name\": \"An\", \"age\": 20, \"grade\": \"A\"}\nSau sửa age: {\"name\": \"An\", \"age\": 21, \"grade\": \"A\"}'
                },
                {
                  title: 'Xóa phần tử',
                  code:
                    "student = {\"name\": \"An\", \"age\": 20, \"grade\": \"A\"}\n" +
                    "print(\"Ban đầu:\", student)\n\n" +
                    "# pop - xóa và trả về giá trị\n" +
                    "removed = student.pop(\"grade\")\n" +
                    "print(\"Pop:\", removed)\n" +
                    "print(\"Sau pop:\", student)\n\n" +
                    "# del\n" +
                    "del student[\"age\"]\n" +
                    "print(\"Sau del:\", student)",
                  explanation: 'pop trả về giá trị đã xóa, del chỉ xóa không trả về',
                  output: 'Ban đầu: {\"name\": \"An\", \"age\": 20, \"grade\": \"A\"}\nPop: A\nSau pop: {\"name\": \"An\", \"age\": 20}\nSau del: {\"name\": \"An\"}'
                }
              ],
              quiz: [
                { id: 'q3-3-2-1', question: 'Làm sao thêm key mới vào dict?', options: ['append()', 'Gán giá trị cho key mới', 'add()'], correct_index: 1, explanation: 'Gán dict[\"new_key\"] = value để thêm key mới.' },
                { id: 'q3-3-2-2', question: 'pop() trả về gì?', options: ['Key đã xóa', 'Giá trị đã xóa', 'Không trả về'], correct_index: 1, explanation: 'pop(key) xóa phần tử và trả về giá trị của nó.' },
                { id: 'q3-3-2-3', question: 'del dict[key] có gì khác pop(key)?', options: ['del chỉ xóa, pop trả về giá trị', 'pop chỉ xóa, del trả về giá trị', 'Giống nhau'], correct_index: 0, explanation: 'del chỉ xóa phần tử, pop xóa và trả về giá trị của phần tử đó.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-3-3',
            module_id: 'mod-3-3',
            title: 'Duyệt Dictionary',
            slug: 'duyet-dictionary',
            description: 'Cách duyệt qua các phần tử trong Dictionary',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Biết cách duyệt qua keys',
                'Biết cách duyệt qua values',
                'Biết cách duyệt qua cặp key-value'
              ],
              theory:
                "## Duyệt Dictionary\n\n" +
                "**Duyệt qua keys:**\n" +
                "```python\n" +
                "for key in dict:\n" +
                "    print(key)\n" +
                "```\n\n" +
                "**Duyệt qua values:**\n" +
                "```python\n" +
                "for value in dict.values():\n" +
                "    print(value)\n" +
                "```\n\n" +
                "**Duyệt qua cặp key-value:**\n" +
                "```python\n" +
                "for key, value in dict.items():\n" +
                "    print(f\"{key}: {value}\")\n" +
                "```\n\n" +
                "**Các phương thức:**\n" +
                "- `keys()` - Trả về tất cả keys\n" +
                "- `values()` - Trả về tất cả values\n" +
                "- `items()` - Trả về cặp (key, value)",
              examples: [
                {
                  title: 'Duyệt keys và values',
                  code:
                    "student = {\"name\": \"An\", \"age\": 20, \"grade\": \"A\"}\n\n" +
                    "print(\"Keys:\")\n" +
                    "for key in student:\n" +
                    "    print(\" -\", key)\n\n" +
                    "print(\"\\nValues:\")\n" +
                    "for value in student.values():\n" +
                    "    print(\" -\", value)",
                  explanation: 'Duyệt trực tiếp qua dict để lấy keys, dùng values() để lấy values',
                  output: 'Keys:\n - name\n - age\n - grade\n\nValues:\n - An\n - 20\n - A'
                },
                {
                  title: 'Duyệt items()',
                  code:
                    "student = {\"name\": \"An\", \"age\": 20, \"grade\": \"A\"}\n\n" +
                    "print(\"Items:\")\n" +
                    "for key, value in student.items():\n" +
                    "    print(f\" {key}: {value}\")",
                  explanation: 'items() trả về cặp (key, value) để duyệt thuận tiện',
                  output: 'Items:\n name: An\n age: 20\n grade: A'
                }
              ],
              quiz: [
                { id: 'q3-3-3-1', question: 'Dùng gì để duyệt qua keys?', options: ['dict.values()', 'dict.keys() hoặc duyệt trực tiếp', 'dict.items()'], correct_index: 1, explanation: 'Có thể duyệt trực tiếp hoặc dùng keys() để lấy danh sách keys.' },
                { id: 'q3-3-3-2', question: 'items() trả về gì?', options: ['Keys', 'Values', 'Cặp (key, value)'], correct_index: 2, explanation: 'items() trả về view chứa các cặp (key, value).' },
                { id: 'q3-3-3-3', question: 'Duyệt dict.values() cho kết quả gì?', options: ['Keys', 'Values', 'Cặp key-value'], correct_index: 1, explanation: 'values() trả về view chỉ chứa các giá trị (values).' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-4',
    title: 'Hàm và Tư duy lập trình',
    slug: 'ham-va-tu-duy-lap-trinh',
    description: 'Tạo hàm, tách bài toán, và tư duy lập trình có tổ chức',
    icon: '🧩',
    color: '#10B981',
    order_index: 4,
    is_published: true,
    modules: [
      {
        id: 'mod-4-1',
        course_id: 'level-4',
        title: 'Hàm cơ bản',
        slug: 'ham-co-ban',
        description: 'Tìm hiểu cách định nghĩa và sử dụng hàm trong Python',
        icon: '🔧',
        color: '#10B981',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-4-1-1',
            module_id: 'mod-4-1',
            title: 'Định nghĩa và gọi hàm',
            slug: 'dinh-nghia-va-goi-ham',
            description: 'Học cách tạo hàm và gọi hàm trong Python',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm hàm trong lập trình',
                'Biết cách định nghĩa hàm với def',
                'Gọi hàm đã được định nghĩa'
              ],
              theory:
                "## Hàm (Function) là gì?\n\n" +
                "Hàm là một khối code có tên, có thể tái sử dụng. Thay vì viết lại code nhiều lần, ta đặt tên cho khối code đó và gọi nó khi cần.\n\n" +
                "**Cú pháp định nghĩa hàm:**\n\n" +
                "```python\n" +
                "def ten_ham():\n" +
                "    # Code bên trong hàm\n" +
                "    pass\n" +
                "```\n\n" +
                "**Giải thích:**\n" +
                "- `def` là từ khóa để báo hiệu bắt đầu định nghĩa hàm\n" +
                "- `ten_ham` là tên ta đặt cho hàm\n" +
                "- Dấu `()` bắt buộc phải có\n" +
                "- Code bên trong phải được thụt lề (indent)\n\n" +
                "**Gọi hàm:**\n\n" +
                "```python\n" +
                "ten_ham()\n" +
                "```",
              examples: [
                {
                  title: 'Hàm đơn giản',
                  code:
                    "def chao_mung():\n" +
                    "    print(\"Xin chào!\")\n" +
                    "    print(\"Bạn đã đến với Python\")\n\n" +
                    "# Gọi hàm\n" +
                    "chao_mung()",
                  explanation: 'Định nghĩa hàm chao_mung() rồi gọi nó',
                  output: 'Xin chào!\nBạn đã đến với Python'
                },
                {
                  title: 'Hàm tính tổng',
                  code:
                    "def tinh_tong():\n" +
                    "    a = 5\n" +
                    "    b = 3\n" +
                    "    print(\"Tổng:\", a + b)\n\n" +
                    "tinh_tong()\n" +
                    "tinh_tong()",
                  explanation: 'Có thể gọi hàm nhiều lần',
                  output: 'Tổng: 8\nTổng: 8'
                }
              ],
              quiz: [
                { id: 'q4-1-1-1', question: 'Cú pháp nào đúng để định nghĩa hàm?', options: ['function ten_ham():', 'def ten_ham():', 'define ten_ham()'], correct_index: 1, explanation: 'Cú pháp đúng là `def ten_ham():` trong Python.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-1-2',
            module_id: 'mod-4-1',
            title: 'Tham số và đối số',
            slug: 'tham-so-va-doi-so',
            description: 'Truyền dữ liệu vào hàm qua tham số',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm tham số (parameter)',
                'Hiểu khái niệm đối số (argument)',
                'Biết cách truyền giá trị cho hàm'
              ],
              theory:
                "## Tham số và đối số\n\n" +
                "**Tham số (Parameter):** Biến trong định nghĩa hàm, đóng vai trò như \"chỗ trống\" để nhận giá trị.\n\n" +
                "**Đối số (Argument):** Giá trị thực truyền vào khi gọi hàm.\n\n\n" +
                "**Ví dụ:**\n\n" +
                "```python\n" +
                "def chao(ten):  # ten là tham số\n" +
                "    print(\"Xin chào\", ten)\n\n" +
                "chao(\"An\")  # \"An\" là đối số\n" +
                "```\n\n" +
                "**Quy tắc:**\n" +
                "- Tham số nhận giá trị theo thứ tự truyền vào\n" +
                "- Số tham số phải khớp với số đối số",
              examples: [
                {
                  title: 'Một tham số',
                  code:
                    "def chao_ho_ten(ho_ten):\n" +
                    "    print(\"Xin chào\", ho_ten)\n\n" +
                    "chao_ho_ten(\"Minh\")\n" +
                    "chao_ho_ten(\"Lan\")",
                  explanation: 'Tham số ho_ten nhận giá trị truyền vào',
                  output: 'Xin chào Minh\nXin chào Lan'
                }
              ],
              quiz: [
                { id: 'q4-1-2-1', question: 'Phân biệt tham số và đối số', options: ['ten là đối số, "Minh" là tham số', 'ten là tham số, "Minh" là đối số', 'cả hai đều là tham số'], correct_index: 1, explanation: 'Tham số là tên biến trong định nghĩa, đối số là giá trị truyền vào khi gọi.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-1-3',
            module_id: 'mod-4-1',
            title: 'Giá trị trả về (return)',
            slug: 'gia-tri-tra-ve',
            description: 'Cách trả về giá trị từ hàm',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách sử dụng return trong hàm',
                'Biết cách trả về giá trị từ hàm',
                'Phân biệt return và print'
              ],
              theory:
                "## Giá trị trả về (return)\n\n" +
                "Câu lệnh `return` dùng để trả về giá trị từ hàm cho nơi gọi.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "def ten_ham():\n" +
                "    # xử lý\n" +
                "    return gia_tri\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "def cong(a, b):\n" +
                "    return a + b\n\n" +
                "result = cong(3, 5)  # result = 8\n" +
                "```\n\n" +
                "**So sánh return và print:**\n" +
                "- `print()`: Hiển thị ra màn hình, không lưu giá trị\n" +
                "- `return`: Trả về giá trị để sử dụng tiếp\n\n" +
                "**Return nhiều giá trị:**\n" +
                "```python\n" +
                "def get_stats(numbers):\n" +
                "    return min(numbers), max(numbers)\n" +
                "```",
              examples: [
                {
                  title: 'Hàm có return',
                  code:
                    "def cong(a, b):\n" +
                    "    return a + b\n\n" +
                    "result = cong(3, 5)\n" +
                    "print(\"Kết quả:\", result)\n\n" +
                    "def tinh_chu_vi(dai, rong):\n" +
                    "    return 2 * (dai + rong)\n\n" +
                    "cv = tinh_chu_vi(5, 3)\n" +
                    "print(\"Chu vi:\", cv)",
                  explanation: 'return trả về giá trị để lưu vào biến hoặc sử dụng',
                  output: 'Kết quả: 8\nChu vi: 16'
                },
                {
                  title: 'Return nhiều giá trị',
                  code:
                    "def get_min_max(numbers):\n" +
                    "    return min(numbers), max(numbers)\n\n" +
                    "nums = [1, 5, 3, 9, 2]\n" +
                    "min_val, max_val = get_min_max(nums)\n" +
                    "print(\"Min:\", min_val)\n" +
                    "print(\"Max:\", max_val)",
                  explanation: 'Có thể trả về nhiều giá trị bằng tuple',
                  output: 'Min: 1\nMax: 9'
                }
              ],
              quiz: [
                { id: 'q4-1-3-1', question: 'return dùng để làm gì?', options: ['In ra màn hình', 'Trả về giá trị từ hàm', 'Kết thúc hàm'], correct_index: 1, explanation: 'return trả về giá trị từ hàm cho nơi gọi.' },
                { id: 'q4-1-3-2', question: 'return khác print() chỗ nào?', options: ['return lưu giá trị để tái sử dụng', 'Không khác gì', 'print() trả về giá trị'], correct_index: 0, explanation: 'print() chỉ hiển thị, return trả về giá trị để sử dụng.' },
                { id: 'q4-1-3-3', question: 'Có thể trả về nhiều giá trị không?', options: ['Không', 'Có, bằng tuple', 'Chỉ một giá trị'], correct_index: 1, explanation: 'Có thể trả về nhiều giá trị bằng cách trả về tuple.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-1-4',
            module_id: 'mod-4-1',
            title: 'Phạm vi biến (Scope)',
            slug: 'pham-vi-bien',
            description: 'Tìm hiểu về phạm vi biến trong Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu các loại phạm vi biến: local, global',
                'Biết cách sử dụng global trong hàm',
                'Tránh lỗi phạm vi biến'
              ],
              theory:
                "## Phạm vi biến (Scope)\n\n" +
                "**Các loại phạm vi:**\n\n" +
                "1. **Local (Cục bộ)**: Biến trong hàm, chỉ dùng trong hàm đó\n" +
                "2. **Global (Toàn cục)**: Biến ngoài hàm, dùng được mọi nơi\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "x = 10  # Global\n\n" +
                "def test():\n" +
                "    x = 5  # Local (biến khác)\n" +
                "    print(\"Trong hàm:\", x)\n\n" +
                "test()\n" +
                "print(\"Ngoài hàm:\", x)  # 10\n" +
                "```\n\n" +
                "**Dùng global để sửa biến toàn cục:**\n" +
                "```python\n" +
                "x = 10\n\n" +
                "def update():\n" +
                "    global x\n" +
                "    x = 20\n\n" +
                "update()\n" +
                "print(x)  # 20\n" +
                "```\n\n" +
                "**Lưu ý:** Nên tránh dùng global, thay vào đó truyền biến làm tham số.",
              examples: [
                {
                  title: 'Local vs Global',
                  code:
                    "x = 10  # Global\n\n" +
                    "def test():\n" +
                    "    x = 5  # Local\n" +
                    "    print(\"Trong hàm x =\", x)\n\n" +
                    "test()\n" +
                    "print(\"Ngoài hàm x =\", x)",
                  explanation: 'Biến local chỉ có giá trị trong hàm, không ảnh hưởng global',
                  output: 'Trong hàm x = 5\nNgoài hàm x = 10'
                },
                {
                  title: 'Dùng global',
                  code:
                    "counter = 0\n\n" +
                    "def increase():\n" +
                    "    global counter\n" +
                    "    counter += 1\n\n" +
                    "increase()\n" +
                    "increase()\n" +
                    "print(\"Counter:\", counter)",
                  explanation: 'global cho phép sửa biến toàn cục trong hàm',
                  output: 'Counter: 2'
                }
              ],
              quiz: [
                { id: 'q4-1-4-1', question: 'Biến trong hàm gọi là gì?', options: ['Global', 'Local', 'Public'], correct_index: 1, explanation: 'Biến trong hàm gọi là biến local, chỉ dùng trong hàm đó.' },
                { id: 'q4-1-4-2', question: 'Làm sao sửa biến global trong hàm?', options: ['Dùng global', 'Không thể sửa', 'Khai báo lại'], correct_index: 0, explanation: 'Dùng từ khóa global để chỉ định biến global trong hàm.' },
                { id: 'q4-1-4-3', question: 'Nên dùng global không?', options: ['Nên', 'Không nên, thay bằng tham số', 'Bắt buộc'], correct_index: 1, explanation: 'Nên tránh dùng global, thay vào đó truyền biến qua tham số và return giá trị.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-4-2',
        course_id: 'level-4',
        title: 'Tham số nâng cao',
        slug: 'tham-so-nang-cao',
        description: 'Các loại tham số đặc biệt trong Python',
        icon: '🎛️',
        color: '#6366F1',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-4-2-1',
            module_id: 'mod-4-2',
            title: 'Tham số mặc định',
            slug: 'tham-so-mac-dinh',
            description: 'Cách đặt giá trị mặc định cho tham số',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Biết cách đặt giá trị mặc định cho tham số',
                'Hiểu khi nào nên dùng tham số mặc định',
                'Tránh lỗi thường gặp'
              ],
              theory:
                "## Tham số mặc định\n\n" +
                "Tham số mặc định cho phép đặt giá trị sẵn cho tham số nếu không truyền đối số.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "def ham(para=gia_tri_mac_dinh):\n" +
                "    # code\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "def chao(ten=\"Bạn\"):\n" +
                "    print(\"Xin chào\", ten)\n\n" +
                "chao(\"An\")    # Xin chào An\n" +
                "chao()       # Xin chào Bạn\n" +
                "```\n\n" +
                "**Lưu ý:**\n" +
                "- Tham số có giá trị mặc định phải đặt SAU tham số không có mặc định\n" +
                "- Giá trị mặc định chỉ được đánh giá MỘT LẦN lúc định nghĩa hàm",
              examples: [
                {
                  title: 'Tham số mặc định đơn giản',
                  code:
                    "def chao(ten=\"Bạn\"):\n" +
                    "    print(\"Xin chào\", ten)\n\n" +
                    "chao(\"An\")\n" +
                    "chao()\n\n" +
                    "def dien_tich(chieu_dai, chieu_rong=10):\n" +
                    "    return chieu_dai * chieu_rong\n\n" +
                    "print(\"DT:\", dien_tich(5, 3))\n" +
                    "print(\"DT:\", dien_tich(5))",
                  explanation: 'Tham số có giá trị mặc định có thể bỏ qua khi gọi',
                  output: 'Xin chào An\nXin chào Bạn\nDT: 15\nDT: 50'
                },
                {
                  title: 'Nhiều tham số mặc định',
                  code:
                    "def gioi_thieu(ten=\"Khách\", tuoi=18):\n" +
                    "    print(f\"Tên: {ten}, Tuổi: {tuoi}\")\n\n" +
                    "gioi_thieu(\"An\", 25)\n" +
                    "gioi_thieu(\"Binh\")\n" +
                    "gioi_thieu()",
                  explanation: 'Có thể có nhiều tham số mặc định, đặt sau tham số không mặc định',
                  output: 'Tên: An, Tuổi: 25\nTên: Binh, Tuổi: 18\nTên: Khách, Tuổi: 18'
                }
              ],
              quiz: [
                { id: 'q4-2-1-1', question: 'Tham số mặc định có tác dụng gì?', options: ['Bắt buộc phải truyền', 'Có thể bỏ qua khi gọi hàm', 'Lỗi khi không truyền'], correct_index: 1, explanation: 'Tham số mặc định có thể bỏ qua khi gọi hàm, sẽ dùng giá trị mặc định.' },
                { id: 'q4-2-1-2', question: 'Tham số có giá trị mặc định phải đặt ở đâu?', options: ['Đầu tiên', 'Sau tham số không có mặc định', 'Bất kỳ đâu'], correct_index: 1, explanation: 'Tham số có giá trị mặc định phải đặt SAU tham số không có mặc định.' },
                { id: 'q4-2-1-3', question: 'Khi không truyền đối số, tham số dùng giá trị gì?', options: ['Lỗi', 'Giá trị mặc định', 'None'], correct_index: 1, explanation: 'Khi không truyền đối số, tham số sẽ dùng giá trị mặc định đã đặt.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-2-2',
            module_id: 'mod-4-2',
            title: '*args và **kwargs',
            slug: 'args-va-kwargs',
            description: 'Nhận nhiều đối số với args và kwargs',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu *args và **kwargs',
                'Biết cách truyền nhiều đối số linh hoạt',
                'Áp dụng vào tình huống thực tế'
              ],
              theory:
                "## *args và **kwargs\n\n" +
                "**\\*args** - Nhận nhiều đối số vị trí dưới dạng tuple\n\n" +
                "```python\n" +
                "def func(*args):\n" +
                "    print(args)\n\n" +
                "func(1, 2, 3)  # (1, 2, 3)\n" +
                "```\n\n" +
                "**\\*\\*kwargs** - Nhận nhiều đối số từ khóa dưới dạng dict\n\n" +
                "```python\n" +
                "def func(**kwargs):\n" +
                "    print(kwargs)\n\n" +
                "func(a=1, b=2)  # {\"a\": 1, \"b\": 2}\n" +
                "```\n\n" +
                "**Kết hợp:**\n" +
                "```python\n" +
                "def func(*args, **kwargs):\n" +
                "    print(\"Args:\", args)\n" +
                "    print(\"Kwargs:\", kwargs)\n" +
                "```",
              examples: [
                {
                  title: '*args - nhiều đối số vị trí',
                  code:
                    "def tinh_tong(*args):\n" +
                    "    print(\"Các đối số:\", args)\n" +
                    "    return sum(args)\n\n" +
                    "print(\"Tổng 3 số:\", tinh_tong(1, 2, 3))\n" +
                    "print(\"Tổng 5 số:\", tinh_tong(1, 2, 3, 4, 5))",
                  explanation: '*args nhận mọi đối số thành tuple',
                  output: 'Các đối số: (1, 2, 3)\nTổng 3 số: 6\nCác đối số: (1, 2, 3, 4, 5)\nTổng 5 số: 15'
                },
                {
                  title: '**kwargs - nhiều đối số từ khóa',
                  code:
                    "def in_thong_tin(**kwargs):\n" +
                    "    for key, value in kwargs.items():\n" +
                    "        print(f\"{key}: {value}\")\n\n" +
                    "in_thong_tin(ten=\"An\", tuoi=25, city=\"Hanoi\")",
                  explanation: '**kwargs nhận đối số từ khóa thành dict',
                  output: 'ten: An\ntuoi: 25\ncity: Hanoi'
                }
              ],
              quiz: [
                { id: 'q4-2-2-1', question: '*args nhận đối số dưới dạng gì?', options: ['Dict', 'Tuple', 'List'], correct_index: 1, explanation: '*args nhận các đối số vị trí thành tuple.' },
                { id: 'q4-2-2-2', question: '**kwargs nhận đối số dưới dạng gì?', options: ['Dict', 'Tuple', 'List'], correct_index: 0, explanation: '**kwargs nhận các đối số từ khóa thành dict.' },
                { id: 'q4-2-2-3', question: 'Có thể dùng cả *args và **kwargs không?', options: ['Có', 'Không', 'Chỉ một trong hai'], correct_index: 0, explanation: 'Có thể dùng cả *args và **kwargs trong cùng một hàm.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-2-3',
            module_id: 'mod-4-2',
            title: 'Hàm lambda',
            slug: 'ham-lambda',
            description: 'Tìm hiểu hàm ẩn danh với lambda',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu hàm lambda là gì',
                'Biết cách viết hàm lambda',
                'Áp dụng lambda với map, filter, sorted'
              ],
              theory:
                "## Hàm lambda\n\n" +
                "Lambda là hàm ẩn danh, định nghĩa trong một dòng.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "lambda arguments: expression\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "# Hàm thường\n" +
                "def binh_phuong(x):\n" +
                "    return x ** 2\n\n" +
                "# Lambda\n" +
                "bp = lambda x: x ** 2\n" +
                "```\n\n" +
                "**Dùng với map, filter, sorted:**\n" +
                "```python\n" +
                "# map - áp dụng hàm lên từng phần tử\n" +
                "list(map(lambda x: x*2, [1,2,3]))  # [2,4,6]\n\n" +
                "# filter - lọc phần tử\n" +
                "list(filter(lambda x: x>2, [1,2,3]))  # [3]\n\n" +
                "# sorted - sắp xếp với key\n" +
                "sorted([(1,2), (3,1)], key=lambda x: x[1])\n" +
                "```",
              examples: [
                {
                  title: 'Lambda cơ bản',
                  code:
                    "# Lambda đơn giản\n" +
                    "bp = lambda x: x ** 2\n" +
                    "print(\"Bình phương của 5:\", bp(5))\n\n" +
                    "# Lambda với nhiều tham số\n" +
                    "cong = lambda a, b: a + b\n" +
                    "print(\"3 + 4 =\", cong(3, 4))",
                  explanation: 'Lambda định nghĩa hàm trong một dòng',
                  output: 'Bình phương của 5: 25\n3 + 4 = 7'
                },
                {
                  title: 'Lambda với map và filter',
                  code:
                    "numbers = [1, 2, 3, 4, 5]\n\n" +
                    "# map - nhân đôi mỗi phần tử\n" +
                    "doubled = list(map(lambda x: x * 2, numbers))\n" +
                    "print(\"Nhân đôi:\", doubled)\n\n" +
                    "# filter - lọc số lớn hơn 3\n" +
                    "filtered = list(filter(lambda x: x > 3, numbers))\n" +
                    "print(\"Lớn hơn 3:\", filtered)",
                  explanation: 'map và filter thường dùng với lambda',
                  output: 'Nhân đôi: [2, 4, 6, 8, 10]\nLớn hơn 3: [4, 5]'
                }
              ],
              quiz: [
                { id: 'q4-2-3-1', question: 'Lambda là gì?', options: ['Hàm thông thường', 'Hàm ẩn danh', 'Biến'], correct_index: 1, explanation: 'Lambda là hàm ẩn danh, định nghĩa trong một dòng.' },
                { id: 'q4-2-3-2', question: 'Lambda có thể có bao nhiêu đối số?', options: ['1', '2', 'Nhiều'], correct_index: 2, explanation: 'Lambda có thể có nhiều đối số, phân cách bằng dấu phẩy.' },
                { id: 'q4-2-3-3', question: 'map(lambda x: x*2, list) làm gì?', options: ['Lọc phần tử', 'Nhân đôi mỗi phần tử', 'Sắp xếp'], correct_index: 1, explanation: 'map áp dụng hàm lambda lên từng phần tử trong list.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-2-4',
            module_id: 'mod-4-2',
            title: 'Hàm đệ quy',
            slug: 'ham-de-quy',
            description: 'Tìm hiểu hàm đệ quy và cách áp dụng',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 4,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm đệ quy',
                'Biết cách viết hàm đệ quy',
                'Tránh lỗi đệ quy vô hạn'
              ],
              theory:
                "## Hàm đệ quy\n\n" +
                "Đệ quy là khi hàm gọi chính nó để giải quyết bài toán con.\n\n" +
                "**Cấu trúc hàm đệ quy:**\n\n" +
                "1. **Base case (điều kiện dừng)**: Khi nào thì dừng\n" +
                "2. **Recursive case**: Gọi lại chính nó với bài toán nhỏ hơn\n\n" +
                "**Ví dụ - Tính giai thừa:**\n" +
                "```python\n" +
                "def factorial(n):\n" +
                "    if n == 0 or n == 1:  # Base case\n" +
                "        return 1\n" +
                "    return n * factorial(n - 1)  # Recursive case\n" +
                "```\n\n" +
                "**Ví dụ - Fibonacci:**\n" +
                "```python\n" +
                "def fibonacci(n):\n" +
                "    if n <= 1:\n" +
                "        return n\n" +
                "    return fibonacci(n - 1) + fibonacci(n - 2)\n" +
                "```\n\n" +
                "**Lưu ý:** Luôn cần base case để tránh đệ quy vô hạn.",
              examples: [
                {
                  title: 'Tính giai thừa',
                  code:
                    "def factorial(n):\n" +
                    "    if n <= 1:\n" +
                    "        return 1\n" +
                    "    return n * factorial(n - 1)\n\n" +
                    "print(\"5! =\", factorial(5))\n" +
                    "print(\"0! =\", factorial(0))\n" +
                    "print(\"3! =\", factorial(3))",
                  explanation: 'factorial(5) = 5 * factorial(4), cứ gọi đến khi n=1',
                  output: '5! = 120\n0! = 1\n3! = 6'
                },
                {
                  title: 'Đếm ngược đệ quy',
                  code:
                    "def dem_nguoc(n):\n" +
                    "    if n <= 0:\n" +
                    "        print(\"Hết!\")\n" +
                    "        return\n" +
                    "    print(n)\n" +
                    "    dem_nguoc(n - 1)\n\n" +
                    "dem_nguoc(5)",
                  explanation: 'Mỗi lần gọi đệ quy với n-1, dừng khi n<=0',
                  output: '5\n4\n3\n2\n1\nHết!'
                }
              ],
              quiz: [
                { id: 'q4-2-4-1', question: 'Đệ quy là gì?', options: ['Hàm gọi hàm khác', 'Hàm gọi chính nó', 'Hàm không có return'], correct_index: 1, explanation: 'Đệ quy là khi hàm gọi chính nó để giải quyết bài toán con.' },
                { id: 'q4-2-4-2', question: 'Điều kiện dừng (base case) cần thiết không?', options: ['Có', 'Không', 'Tùy trường hợp'], correct_index: 0, explanation: 'Base case rất quan trọng để tránh đệ quy vô hạn.' },
                { id: 'q4-2-4-3', question: 'factorial(4) = ?', options: ['24', '12', '4'], correct_index: 0, explanation: 'factorial(4) = 4 * 3 * 2 * 1 = 24.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-4-3',
        course_id: 'level-4',
        title: 'Tư duy lập trình',
        slug: 'tu-duy-lap-trinh',
        description: 'Phân tích bài toán và viết code có tổ chức',
        icon: '💡',
        color: '#F59E0B',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-4-3-1',
            module_id: 'mod-4-3',
            title: 'Phân tích bài toán',
            slug: 'phan-tich-bai-toan',
            description: 'Cách phân tích và hiểu yêu cầu bài toán',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Biết cách đọc và hiểu yêu cầu bài toán',
                'Xác định input và output',
                'Tìm ra các ràng buộc của bài toán'
              ],
              theory:
                "## Phân tích bài toán\n\n" +
                "Trước khi viết code, cần hiểu rõ bài toán:\n\n" +
                "**Các bước phân tích:**\n\n" +
                "1. **Đọc kỹ đề bài**: Hiểu bài toán yêu cầu gì\n" +
                "2. **Xác định Input**: Dữ liệu đầu vào là gì?\n" +
                "3. **Xác định Output**: Kết quả mong đợi là gì?\n" +
                "4. **Tìm ràng buộc**: Có giới hạn gì không?\n\n" +
                "**Ví dụ:**\n" +
                "```\n" +
                "Bài toán: Tính tổng 2 số nguyên\n" +
                "- Input: 2 số nguyên a, b\n" +
                "- Output: Tổng a + b\n" +
                "- Ràng buộc: Không có (số nguyên không giới hạn)\n" +
                "```\n\n" +
                "**Mẹo:**\n" +
                "- Viết ra giấy những gì bạn hiểu\n" +
                "- Làm ví dụ bằng tay trước\n" +
                "- Hỏi nếu không hiểu đề bài",
              examples: [
                {
                  title: 'Phân tích bài toán cơ bản',
                  code:
                    "# Bài toán: Kiểm tra số chẵn lẻ\n\n" +
                    "# Input: Một số nguyên\n" +
                    "# Output: \"Chan\" hoặc \"Le\"\n" +
                    "# Ràng buộc: Số nguyên\n\n" +
                    "def kiem_tra_chan_le(n):\n" +
                    "    if n % 2 == 0:\n" +
                    "        return \"Chan\"\n" +
                    "    return \"Le\"\n\n" +
                    "print(\"4:\", kiem_tra_chan_le(4))\n" +
                    "print(\"7:\", kiem_tra_chan_le(7))",
                  explanation: 'Xác định rõ input, output trước khi code',
                  output: '4: Chan\n7: Le'
                },
                {
                  title: 'Phân tích bài toán với ví dụ',
                  code:
                    "# Bài toán: Đếm số lần xuất hiện của ký tự\n\n" +
                    "# Ví dụ: \"hello\" -> {'h':1, 'e':1, 'l':2, 'o':1}\n\n" +
                    "def dem_ky_tu(text):\n" +
                    "    result = {}\n" +
                    "    for char in text:\n" +
                    "        if char in result:\n" +
                    "            result[char] += 1\n" +
                    "        else:\n" +
                    "            result[char] = 1\n" +
                    "    return result\n\n" +
                    "print(dem_ky_tu(\"hello\"))",
                  explanation: 'Làm ví dụ bằng tay giúp hiểu bài toán',
                  output: "{\"h\": 1, \"e\": 1, \"l\": 2, \"o\": 1}"
                }
              ],
              quiz: [
                { id: 'q4-3-1-1', question: 'Trước khi viết code, cần làm gì?', options: ['Viết code ngay', 'Phân tích bài toán', 'Copy từ internet'], correct_index: 1, explanation: 'Cần phân tích bài toán trước để hiểu rõ yêu cầu.' },
                { id: 'q4-3-1-2', question: 'Input là gì?', options: ['Dữ liệu đầu vào', 'Kết quả', 'Xử lý'], correct_index: 0, explanation: 'Input là dữ liệu đầu vào của bài toán.' },
                { id: 'q4-3-1-3', question: 'Tại sao nên làm ví dụ bằng tay?', options: ['Để hiểu bài toán', 'Để copy', 'Để thấy kết quả nhanh'], correct_index: 0, explanation: 'Làm ví dụ bằng tay giúp hiểu rõ bài toán trước khi code.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-3-2',
            module_id: 'mod-4-3',
            title: 'Chia nhỏ bài toán (Decomposition)',
            slug: 'chia-nho-bai-toan',
            description: 'Tách bài toán lớn thành các phần nhỏ hơn',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách chia nhỏ bài toán',
                'Biết cách tạo hàm cho từng phần',
                'Áp dụng vào bài toán thực tế'
              ],
              theory:
                "## Chia nhỏ bài toán (Decomposition)\n\n" +
                "Chia nhỏ bài toán là tách một bài toán lớn thành các bài toán con nhỏ hơn.\n\n" +
                "**Lợi ích:**\n" +
                "- Dễ hiểu, dễ giải quyết\n" +
                "- Tái sử dụng code\n" +
                "- Debug dễ hơn\n\n" +
                "**Cách làm:**\n\n" +
                "1. Xác định các bước chính của bài toán\n" +
                "2. Tách mỗi bước thành một hàm\n" +
                "3. Giải quyết từng hàm nhỏ\n" +
                "4. Kết hợp các hàm lại\n\n" +
                "**Ví dụ - Tính điểm trung bình:**\n" +
                "```python\n" +
                "def nhap_diem():\n" +
                "    # Nhập điểm\n" +
                "    pass\n\n" +
                "def tinh_trung_binh(diem):\n" +
                "    # Tính trung bình\n" +
                "    pass\n\n" +
                "def xep_loai(tb):\n" +
                "    # Xếp loại\n" +
                "    pass\n" +
                "```",
              examples: [
                {
                  title: 'Chia nhỏ bài toán',
                  code:
                    "# Bài toán: Tính diện tích và chu vi hình chữ nhật\n\n" +
                    "def tinh_dien_tich(dai, rong):\n" +
                    "    return dai * rong\n\n" +
                    "def tinh_chu_vi(dai, rong):\n" +
                    "    return 2 * (dai + rong)\n\n" +
                    "def in_thong_tin(dai, rong):\n" +
                    "    dt = tinh_dien_tich(dai, rong)\n" +
                    "    cv = tinh_chu_vi(dai, rong)\n" +
                    "    print(f\"Diện tích: {dt}\")\n" +
                    "    print(f\"Chu vi: {cv}\")\n\n" +
                    "in_thong_tin(5, 3)",
                  explanation: 'Mỗi chức năng là một hàm riêng, kết hợp trong hàm chính',
                  output: 'Diện tích: 15\nChu vi: 16'
                },
                {
                  title: 'Tách bài toán phức tạp',
                  code:
                    "# Bài toán: Tính tiền điện\n\n" +
                    "def tinh_tien(before, after, price_per_kwh):\n" +
                    "    consumed = before - after\n" +
                    "    return consumed * price_per_kwh\n\n" +
                    "def in_hoa_don(name, before, after, price):\n" +
                    "    tien = tinh_tien(before, after, price)\n" +
                    "    print(f\"Khách hàng: {name}\")\n" +
                    "    print(f\"Tiêu thụ: {before - after} kWh\")\n" +
                    "    print(f\"Tổng tiền: {tien} VND\")\n\n" +
                    "in_hoa_don(\"An\", 300, 150, 3000)",
                  explanation: 'Tách logic thành nhiều hàm nhỏ, mỗi hàm làm một việc',
                  output: 'Khách hàng: An\nTiêu thụ: 150 kWh\nTổng tiền: 450000 VND'
                }
              ],
              quiz: [
                { id: 'q4-3-2-1', question: 'Chia nhỏ bài toán (decomposition) có lợi gì?', options: ['Code dài hơn', 'Dễ hiểu, dễ quản lý', 'Chạy chậm hơn'], correct_index: 1, explanation: 'Chia nhỏ giúp bài toán dễ hiểu, dễ giải quyết và bảo trì.' },
                { id: 'q4-3-2-2', question: 'Mỗi hàm nên làm gì?', options: ['Nhiều việc', 'Một việc duy nhất', 'Không làm gì'], correct_index: 1, explanation: 'Mỗi hàm nên làm một việc duy nhất, rõ ràng (Single Responsibility Principle).' },
                { id: 'q4-3-2-3', question: 'Tại sao nên tách thành nhiều hàm?', options: ['Để tái sử dụng', 'Để code dài hơn', 'Để phức tạp hơn'], correct_index: 0, explanation: 'Tách thành nhiều hàm giúp tái sử dụng code và dễ bảo trì.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-3-3',
            module_id: 'mod-4-3',
            title: 'Viết code sạch',
            slug: 'viet-code-sach',
            description: 'Cách viết code dễ đọc, dễ hiểu và dễ bảo trì',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu các nguyên tắc viết code sạch',
                'Biết cách đặt tên biến và hàm có ý nghĩa',
                'Tránh các thói quen xấu khi viết code'
              ],
              theory:
                "## Viết code sạch\n\n" +
                "**Nguyên tắc đặt tên:**\n\n" +
                "1. **Biến/Hàm**: dùng snake_case, có ý nghĩa\n" +
                "   - ✅ `so_luong`, `tinh_tong`\n" +
                "   - ❌ `a`, `x`, `func1`\n\n" +
                "2. **Class**: dùng PascalCase\n" +
                "   - ✅ `SinhVien`, `HinhTron`\n\n" +
                "3. **Constant**: viết hoa\n" +
                "   - ✅ `MAX_SIZE`, `PI`\n\n" +
                "**Quy tắc quan trọng:**\n\n" +
                "1. **Một hàm, một việc**: Không làm quá nhiều thứ\n" +
                "2. **Comment có mục đích**: Giải thích TẠI SAO, không phải WHAT\n" +
                "3. **Tránh code thừa**: Không lặp lại\n" +
                "4. **Thụt lề nhất quán**: 4 dấu cách\n\n" +
                "**Bad vs Good:**\n" +
                "```python\n" +
                "# Bad\n" +
                "def fn(x):\n" +
                "    r = x*3.14\n" +
                "    return r\n\n" +
                "# Good\n" +
                "def tinh_ban_kinh(chu_vi):\n" +
                "    ban_kinh = chu_vi / PI\n" +
                "    return ban_kinh\n" +
                "```",
              examples: [
                {
                  title: 'Đặt tên có ý nghĩa',
                  code:
                    "# Bad - tên không rõ ràng\n" +
                    "x = 5\n" +
                    "y = 3\n" +
                    "z = x + y\n\n" +
                    "# Good - tên có ý nghĩa\n" +
                    "so_hoc_sinh = 5\n" +
                    "so_giao_vien = 3\n" +
                    "tong_su_nguoi = so_hoc_sinh + so_giao_vien",
                  explanation: 'Tên biến cần mô tả được giá trị của nó',
                  output: ''
                },
                {
                  title: 'Hàm làm một việc',
                  code:
                    "# Bad - một hàm làm nhiều việc\n" +
                    "def process_user(user):\n" +
                    "    print(user[\"name\"])\n" +
                    "    user[\"age\"] += 1\n" +
                    "    save_to_db(user)\n\n" +
                    "# Good - mỗi hàm một việc\n" +
                    "def in_thong_tin(user):\n" +
                    "    print(user[\"name\"])\n\n" +
                    "def tang_tuoi(user):\n" +
                    "    user[\"age\"] += 1\n\n" +
                    "def luu_nguoi_dung(user):\n" +
                    "    save_to_db(user)",
                  explanation: 'Tách thành nhiều hàm nhỏ, mỗi hàm một việc',
                  output: ''
                }
              ],
              quiz: [
                { id: 'q4-3-3-1', question: 'Tên biến nào ĐÚNG theo chuẩn Python?', options: ['soLuong', 'so_luong', 'SoLuong'], correct_index: 1, explanation: 'snake_case là chuẩn cho biến và hàm trong Python.' },
                { id: 'q4-3-3-2', question: 'Comment nên giải thích gì?', options: ['Code làm gì', 'Tại sao code như vậy', 'Không cần comment'], correct_index: 1, explanation: 'Comment nên giải thích TẠI SAO, không phải WHAT (code làm gì đã rõ).' },
                { id: 'q4-3-3-3', question: 'Một hàm nên làm mấy việc?', options: ['Nhiều việc càng tốt', 'Một việc duy nhất', 'Không cần làm gì'], correct_index: 1, explanation: 'Mỗi hàm nên làm một việc duy nhất, rõ ràng (Single Responsibility).' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-5',
    title: 'Xử lý file và Ngoại lệ',
    slug: 'xu-ly-file-va-ngoai-le',
    description: 'Đọc/ghi file, xử lý lỗi try/except',
    icon: '📁',
    color: '#F59E0B',
    order_index: 5,
    is_published: true,
    modules: [
      {
        id: 'mod-5-1',
        course_id: 'level-5',
        title: 'Đọc và ghi file',
        slug: 'doc-va-ghi-file',
        description: 'Cách đọc và ghi nội dung file trong Python',
        icon: '📄',
        color: '#F59E0B',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-5-1-1',
            module_id: 'mod-5-1',
            title: 'Mở và đọc file',
            slug: 'mo-va-doc-file',
            description: 'Cách mở file và đọc nội dung',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách mở file trong Python',
                'Biết cách đọc nội dung file',
                'Đóng file sau khi sử dụng'
              ],
              theory:
                "## Mở và đọc file\n\n" +
                "**Cú pháp mở file:**\n\n" +
                "```python\n" +
                "file = open(\"ten_file.txt\", \"r\")\n" +
                "# Đọc nội dung\n" +
                "file.close()\n" +
                "```\n\n" +
                "**Các chế độ mở file:**\n" +
                "- `\"r\"` - đọc (read)\n" +
                "- `\"w\"` - ghi (write)\n" +
                "- `\"a\"` - thêm (append)\n\n\n" +
                "**Đọc file với `with`:**\n" +
                "```python\n" +
                "with open(\"ten_file.txt\", \"r\") as file:\n" +
                "    content = file.read()\n" +
                "```\n\n" +
                "**Ưu điểm của `with`:** Tự động đóng file sau khi sử dụng.",
              examples: [
                {
                  title: 'Đọc file với with',
                  code:
                    "# Giả sử file \"data.txt\" có nội dung: \"Hello World\"\n" +
                    "with open(\"data.txt\", \"r\") as file:\n" +
                    "    content = file.read()\n" +
                    "    print(content)",
                  explanation: 'Dùng with để tự động đóng file',
                  output: 'Hello World'
                }
              ],
              quiz: [
                { id: 'q5-1-1-1', question: 'Chế độ "r" trong open() dùng để làm gì?', options: ['Ghi file', 'Đọc file', 'Xóa file'], correct_index: 1, explanation: '"r" là chế độ đọc (read) file.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-1-2',
            module_id: 'mod-5-1',
            title: 'Đọc file',
            slug: 'doc-file',
            description: 'Các cách đọc nội dung file trong Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Biết các phương thức đọc file khác nhau',
                'Đọc toàn bộ nội dung file',
                'Đọc file theo dòng'
              ],
              theory:
                "## Đọc file trong Python\n\n" +
                "Python cung cấp nhiều phương thức để đọc file:\n\n" +
                "**Các phương thức đọc file:**\n\n" +
                "- `read()` - Đọc toàn bộ nội dung\n" +
                "- `readline()` - Đọc một dòng\n" +
                "- `readlines()` - Đọc tất cả dòng vào list\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "with open(\"file.txt\", \"r\") as f:\n" +
                "    content = f.read()  # Đọc toàn bộ\n" +
                "```\n\n" +
                "**Đọc theo dòng:**\n" +
                "```python\n" +
                "with open(\"file.txt\", \"r\") as f:\n" +
                "    for line in f:  # Mỗi lần đọc một dòng\n" +
                "        print(line.strip())\n" +
                "```",
              examples: [
                {
                  title: 'Đọc toàn bộ file',
                  code:
                    "# Đọc toàn bộ nội dung\n" +
                    "with open(\"data.txt\", \"r\") as file:\n" +
                    "    content = file.read()\n" +
                    "    print(content)",
                  explanation: 'read() đọc tất cả nội dung vào một chuỗi',
                  output: 'Hello World'
                },
                {
                  title: 'Đọc file theo dòng',
                  code:
                    "# Đọc từng dòng\n" +
                    "with open(\"data.txt\", \"r\") as file:\n" +
                    "    for line in file:\n" +
                    "        print(line.strip())",
                  explanation: 'Dùng vòng for để đọc từng dòng',
                  output: 'Dòng 1\nDòng 2\nDòng 3'
                }
              ],
              quiz: [
                { id: 'q5-1-2-1', question: 'Phương thức nào đọc toàn bộ file?', options: ['readline()', 'read()', 'readlines()'], correct_index: 1, explanation: 'read() đọc toàn bộ nội dung file thành một chuỗi.' },
                { id: 'q5-1-2-2', question: 'readlines() trả về gì?', options: ['Chuỗi', 'List', 'Số nguyên'], correct_index: 1, explanation: 'readlines() trả về list, mỗi phần tử là một dòng.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-1-3',
            module_id: 'mod-5-1',
            title: 'Ghi file',
            slug: 'ghi-file',
            description: 'Cách ghi nội dung vào file trong Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Biết cách ghi file với chế độ w và a',
                'Hiểu sự khác nhau giữa w và a',
                'Ghi nội dung vào file'
              ],
              theory:
                "## Ghi file trong Python\n\n" +
                "**Chế độ ghi file:**\n\n" +
                "- `\"w\"` - Ghi (write): Xóa nội dung cũ, ghi mới\n" +
                "- `\"a\"` - Thêm (append): Thêm vào cuối file\n\n" +
                "**Cú pháp:**\n" +
                "```python\n" +
                "with open(\"file.txt\", \"w\") as f:\n" +
                "    f.write(\"Nội dung ghi\")\n" +
                "```\n\n" +
                "**Lưu ý quan trọng:**\n" +
                "- Chế độ \"w\" sẽ XÓA toàn bộ nội dung cũ\n" +
                "- Dùng \"a\" để thêm vào cuối file\n" +
                "- Cần đóng file hoặc dùng `with`",
              examples: [
                {
                  title: 'Ghi file mới',
                  code:
                    "# Ghi nội dung mới (xóa cũ)\n" +
                    "with open(\"output.txt\", \"w\") as file:\n" +
                    "    file.write(\"Dòng 1\\n\")\n" +
                    "    file.write(\"Dòng 2\\n\")\n\n" +
                    "# Đọc lại để xác nhận\n" +
                    "with open(\"output.txt\", \"r\") as file:\n" +
                    "    print(file.read())",
                  explanation: 'Chế độ w xóa nội dung cũ và ghi mới',
                  output: 'Dòng 1\nDòng 2'
                },
                {
                  title: 'Thêm vào file',
                  code:
                    "# Thêm vào cuối file\n" +
                    "with open(\"output.txt\", \"a\") as file:\n" +
                    "    file.write(\"Dòng 3\\n\")\n\n" +
                    "# Đọc lại\n" +
                    "with open(\"output.txt\", \"r\") as file:\n" +
                    "    print(file.read())",
                  explanation: 'Chế độ a thêm vào cuối file mà không xóa nội dung cũ',
                  output: 'Dòng 1\nDòng 2\nDòng 3'
                }
              ],
              quiz: [
                { id: 'q5-1-3-1', question: 'Chế độ nào xóa nội dung file trước khi ghi?', options: ['"a"', '"w"', '"r"'], correct_index: 1, explanation: 'Chế độ "w" (write) xóa nội dung cũ trước khi ghi mới.' },
                { id: 'q5-1-3-2', question: 'Chế độ nào để thêm vào cuối file?', options: ['"w"', '"a"', '"r"'], correct_index: 1, explanation: 'Chế độ "a" (append) thêm vào cuối file mà không xóa nội dung cũ.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-1-4',
            module_id: 'mod-5-1',
            title: 'Làm việc với file CSV',
            slug: 'lam-viec-voi-csv',
            description: 'Đọc và ghi file CSV trong Python',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 4,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu định dạng file CSV',
                'Biết cách đọc file CSV với csv module',
                'Biết cách ghi file CSV'
              ],
              theory:
                "## File CSV trong Python\n\n" +
                "**CSV (Comma Separated Values)** là định dạng lưu dữ liệu dạng bảng.\n\n" +
                "**Ví dụ file CSV:**\n" +
                "```\n" +
                "name,age,city\n" +
                "An,25,Hanoi\n" +
                "Binh,30,HCM\n" +
                "```\n\n" +
                "**Sử dụng module csv:**\n" +
                "```python\n" +
                "import csv\n" +
                "\n" +
                "# Đọc CSV\n" +
                "with open(\"data.csv\", \"r\") as f:\n" +
                "    reader = csv.reader(f)\n" +
                "    for row in reader:\n" +
                "        print(row)\n" +
                "```",
              examples: [
                {
                  title: 'Đọc file CSV',
                  code:
                    "import csv\n\n" +
                    "# Đọc file CSV\n" +
                    "with open(\"data.csv\", \"r\") as file:\n" +
                    "    reader = csv.reader(file)\n" +
                    "    for row in reader:\n" +
                    "        print(row)",
                  explanation: 'csv.reader đọc từng hàng thành list',
                  output: "['name', 'age', 'city']\n['An', '25', 'Hanoi']\n['Binh', '30', 'HCM']"
                },
                {
                  title: 'Ghi file CSV',
                  code:
                    "import csv\n\n" +
                    "# Ghi file CSV\n" +
                    "with open(\"output.csv\", \"w\", newline=\"\") as file:\n" +
                    "    writer = csv.writer(file)\n" +
                    "    writer.writerow([\"Name\", \"Age\"])\n" +
                    "    writer.writerow([\"An\", 25])\n" +
                    "    writer.writerow([\"Binh\", 30])\n\n" +
                    "print(\"Đã ghi file CSV!\")",
                  explanation: 'csv.writer ghi từng hàng vào file CSV',
                  output: 'Đã ghi file CSV!'
                }
              ],
              quiz: [
                { id: 'q5-1-4-1', question: 'CSV viết tắt của gì?', options: ['Comma Separated Values', 'Code Simple Value', 'Central System Value'], correct_index: 0, explanation: 'CSV = Comma Separated Values, định dạng lưu dữ liệu bảng.' },
                { id: 'q5-1-4-2', question: 'Module nào dùng để đọc/ghi CSV?', options: ['json', 'csv', 'os'], correct_index: 1, explanation: 'Module csv được dùng để làm việc với file CSV.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-5-2',
        course_id: 'level-5',
        title: 'Xử lý ngoại lệ',
        slug: 'xu-ly-ngoai-le',
        description: 'Try, Except, Raise - Xử lý lỗi trong Python',
        icon: '⚠️',
        color: '#EF4444',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-5-2-1',
            module_id: 'mod-5-2',
            title: 'Try và Except cơ bản',
            slug: 'try-except-co-ban',
            description: 'Cách xử lý ngoại lệ với try-except',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm ngoại lệ (Exception)',
                'Biết cách dùng try-except',
                'Xử lý lỗi cơ bản trong chương trình'
              ],
              theory:
                "## Try và Except trong Python\n\n" +
                "**Ngoại lệ (Exception)** là lỗi xảy ra khi chương trình chạy.\n\n" +
                "**Cú pháp try-except:**\n" +
                "```python\n" +
                "try:\n" +
                "    # Code có thể gây lỗi\n" +
                "except ExceptionType:\n" +
                "    # Xử lý lỗi\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "try:\n" +
                "    result = 10 / 0\nexcept ZeroDivisionError:\n" +
                "    print(\"Không thể chia cho 0!\")\n" +
                "```",
              examples: [
                {
                  title: 'Try-except cơ bản',
                  code:
                    "try:\n" +
                    "    num = int(input(\"Nhập số: \"))\n" +
                    "    print(\"Bạn nhập:\", num)\n" +
                    "except ValueError:\n" +
                    "    print(\"Lỗi: Vui lòng nhập số nguyên!\")",
                  explanation: 'ValueError xảy ra khi nhập không phải số',
                  output: 'Lỗi: Vui lòng nhập số nguyên!'
                },
                {
                  title: 'Xử lý chia cho 0',
                  code:
                    "try:\n" +
                    "    result = 10 / 0\n" +
                    "except ZeroDivisionError:\n" +
                    "    print(\"Lỗi: Không thể chia cho 0!\")",
                  explanation: 'ZeroDivisionError xảy ra khi chia cho 0',
                  output: 'Lỗi: Không thể chia cho 0!'
                }
              ],
              quiz: [
                { id: 'q5-2-1-1', question: 'Try-except dùng để làm gì?', options: ['Tạo biến', 'Xử lý lỗi', 'Vòng lặp'], correct_index: 1, explanation: 'Try-except dùng để bắt và xử lý ngoại lệ (lỗi) trong Python.' },
                { id: 'q5-2-1-2', question: 'ZeroDivisionError xảy ra khi nào?', options: ['Cộng số', 'Chia cho 0', 'Nhân số'], correct_index: 1, explanation: 'ZeroDivisionError xảy ra khi cố gắng chia cho 0.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-2-2',
            module_id: 'mod-5-2',
            title: 'Nhiều khối except',
            slug: 'nhieu-khoi-except',
            description: 'Xử lý nhiều loại ngoại lệ khác nhau',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Biết cách xử lý nhiều loại ngoại lệ',
                'Hiểu cách bắt ngoại lệ cụ thể',
                'Dùng nhiều except cho một try'
              ],
              theory:
                "## Nhiều khối Except\n\n" +
                "Một khối try có thể có nhiều khối except để xử lý các loại lỗi khác nhau.\n\n" +
                "**Cú pháp:**\n" +
                "```python\n" +
                "try:\n" +
                "    # Code có thể gây lỗi\nexcept ValueError:\n" +
                "    # Xử lý ValueError\nexcept ZeroDivisionError:\n" +
                "    # Xử lý ZeroDivisionError\nexcept Exception as e:\n" +
                "    # Bắt mọi lỗi khác\n" +
                "```\n\n" +
                "**Bắt nhiều lỗi cùng lúc:**\n" +
                "```python\n" +
                "except (ValueError, ZeroDivisionError):\n" +
                "    # Xử lý cả hai loại\n" +
                "```",
              examples: [
                {
                  title: 'Nhiều except khác nhau',
                  code:
                    "try:\n" +
                    "    num = int(input(\"Nhập số: \"))\n" +
                    "    result = 10 / num\n" +
                    "    print(\"Kết quả:\", result)\n" +
                    "except ValueError:\n" +
                    "    print(\"Lỗi: Nhập số đi!\")\n" +
                    "except ZeroDivisionError:\n" +
                    "    print(\"Lỗi: Không chia được cho 0!\")",
                  explanation: 'Mỗi except bắt một loại lỗi khác nhau',
                  output: 'Lỗi: Nhập số đi!'
                },
                {
                  title: 'Bắt nhiều lỗi cùng lúc',
                  code:
                    "try:\n" +
                    "    num = int(input(\"Nhập số: \"))\n" +
                    "    result = 10 / num\n" +
                    "except (ValueError, ZeroDivisionError):\n" +
                    "    print(\"Lỗi: Đầu vào không hợp lệ!\")",
                  explanation: 'Dùng tuple để bắt nhiều loại lỗi cùng lúc',
                  output: 'Lỗi: Đầu vào không hợp lệ!'
                }
              ],
              quiz: [
                { id: 'q5-2-2-1', question: 'Có thể có bao nhiêu except cho một try?', options: ['1', '2', 'Nhiều', '0'], correct_index: 2, explanation: 'Một try có thể có nhiều except để xử lý các loại lỗi khác nhau.' },
                { id: 'q5-2-2-2', question: 'Cú pháp nào để bắt nhiều lỗi cùng lúc?', options: ['except (ValueError, ZeroDivisionError)', 'except ValueError and ZeroDivisionError', 'except all'], correct_index: 0, explanation: 'Dùng tuple except (Error1, Error2) để bắt nhiều lỗi cùng lúc.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-2-3',
            module_id: 'mod-5-2',
            title: 'Else và finally',
            slug: 'else-va-finally',
            description: 'Sử dụng else và finally trong xử lý ngoại lệ',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách dùng else trong try-except',
                'Hiểu cách dùng finally',
                'Biết khi nào nên dùng else và finally'
              ],
              theory:
                "## Else và Finally\n\n" +
                "**Else** chạy khi KHÔNG có lỗi xảy ra trong try.\n\n" +
                "**Finally** chạy LUÔN LUÔN, dù có lỗi hay không.\n\n" +
                "**Cú pháp:**\n" +
                "```python\n" +
                "try:\n" +
                "    # Code có thể gây lỗi\nexcept:\n" +
                "    # Xử lý lỗi\n" +
                "else:\n" +
                "    # Chạy khi không có lỗi\n" +
                "finally:\n" +
                "    # Luôn chạy\n" +
                "```\n\n" +
                "**Ví dụ dùng finally:**\n" +
                "```python\n" +
                "try:\n" +
                "    file = open(\"data.txt\", \"r\")\n" +
                "except:\n" +
                "    print(\"Lỗi đọc file\")\n" +
                "finally:\n" +
                "    file.close()  # Luôn đóng file\n" +
                "```",
              examples: [
                {
                  title: 'Dùng else',
                  code:
                    "try:\n" +
                    "    num = int(\"10\")\n" +
                    "except ValueError:\n" +
                    "    print(\"Lỗi chuyển đổi!\")\n" +
                    "else:\n" +
                    "    print(\"Chuyển đổi thành công!\")\n" +
                    "    print(\"Số:\", num)",
                  explanation: 'else chạy khi try không gây lỗi',
                  output: 'Chuyển đổi thành công!\nSố: 10'
                },
                {
                  title: 'Dùng finally',
                  code:
                    "try:\n" +
                    "    result = 10 / 2\n" +
                    "    print(\"Kết quả:\", result)\n" +
                    "except ZeroDivisionError:\n" +
                    "    print(\"Lỗi chia cho 0!\")\n" +
                    "finally:\n" +
                    "    print(\"Luôn chạy cuối cùng\")",
                  explanation: 'finally luôn chạy dù có lỗi hay không',
                  output: 'Kết quả: 5.0\nLuôn chạy cuối cùng'
                }
              ],
              quiz: [
                { id: 'q5-2-3-1', question: 'else trong try-except chạy khi nào?', options: ['Luôn luôn', 'Khi có lỗi', 'Khi không có lỗi'], correct_index: 2, explanation: 'else chỉ chạy khi khối try không gây ra bất kỳ lỗi nào.' },
                { id: 'q5-2-3-2', question: 'finally trong try-except chạy khi nào?', options: ['Chỉ khi có lỗi', 'Chỉ khi không có lỗi', 'Luôn luôn'], correct_index: 2, explanation: 'finally luôn chạy, dù có lỗi xảy ra hay không.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-2-4',
            module_id: 'mod-5-2',
            title: 'Raise ngoại lệ tùy chỉnh',
            slug: 'raise-ngoai-le',
            description: 'Tạo và raise ngoại lệ tùy chỉnh',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 4,
            xp_reward: 110,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách raise ngoại lệ',
                'Biết cách tạo ngoại lệ tùy chỉnh',
                'Áp dụng raise trong thực tế'
              ],
              theory:
                "## Raise ngoại lệ tùy chỉnh\n\n" +
                "**Raise** dùng để tạo ra ngoại lệ khi gặp điều kiện không hợp lệ.\n\n" +
                "**Cú pháp:**\n" +
                "```python\n" +
                "raise ExceptionType(\"Thông báo lỗi\")\n" +
                "```\n\n" +
                "**Tạo ngoại lệ tùy chỉnh:**\n" +
                "```python\n" +
                "class MyError(Exception):\n" +
                "    pass\n\n" +
                "raise MyError(\"Lỗi của tôi\")\n" +
                "```\n\n" +
                "**Raise lại ngoại lệ:**\n" +
                "```python\n" +
                "try:\n" +
                "    # Code\n" +
                "except:\n" +
                "    # Xử lý\n" +
                "    raise  # Raise lại ngoại lệ\n" +
                "```",
              examples: [
                {
                  title: 'Raise lỗi đơn giản',
                  code:
                    "def chia(a, b):\n" +
                    "    if b == 0:\n" +
                    "        raise ValueError(\"Không thể chia cho 0!\")\n" +
                    "    return a / b\n\n" +
                    "try:\n" +
                    "    result = chia(10, 0)\n" +
                    "except ValueError as e:\n" +
                    "    print(\"Lỗi:\", e)",
                  explanation: 'Dùng raise để tạo ngoại lệ khi điều kiện không hợp lệ',
                  output: 'Lỗi: Không thể chia cho 0!'
                },
                {
                  title: 'Tạo ngoại lệ tùy chỉnh',
                  code:
                    "class InvalidAgeError(Exception):\n" +
                    "    pass\n\n" +
                    "def kiem_tra_tuoi(age):\n" +
                    "    if age < 0:\n" +
                    "        raise InvalidAgeError(\"Tuổi không thể âm!\")\n" +
                    "    return True\n\n" +
                    "try:\n" +
                    "    kiem_tra_tuoi(-5)\n" +
                    "except InvalidAgeError as e:\n" +
                    "    print(\"Lỗi:\", e)",
                  explanation: 'Tạo class ngoại lệ riêng kế thừa từ Exception',
                  output: 'Lỗi: Tuổi không thể âm!'
                }
              ],
              quiz: [
                { id: 'q5-2-4-1', question: 'Từ khóa nào dùng để tạo ngoại lệ?', options: ['throw', 'raise', 'catch'], correct_index: 1, explanation: 'raise dùng để tạo (throw) ngoại lệ trong Python.' },
                { id: 'q5-2-4-2', question: 'Làm sao tạo ngoại lệ tùy chỉnh?', options: ['Tạo class kế thừa từ Exception', 'Dùng hàm print', 'Dùng hàm input'], correct_index: 0, explanation: 'Tạo class kế thừa từ Exception để tạo ngoại lệ tùy chỉnh.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-5-3',
        course_id: 'level-5',
        title: 'Context Manager',
        slug: 'context-manager',
        description: 'With statement và tự tạo context manager',
        icon: '🔒',
        color: '#8B5CF6',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-5-3-1',
            module_id: 'mod-5-3',
            title: 'With và context manager',
            slug: 'with-va-context-manager',
            description: 'Sử dụng with statement trong Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu context manager là gì',
                'Biết cách dùng with statement',
                'Hiểu lợi ích của việc dùng with'
              ],
              theory:
                "## With và Context Manager\n\n" +
                "**Context Manager** đảm bảo resource được giải phóng đúng cách.\n\n" +
                "**Ví dụ dùng with:**\n" +
                "```python\n" +
                "with open(\"file.txt\", \"r\") as f:\n" +
                "    content = f.read()\n" +
                "# File tự động đóng ở đây\n" +
                "```\n\n" +
                "**Lợi ích của with:**\n" +
                "1. Tự động đóng file (không cần close())\n" +
                "2. Đảm bảo cleanup dù có lỗi\n" +
                "3. Code sạch hơn, dễ đọc hơn\n\n" +
                "**So sánh:**\n" +
                "```python\n" +
                "# Không dùng with\n" +
                "f = open(\"file.txt\", \"r\")\n" +
                "content = f.read()\n" +
                "f.close()  # Phải tự đóng\n\n" +
                "# Dùng with\n" +
                "with open(\"file.txt\", \"r\") as f:\n" +
                "    content = f.read()  # Tự đóng\n" +
                "```",
              examples: [
                {
                  title: 'With với file',
                  code:
                    "# Dùng with đọc file\n" +
                    "with open(\"data.txt\", \"w\") as file:\n" +
                    "    file.write(\"Hello with!\")\n\n" +
                    "# File đã tự động đóng\n" +
                    "with open(\"data.txt\", \"r\") as file:\n" +
                    "    print(file.read())",
                  explanation: 'with tự động đóng file sau khi sử dụng',
                  output: 'Hello with!'
                },
                {
                  title: 'With với nhiều file',
                  code:
                    "# Mở nhiều file cùng lúc\n" +
                    "with open(\"input.txt\", \"r\") as infile, \\\n" +
                    "     open(\"output.txt\", \"w\") as outfile:\n" +
                    "    outfile.write(infile.read().upper())\n\n" +
                    "print(\"Đã sao chép và viết hoa!\")",
                  explanation: 'Có thể mở nhiều file cùng lúc với with',
                  output: 'Đã sao chép và viết hoa!'
                }
              ],
              quiz: [
                { id: 'q5-3-1-1', question: 'Lợi ích chính của with là gì?', options: ['Tăng tốc đọc file', 'Tự động giải phóng resource', 'Mã hóa file'], correct_index: 1, explanation: 'with đảm bảo resource được giải phóng (đóng file) tự động.' },
                { id: 'q5-3-1-2', question: 'File có tự động đóng khi dùng with không?', options: ['Có', 'Không', 'Tùy trường hợp'], correct_index: 0, explanation: 'Khi dùng with, file sẽ tự động đóng sau khi block kết thúc.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-3-2',
            module_id: 'mod-5-3',
            title: 'Tự tạo context manager',
            slug: 'tu-tao-context-manager',
            description: 'Cách tạo context manager tùy chỉnh',
            difficulty: 'hard',
            estimated_minutes: 40,
            order_index: 2,
            xp_reward: 120,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách hoạt động của context manager',
                'Biết cách tạo context manager với class',
                'Biết cách tạo context manager với function'
              ],
              theory:
                "## Tự tạo Context Manager\n\n" +
                "**Cách 1: Dùng class**\n" +
                "Cần có `__enter__` và `__exit__`.\n" +
                "```python\n" +
                "class MyContext:\n" +
                "    def __enter__(self):\n" +
                "        # Setup\n" +
                "        return self\n" +
                "    def __exit__(self, exc_type, exc_val, exc_tb):\n" +
                "        # Cleanup\n" +
                "```\n\n" +
                "**Cách 2: Dùng contextlib**\n" +
                "```python\n" +
                "from contextlib import contextmanager\n" +
                "\n" +
                "@contextmanager\n" +
                "def my_context():\n" +
                "    # Setup\n" +
                "    yield\n" +
                "    # Cleanup\n" +
                "```",
              examples: [
                {
                  title: 'Context manager với class',
                  code:
                    "class FileManager:\n" +
                    "    def __init__(self, filename, mode):\n" +
                    "        self.filename = filename\n" +
                    "        self.mode = mode\n" +
                    "    def __enter__(self):\n" +
                    "        self.file = open(self.filename, self.mode)\n" +
                    "        return self.file\n" +
                    "    def __exit__(self, exc_type, exc_val, exc_tb):\n" +
                    "        self.file.close()\n\n" +
                    "# Sử dụng\n" +
                    "with FileManager(\"test.txt\", \"w\") as f:\n" +
                    "    f.write(\"Hello!\")\n" +
                    "print(\"File đã đóng tự động\")",
                  explanation: 'Tạo class với __enter__ và __exit__ để quản lý file',
                  output: 'File đã đóng tự động'
                },
                {
                  title: 'Context manager với decorator',
                  code:
                    "from contextlib import contextmanager\n\n" +
                    "@contextmanager\n" +
                    "def timer():\n" +
                    "    import time\n" +
                    "    start = time.time()\n" +
                    "    yield\n" +
                    "    end = time.time()\n" +
                    "    print(f\"Thời gian: {end - start:.2f}s\")\n\n" +
                    "with timer():\n" +
                    "    sum(range(1000000))",
                  explanation: 'Dùng @contextmanager decorator để tạo context manager',
                  output: 'Thời gian: 0.05s'
                }
              ],
              quiz: [
                { id: 'q5-3-2-1', question: 'Context manager cần có những method nào?', options: ['__enter__ và __exit__', '__start__ và __end__', '__open__ và __close__'], correct_index: 0, explanation: '__enter__ chạy khi vào with, __exit__ chạy khi thoát.' },
                { id: 'q5-3-2-2', question: 'Module nào cung cấp @contextmanager?', options: ['os', 'contextlib', 'json'], correct_index: 1, explanation: 'contextlib.contextmanager cung cấp decorator @contextmanager.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-5-3-3',
            module_id: 'mod-5-3',
            title: 'Best practices khi làm việc với file',
            slug: 'best-practices-file',
            description: 'Các best practice khi làm việc với file trong Python',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 110,
            is_published: true,
            content: {
              objectives: [
                'Biết các best practice khi làm việc với file',
                'Hiểu cách xử lý lỗi file đúng cách',
                'Áp dụng coding conventions'
              ],
              theory:
                "## Best Practices khi làm việc với File\n\n" +
                "**1. Luôn dùng `with`:**\n" +
                "```python\n" +
                "with open(\"file.txt\", \"r\") as f:\n" +
                "    content = f.read()\n" +
                "```\n\n" +
                "**2. Luôn xử lý lỗi:**\n" +
                "```python\n" +
                "try:\n" +
                "    with open(\"file.txt\", \"r\") as f:\n" +
                "        content = f.read()\nexcept FileNotFoundError:\n" +
                "    print(\"File không tồn tại!\")\n" +
                "```\n\n" +
                "**3. Dùng `newline=\"\"` cho CSV:**\n" +
                "```python\n" +
                "with open(\"file.csv\", \"w\", newline=\"\") as f:\n" +
                "    writer = csv.writer(f)\n" +
                "```\n\n" +
                "**4. Kiểm tra file tồn tại:**\n" +
                "```python\n" +
                "import os\n" +
                "if os.path.exists(\"file.txt\"):\n" +
                "    # Xử lý\n" +
                "```",
              examples: [
                {
                  title: 'Đọc file an toàn',
                  code:
                    "import os\n\n" +
                    "filepath = \"data.txt\"\n" +
                    "if os.path.exists(filepath):\n" +
                    "    with open(filepath, \"r\") as f:\n" +
                    "        print(f.read())\n" +
                    "else:\n" +
                    "    print(\"File không tồn tại!\")",
                  explanation: 'Kiểm tra file tồn tại trước khi đọc',
                  output: 'File không tồn tại!'
                },
                {
                  title: 'Ghi file với xử lý lỗi',
                  code:
                    "try:\n" +
                    "    with open(\"output.txt\", \"w\") as f:\n" +
                    "        f.write(\"Dữ liệu mới\")\n" +
                    "        print(\"Ghi file thành công!\")\n" +
                    "except PermissionError:\n" +
                    "    print(\"Lỗi: Không có quyền ghi!\")\n" +
                    "except Exception as e:\n" +
                    "    print(f\"Lỗi khác: {e}\")",
                  explanation: 'Xử lý nhiều loại lỗi khi ghi file',
                  output: 'Ghi file thành công!'
                }
              ],
              quiz: [
                { id: 'q5-3-3-1', question: 'Nên dùng gì thay vì try-finally để đóng file?', options: ['try-except', 'with statement', 'if-else'], correct_index: 1, explanation: 'with statement tự động đóng file và code sạch hơn try-finally.' },
                { id: 'q5-3-3-2', question: 'Khi ghi file CSV, nên dùng tham số gì?', options: ['newline=\"\\n\"', 'newline=\"\"', 'newline=\"\\r\"'], correct_index: 1, explanation: 'Dùng newline="" để tránh dòng trống thừa trên Windows.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-6',
    title: 'Lập trình hướng đối tượng',
    slug: 'lap-trinh-huong-doi-tuong',
    description: 'Class, Object, Inheritance - nền tảng OOP',
    icon: '🎯',
    color: '#EF4444',
    order_index: 6,
    is_published: true,
    modules: [
      {
        id: 'mod-6-1',
        course_id: 'level-6',
        title: 'Class và Object',
        slug: 'class-va-object',
        description: 'Tìm hiểu cách tạo Class và Object trong Python',
        icon: '🏠',
        color: '#EF4444',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-6-1-1',
            module_id: 'mod-6-1',
            title: 'Class - Tạo lớp đầu tiên',
            slug: 'class-tao-lop-dau-tien',
            description: 'Học cách định nghĩa một Class trong Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm Class trong OOP',
                'Biết cách định nghĩa một Class',
                'Phân biệt Class và Object'
              ],
              theory:
                "## Class là gì?\n\n" +
                "**Class (Lớp)** là một bản mẫu (blueprint) để tạo ra các đối tượng (Object).\n\n" +
                "**Cú pháp định nghĩa Class:**\n\n" +
                "```python\n" +
                "class TenClass:\n" +
                "    # Thuộc tính (attributes)\n" +
                "    # Phương thức (methods)\n" +
                "```\n\n" +
                "**Quy tắc đặt tên Class:**\n" +
                "1. Viết hoa chữ cái đầu mỗi từ (PascalCase): `SinhVien`, `MayTinh`\n" +
                "2. Không dùng số ở đầu\n" +
                "3. Đặt tên có ý nghĩa, mô tả đối tượng",
              examples: [
                {
                  title: 'Class đơn giản',
                  code:
                    "class Xe:\n" +
                    "    pass\n\n" +
                    "# Tạo object\n" +
                    "xe_cua_toi = Xe()\n" +
                    "print(\"Kiểu:\", type(xe_cua_toi))",
                  explanation: 'Định nghĩa class Xe và tạo object từ nó',
                  output: 'Kiểu: <class \'__main__.Xe\'>'
                }
              ],
              quiz: [
                { id: 'q6-1-1-1', question: 'Class là gì?', options: ['Một biến', 'Bản mẫu để tạo object', 'Một hàm'], correct_index: 1, explanation: 'Class là bản mẫu (blueprint) để tạo ra các object.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-1-2',
            module_id: 'mod-6-1',
            title: 'Object - Khởi tạo đối tượng',
            slug: 'object-khoi-tao',
            description: 'Tìm hiểu cách khởi tạo đối tượng từ Class',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách tạo Object từ Class',
                'Biết cách truy cập thuộc tính của Object',
                'Phân biệt Class và Object instance'
              ],
              theory:
                "## Object - Khởi tạo đối tượng\n\n" +
                "**Object (Đối tượng)** là một thể hiện (instance) của Class. Khi đã có Class, bạn có thể tạo nhiều Object từ nó.\n\n" +
                "**Cú pháp tạo Object:**\n\n" +
                "```python\n" +
                "ten_object = TenClass()\n" +
                "```\n\n" +
                "** Ví dụ:**\n" +
                "```python\n" +
                "class SinhVien:\n" +
                "    pass\n\n" +
                "sv1 = SinhVien()\n" +
                "sv2 = SinhVien()\n" +
                "```\n\n" +
                "**Truy cập thuộc tính:**\n" +
                "```python\n" +
                "object.attribute = value\n" +
                "print(object.attribute)\n" +
                "```",
              examples: [
                {
                  title: 'Tạo nhiều Object',
                  code:
                    "class Xe:\n" +
                    "    pass\n\n" +
                    "# Tạo các object khác nhau\n" +
                    "xe_1 = Xe()\n" +
                    "xe_2 = Xe()\n" +
                    "xe_3 = Xe()\n\n" +
                    "# Mỗi object là một instance độc lập\n" +
                    "xe_1 mau = \"Do\"\n" +
                    "xe_2.mau = \"Xanh\"\n" +
                    "print(\"Xe 1 mau:\", xe_1.mau)\n" +
                    "print(\"Xe 2 mau:\", xe_2.mau)\n" +
                    "print(\"Xe 3 co mau chua?\", hasattr(xe_3, \"mau\"))",
                  explanation: 'Mỗi Object là một instance độc lập, có thể có thuộc tính khác nhau',
                  output: 'Xe 1 mau: Do\nXe 2 mau: Xanh\nXe 3 co mau chua? False'
                }
              ],
              quiz: [
                { id: 'q6-1-2-1', question: 'Cú pháp nào để tạo Object từ Class Xe?', options: ['Xe.make()', 'Xe()', 'new Xe()'], correct_index: 1, explanation: 'Dùng TenClass() để tạo object từ class.' },
                { id: 'q6-1-2-2', question: 'Hai object từ cùng một class có gì khác nhau?', options: ['Cùng thuộc tính', 'Là các instance độc lập', 'Giống nhau hoàn toàn'], correct_index: 1, explanation: 'Mỗi object là một instance độc lập, có thể có giá trị thuộc tính khác nhau.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-1-3',
            module_id: 'mod-6-1',
            title: 'Thuộc tính và phương thức',
            slug: 'thuoc-tinh-va-phuong-thuc',
            description: 'Tìm hiểu về thuộc tính và phương thức trong Class',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm thuộc tính (attribute)',
                'Biết cách định nghĩa phương thức (method)',
                'Phân biệt thuộc tính instance và thuộc tính class'
              ],
              theory:
                "## Thuộc tính và Phương thức\n\n" +
                "**Thuộc tính (Attribute):** Là các biến lưu trữ dữ liệu của object.\n\n" +
                "**Phương thức (Method):** Là các hàm được định nghĩa bên trong class, thao tác với dữ liệu của object.\n\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class SinhVien:\n" +
                "    # Thuộc tính\n" +
                "    def __init__(self, ten, tuoi):\n" +
                "        self.ten = ten\n" +
                "        self.tuoi = tuoi\n\n" +
                "    # Phương thức\n" +
                "    def chao_hoi(self):\n" +
                "        print(f\"Xin chao, toi la {self.ten}\")\n" +
                "```\n\n" +
                "**Quy tắc quan trọng:**\n" +
                "- Tất cả phương thức đều cần tham số `self`\n" +
                "- `self` tham chiếu đến object hiện tại",
              examples: [
                {
                  title: 'Thuộc tính và phương thức',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten, tuoi):\n" +
                    "        self.ten = ten\n" +
                    "        self.tuoi = tuoi\n\n" +
                    "    def chao(self):\n" +
                    "        print(\"Xin chao! Toi la\", self.ten)\n\n" +
                    "    def choi(self, game):\n" +
                    "        print(self.ten, \"dang choi\", game)\n\n" +
                    "nguoi1 = Nguoi(\"An\", 25)\n" +
                    "nguoi1.chao()\n" +
                    "nguoi1.choi(\"co tuong\")\n" +
                    "print(\"Tuoi:\", nguoi1.tuoi)",
                  explanation: 'self.ten và self.tuoi là thuộc tính, chao() và choi() là phương thức',
                  output: 'Xin chao! Toi la An\nAn dang choi co tuong\nTuoi: 25'
                }
              ],
              quiz: [
                { id: 'q6-1-3-1', question: 'self trong class có nghĩa là gì?', options: ['Biến toàn cục', 'Tham chiếu đến object hiện tại', 'Tên class'], correct_index: 1, explanation: 'self tham chiếu đến object hiện tại của class.' },
                { id: 'q6-1-3-2', question: 'Phương thức có quan trọng không?', options: ['Chỉ là hàm thông thường', 'Là hàm được định nghĩa trong class', 'Không cần thiết'], correct_index: 1, explanation: 'Phương thức là hàm được định nghĩa bên trong class.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-1-4',
            module_id: 'mod-6-1',
            title: 'Constructor __init__',
            slug: 'constructor-init',
            description: 'Tìm hiểu về constructor __init__ trong Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu constructor là gì',
                'Biết cách sử dụng __init__ để khởi tạo object',
                'Sử dụng tham số mặc định trong __init__'
              ],
              theory:
                "## Constructor __init__\n\n" +
                "**Constructor** là phương thức đặc biệt được gọi tự động khi tạo một object mới.\n\n" +
                "Trong Python, constructor là method `__init__`.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "def __init__(self, param1, param2):\n" +
                "    # Khởi tạo thuộc tính\n" +
                "    self.attr1 = param1\n" +
                "    self.attr2 = param2\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class Dog:\n" +
                "    def __init__(self, name, age):\n" +
                "        self.name = name\n" +
                "        self.age = age\n\n" +
                "my_dog = Dog(\"Buddy\", 3)\n" +
                "```\n\n" +
                "**Tham số mặc định:**\n" +
                "```python\n" +
                "def __init__(self, name, age=1):\n" +
                "    self.name = name\n" +
                "    self.age = age\n" +
                "```",
              examples: [
                {
                  title: 'Constructor __init__',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten, tuoi=18):\n" +
                    "        self.ten = ten\n" +
                    "        self.tuoi = tuoi\n\n" +
                    "    def info(self):\n" +
                    "        print(f\"Ten: {self.ten}, Tuoi: {self.tuoi}\")\n\n" +
                    "nguoi1 = Nguoi(\"An\", 25)\n" +
                    "nguoi2 = Nguoi(\"Binh\")\n" +
                    "nguoi1.info()\n" +
                    "nguoi2.info()",
                  explanation: '__init__ được gọi tự động khi tạo object, tham số mặc định tuoi=18',
                  output: 'Ten: An, Tuoi: 25\nTen: Binh, Tuoi: 18'
                }
              ],
              quiz: [
                { id: 'q6-1-4-1', question: '__init__ được gọi khi nào?', options: ['Khi xóa object', 'Khi tạo object mới', 'Khi gọi method'], correct_index: 1, explanation: '__init__ được gọi tự động khi tạo object mới từ class.' },
                { id: 'q6-1-4-2', question: 'self trong __init__ có vai trò gì?', options: ['Tham số tùy chọn', 'Tham chiếu đến object đang được tạo', 'Tên class'], correct_index: 1, explanation: 'self tham chiếu đến object đang được tạo, dùng để gán thuộc tính.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-6-2',
        course_id: 'level-6',
        title: 'Kế thừa',
        slug: 'ke-thua',
        description: 'Tìm hiểu về kế thừa trong lập trình hướng đối tượng',
        icon: '🔗',
        color: '#F59E0B',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-6-2-1',
            module_id: 'mod-6-2',
            title: 'Kế thừa cơ bản',
            slug: 'ke-thua-co-ban',
            description: 'Tìm hiểu cách kế thừa từ một class khác',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm kế thừa (Inheritance)',
                'Biết cách tạo class con kế thừa class cha',
                'Hiểu lợi ích của kế thừa trong OOP'
              ],
              theory:
                "## Kế thừa cơ bản\n\n" +
                "**Kế thừa (Inheritance)** cho phép một class mới (class con) kế thừa các thuộc tính và phương thức từ một class khác (class cha).\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "class ClassCon(ClassCha):\n" +
                "    # Thuộc tính và phương thức mới\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class DongVat:\n" +
                "    def an(self):\n" +
                "        print(\"Dong vat dang an\")\n\n" +
                "class Cho(DongVat):\n" +
                "    def sua(self):\n" +
                "        print(\"Cho sua\")\n\n" +
                "cho = Cho()\n" +
                "cho.an()   # Kế thừa từ DongVat\n" +
                "cho.sua()  # Method riêng của Cho\n" +
                "```\n\n" +
                "**Lợi ích:**\n" +
                "- Tái sử dụng code\n" +
                "- Tạo hệ thống phân cấp class\n" +
                "- Dễ bảo trì và mở rộng",
              examples: [
                {
                  title: 'Kế thừa đơn giản',
                  code:
                    "class DongVat:\n" +
                    "    def __init__(self, ten):\n" +
                    "        self.ten = ten\n\n" +
                    "    def an(self):\n" +
                    "        print(self.ten, \"dang an\")\n\n" +
                    "class Meo(DongVat):\n" +
                    "    def cua(self):\n" +
                    "        print(self.ten, \"keu meo meo\")\n\n\n" +
                    "meo = Meo(\"Tom\")\n" +
                    "meo.an()\n" +
                    "meo.cua()\n" +
                    "print(\"Tom la:\", type(meo).__name__)",
                  explanation: 'Meo kế thừa DongVat nên có cả phương thức an() và cua()',
                  output: 'Tom dang an\nTom keu meo meo\nTom la: Meo'
                }
              ],
              quiz: [
                { id: 'q6-2-1-1', question: 'Kế thừa trong OOP có nghĩa là gì?', options: ['Class mới copy toàn bộ code', 'Class mới nhận thuộc tính và phương thức từ class khác', 'Class mới không liên quan'], correct_index: 1, explanation: 'Kế thừa cho phép class con nhận các thuộc tính và phương thức từ class cha.' },
                { id: 'q6-2-1-2', question: 'Cú pháp nào đúng để tạo class Con kế thừa class Cha?', options: ['class Con(Cha):', 'class Con extends Cha:', 'class Con <- Cha:'], correct_index: 0, explanation: 'Dùng class Con(Cha): để kế thừa class Cha.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-2-2',
            module_id: 'mod-6-2',
            title: 'Ghi đè phương thức',
            slug: 'ghi-de-phuong-thuc',
            description: 'Tìm hiểu cách ghi đè (override) phương thức trong class con',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm ghi đè phương thức (Method Override)',
                'Biết cách ghi đè phương thức từ class cha',
                'Sử dụng super() để gọi phương thức class cha'
              ],
              theory:
                "## Ghi đè phương thức\n\n" +
                "**Ghi đè (Override)** là khi class con định nghĩa lại một phương thức đã có ở class cha.\n\n\n" +
                "**Cú pháp:**\n\n" +
                "Định nghĩa lại method cùng tên trong class con.\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class Cha:\n" +
                "    def chao(self):\n" +
                "        print(\"Xin chao tu Cha\")\n\n" +
                "class Con(Cha):\n" +
                "    def chao(self):\n" +
                "        print(\"Xin chao tu Con\")\n" +
                "```\n\n" +
                "**Dùng super() để gọi method class cha:**\n" +
                "```python\n" +
                "class Con(Cha):\n" +
                "    def chao(self):\n" +
                "        super().chao()  # Gọi method của Cha\n" +
                "        print(\"Day la Con\")\n" +
                "```",
              examples: [
                {
                  title: 'Ghi đè phương thức',
                  code:
                    "class DongVat:\n" +
                    "    def tieng_keu(self):\n" +
                    "        print(\"Tieng keu cua dong vat\")\n\n" +
                    "class Cho(DongVat):\n" +
                    "    def tieng_keu(self):\n" +
                    "        print(\" Gau gau!\")\n\n" +
                    "class Meo(DongVat):\n" +
                    "    def tieng_keu(self):\n" +
                    "        print(\" Meo meo!\")\n\n" +
                    "dv = DongVat()\n" +
                    "cho = Cho()\n" +
                    "meo = Meo()\n\n" +
                    "dv.tieng_keu()\n" +
                    "cho.tieng_keu()\n" +
                    "meo.tieng_keu()",
                  explanation: 'Cho và Meo ghi đè tieng_keu() từ DongVat bằng phiên bản riêng',
                  output: 'Tieng keu cua dong vat\n Gau gau!\n Meo meo!'
                },
                {
                  title: 'Dùng super() gọi method cha',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten):\n" +
                    "        self.ten = ten\n\n" +
                    "    def gioi_thieu(self):\n" +
                    "        print(f\"Toi la {self.ten}\")\n\n" +
                    "class SinhVien(Nguoi):\n" +
                    "    def __init__(self, ten, truong):\n" +
                    "        super().__init__(ten)\n" +
                    "        self.truong = truong\n\n" +
                    "    def gioi_thieu(self):\n" +
                    "        super().gioi_thieu()\n" +
                    "        print(f\"Toi hoc tai {self.truong}\")\n\n" +
                    "sv = SinhVien(\"An\", \"FPT\")\n" +
                    "sv.gioi_thieu()",
                  explanation: 'super().__init__(ten) gọi constructor của class cha',
                  output: 'Toi la An\nToi hoc tai FPT'
                }
              ],
              quiz: [
                { id: 'q6-2-2-1', question: 'Ghi đè phương thức là gì?', options: ['Xóa method cha', 'Định nghĩa lại method cùng tên trong class con', 'Thêm method mới'], correct_index: 1, explanation: 'Ghi đè là định nghĩa lại method cùng tên trong class con để thay thế method của class cha.' },
                { id: 'q6-2-2-2', question: 'super() dùng để làm gì?', options: ['Tạo object mới', 'Gọi phương thức từ class cha', 'Xóa class cha'], correct_index: 1, explanation: 'super() dùng để gọi phương thức hoặc constructor của class cha.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-2-3',
            module_id: 'mod-6-2',
            title: 'Đa kế thừa',
            slug: 'da-ke-thua',
            description: 'Tìm hiểu về đa kế thừa (Multiple Inheritance)',
            difficulty: 'hard',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 120,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm đa kế thừa',
                'Biết cách kế thừa từ nhiều class',
                'Nhận biết các vấn đề tiềm tàng của đa kế thừa'
              ],
              theory:
                "## Đa kế thừa\n\n" +
                "**Đa kế thừa (Multiple Inheritance)** là khi một class kế thừa từ nhiều class cha cùng lúc.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "class ClassCon(ClassCha1, ClassCha2):\n" +
                "    pass\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class Nguoi:\n" +
                "    def __init__(self, ten):\n" +
                "        self.ten = ten\n\n" +
                "class LamViec:\n" +
                "    def __init__(self, cong_viec):\n" +
                "        self.cong_viec = cong_viec\n\n" +
                "class NghiLuc(Nguoi, LamViec):\n" +
                "    def __init__(self, ten, cong_viec, ngay_nghi):\n" +
                "        Nguoi.__init__(self, ten)\n" +
                "        LamViec.__init__(self, cong_viec)\n" +
                "        self.ngay_nghi = ngay_nghi\n" +
                "```\n\n" +
                "**Lưu ý:**\n" +
                "- Đa kế thừa có thể gây phức tạp và khó bảo trì\n" +
                "- Python sử dụng MRO (Method Resolution Order) để xác định thứ tự tìm method",
              examples: [
                {
                  title: 'Đa kế thừa',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten):\n" +
                    "        self.ten = ten\n" +
                    "    def choi(self):\n" +
                    "        print(self.ten, \"dang choi\")\n\n" +
                    "class MayTinh:\n" +
                    "    def __init__(self, cong_ty):\n" +
                    "        self.cong_ty = cong_ty\n" +
                    "    def code(self):\n" +
                    "        print(\"Dang code tren\", self.cong_ty)\n\n" +
                    "class LapTrinhVien(Nguoi, MayTinh):\n" +
                    "    def __init__(self, ten, cong_ty):\n" +
                    "        Nguoi.__init__(self, ten)\n" +
                    "        MayTinh.__init__(self, cong_ty)\n\n\n" +
                    "lt = LapTrinhVien(\"An\", \"FPT\")\n" +
                    "lt.choi()\n" +
                    "lt.code()",
                  explanation: 'LapTrinhVien kế thừa cả Nguoi và MayTinh nên có cả hai phương thức',
                  output: 'An dang choi\nDang code tren FPT'
                }
              ],
              quiz: [
                { id: 'q6-2-3-1', question: 'Đa kế thừa là gì?', options: ['Kế thừa từ 1 class', 'Kế thừa từ nhiều class', 'Không có khái niệm này'], correct_index: 1, explanation: 'Đa kế thừa là khi một class kế thừa từ nhiều class cha cùng lúc.' },
                { id: 'q6-2-3-2', question: 'Cú pháp đa kế thừa đúng là gì?', options: ['class A(B,C):', 'class A(B): class A(C):', 'class A(B); class A(C):'], correct_index: 0, explanation: 'Dùng class A(B, C): để kế thừa từ cả B và C.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-2-4',
            module_id: 'mod-6-2',
            title: 'super() và MRO',
            slug: 'super-va-mro',
            description: 'Tìm hiểu về super() và Method Resolution Order',
            difficulty: 'hard',
            estimated_minutes: 35,
            order_index: 4,
            xp_reward: 120,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách super() hoạt động trong Python',
                'Biết cách xem MRO của một class',
                'Giải quyết xung đột method trong đa kế thừa'
              ],
              theory:
                "## super() và MRO\n\n" +
                "**super()** dùng để gọi các phương thức của class cha theo thứ tự MRO.\n\n" +
                "**MRO (Method Resolution Order)** là thứ tự Python tìm kiếm phương thức khi có đa kế thừa.\n\n" +
                "**Xem MRO:**\n\n" +
                "```python\n" +
                "print(ClassName.__mro__)\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class A:\n" +
                "    def hello(self):\n" +
                "        print(\"A\")\n\n" +
                "class B(A):\n" +
                "    def hello(self):\n" +
                "        print(\"B\")\n\n" +
                "class C(A):\n" +
                "    def hello(self):\n" +
                "        print(\"C\")\n\n" +
                "class D(B, C):\n" +
                "    pass\n\n" +
                "D().hello()  # In ra \"B\"\n" +
                "print(D.__mro__)\n" +
                "```",
              examples: [
                {
                  title: 'Xem MRO',
                  code:
                    "class A:\n" +
                    "    def hello(self):\n" +
                    "        print(\"A\")\n\n" +
                    "class B(A):\n" +
                    "    def hello(self):\n" +
                    "        print(\"B\")\n\n" +
                    "class C(A):\n" +
                    "    def hello(self):\n" +
                    "        print(\"C\")\n\n" +
                    "class D(B, C):\n" +
                    "    pass\n\n" +
                    "print(\"MRO cua D:\", [c.__name__ for c in D.__mro__])\n" +
                    "D().hello()",
                  explanation: 'MRO cho thấy thứ tự tìm kiếm method là D -> B -> C -> A',
                  output: 'MRO cua D: [\'D\', \'B\', \'C\', \'A\']\nB'
                }
              ],
              quiz: [
                { id: 'q6-2-4-1', question: 'MRO viết tắt của gì?', options: ['Method Return Object', 'Method Resolution Order', 'Multiple Reference Override'], correct_index: 1, explanation: 'MRO là Method Resolution Order, thứ tự Python tìm kiếm phương thức.' },
                { id: 'q6-2-4-2', question: 'Cách nào xem MRO của class D?', options: ['D.__mro__', 'D.mro', 'Cả A và B đều đúng'], correct_index: 2, explanation: 'Cả D.__mro__ và D.mro() đều cho phép xem MRO.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-6-3',
        course_id: 'level-6',
        title: 'Đóng gói',
        slug: 'dong-goi',
        description: 'Tìm hiểu về đóng gói (Encapsulation) trong OOP',
        icon: '🔒',
        color: '#10B981',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-6-3-1',
            module_id: 'mod-6-3',
            title: 'Đóng gói (Encapsulation)',
            slug: 'dong-goi-encapsulation',
            description: 'Tìm hiểu về đóng gói và bảo vệ dữ liệu trong Class',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm đóng gói (Encapsulation)',
                'Biết cách sử dụng thuộc tính private và protected',
                'Hiểu tại sao cần đóng gói dữ liệu'
              ],
              theory:
                "## Đóng gói (Encapsulation)\n\n" +
                "**Đóng gói** là việc hạn chế truy cập trực tiếp vào dữ liệu của object từ bên ngoài, chỉ cho phép truy cập thông qua các phương thức getter/setter.\n\n\n" +
                "**Quy ước đặt tên trong Python:**\n" +
                "- `_attribute`: Protected (nên được truy cập từ subclass)\n" +
                "- `__attribute`: Private (name mangling)\n\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class TaiKhoan:\n" +
                "    def __init__(self, so_du):\n" +
                "        self.__so_du = so_du  # Private\n\n" +
                "    def rut_tien(self, so_tien):\n" +
                "        if so_tien > self.__so_du:\n" +
                "            print(\"Khong du tien!\")\n" +
                "        else:\n" +
                "            self.__so_du -= so_tien\n" +
                "```\n\n" +
                "**Lợi ích:**\n" +
                "- Bảo vệ dữ liệu khỏi thay đổi không hợp lệ\n" +
                "- Ẩn giấu chi tiết implementation\n" +
                "- Dễ bảo trì và mở rộng",
              examples: [
                {
                  title: 'Thuộc tính Private',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten, tuoi):\n" +
                    "        self.__ten = ten  # Private\n" +
                    "        self._tuoi = tuoi  # Protected\n\n" +
                    "    def lay_ten(self):\n" +
                    "        return self.__ten\n\n" +
                    "    def dat_ten(self, ten_moi):\n" +
                    "        self.__ten = ten_moi\n\n" +
                    "nguoi = Nguoi(\"An\", 25)\n" +
                    "print(\"Ten:\", nguoi.lay_ten())\n" +
                    "nguoi.dat_ten(\"Binh\")\n" +
                    "print(\"Ten sau khi doi:\", nguoi.lay_ten())\n" +
                    "print(\"Tuoi (protected):\", nguoi._tuoi)",
                  explanation: '__ten là private, _tuoi là protected, chỉ truy cập qua getter/setter',
                  output: 'Ten: An\nTen sau khi doi: Binh\nTuoi (protected): 25'
                }
              ],
              quiz: [
                { id: 'q6-3-1-1', question: 'Thuộc tính private trong Python được khai báo thế nào?', options: ['private attribute', '__attribute', '#attribute'], correct_index: 1, explanation: 'Trong Python, thuộc tính private được khai báo với __ ở đầu (name mangling).' },
                { id: 'q6-3-1-2', question: 'Đóng gói có lợi ích gì?', options: ['Tăng tốc độ', 'Bảo vệ dữ liệu khỏi truy cập trái phép', 'Giảm bộ nhớ'], correct_index: 1, explanation: 'Đóng gói giúp bảo vệ dữ liệu và chỉ cho phép truy cập qua phương thức được kiểm soát.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-3-2',
            module_id: 'mod-6-3',
            title: 'Property decorator (@property)',
            slug: 'property-decorator',
            description: 'Tìm hiểu cách sử dụng @property decorator',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu decorator @property là gì',
                'Biết cách tạo getter, setter với @property',
                'Sử dụng @property để truy cập thuộc tính an toàn'
              ],
              theory:
                "## Property decorator (@property)\n\n" +
                "**@property** cho phép truy cập thuộc tính nhưng thực tế gọi một phương thức.\n\n" +
                "**Cú pháp getter:**\n\n" +
                "```python\n" +
                "@property\n" +
                "def ten_thuoc_tinh(self):\n" +
                "    return self.__ten_thuoc_tinh\n" +
                "```\n\n" +
                "**Cú pháp setter:**\n\n" +
                "```python\n" +
                "@ten_thuoc_tinh.setter\n" +
                "def ten_thuoc_tinh(self, gia_tri):\n" +
                "    self.__ten_thuoc_tinh = gia_tri\n" +
                "```\n\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class Nguoi:\n" +
                "    @property\n" +
                "    def ten(self):\n" +
                "        return self.__ten\n\n" +
                "    @ten.setter\n" +
                "    def ten(self, value):\n" +
                "        self.__ten = value\n" +
                "```",
              examples: [
                {
                  title: 'Sử dụng @property',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten):\n" +
                    "        self.__ten = ten\n\n" +
                    "    @property\n" +
                    "    def ten(self):\n" +
                    "        return self.__ten\n\n" +
                    "    @ten.setter\n" +
                    "    def ten(self, gia_tri):\n" +
                    "        if gia_tri:\n" +
                    "            self.__ten = gia_tri\n\n" +
                    "nguoi = Nguoi(\"An\")\n" +
                    "print(\"Ten:\", nguoi.ten)  # Gọi như thuộc tính\n" +
                    "nguoi.ten = \"Binh\"  # Gọi setter\n" +
                    "print(\"Ten moi:\", nguoi.ten)",
                  explanation: '@property cho phép gọi ten() như một thuộc tính thông thường',
                  output: 'Ten: An\nTen moi: Binh'
                }
              ],
              quiz: [
                { id: 'q6-3-2-1', question: '@property dùng để làm gì?', options: ['Tạo thuộc tính mới', 'Tạo getter cho thuộc tính private', 'Xóa thuộc tính'], correct_index: 1, explanation: '@property biến một phương thức thành thuộc tính có thể đọc được.' },
                { id: 'q6-3-2-2', question: 'Setter cho @property được định nghĩa bằng cách nào?', options: ['@property.setter', '@setter.property', '@property_setter'], correct_index: 0, explanation: 'Dùng @ten_property.setter để định nghĩa setter cho property.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-6-3-3',
            module_id: 'mod-6-3',
            title: 'Magic methods (__str__, __repr__)',
            slug: 'magic-methods',
            description: 'Tìm hiểu về các magic methods trong Python',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu magic methods là gì',
                'Biết cách sử dụng __str__ và __repr__',
                'Tự định nghĩa cách hiển thị object'
              ],
              theory:
                "## Magic methods (__str__, __repr__)\n\n" +
                "**Magic methods** là các phương thức đặc biệt có dấu __ ở đầu và cuối tên, được gọi tự động bởi Python.\n\n\n" +
                "**__str__:** Được gọi khi dùng print() hoặc str()\n" +
                "**__repr__:** Được gọi khi hiển thị trong interpreter\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "def __str__(self):\n" +
                "    return \"Mieu ta deu hon\"\n\n" +
                "def __repr__(self):\n" +
                "    return f\"ClassName(attr=value)\"\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "class Nguoi:\n" +
                "    def __init__(self, ten):\n" +
                "        self.ten = ten\n\n" +
                "    def __str__(self):\n" +
                "        return f\"Nguoi: {self.ten}\"\n\n" +
                "    def __repr__(self):\n" +
                "        return f\"Nguoi({self.ten!r})\"\n" +
                "```",
              examples: [
                {
                  title: '__str__ và __repr__',
                  code:
                    "class Nguoi:\n" +
                    "    def __init__(self, ten, tuoi):\n" +
                    "        self.ten = ten\n" +
                    "        self.tuoi = tuoi\n\n" +
                    "    def __str__(self):\n" +
                    "        return f\"{self.ten}, {self.tuoi} tuoi\"\n\n" +
                    "    def __repr__(self):\n" +
                    "        return f\"Nguoi({self.ten!r}, {self.tuoi!r})\"\n\n" +
                    "nguoi = Nguoi(\"An\", 25)\n" +
                    "print(\"str:\", str(nguoi))\n" +
                    "print(\"repr:\", repr(nguoi))\n" +
                    "nguoi",
                  explanation: '__str__ dùng khi print(), __repr__ dùng khi hiển thị trong shell',
                  output: 'str: An, 25 tuoi\nrepr: Nguoi(\'An\', 25)\nNguoi(\'An\', 25)'
                }
              ],
              quiz: [
                { id: 'q6-3-3-1', question: '__str__ được gọi khi nào?', options: ['Khi định nghĩa', 'Khi dùng print() hoặc str()', 'Khi xóa object'], correct_index: 1, explanation: '__str__ được gọi tự động khi dùng print() hoặc str() trên object.' },
                { id: 'q6-3-3-2', question: 'Magic methods có đặc điểm gì?', options: ['Có __ ở đầu và cuối tên', 'Không có gì đặc biệt', 'Chỉ dùng cho debug'], correct_index: 0, explanation: 'Magic methods có dấu __ ở đầu và cuối tên, được Python gọi tự động.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-7',
    title: 'Module và Package',
    slug: 'module-va-package',
    description: 'Tổ chức code với module, import và pip',
    icon: '📦',
    color: '#6366F1',
    order_index: 7,
    is_published: true,
    modules: [
      {
        id: 'mod-7-1',
        course_id: 'level-7',
        title: 'Import Module',
        slug: 'import-module',
        description: 'Cách import và sử dụng module trong Python',
        icon: '📥',
        color: '#6366F1',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-7-1-1',
            module_id: 'mod-7-1',
            title: 'Sử dụng import',
            slug: 'su-dung-import',
            description: 'Cách nhập module vào chương trình',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 70,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm module',
                'Biết cách import module',
                'Sử dụng các hàm từ module'
              ],
              theory:
                "## Import Module\n\n" +
                "**Module** là một file Python chứa các hàm, biến, class có thể tái sử dụng.\n\n" +
                "**Cú pháp import:**\n\n" +
                "```python\n" +
                "import ten_module\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "import math\n" +
                "print(math.pi)  # 3.141592653589793\n" +
                "print(math.sqrt(16))  # 4.0\n" +
                "```\n\n" +
                "**Import với alias:**\n\n" +
                "```python\n" +
                "import math as m\n" +
                "print(m.pi)\n" +
                "```",
              examples: [
                {
                  title: 'Import math',
                  code:
                    "import math\n\n" +
                    "print(\"Pi:\", math.pi)\n" +
                    "print(\"Căn bậc 2 của 16:\", math.sqrt(16))\n" +
                    "print(\"2 mũ 3:\", math.pow(2, 3))",
                  explanation: 'Sử dụng các hàm từ module math',
                  output: 'Pi: 3.141592653589793\nCăn bậc 2 của 16: 4.0\n2 mũ 3: 8.0'
                }
              ],
              quiz: [
                { id: 'q7-1-1-1', question: 'Cú pháp nào đúng để import module?', options: ['include math', 'import math', 'using math'], correct_index: 1, explanation: 'Dùng `import ten_module` để nhập module.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-1-2',
            module_id: 'mod-7-1',
            title: 'From...Import',
            slug: 'from-import',
            description: 'Cách nhập hàm cụ thể từ module',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 2,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Biết cách dùng from...import',
                'Hiểu sự khác nhau giữa import và from...import',
                'Sử dụng được các hàm nhập cụ thể'
              ],
              theory:
                "## From...Import\n\n" +
                "Cú pháp `from...import` cho phép nhập trực tiếp các hàm, biến từ module mà không cần ghi rõ tên module.\n\n" +
                "**Cú pháp:**\n\n" +
                "```python\n" +
                "from ten_module import ten_ham\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "from math import sqrt, pi\n" +
                "print(sqrt(16))  # 4.0\n" +
                "print(pi)        # 3.141592653589793\n" +
                "```\n\n" +
                "**So sánh import và from...import:**\n" +
                "- `import math` → dùng `math.sqrt()`\n" +
                "- `from math import sqrt` → dùng `sqrt()` trực tiếp\n\n" +
                "**Import tất cả:**\n" +
                "```python\n" +
                "from math import *  # Không khuyến khích\n" +
                "```",
              examples: [
                {
                  title: 'Từ math import sqrt và pi',
                  code:
                    "from math import sqrt, pi\n\n" +
                    "print(\"Can bac 2 cua 16:\", sqrt(16))\n" +
                    "print(\"Gia tri pi:\", pi)\n" +
                    "print(\"Ban kinh 5, dien tich:\", pi * 5 ** 2)",
                  explanation: 'Dùng from...import để nhập trực tiếp các hàm',
                  output: 'Can bac 2 cua 16: 4.0\nGia tri pi: 3.141592653589793\nBan kinh 5, dien tich: 78.53981633974483'
                },
                {
                  title: 'So sanh import va from...import',
                  code:
                    "# Cach 1: import thong thuong\n" +
                    "import math\n" +
                    "print(math.sqrt(25))\n\n" +
                    "# Cach 2: from...import\n" +
                    "from math import sqrt\n" +
                    "print(sqrt(25))  # Khong can math.",
                  explanation: 'from...import giúp viết code ngắn gọn hơn',
                  output: '5.0\n5.0'
                }
              ],
              quiz: [
                { id: 'q7-1-2-1', question: 'Cú pháp nào để nhập hàm sqrt từ math?', options: ['import sqrt from math', 'from math import sqrt', 'import math.sqrt'], correct_index: 1, explanation: 'Dùng `from ten_module import ten_ham`.' },
                { id: 'q7-1-2-2', question: 'Từ math import sqrt, sau đó dùng sqrt(16), có cần prefix math. không?', options: ['Cần', 'Không cần', 'Tùy trường hợp'], correct_index: 1, explanation: 'Khi dùng from...import, không cần prefix module.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-1-3',
            module_id: 'mod-7-1',
            title: 'Xử lý khi import thất bại',
            slug: 'xu-ly-khi-import-that-bai',
            description: 'Cách xử lý lỗi khi module không tồn tại',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 3,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu các lỗi khi import',
                'Biết cách xử lý ImportError',
                'Sử dụng try...except khi import'
              ],
              theory:
                "## Xử lý khi Import thất bại\n\n" +
                "Khi module không tồn tại hoặc không cài đặt, Python sẽ báo lỗi `ModuleNotFoundError` hoặc `ImportError`.\n\n" +
                "**Cách xử lý:**\n\n" +
                "```python\n" +
                "try:\n" +
                "    import ten_module\n" +
                "except ModuleNotFoundError:\n" +
                "    print(\"Module chua duoc cai dat\")\n" +
                "```\n\n" +
                "**Cài đặt module với pip:**\n" +
                "```\n" +
                "pip install ten_module\n" +
                "```\n\n" +
                "**Ví dụ thực tế:**\n" +
                "```python\n" +
                "try:\n" +
                "    import requests\n" +
                "except ModuleNotFoundError:\n" +
                "    print(\"Cai dat requests:\")\n" +
                "    import subprocess\n" +
                "    subprocess.run([\"pip\", \"install\", \"requests\"])\n" +
                "```",
              examples: [
                {
                  title: 'Try except khi import',
                  code:
                    "try:\n" +
                    "    import missing_module\n" +
                    "    print(\"Import thanh cong\")\n" +
                    "except ModuleNotFoundError:\n" +
                    "    print(\"Loi: Module chua ton tai\")\n\n" +
                    "# Thu import module co san\n" +
                    "try:\n" +
                    "    import math\n" +
                    "    print(\"Math import thanh cong, sqrt(4) =\", math.sqrt(4))\n" +
                    "except ModuleNotFoundError:\n" +
                    "    print(\"Loi: Module chua ton tai\")",
                  explanation: 'Dùng try...except để xử lý lỗi import',
                  output: 'Loi: Module chua ton tai\nMath import thanh cong, sqrt(4) = 2.0'
                }
              ],
              quiz: [
                { id: 'q7-1-3-1', question: 'Lỗi nào xảy ra khi import module không tồn tại?', options: ['SyntaxError', 'ModuleNotFoundError', 'NameError'], correct_index: 1, explanation: 'ModuleNotFoundError xảy ra khi Python không tìm thấy module.' },
                { id: 'q7-1-3-2', question: 'Cách xử lý import lỗi tốt nhất?', options: ['Bỏ qua lỗi', 'Dùng try...except', 'Xóa dòng import'], correct_index: 1, explanation: 'Dùng try...except để xử lýgracefully khi module không tồn tại.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-1-4',
            module_id: 'mod-7-1',
            title: 'Các module phổ biến',
            slug: 'cac-module-pho-bien',
            description: 'Giới thiệu các module Python phổ biến',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Biết các module phổ biến trong Python',
                'Sử dụng được os, sys, datetime, random',
                'Hiểu cách tìm kiếm module mới'
              ],
              theory:
                "## Các Module Phổ biến trong Python\n\n" +
                "Python đi kèm với nhiều module tiện ích được gọi là \"Standard Library\".\n\n" +
                "**Các module phổ biến:**\n\n" +
                "| Module | Mô tả | Ví dụ |\n" +
                "|--------|-------|-------|\n" +
                "| os | Thao tác hệ thống file | os.listdir() |\n" +
                "| sys | Thông tin Python | sys.version |\n" +
                "| datetime | Xử lý ngày tháng | datetime.now() |\n" +
                "| random | Tạo số ngẫu nhiên | random.randint() |\n" +
                "| json | Xử lý JSON | json.dumps() |\n" +
                "| re | Biểu thức chính quy | re.search() |\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "import os\n" +
                "print(os.getcwd())  # Thư mục hiện tại\n" +
                "\n" +
                "import random\n" +
                "print(random.randint(1, 100))  # Số ngẫu nhiên 1-100\n" +
                "```",
              examples: [
                {
                  title: 'Module os',
                  code:
                    "import os\n\n" +
                    "print(\"Thu muc hien tai:\", os.getcwd())\n" +
                    "print(\"Danh sach file:\", os.listdir('.'))\n" +
                    "print(\"He dieu hanh:\", os.name)",
                  explanation: 'Module os giúp tương tác với hệ thống',
                  output: 'Thu muc hien tai: /home/user\nDanh sach file: [\'app.py\', \'test.py\']\nHe dieu hanh: posix'
                },
                {
                  title: 'Module random va datetime',
                  code:
                    "import random\n" +
                    "import datetime\n\n" +
                    "# Random\n" +
                    "print(\"So ngau nhien:\", random.randint(1, 10))\n" +
                    "print(\"Chon ngau nhien:\", random.choice(['A', 'B', 'C']))\n\n" +
                    "# Datetime\n" +
                    "now = datetime.datetime.now()\n" +
                    "print(\"Bay gio:\", now)\n" +
                    "print(\"Ngay:\", now.day, \"Thang:\", now.month, \"Nam:\", now.year)",
                  explanation: 'random và datetime là hai module rất hay dùng',
                  output: 'So ngau nhien: 7\nChon ngau nhien: B\nBay gio: 2024-01-15 10:30:45\nNgay: 15 Thang: 1 Nam: 2024'
                }
              ],
              quiz: [
                { id: 'q7-1-4-1', question: 'Module nào dùng để lấy thư mục hiện tại?', options: ['sys', 'os', 'datetime', 'random'], correct_index: 1, explanation: 'Module os cung cấp các hàm thao tác với hệ thống file.' },
                { id: 'q7-1-4-2', question: 'random.randint(1, 10) trả về giá trị nào?', options: ['Số thực 1-10', 'Số nguyên 1-10', 'Chuỗi ngẫu nhiên'], correct_index: 1, explanation: 'randint(a, b) trả về số nguyên trong khoảng a đến b.' },
                { id: 'q7-1-4-3', question: 'Module nào để làm việc với ngày tháng?', options: ['os', 'sys', 'datetime', 'json'], correct_index: 2, explanation: 'datetime cung cấp các class để làm việc với ngày tháng.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-7-2',
        course_id: 'level-7',
        title: 'Tạo Module riêng',
        slug: 'tao-module-rieng',
        description: 'Cách tạo và sử dụng module của riêng mình',
        icon: '🛠️',
        color: '#8B5CF6',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-7-2-1',
            module_id: 'mod-7-2',
            title: 'Tạo file module',
            slug: 'tao-file-module',
            description: 'Tạo module Python của riêng bạn',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách tạo module',
                'Biết cách đặt tên file module',
                'Import module do mình tạo'
              ],
              theory:
                "## Tạo File Module\n\n" +
                "**Module** đơn giản là một file `.py` chứa code Python có thể tái sử dụng.\n\n" +
                "**Cách tạo:**\n\n" +
                "1. Tạo file mới, ví dụ: `my_module.py`\n" +
                "2. Viết các hàm, biến cần tái sử dụng\n" +
                "3. Import và sử dụng trong file khác\n\n" +
                "**Ví dụ my_module.py:**\n" +
                "```python\n" +
                "# my_module.py\n" +
                "def chao(name):\n" +
                "    return f\"Xin chao, {name}!\"\n" +
                "\n" +
                "def tinh_tong(a, b):\n" +
                "    return a + b\n" +
                "```\n\n" +
                "**Sử dụng module:**\n" +
                "```python\n" +
                "import my_module\n" +
                "print(my_module.chao(\"An\"))\n" +
                "```",
              examples: [
                {
                  title: 'Tạo và import module',
                  code:
                    "# File: my_utils.py\n" +
                    "def chao(name):\n" +
                    "    return f\"Xin chao {name}!\"\n\n" +
                    "def tinh_tong(a, b):\n" +
                    "    return a + b\n\n" +
                    "# File main.py\n" +
                    "import my_utils\n" +
                    "print(my_utils.chao(\"Minh\"))\n" +
                    "print(\"Tong:\", my_utils.tinh_tong(3, 5))",
                  explanation: 'Tạo module riêng và import vào chương trình',
                  output: 'Xin chao Minh!\nTong: 8'
                }
              ],
              quiz: [
                { id: 'q7-2-1-1', question: 'Module Python là gì?', options: ['Một folder', 'Một file .py', 'Một class'], correct_index: 1, explanation: 'Module là một file .py chứa code Python.' },
                { id: 'q7-2-1-2', question: 'Tên file module hợp lệ?', options: ['my-module.py', 'my_module.py', '1module.py'], correct_index: 1, explanation: 'Tên file Python không nên chứa dấu gạch ngang.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-2-2',
            module_id: 'mod-7-2',
            title: '__name__ và __main__',
            slug: 'name-va-main',
            description: 'Hiểu cách Python xác định chế độ chạy',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu biến __name__',
                'Biết cách phân biệt import và chạy trực tiếp',
                'Tạo module có thể vừa import vừa chạy độc lập'
              ],
              theory:
                "## __name__ và __main__\n\n" +
                "Khi chạy một file Python, Python tự động gán giá trị cho biến `__name__`.\n\n" +
                "**Quy tắc:**\n\n" +
                "- Khi file được **chạy trực tiếp**: `__name__` = `\"__main__\"`\n" +
                "- Khi file được **import**: `__name__` = tên file (ví dụ `\"my_module\"`)\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "# my_module.py\n" +
                "def chao():\n" +
                "    print(\"Xin chao!\")\n" +
                "\n" +
                "if __name__ == \"__main__\":\n" +
                "    chao()  # Chạy khi file được thực thi trực tiếp\n" +
                "```\n\n" +
                "**Chạy trực tiếp:**\n" +
                "```\n" +
                "python my_module.py  # __name__ == \"__main__\"\n" +
                "```\n\n" +
                "**Import:**\n" +
                "```python\n" +
                "import my_module  # __name__ == \"my_module\"\n" +
                "```",
              examples: [
                {
                  title: '__name__ khi chạy trực tiếp',
                  code:
                    "# file test_name.py\n" +
                    "print(\"__name__ =\", __name__)\n\n" +
                    "if __name__ == \"__main__\":\n" +
                    "    print(\"Dang chay truc tiep!\")\n" +
                    "else:\n" +
                    "    print(\"Dang duoc import!\")",
                  explanation: '__name__ giúp xác định chế độ chạy của file',
                  output: '__name__ = __main__\nDang chay truc tiep!'
                },
                {
                  title: '__name__ khi import',
                  code:
                    "# file: greetings.py\n" +
                    "def chao():\n" +
                    "    return \"Xin chao!\"\n\n" +
                    "if __name__ == \"__main__\":\n" +
                    "    print(chao())\n\n" +
                    "# Khi import greetings, đoạn if không chạy\n" +
                    "import greetings\n" +
                    "print(\"Goi ham:\", greetings.chao())",
                  explanation: 'Khi import, đoạn code trong if __name__ == "__main__" không được chạy',
                  output: 'Goi ham: Xin chao!'
                }
              ],
              quiz: [
                { id: 'q7-2-2-1', question: '__name__ == "__main__" khi nào?', options: ['Khi import', 'Khi chạy trực tiếp', 'Khi có lỗi'], correct_index: 1, explanation: '__name__ bằng "__main__" khi file được chạy trực tiếp.' },
                { id: 'q7-2-2-2', question: 'Mục đích của if __name__ == "__main__"?', options: ['Để debug', 'Để code chạy khi import nhưng không chạy khi chạy trực tiếp', 'Để code chạy khi chạy trực tiếp nhưng không chạy khi import'], correct_index: 2, explanation: 'if __name__ == "__main__" giúp code chỉ chạy khi file được thực thi trực tiếp.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-2-3',
            module_id: 'mod-7-2',
            title: 'Tổ chức package',
            slug: 'to-chuc-package',
            description: 'Cách tổ chức code thành package',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm package',
                'Biết cách tạo package với __init__.py',
                'Tổ chức code theo cấu trúc package'
              ],
              theory:
                "## Tổ chức Package\n\n" +
                "**Package** là một thư mục chứa nhiều module, giúp tổ chức code theo cấu trúc.\n\n" +
                "**Cấu trúc package:**\n" +
                "```\n" +
                "my_package/\n" +
                "    __init__.py\n" +
                "    module1.py\n" +
                "    module2.py\n" +
                "```\n\n" +
                "**__init__.py:**\n" +
                "- File đặc biệt đánh dấu thư mục là package\n" +
                "- Có thể để trống hoặc chứa code khởi tạo\n\n" +
                "**Import package:**\n" +
                "```python\n" +
                "from my_package import module1\n" +
                "import my_package.module2\n" +
                "```",
              examples: [
                {
                  title: 'Tạo package đơn giản',
                  code:
                    "# Thu muc: my_app/\n" +
                    "#   __init__.py\n" +
                    "#   utils.py\n" +
                    "#   main.py\n\n" +
                    "# __init__.py\n" +
                    "VERSION = \"1.0.0\"\n\n" +
                    "# utils.py\n" +
                    "def clean_text(text):\n" +
                    "    return text.strip().lower()\n\n" +
                    "# main.py\n" +
                    "import my_app\n" +
                    "from my_app import utils\n" +
                    "print(\"Version:\", my_app.VERSION)\n" +
                    "print(\"Clean:\", utils.clean_text(\"  HEllo \"))",
                  explanation: 'Package giúp tổ chức và quản lý module',
                  output: 'Version: 1.0.0\nClean: hello'
                }
              ],
              quiz: [
                { id: 'q7-2-3-1', question: '__init__.py dùng để làm gì?', options: ['Lưu dữ liệu', 'Đánh dấu thư mục là package Python', 'Chạy tự động khi import'], correct_index: 1, explanation: '__init__.py đánh dấu thư mục là package Python.' },
                { id: 'q7-2-3-2', question: 'Package là gì?', options: ['File .py', 'Thư mục chứa module', 'Một class'], correct_index: 1, explanation: 'Package là thư mục chứa nhiều module và __init__.py.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-2-4',
            module_id: 'mod-7-2',
            title: 'Relative import',
            slug: 'relative-import',
            description: 'Cách import giữa các module trong package',
            difficulty: 'hard',
            estimated_minutes: 35,
            order_index: 4,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu relative import',
                'Biết cách dùng . và .. để import',
                'Tránh các lỗi import phổ biến'
              ],
              theory:
                "## Relative Import\n\n" +
                "**Relative import** dùng `.` và `..` để import module tương đối trong package.\n\n" +
                "**Ký hiệu:**\n" +
                "- `.` → thư mục hiện tại\n" +
                "- `..` → thư mục cha\n" +
                "- `...` → thư mục ông\n\n" +
                "**Ví dụ cấu trúc:**\n" +
                "```\n" +
                "my_package/\n" +
                "    __init__.py\n" +
                "    module_a.py\n" +
                "    subpackage/\n" +
                "        __init__.py\n" +
                "        module_b.py\n" +
                "```\n\n" +
                "**module_b.py import module_a.py:**\n" +
                "```python\n" +
                "from .. import module_a\n" +
                "# hoac\n" +
                "from ..module_a import some_function\n" +
                "```",
              examples: [
                {
                  title: 'Import giữa các module',
                  code:
                    "# package/__init__.py\n" +
                    "def helper():\n" +
                    "    return \"Helper function\"\n\n" +
                    "# package/utils.py\n" +
                    "def format_text(t):\n" +
                    "    return t.upper()\n\n" +
                    "# package/main.py\n" +
                    "from . import helper\n" +
                    "from .utils import format_text\n\n" +
                    "print(helper())\n" +
                    "print(format_text(\"hello\"))",
                  explanation: 'Dùng . để import từ cùng package',
                  output: 'Helper function\nHELLO'
                }
              ],
              quiz: [
                { id: 'q7-2-4-1', question: 'Trong package, . có nghĩa là gì?', options: ['Thư mục cha', 'Thư mục hiện tại', 'Import tất cả'], correct_index: 1, explanation: '. nghĩa là thư mục hiện tại trong package.' },
                { id: 'q7-2-4-2', question: 'from .. import module_a nghĩa là gì?', options: ['Import từ thư mục hiện tại', 'Import từ thư mục cha', 'Import từ thư mục con'], correct_index: 1, explanation: '.. nghĩa là thư mục cha của package hiện tại.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-7-3',
        course_id: 'level-7',
        title: 'PIP và Virtual Environment',
        slug: 'pip-va-virtual-environment',
        description: 'Quản lý package với pip và virtual environment',
        icon: '📦',
        color: '#10B981',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-7-3-1',
            module_id: 'mod-7-3',
            title: 'Giới thiệu PIP',
            slug: 'gioi-thieu-pip',
            description: 'Tìm hiểu về PIP - trình quản lý package',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu PIP là gì',
                'Biết cách cài đặt package với pip',
                'Sử dụng các lệnh pip cơ bản'
              ],
              theory:
                "## Giới thiệu PIP\n\n" +
                "**PIP (Pip Installs Packages)** là trình quản lý package của Python, cho phép cài đặt và quản lý các thư viện từ PyPI.\n\n" +
                "**Các lệnh cơ bản:**\n" +
                "```\n" +
                "pip install ten_package    # Cài đặt package\n" +
                "pip uninstall ten_package  # Gỡ cài đặt\n" +
                "pip list                   # Liệt kê packages\n" +
                "pip show ten_package       # Thông tin package\n" +
                "```\n\n" +
                "**Ví dụ:**\n" +
                "```\n" +
                "pip install requests\n" +
                "pip install numpy==1.24.0\n" +
                "```\n\n" +
                "**Kiểm tra phiên bản pip:**\n" +
                "```\n" +
                "pip --version\n" +
                "```",
              examples: [
                {
                  title: 'Cài đặt và sử dụng package',
                  code:
                    "# Cài đặt colorama (ví dụ)\n" +
                    "# pip install colorama\n\n" +
                    "try:\n" +
                    "    import colorama\n" +
                    "    print(\"Colorama da cai dat!\")\nexcept ImportError:\n" +
                    "    print(\"Chua cai colorama, chay: pip install colorama\")\n\n" +
                    "# Lenh pip thuong dung\n" +
                    "import subprocess\n" +
                    "result = subprocess.run(['pip', 'list'], capture_output=True, text=True)\n" +
                    "print(\"Cac packages da cai:\")\n" +
                    "print(result.stdout[:500])",
                  explanation: 'PIP giúp quản lý các package Python',
                  output: 'Chua cai colorama, chay: pip install colorama\nCac packages da cai:\npip-23.2.1\nsetuptools-68.0.0'
                }
              ],
              quiz: [
                { id: 'q7-3-1-1', question: 'PIP dùng để làm gì?', options: ['Chạy Python', 'Quản lý package', 'Tạo file'], correct_index: 1, explanation: 'PIP là trình quản lý package của Python.' },
                { id: 'q7-3-1-2', question: 'Lệnh nào để cài package?', options: ['pip uninstall', 'pip install', 'pip list'], correct_index: 1, explanation: 'pip install dùng để cài đặt package.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-3-2',
            module_id: 'mod-7-3',
            title: 'requirements.txt',
            slug: 'requirements-txt',
            description: 'Quản lý dependencies với requirements.txt',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu file requirements.txt',
                'Biết cách tạo và sử dụng requirements',
                'Cài đặt nhiều package cùng lúc'
              ],
              theory:
                "## requirements.txt\n\n" +
                "**requirements.txt** là file text chứa danh sách các package cần cài đặt cho project.\n\n" +
                "**Tạo requirements.txt:**\n" +
                "```\n" +
                "requests==2.28.0\n" +
                "flask==2.3.0\n" +
                "numpy>=1.24.0\n" +
                "```\n\n" +
                "**Cài đặt từ requirements.txt:**\n" +
                "```\n" +
                "pip install -r requirements.txt\n" +
                "```\n\n" +
                "**Tạo requirements từ môi trường hiện tại:**\n" +
                "```\n" +
                "pip freeze > requirements.txt\n" +
                "```",
              examples: [
                {
                  title: 'Sử dụng requirements.txt',
                  code:
                    "# Noi dung requirements.txt:\n" +
                    "# requests>=2.28.0\n" +
                    "# flask==2.3.0\n\n" +
                    "# Cài đặt tất cả package\n" +
                    "import subprocess\n" +
                    "result = subprocess.run(['pip', 'install', '-r', 'requirements.txt'], \n" +
                    "                        capture_output=True, text=True)\n" +
                    "print(\"Ket qua cai dat:\")\n" +
                    "print(result.stdout[:300] if result.stdout else result.stderr[:300])",
                  explanation: 'requirements.txt giúp quản lý dependencies dễ dàng',
                  output: 'Ket qua cai dat:\nRequirement already satisfied...'
                }
              ],
              quiz: [
                { id: 'q7-3-2-1', question: 'Lệnh nào để cài tất cả package từ requirements.txt?', options: ['pip install requirements.txt', 'pip install -r requirements.txt', 'pip requirements'], correct_index: 1, explanation: 'Dùng pip install -r requirements.txt để cài tất cả.' },
                { id: 'q7-3-2-2', question: 'pip freeze dùng để làm gì?', options: ['Gỡ cài đặt', 'Tạo requirements.txt', 'Cài package'], correct_index: 1, explanation: 'pip freeze tạo danh sách các package đã cài.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-7-3-3',
            module_id: 'mod-7-3',
            title: 'Virtual Environment',
            slug: 'virtual-environment',
            description: 'Tạo và quản lý môi trường ảo Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu virtual environment là gì',
                'Biết cách tạo và kích hoạt virtualenv',
                'Quản lý dependencies riêng cho từng project'
              ],
              theory:
                "## Virtual Environment\n\n" +
                "**Virtual Environment (venv)** là môi trường Python cô lập, giúp mỗi project có các package riêng biệt không xung đột.\n\n" +
                "**Tạo virtualenv:**\n" +
                "```\n" +
                "python -m venv myenv\n" +
                "```\n\n" +
                "**Kích hoạt (Windows):**\n" +
                "```\n" +
                "myenv\\Scripts\\activate\n" +
                "```\n\n" +
                "**Kích hoạt (Mac/Linux):**\n" +
                "```\n" +
                "source myenv/bin/activate\n" +
                "```\n\n" +
                "**Thoát virtualenv:**\n" +
                "```\n" +
                "deactivate\n" +
                "```",
              examples: [
                {
                  title: 'Tạo và kích hoạt virtualenv',
                  code:
                    "# Tao virtual environment\n" +
                    "import os\n" +
                    "import subprocess\n\n" +
                    "# Kiem tra neu chua co virtualenv\n" +
                    "env_name = \"myproject_env\"\n" +
                    "if not os.path.exists(env_name):\n" +
                    "    result = subprocess.run(['python', '-m', 'venv', env_name])\n" +
                    "    print(\"Da tao:\", env_name)\n" +
                    "else:\n" +
                    "    print(\"Da ton tai:\", env_name)\n\n" +
                    "# Liệt kê các package trong môi trường\n" +
                    "pip_path = os.path.join(env_name, 'Scripts', 'pip') if os.name == 'nt' else os.path.join(env_name, 'bin', 'pip')\n" +
                    "result = subprocess.run([pip_path, 'list'], capture_output=True, text=True)\n" +
                    "print(\"Packages trong moi truong:\", result.stdout[:200] if result.stdout else result.stderr)",
                  explanation: 'Virtualenv giúp cô lập dependencies cho từng project',
                  output: 'Da tao: myproject_env\nPackages trong moi truong: pip-23.2.1\nsetuptools-68.0.0'
                }
              ],
              quiz: [
                { id: 'q7-3-3-1', question: 'Virtual environment dùng để làm gì?', options: ['Tăng tốc máy', 'Cô lập dependencies cho từng project', 'Mã hóa code'], correct_index: 1, explanation: 'Virtualenv tạo môi trường riêng biệt, tránh xung đột package.' },
                { id: 'q7-3-3-2', question: 'Lệnh nào tạo virtualenv?', options: ['python -m venv tenenv', 'create venv tenenv', 'new env tenenv'], correct_index: 0, explanation: 'Dùng python -m venv ten_env để tạo virtual environment.' },
                { id: 'q7-3-3-3', question: 'Trên Windows, file activate nằm ở đâu?', options: ['bin/', 'Scripts/', 'Lib/'], correct_index: 1, explanation: 'Trên Windows, activate nằm trong thư mục Scripts.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-8',
    title: 'Kiểm thử và Debug',
    slug: 'kiem-thu-va-debug',
    description: 'Viết unit test, pytest và kỹ thuật debugging',
    icon: '🐛',
    color: '#EC4899',
    order_index: 8,
    is_published: true,
    modules: [
      {
        id: 'mod-8-1',
        course_id: 'level-8',
        title: 'Giới thiệu Testing',
        slug: 'gioi-thieu-testing',
        description: 'Tìm hiểu về kiểm thử phần mềm',
        icon: '✅',
        color: '#EC4899',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-8-1-1',
            module_id: 'mod-8-1',
            title: 'Unit Test là gì?',
            slug: 'unit-test-la-gi',
            description: 'Khái niệm về unit test và tầm quan trọng',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm unit test',
                'Biết tại sao cần viết test',
                'Hiểu các loại test phổ biến'
              ],
              theory:
                "## Unit Test là gì?\n\n" +
                "**Unit Test** là kiểm thử ở mức đơn vị (unit) - thường là một hàm hoặc phương thức.\n\n" +
                "**Tại sao cần Unit Test?**\n\n" +
                "1. Phát hiện lỗi sớm\n" +
                "2. Đảm bảo code hoạt động đúng\n" +
                "3. Giúp refactor mà không sợ phá vỡ\n" +
                "4. Tài liệu cho code\n\n" +
                "**Đặc điểm của unit test tốt:**\n" +
                "- **F**ast: Nhanh\n" +
                "- **I**ndependent: Độc lập\n" +
                "- **R**epeatable: Có thể lặp lại\n" +
                "- **S**elf-checking: Tự kiểm tra kết quả",
              examples: [
                {
                  title: 'Test đơn giản',
                  code:
                    "def cong(a, b):\n" +
                    "    return a + b\n\n" +
                    "# Test\n" +
                    "result = cong(3, 5)\n" +
                    "if result == 8:\n" +
                    "    print(\"Test passed\")\n" +
                    "else:\n" +
                    "    print(\"Test failed\")",
                  explanation: 'Test hàm cộng với các giá trị đã biết',
                  output: 'Test passed'
                }
              ],
              quiz: [
                { id: 'q8-1-1-1', question: 'Unit test kiểm thử ở mức nào?', options: ['Toàn bộ hệ thống', 'Đơn vị nhỏ nhất (hàm)', 'Giao diện người dùng'], correct_index: 1, explanation: 'Unit test kiểm thử ở mức đơn vị nhỏ nhất như hàm hoặc phương thức.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-9',
    title: 'API và Web Services',
    slug: 'api-va-web-services',
    description: 'Tìm hiểu về API REST, JSON và requests',
    icon: '🌐',
    color: '#14B8A6',
    order_index: 9,
    is_published: true,
    modules: [
      {
        id: 'mod-9-1',
        course_id: 'level-9',
        title: 'API cơ bản',
        slug: 'api-co-ban',
        description: 'Khái niệm API và cách gọi API',
        icon: '🔌',
        color: '#14B8A6',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-9-1-1',
            module_id: 'mod-9-1',
            title: 'API là gì?',
            slug: 'api-la-gi',
            description: 'Tìm hiểu khái niệm API trong lập trình',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm API',
                'Biết các loại API phổ biến',
                'Hiểu cách API hoạt động'
              ],
              theory:
                "## API là gì?\n\n\n" +
                "**API (Application Programming Interface)** là giao diện cho phép các ứng dụng giao tiếp với nhau.\n\n" +
                "**Ví dụ đời thực:**\n" +
                "- Khi bạn đặt đồ ăn qua app, app gọi API của nhà hàng để tạo đơn\n" +
                "- Khi bạn xem thời tiết, app gọi API của dịch vụ thời tiết\n\n" +
                "**REST API:**\n" +
                "- Dùng HTTP để giao tiếp\n" +
                "- Dữ liệu thường ở dạng JSON\n" +
                "- Các phương thức: GET, POST, PUT, DELETE\n\n" +
                "**Ví dụ API endpoint:**\n" +
                "```\n" +
                "GET https://api.example.com/users\n" +
                "```",
              examples: [
                {
                  title: 'Gọi API với requests',
                  code:
                    "import requests\n\n" +
                    "# Gọi API đơn giản\n" +
                    "response = requests.get(\"https://api.github.com\")\n" +
                    "print(\"Status:\", response.status_code)\n" +
                    "print(\"Data:\", response.json())",
                  explanation: 'Dùng thư viện requests để gọi API',
                  output: 'Status: 200\nData: {...}'
                }
              ],
              quiz: [
                { id: 'q9-1-1-1', question: 'API là viết tắt của gì?', options: ['Application Program Interface', 'Automated Program Interface', 'Application Programming Interface'], correct_index: 2, explanation: 'API = Application Programming Interface.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-1-2',
            module_id: 'mod-9-1',
            title: 'BeautifulSoup',
            slug: 'beautifulsoup',
            description: 'Sử dụng BeautifulSoup để parse HTML',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách BeautifulSoup parse HTML',
                'Biết cách tìm và trích xuất dữ liệu từ HTML',
                'Áp dụng vào thực tế'
              ],
              theory:
                "## BeautifulSoup là gì?\n\n" +
                "**BeautifulSoup** là thư viện Python dùng để parse HTML và trích xuất dữ liệu từ web.\n\n" +
                "**Cài đặt:**\n" +
                "```bash\n" +
                "pip install beautifulsoup4 requests\n" +
                "```\n\n" +
                "**Các phương thức chính:**\n" +
                "- `find()` - Tìm phần tử đầu tiên\n" +
                "- `find_all()` - Tìm tất cả phần tử\n" +
                "- `select()` - Dùng CSS selector\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "from bs4 import BeautifulSoup\n" +
                "html = \"<html><body><h1>Title</h1></body></html>\"\n" +
                "soup = BeautifulSoup(html, 'html.parser')\n" +
                "print(soup.find('h1').text)\n" +
                "```",
              examples: [
                {
                  title: 'Parse HTML đơn giản',
                  code:
                    "from bs4 import BeautifulSoup\n\n" +
                    "html = \"\"\"\n" +
                    "<html>\n" +
                    "  <body>\n" +
                    "    <h1>Python Course</h1>\n" +
                    "    <p class='desc'>Học Python từ cơ bản</p>\n" +
                    "    <a href='https://python.org'>Link</a>\n" +
                    "  </body>\n" +
                    "</html>\n" +
                    "\"\"\"\n\n" +
                    "soup = BeautifulSoup(html, 'html.parser')\n" +
                    "print(\"Title:\", soup.find('h1').text)\n" +
                    "print(\"Link:\", soup.find('a')['href'])",
                  explanation: 'BeautifulSoup giúp trích xuất dữ liệu từ HTML dễ dàng',
                  output: 'Title: Python Course\nLink: https://python.org'
                }
              ],
              quiz: [
                { id: 'q9-1-2-1', question: 'BeautifulSoup dùng để làm gì?', options: ['Gửi request HTTP', 'Parse HTML', 'Tạo database', 'Viết test'], correct_index: 1, explanation: 'BeautifulSoup dùng để parse và trích xuất dữ liệu từ HTML.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-1-3',
            module_id: 'mod-9-1',
            title: 'Thực hành Web Scraping',
            slug: 'thuc-hanh-web-scraping',
            description: 'Thực hành web scraping với các ví dụ thực tế',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 110,
            is_published: true,
            content: {
              objectives: [
                'Nắm được quy trình web scraping',
                'Biết cách trích xuất dữ liệu từ trang web thực tế',
                'Hiểu cách duyệt qua nhiều trang'
              ],
              theory:
                "## Quy trình Web Scraping\n\n" +
                "**Các bước thực hiện:**\n\n" +
                "1. **Gửi request** - Dùng requests để lấy HTML\n" +
                "2. **Parse HTML** - Dùng BeautifulSoup để phân tích\n" +
                "3. **Trích xuất** - Lấy dữ liệu cần thiết\n" +
                "4. **Lưu trữ** - Lưu vào file hoặc database\n\n" +
                "**Lưu ý quan trọng:**\n" +
                "- Kiểm tra file robots.txt của website\n" +
                "- Không scrape quá nhiều request/giây\n" +
                "- Tuân thủ điều khoản sử dụng\n\n" +
                "**Ví dụ thực tế:**\n" +
                "```python\n" +
                "import requests\n" +
                "from bs4 import BeautifulSoup\n\n" +
                "url = \"https://example.com/books\"\n" +
                "response = requests.get(url)\n" +
                "soup = BeautifulSoup(response.text, 'html.parser')\n" +
                "books = soup.find_all('div', class_='book-item')\n" +
                "```",
              examples: [
                {
                  title: 'Scraping danh sách sách',
                  code:
                    "from bs4 import BeautifulSoup\n\n" +
                    "html = \"\"\"\n" +
                    "<div class='books'>\n" +
                    "  <div class='book-item'>\n" +
                    "    <h3>Python Programming</h3>\n" +
                    "    <span class='price'>200.000đ</span>\n" +
                    "  </div>\n" +
                    "  <div class='book-item'>\n" +
                    "    <h3>Data Science</h3>\n" +
                    "    <span class='price'>350.000đ</span>\n" +
                    "  </div>\n" +
                    "</div>\n" +
                    "\"\"\"\n\n" +
                    "soup = BeautifulSoup(html, 'html.parser')\n" +
                    "books = soup.find_all('div', class_='book-item')\n\n" +
                    "for book in books:\n" +
                    "    title = book.find('h3').text\n" +
                    "    price = book.find('span', class_='price').text\n" +
                    "    print(f\"{title} - {price}\")",
                  explanation: 'Tìm tất cả các phần tử book-item và trích xuất thông tin',
                  output: 'Python Programming - 200.000đ\nData Science - 350.000đ'
                }
              ],
              quiz: [
                { id: 'q9-1-3-1', question: 'Bước đầu tiên trong web scraping là gì?', options: ['Parse HTML', 'Gửi request HTTP', 'Lưu dữ liệu', 'Duyệt trang'], correct_index: 1, explanation: 'Bước đầu tiên là gửi request HTTP để lấy HTML.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-1-4',
            module_id: 'mod-9-1',
            title: 'Requests và API',
            slug: 'requests-va-api',
            description: 'Sử dụng thư viện requests để gọi API',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Nắm cách sử dụng thư viện requests',
                'Biết các phương thức HTTP',
                'Xử lý response JSON'
              ],
              theory:
                "## Thư viện Requests\n\n" +
                "**Requests** là thư viện HTTP phổ biến nhất trong Python.\n\n\n" +
                "**Cài đặt:**\n" +
                "```bash\n" +
                "pip install requests\n" +
                "```\n\n" +
                "**Các phương thức HTTP:**\n" +
                "- `requests.get()` - Lấy dữ liệu\n" +
                "- `requests.post()` - Gửi dữ liệu mới\n" +
                "- `requests.put()` - Cập nhật dữ liệu\n" +
                "- `requests.delete()` - Xóa dữ liệu\n\n" +
                "**Xử lý Response:**\n" +
                "- `response.status_code` - Mã trạng thái\n" +
                "- `response.json()` - Parse JSON\n" +
                "- `response.text` - Lấy text\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "response = requests.get(\"https://api.example.com/users\")\n" +
                "data = response.json()\n" +
                "```",
              examples: [
                {
                  title: 'Gọi API và xử lý JSON',
                  code:
                    "import requests\n\n" +
                    "# Gọi API đơn giản\n" +
                    "response = requests.get(\"https://jsonplaceholder.typicode.com/users/1\")\n" +
                    "print(\"Status:\", response.status_code)\n" +
                    "\n" +
                    "# Parse JSON\n" +
                    "user = response.json()\n" +
                    "print(\"Name:\", user['name'])\n" +
                    "print(\"Email:\", user['email'])",
                  explanation: 'requests.get() gửi HTTP GET, response.json() parse dữ liệu JSON',
                  output: 'Status: 200\nName: Leanne Graham\nEmail: Sincere@april.biz'
                }
              ],
              quiz: [
                { id: 'q9-1-4-1', question: 'Phương thức nào để gửi dữ liệu lên server?', options: ['requests.get()', 'requests.post()', 'requests.delete()', 'requests.head()'], correct_index: 1, explanation: 'requests.post() dùng để gửi dữ liệu mới lên server.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-9-2',
        course_id: 'level-9',
        title: 'Automation',
        slug: 'automation',
        description: 'Tự động hóa công việc với Python',
        icon: '🤖',
        color: '#8B5CF6',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-9-2-1',
            module_id: 'mod-9-2',
            title: 'Giới thiệu Automation',
            slug: 'gioi-thieu-automation',
            description: 'Tổng quan về automation và các ứng dụng',
            difficulty: 'easy',
            estimated_minutes: 20,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm automation',
                'Biết các lĩnh vực có thể automation',
                'Nhận thức được lợi ích của automation'
              ],
              theory:
                "## Giới thiệu Automation\n\n" +
                "**Automation (Tự động hóa)** là việc lập trình để thực hiện các công việc lặp đi lặp lại một cách tự động, giúp tiết kiệm thời gian và giảm lỗi.\n\n" +
                "**Ứng dụng của Automation:**\n\n" +
                "- **File Management**: Tự động tạo, đổi tên, di chuyển file\n" +
                "- **Excel Operations**: Đọc/ghi file Excel, tạo báo cáo\n" +
                "- **Email Automation**: Gửi email tự động, đọc hộp thư\n" +
                "- **Web Scraping**: Thu thập dữ liệu từ internet\n" +
                "- **Testing**: Tự động chạy test\n\n" +
                "**Lợi ích:**\n" +
                "- Tiết kiệm thời gian\n" +
                "- Giảm lỗi do con người\n" +
                "- Thực hiện 24/7\n" +
                "- Nhất quán và chính xác",
              examples: [
                {
                  title: 'Ví dụ đơn giản về automation',
                  code:
                    "# Ví dụ: Đếm số file trong thư mục\n" +
                    "import os\n\n" +
                    "# Đường dẫn thư mục\n" +
                    "folder_path = \".\"\n" +
                    "\n" +
                    "# Đếm số file\n" +
                    "files = [f for f in os.listdir(folder_path) if os.path.isfile(f)]\n" +
                    "print(f\"Số file trong thư mục: {len(files)}\")",
                  explanation: 'Automation có thể đơn giản như đếm file trong thư mục',
                  output: 'Số file trong thư mục: 5'
                }
              ],
              quiz: [
                { id: 'q9-2-1-1', question: 'Automation mang lại lợi ích gì?', options: ['Chạy nhanh hơn', 'Tiết kiệm thời gian, giảm lỗi', 'Code ngắn hơn', 'Không cần test'], correct_index: 1, explanation: 'Automation giúp tiết kiệm thời gian và giảm lỗi do con người.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-2-2',
            module_id: 'mod-9-2',
            title: 'File automation',
            slug: 'automation-file',
            description: 'Tự động hóa thao tác với file và thư mục',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Biết cách đọc, ghi file với Python',
                'Tự động tạo, sao chép, di chuyển file',
                'Xử lý nhiều file cùng lúc'
              ],
              theory:
                "## File Automation\n\n" +
                "Python cung cấp nhiều cách để làm việc với file:\n\n" +
                "**Đọc/Ghi file text:**\n" +
                "```python\n" +
                "# Đọc file\n" +
                "with open('file.txt', 'r', encoding='utf-8') as f:\n" +
                "    content = f.read()\n\n" +
                "# Ghi file\n" +
                "with open('output.txt', 'w', encoding='utf-8') as f:\n" +
                "    f.write('Hello')\n" +
                "```\n\n" +
                "**Thao tác với file và thư mục:**\n" +
                "- `os.rename()` - Đổi tên file\n" +
                "- `shutil.copy()` - Sao chép file\n" +
                "- `os.remove()` - Xóa file\n" +
                "- `os.makedirs()` - Tạo thư mục",
              examples: [
                {
                  title: 'Đọc và ghi file',
                  code:
                    "# Ghi dữ liệu vào file\n" +
                    "data = [\"Line 1\", \"Line 2\", \"Line 3\"]\n" +
                    "with open('sample.txt', 'w', encoding='utf-8') as f:\n" +
                    "    for line in data:\n" +
                    "        f.write(line + '\\n')\n\n\n" +
                    "# Đọc lại file\n" +
                    "with open('sample.txt', 'r', encoding='utf-8') as f:\n" +
                    "    content = f.read()\n" +
                    "    print(content)",
                  explanation: 'Dùng with open() để đọc/ghi file an toàn',
                  output: 'Line 1\nLine 2\nLine 3\n'
                }
              ],
              quiz: [
                { id: 'q9-2-2-1', question: 'Mode nào để ghi file?', options: ['r', 'w', 'x', 'a'], correct_index: 1, explanation: 'w là mode ghi file, sẽ tạo mới hoặc ghi đè.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-2-3',
            module_id: 'mod-9-2',
            title: 'Excel automation với openpyxl',
            slug: 'automation-excel',
            description: 'Đọc và ghi file Excel với openpyxl',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Biết cách cài đặt và sử dụng openpyxl',
                'Đọc dữ liệu từ file Excel',
                'Ghi dữ liệu và tạo biểu đồ'
              ],
              theory:
                "## Excel Automation với openpyxl\n\n" +
                "**openpyxl** là thư viện Python để làm việc với file Excel (.xlsx).\n\n" +
                "**Cài đặt:**\n" +
                "```bash\n" +
                "pip install openpyxl\n" +
                "```\n\n" +
                "**Đọc file Excel:**\n" +
                "```python\n" +
                "from openpyxl import load_workbook\n" +
                "wb = load_workbook('data.xlsx')\n" +
                "ws = wb.active\n" +
                "value = ws['A1'].value\n" +
                "```\n\n" +
                "**Ghi file Excel:**\n" +
                "```python\n" +
                "from openpyxl import Workbook\n" +
                "wb = Workbook()\n" +
                "ws = wb.active\n" +
                "ws['A1'] = 'Name'\n" +
                "ws['B1'] = 'Age'\n" +
                "wb.save('output.xlsx')\n" +
                "```",
              examples: [
                {
                  title: 'Tạo file Excel đơn giản',
                  code:
                    "from openpyxl import Workbook\n\n" +
                    "# Tạo workbook mới\n" +
                    "wb = Workbook()\n" +
                    "ws = wb.active\n" +
                    "ws.title = \"Students\"\n\n" +
                    "# Ghi dữ liệu\n" +
                    "ws['A1'] = 'Name'\n" +
                    "ws['B1'] = 'Score'\n" +
                    "ws['A2'] = 'An'\n" +
                    "ws['B2'] = 85\n" +
                    "ws['A3'] = 'Binh'\n" +
                    "ws['B3'] = 92\n\n" +
                    "# Lưu file\n" +
                    "wb.save('students.xlsx')\n" +
                    "print(\"Da tao file Excel!\")",
                  explanation: 'Tạo workbook mới, thêm dữ liệu và lưu thành file',
                  output: 'Da tao file Excel!'
                }
              ],
              quiz: [
                { id: 'q9-2-3-1', question: 'Lệnh nào để đọc file Excel?', options: ['open()', 'load_workbook()', 'read_excel()', 'import_excel()'], correct_index: 1, explanation: 'load_workbook() từ openpyxl dùng để mở file Excel.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-2-4',
            module_id: 'mod-9-2',
            title: 'Email automation',
            slug: 'automation-email',
            description: 'Gửi email tự động với Python',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 4,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách gửi email với Python',
                'Biết sử dụng thư viện smtplib',
                'Gửi email với file đính kèm'
              ],
              theory:
                "## Email Automation\n\n" +
                "Python có thể gửi email thông qua SMTP (Simple Mail Transfer Protocol).\n\n" +
                "**Các bước gửi email:**\n\n" +
                "1. Kết nối SMTP server\n" +
                "2. Đăng nhập với email và password\n" +
                "3. Tạo message\n" +
                "4. Gửi email\n\n" +
                "**Ví dụ:**\n" +
                "```python\n" +
                "import smtplib\n" +
                "from email.mime.text import MIMEText\n\n" +
                "msg = MIMEText('Nội dung email')\n" +
                "msg['Subject'] = 'Tiêu đề'\n" +
                "msg['From'] = 'sender@gmail.com'\n" +
                "msg['To'] = 'receiver@gmail.com'\n\n" +
                "with smtplib.SMTP('smtp.gmail.com', 587) as server:\n" +
                "    server.starttls()\n" +
                "    server.login('email', 'password')\n" +
                "    server.send_message(msg)\n" +
                "```",
              examples: [
                {
                  title: 'Cấu trúc email cơ bản',
                  code:
                    "from email.mime.text import MIMEText\n\n" +
                    "# Tạo email\n" +
                    "body = \"Xin chao, day la email tu Python!\"\n" +
                    "msg = MIMEText(body)\n" +
                    "msg['Subject'] = 'Test Email'\n" +
                    "msg['From'] = 'sender@example.com'\n" +
                    "msg['To'] = 'receiver@example.com'\n\n" +
                    "print(\"Email prepared:\")\n" +
                    "print(f\"To: {msg['To']}\")\n" +
                    "print(f\"Subject: {msg['Subject']}\")",
                  explanation: 'MIMEText tạo email body, các trường Subject/From/To thiết lập header',
                  output: 'Email prepared:\nTo: receiver@example.com\nSubject: Test Email'
                }
              ],
              quiz: [
                { id: 'q9-2-4-1', question: 'Thư viện nào dùng để gửi email trong Python?', options: ['smtplib', 'requests', 'beautifulsoup', 'json'], correct_index: 0, explanation: 'smtplib là thư viện chuẩn của Python để gửi email qua SMTP.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-9-3',
        course_id: 'level-9',
        title: 'Project thực hành',
        slug: 'project-thuc-hanh',
        description: 'Các dự án thực tế để áp dụng kiến thức',
        icon: '💻',
        color: '#F59E0B',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-9-3-1',
            module_id: 'mod-9-3',
            title: 'Project: Calculator CLI',
            slug: 'project-calculator',
            description: 'Xây dựng calculator trên command line',
            difficulty: 'medium',
            estimated_minutes: 40,
            order_index: 1,
            xp_reward: 120,
            is_published: true,
            content: {
              objectives: [
                'Xây dựng ứng dụng Calculator hoàn chỉnh',
                'Áp dụng kiến thức về functions và loops',
                'Tạo giao diện CLI'
              ],
              theory:
                "## Project Calculator CLI\n\n" +
                "**Yêu cầu chức năng:**\n" +
                "1. Phép cộng (+)\n" +
                "2. Phép trừ (-)\n" +
                "3. Phép nhân (*)\n" +
                "4. Phép chia (/)\n\n" +
                "**Cấu trúc chương trình:**\n" +
                "```python\n" +
                "def calculate(a, b, op):\n" +
                "    if op == '+': return a + b\n" +
                "    # ... các phép khác\n\n" +
                "def main():\n" +
                "    while True:\n" +
                "        # Nhập phép toán\n" +
                "        # Gọi calculate()\n" +
                "        # In kết quả\n" +
                "```",
              examples: [
                {
                  title: 'Calculator cơ bản',
                  code:
                    "def calculate(a, b, op):\n" +
                    "    if op == '+': return a + b\n" +
                    "    if op == '-': return a - b\n" +
                    "    if op == '*': return a * b\n" +
                    "    if op == '/': return a / b if b != 0 else 'Loi chia 0'\n" +
                    "    return 'Phep toan khong hop le'\n\n\n" +
                    "# Test\n" +
                    "print(calculate(10, 5, '+'))\n" +
                    "print(calculate(10, 5, '*'))\n" +
                    "print(calculate(10, 0, '/'))",
                  explanation: 'Hàm calculate xử lý các phép toán cơ bản',
                  output: '15\n50\nLoi chia 0'
                }
              ],
              quiz: [
                { id: 'q9-3-1-1', question: 'Làm thế nào để tránh lỗi chia cho 0?', options: ['Dùng try-except', 'Kiểm tra b != 0 trước', 'Cả hai cách trên', 'Không thể tránh'], correct_index: 2, explanation: 'Cả kiểm tra điều kiện và try-except đều giúp xử lý chia cho 0.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-3-2',
            module_id: 'mod-9-3',
            title: 'Project: Todo List CLI',
            slug: 'project-todo-list',
            description: 'Xây dựng ứng dụng Todo List trên command line',
            difficulty: 'medium',
            estimated_minutes: 45,
            order_index: 2,
            xp_reward: 130,
            is_published: true,
            content: {
              objectives: [
                'Xây dựng Todo List với các chức năng CRUD',
                'Lưu dữ liệu vào file',
                'Tạo menu tương tác'
              ],
              theory:
                "## Project Todo List CLI\n\n" +
                "**Yêu cầu chức năng:**\n" +
                "1. Thêm công việc mới\n" +
                "2. Xem danh sách công việc\n" +
                "3. Đánh dấu hoàn thành\n" +
                "4. Xóa công việc\n" +
                "5. Lưu vào file JSON\n\n" +
                "**Cấu trúc dữ liệu:**\n" +
                "```python\n" +
                "todos = [\n" +
                "    {\"id\": 1, \"title\": \"Học Python\", \"done\": False}\n" +
                "]\n" +
                "```\n\n" +
                "**Lưu file JSON:**\n" +
                "```python\n" +
                "import json\n" +
                "with open('todos.json', 'w') as f:\n" +
                "    json.dump(todos, f)\n" +
                "```",
              examples: [
                {
                  title: 'Todo List cơ bản',
                  code:
                    "import json\n\n" +
                    "class TodoList:\n" +
                    "    def __init__(self):\n" +
                    "        self.todos = []\n\n" +
                    "    def add(self, title):\n" +
                    "        todo = {\n" +
                    "            \"id\": len(self.todos) + 1,\n" +
                    "            \"title\": title,\n" +
                    "            \"done\": False\n" +
                    "        }\n" +
                    "        self.todos.append(todo)\n\n" +
                    "    def list(self):\n" +
                    "        for t in self.todos:\n" +
                    "            status = \"[x]\" if t[\"done\"] else \"[ ]\"\n" +
                    "            print(f\"{status} {t['title']}\")\n\n" +
                    "app = TodoList()\n" +
                    "app.add(\"Hoc Python\")\n" +
                    "app.add(\"Lam bai tap\")\n" +
                    "app.list()",
                  explanation: 'Class TodoList với các phương thức quản lý công việc',
                  output: '[ ] Hoc Python\n[ ] Lam bai tap'
                }
              ],
              quiz: [
                { id: 'q9-3-2-1', question: 'Định dạng nào để lưu dữ liệu Todo List?', options: ['CSV', 'JSON', 'TXT', 'HTML'], correct_index: 1, explanation: 'JSON là định dạng phổ biến để lưu dữ liệu có cấu trúc.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-9-3-3',
            module_id: 'mod-9-3',
            title: 'Project: Game nhỏ',
            slug: 'project-game',
            description: 'Xây dựng game đơn giản trên CLI',
            difficulty: 'medium',
            estimated_minutes: 45,
            order_index: 3,
            xp_reward: 125,
            is_published: true,
            content: {
              objectives: [
                'Xây dựng game đoán số',
                'Sử dụng random và vòng lặp',
                'Tạo trải nghiệm tương tác'
              ],
              theory:
                "## Project: Game đoán số\n\n" +
                "**Luật chơi:**\n" +
                "1. Computer chọn ngẫu nhiên một số từ 1-100\n" +
                "2. Người chơi đoán số\n" +
                "3. Computer feedback: \"Lớn hơn\" hoặc \"Nhỏ hơn\"\n" +
                "4. Người chơi thắng nếu đoán đúng trong <= 7 lần\n\n" +
                "**Sử dụng random:**\n" +
                "```python\n" +
                "import random\n" +
                "secret = random.randint(1, 100)\n" +
                "```",
              examples: [
                {
                  title: 'Game đoán số cơ bản',
                  code:
                    "import random\n\n" +
                    "secret = random.randint(1, 10)\n" +
                    "print(\"Doan so tu 1 den 10!\")\n\n" +
                    "for i in range(3):\n" +
                    "    guess = int(input(\"Lan \" + str(i+1) + \": \"))\n" +
                    "    if guess == secret:\n" +
                    "        print(\"Chinh xac!\")\n" +
                    "        break\n" +
                    "    elif guess < secret:\n" +
                    "        print(\"Lon hon!\")\n" +
                    "    else:\n" +
                    "        print(\"Nho hon!\")\n\n" +
                    "print(f\"So can tim la: {secret}\")",
                  explanation: 'Game đoán số với 3 lần đoán và feedback',
                  output: 'Doan so tu 1 den 10!\nLon hon!\nChinh xac!\nSo can tim la: 7'
                }
              ],
              quiz: [
                { id: 'q9-3-3-1', question: 'Hàm nào để tạo số ngẫu nhiên trong khoảng 1-100?', options: ['random.random()', 'random.randint(1, 100)', 'random.choice()', 'random.shuffle()'], correct_index: 1, explanation: 'random.randint(1, 100) tạo số ngẫu nhiên từ 1 đến 100.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'level-10',
    title: 'Dự án thực tế',
    slug: 'du-an-thuc-te',
    description: 'Áp dụng kiến thức để xây dựng dự án hoàn chỉnh',
    icon: '🚀',
    color: '#F97316',
    order_index: 10,
    is_published: true,
    modules: [
      {
        id: 'mod-10-1',
        course_id: 'level-10',
        title: 'Xây dựng Todo App',
        slug: 'xay-dung-todo-app',
        description: 'Tạo ứng dụng Todo hoàn chỉnh với Python',
        icon: '📝',
        color: '#F97316',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-10-1-1',
            module_id: 'mod-10-1',
            title: 'Thiết kế ứng dụng',
            slug: 'thiet-ke-ung-dung',
            description: 'Lên kế hoạch và thiết kế Todo App',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Phân tích yêu cầu dự án',
                'Thiết kế cấu trúc dữ liệu',
                'Lên kế hoạch các tính năng'
              ],
              theory:
                "## Thiết kế ứng dụng Todo\n\n" +
                "**Yêu cầu chức năng:**\n" +
                "1. Thêm công việc mới\n" +
                "2. Xem danh sách công việc\n" +
                "3. Đánh dấu hoàn thành\n" +
                "4. Xóa công việc\n\n" +
                "**Cấu trúc dữ liệu:**\n\n" +
                "```python\n" +
                "todos = [\n" +
                "    {\"id\": 1, \"title\": \"Học Python\", \"done\": False},\n" +
                "    {\"id\": 2, \"title\": \"Làm bài tập\", \"done\": True}\n" +
                "]\n" +
                "```\n\n" +
                "**Các bước thực hiện:**\n" +
                "1. Tạo menu chính\n" +
                "2. Viết hàm thêm/xem/xóa/sửa\n" +
                "3. Lưu dữ liệu (file JSON)\n" +
                "4. Kiểm thử",
              examples: [
                {
                  title: 'Cấu trúc Todo App',
                  code:
                    "class Todo:\n" +
                    "    def __init__(self):\n" +
                    "        self.todos = []\n\n" +
                    "    def them(self, title):\n" +
                    "        todo = {\n" +
                    "            \"id\": len(self.todos) + 1,\n" +
                    "            \"title\": title,\n" +
                    "            \"done\": False\n" +
                    "        }\n" +
                    "        self.todos.append(todo)\n\n" +
                    "    def hien_thi(self):\n" +
                    "        for todo in self.todos:\n" +
                    "            status = \"V\" if todo[\"done\"] else \"O\"\n" +
                    "            print(f\"{status} {todo[\"title\"]}\")\n\n" +
                    "app = Todo()\n" +
                    "app.them(\"Học Python\")\n" +
                    "app.them(\"Làm bài tập\")\n" +
                    "app.hien_thi()",
                  explanation: 'Class Todo với các phương thức cơ bản',
                  output: 'O Học Python\nO Làm bài tập'
                }
              ],
              quiz: [
                { id: 'q10-1-1-1', question: 'Bước đầu tiên khi xây dựng dự án là gì?', options: ['Viết code ngay', 'Thiết kế và lên kế hoạch', 'Deploy lên server'], correct_index: 1, explanation: 'Thiết kế và lên kế hoạch giúp hiểu rõ yêu cầu trước khi viết code.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-10-1-2',
            module_id: 'mod-10-1',
            title: 'Lập kế hoạch dự án',
            slug: 'lap-ke-hoach',
            description: 'Cách lập kế hoạch và theo dõi tiến độ dự án',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Biết cách lập kế hoạch dự án',
                'Chia nhỏ công việc hiệu quả',
                'Theo dõi tiến độ dự án'
              ],
              theory:
                "## Lập kế hoạch dự án\n\n" +
                "**Các bước lập kế hoạch:**\n\n" +
                "1. **Xác định mục tiêu**: Dự án cần đạt được gì?\n" +
                "2. **Chia nhỏ công việc**: breaking down thành các task nhỏ\n" +
                "3. **Ước lượng thời gian**: Mỗi task cần bao lâu?\n" +
                "4. **Xác định dependencies**: Task nào cần task khác xong trước?\n\n" +
                "**Công cụ hỗ trợ:**\n" +
                "- Kanban board (Trello, Notion)\n" +
                "- Gantt chart\n" +
                "- GitHub Projects\n\n" +
                "**Ví dụ kế hoạch:**\n" +
                "```\n" +
                "Week 1: Thiết kế + Setup môi trường\n" +
                "Week 2: Core features\n" +
                "Week 3: Testing + Bug fixes\n" +
                "Week 4: Hoàn thiện + Documentation\n" +
                "```",
              examples: [
                {
                  title: 'Tạo kế hoạch đơn giản',
                  code:
                    "plan = {\n" +
                    "    \"Week 1\": [\"Thiet ke\", \"Setup moi truong\"],\n" +
                    "    \"Week 2\": [\"Core features\", \"API\"],\n" +
                    "    \"Week 3\": [\"Testing\", \"Bug fixes\"],\n" +
                    "    \"Week 4\": [\"Hoan thien\", \"Documentation\"]\n" +
                    "}\n\n" +
                    "print(\"Ke hoach du an:\")\n" +
                    "for week, tasks in plan.items():\n" +
                    "    print(f\"\\n{week}:\")\n" +
                    "    for task in tasks:\n" +
                    "        print(f\"  - {task}\")",
                  explanation: 'Dictionary lưu kế hoạch theo tuần với các công việc cần làm',
                  output: 'Ke hoach du an:\n\nWeek 1:\n  - Thiet ke\n  - Setup moi truong\n\nWeek 2:\n  - Core features\n  - API\n\nWeek 3:\n  - Testing\n  - Bug fixes\n\nWeek 4:\n  - Hoan thien\n  - Documentation'
                }
              ],
              quiz: [
                { id: 'q10-1-2-1', question: 'Tại sao cần chia nhỏ công việc?', options: ['Để code nhiều hơn', 'Dễ quản lý và theo dõi', 'Để phức tạp hóa', 'Để delay'], correct_index: 1, explanation: 'Chia nhỏ giúp dễ quản lý, theo dõi và ước lượng thời gian.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-10-1-3',
            module_id: 'mod-10-1',
            title: 'Thiết kế hệ thống',
            slug: 'thiet-ke-he-thong',
            description: 'Thiết kế kiến trúc và cấu trúc tổng thể của dự án',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 3,
            xp_reward: 95,
            is_published: true,
            content: {
              objectives: [
                'Hiểu cách thiết kế kiến trúc hệ thống',
                'Biết cách tổ chức cấu trúc thư mục',
                'Áp dụng nguyên tắc thiết kế'
              ],
              theory:
                "## Thiết kế hệ thống\n\n" +
                "**Nguyên tắc thiết kế:**\n\n" +
                "1. **Single Responsibility**: Mỗi module/chức năng chỉ làm một việc\n" +
                "2. **Modular**: Chia thành các module độc lập\n" +
                "3. **Documentation**: Comment và document rõ ràng\n\n" +
                "**Cấu trúc thư mục đề xuất:**\n" +
                "```\n" +
                "project/\n" +
                "├── main.py          # Entry point\n" +
                "├── models/         # Cấu trúc dữ liệu\n" +
                "├── utils/          # Các hàm tiện ích\n" +
                "├── data/           # Lưu dữ liệu\n" +
                "└── tests/          # Unit tests\n" +
                "```\n\n" +
                "**Data Flow:**\n" +
                "```\n" +
                "UI/CLI → Controller → Service → Repository → File/DB\n" +
                "```",
              examples: [
                {
                  title: 'Cấu trúc project đơn giản',
                  code:
                    "# Ví dụ: Tạo cấu trúc folder\n" +
                    "import os\n\n" +
                    "structure = [\n" +
                    "    \"project\",\n" +
                    "    \"project/models\",\n" +
                    "    \"project/utils\",\n" +
                    "    \"project/data\"\n" +
                    "]\n" +
                    "for path in structure:\n" +
                    "    os.makedirs(path, exist_ok=True)\n" +
                    "    print(f\"Created: {path}\")",
                  explanation: 'Tạo cấu trúc thư mục cho dự án bằng Python',
                  output: 'Created: project\nCreated: project/models\nCreated: project/utils\nCreated: project/data'
                }
              ],
              quiz: [
                { id: 'q10-1-3-1', question: 'Nguyên tắc Single Responsibility nghĩa là gì?', options: ['Mỗi người làm một việc', 'Mỗi module chỉ làm một việc cụ thể', 'Code phải đơn giản', 'Không được sao chép code'], correct_index: 1, explanation: 'Single Responsibility: mỗi module/hàm chỉ nên chịu trách nhiệm một việc duy nhất.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-10-1-4',
            module_id: 'mod-10-1',
            title: 'Cấu trúc dự án',
            slug: 'cau-truc-du-an',
            description: 'Tổ chức và sắp xếp cấu trúc file dự án Python',
            difficulty: 'medium',
            estimated_minutes: 25,
            order_index: 4,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Biết cách tổ chức cấu trúc file dự án',
                'Hiểu vai trò của các thành phần trong dự án',
                'Áp dụng cấu trúc chuẩn cho Python project'
              ],
              theory:
                "## Cấu trúc dự án\n\n" +
                "**Cấu trúc thư mục chuẩn:**\n\n" +
                "```\n" +
                "project_name/\n" +
                "├── main.py              # Điểm bắt đầu chương trình\n" +
                "├── config.py           # Cấu hình\n" +
                "├── requirements.txt   # Các thư viện cần thiết\n" +
                "├── README.md          # Mô tả dự án\n" +
                "├── models/            # Các class model\n" +
                "├── services/          # Logic nghiệp vụ\n" +
                "├── utils/             # Hàm tiện ích\n" +
                "└── tests/             # Unit tests\n" +
                "```\n\n" +
                "**requirements.txt:**\n" +
                "```\n" +
                "numpy>=1.20.0\n" +
                "pandas>=1.3.0\n" +
                "```\n\n" +
                "**__init__.py:**\n" +
                "File trống để Python hiểu folder là module\n\n" +
                "**Mô hình 3 lớp:**\n" +
                "1. **Presentation**: Giao diện (CLI, GUI, API)\n" +
                "2. **Business Logic**: Xử lý nghiệp vụ\n" +
                "3. **Data**: Lưu trữ và truy xuất dữ liệu",
              examples: [
                {
                  title: 'Tạo cấu trúc dự án hoàn chỉnh',
                  code:
                    "import os\n\n" +
                    "# Tạo cấu trúc thư mục\n" +
                    "dirs = [\n" +
                    "    \"myproject/models\",\n" +
                    "    \"myproject/services\",\n" +
                    "    \"myproject/utils\",\n" +
                    "    \"myproject/tests\"\n" +
                    "]\n\n" +
                    "for d in dirs:\n" +
                    "    os.makedirs(d, exist_ok=True)\n" +
                    "    # Tạo __init__.py\n" +
                    "    with open(os.path.join(d, \"__init__.py\"), \"w\") as f:\n" +
                    "        pass\n\n" +
                    "# Tạo main.py\n" +
                    "with open(\"myproject/main.py\", \"w\") as f:\n" +
                    "    f.write(\"# Entry point\\n\")\n\n" +
                    "print(\"Cau truc da tao:\")\n" +
                    "for root, dirs, files in os.walk(\"myproject\"):\n" +
                    "    level = root.replace(\"myproject\", \"\").count(os.sep)\n" +
                    "    indent = \" \" * 2 * level\n" +
                    "    print(f\"{indent}{os.path.basename(root)}/\")\n" +
                    "    subindent = \" \" * 2 * (level + 1)\n" +
                    "    for file in files:\n" +
                    "        print(f\"{subindent}{file}\")",
                  explanation: 'Tạo cấu trúc thư mục chuẩn cho Python project',
                  output: 'Cau truc da tao:\nmyproject/\n  models/\n    __init__.py\n  services/\n    __init__.py\n  utils/\n    __init__.py\n  tests/\n    __init__.py\n  main.py'
                }
              ],
              quiz: [
                { id: 'q10-1-4-1', question: 'File __init__.py có vai trò gì?', options: ['File cấu hình', 'Đánh dấu folder là một Python module', 'File khởi tạo chương trình', 'File test'], correct_index: 1, explanation: '__init__.py báo cho Python biết folder đó là một package/module hợp lệ.' },
                { id: 'q10-1-4-2', question: 'requirements.txt dùng để làm gì?', options: ['Mô tả dự án', 'Liệt kê các thư viện cần cài đặt', 'Cấu hình chương trình', 'Viết test'], correct_index: 1, explanation: 'requirements.txt liệt kê các thư viện cần thiết để chạy dự án.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-10-2',
        course_id: 'level-10',
        title: 'Phát triển dự án',
        slug: 'phat-trien-du-an',
        description: 'Các bước phát triển và hoàn thiện dự án',
        icon: '🔧',
        color: '#8B5CF6',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-10-2-1',
            module_id: 'mod-10-2',
            title: 'Phát triển dự án',
            slug: 'phat-trien-du-an',
            description: 'Quy trình phát triển phần mềm',
            difficulty: 'medium',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu quy trình phát triển phần mềm',
                'Biết cách code theo kế hoạch',
                'Quản lý source code hiệu quả'
              ],
              theory:
                "## Quy trình phát triển dự án\n\n" +
                "**Các giai đoạn:**\n\n" +
                "1. **Planning**: Lập kế hoạch, thiết kế\n" +
                "2. **Implementation**: Viết code\n" +
                "3. **Testing**: Kiểm thử các chức năng\n" +
                "4. **Deployment**: Triển khai sản phẩm\n" +
                "5. **Maintenance**: Bảo trì và cập nhật\n\n" +
                "**Mô hình phát triển:**\n" +
                "- **Waterfall**: Tuần tự từng bước\n" +
                "- **Agile**: Phát triển liên tục, linh hoạt\n\n" +
                "**Version Control với Git:**\n" +
                "```bash\n" +
                "git init\n" +
                "git add .\n" +
                "git commit -m \"Initial commit\"\n" +
                "```",
              examples: [
                {
                  title: 'Git workflow cơ bản',
                  code:
                    "# Ví dụ git workflow đơn giản\n" +
                    "commands = [\n" +
                    "    \"git init\",\n" +
                    "    \"git add .\",\n" +
                    "    \"git commit -m 'Initial commit'\",\n" +
                    "    \"git status\"\n" +
                    "]\n\n" +
                    "print(\"Git Workflow:\")\n" +
                    "for i, cmd in enumerate(commands, 1):\n" +
                    "    print(f\"{i}. {cmd}\")",
                  explanation: 'Các bước cơ bản để bắt đầu với Git',
                  output: 'Git Workflow:\n1. git init\n2. git add .\n3. git commit -m \'Initial commit\'\n4. git status'
                }
              ],
              quiz: [
                { id: 'q10-2-1-1', question: 'Lệnh nào để khởi tạo repository Git?', options: ['git start', 'git init', 'git new', 'git create'], correct_index: 1, explanation: 'git init khởi tạo một Git repository mới trong thư mục hiện tại.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-10-2-2',
            module_id: 'mod-10-2',
            title: 'Testing và Debug',
            slug: 'testing-debug',
            description: 'Kiểm thử và sửa lỗi trong dự án',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 2,
            xp_reward: 105,
            is_published: true,
            content: {
              objectives: [
                'Biết các loại test phổ biến',
                'Sử dụng try-except để xử lý lỗi',
                'Debug hiệu quả'
              ],
              theory:
                "## Testing và Debug\n\n" +
                "**Các loại testing:**\n\n" +
                "1. **Unit Test**: Test từng hàm riêng lẻ\n" +
                "2. **Integration Test**: Test các module kết hợp\n" +
                "3. **Manual Test**: Test thủ công\n\n" +
                "**try-except để xử lý lỗi:**\n" +
                "```python\n" +
                "try:\n" +
                "    result = 10 / 0\n" +
                "except ZeroDivisionError as e:\n" +
                "    print(f\"Loi: {e}\")\n" +
                "```\n\n" +
                "**Debug tips:**\n" +
                "- Dùng print() để kiểm tra giá trị biến\n" +
                "- Sử dụng breakpoint (pdb)\n" +
                "- Đọc thông báo lỗi cẩn thận",
              examples: [
                {
                  title: 'Xử lý lỗi với try-except',
                  code:
                    "def divide(a, b):\n" +
                    "    try:\n" +
                    "        return a / b\n" +
                    "    except ZeroDivisionError:\n" +
                    "        return \"Loi chia cho 0\"\n" +
                    "    except TypeError:\n" +
                    "        return \"Loi kieu du lieu\"\n\n\n" +
                    "print(divide(10, 2))\n" +
                    "print(divide(10, 0))\n" +
                    "print(divide(\"10\", 2))",
                  explanation: 'try-except bắt và xử lý các lỗi cụ thể',
                  output: '5.0\nLoi chia cho 0\nLoi kieu du lieu'
                }
              ],
              quiz: [
                { id: 'q10-2-2-1', question: 'ZeroDivisionError xảy ra khi nào?', options: ['Cộng với 0', 'Trừ với 0', 'Chia cho 0', 'Nhân với 0'], correct_index: 2, explanation: 'ZeroDivisionError xảy ra khi cố gắng chia một số cho 0.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-10-2-3',
            module_id: 'mod-10-2',
            title: 'Tích hợp hệ thống',
            slug: 'tich-hop-du-an',
            description: 'Kết hợp các thành phần thành hệ thống hoàn chỉnh',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 110,
            is_published: true,
            content: {
              objectives: [
                'Biết cách tích hợp các module',
                'Kết nối các thành phần với nhau',
                'Đảm bảo hệ thống hoạt động trơn tru'
              ],
              theory:
                "## Tích hợp hệ thống\n\n" +
                "**Nguyên tắc tích hợp:**\n\n" +
                "1. **Interface rõ ràng**: Các module giao tiếp qua API định nghĩa sẵn\n" +
                "2. **Loose Coupling**: Module ít phụ thuộc nhau\n" +
                "3. **Incremental**: Tích hợp từng phần nhỏ\n\n" +
                "**Ví dụ kiến trúc:**\n" +
                "```python\n" +
                "# models/todo.py\n" +
                "class Todo:\n" +
                "    pass\n\n" +
                "# services/todo_service.py\n" +
                "from models.todo import Todo\n\n" +
                "class TodoService:\n" +
                "    def __init__(self):\n" +
                "        self.todo = Todo()\n" +
                "```\n\n" +
                "**Testing sau tích hợp:**\n" +
                "- Chạy toàn bộ flow\n" +
                "- Kiểm tra data consistency",
              examples: [
                {
                  title: 'Tích hợp đơn giản',
                  code:
                    "# Module A\n" +
                    "class Calculator:\n" +
                    "    def add(self, a, b):\n" +
                    "        return a + b\n\n" +
                    "# Module B\n" +
                    "class UI:\n" +
                    "    def __init__(self):\n" +
                    "        self.calc = Calculator()\n\n" +
                    "    def run(self):\n" +
                    "        result = self.calc.add(5, 3)\n" +
                    "        print(f\"5 + 3 = {result}\")\n\n" +
                    "ui = UI()\n" +
                    "ui.run()",
                  explanation: 'UI sử dụng Calculator thông qua dependency injection',
                  output: '5 + 3 = 8'
                }
              ],
              quiz: [
                { id: 'q10-2-3-1', question: 'Loose Coupling nghĩa là gì?', options: ['Module không liên quan', 'Module ít phụ thuộc lẫn nhau', 'Tất cả code trong một file', 'Không dùng class'], correct_index: 1, explanation: 'Loose Coupling: các module nên ít phụ thuộc lẫn nhau để dễ bảo trì.' }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'mod-10-3',
        course_id: 'level-10',
        title: 'Hoàn thiện dự án',
        slug: 'hoan-thien-du-an',
        description: 'Viết documentation và submit dự án',
        icon: '📦',
        color: '#10B981',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-10-3-1',
            module_id: 'mod-10-3',
            title: 'Viết documentation',
            slug: 'viet-documentation',
            description: 'Cách viết tài liệu hướng dẫn cho dự án',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu tầm quan trọng của documentation',
                'Biết cách viết README tốt',
                'Document code với docstring'
              ],
              theory:
                "## Viết Documentation\n\n" +
                "**Tầm quan trọng:**\n" +
                "- Giúp người khác hiểu và sử dụng dự án\n" +
                "- Giúp bảo trì code lâu dài\n" +
                "- Tiêu chuẩn trong phát triển phần mềm\n\n" +
                "**README.md nên có:**\n\n" +
                "1. Mô tả ngắn về dự án\n" +
                "2. Cách cài đặt\n" +
                "3. Cách chạy chương trình\n" +
                "4. Ví dụ sử dụng\n" +
                "5. Credit/Acknowledgment\n\n" +
                "**Docstring cho hàm:**\n" +
                "```python\n" +
                "def add(a, b):\n" +
                "    \"\"\"\n" +
                "    Cong hai so.\n\n" +
                "    Args:\n" +
                "        a: So thu nhat\n" +
                "        b: So thu hai\n" +
                "    Returns:\n" +
                "        Tong cua a va b\n" +
                "    \"\"\"\n" +
                "    return a + b\n" +
                "```",
              examples: [
                {
                  title: 'README đơn giản',
                  code:
                    "readme = \"\"\"\n" +
                    "# My Todo App\n" +
                    "\n" +
                    "Mo ta: Ung dung quan ly cong viec\n" +
                    "\n" +
                    "## Cach cai dat\n" +
                    "pip install -r requirements.txt\n" +
                    "\n" +
                    "## Cach chay\n" +
                    "python main.py\n" +
                    "\n" +
                    "## Vi du su dung\n" +
                    "1. Chon menu\n" +
                    "2. Nhap thong tin\n" +
                    "3. Xem ket qua\n" +
                    "\"\"\"\n\n" +
                    "print(readme)",
                  explanation: 'README với các phần quan trọng',
                  output: '\n# My Todo App\n\nMo ta: Ung dung quan ly cong viec\n\n## Cach cai dat\npip install -r requirements.txt\n\n## Cach chay\npython main.py\n\n## Vi du su dung\n1. Chon menu\n2. Nhap thong tin\n3. Xem ket qua'
                }
              ],
              quiz: [
                { id: 'q10-3-1-1', question: 'README.md thường dùng để làm gì?', options: ['Ghi chú cá nhân', 'Mô tả và hướng dẫn dự án', 'Code chính', 'Test case'], correct_index: 1, explanation: 'README.md là file mô tả chính của dự án, hướng dẫn người dùng.' }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-10-3-2',
            module_id: 'mod-10-3',
            title: 'Submit và trình bày dự án',
            slug: 'submit-du-an',
            description: 'Cách submit và thuyết trình dự án',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Biết cách đóng gói dự án',
                'Chuẩn bị thuyết trình',
                'Tự tin trình bày dự án'
              ],
              theory:
                "## Submit và trình bày dự án\n\n" +
                "**Đóng gói dự án:**\n\n" +
                "1. Đảm bảo code hoạt động đầy đủ\n" +
                "2. Kiểm tra lại documentation\n" +
                "3. Đặt tên file/folder hợp lý\n" +
                "4. Nén file (zip) nếu cần\n\n" +
                "** Chuẩn bị thuyết trình:**\n" +
                "- Slide giới thiệu dự án\n" +
                "- Demo trực tiếp\n" +
                "- Chuẩn bị câu hỏi và câu trả lời\n\n" +
                "**Cấu trúc thuyết trình:**\n" +
                "1. Giới thiệu bản thân (brief)\n" +
                "2. Mô tả vấn đề\n" +
                "3. Giải pháp đề xuất\n" +
                "4. Demo\n" +
                "5. Kết luận và Q&A",
              examples: [
                {
                  title: 'Checklist trước khi submit',
                  code:
                    "checklist = [\n" +
                    "    \"Code hoat dong dung\",\n" +
                    "    \"Documentation day du\",\n" +
                    "    \"Da test tat ca chuc nang\",\n" +
                    "    \"Dat ten hop ly\",\n" +
                    "    \"Clean code\"\n" +
                    "]\n\n" +
                    "print(\"CHECKLIST TRUOC KHI SUBMIT:\")\n" +
                    "for i, item in enumerate(checklist, 1):\n" +
                    "    print(f\"{i}. [ ] {item}\")\n\n" +
                    "print(\"\\nSau khi hoan thanh:\")\n" +
                    "for i, item in enumerate(checklist, 1):\n" +
                    "    print(f\"{i}. [x] {item}\")",
                  explanation: 'Checklist giúp không bỏ sót bước nào trước khi submit',
                  output: 'CHECKLIST TRUOC KHI SUBMIT:\n1. [ ] Code hoat dong dung\n2. [ ] Documentation day du\n3. [ ] Da test tat ca chuc nang\n4. [ ] Dat ten hop ly\n5. [ ] Clean code\n\nSau khi hoan thanh:\n1. [x] Code hoat dong dung\n2. [x] Documentation day du\n3. [x] Da test tat ca chuc nang\n4. [x] Dat ten hop ly\n5. [x] Clean code'
                }
              ],
              quiz: [
                { id: 'q10-3-2-1', question: 'Điều gì quan trọng nhất khi thuyết trình?', options: ['Slide đẹp', 'Demo hoạt động tốt', 'Nói nhanh', 'Đọc nhiều'], correct_index: 1, explanation: 'Demo hoạt động tốt là điều quan trọng nhất, cho thấy dự án thực sự hoàn thành.' }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  }
];

export const badges: Badge[] = [
  { id: 'badge-1', name: 'Python Beginner', slug: 'python-beginner', description: 'Hoàn thành level 1', icon: '🐍', color: '#10B981', requirement: 'level_1_completed', xp_reward: 100 },
  { id: 'badge-2', name: 'Loop Master', slug: 'loop-master', description: 'Hoàn thành level 2', icon: '🔄', color: '#8B5CF6', requirement: 'level_2_completed', xp_reward: 150 },
  { id: 'badge-3', name: 'Function Expert', slug: 'function-expert', description: 'Hoàn thành level 3', icon: '🧩', color: '#06B6D4', requirement: 'level_3_completed', xp_reward: 200 },
  { id: 'badge-4', name: 'Data Structure Pro', slug: 'data-structure-pro', description: 'Hoàn thành level 4', icon: '📋', color: '#F59E0B', requirement: 'level_4_completed', xp_reward: 250 },
  { id: 'badge-5', name: 'OOP Master', slug: 'oop-master', description: 'Hoàn thành level 5', icon: '🎯', color: '#EF4444', requirement: 'level_5_completed', xp_reward: 300 },
  { id: 'badge-6', name: 'Algorithm Warrior', slug: 'algorithm-warrior', description: 'Hoàn thành level 6', icon: '🧠', color: '#EC4899', requirement: 'level_6_completed', xp_reward: 350 },
  { id: 'badge-7', name: 'Python Champion', slug: 'python-champion', description: 'Hoàn thành level 7', icon: '🏆', color: '#6366F1', requirement: 'level_7_completed', xp_reward: 400 },
  { id: 'badge-8', name: '7 Day Streak', slug: '7-day-streak', description: 'Học 7 ngày liên tiếp', icon: '🔥', color: '#EF4444', requirement: 'maintain_7_day_streak', xp_reward: 50 },
  { id: 'badge-9', name: '30 Day Streak', slug: '30-day-streak', description: 'Học 30 ngày liên tiếp', icon: '💪', color: '#F59E0B', requirement: 'maintain_30_day_streak', xp_reward: 200 },
  { id: 'badge-10', name: 'First Code', slug: 'first-code', description: 'Viết dòng code Python đầu tiên', icon: '👶', color: '#10B981', requirement: 'write_first_code', xp_reward: 25 }
];

export const flashcards: Flashcard[] = [
  { id: 'fc-1', term: 'Python là ngôn ngữ gì?', definition: 'Ngôn ngữ thông dịch (interpreted language)', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-2', term: 'Ai là người tạo ra Python?', definition: 'Guido van Rossum', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-3', term: 'Lệnh nào kiểm tra phiên bản Python?', definition: 'python --version', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-4', term: 'Phép // là phép gì?', definition: 'Phép chia lấy phần nguyên', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-5', term: 'Phép % là phép gì?', definition: 'Phép chia lấy dư', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-6', term: 'Kiểu dữ liệu nào lưu số thực?', definition: 'Float', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-7', term: 'Kiểu dữ liệu nào lưu true/false?', definition: 'Boolean (bool)', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-8', term: 'Hàm len() dùng để làm gì?', definition: 'Đếm độ dài chuỗi hoặc list', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-9', term: 'Toán tử ** là toán tử gì?', definition: 'Phép lũy thừa', category: 'level-1', difficulty: 'easy' },
  { id: 'fc-10', term: 'Lệnh if cần kết thúc bằng gì?', definition: 'Dấu hai chấm (:)', category: 'level-2', difficulty: 'easy' },
  { id: 'fc-11', term: 'Vòng lặp for dùng để làm gì?', definition: 'Lặp với số lần biết trước', category: 'level-2', difficulty: 'easy' },
  { id: 'fc-12', term: 'Vòng lặp while dùng để làm gì?', definition: 'Lặp với điều kiện', category: 'level-2', difficulty: 'easy' },
  { id: 'fc-13', term: 'Lệnh break dùng để làm gì?', definition: 'Thoát vòng lặp ngay lập tức', category: 'level-2', difficulty: 'easy' },
  { id: 'fc-14', term: 'Lệnh continue dùng để làm gì?', definition: 'Bỏ qua lượt lặp hiện tại, sang lượt tiếp theo', category: 'level-2', difficulty: 'easy' },
  { id: 'fc-15', term: 'List được khai báo bằng gì?', definition: 'Dấu ngoặc vuông []', category: 'level-3', difficulty: 'easy' },
  { id: 'fc-16', term: 'Tuple khác List ở điểm gì?', definition: 'Tuple không thể thay đổi (immutable)', category: 'level-3', difficulty: 'easy' },
  { id: 'fc-17', term: 'Lệnh def dùng để làm gì?', definition: 'Định nghĩa hàm', category: 'level-4', difficulty: 'easy' },
  { id: 'fc-18', term: 'Hàm __init__ là gì?', definition: 'Constructor - chạy tự động khi tạo object', category: 'level-6', difficulty: 'medium' },
  { id: 'fc-19', term: 'Từ khóa import dùng để làm gì?', definition: 'Nhập module vào chương trình', category: 'level-7', difficulty: 'easy' },
  { id: 'fc-20', term: 'API là viết tắt của gì?', definition: 'Application Programming Interface', category: 'level-9', difficulty: 'easy' }
];

export const exercises: Exercise[] = [
  {
    id: 'ex-1',
    lesson_id: 'lesson-1-1-2',
    title: 'Tính tổng hai số',
    description: 'Viết chương trình yêu cầu người dùng nhập hai số và in ra tổng của chúng',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code:
      "# Nhập hai số từ người dùng\na = int(input(\"Nhập số thứ nhất: \"))\nb = int(input(\"Nhập số thứ hai: \"))\n\n# Tính và in tổng\nprint(\"Tổng là:\", a + b)",
    solution_code:
      "a = int(input(\"Nhập số thứ nhất: \"))\nb = int(input(\"Nhập số thứ hai: \"))\nprint(\"Tổng là:\", a + b)",
    hints: ['Dùng int() để chuyển đổi chuỗi sang số nguyên'],
    test_cases: [
      { input: '3\n5\n', expected_output: 'Tổng là: 8', is_hidden: false }
    ]
  },
  {
    id: 'ex-2',
    lesson_id: 'lesson-2-1-1',
    title: 'Kiểm tra số chẵn lẻ',
    description: 'Viết chương trình kiểm tra xem một số là số chẵn hay số lẻ',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code:
      "num = int(input(\"Nhập một số: \"))\n\n# Kiểm tra chẵn lẻ\nif num % 2 == 0:\n    print(num, \"là số chẵn\")\nelse:\n    print(num, \"là số lẻ\")",
    solution_code:
      "num = int(input(\"Nhập một số: \"))\nif num % 2 == 0:\n    print(num, \"là số chẵn\")\nelse:\n    print(num, \"là số lẻ\")",
    hints: ['Số chia hết cho 2 là số chẵn, dùng toán tử % để kiểm tra'],
    test_cases: [
      { input: '4\n', expected_output: '4 là số chẵn', is_hidden: false }
    ]
  },
  {
    id: 'ex-3',
    lesson_id: 'lesson-3-1-1',
    title: 'Đảo ngược chuỗi',
    description: 'Viết chương trình đảo ngược một chuỗi do người dùng nhập',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code:
      "s = input(\"Nhập một chuỗi: \")\n\n# Đảo ngược chuỗi\nreversed_s = s[::-1]\n\n\nprint(\"Chuỗi đảo ngược:\", reversed_s)",
    solution_code:
      "s = input(\"Nhập một chuỗi: \")\nprint(\"Chuỗi đảo ngược:\", s[::-1])",
    hints: ['Dùng slicing với bước -1: s[::-1]'],
    test_cases: [
      { input: 'hello\n', expected_output: 'Chuỗi đảo ngược: olleh', is_hidden: false }
    ]
  },
  {
    id: 'ex-4',
    lesson_id: 'lesson-4-1-1',
    title: 'Tính giai thừa',
    description: 'Viết hàm đệ quy tính giai thừa của một số nguyên dương',
    difficulty: 'medium',
    xp_reward: 100,
    starter_code:
      "def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n - 1)\n\n# Test\nnum = 5\nprint(f\"Giai thừa của {num} là:\", factorial(num))",
    solution_code:
      "def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n - 1)\n\n\nnum = 5\nprint(f\"Giai thừa của {num} là:\", factorial(num))",
    hints: ['Giai thừa của n = n * (n-1) * (n-2) * ... * 1'],
    test_cases: [
      { input: '', expected_output: 'Giai thừa của 5 là: 120', is_hidden: false }
    ]
  },
  {
    id: 'ex-5',
    lesson_id: 'lesson-3-1-1',
    title: 'Đếm số lần xuất hiện trong danh sách',
    description: 'Viết chương trình đếm số lần xuất hiện của một phần tử trong danh sách',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code:
      "lst = [1, 2, 3, 2, 4, 2, 5]\nitem = 2\ncount = lst.count(item)\n\nprint(f\"Số {item} xuất hiện {count} lần trong danh sách\")",
    solution_code:
      "lst = [1, 2, 3, 2, 4, 2, 5]\nitem = 2\nprint(f\"Số {item} xuất hiện {lst.count(item)} lần\")",
    hints: ['Dùng phương thức count() của list'],
    test_cases: [
      { input: '', expected_output: 'Số 2 xuất hiện 3 lần', is_hidden: false }
    ]
  }
];