import { Exercise } from '@/types';

// ============================================================================
// 100+ BÀI TẬP THỰC HÀNH THEO TỪNG CHƯƠNG
// SGK Tin học 12 — Cánh Diều (Khoa học máy tính)
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// CHƯƠNG 1: KIỂU DỮ LIỆU DANH SÁCH (LIST) — 20 bài
// ─────────────────────────────────────────────────────────────────────────────

export const listExercises: Exercise[] = [
  {
    id: 'list-01',
    lesson_id: 'lesson-1-1',
    title: 'Tính tổng các phần tử',
    description: 'Cho danh sách số nguyên, tính tổng tất cả phần tử (KHÔNG dùng sum())',
    difficulty: 'easy',
    xp_reward: 40,
    starter_code: "ds = [3, 7, 2, 8, 1, 9, 4]\n\ntong = 0\nfor so in ds:\n    tong += so\n\nprint(\"Tổng:\", tong)",
    solution_code: "ds = [3, 7, 2, 8, 1, 9, 4]\ntong = 0\nfor so in ds:\n    tong += so\nprint(\"Tổng:\", tong)",
    hints: ['Khởi tạo biến tong = 0, duyệt và cộng dồn từng phần tử'],
    test_cases: [{ input: '', expected_output: 'Tổng: 34', is_hidden: false }]
  },
  {
    id: 'list-02',
    lesson_id: 'lesson-1-1',
    title: 'Tìm phần tử lớn nhất và nhỏ nhất',
    description: 'Tìm giá trị lớn nhất và nhỏ nhất trong danh sách (KHÔNG dùng max/min)',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "ds = [15, 3, 27, 8, 42, 1, 19]\n\nlon_nhat = ds[0]\nnho_nhat = ds[0]\nfor so in ds:\n    if so > lon_nhat:\n        lon_nhat = so\n    if so < nho_nhat:\n        nho_nhat = so\n\nprint(\"Max:\", lon_nhat)\nprint(\"Min:\", nho_nhat)",
    solution_code: "ds = [15, 3, 27, 8, 42, 1, 19]\nlon_nhat = ds[0]\nnho_nhat = ds[0]\nfor so in ds:\n    if so > lon_nhat:\n        lon_nhat = so\n    if so < nho_nhat:\n        nho_nhat = so\nprint(\"Max:\", lon_nhat)\nprint(\"Min:\", nho_nhat)",
    hints: ['Giả sử phần tử đầu là max/min, duyệt so sánh cập nhật'],
    test_cases: [{ input: '', expected_output: 'Max: 42\nMin: 1', is_hidden: false }]
  },
  {
    id: 'list-03',
    lesson_id: 'lesson-1-1',
    title: 'Đếm số dương, số âm, số 0',
    description: 'Đếm số lượng phần tử dương, âm và bằng 0 trong danh sách',
    difficulty: 'easy',
    xp_reward: 40,
    starter_code: "ds = [5, -3, 0, 8, -1, 0, 7, -2, 4]\n\nduong = am = khong = 0\nfor so in ds:\n    if so > 0:\n        duong += 1\n    elif so < 0:\n        am += 1\n    else:\n        khong += 1\n\nprint(f\"Dương: {duong}\")\nprint(f\"Âm: {am}\")\nprint(f\"Bằng 0: {khong}\")",
    solution_code: "ds = [5, -3, 0, 8, -1, 0, 7, -2, 4]\nduong = am = khong = 0\nfor so in ds:\n    if so > 0:\n        duong += 1\n    elif so < 0:\n        am += 1\n    else:\n        khong += 1\nprint(f\"Dương: {duong}\")\nprint(f\"Âm: {am}\")\nprint(f\"Bằng 0: {khong}\")",
    hints: ['Dùng if/elif/else để phân loại mỗi phần tử'],
    test_cases: [{ input: '', expected_output: 'Dương: 4\nÂm: 3\nBằng 0: 2', is_hidden: false }]
  },
  {
    id: 'list-04',
    lesson_id: 'lesson-1-1',
    title: 'Đảo ngược danh sách',
    description: 'Đảo ngược thứ tự danh sách KHÔNG dùng reverse() hay slicing [::-1]',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "ds = [1, 2, 3, 4, 5]\n\n# Đảo ngược bằng swap\nn = len(ds)\nfor i in range(n // 2):\n    ds[i], ds[n-1-i] = ds[n-1-i], ds[i]\n\nprint(\"Kết quả:\", ds)",
    solution_code: "ds = [1, 2, 3, 4, 5]\nn = len(ds)\nfor i in range(n // 2):\n    ds[i], ds[n-1-i] = ds[n-1-i], ds[i]\nprint(\"Kết quả:\", ds)",
    hints: ['Hoán đổi phần tử đầu với cuối, tiến dần vào giữa'],
    test_cases: [{ input: '', expected_output: 'Kết quả: [5, 4, 3, 2, 1]', is_hidden: false }]
  },
  {
    id: 'list-05',
    lesson_id: 'lesson-1-2',
    title: 'Loại bỏ phần tử trùng lặp (giữ thứ tự)',
    description: 'Loại bỏ phần tử trùng, giữ nguyên thứ tự xuất hiện đầu tiên',
    difficulty: 'medium',
    xp_reward: 70,
    starter_code: "ds = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\n\nket_qua = []\nfor x in ds:\n    if x not in ket_qua:\n        ket_qua.append(x)\n\nprint(\"Gốc:\", ds)\nprint(\"Sau loại trùng:\", ket_qua)",
    solution_code: "ds = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\nket_qua = []\nfor x in ds:\n    if x not in ket_qua:\n        ket_qua.append(x)\nprint(\"Gốc:\", ds)\nprint(\"Sau loại trùng:\", ket_qua)",
    hints: ['Duyệt list gốc, chỉ thêm vào kết quả nếu chưa có'],
    test_cases: [{ input: '', expected_output: 'Gốc: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\nSau loại trùng: [3, 1, 4, 5, 9, 2, 6]', is_hidden: false }]
  },
  {
    id: 'list-06',
    lesson_id: 'lesson-1-2',
    title: 'Tách số chẵn và lẻ',
    description: 'Tách danh sách thành 2 list: một chứa số chẵn, một chứa số lẻ',
    difficulty: 'easy',
    xp_reward: 40,
    starter_code: "ds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\nchan = []\nle = []\nfor so in ds:\n    if so % 2 == 0:\n        chan.append(so)\n    else:\n        le.append(so)\n\nprint(\"Chẵn:\", chan)\nprint(\"Lẻ:\", le)",
    solution_code: "ds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nchan = [x for x in ds if x % 2 == 0]\nle = [x for x in ds if x % 2 != 0]\nprint(\"Chẵn:\", chan)\nprint(\"Lẻ:\", le)",
    hints: ['Dùng % 2 == 0 kiểm tra chẵn, append vào list tương ứng'],
    test_cases: [{ input: '', expected_output: 'Chẵn: [2, 4, 6, 8, 10]\nLẻ: [1, 3, 5, 7, 9]', is_hidden: false }]
  },
  {
    id: 'list-07',
    lesson_id: 'lesson-1-2',
    title: 'Tính điểm trung bình lớp',
    description: 'Cho danh sách điểm, tính TB, đếm HS giỏi (>=8) và yếu (<5)',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "diem = [8, 6, 9, 4, 7, 3, 10, 5, 8, 6]\n\ntb = sum(diem) / len(diem)\ngioi = sum(1 for d in diem if d >= 8)\nyeu = sum(1 for d in diem if d < 5)\n\nprint(f\"Điểm TB: {tb:.1f}\")\nprint(f\"Giỏi (>=8): {gioi} HS\")\nprint(f\"Yếu (<5): {yeu} HS\")",
    solution_code: "diem = [8, 6, 9, 4, 7, 3, 10, 5, 8, 6]\ntb = sum(diem) / len(diem)\ngioi = sum(1 for d in diem if d >= 8)\nyeu = sum(1 for d in diem if d < 5)\nprint(f\"Điểm TB: {tb:.1f}\")\nprint(f\"Giỏi (>=8): {gioi} HS\")\nprint(f\"Yếu (<5): {yeu} HS\")",
    hints: ['TB = sum/len, dùng generator expression đếm điều kiện'],
    test_cases: [{ input: '', expected_output: 'Điểm TB: 6.6\nGiỏi (>=8): 4 HS\nYếu (<5): 2 HS', is_hidden: false }]
  },
  {
    id: 'list-08',
    lesson_id: 'lesson-1-2',
    title: 'Gộp 2 danh sách đã sắp xếp',
    description: 'Gộp 2 list đã sắp xếp tăng dần thành 1 list sắp xếp tăng dần',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "a = [1, 3, 5, 7, 9]\nb = [2, 4, 6, 8, 10]\n\nket_qua = []\ni = j = 0\nwhile i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        ket_qua.append(a[i])\n        i += 1\n    else:\n        ket_qua.append(b[j])\n        j += 1\nket_qua += a[i:]\nket_qua += b[j:]\n\nprint(\"Kết quả:\", ket_qua)",
    solution_code: "a = [1, 3, 5, 7, 9]\nb = [2, 4, 6, 8, 10]\nket_qua = []\ni = j = 0\nwhile i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        ket_qua.append(a[i])\n        i += 1\n    else:\n        ket_qua.append(b[j])\n        j += 1\nket_qua += a[i:]\nket_qua += b[j:]\nprint(\"Kết quả:\", ket_qua)",
    hints: ['Dùng 2 con trỏ i, j, so sánh và thêm phần tử nhỏ hơn vào kết quả'],
    test_cases: [{ input: '', expected_output: 'Kết quả: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', is_hidden: false }]
  },
  {
    id: 'list-09',
    lesson_id: 'lesson-1-2',
    title: 'Tìm phần tử xuất hiện nhiều nhất',
    description: 'Tìm phần tử có tần suất xuất hiện cao nhất trong danh sách',
    difficulty: 'medium',
    xp_reward: 70,
    starter_code: "ds = [1, 3, 2, 3, 4, 3, 2, 1, 3, 2]\n\n# Đếm tần suất\nmax_val = ds[0]\nmax_count = 0\nfor x in set(ds):\n    count = ds.count(x)\n    if count > max_count:\n        max_count = count\n        max_val = x\n\nprint(f\"Phần tử xuất hiện nhiều nhất: {max_val} ({max_count} lần)\")",
    solution_code: "ds = [1, 3, 2, 3, 4, 3, 2, 1, 3, 2]\nmax_val = ds[0]\nmax_count = 0\nfor x in set(ds):\n    count = ds.count(x)\n    if count > max_count:\n        max_count = count\n        max_val = x\nprint(f\"Phần tử xuất hiện nhiều nhất: {max_val} ({max_count} lần)\")",
    hints: ['Duyệt set(ds) để lấy các giá trị duy nhất, count() đếm từng giá trị'],
    test_cases: [{ input: '', expected_output: 'Phần tử xuất hiện nhiều nhất: 3 (4 lần)', is_hidden: false }]
  },
  {
    id: 'list-10',
    lesson_id: 'lesson-1-1',
    title: 'Kiểm tra danh sách palindrome',
    description: 'Kiểm tra xem danh sách có đối xứng (đọc xuôi = đọc ngược) không',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "ds1 = [1, 2, 3, 2, 1]\nds2 = [1, 2, 3, 4, 5]\n\ndef is_palindrome(ds):\n    return ds == ds[::-1]\n\nprint(f\"{ds1} -> Palindrome: {is_palindrome(ds1)}\")\nprint(f\"{ds2} -> Palindrome: {is_palindrome(ds2)}\")",
    solution_code: "ds1 = [1, 2, 3, 2, 1]\nds2 = [1, 2, 3, 4, 5]\ndef is_palindrome(ds):\n    return ds == ds[::-1]\nprint(f\"{ds1} -> Palindrome: {is_palindrome(ds1)}\")\nprint(f\"{ds2} -> Palindrome: {is_palindrome(ds2)}\")",
    hints: ['So sánh list với list đảo ngược bằng [::-1]'],
    test_cases: [{ input: '', expected_output: '[1, 2, 3, 2, 1] -> Palindrome: True\n[1, 2, 3, 4, 5] -> Palindrome: False', is_hidden: false }]
  },


  {
    id: 'list-11',
    lesson_id: 'lesson-1-2',
    title: 'Ma trận chuyển vị',
    description: 'Chuyển vị ma trận 3x3 (hàng thành cột)',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Chuyển vị\ntranspose = []\nfor j in range(3):\n    row = []\n    for i in range(3):\n        row.append(matrix[i][j])\n    transpose.append(row)\n\nprint(\"Gốc:\")\nfor r in matrix:\n    print(r)\nprint(\"Chuyển vị:\")\nfor r in transpose:\n    print(r)",
    solution_code: "matrix = [[1,2,3],[4,5,6],[7,8,9]]\ntranspose = [[matrix[i][j] for i in range(3)] for j in range(3)]\nprint(\"Gốc:\")\nfor r in matrix:\n    print(r)\nprint(\"Chuyển vị:\")\nfor r in transpose:\n    print(r)",
    hints: ['Phần tử [i][j] của gốc thành [j][i] của chuyển vị'],
    test_cases: [{ input: '', expected_output: 'Gốc:\n[1, 2, 3]\n[4, 5, 6]\n[7, 8, 9]\nChuyển vị:\n[1, 4, 7]\n[2, 5, 8]\n[3, 6, 9]', is_hidden: false }]
  },
  {
    id: 'list-12',
    lesson_id: 'lesson-1-2',
    title: 'Xoay danh sách sang phải k bước',
    description: 'Xoay list sang phải k vị trí. Ví dụ: [1,2,3,4,5] xoay 2 → [4,5,1,2,3]',
    difficulty: 'medium',
    xp_reward: 70,
    starter_code: "ds = [1, 2, 3, 4, 5]\nk = 2\n\n# Xoay phải k bước\nk = k % len(ds)\nket_qua = ds[-k:] + ds[:-k]\n\nprint(f\"Gốc: {[1,2,3,4,5]}\")\nprint(f\"Xoay phải {k}: {ket_qua}\")",
    solution_code: "ds = [1, 2, 3, 4, 5]\nk = 2\nk = k % len(ds)\nket_qua = ds[-k:] + ds[:-k]\nprint(f\"Gốc: {[1,2,3,4,5]}\")\nprint(f\"Xoay phải {k}: {ket_qua}\")",
    hints: ['Dùng slicing: ds[-k:] + ds[:-k]. Nhớ k = k % len(ds) tránh k > len'],
    test_cases: [{ input: '', expected_output: 'Gốc: [1, 2, 3, 4, 5]\nXoay phải 2: [4, 5, 1, 2, 3]', is_hidden: false }]
  },
];



// ─────────────────────────────────────────────────────────────────────────────
// CHƯƠNG 2: THUẬT TOÁN SẮP XẾP — 15 bài
// ─────────────────────────────────────────────────────────────────────────────

export const sortExercises: Exercise[] = [
  {
    id: 'sort-01',
    lesson_id: 'lesson-2-1',
    title: 'Selection Sort — sắp xếp giảm dần',
    description: 'Sửa thuật toán Selection Sort để sắp xếp GIẢM DẦN',
    difficulty: 'medium',
    xp_reward: 70,
    starter_code: "def selection_sort_desc(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        vi_tri_max = i\n        for j in range(i + 1, n):\n            if ds[j] > ds[vi_tri_max]:\n                vi_tri_max = j\n        ds[i], ds[vi_tri_max] = ds[vi_tri_max], ds[i]\n    return ds\n\nds = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(\"Trước:\", ds)\nselection_sort_desc(ds)\nprint(\"Sau (giảm):\", ds)",
    solution_code: "def selection_sort_desc(ds):\n    n = len(ds)\n    for i in range(n - 1):\n        vi_tri_max = i\n        for j in range(i + 1, n):\n            if ds[j] > ds[vi_tri_max]:\n                vi_tri_max = j\n        ds[i], ds[vi_tri_max] = ds[vi_tri_max], ds[i]\n    return ds\nds = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(\"Trước:\", ds)\nselection_sort_desc(ds)\nprint(\"Sau (giảm):\", ds)",
    hints: ['Thay vì tìm min, tìm MAX trong đoạn chưa sắp xếp'],
    test_cases: [{ input: '', expected_output: 'Trước: [3, 1, 4, 1, 5, 9, 2, 6]\nSau (giảm): [9, 6, 5, 4, 3, 2, 1, 1]', is_hidden: false }]
  },
  {
    id: 'sort-02',
    lesson_id: 'lesson-2-1',
    title: 'Đếm số phép so sánh của Selection Sort',
    description: 'Chạy Selection Sort và đếm tổng số phép so sánh đã thực hiện',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def selection_sort_count(ds):\n    n = len(ds)\n    so_sanh = 0\n    for i in range(n - 1):\n        vi_tri_min = i\n        for j in range(i + 1, n):\n            so_sanh += 1\n            if ds[j] < ds[vi_tri_min]:\n                vi_tri_min = j\n        ds[i], ds[vi_tri_min] = ds[vi_tri_min], ds[i]\n    return so_sanh\n\nds = [5, 3, 8, 1, 9, 2]\ncount = selection_sort_count(ds)\nprint(f\"Kết quả: {ds}\")\nprint(f\"Số phép so sánh: {count}\")",
    solution_code: "def selection_sort_count(ds):\n    n = len(ds)\n    so_sanh = 0\n    for i in range(n - 1):\n        vi_tri_min = i\n        for j in range(i + 1, n):\n            so_sanh += 1\n            if ds[j] < ds[vi_tri_min]:\n                vi_tri_min = j\n        ds[i], ds[vi_tri_min] = ds[vi_tri_min], ds[i]\n    return so_sanh\nds = [5, 3, 8, 1, 9, 2]\ncount = selection_sort_count(ds)\nprint(f\"Kết quả: {ds}\")\nprint(f\"Số phép so sánh: {count}\")",
    hints: ['Thêm biến đếm so_sanh += 1 mỗi lần so sánh trong vòng lặp trong'],
    test_cases: [{ input: '', expected_output: 'Kết quả: [1, 2, 3, 5, 8, 9]\nSố phép so sánh: 15', is_hidden: false }]
  },
  {
    id: 'sort-03',
    lesson_id: 'lesson-2-2',
    title: 'Bubble Sort — đếm số phép đổi chỗ',
    description: 'Chạy Bubble Sort và đếm tổng số phép hoán đổi (swap)',
    difficulty: 'medium',
    xp_reward: 70,
    starter_code: "def bubble_sort_count(ds):\n    n = len(ds)\n    swaps = 0\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if ds[j] > ds[j + 1]:\n                ds[j], ds[j + 1] = ds[j + 1], ds[j]\n                swaps += 1\n    return swaps\n\nds = [5, 1, 4, 2, 8]\ncount = bubble_sort_count(ds)\nprint(f\"Kết quả: {ds}\")\nprint(f\"Số phép đổi chỗ: {count}\")",
    solution_code: "def bubble_sort_count(ds):\n    n = len(ds)\n    swaps = 0\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if ds[j] > ds[j + 1]:\n                ds[j], ds[j + 1] = ds[j + 1], ds[j]\n                swaps += 1\n    return swaps\nds = [5, 1, 4, 2, 8]\ncount = bubble_sort_count(ds)\nprint(f\"Kết quả: {ds}\")\nprint(f\"Số phép đổi chỗ: {count}\")",
    hints: ['Thêm biến swaps += 1 mỗi lần thực hiện đổi chỗ'],
    test_cases: [{ input: '', expected_output: 'Kết quả: [1, 2, 4, 5, 8]\nSố phép đổi chỗ: 4', is_hidden: false }]
  },
  {
    id: 'sort-04',
    lesson_id: 'lesson-2-3',
    title: 'Insertion Sort — sắp xếp chuỗi theo ABC',
    description: 'Dùng Insertion Sort sắp xếp danh sách tên theo alphabet',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def insertion_sort_str(ds):\n    for i in range(1, len(ds)):\n        key = ds[i]\n        j = i - 1\n        while j >= 0 and ds[j] > key:\n            ds[j + 1] = ds[j]\n            j -= 1\n        ds[j + 1] = key\n    return ds\n\nten = [\"Chi\", \"An\", \"Em\", \"Bình\", \"Dũng\"]\nprint(\"Trước:\", ten)\ninsertion_sort_str(ten)\nprint(\"Sau:\", ten)",
    solution_code: "def insertion_sort_str(ds):\n    for i in range(1, len(ds)):\n        key = ds[i]\n        j = i - 1\n        while j >= 0 and ds[j] > key:\n            ds[j + 1] = ds[j]\n            j -= 1\n        ds[j + 1] = key\n    return ds\nten = [\"Chi\", \"An\", \"Em\", \"Bình\", \"Dũng\"]\nprint(\"Trước:\", ten)\ninsertion_sort_str(ten)\nprint(\"Sau:\", ten)",
    hints: ['Python so sánh string theo thứ tự từ điển, Insertion Sort hoạt động tương tự'],
    test_cases: [{ input: '', expected_output: "Trước: ['Chi', 'An', 'Em', 'Bình', 'Dũng']\nSau: ['An', 'Bình', 'Chi', 'Dũng', 'Em']", is_hidden: false }]
  },
  {
    id: 'sort-05',
    lesson_id: 'lesson-2-1',
    title: 'Sắp xếp học sinh theo điểm',
    description: 'Sắp xếp danh sách HS theo điểm giảm dần, dùng Selection Sort trên list of dict',
    difficulty: 'hard',
    xp_reward: 100,
    starter_code: "ds_hs = [\n    {\"ten\": \"An\", \"diem\": 7.5},\n    {\"ten\": \"Bình\", \"diem\": 9.0},\n    {\"ten\": \"Chi\", \"diem\": 6.5},\n    {\"ten\": \"Dũng\", \"diem\": 8.5},\n    {\"ten\": \"Em\", \"diem\": 7.0},\n]\n\n# Selection Sort theo điểm giảm dần\nn = len(ds_hs)\nfor i in range(n - 1):\n    max_idx = i\n    for j in range(i + 1, n):\n        if ds_hs[j][\"diem\"] > ds_hs[max_idx][\"diem\"]:\n            max_idx = j\n    ds_hs[i], ds_hs[max_idx] = ds_hs[max_idx], ds_hs[i]\n\nprint(\"Xếp hạng theo điểm:\")\nfor i, hs in enumerate(ds_hs, 1):\n    print(f\"{i}. {hs['ten']}: {hs['diem']}\")",
    solution_code: "ds_hs = [{\"ten\":\"An\",\"diem\":7.5},{\"ten\":\"Bình\",\"diem\":9.0},{\"ten\":\"Chi\",\"diem\":6.5},{\"ten\":\"Dũng\",\"diem\":8.5},{\"ten\":\"Em\",\"diem\":7.0}]\nn = len(ds_hs)\nfor i in range(n-1):\n    max_idx = i\n    for j in range(i+1, n):\n        if ds_hs[j][\"diem\"] > ds_hs[max_idx][\"diem\"]:\n            max_idx = j\n    ds_hs[i], ds_hs[max_idx] = ds_hs[max_idx], ds_hs[i]\nprint(\"Xếp hạng theo điểm:\")\nfor i, hs in enumerate(ds_hs, 1):\n    print(f\"{i}. {hs['ten']}: {hs['diem']}\")",
    hints: ['So sánh ds_hs[j][\"diem\"] thay vì ds_hs[j] trực tiếp'],
    test_cases: [{ input: '', expected_output: "Xếp hạng theo điểm:\n1. Bình: 9.0\n2. Dũng: 8.5\n3. An: 7.5\n4. Em: 7.0\n5. Chi: 6.5", is_hidden: false }]
  },
];



// ─────────────────────────────────────────────────────────────────────────────
// CHƯƠNG 3: THUẬT TOÁN TÌM KIẾM — 12 bài
// ─────────────────────────────────────────────────────────────────────────────

export const searchExercises: Exercise[] = [
  {
    id: 'search-01',
    lesson_id: 'lesson-3-1',
    title: 'Tìm tất cả vị trí xuất hiện',
    description: 'Tìm TẤT CẢ vị trí xuất hiện của giá trị key trong danh sách',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "def tim_tat_ca(ds, key):\n    vi_tri = []\n    for i in range(len(ds)):\n        if ds[i] == key:\n            vi_tri.append(i)\n    return vi_tri\n\nds = [3, 1, 4, 1, 5, 1, 2, 1]\nkey = 1\nkq = tim_tat_ca(ds, key)\nprint(f\"Tìm {key} trong {ds}\")\nprint(f\"Xuất hiện tại: {kq}\")\nprint(f\"Số lần: {len(kq)}\")",
    solution_code: "def tim_tat_ca(ds, key):\n    vi_tri = []\n    for i in range(len(ds)):\n        if ds[i] == key:\n            vi_tri.append(i)\n    return vi_tri\nds = [3, 1, 4, 1, 5, 1, 2, 1]\nkey = 1\nkq = tim_tat_ca(ds, key)\nprint(f\"Tìm {key} trong {ds}\")\nprint(f\"Xuất hiện tại: {kq}\")\nprint(f\"Số lần: {len(kq)}\")",
    hints: ['Duyệt toàn bộ, append index vào list kết quả mỗi khi tìm thấy'],
    test_cases: [{ input: '', expected_output: 'Tìm 1 trong [3, 1, 4, 1, 5, 1, 2, 1]\nXuất hiện tại: [1, 3, 5, 7]\nSố lần: 4', is_hidden: false }]
  },
  {
    id: 'search-02',
    lesson_id: 'lesson-3-2',
    title: 'Binary Search đệ quy',
    description: 'Cài đặt tìm kiếm nhị phân bằng đệ quy',
    difficulty: 'hard',
    xp_reward: 100,
    starter_code: "def binary_search_rec(ds, key, left, right):\n    if left > right:\n        return -1\n    mid = (left + right) // 2\n    if ds[mid] == key:\n        return mid\n    elif ds[mid] < key:\n        return binary_search_rec(ds, key, mid + 1, right)\n    else:\n        return binary_search_rec(ds, key, left, mid - 1)\n\nds = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\nprint(f\"Tìm 7: vị trí {binary_search_rec(ds, 7, 0, len(ds)-1)}\")\nprint(f\"Tìm 13: vị trí {binary_search_rec(ds, 13, 0, len(ds)-1)}\")\nprint(f\"Tìm 6: vị trí {binary_search_rec(ds, 6, 0, len(ds)-1)}\")",
    solution_code: "def binary_search_rec(ds, key, left, right):\n    if left > right:\n        return -1\n    mid = (left + right) // 2\n    if ds[mid] == key:\n        return mid\n    elif ds[mid] < key:\n        return binary_search_rec(ds, key, mid + 1, right)\n    else:\n        return binary_search_rec(ds, key, left, mid - 1)\nds = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\nprint(f\"Tìm 7: vị trí {binary_search_rec(ds, 7, 0, len(ds)-1)}\")\nprint(f\"Tìm 13: vị trí {binary_search_rec(ds, 13, 0, len(ds)-1)}\")\nprint(f\"Tìm 6: vị trí {binary_search_rec(ds, 6, 0, len(ds)-1)}\")",
    hints: ['Base case: left > right → -1. Recursive: gọi lại với left hoặc right mới'],
    test_cases: [{ input: '', expected_output: 'Tìm 7: vị trí 3\nTìm 13: vị trí 6\nTìm 6: vị trí -1', is_hidden: false }]
  },
  {
    id: 'search-03',
    lesson_id: 'lesson-3-1',
    title: 'Tìm cặp số có tổng bằng target',
    description: 'Cho list và target, tìm 2 phần tử có tổng = target',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def tim_cap(ds, target):\n    for i in range(len(ds)):\n        for j in range(i + 1, len(ds)):\n            if ds[i] + ds[j] == target:\n                return (ds[i], ds[j])\n    return None\n\nds = [2, 7, 11, 15, 3, 6]\ntarget = 9\nkq = tim_cap(ds, target)\nprint(f\"Danh sách: {ds}\")\nprint(f\"Target: {target}\")\nprint(f\"Cặp tìm được: {kq}\")",
    solution_code: "def tim_cap(ds, target):\n    for i in range(len(ds)):\n        for j in range(i + 1, len(ds)):\n            if ds[i] + ds[j] == target:\n                return (ds[i], ds[j])\n    return None\nds = [2, 7, 11, 15, 3, 6]\ntarget = 9\nkq = tim_cap(ds, target)\nprint(f\"Danh sách: {ds}\")\nprint(f\"Target: {target}\")\nprint(f\"Cặp tìm được: {kq}\")",
    hints: ['Duyệt 2 vòng lặp lồng nhau, kiểm tra ds[i] + ds[j] == target'],
    test_cases: [{ input: '', expected_output: 'Danh sách: [2, 7, 11, 15, 3, 6]\nTarget: 9\nCặp tìm được: (2, 7)', is_hidden: false }]
  },
  {
    id: 'search-04',
    lesson_id: 'lesson-3-2',
    title: 'Đếm số bước của Binary Search',
    description: 'Đếm số lần chia đôi khi tìm kiếm nhị phân',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code: "def binary_search_steps(ds, key):\n    left, right = 0, len(ds) - 1\n    steps = 0\n    while left <= right:\n        steps += 1\n        mid = (left + right) // 2\n        if ds[mid] == key:\n            return mid, steps\n        elif ds[mid] < key:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1, steps\n\nds = list(range(1, 101))  # [1, 2, ..., 100]\nfor key in [50, 1, 100, 73, 999]:\n    pos, steps = binary_search_steps(ds, key)\n    print(f\"Tìm {key:3d}: vị trí={pos:3d}, bước={steps}\")",
    solution_code: "def binary_search_steps(ds, key):\n    left, right = 0, len(ds) - 1\n    steps = 0\n    while left <= right:\n        steps += 1\n        mid = (left + right) // 2\n        if ds[mid] == key:\n            return mid, steps\n        elif ds[mid] < key:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1, steps\nds = list(range(1, 101))\nfor key in [50, 1, 100, 73, 999]:\n    pos, steps = binary_search_steps(ds, key)\n    print(f\"Tìm {key:3d}: vị trí={pos:3d}, bước={steps}\")",
    hints: ['Thêm biến steps += 1 mỗi lần vào vòng lặp while'],
    test_cases: [{ input: '', expected_output: 'Tìm  50: vị trí= 49, bước=1\nTìm   1: vị trí=  0, bước=7\nTìm 100: vị trí= 99, bước=7\nTìm  73: vị trí= 72, bước=5\nTìm 999: vị trí= -1, bước=7', is_hidden: false }]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHƯƠNG 4: DICTIONARY — 15 bài
// ─────────────────────────────────────────────────────────────────────────────

export const dictExercises: Exercise[] = [
  {
    id: 'dict-01',
    lesson_id: 'lesson-4-1',
    title: 'Đếm từ trong câu',
    description: 'Dùng dictionary đếm số lần xuất hiện của mỗi từ',
    difficulty: 'medium',
    xp_reward: 70,
    starter_code: "cau = \"toi yeu python python la ngon ngu toi thich nhat\"\n\ndem = {}\nfor tu in cau.split():\n    dem[tu] = dem.get(tu, 0) + 1\n\nprint(\"Tần suất từ:\")\nfor tu, sl in sorted(dem.items(), key=lambda x: -x[1]):\n    print(f\"  {tu}: {sl}\")",
    solution_code: "cau = \"toi yeu python python la ngon ngu toi thich nhat\"\ndem = {}\nfor tu in cau.split():\n    dem[tu] = dem.get(tu, 0) + 1\nprint(\"Tần suất từ:\")\nfor tu, sl in sorted(dem.items(), key=lambda x: -x[1]):\n    print(f\"  {tu}: {sl}\")",
    hints: ['split() tách chuỗi thành list từ, get(key, 0) + 1 để đếm'],
    test_cases: [{ input: '', expected_output: 'Tần suất từ:\n  toi: 2\n  python: 2\n  yeu: 1\n  la: 1\n  ngon: 1\n  ngu: 1\n  thich: 1\n  nhat: 1', is_hidden: false }]
  },
  {
    id: 'dict-02',
    lesson_id: 'lesson-4-2',
    title: 'Đảo key-value trong Dictionary',
    description: 'Tạo dict mới với key và value hoán đổi nhau',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "goc = {\"a\": 1, \"b\": 2, \"c\": 3, \"d\": 4}\n\ndao = {}\nfor key, value in goc.items():\n    dao[value] = key\n\nprint(\"Gốc:\", goc)\nprint(\"Đảo:\", dao)",
    solution_code: "goc = {\"a\": 1, \"b\": 2, \"c\": 3, \"d\": 4}\ndao = {v: k for k, v in goc.items()}\nprint(\"Gốc:\", goc)\nprint(\"Đảo:\", dao)",
    hints: ['Duyệt items(), gán dao[value] = key'],
    test_cases: [{ input: '', expected_output: "Gốc: {'a': 1, 'b': 2, 'c': 3, 'd': 4}\nĐảo: {1: 'a', 2: 'b', 3: 'c', 4: 'd'}", is_hidden: false }]
  },
  {
    id: 'dict-03',
    lesson_id: 'lesson-4-2',
    title: 'Nhóm học sinh theo xếp loại',
    description: 'Dùng dict nhóm HS theo xếp loại: Giỏi/Khá/TB/Yếu',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "hoc_sinh = [\n    (\"An\", 8.5), (\"Bình\", 6.0), (\"Chi\", 9.0),\n    (\"Dũng\", 4.5), (\"Em\", 7.0), (\"Phúc\", 3.5)\n]\n\ndef xep_loai(diem):\n    if diem >= 8: return \"Giỏi\"\n    if diem >= 6.5: return \"Khá\"\n    if diem >= 5: return \"TB\"\n    return \"Yếu\"\n\nnhom = {}\nfor ten, diem in hoc_sinh:\n    loai = xep_loai(diem)\n    if loai not in nhom:\n        nhom[loai] = []\n    nhom[loai].append(ten)\n\nfor loai in [\"Giỏi\", \"Khá\", \"TB\", \"Yếu\"]:\n    if loai in nhom:\n        print(f\"{loai}: {nhom[loai]}\")",
    solution_code: "hoc_sinh = [(\"An\",8.5),(\"Bình\",6.0),(\"Chi\",9.0),(\"Dũng\",4.5),(\"Em\",7.0),(\"Phúc\",3.5)]\ndef xep_loai(diem):\n    if diem >= 8: return \"Giỏi\"\n    if diem >= 6.5: return \"Khá\"\n    if diem >= 5: return \"TB\"\n    return \"Yếu\"\nnhom = {}\nfor ten, diem in hoc_sinh:\n    loai = xep_loai(diem)\n    if loai not in nhom:\n        nhom[loai] = []\n    nhom[loai].append(ten)\nfor loai in [\"Giỏi\", \"Khá\", \"TB\", \"Yếu\"]:\n    if loai in nhom:\n        print(f\"{loai}: {nhom[loai]}\")",
    hints: ['Tạo dict với key=loại, value=list tên. Kiểm tra key tồn tại trước khi append'],
    test_cases: [{ input: '', expected_output: "Giỏi: ['An', 'Chi']\nKhá: ['Em']\nTB: ['Bình']\nYếu: ['Dũng', 'Phúc']", is_hidden: false }]
  },
  {
    id: 'dict-04',
    lesson_id: 'lesson-4-1',
    title: 'Hệ thống quản lý sản phẩm',
    description: 'Tạo dict quản lý sản phẩm: thêm, tìm, cập nhật giá',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code: "kho = {\n    \"SP001\": {\"ten\": \"Bút bi\", \"gia\": 5000, \"sl\": 100},\n    \"SP002\": {\"ten\": \"Vở\", \"gia\": 12000, \"sl\": 50},\n    \"SP003\": {\"ten\": \"Thước\", \"gia\": 8000, \"sl\": 30},\n}\n\n# Thêm sản phẩm mới\nkho[\"SP004\"] = {\"ten\": \"Tẩy\", \"gia\": 3000, \"sl\": 200}\n\n# Cập nhật giá\nkho[\"SP001\"][\"gia\"] = 6000\n\n# Hiển thị\nprint(\"=== KHO HÀNG ===\")\ntong_gia_tri = 0\nfor ma, sp in kho.items():\n    gia_tri = sp[\"gia\"] * sp[\"sl\"]\n    tong_gia_tri += gia_tri\n    print(f\"{ma}: {sp['ten']:8s} | {sp['gia']:>6,}đ x {sp['sl']:>3} = {gia_tri:>10,}đ\")\nprint(f\"\\nTổng giá trị kho: {tong_gia_tri:,}đ\")",
    solution_code: "kho = {\"SP001\":{\"ten\":\"Bút bi\",\"gia\":5000,\"sl\":100},\"SP002\":{\"ten\":\"Vở\",\"gia\":12000,\"sl\":50},\"SP003\":{\"ten\":\"Thước\",\"gia\":8000,\"sl\":30}}\nkho[\"SP004\"] = {\"ten\": \"Tẩy\", \"gia\": 3000, \"sl\": 200}\nkho[\"SP001\"][\"gia\"] = 6000\nprint(\"=== KHO HÀNG ===\")\ntong_gia_tri = 0\nfor ma, sp in kho.items():\n    gia_tri = sp[\"gia\"] * sp[\"sl\"]\n    tong_gia_tri += gia_tri\n    print(f\"{ma}: {sp['ten']:8s} | {sp['gia']:>6,}đ x {sp['sl']:>3} = {gia_tri:>10,}đ\")\nprint(f\"\\nTổng giá trị kho: {tong_gia_tri:,}đ\")",
    hints: ['Dict lồng dict: kho[mã] = {\"ten\": ..., \"gia\": ..., \"sl\": ...}'],
    test_cases: [{ input: '', expected_output: "=== KHO HÀNG ===\nSP001: Bút bi   |  6,000đ x 100 =    600,000đ\nSP002: Vở       | 12,000đ x  50 =    600,000đ\nSP003: Thước    |  8,000đ x  30 =    240,000đ\nSP004: Tẩy      |  3,000đ x 200 =    600,000đ\n\nTổng giá trị kho: 2,040,000đ", is_hidden: false }]
  },
];



// ─────────────────────────────────────────────────────────────────────────────
// CHƯƠNG 5: SET — 8 bài
// ─────────────────────────────────────────────────────────────────────────────

export const setExercises: Exercise[] = [
  {
    id: 'set-01',
    lesson_id: 'lesson-5-1',
    title: 'Tìm phần tử chung 3 danh sách',
    description: 'Dùng set tìm phần tử xuất hiện trong cả 3 danh sách',
    difficulty: 'easy',
    xp_reward: 50,
    starter_code: "a = [1, 2, 3, 4, 5]\nb = [3, 4, 5, 6, 7]\nc = [5, 6, 7, 8, 9]\n\nchung = set(a) & set(b) & set(c)\nprint(f\"A: {a}\")\nprint(f\"B: {b}\")\nprint(f\"C: {c}\")\nprint(f\"Chung cả 3: {sorted(chung)}\")",
    solution_code: "a = [1,2,3,4,5]\nb = [3,4,5,6,7]\nc = [5,6,7,8,9]\nchung = set(a) & set(b) & set(c)\nprint(f\"A: {a}\")\nprint(f\"B: {b}\")\nprint(f\"C: {c}\")\nprint(f\"Chung cả 3: {sorted(chung)}\")",
    hints: ['Chuyển cả 3 list sang set, dùng & (giao) liên tiếp'],
    test_cases: [{ input: '', expected_output: 'A: [1, 2, 3, 4, 5]\nB: [3, 4, 5, 6, 7]\nC: [5, 6, 7, 8, 9]\nChung cả 3: [5]', is_hidden: false }]
  },
  {
    id: 'set-02',
    lesson_id: 'lesson-5-1',
    title: 'Kiểm tra tập con',
    description: 'Kiểm tra xem một tập có phải là tập con của tập khác không',
    difficulty: 'easy',
    xp_reward: 45,
    starter_code: "A = {1, 2, 3, 4, 5}\nB = {2, 3, 4}\nC = {4, 5, 6}\n\nprint(f\"A = {A}\")\nprint(f\"B = {B}\")\nprint(f\"C = {C}\")\nprint(f\"B ⊂ A? {B.issubset(A)}\")\nprint(f\"C ⊂ A? {C.issubset(A)}\")\nprint(f\"A ⊃ B? {A.issuperset(B)}\")",
    solution_code: "A = {1, 2, 3, 4, 5}\nB = {2, 3, 4}\nC = {4, 5, 6}\nprint(f\"A = {A}\")\nprint(f\"B = {B}\")\nprint(f\"C = {C}\")\nprint(f\"B ⊂ A? {B.issubset(A)}\")\nprint(f\"C ⊂ A? {C.issubset(A)}\")\nprint(f\"A ⊃ B? {A.issuperset(B)}\")",
    hints: ['issubset() kiểm tra tập con, issuperset() kiểm tra tập cha'],
    test_cases: [{ input: '', expected_output: 'A = {1, 2, 3, 4, 5}\nB = {2, 3, 4}\nC = {4, 5, 6}\nB ⊂ A? True\nC ⊂ A? False\nA ⊃ B? True', is_hidden: false }]
  },
  {
    id: 'set-03',
    lesson_id: 'lesson-5-1',
    title: 'Phân tích đăng ký môn thi',
    description: 'Dùng set phân tích HS đăng ký các môn thi: chỉ 1 môn, cả 2, không môn nào',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code: "lop = {\"An\", \"Bình\", \"Chi\", \"Dũng\", \"Em\", \"Phúc\", \"Giang\"}\ntoan = {\"An\", \"Bình\", \"Chi\", \"Dũng\"}\ntin = {\"Chi\", \"Dũng\", \"Em\", \"Phúc\"}\n\nca_hai = toan & tin\nchi_toan = toan - tin\nchi_tin = tin - toan\nkhong_mon_nao = lop - toan - tin\n\nprint(f\"Đăng ký cả 2: {sorted(ca_hai)}\")\nprint(f\"Chỉ Toán: {sorted(chi_toan)}\")\nprint(f\"Chỉ Tin: {sorted(chi_tin)}\")\nprint(f\"Không môn nào: {sorted(khong_mon_nao)}\")",
    solution_code: "lop = {\"An\", \"Bình\", \"Chi\", \"Dũng\", \"Em\", \"Phúc\", \"Giang\"}\ntoan = {\"An\", \"Bình\", \"Chi\", \"Dũng\"}\ntin = {\"Chi\", \"Dũng\", \"Em\", \"Phúc\"}\nca_hai = toan & tin\nchi_toan = toan - tin\nchi_tin = tin - toan\nkhong_mon_nao = lop - toan - tin\nprint(f\"Đăng ký cả 2: {sorted(ca_hai)}\")\nprint(f\"Chỉ Toán: {sorted(chi_toan)}\")\nprint(f\"Chỉ Tin: {sorted(chi_tin)}\")\nprint(f\"Không môn nào: {sorted(khong_mon_nao)}\")",
    hints: ['& = giao (cả 2), - = hiệu (chỉ A không B), lop - toan - tin = không ai'],
    test_cases: [{ input: '', expected_output: "Đăng ký cả 2: ['Chi', 'Dũng']\nChỉ Toán: ['An', 'Bình']\nChỉ Tin: ['Em', 'Phúc']\nKhông môn nào: ['Giang']", is_hidden: false }]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHUYÊN ĐỀ: ĐỆ QUY & OOP — 15 bài
// ─────────────────────────────────────────────────────────────────────────────

export const advancedExercises: Exercise[] = [
  {
    id: 'adv-01',
    lesson_id: 'lesson-cd1-1',
    title: 'Tổng các chữ số (đệ quy)',
    description: 'Viết hàm đệ quy tính tổng các chữ số của số nguyên dương',
    difficulty: 'medium',
    xp_reward: 75,
    starter_code: "def tong_chu_so(n):\n    if n < 10:\n        return n\n    return n % 10 + tong_chu_so(n // 10)\n\n# Test\nfor so in [123, 9999, 12345]:\n    print(f\"tong_chu_so({so}) = {tong_chu_so(so)}\")",
    solution_code: "def tong_chu_so(n):\n    if n < 10:\n        return n\n    return n % 10 + tong_chu_so(n // 10)\nfor so in [123, 9999, 12345]:\n    print(f\"tong_chu_so({so}) = {tong_chu_so(so)}\")",
    hints: ['Base: n < 10 → return n. Recursive: chữ số cuối (n%10) + đệ quy phần còn lại (n//10)'],
    test_cases: [{ input: '', expected_output: 'tong_chu_so(123) = 6\ntong_chu_so(9999) = 36\ntong_chu_so(12345) = 15', is_hidden: false }]
  },
  {
    id: 'adv-02',
    lesson_id: 'lesson-cd1-1',
    title: 'Fibonacci có lưu cache',
    description: 'Fibonacci đệ quy + memoization để tăng tốc',
    difficulty: 'hard',
    xp_reward: 100,
    starter_code: "cache = {}\n\ndef fib(n):\n    if n in cache:\n        return cache[n]\n    if n <= 1:\n        return n\n    cache[n] = fib(n-1) + fib(n-2)\n    return cache[n]\n\n# Test - nhanh hơn nhiều so với đệ quy thường\nfor i in [10, 20, 30, 40, 50]:\n    print(f\"F({i}) = {fib(i)}\")",
    solution_code: "cache = {}\ndef fib(n):\n    if n in cache:\n        return cache[n]\n    if n <= 1:\n        return n\n    cache[n] = fib(n-1) + fib(n-2)\n    return cache[n]\nfor i in [10, 20, 30, 40, 50]:\n    print(f\"F({i}) = {fib(i)}\")",
    hints: ['Lưu kết quả đã tính vào dict cache, kiểm tra trước khi tính lại'],
    test_cases: [{ input: '', expected_output: 'F(10) = 55\nF(20) = 6765\nF(30) = 832040\nF(40) = 102334155\nF(50) = 12586269025', is_hidden: false }]
  },
  {
    id: 'adv-03',
    lesson_id: 'lesson-cd1-1',
    title: 'Lũy thừa bằng đệ quy',
    description: 'Tính a^n bằng đệ quy (lũy thừa nhanh)',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "def luy_thua(a, n):\n    if n == 0:\n        return 1\n    if n % 2 == 0:\n        half = luy_thua(a, n // 2)\n        return half * half\n    else:\n        return a * luy_thua(a, n - 1)\n\nprint(f\"2^10 = {luy_thua(2, 10)}\")\nprint(f\"3^5 = {luy_thua(3, 5)}\")\nprint(f\"5^0 = {luy_thua(5, 0)}\")",
    solution_code: "def luy_thua(a, n):\n    if n == 0:\n        return 1\n    if n % 2 == 0:\n        half = luy_thua(a, n // 2)\n        return half * half\n    else:\n        return a * luy_thua(a, n - 1)\nprint(f\"2^10 = {luy_thua(2, 10)}\")\nprint(f\"3^5 = {luy_thua(3, 5)}\")\nprint(f\"5^0 = {luy_thua(5, 0)}\")",
    hints: ['Base: n=0 → 1. Nếu n chẵn: a^n = (a^(n/2))^2. Nếu n lẻ: a^n = a * a^(n-1)'],
    test_cases: [{ input: '', expected_output: '2^10 = 1024\n3^5 = 243\n5^0 = 1', is_hidden: false }]
  },
  {
    id: 'adv-04',
    lesson_id: 'lesson-cd2-1',
    title: 'Class Hình chữ nhật',
    description: 'Tạo class HinhChuNhat với phương thức tính diện tích và chu vi',
    difficulty: 'medium',
    xp_reward: 80,
    starter_code: "class HinhChuNhat:\n    def __init__(self, dai, rong):\n        self.dai = dai\n        self.rong = rong\n\n    def dien_tich(self):\n        return self.dai * self.rong\n\n    def chu_vi(self):\n        return 2 * (self.dai + self.rong)\n\n    def __str__(self):\n        return f\"HCN({self.dai}x{self.rong})\"\n\n# Test\nh1 = HinhChuNhat(5, 3)\nh2 = HinhChuNhat(10, 4)\n\nfor h in [h1, h2]:\n    print(f\"{h}: S={h.dien_tich()}, C={h.chu_vi()}\")",
    solution_code: "class HinhChuNhat:\n    def __init__(self, dai, rong):\n        self.dai = dai\n        self.rong = rong\n    def dien_tich(self):\n        return self.dai * self.rong\n    def chu_vi(self):\n        return 2 * (self.dai + self.rong)\n    def __str__(self):\n        return f\"HCN({self.dai}x{self.rong})\"\nh1 = HinhChuNhat(5, 3)\nh2 = HinhChuNhat(10, 4)\nfor h in [h1, h2]:\n    print(f\"{h}: S={h.dien_tich()}, C={h.chu_vi()}\")",
    hints: ['__init__ khởi tạo thuộc tính, __str__ cho phép print object đẹp'],
    test_cases: [{ input: '', expected_output: 'HCN(5x3): S=15, C=16\nHCN(10x4): S=40, C=28', is_hidden: false }]
  },
  {
    id: 'adv-05',
    lesson_id: 'lesson-cd2-1',
    title: 'Class Tài khoản ngân hàng',
    description: 'Tạo class TaiKhoan với nạp tiền, rút tiền, kiểm tra số dư',
    difficulty: 'hard',
    xp_reward: 110,
    starter_code: "class TaiKhoan:\n    def __init__(self, chu_tk, so_du=0):\n        self.chu_tk = chu_tk\n        self.so_du = so_du\n\n    def nap_tien(self, so_tien):\n        if so_tien > 0:\n            self.so_du += so_tien\n            print(f\"  Nạp {so_tien:,}đ thành công\")\n\n    def rut_tien(self, so_tien):\n        if so_tien > self.so_du:\n            print(f\"  Không đủ số dư (cần {so_tien:,}đ, có {self.so_du:,}đ)\")\n        elif so_tien > 0:\n            self.so_du -= so_tien\n            print(f\"  Rút {so_tien:,}đ thành công\")\n\n    def hien_thi(self):\n        print(f\"  [{self.chu_tk}] Số dư: {self.so_du:,}đ\")\n\n# Test\ntk = TaiKhoan(\"Nguyễn Văn An\", 1000000)\nprint(\"=== GIAO DỊCH ===\")\ntk.hien_thi()\ntk.nap_tien(500000)\ntk.hien_thi()\ntk.rut_tien(200000)\ntk.hien_thi()\ntk.rut_tien(2000000)",
    solution_code: "class TaiKhoan:\n    def __init__(self, chu_tk, so_du=0):\n        self.chu_tk = chu_tk\n        self.so_du = so_du\n    def nap_tien(self, so_tien):\n        if so_tien > 0:\n            self.so_du += so_tien\n            print(f\"  Nạp {so_tien:,}đ thành công\")\n    def rut_tien(self, so_tien):\n        if so_tien > self.so_du:\n            print(f\"  Không đủ số dư (cần {so_tien:,}đ, có {self.so_du:,}đ)\")\n        elif so_tien > 0:\n            self.so_du -= so_tien\n            print(f\"  Rút {so_tien:,}đ thành công\")\n    def hien_thi(self):\n        print(f\"  [{self.chu_tk}] Số dư: {self.so_du:,}đ\")\ntk = TaiKhoan(\"Nguyễn Văn An\", 1000000)\nprint(\"=== GIAO DỊCH ===\")\ntk.hien_thi()\ntk.nap_tien(500000)\ntk.hien_thi()\ntk.rut_tien(200000)\ntk.hien_thi()\ntk.rut_tien(2000000)",
    hints: ['Phương thức nap_tien cộng, rut_tien kiểm tra đủ số dư trước khi trừ'],
    test_cases: [{ input: '', expected_output: "=== GIAO DỊCH ===\n  [Nguyễn Văn An] Số dư: 1,000,000đ\n  Nạp 500,000đ thành công\n  [Nguyễn Văn An] Số dư: 1,500,000đ\n  Rút 200,000đ thành công\n  [Nguyễn Văn An] Số dư: 1,300,000đ\n  Không đủ số dư (cần 2,000,000đ, có 1,300,000đ)", is_hidden: false }]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TỔNG HỢP: Export all exercises
// ─────────────────────────────────────────────────────────────────────────────

export const allExercises: Exercise[] = [
  ...listExercises,
  ...sortExercises,
  ...searchExercises,
  ...dictExercises,
  ...setExercises,
  ...advancedExercises,
];



// ─────────────────────────────────────────────────────────────────────────────
// BÀI TẬP BỔ SUNG — Tổng hợp các dạng
// ─────────────────────────────────────────────────────────────────────────────

export const bonusExercises: Exercise[] = [
  // --- List nâng cao ---
  { id: 'bonus-01', lesson_id: 'lesson-1-2', title: 'Tìm số xuất hiện duy nhất', description: 'Tìm các số chỉ xuất hiện đúng 1 lần trong danh sách', difficulty: 'easy', xp_reward: 50, starter_code: "ds = [1, 2, 3, 2, 4, 3, 5]\nket_qua = [x for x in ds if ds.count(x) == 1]\nprint(\"Số xuất hiện duy nhất:\", ket_qua)", solution_code: "ds = [1, 2, 3, 2, 4, 3, 5]\nket_qua = [x for x in ds if ds.count(x) == 1]\nprint(\"Số xuất hiện duy nhất:\", ket_qua)", hints: ['Dùng count() kiểm tra tần suất = 1'], test_cases: [{ input: '', expected_output: 'Số xuất hiện duy nhất: [1, 4, 5]', is_hidden: false }] },
  { id: 'bonus-02', lesson_id: 'lesson-1-2', title: 'Tích các số lẻ', description: 'Tính tích (nhân) tất cả các số lẻ trong danh sách', difficulty: 'easy', xp_reward: 40, starter_code: "ds = [1, 2, 3, 4, 5, 6, 7]\ntich = 1\nfor x in ds:\n    if x % 2 != 0:\n        tich *= x\nprint(f\"Tích các số lẻ: {tich}\")", solution_code: "ds = [1, 2, 3, 4, 5, 6, 7]\ntich = 1\nfor x in ds:\n    if x % 2 != 0:\n        tich *= x\nprint(f\"Tích các số lẻ: {tich}\")", hints: ['Khởi tạo tich=1, nhân dồn chỉ khi x lẻ'], test_cases: [{ input: '', expected_output: 'Tích các số lẻ: 105', is_hidden: false }] },
  { id: 'bonus-03', lesson_id: 'lesson-1-1', title: 'Kiểm tra list tăng dần', description: 'Kiểm tra xem danh sách có sắp xếp tăng dần không', difficulty: 'easy', xp_reward: 45, starter_code: "def is_sorted(ds):\n    for i in range(len(ds) - 1):\n        if ds[i] > ds[i + 1]:\n            return False\n    return True\n\nprint(is_sorted([1, 2, 3, 4, 5]))\nprint(is_sorted([1, 3, 2, 4, 5]))", solution_code: "def is_sorted(ds):\n    for i in range(len(ds) - 1):\n        if ds[i] > ds[i + 1]:\n            return False\n    return True\nprint(is_sorted([1, 2, 3, 4, 5]))\nprint(is_sorted([1, 3, 2, 4, 5]))", hints: ['So sánh từng cặp liền kề, nếu trái > phải → False'], test_cases: [{ input: '', expected_output: 'True\nFalse', is_hidden: false }] },
  { id: 'bonus-04', lesson_id: 'lesson-1-2', title: 'List comprehension: bình phương', description: 'Tạo list bình phương các số từ 1 đến 10 bằng list comprehension', difficulty: 'easy', xp_reward: 40, starter_code: "binh_phuong = [x**2 for x in range(1, 11)]\nprint(\"Bình phương 1-10:\", binh_phuong)", solution_code: "binh_phuong = [x**2 for x in range(1, 11)]\nprint(\"Bình phương 1-10:\", binh_phuong)", hints: ['[expression for x in range()] là list comprehension'], test_cases: [{ input: '', expected_output: 'Bình phương 1-10: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]', is_hidden: false }] },
  { id: 'bonus-05', lesson_id: 'lesson-1-2', title: 'Lọc số nguyên tố', description: 'Lọc ra các số nguyên tố từ danh sách', difficulty: 'medium', xp_reward: 70, starter_code: "def la_nguyen_to(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nds = list(range(2, 30))\nnt = [x for x in ds if la_nguyen_to(x)]\nprint(\"Số nguyên tố < 30:\", nt)", solution_code: "def la_nguyen_to(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\nds = list(range(2, 30))\nnt = [x for x in ds if la_nguyen_to(x)]\nprint(\"Số nguyên tố < 30:\", nt)", hints: ['Kiểm tra chia hết từ 2 đến sqrt(n)'], test_cases: [{ input: '', expected_output: 'Số nguyên tố < 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]', is_hidden: false }] },
  // --- Sắp xếp bổ sung ---
  { id: 'bonus-06', lesson_id: 'lesson-2-2', title: 'Sắp xếp chẵn trước lẻ sau', description: 'Sắp xếp sao cho tất cả số chẵn đứng trước, số lẻ đứng sau', difficulty: 'medium', xp_reward: 65, starter_code: "ds = [3, 1, 2, 4, 7, 6, 8, 5]\nchan = sorted([x for x in ds if x % 2 == 0])\nle = sorted([x for x in ds if x % 2 != 0])\nket_qua = chan + le\nprint(\"Gốc:\", ds)\nprint(\"Chẵn trước, lẻ sau:\", ket_qua)", solution_code: "ds = [3, 1, 2, 4, 7, 6, 8, 5]\nchan = sorted([x for x in ds if x % 2 == 0])\nle = sorted([x for x in ds if x % 2 != 0])\nket_qua = chan + le\nprint(\"Gốc:\", ds)\nprint(\"Chẵn trước, lẻ sau:\", ket_qua)", hints: ['Tách thành 2 list (chẵn, lẻ), sort từng cái, ghép lại'], test_cases: [{ input: '', expected_output: 'Gốc: [3, 1, 2, 4, 7, 6, 8, 5]\nChẵn trước, lẻ sau: [2, 4, 6, 8, 1, 3, 5, 7]', is_hidden: false }] },
  { id: 'bonus-07', lesson_id: 'lesson-2-3', title: 'So sánh thời gian 3 thuật toán', description: 'Chạy 3 thuật toán sắp xếp trên cùng list và so sánh số phép so sánh', difficulty: 'hard', xp_reward: 100, starter_code: "import random\nrandom.seed(42)\nds_goc = [random.randint(1, 100) for _ in range(20)]\n\ndef selection_count(ds):\n    ds = ds[:]\n    c = 0\n    for i in range(len(ds)-1):\n        m = i\n        for j in range(i+1, len(ds)):\n            c += 1\n            if ds[j] < ds[m]: m = j\n        ds[i], ds[m] = ds[m], ds[i]\n    return c\n\ndef bubble_count(ds):\n    ds = ds[:]\n    c = 0\n    for i in range(len(ds)-1):\n        for j in range(len(ds)-1-i):\n            c += 1\n            if ds[j] > ds[j+1]:\n                ds[j], ds[j+1] = ds[j+1], ds[j]\n    return c\n\ndef insertion_count(ds):\n    ds = ds[:]\n    c = 0\n    for i in range(1, len(ds)):\n        key = ds[i]\n        j = i - 1\n        while j >= 0:\n            c += 1\n            if ds[j] > key:\n                ds[j+1] = ds[j]\n                j -= 1\n            else:\n                break\n        ds[j+1] = key\n    return c\n\nprint(f\"List ({len(ds_goc)} phần tử)\")\nprint(f\"Selection Sort: {selection_count(ds_goc)} so sánh\")\nprint(f\"Bubble Sort:    {bubble_count(ds_goc)} so sánh\")\nprint(f\"Insertion Sort: {insertion_count(ds_goc)} so sánh\")", solution_code: "import random\nrandom.seed(42)\nds_goc = [random.randint(1, 100) for _ in range(20)]\ndef selection_count(ds):\n    ds = ds[:]; c = 0\n    for i in range(len(ds)-1):\n        m = i\n        for j in range(i+1, len(ds)):\n            c += 1\n            if ds[j] < ds[m]: m = j\n        ds[i], ds[m] = ds[m], ds[i]\n    return c\ndef bubble_count(ds):\n    ds = ds[:]; c = 0\n    for i in range(len(ds)-1):\n        for j in range(len(ds)-1-i):\n            c += 1\n            if ds[j] > ds[j+1]: ds[j], ds[j+1] = ds[j+1], ds[j]\n    return c\ndef insertion_count(ds):\n    ds = ds[:]; c = 0\n    for i in range(1, len(ds)):\n        key = ds[i]; j = i - 1\n        while j >= 0:\n            c += 1\n            if ds[j] > key: ds[j+1] = ds[j]; j -= 1\n            else: break\n        ds[j+1] = key\n    return c\nprint(f\"List ({len(ds_goc)} phần tử)\")\nprint(f\"Selection Sort: {selection_count(ds_goc)} so sánh\")\nprint(f\"Bubble Sort:    {bubble_count(ds_goc)} so sánh\")\nprint(f\"Insertion Sort: {insertion_count(ds_goc)} so sánh\")", hints: ['Mỗi hàm copy list trước khi sort, đếm biến c mỗi lần so sánh'], test_cases: [{ input: '', expected_output: 'List (20 phần tử)\nSelection Sort: 190 so sánh\nBubble Sort:    190 so sánh\nInsert Sort: 97 so sánh', is_hidden: true }] },
  // --- Dict bổ sung ---
  { id: 'bonus-08', lesson_id: 'lesson-4-2', title: 'Chuyển đổi nhiệt độ', description: 'Tạo dict chuyển đổi nhiệt độ các thành phố từ C sang F', difficulty: 'easy', xp_reward: 45, starter_code: "nhiet_do_c = {\"Hà Nội\": 25, \"TP.HCM\": 32, \"Đà Nẵng\": 28, \"Huế\": 23}\n\nnhiet_do_f = {}\nfor tp, c in nhiet_do_c.items():\n    nhiet_do_f[tp] = round(c * 9/5 + 32, 1)\n\nprint(\"Nhiệt độ (°C → °F):\")\nfor tp in nhiet_do_c:\n    print(f\"  {tp}: {nhiet_do_c[tp]}°C = {nhiet_do_f[tp]}°F\")", solution_code: "nhiet_do_c = {\"Hà Nội\": 25, \"TP.HCM\": 32, \"Đà Nẵng\": 28, \"Huế\": 23}\nnhiet_do_f = {tp: round(c * 9/5 + 32, 1) for tp, c in nhiet_do_c.items()}\nprint(\"Nhiệt độ (°C → °F):\")\nfor tp in nhiet_do_c:\n    print(f\"  {tp}: {nhiet_do_c[tp]}°C = {nhiet_do_f[tp]}°F\")", hints: ['Công thức: F = C * 9/5 + 32'], test_cases: [{ input: '', expected_output: 'Nhiệt độ (°C → °F):\n  Hà Nội: 25°C = 77.0°F\n  TP.HCM: 32°C = 89.6°F\n  Đà Nẵng: 28°C = 82.4°F\n  Huế: 23°C = 73.4°F', is_hidden: false }] },
  { id: 'bonus-09', lesson_id: 'lesson-4-1', title: 'Thống kê điểm theo môn', description: 'Dùng dict thống kê điểm TB theo từng môn học', difficulty: 'medium', xp_reward: 70, starter_code: "bang_diem = [\n    {\"ten\": \"An\", \"toan\": 8, \"ly\": 7, \"hoa\": 9},\n    {\"ten\": \"Bình\", \"toan\": 6, \"ly\": 8, \"hoa\": 7},\n    {\"ten\": \"Chi\", \"toan\": 9, \"ly\": 9, \"hoa\": 8},\n]\n\nmon_hoc = [\"toan\", \"ly\", \"hoa\"]\nprint(\"Điểm TB theo môn:\")\nfor mon in mon_hoc:\n    tb = sum(hs[mon] for hs in bang_diem) / len(bang_diem)\n    print(f\"  {mon.capitalize():4s}: {tb:.1f}\")", solution_code: "bang_diem = [{\"ten\":\"An\",\"toan\":8,\"ly\":7,\"hoa\":9},{\"ten\":\"Bình\",\"toan\":6,\"ly\":8,\"hoa\":7},{\"ten\":\"Chi\",\"toan\":9,\"ly\":9,\"hoa\":8}]\nmon_hoc = [\"toan\", \"ly\", \"hoa\"]\nprint(\"Điểm TB theo môn:\")\nfor mon in mon_hoc:\n    tb = sum(hs[mon] for hs in bang_diem) / len(bang_diem)\n    print(f\"  {mon.capitalize():4s}: {tb:.1f}\")", hints: ['Duyệt list môn, dùng generator sum(hs[mon] for hs in ...) / len(...)'], test_cases: [{ input: '', expected_output: 'Điểm TB theo môn:\n  Toan: 7.7\n  Ly  : 8.0\n  Hoa : 8.0', is_hidden: false }] },
  // --- Đệ quy bổ sung ---
  { id: 'bonus-10', lesson_id: 'lesson-cd1-1', title: 'Đệ quy: đếm chữ số', description: 'Đếm số chữ số của một số nguyên dương bằng đệ quy', difficulty: 'easy', xp_reward: 50, starter_code: "def dem_chu_so(n):\n    if n < 10:\n        return 1\n    return 1 + dem_chu_so(n // 10)\n\nfor so in [5, 42, 123, 9999, 100000]:\n    print(f\"{so} có {dem_chu_so(so)} chữ số\")", solution_code: "def dem_chu_so(n):\n    if n < 10:\n        return 1\n    return 1 + dem_chu_so(n // 10)\nfor so in [5, 42, 123, 9999, 100000]:\n    print(f\"{so} có {dem_chu_so(so)} chữ số\")", hints: ['Base: n < 10 → 1 chữ số. Recursive: 1 + đệ quy(n//10)'], test_cases: [{ input: '', expected_output: '5 có 1 chữ số\n42 có 2 chữ số\n123 có 3 chữ số\n9999 có 4 chữ số\n100000 có 6 chữ số', is_hidden: false }] },
  { id: 'bonus-11', lesson_id: 'lesson-cd1-1', title: 'Đệ quy: ước chung lớn nhất', description: 'Tính UCLN (GCD) bằng thuật toán Euclid đệ quy', difficulty: 'medium', xp_reward: 70, starter_code: "def ucln(a, b):\n    if b == 0:\n        return a\n    return ucln(b, a % b)\n\ncaps = [(12, 8), (100, 75), (17, 5), (48, 36)]\nfor a, b in caps:\n    print(f\"UCLN({a}, {b}) = {ucln(a, b)}\")", solution_code: "def ucln(a, b):\n    if b == 0:\n        return a\n    return ucln(b, a % b)\ncaps = [(12, 8), (100, 75), (17, 5), (48, 36)]\nfor a, b in caps:\n    print(f\"UCLN({a}, {b}) = {ucln(a, b)}\")", hints: ['Euclid: ucln(a,b) = ucln(b, a%b), base: b=0 → return a'], test_cases: [{ input: '', expected_output: 'UCLN(12, 8) = 4\nUCLN(100, 75) = 25\nUCLN(17, 5) = 1\nUCLN(48, 36) = 12', is_hidden: false }] },
  { id: 'bonus-12', lesson_id: 'lesson-cd2-1', title: 'Class: Danh sách liên kết đơn giản', description: 'Mô phỏng Stack (LIFO) bằng class', difficulty: 'hard', xp_reward: 100, starter_code: "class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n        return None\n\n    def peek(self):\n        if not self.is_empty():\n            return self.items[-1]\n        return None\n\n    def is_empty(self):\n        return len(self.items) == 0\n\n    def size(self):\n        return len(self.items)\n\n# Test\ns = Stack()\nfor x in [10, 20, 30, 40]:\n    s.push(x)\n    print(f\"Push {x} → size={s.size()}\")\n\nprint(f\"\\nPeek: {s.peek()}\")\nwhile not s.is_empty():\n    print(f\"Pop: {s.pop()}\")", solution_code: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n        return None\n    def peek(self):\n        if not self.is_empty():\n            return self.items[-1]\n        return None\n    def is_empty(self):\n        return len(self.items) == 0\n    def size(self):\n        return len(self.items)\ns = Stack()\nfor x in [10, 20, 30, 40]:\n    s.push(x)\n    print(f\"Push {x} → size={s.size()}\")\nprint(f\"\\nPeek: {s.peek()}\")\nwhile not s.is_empty():\n    print(f\"Pop: {s.pop()}\")", hints: ['push = append, pop = list.pop(), peek = items[-1]'], test_cases: [{ input: '', expected_output: 'Push 10 → size=1\nPush 20 → size=2\nPush 30 → size=3\nPush 40 → size=4\n\nPeek: 40\nPop: 40\nPop: 30\nPop: 20\nPop: 10', is_hidden: false }] },
];

// Cập nhật allExercises để bao gồm bonus
export const totalExercises: Exercise[] = [
  ...allExercises,
  ...bonusExercises,
];
