import { Course, Badge, Flashcard, Exercise } from '@/types';

// ============================================================================
// NỘI DUNG THEO SGK TIN HỌC 12 — CÁNH DIỀU (KHOA HỌC MÁY TÍNH)
// Chương trình GDPT 2018
// ============================================================================

export const courses: Course[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // CHỦ ĐỀ 5: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chu-de-5',
    title: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
    slug: 'giai-quyet-van-de',
    description: 'Kiểu dữ liệu nâng cao, thuật toán sắp xếp và tìm kiếm trong Python',
    icon: '💻',
    color: '#3B82F6',
    order_index: 1,
    is_published: true,
    modules: [
      // ────────────────────────────────────────────────────────────────────
      // BÀI 1: Kiểu dữ liệu danh sách (List)
      // ────────────────────────────────────────────────────────────────────
      {
        id: 'bai-1',
        course_id: 'chu-de-5',
        title: 'Kiểu dữ liệu danh sách',
        slug: 'kieu-du-lieu-danh-sach',
        description: 'Tìm hiểu List trong Python: khai báo, truy cập, thao tác cơ bản',
        icon: '📋',
        color: '#3B82F6',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-1-1',
            module_id: 'bai-1',
            title: 'Khái niệm và khai báo danh sách',
            slug: 'khai-niem-va-khai-bao-danh-sach',
            description: 'List là gì? Cách tạo và truy cập phần tử trong danh sách',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm kiểu dữ liệu danh sách (list) trong Python',
                'Biết cách khai báo danh sách bằng nhiều cách khác nhau',
                'Truy cập phần tử qua chỉ số (index) dương và âm',
                'Hiểu tính chất thay đổi được (mutable) của list'
              ],
              theory:
                "## Kiểu dữ liệu danh sách (List)\n\n" +
                "### 1. Khái niệm\n\n" +
                "**Danh sách (list)** là kiểu dữ liệu cho phép lưu trữ một dãy các giá trị có thứ tự trong một biến duy nhất. Các phần tử trong list có thể có kiểu dữ liệu khác nhau.\n\n" +
                "**Đặc điểm:**\n" +
                "- Có thứ tự (ordered): phần tử có vị trí xác định\n" +
                "- Thay đổi được (mutable): có thể thêm, xóa, sửa phần tử\n" +
                "- Cho phép phần tử trùng lặp\n" +
                "- Chỉ số bắt đầu từ 0\n\n" +
                "### 2. Khai báo danh sách\n\n" +
                "```python\n" +
                "# Cách 1: Dùng dấu ngoặc vuông []\n" +
                "diem = [8, 7, 9, 6, 10]\n" +
                "ten = [\"An\", \"Bình\", \"Chi\"]\n\n" +
                "# Cách 2: List rỗng\n" +
                "ds_rong = []\n\n" +
                "# Cách 3: List có nhiều kiểu dữ liệu\n" +
                "hon_hop = [\"An\", 18, True, 8.5]\n\n" +
                "# Cách 4: Dùng hàm list()\n" +
                "ds = list(range(1, 6))  # [1, 2, 3, 4, 5]\n" +
                "```\n\n" +
                "### 3. Truy cập phần tử\n\n" +
                "Phần tử được truy cập qua **chỉ số (index)**:\n" +
                "- Chỉ số dương: đếm từ đầu, bắt đầu từ 0\n" +
                "- Chỉ số âm: đếm từ cuối, bắt đầu từ -1\n\n" +
                "```python\n" +
                "diem = [8, 7, 9, 6, 10]\n" +
                "#        0  1  2  3  4    ← chỉ số dương\n" +
                "#       -5 -4 -3 -2 -1    ← chỉ số âm\n\n" +
                "print(diem[0])   # 8 (phần tử đầu tiên)\n" +
                "print(diem[-1])  # 10 (phần tử cuối cùng)\n" +
                "print(diem[2])   # 9\n" +
                "```\n\n" +
                "### 4. Cắt danh sách (Slicing)\n\n" +
                "```python\n" +
                "ds = [1, 2, 3, 4, 5, 6, 7]\n" +
                "print(ds[1:4])   # [2, 3, 4]  (từ index 1 đến 3)\n" +
                "print(ds[:3])    # [1, 2, 3]  (từ đầu đến index 2)\n" +
                "print(ds[3:])    # [4, 5, 6, 7] (từ index 3 đến cuối)\n" +
                "print(ds[::2])   # [1, 3, 5, 7] (bước nhảy 2)\n" +
                "```",
              examples: [
                {
                  title: 'Khai báo và truy cập danh sách',
                  code:
                    "# Khai báo danh sách điểm số\n" +
                    "diem = [8, 7, 9, 6, 10]\n\n" +
                    "# Truy cập phần tử\n" +
                    "print(\"Phần tử đầu tiên:\", diem[0])\n" +
                    "print(\"Phần tử cuối cùng:\", diem[-1])\n" +
                    "print(\"Số lượng phần tử:\", len(diem))\n\n" +
                    "# Cắt danh sách\n" +
                    "print(\"3 phần tử đầu:\", diem[:3])\n" +
                    "print(\"Từ vị trí 2 đến cuối:\", diem[2:])",
                  explanation: 'Dùng [] để khai báo list, dùng index để truy cập, len() để đếm số phần tử, và slicing để cắt list.',
                  output: 'Phần tử đầu tiên: 8\nPhần tử cuối cùng: 10\nSố lượng phần tử: 5\n3 phần tử đầu: [8, 7, 9]\nTừ vị trí 2 đến cuối: [9, 6, 10]'
                },
                {
                  title: 'Thay đổi giá trị phần tử',
                  code:
                    "# List có thể thay đổi (mutable)\n" +
                    "mon_hoc = [\"Toán\", \"Lý\", \"Hóa\", \"Tin\"]\n" +
                    "print(\"Ban đầu:\", mon_hoc)\n\n" +
                    "# Thay đổi phần tử\n" +
                    "mon_hoc[2] = \"Sinh\"\n" +
                    "print(\"Sau thay đổi:\", mon_hoc)\n\n" +
                    "# Thay đổi nhiều phần tử bằng slicing\n" +
                    "mon_hoc[1:3] = [\"Văn\", \"Sử\"]\n" +
                    "print(\"Sau slice assign:\", mon_hoc)",
                  explanation: 'List là mutable — ta có thể gán giá trị mới cho phần tử qua index hoặc slice.',
                  output: 'Ban đầu: [\"Toán\", \"Lý\", \"Hóa\", \"Tin\"]\nSau thay đổi: [\"Toán\", \"Lý\", \"Sinh\", \"Tin\"]\nSau slice assign: [\"Toán\", \"Văn\", \"Sử\", \"Tin\"]'
                }
              ],
              quiz: [
                {
                  id: 'q1-1-1',
                  question: 'Chỉ số (index) của phần tử đầu tiên trong list Python là bao nhiêu?',
                  options: ['1', '0', '-1', 'Tùy thuộc vào list'],
                  correct_index: 1,
                  explanation: 'Trong Python, chỉ số (index) luôn bắt đầu từ 0. Phần tử đầu tiên có index = 0.'
                },
                {
                  id: 'q1-1-2',
                  question: 'Cho ds = [10, 20, 30, 40, 50]. Giá trị của ds[-2] là gì?',
                  options: ['20', '30', '40', '50'],
                  correct_index: 2,
                  explanation: 'Chỉ số -2 đếm từ cuối: -1 là 50, -2 là 40.'
                },
                {
                  id: 'q1-1-3',
                  question: 'Đặc điểm nào KHÔNG đúng về list trong Python?',
                  options: ['Có thứ tự', 'Cho phép trùng lặp', 'Không thể thay đổi sau khi tạo', 'Chỉ số bắt đầu từ 0'],
                  correct_index: 2,
                  explanation: 'List là mutable (thay đổi được). Đặc điểm "không thể thay đổi" thuộc về tuple, không phải list.'
                },
                {
                  id: 'q1-1-4',
                  question: 'Cho a = [1, 2, 3, 4, 5]. Kết quả của a[1:4] là gì?',
                  options: ['[1, 2, 3, 4]', '[2, 3, 4]', '[2, 3, 4, 5]', '[1, 2, 3]'],
                  correct_index: 1,
                  explanation: 'Slicing a[1:4] lấy từ index 1 đến index 3 (không bao gồm index 4), tức là [2, 3, 4].'
                }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-1-2',
            module_id: 'bai-1',
            title: 'Các thao tác trên danh sách',
            slug: 'cac-thao-tac-tren-danh-sach',
            description: 'Thêm, xóa, sửa phần tử và các phương thức thường dùng của list',
            difficulty: 'easy',
            estimated_minutes: 35,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Biết cách thêm phần tử: append(), insert(), extend()',
                'Biết cách xóa phần tử: pop(), remove(), del',
                'Sử dụng các phương thức: sort(), reverse(), count(), index()',
                'Duyệt danh sách bằng vòng lặp for'
              ],
              theory:
                "## Các thao tác trên danh sách\n\n" +
                "### 1. Thêm phần tử\n\n" +
                "| Phương thức | Chức năng | Ví dụ |\n" +
                "|-------------|-----------|-------|\n" +
                "| `append(x)` | Thêm x vào cuối | `ds.append(6)` |\n" +
                "| `insert(i, x)` | Chèn x tại vị trí i | `ds.insert(0, 99)` |\n" +
                "| `extend(list2)` | Nối list2 vào cuối | `ds.extend([7,8])` |\n\n" +
                "### 2. Xóa phần tử\n\n" +
                "| Phương thức | Chức năng | Ví dụ |\n" +
                "|-------------|-----------|-------|\n" +
                "| `pop()` | Xóa và trả về phần tử cuối | `ds.pop()` |\n" +
                "| `pop(i)` | Xóa và trả về phần tử tại i | `ds.pop(0)` |\n" +
                "| `remove(x)` | Xóa phần tử đầu tiên có giá trị x | `ds.remove(3)` |\n" +
                "| `del ds[i]` | Xóa phần tử tại vị trí i | `del ds[2]` |\n" +
                "| `clear()` | Xóa tất cả | `ds.clear()` |\n\n" +
                "### 3. Các phương thức hữu ích\n\n" +
                "```python\n" +
                "ds = [3, 1, 4, 1, 5, 9]\n\n" +
                "ds.sort()          # Sắp xếp tăng dần: [1, 1, 3, 4, 5, 9]\n" +
                "ds.sort(reverse=True)  # Sắp xếp giảm: [9, 5, 4, 3, 1, 1]\n" +
                "ds.reverse()       # Đảo ngược thứ tự\n" +
                "ds.count(1)        # Đếm số lần xuất hiện của 1 → 2\n" +
                "ds.index(4)        # Tìm vị trí đầu tiên của 4 → 2\n" +
                "len(ds)            # Số phần tử → 6\n" +
                "sum(ds)            # Tổng các phần tử\n" +
                "min(ds), max(ds)   # Giá trị nhỏ nhất, lớn nhất\n" +
                "```\n\n" +
                "### 4. Duyệt danh sách\n\n" +
                "```python\n" +
                "# Cách 1: Duyệt trực tiếp\n" +
                "for phan_tu in ds:\n" +
                "    print(phan_tu)\n\n" +
                "# Cách 2: Duyệt với chỉ số\n" +
                "for i in range(len(ds)):\n" +
                "    print(f\"ds[{i}] = {ds[i]}\")\n\n" +
                "# Cách 3: Dùng enumerate\n" +
                "for i, val in enumerate(ds):\n" +
                "    print(f\"Vị trí {i}: {val}\")\n" +
                "```",
              examples: [
                {
                  title: 'Thêm và xóa phần tử',
                  code:
                    "ds = [1, 2, 3]\n" +
                    "print(\"Ban đầu:\", ds)\n\n" +
                    "# Thêm phần tử\n" +
                    "ds.append(4)\n" +
                    "print(\"Sau append(4):\", ds)\n\n" +
                    "ds.insert(1, 99)\n" +
                    "print(\"Sau insert(1, 99):\", ds)\n\n" +
                    "# Xóa phần tử\n" +
                    "ds.pop()\n" +
                    "print(\"Sau pop():\", ds)\n\n" +
                    "ds.remove(99)\n" +
                    "print(\"Sau remove(99):\", ds)",
                  explanation: 'append thêm cuối, insert chèn vào vị trí, pop xóa cuối, remove xóa theo giá trị.',
                  output: 'Ban đầu: [1, 2, 3]\nSau append(4): [1, 2, 3, 4]\nSau insert(1, 99): [1, 99, 2, 3, 4]\nSau pop(): [1, 99, 2, 3]\nSau remove(99): [1, 2, 3]'
                },
                {
                  title: 'Duyệt và tính toán trên danh sách',
                  code:
                    "diem = [8, 6, 9, 7, 10, 5]\n\n" +
                    "# Tính điểm trung bình\n" +
                    "tb = sum(diem) / len(diem)\n" +
                    "print(f\"Điểm trung bình: {tb:.2f}\")\n" +
                    "print(f\"Điểm cao nhất: {max(diem)}\")\n" +
                    "print(f\"Điểm thấp nhất: {min(diem)}\")\n\n" +
                    "# Đếm số điểm >= 8\n" +
                    "gioi = 0\n" +
                    "for d in diem:\n" +
                    "    if d >= 8:\n" +
                    "        gioi += 1\n" +
                    "print(f\"Số điểm giỏi (>=8): {gioi}\")",
                  explanation: 'Dùng sum/len tính trung bình, max/min tìm cực trị, vòng lặp for để đếm điều kiện.',
                  output: 'Điểm trung bình: 7.50\nĐiểm cao nhất: 10\nĐiểm thấp nhất: 5\nSố điểm giỏi (>=8): 3'
                }
              ],
              quiz: [
                {
                  id: 'q1-2-1',
                  question: 'Phương thức nào thêm phần tử vào cuối danh sách?',
                  options: ['insert()', 'append()', 'extend()', 'add()'],
                  correct_index: 1,
                  explanation: 'append(x) thêm phần tử x vào cuối list. insert() chèn vào vị trí chỉ định, extend() nối list khác.'
                },
                {
                  id: 'q1-2-2',
                  question: 'Cho ds = [5, 3, 8, 1]. Sau ds.sort(), ds có giá trị là gì?',
                  options: ['[5, 3, 8, 1]', '[1, 3, 5, 8]', '[8, 5, 3, 1]', 'Lỗi'],
                  correct_index: 1,
                  explanation: 'sort() sắp xếp list tăng dần tại chỗ (in-place). Kết quả: [1, 3, 5, 8].'
                },
                {
                  id: 'q1-2-3',
                  question: 'Sự khác biệt giữa pop() và remove() là gì?',
                  options: [
                    'pop() xóa theo index, remove() xóa theo giá trị',
                    'pop() xóa theo giá trị, remove() xóa theo index',
                    'Không có khác biệt',
                    'pop() xóa tất cả, remove() xóa một phần tử'
                  ],
                  correct_index: 0,
                  explanation: 'pop(i) xóa phần tử tại index i và trả về giá trị. remove(x) tìm và xóa phần tử đầu tiên có giá trị x.'
                }
              ],
              exercises: []
            }
          }
        ]
      },


      // ────────────────────────────────────────────────────────────────────
      // BÀI 2: Một số thuật toán sắp xếp
      // ────────────────────────────────────────────────────────────────────
      {
        id: 'bai-2',
        course_id: 'chu-de-5',
        title: 'Một số thuật toán sắp xếp',
        slug: 'thuat-toan-sap-xep',
        description: 'Sắp xếp chọn (Selection Sort), sắp xếp nổi bọt (Bubble Sort), sắp xếp chèn (Insertion Sort)',
        icon: '🔄',
        color: '#8B5CF6',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-2-1',
            module_id: 'bai-2',
            title: 'Thuật toán sắp xếp chọn (Selection Sort)',
            slug: 'sap-xep-chon',
            description: 'Ý tưởng, cách hoạt động và cài đặt thuật toán Selection Sort',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 1,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu ý tưởng của thuật toán sắp xếp chọn',
                'Mô tả từng bước hoạt động của thuật toán',
                'Cài đặt thuật toán bằng Python',
                'Đánh giá độ phức tạp thời gian O(n²)'
              ],
              theory:
                "## Thuật toán sắp xếp chọn (Selection Sort)\n\n" +
                "### 1. Ý tưởng\n\n" +
                "Sắp xếp chọn hoạt động bằng cách **tìm phần tử nhỏ nhất** trong phần chưa sắp xếp và đặt nó vào đúng vị trí.\n\n" +
                "**Các bước:**\n" +
                "1. Duyệt từ vị trí 0 đến n-2\n" +
                "2. Tại mỗi vị trí i, tìm phần tử nhỏ nhất trong đoạn [i, n-1]\n" +
                "3. Đổi chỗ phần tử nhỏ nhất với phần tử ở vị trí i\n" +
                "4. Lặp lại cho đến khi danh sách được sắp xếp\n\n" +
                "### 2. Minh họa\n\n" +
                "```\n" +
                "Danh sách: [64, 25, 12, 22, 11]\n\n" +
                "Bước 1: Tìm min trong [64,25,12,22,11] → 11\n" +
                "         Đổi 64 ↔ 11 → [11, 25, 12, 22, 64]\n\n" +
                "Bước 2: Tìm min trong [25,12,22,64] → 12\n" +
                "         Đổi 25 ↔ 12 → [11, 12, 25, 22, 64]\n\n" +
                "Bước 3: Tìm min trong [25,22,64] → 22\n" +
                "         Đổi 25 ↔ 22 → [11, 12, 22, 25, 64]\n\n" +
                "Bước 4: Tìm min trong [25,64] → 25\n" +
                "         Không cần đổi → [11, 12, 22, 25, 64]\n" +
                "```\n\n" +
                "### 3. Độ phức tạp\n\n" +
                "- Thời gian: **O(n²)** trong mọi trường hợp\n" +
                "- Không gian: **O(1)** (sắp xếp tại chỗ)\n" +
                "- Số phép so sánh: n(n-1)/2",
              examples: [
                {
                  title: 'Cài đặt Selection Sort',
                  code:
                    "def selection_sort(ds):\n" +
                    "    n = len(ds)\n" +
                    "    for i in range(n - 1):\n" +
                    "        # Tìm vị trí phần tử nhỏ nhất\n" +
                    "        vi_tri_min = i\n" +
                    "        for j in range(i + 1, n):\n" +
                    "            if ds[j] < ds[vi_tri_min]:\n" +
                    "                vi_tri_min = j\n" +
                    "        # Đổi chỗ\n" +
                    "        ds[i], ds[vi_tri_min] = ds[vi_tri_min], ds[i]\n" +
                    "    return ds\n\n" +
                    "# Kiểm thử\n" +
                    "diem = [64, 25, 12, 22, 11]\n" +
                    "print(\"Trước sắp xếp:\", diem)\n" +
                    "selection_sort(diem)\n" +
                    "print(\"Sau sắp xếp:\", diem)",
                  explanation: 'Vòng lặp ngoài chọn vị trí, vòng lặp trong tìm min, sau đó đổi chỗ.',
                  output: 'Trước sắp xếp: [64, 25, 12, 22, 11]\nSau sắp xếp: [11, 12, 22, 25, 64]'
                },
                {
                  title: 'Minh họa từng bước',
                  code:
                    "def selection_sort_verbose(ds):\n" +
                    "    n = len(ds)\n" +
                    "    for i in range(n - 1):\n" +
                    "        vi_tri_min = i\n" +
                    "        for j in range(i + 1, n):\n" +
                    "            if ds[j] < ds[vi_tri_min]:\n" +
                    "                vi_tri_min = j\n" +
                    "        if vi_tri_min != i:\n" +
                    "            ds[i], ds[vi_tri_min] = ds[vi_tri_min], ds[i]\n" +
                    "        print(f\"Bước {i+1}: {ds}\")\n\n" +
                    "ds = [29, 10, 14, 37, 13]\n" +
                    "print(\"Ban đầu:\", ds)\n" +
                    "selection_sort_verbose(ds)",
                  explanation: 'Hiện trạng thái danh sách sau mỗi bước để thấy rõ quá trình sắp xếp.',
                  output: 'Ban đầu: [29, 10, 14, 37, 13]\nBước 1: [10, 29, 14, 37, 13]\nBước 2: [10, 13, 14, 37, 29]\nBước 3: [10, 13, 14, 37, 29]\nBước 4: [10, 13, 14, 29, 37]'
                }
              ],
              quiz: [
                {
                  id: 'q2-1-1',
                  question: 'Ý tưởng chính của sắp xếp chọn là gì?',
                  options: [
                    'So sánh hai phần tử kề nhau và đổi chỗ',
                    'Tìm phần tử nhỏ nhất và đặt vào đúng vị trí',
                    'Chèn phần tử vào vị trí thích hợp',
                    'Chia danh sách thành hai nửa'
                  ],
                  correct_index: 1,
                  explanation: 'Selection Sort tìm phần tử nhỏ nhất trong đoạn chưa sắp xếp rồi đặt vào đầu đoạn đó.'
                },
                {
                  id: 'q2-1-2',
                  question: 'Độ phức tạp thời gian của Selection Sort là bao nhiêu?',
                  options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
                  correct_index: 2,
                  explanation: 'Selection Sort luôn có độ phức tạp O(n²) vì có 2 vòng lặp lồng nhau, mỗi vòng duyệt ~n phần tử.'
                },
                {
                  id: 'q2-1-3',
                  question: 'Sau bước lặp đầu tiên của Selection Sort trên [5, 3, 8, 1, 4], kết quả là?',
                  options: ['[1, 3, 8, 5, 4]', '[3, 5, 8, 1, 4]', '[1, 5, 3, 8, 4]', '[5, 3, 1, 8, 4]'],
                  correct_index: 0,
                  explanation: 'Bước 1: tìm min=1 (index 3), đổi với phần tử ở index 0 (số 5). Kết quả: [1, 3, 8, 5, 4].'
                }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-2',
            module_id: 'bai-2',
            title: 'Thuật toán sắp xếp nổi bọt (Bubble Sort)',
            slug: 'sap-xep-noi-bot',
            description: 'Ý tưởng, cách hoạt động và cài đặt thuật toán Bubble Sort',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 2,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu ý tưởng của thuật toán sắp xếp nổi bọt',
                'Mô tả quá trình "nổi bọt" của phần tử lớn nhất',
                'Cài đặt thuật toán bằng Python',
                'Hiểu tối ưu với cờ hiệu (flag) khi list đã sắp xếp'
              ],
              theory:
                "## Thuật toán sắp xếp nổi bọt (Bubble Sort)\n\n" +
                "### 1. Ý tưởng\n\n" +
                "Sắp xếp nổi bọt so sánh **hai phần tử kề nhau**, nếu sai thứ tự thì đổi chỗ. Phần tử lớn nhất sẽ \"nổi\" lên cuối sau mỗi lượt.\n\n" +
                "**Các bước:**\n" +
                "1. Duyệt từ đầu đến cuối danh sách\n" +
                "2. So sánh từng cặp phần tử kề nhau (ds[j] và ds[j+1])\n" +
                "3. Nếu ds[j] > ds[j+1], đổi chỗ hai phần tử\n" +
                "4. Sau mỗi lượt, phần tử lớn nhất \"nổi\" lên cuối\n" +
                "5. Lặp lại n-1 lượt\n\n" +
                "### 2. Minh họa\n\n" +
                "```\n" +
                "Danh sách: [5, 1, 4, 2, 8]\n\n" +
                "Lượt 1: [5,1]→đổi [1,5,4,2,8]\n" +
                "         [5,4]→đổi [1,4,5,2,8]\n" +
                "         [5,2]→đổi [1,4,2,5,8]\n" +
                "         [5,8]→giữ [1,4,2,5,8]  ← 8 đã ở cuối\n\n" +
                "Lượt 2: [1,4]→giữ [1,4,2,5,8]\n" +
                "         [4,2]→đổi [1,2,4,5,8]\n" +
                "         [4,5]→giữ [1,2,4,5,8]  ← 5 ở đúng chỗ\n\n" +
                "Lượt 3: Không có đổi chỗ → Dừng sớm!\n" +
                "```\n\n" +
                "### 3. Tối ưu\n\n" +
                "Dùng **cờ hiệu (flag)**: nếu một lượt duyệt mà không có đổi chỗ nào → list đã sắp xếp → dừng sớm.\n\n" +
                "### 4. Độ phức tạp\n\n" +
                "- Trường hợp tốt nhất (đã sắp xếp): **O(n)**\n" +
                "- Trường hợp xấu nhất: **O(n²)**\n" +
                "- Không gian: **O(1)**",
              examples: [
                {
                  title: 'Cài đặt Bubble Sort (có tối ưu)',
                  code:
                    "def bubble_sort(ds):\n" +
                    "    n = len(ds)\n" +
                    "    for i in range(n - 1):\n" +
                    "        da_doi = False  # Cờ hiệu\n" +
                    "        for j in range(n - 1 - i):\n" +
                    "            if ds[j] > ds[j + 1]:\n" +
                    "                ds[j], ds[j + 1] = ds[j + 1], ds[j]\n" +
                    "                da_doi = True\n" +
                    "        if not da_doi:  # Không đổi → đã sắp xếp\n" +
                    "            break\n" +
                    "    return ds\n\n" +
                    "# Kiểm thử\n" +
                    "ds = [5, 1, 4, 2, 8]\n" +
                    "print(\"Trước:\", ds)\n" +
                    "bubble_sort(ds)\n" +
                    "print(\"Sau:\", ds)",
                  explanation: 'Hai vòng for lồng nhau: ngoài duyệt lượt, trong so sánh cặp kề. Cờ da_doi giúp dừng sớm.',
                  output: 'Trước: [5, 1, 4, 2, 8]\nSau: [1, 2, 4, 5, 8]'
                }
              ],
              quiz: [
                {
                  id: 'q2-2-1',
                  question: 'Trong Bubble Sort, sau lượt duyệt đầu tiên, phần tử nào chắc chắn ở đúng vị trí?',
                  options: ['Phần tử nhỏ nhất ở đầu', 'Phần tử lớn nhất ở cuối', 'Phần tử ở giữa', 'Không phần tử nào'],
                  correct_index: 1,
                  explanation: 'Sau mỗi lượt duyệt, phần tử lớn nhất "nổi" lên cuối danh sách và đã ở đúng vị trí.'
                },
                {
                  id: 'q2-2-2',
                  question: 'Tác dụng của cờ hiệu (flag) trong Bubble Sort tối ưu là gì?',
                  options: ['Tăng tốc so sánh', 'Dừng sớm khi list đã sắp xếp', 'Giảm bộ nhớ sử dụng', 'Không có tác dụng'],
                  correct_index: 1,
                  explanation: 'Nếu trong một lượt duyệt không có phép đổi chỗ nào → list đã sắp xếp → dừng sớm, tiết kiệm thời gian.'
                }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-2-3',
            module_id: 'bai-2',
            title: 'Thuật toán sắp xếp chèn (Insertion Sort)',
            slug: 'sap-xep-chen',
            description: 'Ý tưởng, cách hoạt động và cài đặt thuật toán Insertion Sort',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 3,
            xp_reward: 100,
            is_published: true,
            content: {
              objectives: [
                'Hiểu ý tưởng "chèn vào vị trí đúng" của Insertion Sort',
                'Liên hệ với cách xếp bài trong thực tế',
                'Cài đặt thuật toán bằng Python',
                'So sánh ưu nhược điểm với Selection Sort và Bubble Sort'
              ],
              theory:
                "## Thuật toán sắp xếp chèn (Insertion Sort)\n\n" +
                "### 1. Ý tưởng\n\n" +
                "Giống như cách bạn **xếp bài**: lấy từng lá bài và chèn vào đúng vị trí trong phần bài đã sắp xếp.\n\n" +
                "**Các bước:**\n" +
                "1. Coi phần tử đầu tiên đã được sắp xếp\n" +
                "2. Lấy phần tử tiếp theo (key)\n" +
                "3. So sánh key với các phần tử đã sắp xếp (từ phải sang trái)\n" +
                "4. Dịch các phần tử lớn hơn key sang phải\n" +
                "5. Chèn key vào vị trí đúng\n\n" +
                "### 2. Minh họa\n\n" +
                "```\n" +
                "Danh sách: [5, 2, 4, 6, 1, 3]\n\n" +
                "Bước 1: key=2, chèn trước 5 → [2, 5, 4, 6, 1, 3]\n" +
                "Bước 2: key=4, chèn giữa 2 và 5 → [2, 4, 5, 6, 1, 3]\n" +
                "Bước 3: key=6, đã đúng vị trí → [2, 4, 5, 6, 1, 3]\n" +
                "Bước 4: key=1, chèn đầu → [1, 2, 4, 5, 6, 3]\n" +
                "Bước 5: key=3, chèn sau 2 → [1, 2, 3, 4, 5, 6]\n" +
                "```\n\n" +
                "### 3. Độ phức tạp\n\n" +
                "- Tốt nhất (đã sắp xếp): **O(n)**\n" +
                "- Xấu nhất (sắp xếp ngược): **O(n²)**\n" +
                "- Hiệu quả với danh sách nhỏ hoặc gần sắp xếp\n\n" +
                "### 4. So sánh 3 thuật toán\n\n" +
                "| Thuật toán | Tốt nhất | Xấu nhất | Ổn định | Ghi chú |\n" +
                "|------------|----------|----------|---------|------|\n" +
                "| Selection Sort | O(n²) | O(n²) | Không | Ít phép đổi chỗ |\n" +
                "| Bubble Sort | O(n) | O(n²) | Có | Có tối ưu cờ hiệu |\n" +
                "| Insertion Sort | O(n) | O(n²) | Có | Tốt cho list nhỏ |",
              examples: [
                {
                  title: 'Cài đặt Insertion Sort',
                  code:
                    "def insertion_sort(ds):\n" +
                    "    n = len(ds)\n" +
                    "    for i in range(1, n):\n" +
                    "        key = ds[i]\n" +
                    "        j = i - 1\n" +
                    "        # Dịch các phần tử lớn hơn key sang phải\n" +
                    "        while j >= 0 and ds[j] > key:\n" +
                    "            ds[j + 1] = ds[j]\n" +
                    "            j -= 1\n" +
                    "        # Chèn key vào đúng vị trí\n" +
                    "        ds[j + 1] = key\n" +
                    "    return ds\n\n" +
                    "# Kiểm thử\n" +
                    "ds = [5, 2, 4, 6, 1, 3]\n" +
                    "print(\"Trước:\", ds)\n" +
                    "insertion_sort(ds)\n" +
                    "print(\"Sau:\", ds)",
                  explanation: 'Lưu phần tử cần chèn (key), dịch các phần tử lớn hơn sang phải, rồi chèn key vào.',
                  output: 'Trước: [5, 2, 4, 6, 1, 3]\nSau: [1, 2, 3, 4, 5, 6]'
                }
              ],
              quiz: [
                {
                  id: 'q2-3-1',
                  question: 'Insertion Sort hoạt động giống hành động nào trong thực tế?',
                  options: ['Tìm đồ vật nhỏ nhất trong hộp', 'Xếp bài vào đúng vị trí khi rút bài', 'Đổi chỗ hai vật liền kề', 'Chia đôi đống bài'],
                  correct_index: 1,
                  explanation: 'Insertion Sort giống như xếp bài: lấy từng lá và chèn vào đúng vị trí trong phần bài đã xếp.'
                },
                {
                  id: 'q2-3-2',
                  question: 'Thuật toán nào hiệu quả nhất khi danh sách GẦN NHƯ ĐÃ sắp xếp?',
                  options: ['Selection Sort', 'Bubble Sort (có flag)', 'Insertion Sort', 'Cả Bubble Sort và Insertion Sort'],
                  correct_index: 3,
                  explanation: 'Cả Bubble Sort (có cờ hiệu) và Insertion Sort đều đạt O(n) khi danh sách gần sắp xếp.'
                }
              ],
              exercises: []
            }
          }
        ]
      },


      // ────────────────────────────────────────────────────────────────────
      // BÀI 3: Thuật toán tìm kiếm
      // ────────────────────────────────────────────────────────────────────
      {
        id: 'bai-3',
        course_id: 'chu-de-5',
        title: 'Thuật toán tìm kiếm',
        slug: 'thuat-toan-tim-kiem',
        description: 'Tìm kiếm tuần tự (Linear Search) và tìm kiếm nhị phân (Binary Search)',
        icon: '🔍',
        color: '#06B6D4',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-3-1',
            module_id: 'bai-3',
            title: 'Tìm kiếm tuần tự (Linear Search)',
            slug: 'tim-kiem-tuan-tu',
            description: 'Duyệt từng phần tử để tìm giá trị cần tìm',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 80,
            is_published: true,
            content: {
              objectives: [
                'Hiểu ý tưởng của tìm kiếm tuần tự',
                'Cài đặt thuật toán tìm kiếm tuần tự',
                'Hiểu độ phức tạp O(n)',
                'Biết khi nào nên dùng tìm kiếm tuần tự'
              ],
              theory:
                "## Tìm kiếm tuần tự (Linear Search)\n\n" +
                "### 1. Ý tưởng\n\n" +
                "Duyệt **lần lượt từng phần tử** trong danh sách, so sánh với giá trị cần tìm (key). Nếu tìm thấy → trả về vị trí. Nếu duyệt hết mà không tìm thấy → trả về -1.\n\n" +
                "### 2. Thuật toán\n\n" +
                "```\n" +
                "Đầu vào: Danh sách ds, giá trị cần tìm key\n" +
                "Đầu ra: Vị trí của key trong ds (hoặc -1)\n\n" +
                "Bước 1: Cho i = 0\n" +
                "Bước 2: Nếu i >= len(ds) → trả về -1 (không tìm thấy)\n" +
                "Bước 3: Nếu ds[i] == key → trả về i\n" +
                "Bước 4: i = i + 1, quay lại Bước 2\n" +
                "```\n\n" +
                "### 3. Đặc điểm\n\n" +
                "- **Ưu điểm:** Đơn giản, hoạt động trên list chưa sắp xếp\n" +
                "- **Nhược điểm:** Chậm với list lớn (O(n))\n" +
                "- **Khi nào dùng:** List nhỏ, list chưa sắp xếp, tìm lần đầu tiên xuất hiện",
              examples: [
                {
                  title: 'Cài đặt tìm kiếm tuần tự',
                  code:
                    "def tim_kiem_tuan_tu(ds, key):\n" +
                    "    for i in range(len(ds)):\n" +
                    "        if ds[i] == key:\n" +
                    "            return i  # Tìm thấy tại vị trí i\n" +
                    "    return -1  # Không tìm thấy\n\n" +
                    "# Kiểm thử\n" +
                    "diem = [7, 3, 9, 1, 5, 8, 2]\n" +
                    "key = 5\n\n" +
                    "vi_tri = tim_kiem_tuan_tu(diem, key)\n" +
                    "if vi_tri != -1:\n" +
                    "    print(f\"Tìm thấy {key} tại vị trí {vi_tri}\")\n" +
                    "else:\n" +
                    "    print(f\"Không tìm thấy {key}\")\n\n" +
                    "# Tìm giá trị không có\n" +
                    "vi_tri2 = tim_kiem_tuan_tu(diem, 100)\n" +
                    "print(f\"Tìm 100: vị trí = {vi_tri2}\")",
                  explanation: 'Duyệt từng phần tử, so sánh với key. Return index nếu thấy, -1 nếu không.',
                  output: 'Tìm thấy 5 tại vị trí 4\nTìm 100: vị trí = -1'
                }
              ],
              quiz: [
                {
                  id: 'q3-1-1',
                  question: 'Độ phức tạp thời gian của tìm kiếm tuần tự là?',
                  options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                  correct_index: 2,
                  explanation: 'Tìm kiếm tuần tự duyệt tối đa n phần tử nên độ phức tạp là O(n).'
                },
                {
                  id: 'q3-1-2',
                  question: 'Tìm kiếm tuần tự yêu cầu danh sách phải được sắp xếp trước không?',
                  options: ['Có, bắt buộc', 'Không cần', 'Chỉ cần sắp xếp một phần', 'Tùy trường hợp'],
                  correct_index: 1,
                  explanation: 'Tìm kiếm tuần tự hoạt động trên bất kỳ danh sách nào, không cần sắp xếp trước.'
                }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-3-2',
            module_id: 'bai-3',
            title: 'Tìm kiếm nhị phân (Binary Search)',
            slug: 'tim-kiem-nhi-phan',
            description: 'Thuật toán chia đôi — nhanh hơn nhiều khi list đã sắp xếp',
            difficulty: 'medium',
            estimated_minutes: 40,
            order_index: 2,
            xp_reward: 120,
            is_published: true,
            content: {
              objectives: [
                'Hiểu ý tưởng "chia đôi" của tìm kiếm nhị phân',
                'Biết điều kiện bắt buộc: danh sách phải được sắp xếp',
                'Cài đặt thuật toán bằng Python',
                'So sánh hiệu quả với tìm kiếm tuần tự: O(log n) vs O(n)'
              ],
              theory:
                "## Tìm kiếm nhị phân (Binary Search)\n\n" +
                "### 1. Ý tưởng\n\n" +
                "**Điều kiện:** Danh sách PHẢI được sắp xếp tăng dần.\n\n" +
                "Thuật toán **chia đôi** vùng tìm kiếm mỗi lần so sánh:\n" +
                "1. So sánh key với phần tử **giữa** (mid)\n" +
                "2. Nếu key == ds[mid] → tìm thấy\n" +
                "3. Nếu key < ds[mid] → tìm ở **nửa trái**\n" +
                "4. Nếu key > ds[mid] → tìm ở **nửa phải**\n\n" +
                "### 2. Minh họa\n\n" +
                "```\n" +
                "Tìm key = 7 trong [1, 3, 5, 7, 9, 11, 13]\n\n" +
                "Bước 1: left=0, right=6, mid=3\n" +
                "        ds[3]=7 == key → Tìm thấy tại vị trí 3!\n" +
                "\n" +
                "Tìm key = 11 trong [1, 3, 5, 7, 9, 11, 13]\n\n" +
                "Bước 1: left=0, right=6, mid=3\n" +
                "        ds[3]=7 < 11 → tìm nửa phải: left=4\n" +
                "Bước 2: left=4, right=6, mid=5\n" +
                "        ds[5]=11 == key → Tìm thấy tại vị trí 5!\n" +
                "```\n\n" +
                "### 3. Độ phức tạp\n\n" +
                "- Thời gian: **O(log n)** — rất nhanh!\n" +
                "- Ví dụ: list 1 triệu phần tử → chỉ cần ~20 phép so sánh\n" +
                "- So sánh: tìm tuần tự cần tối đa 1 triệu phép so sánh\n\n" +
                "### 4. Khi nào dùng?\n\n" +
                "| Tìm kiếm tuần tự | Tìm kiếm nhị phân |\n" +
                "|-------------------|--------------------|\n" +
                "| List chưa sắp xếp | List ĐÃ sắp xếp |\n" +
                "| List nhỏ | List lớn |\n" +
                "| O(n) | O(log n) |",
              examples: [
                {
                  title: 'Cài đặt tìm kiếm nhị phân',
                  code:
                    "def tim_kiem_nhi_phan(ds, key):\n" +
                    "    left = 0\n" +
                    "    right = len(ds) - 1\n\n" +
                    "    while left <= right:\n" +
                    "        mid = (left + right) // 2\n" +
                    "        if ds[mid] == key:\n" +
                    "            return mid\n" +
                    "        elif ds[mid] < key:\n" +
                    "            left = mid + 1  # Tìm nửa phải\n" +
                    "        else:\n" +
                    "            right = mid - 1  # Tìm nửa trái\n\n" +
                    "    return -1  # Không tìm thấy\n\n" +
                    "# Kiểm thử (list PHẢI sắp xếp)\n" +
                    "ds = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]\n" +
                    "print(f\"Tìm 23: vị trí {tim_kiem_nhi_phan(ds, 23)}\")\n" +
                    "print(f\"Tìm 72: vị trí {tim_kiem_nhi_phan(ds, 72)}\")\n" +
                    "print(f\"Tìm 15: vị trí {tim_kiem_nhi_phan(ds, 15)}\")",
                  explanation: 'Dùng hai biến left, right xác định vùng tìm kiếm. Mỗi bước chia đôi vùng tìm kiếm.',
                  output: 'Tìm 23: vị trí 5\nTìm 72: vị trí 9\nTìm 15: vị trí -1'
                }
              ],
              quiz: [
                {
                  id: 'q3-2-1',
                  question: 'Điều kiện BẮT BUỘC để dùng tìm kiếm nhị phân là gì?',
                  options: ['List phải có ít nhất 10 phần tử', 'List phải được sắp xếp', 'List chỉ chứa số nguyên', 'List không có phần tử trùng'],
                  correct_index: 1,
                  explanation: 'Tìm kiếm nhị phân YÊU CẦU danh sách phải được sắp xếp (tăng hoặc giảm) để hoạt động đúng.'
                },
                {
                  id: 'q3-2-2',
                  question: 'Với danh sách 1000 phần tử, tìm kiếm nhị phân cần tối đa bao nhiêu phép so sánh?',
                  options: ['1000', '500', '100', 'Khoảng 10'],
                  correct_index: 3,
                  explanation: 'log₂(1000) ≈ 10. Tìm kiếm nhị phân chỉ cần tối đa khoảng 10 phép so sánh cho 1000 phần tử.'
                },
                {
                  id: 'q3-2-3',
                  question: 'Khi ds[mid] < key trong Binary Search, bước tiếp theo là gì?',
                  options: ['Tìm ở nửa trái (right = mid - 1)', 'Tìm ở nửa phải (left = mid + 1)', 'Kết thúc tìm kiếm', 'Đổi key'],
                  correct_index: 1,
                  explanation: 'Nếu ds[mid] < key, key nằm ở phía phải mid → thu hẹp vùng tìm kiếm: left = mid + 1.'
                }
              ],
              exercises: []
            }
          }
        ]
      },


      // ────────────────────────────────────────────────────────────────────
      // BÀI 4: Kiểu dữ liệu từ điển (Dictionary)
      // ────────────────────────────────────────────────────────────────────
      {
        id: 'bai-4',
        course_id: 'chu-de-5',
        title: 'Kiểu dữ liệu từ điển (Dictionary)',
        slug: 'kieu-du-lieu-tu-dien',
        description: 'Dictionary — cấu trúc dữ liệu key-value mạnh mẽ trong Python',
        icon: '🔑',
        color: '#F59E0B',
        order_index: 4,
        lessons: [
          {
            id: 'lesson-4-1',
            module_id: 'bai-4',
            title: 'Khái niệm và khai báo Dictionary',
            slug: 'khai-niem-dictionary',
            description: 'Dictionary là gì? Cách tạo và truy cập dữ liệu qua key',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm Dictionary và cấu trúc key-value',
                'Biết cách khai báo Dictionary',
                'Truy cập giá trị qua key',
                'Phân biệt Dictionary với List'
              ],
              theory:
                "## Kiểu dữ liệu từ điển (Dictionary)\n\n" +
                "### 1. Khái niệm\n\n" +
                "**Dictionary (dict)** lưu dữ liệu dưới dạng các cặp **key: value** (khóa: giá trị).\n\n" +
                "**Đặc điểm:**\n" +
                "- Truy cập nhanh qua key (không qua index số)\n" +
                "- Key phải là kiểu bất biến (str, int, tuple)\n" +
                "- Key không được trùng lặp\n" +
                "- Value có thể là bất kỳ kiểu dữ liệu nào\n" +
                "- Thay đổi được (mutable)\n\n" +
                "### 2. Khai báo\n\n" +
                "```python\n" +
                "# Cách 1: Dấu ngoặc nhọn {}\n" +
                "hoc_sinh = {\n" +
                "    \"ten\": \"Nguyễn Văn An\",\n" +
                "    \"lop\": \"12A1\",\n" +
                "    \"diem_tb\": 8.5\n" +
                "}\n\n" +
                "# Cách 2: Dict rỗng\n" +
                "d = {}\n\n" +
                "# Cách 3: Dùng dict()\n" +
                "d = dict(ten=\"An\", tuoi=18)\n" +
                "```\n\n" +
                "### 3. Truy cập giá trị\n\n" +
                "```python\n" +
                "# Cách 1: Dùng [key] — lỗi nếu key không tồn tại\n" +
                "print(hoc_sinh[\"ten\"])  # \"Nguyễn Văn An\"\n\n" +
                "# Cách 2: Dùng get() — an toàn, trả về None hoặc default\n" +
                "print(hoc_sinh.get(\"sdt\"))       # None\n" +
                "print(hoc_sinh.get(\"sdt\", \"N/A\"))  # \"N/A\"\n" +
                "```\n\n" +
                "### 4. So sánh List vs Dictionary\n\n" +
                "| Tiêu chí | List | Dictionary |\n" +
                "|----------|------|------------|\n" +
                "| Truy cập qua | Index (số) | Key (tên) |\n" +
                "| Thứ tự | Có | Có (từ Python 3.7+) |\n" +
                "| Tốc độ tìm kiếm | O(n) | O(1) |\n" +
                "| Phù hợp khi | Dữ liệu cùng loại | Dữ liệu có nhãn |",
              examples: [
                {
                  title: 'Tạo và truy cập Dictionary',
                  code:
                    "# Thông tin học sinh\n" +
                    "hs = {\n" +
                    "    \"ten\": \"Trần Thị Bình\",\n" +
                    "    \"lop\": \"12A1\",\n" +
                    "    \"diem\": {\"toan\": 9, \"ly\": 8, \"hoa\": 8.5}\n" +
                    "}\n\n" +
                    "# Truy cập\n" +
                    "print(\"Tên:\", hs[\"ten\"])\n" +
                    "print(\"Lớp:\", hs[\"lop\"])\n" +
                    "print(\"Điểm Toán:\", hs[\"diem\"][\"toan\"])\n\n" +
                    "# Dùng get() an toàn\n" +
                    "print(\"SĐT:\", hs.get(\"sdt\", \"Chưa có\"))",
                  explanation: 'Dict lồng nhau: value của \"diem\" là một dict khác. get() tránh lỗi KeyError.',
                  output: 'Tên: Trần Thị Bình\nLớp: 12A1\nĐiểm Toán: 9\nSĐT: Chưa có'
                }
              ],
              quiz: [
                {
                  id: 'q4-1-1',
                  question: 'Dictionary lưu dữ liệu dưới dạng gì?',
                  options: ['Danh sách có thứ tự', 'Cặp key-value', 'Cây nhị phân', 'Mảng hai chiều'],
                  correct_index: 1,
                  explanation: 'Dictionary lưu trữ dữ liệu dưới dạng các cặp key: value.'
                },
                {
                  id: 'q4-1-2',
                  question: 'Key trong Dictionary có thể là kiểu dữ liệu nào?',
                  options: ['Chỉ string', 'Bất kỳ kiểu bất biến (str, int, tuple)', 'Chỉ số nguyên', 'Bất kỳ kiểu nào'],
                  correct_index: 1,
                  explanation: 'Key phải là kiểu immutable (bất biến): string, int, float, tuple. Không thể dùng list làm key.'
                },
                {
                  id: 'q4-1-3',
                  question: 'Điều gì xảy ra khi dùng dict[key] mà key không tồn tại?',
                  options: ['Trả về None', 'Trả về 0', 'Gây lỗi KeyError', 'Tự tạo key mới'],
                  correct_index: 2,
                  explanation: 'Dùng dict[key] khi key không tồn tại sẽ gây lỗi KeyError. Dùng get() để tránh lỗi này.'
                }
              ],
              exercises: []
            }
          },
          {
            id: 'lesson-4-2',
            module_id: 'bai-4',
            title: 'Thao tác trên Dictionary',
            slug: 'thao-tac-dictionary',
            description: 'Thêm, sửa, xóa và duyệt Dictionary',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 2,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Thêm và cập nhật cặp key-value',
                'Xóa phần tử: del, pop(), clear()',
                'Duyệt Dictionary: keys(), values(), items()',
                'Kiểm tra key tồn tại với toán tử in'
              ],
              theory:
                "## Thao tác trên Dictionary\n\n" +
                "### 1. Thêm và cập nhật\n\n" +
                "```python\n" +
                "d = {\"ten\": \"An\", \"tuoi\": 18}\n\n" +
                "# Thêm key mới\n" +
                "d[\"lop\"] = \"12A1\"\n\n" +
                "# Cập nhật giá trị (key đã tồn tại)\n" +
                "d[\"tuoi\"] = 19\n" +
                "```\n\n" +
                "### 2. Xóa phần tử\n\n" +
                "```python\n" +
                "del d[\"tuoi\"]        # Xóa key \"tuoi\"\n" +
                "d.pop(\"lop\")         # Xóa và trả về giá trị\n" +
                "d.clear()            # Xóa tất cả\n" +
                "```\n\n" +
                "### 3. Duyệt Dictionary\n\n" +
                "```python\n" +
                "hs = {\"ten\": \"An\", \"lop\": \"12A1\", \"diem\": 8.5}\n\n" +
                "# Duyệt keys\n" +
                "for key in hs.keys():\n" +
                "    print(key)\n\n" +
                "# Duyệt values\n" +
                "for value in hs.values():\n" +
                "    print(value)\n\n" +
                "# Duyệt cả key và value\n" +
                "for key, value in hs.items():\n" +
                "    print(f\"{key}: {value}\")\n" +
                "```\n\n" +
                "### 4. Kiểm tra key tồn tại\n\n" +
                "```python\n" +
                "if \"ten\" in hs:\n" +
                "    print(\"Có key 'ten'\")\n" +
                "```",
              examples: [
                {
                  title: 'Quản lý danh bạ học sinh',
                  code:
                    "# Danh bạ lớp\n" +
                    "danh_ba = {}\n\n" +
                    "# Thêm học sinh\n" +
                    "danh_ba[\"An\"] = {\"lop\": \"12A1\", \"diem\": 8.5}\n" +
                    "danh_ba[\"Bình\"] = {\"lop\": \"12A2\", \"diem\": 9.0}\n" +
                    "danh_ba[\"Chi\"] = {\"lop\": \"12A1\", \"diem\": 7.5}\n\n" +
                    "# Duyệt và in\n" +
                    "for ten, info in danh_ba.items():\n" +
                    "    print(f\"{ten} - Lớp {info['lop']} - Điểm: {info['diem']}\")\n\n" +
                    "# Kiểm tra và tìm kiếm\n" +
                    "tim = \"An\"\n" +
                    "if tim in danh_ba:\n" +
                    "    print(f\"\\nTìm thấy {tim}: Điểm {danh_ba[tim]['diem']}\")",
                  explanation: 'Dict lồng dict: mỗi tên ánh xạ tới dict chứa thông tin. Dùng items() để duyệt cả key-value.',
                  output: 'An - Lớp 12A1 - Điểm: 8.5\nBình - Lớp 12A2 - Điểm: 9.0\nChi - Lớp 12A1 - Điểm: 7.5\n\nTìm thấy An: Điểm 8.5'
                }
              ],
              quiz: [
                {
                  id: 'q4-2-1',
                  question: 'Cách nào để kiểm tra key có tồn tại trong dict?',
                  options: ['dict.has(key)', 'key in dict', 'dict.exists(key)', 'dict.contains(key)'],
                  correct_index: 1,
                  explanation: 'Dùng toán tử \"in\" để kiểm tra: if key in dict → True/False.'
                },
                {
                  id: 'q4-2-2',
                  question: 'Phương thức items() trả về gì?',
                  options: ['Chỉ các key', 'Chỉ các value', 'Các cặp (key, value)', 'Số lượng phần tử'],
                  correct_index: 2,
                  explanation: 'items() trả về các cặp (key, value) dưới dạng tuple, dùng để duyệt cả key lẫn value.'
                }
              ],
              exercises: []
            }
          }
        ]
      },


      // ────────────────────────────────────────────────────────────────────
      // BÀI 5: Kiểu dữ liệu tập hợp (Set)
      // ────────────────────────────────────────────────────────────────────
      {
        id: 'bai-5',
        course_id: 'chu-de-5',
        title: 'Kiểu dữ liệu tập hợp (Set)',
        slug: 'kieu-du-lieu-tap-hop',
        description: 'Set — tập hợp không trùng lặp và các phép toán tập hợp',
        icon: '🎯',
        color: '#10B981',
        order_index: 5,
        lessons: [
          {
            id: 'lesson-5-1',
            module_id: 'bai-5',
            title: 'Set và phép toán tập hợp',
            slug: 'set-va-phep-toan-tap-hop',
            description: 'Khái niệm Set, khai báo, và các phép toán hợp, giao, hiệu',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm Set (tập hợp) — không trùng lặp, không có thứ tự',
                'Khai báo và thao tác cơ bản trên Set',
                'Thực hiện các phép toán: hợp, giao, hiệu, hiệu đối xứng',
                'Ứng dụng Set để loại bỏ phần tử trùng lặp'
              ],
              theory:
                "## Kiểu dữ liệu tập hợp (Set)\n\n" +
                "### 1. Khái niệm\n\n" +
                "**Set** là tập hợp các phần tử **không trùng lặp** và **không có thứ tự** xác định.\n\n" +
                "**Đặc điểm:**\n" +
                "- Không có phần tử trùng lặp\n" +
                "- Không có thứ tự (không truy cập qua index)\n" +
                "- Thay đổi được (thêm/xóa phần tử)\n" +
                "- Phần tử phải là kiểu bất biến\n\n" +
                "### 2. Khai báo\n\n" +
                "```python\n" +
                "# Dùng dấu ngoặc nhọn (KHÔNG rỗng)\n" +
                "A = {1, 2, 3, 4, 5}\n" +
                "B = {\"Toán\", \"Lý\", \"Hóa\"}\n\n" +
                "# Set rỗng (PHẢI dùng set(), không dùng {})\n" +
                "C = set()  # {} tạo dict rỗng, không phải set!\n\n" +
                "# Từ list (loại bỏ trùng)\n" +
                "ds = [1, 2, 2, 3, 3, 3]\n" +
                "tap = set(ds)  # {1, 2, 3}\n" +
                "```\n\n" +
                "### 3. Phép toán tập hợp\n\n" +
                "```python\n" +
                "A = {1, 2, 3, 4}\n" +
                "B = {3, 4, 5, 6}\n\n" +
                "# Hợp (Union): tất cả phần tử\n" +
                "print(A | B)      # {1, 2, 3, 4, 5, 6}\n" +
                "print(A.union(B)) # tương tự\n\n" +
                "# Giao (Intersection): phần tử chung\n" +
                "print(A & B)             # {3, 4}\n" +
                "print(A.intersection(B)) # tương tự\n\n" +
                "# Hiệu (Difference): có ở A mà không ở B\n" +
                "print(A - B)            # {1, 2}\n" +
                "print(A.difference(B))  # tương tự\n\n" +
                "# Hiệu đối xứng: không thuộc cả hai\n" +
                "print(A ^ B)  # {1, 2, 5, 6}\n" +
                "```\n\n" +
                "### 4. Thao tác thêm/xóa\n\n" +
                "```python\n" +
                "s = {1, 2, 3}\n" +
                "s.add(4)       # Thêm phần tử\n" +
                "s.remove(2)    # Xóa (lỗi nếu không có)\n" +
                "s.discard(99)  # Xóa (không lỗi nếu không có)\n" +
                "```",
              examples: [
                {
                  title: 'Phép toán tập hợp — Ứng dụng',
                  code:
                    "# Học sinh đăng ký môn thi\n" +
                    "toan = {\"An\", \"Bình\", \"Chi\", \"Dũng\"}\n" +
                    "ly = {\"Bình\", \"Chi\", \"Em\", \"Phúc\"}\n\n" +
                    "# Hợp: tất cả HS đăng ký ít nhất 1 môn\n" +
                    "print(\"Tất cả HS:\", toan | ly)\n\n" +
                    "# Giao: HS đăng ký CẢ HAI môn\n" +
                    "print(\"Đăng ký cả 2:\", toan & ly)\n\n" +
                    "# Hiệu: HS CHỈ đăng ký Toán\n" +
                    "print(\"Chỉ Toán:\", toan - ly)\n\n" +
                    "# Loại trùng từ list\n" +
                    "diem = [8, 9, 8, 7, 9, 10, 7]\n" +
                    "print(\"Các điểm khác nhau:\", sorted(set(diem)))",
                  explanation: 'Set rất hữu ích trong bài toán tập hợp: tìm phần tử chung, riêng, loại trùng lặp.',
                  output: 'Tất cả HS: {\"An\", \"Bình\", \"Chi\", \"Dũng\", \"Em\", \"Phúc\"}\nĐăng ký cả 2: {\"Bình\", \"Chi\"}\nChỉ Toán: {\"An\", \"Dũng\"}\nCác điểm khác nhau: [7, 8, 9, 10]'
                }
              ],
              quiz: [
                {
                  id: 'q5-1-1',
                  question: 'Đặc điểm nào ĐÚNG về Set trong Python?',
                  options: ['Có thứ tự, cho phép trùng', 'Không thứ tự, không trùng', 'Có thứ tự, không trùng', 'Truy cập qua index'],
                  correct_index: 1,
                  explanation: 'Set là tập hợp không có thứ tự (unordered) và không cho phép phần tử trùng lặp.'
                },
                {
                  id: 'q5-1-2',
                  question: 'A = {1,2,3}, B = {2,3,4}. A & B cho kết quả gì?',
                  options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{1}'],
                  correct_index: 1,
                  explanation: 'A & B là phép giao (intersection) — lấy phần tử có ở CẢ HAI tập hợp: {2, 3}.'
                },
                {
                  id: 'q5-1-3',
                  question: 'Cách nào tạo Set rỗng đúng?',
                  options: ['s = {}', 's = set()', 's = set[]', 's = ()'],
                  correct_index: 1,
                  explanation: '{} tạo dict rỗng, không phải set rỗng. Phải dùng set() để tạo set rỗng.'
                }
              ],
              exercises: []
            }
          }
        ]
      },
      // ────────────────────────────────────────────────────────────────────
      // BÀI 6: Thực hành tổng hợp
      // ────────────────────────────────────────────────────────────────────
      {
        id: 'bai-6',
        course_id: 'chu-de-5',
        title: 'Thực hành tổng hợp CTDL và thuật toán',
        slug: 'thuc-hanh-tong-hop',
        description: 'Bài tập tổng hợp: kết hợp List, Dict, Set với sắp xếp và tìm kiếm',
        icon: '🧪',
        color: '#EF4444',
        order_index: 6,
        lessons: [
          {
            id: 'lesson-6-1',
            module_id: 'bai-6',
            title: 'Bài toán thực tế với CTDL',
            slug: 'bai-toan-thuc-te',
            description: 'Áp dụng List, Dict, Set và thuật toán vào bài toán quản lý điểm số',
            difficulty: 'medium',
            estimated_minutes: 45,
            order_index: 1,
            xp_reward: 120,
            is_published: true,
            content: {
              objectives: [
                'Kết hợp nhiều CTDL trong một chương trình',
                'Áp dụng thuật toán sắp xếp vào bài toán thực tế',
                'Viết chương trình quản lý điểm hoàn chỉnh',
                'Rèn luyện tư duy phân tích bài toán'
              ],
              theory:
                "## Thực hành tổng hợp\n\n" +
                "### Bài toán: Quản lý điểm lớp 12A1\n\n" +
                "Viết chương trình quản lý điểm với các chức năng:\n" +
                "1. Lưu trữ thông tin học sinh (dict)\n" +
                "2. Tính điểm trung bình\n" +
                "3. Xếp hạng (sắp xếp)\n" +
                "4. Tìm kiếm học sinh theo tên\n" +
                "5. Thống kê: đạt/không đạt (set)\n\n" +
                "### Phân tích cấu trúc dữ liệu\n\n" +
                "```python\n" +
                "# Mỗi học sinh là một dict\n" +
                "hoc_sinh = {\n" +
                "    \"ten\": \"Nguyễn Văn An\",\n" +
                "    \"diem\": [8, 7, 9, 8, 7]  # List điểm các môn\n" +
                "}\n\n" +
                "# Danh sách lớp là list of dict\n" +
                "lop = [hoc_sinh1, hoc_sinh2, ...]\n\n" +
                "# Thống kê dùng set\n" +
                "dat = set()    # Tập HS đạt\n" +
                "khong_dat = set()  # Tập HS không đạt\n" +
                "```",
              examples: [
                {
                  title: 'Chương trình quản lý điểm',
                  code:
                    "# Dữ liệu lớp 12A1\n" +
                    "lop_12a1 = [\n" +
                    "    {\"ten\": \"An\", \"diem\": [8, 7, 9, 8]},\n" +
                    "    {\"ten\": \"Bình\", \"diem\": [6, 5, 7, 6]},\n" +
                    "    {\"ten\": \"Chi\", \"diem\": [9, 10, 9, 8]},\n" +
                    "    {\"ten\": \"Dũng\", \"diem\": [4, 5, 3, 6]},\n" +
                    "    {\"ten\": \"Em\", \"diem\": [7, 8, 7, 9]},\n" +
                    "]\n\n" +
                    "# 1. Tính điểm TB cho mỗi HS\n" +
                    "for hs in lop_12a1:\n" +
                    "    hs[\"dtb\"] = sum(hs[\"diem\"]) / len(hs[\"diem\"])\n\n" +
                    "# 2. Sắp xếp theo DTB giảm dần\n" +
                    "lop_12a1.sort(key=lambda hs: hs[\"dtb\"], reverse=True)\n\n" +
                    "# 3. In bảng xếp hạng\n" +
                    "print(\"=== BẢNG XẾP HẠNG ===\")\n" +
                    "for i, hs in enumerate(lop_12a1, 1):\n" +
                    "    print(f\"{i}. {hs['ten']:8s} - DTB: {hs['dtb']:.1f}\")\n\n" +
                    "# 4. Thống kê đạt/không đạt (DTB >= 5.0)\n" +
                    "dat = {hs[\"ten\"] for hs in lop_12a1 if hs[\"dtb\"] >= 5.0}\n" +
                    "khong_dat = {hs[\"ten\"] for hs in lop_12a1 if hs[\"dtb\"] < 5.0}\n" +
                    "print(f\"\\nĐạt ({len(dat)}): {dat}\")\n" +
                    "print(f\"Không đạt ({len(khong_dat)}): {khong_dat}\")",
                  explanation: 'Kết hợp list of dict, tính toán, sắp xếp với lambda, và set comprehension để thống kê.',
                  output: '=== BẢNG XẾP HẠNG ===\n1. Chi      - DTB: 9.0\n2. An       - DTB: 8.0\n3. Em       - DTB: 7.8\n4. Bình     - DTB: 6.0\n5. Dũng     - DTB: 4.5\n\nĐạt (4): {\"An\", \"Bình\", \"Chi\", \"Em\"}\nKhông đạt (1): {\"Dũng\"}'
                }
              ],
              quiz: [
                {
                  id: 'q6-1-1',
                  question: 'Để lưu danh sách học sinh với thông tin chi tiết, cấu trúc dữ liệu nào phù hợp nhất?',
                  options: ['List of numbers', 'List of dictionaries', 'Một dictionary duy nhất', 'Một set'],
                  correct_index: 1,
                  explanation: 'List of dict cho phép lưu nhiều HS, mỗi HS là một dict chứa các thông tin (tên, điểm, ...).'
                },
                {
                  id: 'q6-1-2',
                  question: 'Hàm sort() với key=lambda x: x["dtb"] làm gì?',
                  options: ['Sắp xếp theo tên', 'Sắp xếp theo key "dtb" của mỗi phần tử', 'Lọc phần tử', 'Đếm phần tử'],
                  correct_index: 1,
                  explanation: 'key=lambda x: x["dtb"] chỉ định tiêu chí sắp xếp là giá trị của key "dtb" trong mỗi dict.'
                }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  // CHỦ ĐỀ 6: MẠNG MÁY TÍNH VÀ INTERNET
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chu-de-6',
    title: 'Mạng máy tính và Internet',
    slug: 'mang-may-tinh-va-internet',
    description: 'Giao thức mạng, an toàn thông tin, dịch vụ Internet',
    icon: '🌐',
    color: '#8B5CF6',
    order_index: 2,
    is_published: true,
    modules: [
      {
        id: 'bai-7',
        course_id: 'chu-de-6',
        title: 'Giao thức mạng',
        slug: 'giao-thuc-mang',
        description: 'Mô hình TCP/IP, các giao thức phổ biến',
        icon: '🔗',
        color: '#8B5CF6',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-7-1',
            module_id: 'bai-7',
            title: 'Mô hình TCP/IP và giao thức mạng',
            slug: 'mo-hinh-tcp-ip',
            description: 'Hiểu cách Internet hoạt động qua mô hình phân tầng',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 1,
            xp_reward: 90,
            is_published: true,
            content: {
              objectives: [
                'Hiểu mô hình phân tầng TCP/IP (4 tầng)',
                'Biết chức năng của từng tầng',
                'Hiểu vai trò của các giao thức: HTTP, DNS, TCP, IP',
                'Phân biệt địa chỉ IP và tên miền'
              ],
              theory:
                "## Mô hình TCP/IP và giao thức mạng\n\n" +
                "### 1. Giao thức mạng là gì?\n\n" +
                "**Giao thức mạng** là tập hợp các quy tắc và thỏa thuận mà các thiết bị mạng phải tuân theo để có thể giao tiếp với nhau.\n\n" +
                "### 2. Mô hình TCP/IP (4 tầng)\n\n" +
                "| Tầng | Tên | Chức năng | Giao thức |\n" +
                "|------|-----|-----------|----------|\n" +
                "| 4 | Ứng dụng (Application) | Giao tiếp với người dùng | HTTP, FTP, SMTP, DNS |\n" +
                "| 3 | Giao vận (Transport) | Truyền dữ liệu tin cậy | TCP, UDP |\n" +
                "| 2 | Internet | Định tuyến gói tin | IP, ICMP |\n" +
                "| 1 | Truy cập mạng (Network Access) | Truyền bit qua vật lý | Ethernet, Wi-Fi |\n\n" +
                "### 3. Một số giao thức quan trọng\n\n" +
                "**HTTP/HTTPS:** Giao thức truyền tải trang web\n" +
                "- HTTP: HyperText Transfer Protocol\n" +
                "- HTTPS: HTTP + mã hóa SSL/TLS (an toàn hơn)\n\n" +
                "**DNS:** Domain Name System\n" +
                "- Chuyển tên miền (google.com) → địa chỉ IP (142.250.x.x)\n" +
                "- Giống \"danh bạ điện thoại\" của Internet\n\n" +
                "**TCP vs UDP:**\n" +
                "- TCP: Tin cậy, đảm bảo dữ liệu đến đủ và đúng thứ tự (web, email)\n" +
                "- UDP: Nhanh nhưng không đảm bảo (video call, game online)\n\n" +
                "### 4. Địa chỉ IP\n\n" +
                "- **IPv4:** 4 số (0-255), vd: 192.168.1.1\n" +
                "- **IPv6:** 8 nhóm hex, vd: 2001:0db8:85a3::8a2e:0370:7334\n" +
                "- Mỗi thiết bị trên mạng có một IP duy nhất",
              examples: [
                {
                  title: 'Mô phỏng tra cứu DNS bằng Python',
                  code:
                    "# Mô phỏng bảng DNS đơn giản\n" +
                    "dns_table = {\n" +
                    "    \"google.com\": \"142.250.80.46\",\n" +
                    "    \"facebook.com\": \"157.240.1.35\",\n" +
                    "    \"youtube.com\": \"142.250.80.78\",\n" +
                    "    \"vnexpress.net\": \"111.65.248.132\"\n" +
                    "}\n\n" +
                    "def tra_cuu_dns(ten_mien):\n" +
                    "    if ten_mien in dns_table:\n" +
                    "        return dns_table[ten_mien]\n" +
                    "    return \"Không tìm thấy\"\n\n" +
                    "# Thử tra cứu\n" +
                    "domains = [\"google.com\", \"facebook.com\", \"abc.xyz\"]\n" +
                    "for domain in domains:\n" +
                    "    ip = tra_cuu_dns(domain)\n" +
                    "    print(f\"{domain} → {ip}\")",
                  explanation: 'Mô phỏng DNS bằng dictionary: key là tên miền, value là IP. Hàm tra_cuu_dns tìm IP từ tên miền.',
                  output: 'google.com → 142.250.80.46\nfacebook.com → 157.240.1.35\nabc.xyz → Không tìm thấy'
                }
              ],
              quiz: [
                {
                  id: 'q7-1-1',
                  question: 'Mô hình TCP/IP có bao nhiêu tầng?',
                  options: ['3 tầng', '4 tầng', '5 tầng', '7 tầng'],
                  correct_index: 1,
                  explanation: 'Mô hình TCP/IP có 4 tầng: Ứng dụng, Giao vận, Internet, Truy cập mạng.'
                },
                {
                  id: 'q7-1-2',
                  question: 'DNS có chức năng gì?',
                  options: ['Mã hóa dữ liệu', 'Chuyển tên miền thành địa chỉ IP', 'Truyền file', 'Gửi email'],
                  correct_index: 1,
                  explanation: 'DNS (Domain Name System) chuyển đổi tên miền dễ nhớ sang địa chỉ IP số.'
                },
                {
                  id: 'q7-1-3',
                  question: 'Giao thức nào đảm bảo dữ liệu truyền đầy đủ và đúng thứ tự?',
                  options: ['UDP', 'TCP', 'HTTP', 'DNS'],
                  correct_index: 1,
                  explanation: 'TCP (Transmission Control Protocol) đảm bảo dữ liệu truyền tin cậy, đủ và đúng thứ tự.'
                },
                {
                  id: 'q7-1-4',
                  question: 'HTTPS khác HTTP ở điểm nào?',
                  options: ['Nhanh hơn', 'Có mã hóa SSL/TLS', 'Miễn phí', 'Chỉ dùng cho email'],
                  correct_index: 1,
                  explanation: 'HTTPS = HTTP + mã hóa SSL/TLS, giúp bảo mật dữ liệu truyền giữa trình duyệt và server.'
                }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'bai-8',
        course_id: 'chu-de-6',
        title: 'An toàn thông tin trên Internet',
        slug: 'an-toan-thong-tin',
        description: 'Bảo mật, mã hóa, phòng chống mối đe dọa trên mạng',
        icon: '🔒',
        color: '#EF4444',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-8-1',
            module_id: 'bai-8',
            title: 'An toàn thông tin và bảo mật',
            slug: 'an-toan-thong-tin-bao-mat',
            description: 'Các mối đe dọa trên mạng và cách phòng tránh',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 85,
            is_published: true,
            content: {
              objectives: [
                'Nhận biết các mối đe dọa an ninh mạng phổ biến',
                'Hiểu nguyên lý mã hóa cơ bản',
                'Biết cách bảo vệ tài khoản và dữ liệu cá nhân',
                'Hiểu vai trò của tường lửa (firewall)'
              ],
              theory:
                "## An toàn thông tin trên Internet\n\n" +
                "### 1. Các mối đe dọa phổ biến\n\n" +
                "| Mối đe dọa | Mô tả | Phòng tránh |\n" +
                "|-------------|--------|-------------|\n" +
                "| **Malware** | Phần mềm độc hại (virus, trojan, ransomware) | Cài phần mềm diệt virus, không tải file lạ |\n" +
                "| **Phishing** | Giả mạo website/email để lừa lấy thông tin | Kiểm tra URL, không click link lạ |\n" +
                "| **Man-in-the-Middle** | Nghe lén dữ liệu truyền | Dùng HTTPS, VPN |\n" +
                "| **DDoS** | Tấn công từ chối dịch vụ | Tường lửa, CDN |\n" +
                "| **Social Engineering** | Lừa đảo qua kỹ thuật xã hội | Cảnh giác, xác minh |\n\n" +
                "### 2. Mã hóa (Encryption)\n\n" +
                "**Mã hóa đối xứng:** Cùng 1 key để mã hóa và giải mã\n" +
                "- Ví dụ: AES\n" +
                "- Nhanh nhưng khó chia sẻ key an toàn\n\n" +
                "**Mã hóa bất đối xứng:** 2 key (public key + private key)\n" +
                "- Public key: mã hóa (ai cũng có)\n" +
                "- Private key: giải mã (chỉ chủ sở hữu có)\n" +
                "- Ví dụ: RSA, dùng trong HTTPS\n\n" +
                "### 3. Bảo vệ tài khoản\n\n" +
                "- Mật khẩu mạnh: ≥ 12 ký tự, kết hợp chữ HOA, thường, số, ký tự đặc biệt\n" +
                "- Xác thực 2 yếu tố (2FA)\n" +
                "- Không dùng cùng mật khẩu cho nhiều tài khoản\n" +
                "- Cập nhật phần mềm thường xuyên\n\n" +
                "### 4. Tường lửa (Firewall)\n\n" +
                "- Kiểm soát lưu lượng mạng vào/ra\n" +
                "- Chặn truy cập trái phép\n" +
                "- Có thể là phần cứng hoặc phần mềm",
              examples: [
                {
                  title: 'Mô phỏng mã hóa Caesar đơn giản',
                  code:
                    "def ma_hoa_caesar(van_ban, buoc):\n" +
                    "    ket_qua = \"\"\n" +
                    "    for ky_tu in van_ban:\n" +
                    "        if ky_tu.isalpha():\n" +
                    "            base = ord('A') if ky_tu.isupper() else ord('a')\n" +
                    "            ket_qua += chr((ord(ky_tu) - base + buoc) % 26 + base)\n" +
                    "        else:\n" +
                    "            ket_qua += ky_tu\n" +
                    "    return ket_qua\n\n" +
                    "def giai_ma_caesar(ban_ma, buoc):\n" +
                    "    return ma_hoa_caesar(ban_ma, -buoc)\n\n" +
                    "# Thử mã hóa\n" +
                    "goc = \"Hello World\"\n" +
                    "buoc = 3\n" +
                    "ma = ma_hoa_caesar(goc, buoc)\n" +
                    "giai = giai_ma_caesar(ma, buoc)\n\n" +
                    "print(f\"Gốc: {goc}\")\n" +
                    "print(f\"Mã hóa (bước {buoc}): {ma}\")\n" +
                    "print(f\"Giải mã: {giai}\")",
                  explanation: 'Caesar cipher dịch mỗi ký tự một số bước. Đây là mã hóa cổ điển đơn giản nhất, minh họa khái niệm encryption.',
                  output: 'Gốc: Hello World\nMã hóa (bước 3): Khoor Zruog\nGiải mã: Hello World'
                }
              ],
              quiz: [
                {
                  id: 'q8-1-1',
                  question: 'Phishing là hình thức tấn công nào?',
                  options: ['Cài virus vào máy', 'Giả mạo website/email để lừa lấy thông tin', 'Tấn công từ chối dịch vụ', 'Phá khóa mật khẩu'],
                  correct_index: 1,
                  explanation: 'Phishing là giả mạo website hoặc email để lừa người dùng cung cấp thông tin nhạy cảm (mật khẩu, thẻ tín dụng...).'
                },
                {
                  id: 'q8-1-2',
                  question: 'Mã hóa bất đối xứng sử dụng bao nhiêu key?',
                  options: ['1 key', '2 key (public + private)', '3 key', 'Không cần key'],
                  correct_index: 1,
                  explanation: 'Mã hóa bất đối xứng dùng 2 key: public key (mã hóa, ai cũng có) và private key (giải mã, chỉ chủ sở hữu).'
                },
                {
                  id: 'q8-1-3',
                  question: 'Xác thực 2 yếu tố (2FA) giúp gì?',
                  options: ['Tăng tốc đăng nhập', 'Thêm lớp bảo vệ ngoài mật khẩu', 'Mã hóa dữ liệu', 'Chặn virus'],
                  correct_index: 1,
                  explanation: '2FA thêm một lớp xác thực ngoài mật khẩu (SMS, app authenticator...), giúp bảo vệ tài khoản dù mật khẩu bị lộ.'
                }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  // CHỦ ĐỀ 7: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA TRONG MÔI TRƯỜNG SỐ
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chu-de-7',
    title: 'Đạo đức, pháp luật và văn hóa trong môi trường số',
    slug: 'dao-duc-phap-luat-moi-truong-so',
    description: 'Sở hữu trí tuệ, an toàn mạng xã hội, Luật An ninh mạng',
    icon: '⚖️',
    color: '#06B6D4',
    order_index: 3,
    is_published: true,
    modules: [
      {
        id: 'bai-9',
        course_id: 'chu-de-7',
        title: 'Quyền sở hữu trí tuệ trong CNTT',
        slug: 'so-huu-tri-tue',
        description: 'Bản quyền phần mềm, giấy phép mã nguồn mở, Creative Commons',
        icon: '©️',
        color: '#06B6D4',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-9-1',
            module_id: 'bai-9',
            title: 'Bản quyền và sở hữu trí tuệ trong CNTT',
            slug: 'ban-quyen-so-huu-tri-tue',
            description: 'Hiểu về bản quyền phần mềm, nội dung số và trách nhiệm của người dùng',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 70,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm sở hữu trí tuệ trong lĩnh vực CNTT',
                'Phân biệt các loại giấy phép phần mềm',
                'Biết trách nhiệm của người dùng với sản phẩm số',
                'Hiểu Creative Commons và giấy phép mã nguồn mở'
              ],
              theory:
                "## Quyền sở hữu trí tuệ trong CNTT\n\n" +
                "### 1. Sở hữu trí tuệ là gì?\n\n" +
                "Sở hữu trí tuệ (SHTT) là quyền của cá nhân/tổ chức đối với sản phẩm do trí tuệ tạo ra: phần mềm, nội dung số, sáng chế...\n\n" +
                "### 2. Các loại giấy phép phần mềm\n\n" +
                "| Loại | Đặc điểm | Ví dụ |\n" +
                "|------|----------|-------|\n" +
                "| **Phần mềm thương mại** | Trả phí, không được sao chép | Microsoft Office, Adobe |\n" +
                "| **Phần mềm miễn phí (Freeware)** | Miễn phí sử dụng, không được sửa code | WinRAR (miễn phí cá nhân) |\n" +
                "| **Phần mềm mã nguồn mở (Open Source)** | Miễn phí, được xem/sửa code | Linux, Python, Firefox |\n" +
                "| **Shareware** | Dùng thử có thời hạn | Nhiều phần mềm trial |\n\n" +
                "### 3. Creative Commons (CC)\n\n" +
                "Hệ thống giấy phép cho nội dung sáng tạo (ảnh, nhạc, bài viết):\n" +
                "- **CC BY:** Được dùng, cần ghi nguồn\n" +
                "- **CC BY-SA:** Dùng + ghi nguồn + chia sẻ tương tự\n" +
                "- **CC BY-NC:** Dùng + ghi nguồn + không thương mại\n" +
                "- **CC0:** Public domain (tự do hoàn toàn)\n\n" +
                "### 4. Vi phạm bản quyền\n\n" +
                "- Sao chép phần mềm trả phí (crack)\n" +
                "- Copy nội dung không ghi nguồn\n" +
                "- Sử dụng hình ảnh/nhạc có bản quyền\n" +
                "- **Hậu quả:** Phạt tiền, truy cứu hình sự",
              examples: [
                {
                  title: 'Kiểm tra giấy phép khi dùng thư viện Python',
                  code:
                    "# Khi dùng thư viện trong dự án, cần kiểm tra giấy phép\n" +
                    "thu_vien = {\n" +
                    "    \"numpy\": {\"license\": \"BSD\", \"free\": True},\n" +
                    "    \"pandas\": {\"license\": \"BSD\", \"free\": True},\n" +
                    "    \"tensorflow\": {\"license\": \"Apache 2.0\", \"free\": True},\n" +
                    "    \"some_lib\": {\"license\": \"Proprietary\", \"free\": False}\n" +
                    "}\n\n" +
                    "print(\"=== KIỂM TRA GIẤY PHÉP ===\")\n" +
                    "for ten, info in thu_vien.items():\n" +
                    "    trang_thai = \"OK\" if info[\"free\"] else \"CẦN MUA\"\n" +
                    "    print(f\"{ten:12s} | {info['license']:12s} | {trang_thai}\")",
                  explanation: 'Minh họa việc kiểm tra giấy phép thư viện trước khi dùng — thói quen tốt khi lập trình.',
                  output: '=== KIỂM TRA GIẤY PHÉP ===\nnumpy        | BSD          | OK\npandas       | BSD          | OK\ntensorflow   | Apache 2.0   | OK\nsome_lib     | Proprietary  | CẦN MUA'
                }
              ],
              quiz: [
                {
                  id: 'q9-1-1',
                  question: 'Phần mềm mã nguồn mở (Open Source) có đặc điểm gì?',
                  options: ['Phải trả phí', 'Được xem và sửa đổi mã nguồn', 'Không được chia sẻ', 'Chỉ dùng cho cá nhân'],
                  correct_index: 1,
                  explanation: 'Open Source cho phép xem, sửa đổi, phân phối mã nguồn theo điều khoản giấy phép.'
                },
                {
                  id: 'q9-1-2',
                  question: 'Giấy phép CC BY-NC nghĩa là gì?',
                  options: ['Tự do hoàn toàn', 'Được dùng + ghi nguồn + không thương mại', 'Không được sao chép', 'Chỉ dùng ở Việt Nam'],
                  correct_index: 1,
                  explanation: 'CC BY-NC: Attribution (ghi nguồn) + NonCommercial (không được sử dụng cho mục đích thương mại).'
                }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'bai-10',
        course_id: 'chu-de-7',
        title: 'Ứng xử trên môi trường số',
        slug: 'ung-xu-moi-truong-so',
        description: 'An toàn mạng xã hội, phòng chống bắt nạt trực tuyến',
        icon: '💬',
        color: '#F59E0B',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-10-1',
            module_id: 'bai-10',
            title: 'An toàn và ứng xử trên mạng xã hội',
            slug: 'an-toan-mang-xa-hoi',
            description: 'Quy tắc ứng xử, nhận biết tin giả, phòng chống cyberbullying',
            difficulty: 'easy',
            estimated_minutes: 25,
            order_index: 1,
            xp_reward: 70,
            is_published: true,
            content: {
              objectives: [
                'Biết các nguyên tắc ứng xử văn minh trên mạng',
                'Nhận biết tin giả (fake news) và cách xác minh',
                'Hiểu về cyberbullying và cách phòng tránh',
                'Bảo vệ thông tin cá nhân trên mạng xã hội'
              ],
              theory:
                "## An toàn và ứng xử trên mạng xã hội\n\n" +
                "### 1. Nguyên tắc ứng xử văn minh\n\n" +
                "- **Tôn trọng:** Không xúc phạm, phân biệt đối xử\n" +
                "- **Trung thực:** Không phát tán thông tin sai lệch\n" +
                "- **Trách nhiệm:** Chịu trách nhiệm với nội dung đăng tải\n" +
                "- **Riêng tư:** Tôn trọng quyền riêng tư của người khác\n\n" +
                "### 2. Nhận biết tin giả (Fake News)\n\n" +
                "**Dấu hiệu:**\n" +
                "- Tiêu đề giật gân, gây sốc\n" +
                "- Nguồn không rõ ràng, không có tác giả\n" +
                "- Không có bằng chứng cụ thể\n" +
                "- Lỗi chính tả, ngữ pháp nhiều\n\n" +
                "**Cách xác minh:**\n" +
                "- Kiểm tra nguồn (source)\n" +
                "- Tìm kiếm trên nhiều nguồn uy tín\n" +
                "- Kiểm tra ngày đăng\n" +
                "- Dùng công cụ fact-check\n\n" +
                "### 3. Cyberbullying (Bắt nạt trực tuyến)\n\n" +
                "**Hình thức:**\n" +
                "- Gửi tin nhắn đe dọa, lăng mạ\n" +
                "- Phát tán ảnh/video cá nhân\n" +
                "- Tẩy chay, cô lập trên mạng\n" +
                "- Giả mạo tài khoản\n\n" +
                "**Cách phòng tránh:**\n" +
                "- Không trả lời kẻ bắt nạt\n" +
                "- Chụp màn hình làm bằng chứng\n" +
                "- Báo cáo và chặn\n" +
                "- Nói với người lớn tin tưởng\n\n" +
                "### 4. Bảo vệ thông tin cá nhân\n\n" +
                "- Không chia sẻ: địa chỉ nhà, số điện thoại, thông tin tài chính\n" +
                "- Kiểm tra quyền riêng tư trên mạng xã hội\n" +
                "- Cẩn thận với yêu cầu kết bạn từ người lạ\n" +
                "- Không đăng nhập tài khoản trên thiết bị công cộng",
              examples: [
                {
                  title: 'Chương trình kiểm tra độ mạnh mật khẩu',
                  code:
                    "def kiem_tra_mat_khau(mk):\n" +
                    "    diem = 0\n" +
                    "    phan_hoi = []\n\n" +
                    "    # Kiểm tra độ dài\n" +
                    "    if len(mk) >= 12:\n" +
                    "        diem += 2\n" +
                    "    elif len(mk) >= 8:\n" +
                    "        diem += 1\n" +
                    "    else:\n" +
                    "        phan_hoi.append(\"Quá ngắn (cần >= 8 ký tự)\")\n\n" +
                    "    # Kiểm tra chữ hoa\n" +
                    "    if any(c.isupper() for c in mk):\n" +
                    "        diem += 1\n" +
                    "    else:\n" +
                    "        phan_hoi.append(\"Thiếu chữ hoa\")\n\n" +
                    "    # Kiểm tra số\n" +
                    "    if any(c.isdigit() for c in mk):\n" +
                    "        diem += 1\n" +
                    "    else:\n" +
                    "        phan_hoi.append(\"Thiếu số\")\n\n" +
                    "    # Kiểm tra ký tự đặc biệt\n" +
                    "    if any(c in \"!@#$%^&*()\" for c in mk):\n" +
                    "        diem += 1\n" +
                    "    else:\n" +
                    "        phan_hoi.append(\"Thiếu ký tự đặc biệt\")\n\n" +
                    "    # Đánh giá\n" +
                    "    if diem >= 5:\n" +
                    "        muc = \"MẠNH\"\n" +
                    "    elif diem >= 3:\n" +
                    "        muc = \"TRUNG BÌNH\"\n" +
                    "    else:\n" +
                    "        muc = \"YẾU\"\n\n" +
                    "    return muc, phan_hoi\n\n" +
                    "# Thử kiểm tra\n" +
                    "mat_khau_test = [\"abc123\", \"MyPassword1\", \"Str0ng!Pass#2024\"]\n" +
                    "for mk in mat_khau_test:\n" +
                    "    muc, gop_y = kiem_tra_mat_khau(mk)\n" +
                    "    print(f\"{mk:20s} → {muc}\")\n" +
                    "    for g in gop_y:\n" +
                    "        print(f\"  ⚠ {g}\")",
                  explanation: 'Chương trình chấm điểm mật khẩu dựa trên tiêu chí: độ dài, chữ hoa, số, ký tự đặc biệt.',
                  output: 'abc123               → YẾU\n  ⚠ Quá ngắn (cần >= 8 ký tự)\n  ⚠ Thiếu chữ hoa\n  ⚠ Thiếu ký tự đặc biệt\nMyPassword1          → TRUNG BÌNH\n  ⚠ Thiếu ký tự đặc biệt\nStr0ng!Pass#2024     → MẠNH'
                }
              ],
              quiz: [
                {
                  id: 'q10-1-1',
                  question: 'Dấu hiệu nào cho thấy tin tức có thể là tin giả?',
                  options: ['Có tác giả rõ ràng', 'Tiêu đề giật gân, nguồn không rõ', 'Đăng trên trang chính phủ', 'Có nhiều bình luận'],
                  correct_index: 1,
                  explanation: 'Tin giả thường có tiêu đề giật gân, gây sốc, nguồn không rõ ràng, thiếu bằng chứng cụ thể.'
                },
                {
                  id: 'q10-1-2',
                  question: 'Khi bị cyberbullying, KHÔNG nên làm gì?',
                  options: ['Chụp bằng chứng', 'Báo cáo với người lớn', 'Trả đũa lại bằng lời lẽ xúc phạm', 'Chặn kẻ bắt nạt'],
                  correct_index: 2,
                  explanation: 'Trả đũa bằng lời lẽ xúc phạm sẽ leo thang tình huống. Nên chụp bằng chứng, chặn, và báo cáo.'
                }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  // CHỦ ĐỀ 8: HƯỚNG NGHIỆP VỚI TIN HỌC
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chu-de-8',
    title: 'Hướng nghiệp với Tin học',
    slug: 'huong-nghiep-tin-hoc',
    description: 'Các ngành nghề CNTT, kỹ năng cần thiết, lộ trình phát triển',
    icon: '🎓',
    color: '#F59E0B',
    order_index: 4,
    is_published: true,
    modules: [
      {
        id: 'bai-11',
        course_id: 'chu-de-8',
        title: 'Các ngành nghề trong CNTT',
        slug: 'nganh-nghe-cntt',
        description: 'Tìm hiểu các lĩnh vực nghề nghiệp trong Công nghệ Thông tin',
        icon: '💼',
        color: '#F59E0B',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-11-1',
            module_id: 'bai-11',
            title: 'Ngành nghề và cơ hội trong CNTT',
            slug: 'nganh-nghe-co-hoi-cntt',
            description: 'Tổng quan về các lĩnh vực nghề nghiệp trong CNTT hiện nay',
            difficulty: 'easy',
            estimated_minutes: 30,
            order_index: 1,
            xp_reward: 75,
            is_published: true,
            content: {
              objectives: [
                'Biết các lĩnh vực chính trong ngành CNTT',
                'Hiểu yêu cầu kỹ năng của từng lĩnh vực',
                'Biết mức thu nhập tham khảo',
                'Xác định được lĩnh vực phù hợp với bản thân'
              ],
              theory:
                "## Ngành nghề và cơ hội trong CNTT\n\n" +
                "### 1. Các lĩnh vực chính\n\n" +
                "| # | Lĩnh vực | Mô tả | Kỹ năng cần |\n" +
                "|---|----------|--------|-------------|\n" +
                "| 1 | **Phát triển phần mềm** | Lập trình web, mobile, desktop | Python, JavaScript, Java |\n" +
                "| 2 | **Khoa học dữ liệu** | Phân tích dữ liệu, Machine Learning | Python, SQL, Statistics |\n" +
                "| 3 | **An ninh mạng** | Bảo vệ hệ thống, chống tấn công | Networking, Linux, Security |\n" +
                "| 4 | **DevOps/Cloud** | Vận hành hệ thống, triển khai | AWS, Docker, Kubernetes |\n" +
                "| 5 | **Trí tuệ nhân tạo** | Xây dựng hệ thống AI/ML | Math, Python, Deep Learning |\n" +
                "| 6 | **Game Development** | Phát triển trò chơi | C++, Unity, Unreal |\n" +
                "| 7 | **UI/UX Design** | Thiết kế giao diện người dùng | Figma, Design Thinking |\n\n" +
                "### 2. Lộ trình học tập\n\n" +
                "```\n" +
                "Lớp 12 → Đại học/Cao đẳng CNTT → Thực tập → Kỹ sư/Chuyên gia\n" +
                "     ↘ Tự học (online) → Freelance → Startup\n" +
                "```\n\n" +
                "### 3. Kỹ năng chung cần có\n\n" +
                "- **Tư duy logic** và giải quyết vấn đề\n" +
                "- **Tiếng Anh** (đọc tài liệu, giao tiếp)\n" +
                "- **Tự học** liên tục (công nghệ thay đổi nhanh)\n" +
                "- **Làm việc nhóm** và giao tiếp\n" +
                "- **Quản lý thời gian** và dự án\n\n" +
                "### 4. Xu hướng tuyển dụng 2024-2030\n\n" +
                "- AI/ML Engineer: Nhu cầu tăng mạnh\n" +
                "- Cybersecurity: Thiếu hụt nhân lực lớn\n" +
                "- Full-stack Developer: Ổn định, nhiều cơ hội\n" +
                "- Data Engineer: Dữ liệu là \"dầu mỏ\" mới",
              examples: [
                {
                  title: 'Chương trình gợi ý nghề nghiệp đơn giản',
                  code:
                    "def goi_y_nghe(so_thich):\n" +
                    "    nghe_nghiep = {\n" +
                    "        \"lap_trinh\": \"Phát triển phần mềm (Developer)\",\n" +
                    "        \"du_lieu\": \"Khoa học dữ liệu (Data Scientist)\",\n" +
                    "        \"bao_mat\": \"An ninh mạng (Security Engineer)\",\n" +
                    "        \"thiet_ke\": \"Thiết kế UI/UX (Designer)\",\n" +
                    "        \"game\": \"Phát triển game (Game Dev)\",\n" +
                    "        \"ai\": \"Trí tuệ nhân tạo (AI Engineer)\"\n" +
                    "    }\n" +
                    "    return nghe_nghiep.get(so_thich, \"Chưa xác định\")\n\n" +
                    "# Khảo sát sở thích\n" +
                    "cau_hoi = [\n" +
                    "    (\"lap_trinh\", \"Bạn thích viết code và xây dựng sản phẩm?\"),\n" +
                    "    (\"du_lieu\", \"Bạn thích phân tích số liệu?\"),\n" +
                    "    (\"ai\", \"Bạn đam mê toán và muốn tạo AI?\"),\n" +
                    "]\n\n" +
                    "print(\"=== GỢI Ý NGHỀ NGHIỆP ===\")\n" +
                    "for key, mota in cau_hoi:\n" +
                    "    print(f\"\\n❓ {mota}\")\n" +
                    "    print(f\"   → Phù hợp: {goi_y_nghe(key)}\")",
                  explanation: 'Dùng dictionary để ánh xạ sở thích → ngành nghề phù hợp. Minh họa cách dùng dict trong thực tế.',
                  output: '=== GỢI Ý NGHỀ NGHIỆP ===\n\n❓ Bạn thích viết code và xây dựng sản phẩm?\n   → Phù hợp: Phát triển phần mềm (Developer)\n\n❓ Bạn thích phân tích số liệu?\n   → Phù hợp: Khoa học dữ liệu (Data Scientist)\n\n❓ Bạn đam mê toán và muốn tạo AI?\n   → Phù hợp: Trí tuệ nhân tạo (AI Engineer)'
                }
              ],
              quiz: [
                {
                  id: 'q11-1-1',
                  question: 'Kỹ năng nào QUAN TRỌNG NHẤT cho mọi lĩnh vực CNTT?',
                  options: ['Chỉ cần giỏi code', 'Tư duy logic và giải quyết vấn đề', 'Thiết kế đẹp', 'Nhớ nhiều lệnh'],
                  correct_index: 1,
                  explanation: 'Tư duy logic và giải quyết vấn đề là nền tảng cho mọi lĩnh vực CNTT, quan trọng hơn cả việc nhớ cú pháp.'
                },
                {
                  id: 'q11-1-2',
                  question: 'Lĩnh vực nào đang có nhu cầu tuyển dụng tăng mạnh nhất?',
                  options: ['Sửa máy tính', 'AI/ML và Cybersecurity', 'Thiết kế poster', 'Nhập liệu'],
                  correct_index: 1,
                  explanation: 'AI/Machine Learning và An ninh mạng (Cybersecurity) đang là hai lĩnh vực có nhu cầu nhân lực cao nhất.'
                }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  // CHUYÊN ĐỀ: NÂNG CAO (Cho HS chuyên / thi HSG)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chuyen-de',
    title: 'Chuyên đề nâng cao',
    slug: 'chuyen-de-nang-cao',
    description: 'Đệ quy, OOP, xử lý file — kiến thức nâng cao cho HS chuyên',
    icon: '🚀',
    color: '#EC4899',
    order_index: 5,
    is_published: true,
    modules: [
      {
        id: 'cd-1',
        course_id: 'chuyen-de',
        title: 'Đệ quy và ứng dụng',
        slug: 'de-quy-va-ung-dung',
        description: 'Hàm đệ quy, bài toán Fibonacci, tháp Hà Nội',
        icon: '🔁',
        color: '#EC4899',
        order_index: 1,
        lessons: [
          {
            id: 'lesson-cd1-1',
            module_id: 'cd-1',
            title: 'Hàm đệ quy',
            slug: 'ham-de-quy',
            description: 'Khái niệm đệ quy, điều kiện dừng, và các bài toán kinh điển',
            difficulty: 'hard',
            estimated_minutes: 40,
            order_index: 1,
            xp_reward: 130,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm hàm đệ quy (hàm gọi chính nó)',
                'Xác định điều kiện dừng (base case)',
                'Giải bài toán giai thừa và Fibonacci bằng đệ quy',
                'Hiểu ưu nhược điểm của đệ quy'
              ],
              theory:
                "## Hàm đệ quy\n\n" +
                "### 1. Khái niệm\n\n" +
                "**Đệ quy** là kỹ thuật lập trình trong đó hàm **gọi lại chính nó** để giải quyết bài toán.\n\n" +
                "**Hai thành phần bắt buộc:**\n" +
                "- **Điều kiện dừng (Base case):** Trường hợp đơn giản nhất, không cần gọi đệ quy\n" +
                "- **Bước đệ quy (Recursive case):** Gọi lại hàm với input nhỏ hơn\n\n" +
                "### 2. Ví dụ: Giai thừa\n\n" +
                "```\n" +
                "n! = n × (n-1) × (n-2) × ... × 1\n" +
                "5! = 5 × 4! = 5 × 4 × 3! = ... = 120\n\n" +
                "Điều kiện dừng: 0! = 1, 1! = 1\n" +
                "Bước đệ quy: n! = n × (n-1)!\n" +
                "```\n\n" +
                "### 3. Ví dụ: Fibonacci\n\n" +
                "```\n" +
                "F(0) = 0, F(1) = 1\n" +
                "F(n) = F(n-1) + F(n-2)  với n >= 2\n\n" +
                "Dãy: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...\n" +
                "```\n\n" +
                "### 4. Ưu nhược điểm\n\n" +
                "| Ưu điểm | Nhược điểm |\n" +
                "|----------|------------|\n" +
                "| Code ngắn gọn, dễ hiểu | Có thể chậm (gọi lặp nhiều lần) |\n" +
                "| Phù hợp bài toán có cấu trúc đệ quy | Tốn bộ nhớ (stack) |\n" +
                "| Dễ chứng minh đúng đắn | Có thể bị stack overflow |",
              examples: [
                {
                  title: 'Giai thừa và Fibonacci đệ quy',
                  code:
                    "# Giai thừa\n" +
                    "def giai_thua(n):\n" +
                    "    if n <= 1:        # Điều kiện dừng\n" +
                    "        return 1\n" +
                    "    return n * giai_thua(n - 1)  # Bước đệ quy\n\n" +
                    "# Fibonacci\n" +
                    "def fibonacci(n):\n" +
                    "    if n <= 0:\n" +
                    "        return 0\n" +
                    "    if n == 1:\n" +
                    "        return 1\n" +
                    "    return fibonacci(n-1) + fibonacci(n-2)\n\n" +
                    "# Kiểm thử\n" +
                    "print(f\"5! = {giai_thua(5)}\")\n" +
                    "print(f\"10! = {giai_thua(10)}\")\n\n" +
                    "print(\"\\nDãy Fibonacci (10 số đầu):\")\n" +
                    "for i in range(10):\n" +
                    "    print(fibonacci(i), end=\" \")",
                  explanation: 'Cả hai hàm đều có điều kiện dừng (base case) và bước gọi lại chính nó (recursive case).',
                  output: '5! = 120\n10! = 3628800\n\nDãy Fibonacci (10 số đầu):\n0 1 1 2 3 5 8 13 21 34'
                }
              ],
              quiz: [
                {
                  id: 'qcd1-1',
                  question: 'Thành phần BẮT BUỘC trong hàm đệ quy là gì?',
                  options: ['Vòng lặp for', 'Điều kiện dừng (base case)', 'Biến toàn cục', 'List'],
                  correct_index: 1,
                  explanation: 'Hàm đệ quy BẮT BUỘC có điều kiện dừng, nếu không sẽ gọi vô hạn và gây stack overflow.'
                },
                {
                  id: 'qcd1-2',
                  question: 'Giá trị của giai_thua(0) theo định nghĩa đệ quy là bao nhiêu?',
                  options: ['0', '1', 'Lỗi', 'Không xác định'],
                  correct_index: 1,
                  explanation: '0! = 1 theo quy ước toán học. Đây là điều kiện dừng của hàm giai_thua.'
                }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'cd-2',
        course_id: 'chuyen-de',
        title: 'Lập trình hướng đối tượng (OOP)',
        slug: 'lap-trinh-huong-doi-tuong',
        description: 'Class, Object, kế thừa trong Python',
        icon: '🧩',
        color: '#6366F1',
        order_index: 2,
        lessons: [
          {
            id: 'lesson-cd2-1',
            module_id: 'cd-2',
            title: 'Class và Object trong Python',
            slug: 'class-va-object',
            description: 'Khái niệm OOP, tạo class, khởi tạo object',
            difficulty: 'hard',
            estimated_minutes: 45,
            order_index: 1,
            xp_reward: 140,
            is_published: true,
            content: {
              objectives: [
                'Hiểu khái niệm Class (lớp) và Object (đối tượng)',
                'Tạo class với __init__ và phương thức',
                'Hiểu thuộc tính (attribute) và phương thức (method)',
                'Tạo nhiều object từ một class'
              ],
              theory:
                "## Lập trình hướng đối tượng (OOP)\n\n" +
                "### 1. Khái niệm\n\n" +
                "- **Class (Lớp):** Khuôn mẫu/bản thiết kế cho đối tượng\n" +
                "- **Object (Đối tượng):** Thực thể cụ thể được tạo từ class\n" +
                "- **Attribute (Thuộc tính):** Dữ liệu của đối tượng\n" +
                "- **Method (Phương thức):** Hành vi/chức năng của đối tượng\n\n" +
                "**Ví dụ thực tế:**\n" +
                "- Class \"Học sinh\" → Object: \"An\", \"Bình\", \"Chi\"\n" +
                "- Class \"Xe\" → Object: \"Toyota\", \"Honda\"\n\n" +
                "### 2. Cú pháp tạo Class\n\n" +
                "```python\n" +
                "class HocSinh:\n" +
                "    def __init__(self, ten, lop, diem):\n" +
                "        self.ten = ten      # Thuộc tính\n" +
                "        self.lop = lop\n" +
                "        self.diem = diem\n\n" +
                "    def xep_loai(self):     # Phương thức\n" +
                "        if self.diem >= 8:\n" +
                "            return \"Giỏi\"\n" +
                "        elif self.diem >= 6.5:\n" +
                "            return \"Khá\"\n" +
                "        else:\n" +
                "            return \"Trung bình\"\n" +
                "```\n\n" +
                "### 3. Tạo Object\n\n" +
                "```python\n" +
                "# Tạo object (gọi class như hàm)\n" +
                "hs1 = HocSinh(\"An\", \"12A1\", 8.5)\n" +
                "hs2 = HocSinh(\"Bình\", \"12A2\", 7.0)\n\n" +
                "# Sử dụng\n" +
                "print(hs1.ten)         # An\n" +
                "print(hs1.xep_loai())  # Giỏi\n" +
                "```",
              examples: [
                {
                  title: 'Tạo Class quản lý học sinh',
                  code:
                    "class HocSinh:\n" +
                    "    def __init__(self, ten, lop, diem):\n" +
                    "        self.ten = ten\n" +
                    "        self.lop = lop\n" +
                    "        self.diem = diem\n\n" +
                    "    def xep_loai(self):\n" +
                    "        if self.diem >= 8:\n" +
                    "            return \"Giỏi\"\n" +
                    "        elif self.diem >= 6.5:\n" +
                    "            return \"Khá\"\n" +
                    "        elif self.diem >= 5:\n" +
                    "            return \"Trung bình\"\n" +
                    "        else:\n" +
                    "            return \"Yếu\"\n\n" +
                    "    def hien_thi(self):\n" +
                    "        return f\"{self.ten} ({self.lop}) - Điểm: {self.diem} - {self.xep_loai()}\"\n\n" +
                    "# Tạo danh sách học sinh\n" +
                    "ds_hs = [\n" +
                    "    HocSinh(\"An\", \"12A1\", 8.5),\n" +
                    "    HocSinh(\"Bình\", \"12A1\", 7.0),\n" +
                    "    HocSinh(\"Chi\", \"12A1\", 4.5),\n" +
                    "    HocSinh(\"Dũng\", \"12A1\", 9.2),\n" +
                    "]\n\n" +
                    "print(\"=== DANH SÁCH LỚP 12A1 ===\")\n" +
                    "for hs in ds_hs:\n" +
                    "    print(hs.hien_thi())\n\n" +
                    "# Thống kê\n" +
                    "gioi = sum(1 for hs in ds_hs if hs.xep_loai() == \"Giỏi\")\n" +
                    "print(f\"\\nSố HS giỏi: {gioi}/{len(ds_hs)}\")",
                  explanation: 'Class HocSinh có __init__ (khởi tạo), xep_loai() và hien_thi() là phương thức. Tạo list các object.',
                  output: '=== DANH SÁCH LỚP 12A1 ===\nAn (12A1) - Điểm: 8.5 - Giỏi\nBình (12A1) - Điểm: 7.0 - Khá\nChi (12A1) - Điểm: 4.5 - Yếu\nDũng (12A1) - Điểm: 9.2 - Giỏi\n\nSố HS giỏi: 2/4'
                }
              ],
              quiz: [
                {
                  id: 'qcd2-1',
                  question: '__init__ trong Python là gì?',
                  options: ['Hàm hủy', 'Hàm khởi tạo (constructor)', 'Hàm sắp xếp', 'Hàm in ra'],
                  correct_index: 1,
                  explanation: '__init__ là constructor — tự động chạy khi tạo object mới, dùng để khởi tạo thuộc tính.'
                },
                {
                  id: 'qcd2-2',
                  question: 'self trong phương thức của class đại diện cho gì?',
                  options: ['Class', 'Object hiện tại đang gọi phương thức', 'Biến toàn cục', 'Module'],
                  correct_index: 1,
                  explanation: 'self là tham chiếu đến object hiện tại, cho phép truy cập thuộc tính và phương thức của chính object đó.'
                }
              ],
              exercises: []
            }
          }
        ]
      },
      {
        id: 'cd-3',
        course_id: 'chuyen-de',
        title: 'Xử lý file và ngoại lệ',
        slug: 'xu-ly-file-va-ngoai-le',
        description: 'Đọc/ghi file, xử lý lỗi try-except',
        icon: '📄',
        color: '#14B8A6',
        order_index: 3,
        lessons: [
          {
            id: 'lesson-cd3-1',
            module_id: 'cd-3',
            title: 'Đọc ghi file và xử lý ngoại lệ',
            slug: 'doc-ghi-file',
            description: 'Làm việc với file văn bản và xử lý lỗi runtime',
            difficulty: 'medium',
            estimated_minutes: 35,
            order_index: 1,
            xp_reward: 110,
            is_published: true,
            content: {
              objectives: [
                'Mở, đọc, ghi file văn bản trong Python',
                'Hiểu các mode: r, w, a',
                'Sử dụng try-except để xử lý lỗi',
                'Dùng with...as để quản lý file an toàn'
              ],
              theory:
                "## Đọc ghi file và xử lý ngoại lệ\n\n" +
                "### 1. Mở file\n\n" +
                "```python\n" +
                "# Cú pháp\n" +
                "f = open(\"ten_file.txt\", mode)\n\n" +
                "# Các mode phổ biến\n" +
                "# \"r\" - Đọc (mặc định), lỗi nếu file không tồn tại\n" +
                "# \"w\" - Ghi (tạo mới/ghi đè)\n" +
                "# \"a\" - Ghi thêm vào cuối\n" +
                "# \"r+\" - Đọc và ghi\n" +
                "```\n\n" +
                "### 2. Đọc file\n\n" +
                "```python\n" +
                "# Cách 1: Đọc toàn bộ\n" +
                "noi_dung = f.read()\n\n" +
                "# Cách 2: Đọc từng dòng\n" +
                "dong = f.readline()\n\n" +
                "# Cách 3: Đọc tất cả dòng thành list\n" +
                "ds_dong = f.readlines()\n" +
                "```\n\n" +
                "### 3. Dùng with...as (khuyến khích)\n\n" +
                "```python\n" +
                "# Tự động đóng file khi xong\n" +
                "with open(\"data.txt\", \"r\") as f:\n" +
                "    noi_dung = f.read()\n" +
                "    # Không cần gọi f.close()\n" +
                "```\n\n" +
                "### 4. Xử lý ngoại lệ (try-except)\n\n" +
                "```python\n" +
                "try:\n" +
                "    # Code có thể gây lỗi\n" +
                "    f = open(\"abc.txt\", \"r\")\n" +
                "except FileNotFoundError:\n" +
                "    print(\"File không tồn tại!\")\n" +
                "except Exception as e:\n" +
                "    print(f\"Lỗi: {e}\")\n" +
                "finally:\n" +
                "    print(\"Luôn chạy dù có lỗi hay không\")\n" +
                "```\n\n" +
                "### 5. Một số lỗi thường gặp\n\n" +
                "| Lỗi | Nguyên nhân |\n" +
                "|------|-------------|\n" +
                "| FileNotFoundError | File không tồn tại |\n" +
                "| ValueError | Chuyển đổi kiểu sai |\n" +
                "| ZeroDivisionError | Chia cho 0 |\n" +
                "| IndexError | Truy cập index ngoài range |\n" +
                "| KeyError | Key không có trong dict |",
              examples: [
                {
                  title: 'Mô phỏng đọc/ghi file và xử lý lỗi',
                  code:
                    "# Mô phỏng xử lý ngoại lệ\n" +
                    "def chia(a, b):\n" +
                    "    try:\n" +
                    "        ket_qua = a / b\n" +
                    "        return ket_qua\n" +
                    "    except ZeroDivisionError:\n" +
                    "        return \"Lỗi: Không thể chia cho 0!\"\n" +
                    "    except TypeError:\n" +
                    "        return \"Lỗi: Kiểu dữ liệu không hợp lệ!\"\n\n" +
                    "# Test cases\n" +
                    "print(f\"10 / 2 = {chia(10, 2)}\")\n" +
                    "print(f\"10 / 0 = {chia(10, 0)}\")\n" +
                    "print(f\"'a' / 2 = {chia('a', 2)}\")\n\n" +
                    "# Mô phỏng đọc dữ liệu\n" +
                    "du_lieu = \"An,8.5\\nBình,7.0\\nChi,9.2\"\n" +
                    "print(\"\\n=== Đọc dữ liệu ===\")\n" +
                    "for dong in du_lieu.split(\"\\n\"):\n" +
                    "    ten, diem = dong.split(\",\")\n" +
                    "    print(f\"{ten}: {float(diem)}\")",
                  explanation: 'try-except bắt lỗi cụ thể. Mô phỏng đọc dữ liệu CSV đơn giản bằng split().',
                  output: '10 / 2 = 5.0\n10 / 0 = Lỗi: Không thể chia cho 0!\n\'a\' / 2 = Lỗi: Kiểu dữ liệu không hợp lệ!\n\n=== Đọc dữ liệu ===\nAn: 8.5\nBình: 7.0\nChi: 9.2'
                }
              ],
              quiz: [
                {
                  id: 'qcd3-1',
                  question: 'Mode "w" khi mở file sẽ làm gì?',
                  options: ['Đọc file', 'Ghi mới (xóa nội dung cũ)', 'Ghi thêm vào cuối', 'Đọc và ghi'],
                  correct_index: 1,
                  explanation: 'Mode "w" (write) tạo file mới hoặc GHI ĐÈ nội dung cũ. Cẩn thận vì sẽ mất dữ liệu cũ!'
                },
                {
                  id: 'qcd3-2',
                  question: 'Khối finally trong try-except có đặc điểm gì?',
                  options: ['Chỉ chạy khi có lỗi', 'Chỉ chạy khi không lỗi', 'LUÔN chạy dù có lỗi hay không', 'Không bao giờ chạy'],
                  correct_index: 2,
                  explanation: 'finally LUÔN được thực thi, bất kể có exception hay không. Thường dùng để dọn dẹp tài nguyên.'
                }
              ],
              exercises: []
            }
          }
        ]
      }
    ]
  }
];



// ============================================================================
// BADGES
// ============================================================================
export const badges: Badge[] = [
  { id: 'badge-1', name: 'Nhập môn List', slug: 'nhap-mon-list', description: 'Hoàn thành bài Kiểu dữ liệu danh sách', icon: '📋', color: '#3B82F6', requirement: 'bai_1_completed', xp_reward: 100 },
  { id: 'badge-2', name: 'Bậc thầy sắp xếp', slug: 'bac-thay-sap-xep', description: 'Hoàn thành bài Thuật toán sắp xếp', icon: '🔄', color: '#8B5CF6', requirement: 'bai_2_completed', xp_reward: 150 },
  { id: 'badge-3', name: 'Thợ săn dữ liệu', slug: 'tho-san-du-lieu', description: 'Hoàn thành bài Thuật toán tìm kiếm', icon: '🔍', color: '#06B6D4', requirement: 'bai_3_completed', xp_reward: 150 },
  { id: 'badge-4', name: 'Chuyên gia Dictionary', slug: 'chuyen-gia-dict', description: 'Hoàn thành bài Kiểu dữ liệu từ điển', icon: '🔑', color: '#F59E0B', requirement: 'bai_4_completed', xp_reward: 120 },
  { id: 'badge-5', name: 'Mạng thủ', slug: 'mang-thu', description: 'Hoàn thành Chủ đề Mạng máy tính', icon: '🌐', color: '#8B5CF6', requirement: 'chu_de_6_completed', xp_reward: 200 },
  { id: 'badge-6', name: 'Công dân số', slug: 'cong-dan-so', description: 'Hoàn thành Chủ đề Đạo đức & Pháp luật', icon: '⚖️', color: '#06B6D4', requirement: 'chu_de_7_completed', xp_reward: 150 },
  { id: 'badge-7', name: 'Đệ quy master', slug: 'de-quy-master', description: 'Hoàn thành chuyên đề Đệ quy', icon: '🔁', color: '#EC4899', requirement: 'cd_1_completed', xp_reward: 250 },
  { id: 'badge-8', name: 'OOP Warrior', slug: 'oop-warrior', description: 'Hoàn thành chuyên đề OOP', icon: '🧩', color: '#6366F1', requirement: 'cd_2_completed', xp_reward: 250 },
  { id: 'badge-9', name: '7 Ngày Liên Tiếp', slug: '7-ngay-lien-tiep', description: 'Học 7 ngày liên tiếp', icon: '🔥', color: '#EF4444', requirement: 'maintain_7_day_streak', xp_reward: 75 },
  { id: 'badge-10', name: 'Code đầu tiên', slug: 'code-dau-tien', description: 'Chạy chương trình Python đầu tiên', icon: '👶', color: '#10B981', requirement: 'first_code_run', xp_reward: 30 }
];

// ============================================================================
// FLASHCARDS
// ============================================================================
export const flashcards: Flashcard[] = [
  // Chủ đề 5: List, Sort, Search, Dict, Set
  { id: 'fc-1', term: 'List trong Python được khai báo bằng gì?', definition: 'Dấu ngoặc vuông []', category: 'chu-de-5', difficulty: 'easy' },
  { id: 'fc-2', term: 'Chỉ số phần tử đầu tiên trong list là bao nhiêu?', definition: '0 (bắt đầu từ 0)', category: 'chu-de-5', difficulty: 'easy' },
  { id: 'fc-3', term: 'append() dùng để làm gì?', definition: 'Thêm phần tử vào cuối list', category: 'chu-de-5', difficulty: 'easy' },
  { id: 'fc-4', term: 'Độ phức tạp của Selection Sort là gì?', definition: 'O(n²) trong mọi trường hợp', category: 'chu-de-5', difficulty: 'medium' },
  { id: 'fc-5', term: 'Bubble Sort tối ưu dùng gì để dừng sớm?', definition: 'Cờ hiệu (flag) — nếu không đổi chỗ thì dừng', category: 'chu-de-5', difficulty: 'medium' },
  { id: 'fc-6', term: 'Insertion Sort hoạt động giống hành động nào?', definition: 'Xếp bài — chèn từng lá vào đúng vị trí', category: 'chu-de-5', difficulty: 'medium' },
  { id: 'fc-7', term: 'Điều kiện bắt buộc của Binary Search là gì?', definition: 'Danh sách phải được sắp xếp', category: 'chu-de-5', difficulty: 'medium' },
  { id: 'fc-8', term: 'Độ phức tạp của Binary Search là?', definition: 'O(log n)', category: 'chu-de-5', difficulty: 'medium' },
  { id: 'fc-9', term: 'Dictionary truy cập dữ liệu qua gì?', definition: 'Key (khóa), không phải index', category: 'chu-de-5', difficulty: 'easy' },
  { id: 'fc-10', term: 'Set có cho phép phần tử trùng lặp không?', definition: 'Không — Set chỉ chứa phần tử duy nhất', category: 'chu-de-5', difficulty: 'easy' },
  { id: 'fc-11', term: 'A & B trong Set là phép gì?', definition: 'Phép giao (intersection) — phần tử chung', category: 'chu-de-5', difficulty: 'easy' },
  { id: 'fc-12', term: 'A | B trong Set là phép gì?', definition: 'Phép hợp (union) — tất cả phần tử', category: 'chu-de-5', difficulty: 'easy' },
  // Chủ đề 6: Mạng
  { id: 'fc-13', term: 'TCP/IP có bao nhiêu tầng?', definition: '4 tầng: Ứng dụng, Giao vận, Internet, Truy cập mạng', category: 'chu-de-6', difficulty: 'medium' },
  { id: 'fc-14', term: 'DNS là viết tắt của gì?', definition: 'Domain Name System — chuyển tên miền thành IP', category: 'chu-de-6', difficulty: 'easy' },
  { id: 'fc-15', term: 'HTTPS khác HTTP ở điểm gì?', definition: 'Có mã hóa SSL/TLS — an toàn hơn', category: 'chu-de-6', difficulty: 'easy' },
  { id: 'fc-16', term: 'TCP khác UDP ở điểm gì?', definition: 'TCP tin cậy (đảm bảo đủ dữ liệu), UDP nhanh nhưng không đảm bảo', category: 'chu-de-6', difficulty: 'medium' },
  { id: 'fc-17', term: 'Phishing là hình thức tấn công gì?', definition: 'Giả mạo website/email để lừa lấy thông tin', category: 'chu-de-6', difficulty: 'easy' },
  { id: 'fc-18', term: 'Mã hóa bất đối xứng dùng bao nhiêu key?', definition: '2 key: Public key (mã hóa) + Private key (giải mã)', category: 'chu-de-6', difficulty: 'medium' },
  // Chủ đề 7 & 8
  { id: 'fc-19', term: 'CC BY-NC nghĩa là gì?', definition: 'Được dùng + ghi nguồn + không thương mại', category: 'chu-de-7', difficulty: 'easy' },
  { id: 'fc-20', term: 'Open Source nghĩa là gì?', definition: 'Mã nguồn mở — được xem, sửa, phân phối theo giấy phép', category: 'chu-de-7', difficulty: 'easy' },
  // Chuyên đề
  { id: 'fc-21', term: 'Đệ quy BẮT BUỘC phải có gì?', definition: 'Điều kiện dừng (base case)', category: 'chuyen-de', difficulty: 'medium' },
  { id: 'fc-22', term: '__init__ trong class Python là gì?', definition: 'Constructor — hàm khởi tạo, chạy tự động khi tạo object', category: 'chuyen-de', difficulty: 'medium' },
  { id: 'fc-23', term: 'self trong Python OOP đại diện cho gì?', definition: 'Object hiện tại đang gọi phương thức', category: 'chuyen-de', difficulty: 'medium' },
  { id: 'fc-24', term: 'Mode "w" khi mở file làm gì?', definition: 'Ghi mới — xóa nội dung cũ hoặc tạo file mới', category: 'chuyen-de', difficulty: 'easy' },
  { id: 'fc-25', term: 'finally trong try-except có đặc điểm gì?', definition: 'LUÔN chạy dù có lỗi hay không', category: 'chuyen-de', difficulty: 'easy' }
];

// ============================================================================
// EXERCISES (bài tập thực hành)
// ============================================================================
export const exercises: Exercise[] = [
  // --- BÀI 1: List ---
  {
    id: 'ex-1',
    lesson_id: 'lesson-1-1',
    title: 'Tính tổng và trung bình danh sách',
    description: 'Cho danh sách số nguyên, tính tổng và trung bình cộng',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "ds = [4, 8, 15, 16, 23, 42]\n\n# Tính tổng\ntong = sum(ds)\nprint(\"Tổng:\", tong)\n\n# Tính trung bình\ntb = tong / len(ds)\nprint(f\"Trung bình: {tb:.2f}\")",
    solution_code: "ds = [4, 8, 15, 16, 23, 42]\ntong = sum(ds)\ntb = tong / len(ds)\nprint(\"Tổng:\", tong)\nprint(f\"Trung bình: {tb:.2f}\")",
    hints: ['Dùng sum() để tính tổng, len() để đếm số phần tử'],
    test_cases: [{ input: '', expected_output: 'Tổng: 108\nTrung bình: 18.00', is_hidden: false }]
  },
  {
    id: 'ex-2',
    lesson_id: 'lesson-1-2',
    title: 'Tìm phần tử lớn nhất (không dùng max)',
    description: 'Viết chương trình tìm phần tử lớn nhất trong danh sách mà KHÔNG dùng hàm max()',
    difficulty: 'easy',
    xp_reward: 60,
    starter_code: "ds = [3, 7, 2, 9, 4, 1, 8]\n\n# Tìm max không dùng hàm max()\nlon_nhat = ds[0]\nfor so in ds:\n    if so > lon_nhat:\n        lon_nhat = so\n\nprint(\"Phần tử lớn nhất:\", lon_nhat)",
    solution_code: "ds = [3, 7, 2, 9, 4, 1, 8]\nlon_nhat = ds[0]\nfor so in ds:\n    if so > lon_nhat:\n        lon_nhat = so\nprint(\"Phần tử lớn nhất:\", lon_nhat)",
    hints: ['Giả sử phần tử đầu tiên là lớn nhất, rồi duyệt so sánh với từng phần tử'],
    test_cases: [{ input: '', expected_output: 'Phần tử lớn nhất: 9', is_hidden: false }]
  },
  {
    id: 'ex-3',
    lesson_id: 'lesson-1-2',
    title: 'Đếm số chẵn và số lẻ',
    description: 'Đếm số lượng số chẵn và số lẻ trong danh sách',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "ds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\nchan = 0\nle = 0\nfor so in ds:\n    if so % 2 == 0:\n        chan += 1\n    else:\n        le += 1\n\nprint(f\"Số chẵn: {chan}\")\nprint(f\"Số lẻ: {le}\")",
    solution_code: "ds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nchan = sum(1 for x in ds if x % 2 == 0)\nle = len(ds) - chan\nprint(f\"Số chẵn: {chan}\")\nprint(f\"Số lẻ: {le}\")",
    hints: ['Dùng % 2 == 0 để kiểm tra chẵn'],
    test_cases: [{ input: '', expected_output: 'Số chẵn: 5\nSố lẻ: 5', is_hidden: false }]
  },
  // --- BÀI 2: Sắp xếp ---
  {
    id: 'ex-4',
    lesson_id: 'lesson-2-1',
    title: 'Cài đặt Selection Sort',
    description: 'Hoàn thành hàm selection_sort để sắp xếp danh sách tăng dần',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def selection_sort(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        vi_tri_min = i\n        for j in range(i + 1, n):\n            if ds[j] < ds[vi_tri_min]:\n                vi_tri_min = j\n        ds[i], ds[vi_tri_min] = ds[vi_tri_min], ds[i]\n    return ds\n\nds = [64, 34, 25, 12, 22, 11, 90]\nprint(\"Trước:\", ds)\nselection_sort(ds)\nprint(\"Sau:\", ds)",
    solution_code: "def selection_sort(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        vi_tri_min = i\n        for j in range(i + 1, n):\n            if ds[j] < ds[vi_tri_min]:\n                vi_tri_min = j\n        ds[i], ds[vi_tri_min] = ds[vi_tri_min], ds[i]\n    return ds\n\nds = [64, 34, 25, 12, 22, 11, 90]\nprint(\"Trước:\", ds)\nselection_sort(ds)\nprint(\"Sau:\", ds)",
    hints: ['Vòng ngoài chọn vị trí i, vòng trong tìm min trong đoạn [i+1, n-1], rồi đổi chỗ'],
    test_cases: [{ input: '', expected_output: 'Trước: [64, 34, 25, 12, 22, 11, 90]\nSau: [11, 12, 22, 25, 34, 64, 90]', is_hidden: false }]
  },
  {
    id: 'ex-5',
    lesson_id: 'lesson-2-2',
    title: 'Cài đặt Bubble Sort có tối ưu',
    description: 'Cài đặt Bubble Sort với cờ hiệu để dừng sớm khi đã sắp xếp',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def bubble_sort(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        da_doi = False\n        for j in range(n - 1 - i):\n            if ds[j] > ds[j + 1]:\n                ds[j], ds[j + 1] = ds[j + 1], ds[j]\n                da_doi = True\n        if not da_doi:\n            break\n    return ds\n\nds = [5, 1, 4, 2, 8]\nprint(\"Trước:\", ds)\nbubble_sort(ds)\nprint(\"Sau:\", ds)",
    solution_code: "def bubble_sort(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        da_doi = False\n        for j in range(n - 1 - i):\n            if ds[j] > ds[j + 1]:\n                ds[j], ds[j + 1] = ds[j + 1], ds[j]\n                da_doi = True\n        if not da_doi:\n            break\n    return ds\n\nds = [5, 1, 4, 2, 8]\nprint(\"Trước:\", ds)\nbubble_sort(ds)\nprint(\"Sau:\", ds)",
    hints: ['Cờ da_doi = False trước mỗi lượt. Nếu sau lượt mà da_doi vẫn False → dừng'],
    test_cases: [{ input: '', expected_output: 'Trước: [5, 1, 4, 2, 8]\nSau: [1, 2, 4, 5, 8]', is_hidden: false }]
  },
  // --- BÀI 3: Tìm kiếm ---
  {
    id: 'ex-6',
    lesson_id: 'lesson-3-1',
    title: 'Tìm kiếm tuần tự',
    description: 'Cài đặt hàm tìm kiếm tuần tự, trả về vị trí phần tử',
    difficulty: 'easy',
    xp_reward: 60,
    starter_code: "def tim_kiem(ds, key):\n    for i in range(len(ds)):\n        if ds[i] == key:\n            return i\n    return -1\n\ndiem = [7, 3, 9, 1, 5, 8]\nprint(f\"Tìm 5: vị trí {tim_kiem(diem, 5)}\")\nprint(f\"Tìm 6: vị trí {tim_kiem(diem, 6)}\")",
    solution_code: "def tim_kiem(ds, key):\n    for i in range(len(ds)):\n        if ds[i] == key:\n            return i\n    return -1\n\ndiem = [7, 3, 9, 1, 5, 8]\nprint(f\"Tìm 5: vị trí {tim_kiem(diem, 5)}\")\nprint(f\"Tìm 6: vị trí {tim_kiem(diem, 6)}\")",
    hints: ['Duyệt từng phần tử, so sánh với key, trả về index nếu bằng'],
    test_cases: [{ input: '', expected_output: 'Tìm 5: vị trí 4\nTìm 6: vị trí -1', is_hidden: false }]
  },
  {
    id: 'ex-7',
    lesson_id: 'lesson-3-2',
    title: 'Tìm kiếm nhị phân',
    description: 'Cài đặt thuật toán tìm kiếm nhị phân trên danh sách đã sắp xếp',
    difficulty: 'medium',
    xp_reward: 90,
    starter_code: "def binary_search(ds, key):\n    left = 0\n    right = len(ds) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if ds[mid] == key:\n            return mid\n        elif ds[mid] < key:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nds = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(f\"Tìm 23: vị trí {binary_search(ds, 23)}\")\nprint(f\"Tìm 15: vị trí {binary_search(ds, 15)}\")",
    solution_code: "def binary_search(ds, key):\n    left = 0\n    right = len(ds) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if ds[mid] == key:\n            return mid\n        elif ds[mid] < key:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nds = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(f\"Tìm 23: vị trí {binary_search(ds, 23)}\")\nprint(f\"Tìm 15: vị trí {binary_search(ds, 15)}\")",
    hints: ['Tính mid = (left+right)//2, so sánh ds[mid] với key để thu hẹp vùng tìm'],
    test_cases: [{ input: '', expected_output: 'Tìm 23: vị trí 5\nTìm 15: vị trí -1', is_hidden: false }]
  },
  // --- BÀI 4: Dictionary ---
  {
    id: 'ex-8',
    lesson_id: 'lesson-4-1',
    title: 'Đếm tần suất ký tự',
    description: 'Dùng dictionary đếm số lần xuất hiện của mỗi ký tự trong chuỗi',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code: "chuoi = \"hello world\"\n\ntan_suat = {}\nfor ky_tu in chuoi:\n    if ky_tu != \" \":\n        if ky_tu in tan_suat:\n            tan_suat[ky_tu] += 1\n        else:\n            tan_suat[ky_tu] = 1\n\nprint(\"Tần suất ký tự:\")\nfor k, v in sorted(tan_suat.items()):\n    print(f\"  '{k}': {v}\")",
    solution_code: "chuoi = \"hello world\"\ntan_suat = {}\nfor ky_tu in chuoi:\n    if ky_tu != \" \":\n        tan_suat[ky_tu] = tan_suat.get(ky_tu, 0) + 1\nprint(\"Tần suất ký tự:\")\nfor k, v in sorted(tan_suat.items()):\n    print(f\"  '{k}': {v}\")",
    hints: ['Duyệt từng ký tự, dùng dict.get(key, 0) + 1 để đếm'],
    test_cases: [{ input: '', expected_output: "Tần suất ký tự:\n  'd': 1\n  'e': 1\n  'h': 1\n  'l': 3\n  'o': 2\n  'r': 1\n  'w': 1", is_hidden: false }]
  },
  // --- BÀI 5: Set ---
  {
    id: 'ex-9',
    lesson_id: 'lesson-5-1',
    title: 'Loại bỏ trùng lặp và phép toán tập hợp',
    description: 'Dùng Set để loại trùng và tìm phần tử chung giữa hai danh sách',
    difficulty: 'easy',
    xp_reward: 60,
    starter_code: "ds1 = [1, 2, 3, 4, 5, 3, 2, 1]\nds2 = [4, 5, 6, 7, 8, 5, 6]\n\n# Loại trùng\nset1 = set(ds1)\nset2 = set(ds2)\nprint(\"Set 1:\", sorted(set1))\nprint(\"Set 2:\", sorted(set2))\n\n# Phần tử chung\nchung = set1 & set2\nprint(\"Chung:\", sorted(chung))\n\n# Chỉ có ở ds1\nrieng_1 = set1 - set2\nprint(\"Chỉ ds1:\", sorted(rieng_1))",
    solution_code: "ds1 = [1, 2, 3, 4, 5, 3, 2, 1]\nds2 = [4, 5, 6, 7, 8, 5, 6]\nset1 = set(ds1)\nset2 = set(ds2)\nprint(\"Set 1:\", sorted(set1))\nprint(\"Set 2:\", sorted(set2))\nchung = set1 & set2\nprint(\"Chung:\", sorted(chung))\nrieng_1 = set1 - set2\nprint(\"Chỉ ds1:\", sorted(rieng_1))",
    hints: ['Dùng set() để loại trùng, & cho giao, - cho hiệu'],
    test_cases: [{ input: '', expected_output: 'Set 1: [1, 2, 3, 4, 5]\nSet 2: [4, 5, 6, 7, 8]\nChung: [4, 5]\nChỉ ds1: [1, 2, 3]', is_hidden: false }]
  },
  // --- Chuyên đề: Đệ quy ---
  {
    id: 'ex-10',
    lesson_id: 'lesson-cd1-1',
    title: 'Tính giai thừa bằng đệ quy',
    description: 'Viết hàm đệ quy tính n! (giai thừa của n)',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def giai_thua(n):\n    if n <= 1:\n        return 1\n    return n * giai_thua(n - 1)\n\n# Test\nfor i in range(6):\n    print(f\"{i}! = {giai_thua(i)}\")",
    solution_code: "def giai_thua(n):\n    if n <= 1:\n        return 1\n    return n * giai_thua(n - 1)\n\nfor i in range(6):\n    print(f\"{i}! = {giai_thua(i)}\")",
    hints: ['Base case: 0! = 1! = 1. Recursive: n! = n * (n-1)!'],
    test_cases: [{ input: '', expected_output: '0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120', is_hidden: false }]
  }
];
