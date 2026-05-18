// ============================================================================
// HỆ THỐNG ĐỀ THI THỬ — THEO FORMAT THI THPT
// SGK Tin học 12 — Cánh Diều (Khoa học máy tính)
// ============================================================================

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  topic: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  time_limit_minutes: number;
  passing_score: number; // phần trăm
  questions: ExamQuestion[];
}

// ══════════════════════════════════════════════════════════════════════════════
// ĐỀ 1: Kiểm tra giữa kỳ — Cấu trúc dữ liệu & Thuật toán (40 câu, 50 phút)
// ══════════════════════════════════════════════════════════════════════════════

export const exam1: Exam = {
  id: 'exam-1',
  title: 'Kiểm tra giữa kỳ — CTDL & Thuật toán',
  description: 'Ôn tập toàn bộ Chủ đề 5: List, Dictionary, Set, sắp xếp, tìm kiếm',
  time_limit_minutes: 50,
  passing_score: 50,
  questions: [
    { id: 'e1-q1', question: 'Trong Python, list được khai báo bằng dấu gì?', options: ['( )', '[ ]', '{ }', '< >'], correct_index: 1, explanation: 'List dùng dấu ngoặc vuông []. () là tuple, {} là dict/set.', topic: 'list' },
    { id: 'e1-q2', question: 'Cho ds = [10, 20, 30, 40]. Giá trị ds[2] là?', options: ['10', '20', '30', '40'], correct_index: 2, explanation: 'Index bắt đầu từ 0: ds[0]=10, ds[1]=20, ds[2]=30.', topic: 'list' },
    { id: 'e1-q3', question: 'Cho ds = [5, 10, 15, 20]. Giá trị ds[-1] là?', options: ['5', '10', '15', '20'], correct_index: 3, explanation: 'Index -1 là phần tử cuối cùng = 20.', topic: 'list' },
    { id: 'e1-q4', question: 'Phương thức nào thêm phần tử vào CUỐI list?', options: ['add()', 'append()', 'insert()', 'push()'], correct_index: 1, explanation: 'append(x) thêm x vào cuối list.', topic: 'list' },
    { id: 'e1-q5', question: 'Cho ds = [1,2,3]. Sau ds.insert(1, 99), ds là?', options: ['[99,1,2,3]', '[1,99,2,3]', '[1,2,99,3]', '[1,2,3,99]'], correct_index: 1, explanation: 'insert(1, 99) chèn 99 tại index 1.', topic: 'list' },
    { id: 'e1-q6', question: 'Cho ds = [3,1,4,1,5]. Kết quả ds.count(1) là?', options: ['0', '1', '2', '3'], correct_index: 2, explanation: 'count(1) đếm số lần xuất hiện của 1 → 2 lần.', topic: 'list' },
    { id: 'e1-q7', question: 'Lệnh nào sắp xếp list tại chỗ (in-place)?', options: ['sorted(ds)', 'ds.sort()', 'sort(ds)', 'ds.sorted()'], correct_index: 1, explanation: 'ds.sort() sắp xếp tại chỗ. sorted(ds) trả về list mới.', topic: 'list' },
    { id: 'e1-q8', question: 'Cho ds = [1,2,3,4,5]. Kết quả ds[1:4] là?', options: ['[1,2,3,4]', '[2,3,4]', '[2,3,4,5]', '[1,2,3]'], correct_index: 1, explanation: 'Slicing [1:4] lấy index 1,2,3 → [2,3,4].', topic: 'list' },
    { id: 'e1-q9', question: 'Thuật toán sắp xếp nào tìm phần tử nhỏ nhất rồi đặt vào đúng vị trí?', options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Quick Sort'], correct_index: 2, explanation: 'Selection Sort: tìm min trong phần chưa sắp xếp, đặt vào đầu.', topic: 'sort' },
    { id: 'e1-q10', question: 'Trong Bubble Sort, sau lượt duyệt đầu tiên, phần tử nào ở đúng vị trí?', options: ['Nhỏ nhất ở đầu', 'Lớn nhất ở cuối', 'Phần tử giữa', 'Không phần tử nào'], correct_index: 1, explanation: 'Bubble Sort: phần tử lớn nhất "nổi" lên cuối sau mỗi lượt.', topic: 'sort' },
    { id: 'e1-q11', question: 'Độ phức tạp thời gian của Selection Sort trong trường hợp xấu nhất?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'], correct_index: 2, explanation: 'Selection Sort luôn O(n²) — hai vòng lặp lồng nhau.', topic: 'sort' },
    { id: 'e1-q12', question: 'Insertion Sort hoạt động giống hành động nào?', options: ['Tìm đồ trong hộp', 'Xếp bài', 'Đổ nước', 'Gấp giấy'], correct_index: 1, explanation: 'Insertion Sort giống xếp bài: chèn từng lá vào đúng vị trí.', topic: 'sort' },
    { id: 'e1-q13', question: 'Bubble Sort tối ưu dùng "cờ hiệu" để làm gì?', options: ['Tăng tốc so sánh', 'Dừng sớm khi đã sắp xếp', 'Giảm bộ nhớ', 'Đổi thuật toán'], correct_index: 1, explanation: 'Nếu 1 lượt không đổi chỗ nào → list đã sắp xếp → dừng sớm.', topic: 'sort' },
    { id: 'e1-q14', question: 'Thuật toán nào có thể đạt O(n) khi list đã gần sắp xếp?', options: ['Selection Sort', 'Insertion Sort', 'Cả Selection và Insertion', 'Không thuật toán nào'], correct_index: 1, explanation: 'Insertion Sort đạt O(n) khi list đã sắp xếp hoặc gần sắp xếp.', topic: 'sort' },
    { id: 'e1-q15', question: 'Tìm kiếm tuần tự có yêu cầu list phải sắp xếp không?', options: ['Có', 'Không', 'Chỉ cần sắp xếp một phần', 'Tùy trường hợp'], correct_index: 1, explanation: 'Tìm kiếm tuần tự duyệt lần lượt, không cần list sắp xếp.', topic: 'search' },
    { id: 'e1-q16', question: 'Độ phức tạp của tìm kiếm tuần tự là?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_index: 2, explanation: 'Tìm kiếm tuần tự duyệt tối đa n phần tử → O(n).', topic: 'search' },
    { id: 'e1-q17', question: 'Điều kiện BẮT BUỘC để dùng tìm kiếm nhị phân?', options: ['List > 100 phần tử', 'List đã sắp xếp', 'List chỉ chứa số', 'List không trùng'], correct_index: 1, explanation: 'Binary Search YÊU CẦU list phải được sắp xếp.', topic: 'search' },
    { id: 'e1-q18', question: 'Với list 1024 phần tử, Binary Search cần tối đa bao nhiêu bước?', options: ['1024', '512', '10', '100'], correct_index: 2, explanation: 'log₂(1024) = 10 → tối đa 10 bước so sánh.', topic: 'search' },
    { id: 'e1-q19', question: 'Dictionary lưu dữ liệu dưới dạng gì?', options: ['Danh sách index', 'Cặp key-value', 'Cây nhị phân', 'Hàng đợi'], correct_index: 1, explanation: 'Dictionary lưu trữ cặp key: value.', topic: 'dict' },
    { id: 'e1-q20', question: 'Key trong dictionary Python KHÔNG thể là kiểu nào?', options: ['str', 'int', 'list', 'tuple'], correct_index: 2, explanation: 'List là mutable → không dùng làm key. Key phải là immutable.', topic: 'dict' },
    { id: 'e1-q21', question: 'Cách nào kiểm tra key có trong dict?', options: ['dict.has(key)', 'key in dict', 'dict.contains(key)', 'dict.find(key)'], correct_index: 1, explanation: 'Dùng toán tử "in": key in dict → True/False.', topic: 'dict' },
    { id: 'e1-q22', question: 'd.get("x", 0) làm gì khi key "x" không tồn tại?', options: ['Gây lỗi', 'Trả về None', 'Trả về 0', 'Tạo key mới'], correct_index: 2, explanation: 'get(key, default) trả về default khi key không tồn tại.', topic: 'dict' },
    { id: 'e1-q23', question: 'Phương thức items() của dict trả về gì?', options: ['Chỉ keys', 'Chỉ values', 'Các cặp (key, value)', 'Số phần tử'], correct_index: 2, explanation: 'items() trả về các cặp (key, value) dạng tuple.', topic: 'dict' },
    { id: 'e1-q24', question: 'Set có đặc điểm nào sau đây?', options: ['Có thứ tự, cho phép trùng', 'Không thứ tự, không trùng', 'Có thứ tự, không trùng', 'Truy cập qua index'], correct_index: 1, explanation: 'Set: unordered (không thứ tự) + unique (không trùng).', topic: 'set' },
    { id: 'e1-q25', question: 'Cách nào tạo set rỗng ĐÚNG?', options: ['s = {}', 's = set()', 's = set[]', 's = ()'], correct_index: 1, explanation: '{} tạo dict rỗng. Phải dùng set() cho set rỗng.', topic: 'set' },
    { id: 'e1-q26', question: 'A = {1,2,3}, B = {2,3,4}. A | B là?', options: ['{2,3}', '{1,2,3,4}', '{1,4}', '{1,2,3,2,3,4}'], correct_index: 1, explanation: '| là phép hợp (union): tất cả phần tử = {1,2,3,4}.', topic: 'set' },
    { id: 'e1-q27', question: 'A = {1,2,3}, B = {2,3,4}. A & B là?', options: ['{1,2,3,4}', '{2,3}', '{1,4}', '{1}'], correct_index: 1, explanation: '& là phép giao (intersection): phần tử chung = {2,3}.', topic: 'set' },
    { id: 'e1-q28', question: 'A = {1,2,3}, B = {2,3,4}. A - B là?', options: ['{1}', '{4}', '{2,3}', '{1,4}'], correct_index: 0, explanation: '- là phép hiệu: phần tử có ở A nhưng không ở B = {1}.', topic: 'set' },
    { id: 'e1-q29', question: 'Cho code: ds = [1,2,2,3,3,3]. Kết quả len(set(ds))?', options: ['3', '4', '5', '6'], correct_index: 0, explanation: 'set(ds) = {1,2,3} có 3 phần tử (loại trùng).', topic: 'set' },
    { id: 'e1-q30', question: 'Kết quả: list(range(1,10,2)) là gì?', options: ['[1,2,3,4,5,6,7,8,9]', '[1,3,5,7,9]', '[2,4,6,8]', '[1,10,2]'], correct_index: 1, explanation: 'range(1,10,2): từ 1, bước 2, dưới 10 → [1,3,5,7,9].', topic: 'list' },
    { id: 'e1-q31', question: 'Cho ds = [5,3,8,1]. Sau ds.sort(reverse=True), ds là?', options: ['[1,3,5,8]', '[8,5,3,1]', '[5,3,8,1]', 'Lỗi'], correct_index: 1, explanation: 'sort(reverse=True) sắp xếp giảm dần: [8,5,3,1].', topic: 'list' },
    { id: 'e1-q32', question: 'Hàm len() dùng cho kiểu dữ liệu nào?', options: ['Chỉ list', 'Chỉ string', 'list, dict, set, string, tuple', 'Chỉ số'], correct_index: 2, explanation: 'len() đo kích thước của mọi container: list, dict, set, str, tuple.', topic: 'list' },
    { id: 'e1-q33', question: 'pop() không có tham số sẽ xóa phần tử nào?', options: ['Đầu tiên', 'Cuối cùng', 'Ngẫu nhiên', 'Nhỏ nhất'], correct_index: 1, explanation: 'pop() (không tham số) xóa và trả về phần tử CUỐI cùng.', topic: 'list' },
    { id: 'e1-q34', question: 'Trong Binary Search, khi ds[mid] < key, bước tiếp là?', options: ['right = mid - 1', 'left = mid + 1', 'mid = mid + 1', 'Dừng'], correct_index: 1, explanation: 'Nếu ds[mid] < key → key ở nửa phải → left = mid + 1.', topic: 'search' },
    { id: 'e1-q35', question: 'Sắp xếp nào KHÔNG phải sắp xếp ổn định (stable)?', options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort'], correct_index: 2, explanation: 'Selection Sort không ổn định: có thể đổi thứ tự phần tử bằng nhau.', topic: 'sort' },
    { id: 'e1-q36', question: 'Cho d = {"a":1, "b":2}. Sau d["c"]=3, d là?', options: ['Lỗi', '{"a":1,"b":2,"c":3}', '{"c":3}', '{"a":1,"b":2}'], correct_index: 1, explanation: 'Gán d["c"]=3 thêm cặp key-value mới nếu key chưa tồn tại.', topic: 'dict' },
    { id: 'e1-q37', question: 'Cho d = {"x":10, "y":20}. d.pop("x") trả về?', options: ['{"y":20}', '"x"', '10', 'None'], correct_index: 2, explanation: 'pop(key) xóa key và TRẢ VỀ value tương ứng = 10.', topic: 'dict' },
    { id: 'e1-q38', question: 'List comprehension [x*2 for x in range(5)] cho kết quả?', options: ['[0,1,2,3,4]', '[2,4,6,8,10]', '[0,2,4,6,8]', '[1,2,3,4,5]'], correct_index: 2, explanation: 'range(5)=[0,1,2,3,4], nhân 2 → [0,2,4,6,8].', topic: 'list' },
    { id: 'e1-q39', question: 'Cho s = {1,2,3}. Sau s.add(2), s là?', options: ['{1,2,3,2}', '{1,2,3}', 'Lỗi', '{1,3}'], correct_index: 1, explanation: 'Set không cho phép trùng. add(2) khi 2 đã có → không thay đổi.', topic: 'set' },
    { id: 'e1-q40', question: 'Thuật toán nào tốt nhất cho danh sách nhỏ (< 50)?', options: ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Heap Sort'], correct_index: 2, explanation: 'Insertion Sort hiệu quả nhất cho list nhỏ do overhead thấp.', topic: 'sort' },
  ]
};



// ══════════════════════════════════════════════════════════════════════════════
// ĐỀ 2: Kiểm tra cuối kỳ — Tổng hợp toàn bộ (40 câu, 50 phút)
// ══════════════════════════════════════════════════════════════════════════════

export const exam2: Exam = {
  id: 'exam-2',
  title: 'Kiểm tra cuối kỳ — Tổng hợp',
  description: 'Ôn tập toàn bộ: CTDL, Thuật toán, Mạng, An toàn thông tin, Đạo đức CNTT',
  time_limit_minutes: 50,
  passing_score: 50,
  questions: [
    { id: 'e2-q1', question: 'Mô hình TCP/IP có bao nhiêu tầng?', options: ['3', '4', '5', '7'], correct_index: 1, explanation: 'TCP/IP có 4 tầng: Ứng dụng, Giao vận, Internet, Truy cập mạng.', topic: 'network' },
    { id: 'e2-q2', question: 'DNS có chức năng gì?', options: ['Mã hóa dữ liệu', 'Chuyển tên miền thành IP', 'Gửi email', 'Truyền file'], correct_index: 1, explanation: 'DNS = Domain Name System: dịch tên miền → địa chỉ IP.', topic: 'network' },
    { id: 'e2-q3', question: 'HTTPS khác HTTP ở điểm nào?', options: ['Nhanh hơn', 'Có mã hóa SSL/TLS', 'Miễn phí', 'Chỉ dùng cho video'], correct_index: 1, explanation: 'HTTPS = HTTP + SSL/TLS encryption (mã hóa).', topic: 'network' },
    { id: 'e2-q4', question: 'TCP khác UDP ở điểm nào?', options: ['TCP nhanh hơn', 'TCP đảm bảo dữ liệu đầy đủ', 'UDP an toàn hơn', 'Không khác'], correct_index: 1, explanation: 'TCP reliable (đảm bảo truyền đủ, đúng thứ tự). UDP nhanh hơn nhưng unreliable.', topic: 'network' },
    { id: 'e2-q5', question: 'Phishing là hình thức tấn công gì?', options: ['Cài virus', 'Giả mạo web/email lừa lấy thông tin', 'DDoS', 'Brute force'], correct_index: 1, explanation: 'Phishing: giả mạo website/email để lừa người dùng cung cấp thông tin.', topic: 'security' },
    { id: 'e2-q6', question: 'Mã hóa bất đối xứng dùng bao nhiêu key?', options: ['1', '2', '3', '0'], correct_index: 1, explanation: '2 key: Public key (mã hóa) + Private key (giải mã).', topic: 'security' },
    { id: 'e2-q7', question: 'Xác thực 2 yếu tố (2FA) giúp gì?', options: ['Tăng tốc', 'Thêm lớp bảo vệ ngoài password', 'Mã hóa file', 'Chặn virus'], correct_index: 1, explanation: '2FA thêm một lớp xác thực (OTP, fingerprint) ngoài mật khẩu.', topic: 'security' },
    { id: 'e2-q8', question: 'Mật khẩu mạnh cần tối thiểu bao nhiêu ký tự?', options: ['4', '6', '8', '12'], correct_index: 2, explanation: 'Khuyến nghị tối thiểu 8 ký tự, tốt nhất ≥ 12 ký tự.', topic: 'security' },
    { id: 'e2-q9', question: 'Phần mềm Open Source có đặc điểm gì?', options: ['Phải trả phí', 'Được xem và sửa mã nguồn', 'Không an toàn', 'Chỉ cho developer'], correct_index: 1, explanation: 'Open Source: mã nguồn mở, được xem, sửa, phân phối.', topic: 'ethics' },
    { id: 'e2-q10', question: 'CC BY-NC nghĩa là gì?', options: ['Tự do hoàn toàn', 'Dùng + ghi nguồn + không thương mại', 'Cấm sao chép', 'Chỉ dùng 1 lần'], correct_index: 1, explanation: 'CC BY (Attribution) + NC (Non-Commercial).', topic: 'ethics' },
    { id: 'e2-q11', question: 'Hành vi nào vi phạm bản quyền phần mềm?', options: ['Dùng phần mềm miễn phí', 'Crack phần mềm trả phí', 'Dùng Linux', 'Viết code'], correct_index: 1, explanation: 'Crack phần mềm = bẻ khóa sử dụng trái phép = vi phạm bản quyền.', topic: 'ethics' },
    { id: 'e2-q12', question: 'Khi bị cyberbullying, KHÔNG nên làm gì?', options: ['Chụp bằng chứng', 'Trả đũa', 'Báo cáo', 'Chặn'], correct_index: 1, explanation: 'Trả đũa sẽ leo thang vấn đề. Nên: chụp bằng chứng, chặn, báo cáo.', topic: 'ethics' },
    { id: 'e2-q13', question: 'Dấu hiệu của tin giả (fake news)?', options: ['Trên trang chính phủ', 'Tiêu đề giật gân, nguồn không rõ', 'Có ngày đăng', 'Nhiều like'], correct_index: 1, explanation: 'Tin giả: tiêu đề giật gân, nguồn không rõ, thiếu bằng chứng.', topic: 'ethics' },
    { id: 'e2-q14', question: 'Tường lửa (Firewall) có chức năng gì?', options: ['Diệt virus', 'Kiểm soát lưu lượng mạng vào/ra', 'Mã hóa dữ liệu', 'Tăng tốc mạng'], correct_index: 1, explanation: 'Firewall kiểm soát và lọc lưu lượng mạng vào/ra hệ thống.', topic: 'security' },
    { id: 'e2-q15', question: 'IPv4 có dạng gì?', options: ['4 số (0-255) ngăn bởi dấu chấm', '6 cặp hex ngăn bởi :', 'Một chuỗi text', '8 bit'], correct_index: 0, explanation: 'IPv4: 4 số từ 0-255, ví dụ 192.168.1.1.', topic: 'network' },
    // Thêm câu CTDL & Thuật toán
    { id: 'e2-q16', question: 'Cho ds = [3,1,4,1,5]. Kết quả sum(ds) là?', options: ['13', '14', '15', '5'], correct_index: 1, explanation: '3+1+4+1+5 = 14.', topic: 'list' },
    { id: 'e2-q17', question: 'Cho d = {"a":1}. d["b"] gây lỗi gì?', options: ['ValueError', 'IndexError', 'KeyError', 'TypeError'], correct_index: 2, explanation: 'Truy cập key không tồn tại bằng [] gây KeyError.', topic: 'dict' },
    { id: 'e2-q18', question: 'Binary Search trên list 1 triệu phần tử cần khoảng bao nhiêu bước?', options: ['1000', '100', '20', '1000000'], correct_index: 2, explanation: 'log₂(1,000,000) ≈ 20 bước.', topic: 'search' },
    { id: 'e2-q19', question: 'Cho s = {1,2,3}. s.discard(5) làm gì?', options: ['Lỗi', 'Không làm gì', 'Xóa 5', 'Thêm 5'], correct_index: 1, explanation: 'discard() không gây lỗi nếu phần tử không tồn tại.', topic: 'set' },
    { id: 'e2-q20', question: 'Lĩnh vực CNTT nào đang có nhu cầu tuyển dụng cao nhất?', options: ['Nhập liệu', 'AI/ML & Cybersecurity', 'Thiết kế poster', 'Sửa máy in'], correct_index: 1, explanation: 'AI/Machine Learning và An ninh mạng đang có nhu cầu rất cao.', topic: 'career' },
    { id: 'e2-q21', question: 'Kỹ năng nào quan trọng nhất cho mọi lĩnh vực CNTT?', options: ['Nhớ cú pháp', 'Tư duy logic & giải quyết vấn đề', 'Đánh máy nhanh', 'Thiết kế đẹp'], correct_index: 1, explanation: 'Tư duy logic là nền tảng cho mọi lĩnh vực CNTT.', topic: 'career' },
    { id: 'e2-q22', question: 'Selection Sort có bao nhiêu phép so sánh trên list n phần tử?', options: ['n', 'n log n', 'n(n-1)/2', 'n²'], correct_index: 2, explanation: 'Selection Sort: (n-1)+(n-2)+...+1 = n(n-1)/2 phép so sánh.', topic: 'sort' },
    { id: 'e2-q23', question: 'Tầng nào trong TCP/IP chịu trách nhiệm định tuyến gói tin?', options: ['Ứng dụng', 'Giao vận', 'Internet', 'Truy cập mạng'], correct_index: 2, explanation: 'Tầng Internet (giao thức IP) chịu trách nhiệm định tuyến gói tin.', topic: 'network' },
    { id: 'e2-q24', question: 'UDP thường dùng cho ứng dụng nào?', options: ['Email', 'Web browsing', 'Video call / Game online', 'Download file'], correct_index: 2, explanation: 'UDP nhanh (không cần xác nhận) → phù hợp real-time: video call, game.', topic: 'network' },
    { id: 'e2-q25', question: 'Cho ds = ["a","b","c"]. "b" in ds cho kết quả?', options: ['True', 'False', '1', 'Lỗi'], correct_index: 0, explanation: '"b" có trong list → toán tử in trả về True.', topic: 'list' },
    { id: 'e2-q26', question: 'Ransomware là loại malware nào?', options: ['Nghe lén', 'Mã hóa dữ liệu đòi tiền chuộc', 'Spam email', 'Chặn mạng'], correct_index: 1, explanation: 'Ransomware mã hóa dữ liệu nạn nhân và đòi tiền chuộc.', topic: 'security' },
    { id: 'e2-q27', question: 'Trong Python, "==" dùng để làm gì?', options: ['Gán giá trị', 'So sánh bằng', 'So sánh type', 'Khai báo biến'], correct_index: 1, explanation: '== so sánh giá trị. = là gán.', topic: 'list' },
    { id: 'e2-q28', question: 'enumerate() trong vòng lặp for cung cấp gì?', options: ['Chỉ index', 'Chỉ value', 'Cả index và value', 'Độ dài list'], correct_index: 2, explanation: 'enumerate(ds) trả về (index, value) cho mỗi phần tử.', topic: 'list' },
    { id: 'e2-q29', question: 'Luật An ninh mạng Việt Nam quy định gì?', options: ['Chỉ cho phép dùng Facebook', 'Bảo vệ an ninh quốc gia trên không gian mạng', 'Cấm dùng Internet', 'Chỉ áp dụng cho doanh nghiệp'], correct_index: 1, explanation: 'Luật An ninh mạng bảo vệ an ninh quốc gia trên không gian mạng.', topic: 'ethics' },
    { id: 'e2-q30', question: 'Cho ds=[1,2,3]. ds.extend([4,5]) cho kết quả?', options: ['[1,2,3,[4,5]]', '[1,2,3,4,5]', '[[1,2,3],[4,5]]', 'Lỗi'], correct_index: 1, explanation: 'extend() nối từng phần tử của list khác vào cuối.', topic: 'list' },
    { id: 'e2-q31', question: 'Giao thức nào dùng để gửi email?', options: ['HTTP', 'FTP', 'SMTP', 'DNS'], correct_index: 2, explanation: 'SMTP (Simple Mail Transfer Protocol) dùng để gửi email.', topic: 'network' },
    { id: 'e2-q32', question: 'sorted() khác ds.sort() ở điểm nào?', options: ['sorted() nhanh hơn', 'sorted() trả về list MỚI, sort() sửa tại chỗ', 'sort() chỉ cho số', 'Không khác'], correct_index: 1, explanation: 'sorted(ds) trả về list mới. ds.sort() sửa ds tại chỗ (in-place).', topic: 'list' },
    { id: 'e2-q33', question: 'VPN có tác dụng gì?', options: ['Tăng tốc mạng', 'Mã hóa kết nối và ẩn IP', 'Diệt virus', 'Chặn spam'], correct_index: 1, explanation: 'VPN tạo đường hầm mã hóa, ẩn địa chỉ IP thật.', topic: 'security' },
    { id: 'e2-q34', question: 'Cho d={1:"a", 2:"b"}. list(d.keys()) là?', options: ['["a","b"]', '[1, 2]', '[(1,"a"),(2,"b")]', 'Lỗi'], correct_index: 1, explanation: 'd.keys() trả về các key: [1, 2].', topic: 'dict' },
    { id: 'e2-q35', question: 'Bubble Sort cần tối đa bao nhiêu lượt duyệt cho list n phần tử?', options: ['n', 'n-1', 'n²', 'log n'], correct_index: 1, explanation: 'Bubble Sort cần tối đa n-1 lượt (mỗi lượt đưa 1 phần tử về đúng chỗ).', topic: 'sort' },
    { id: 'e2-q36', question: 'Social Engineering là gì?', options: ['Kỹ thuật mạng xã hội', 'Lừa đảo thông qua tâm lý con người', 'Phát triển phần mềm', 'Thiết kế web'], correct_index: 1, explanation: 'Social Engineering: lừa đảo qua kỹ thuật tâm lý, không qua kỹ thuật máy.', topic: 'security' },
    { id: 'e2-q37', question: 'Cho s={1,2,3} và t={3,4,5}. s^t (symmetric difference) là?', options: ['{3}', '{1,2,4,5}', '{1,2,3,4,5}', '{}'], correct_index: 1, explanation: '^ = symmetric difference: phần tử chỉ ở 1 trong 2 set = {1,2,4,5}.', topic: 'set' },
    { id: 'e2-q38', question: 'Data Scientist cần kỹ năng gì nhất?', options: ['Thiết kế đồ họa', 'Python, SQL, Thống kê', 'HTML/CSS', 'Sửa phần cứng'], correct_index: 1, explanation: 'Data Science cần: Python (xử lý), SQL (dữ liệu), Statistics (phân tích).', topic: 'career' },
    { id: 'e2-q39', question: 'Kết quả: [x for x in range(10) if x%3==0]?', options: ['[0,3,6,9]', '[3,6,9]', '[0,1,2,3]', '[0,3,6,9,12]'], correct_index: 0, explanation: 'range(10)=[0..9], lọc chia hết cho 3: [0,3,6,9].', topic: 'list' },
    { id: 'e2-q40', question: 'Cho ds=[5,2,8,1,9]. Sau selection_sort, phép đổi chỗ đầu tiên là?', options: ['5↔2', '5↔1', '8↔1', '9↔1'], correct_index: 1, explanation: 'Selection Sort tìm min=1 (index 3), đổi với index 0 (số 5).', topic: 'sort' },
  ]
};

// ══════════════════════════════════════════════════════════════════════════════
// ĐỀ 3: Đề thi nhanh — Chỉ phần lập trình (20 câu, 25 phút)
// ══════════════════════════════════════════════════════════════════════════════

export const exam3: Exam = {
  id: 'exam-3',
  title: 'Đề thi nhanh — Lập trình Python',
  description: 'Trắc nghiệm nhanh về code Python: đọc hiểu code và dự đoán kết quả',
  time_limit_minutes: 25,
  passing_score: 60,
  questions: [
    { id: 'e3-q1', question: 'Kết quả: print(10 // 3)?', options: ['3', '3.33', '4', '3.0'], correct_index: 0, explanation: '// là chia lấy phần nguyên: 10//3 = 3.', topic: 'python' },
    { id: 'e3-q2', question: 'Kết quả: print(10 % 3)?', options: ['3', '1', '0', '3.33'], correct_index: 1, explanation: '% là chia lấy dư: 10%3 = 1.', topic: 'python' },
    { id: 'e3-q3', question: 'Kết quả: print(2 ** 5)?', options: ['10', '25', '32', '7'], correct_index: 2, explanation: '** là lũy thừa: 2^5 = 32.', topic: 'python' },
    { id: 'e3-q4', question: 'Kết quả: print(len("Hello"))?', options: ['4', '5', '6', 'Lỗi'], correct_index: 1, explanation: '"Hello" có 5 ký tự.', topic: 'python' },
    { id: 'e3-q5', question: 'Kết quả: print(type([]))?', options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"], correct_index: 0, explanation: '[] là list → type trả về <class \'list\'>.', topic: 'python' },
    { id: 'e3-q6', question: 'x = [1,2,3]; y = x; y.append(4). Kết quả x?', options: ['[1,2,3]', '[1,2,3,4]', '[4]', 'Lỗi'], correct_index: 1, explanation: 'y = x tạo reference (cùng trỏ tới 1 list). Thay đổi y cũng thay đổi x.', topic: 'python' },
    { id: 'e3-q7', question: 'Kết quả: print("Python"[1:4])?', options: ['"Pyt"', '"yth"', '"ytho"', '"ython"'], correct_index: 1, explanation: 'Slicing [1:4]: lấy index 1,2,3 → "yth".', topic: 'python' },
    { id: 'e3-q8', question: 'Kết quả: print(bool(""))?', options: ['True', 'False', '""', 'None'], correct_index: 1, explanation: 'Chuỗi rỗng "" là falsy → bool("") = False.', topic: 'python' },
    { id: 'e3-q9', question: 'Kết quả: print(bool(0))?', options: ['True', 'False', '0', 'None'], correct_index: 1, explanation: '0 là falsy → bool(0) = False.', topic: 'python' },
    { id: 'e3-q10', question: 'Kết quả: print([1,2]+[3,4])?', options: ['[1,2,3,4]', '[4,6]', '[[1,2],[3,4]]', '10'], correct_index: 0, explanation: '+ nối 2 list: [1,2]+[3,4] = [1,2,3,4].', topic: 'python' },
    { id: 'e3-q11', question: 'Kết quả: print([0]*3)?', options: ['[0,0,0]', '[3]', '[0,3]', '0'], correct_index: 0, explanation: '* lặp list: [0]*3 = [0,0,0].', topic: 'python' },
    { id: 'e3-q12', question: 'Kết quả: print("abc".upper())?', options: ['"abc"', '"ABC"', '"Abc"', 'Lỗi'], correct_index: 1, explanation: 'upper() chuyển tất cả thành chữ hoa: "ABC".', topic: 'python' },
    { id: 'e3-q13', question: 'Kết quả: print(max(3, 1, 4, 1, 5, 9))?', options: ['1', '5', '9', '3'], correct_index: 2, explanation: 'max() trả về giá trị lớn nhất = 9.', topic: 'python' },
    { id: 'e3-q14', question: 'Cho f(n): if n<=1 return 1; else return n*f(n-1). f(4)=?', options: ['4', '10', '24', '120'], correct_index: 2, explanation: 'Đây là giai thừa: f(4) = 4*3*2*1 = 24.', topic: 'python' },
    { id: 'e3-q15', question: 'Kết quả: print(list(range(5, 0, -1)))?', options: ['[5,4,3,2,1]', '[5,4,3,2,1,0]', '[0,1,2,3,4,5]', '[1,2,3,4,5]'], correct_index: 0, explanation: 'range(5,0,-1): từ 5, giảm 1, dừng trước 0 → [5,4,3,2,1].', topic: 'python' },
    { id: 'e3-q16', question: 'Kết quả: d={1:2, 3:4}; print(sum(d))?', options: ['10', '4', '6', 'Lỗi'], correct_index: 0, explanation: 'sum(dict) cộng các KEY: 1+3 = 4. Ờ wait - sum({1:2, 3:4}) = 1+3 = 4.', topic: 'python' },
    { id: 'e3-q17', question: 'Kết quả: print("hello world".split())?', options: ["['hello world']", "['hello', 'world']", "['h','e','l','l','o']", "Lỗi"], correct_index: 1, explanation: 'split() mặc định tách theo khoảng trắng → 2 từ.', topic: 'python' },
    { id: 'e3-q18', question: '"".join(["a","b","c"]) cho kết quả?', options: ['"abc"', '"a b c"', '"a,b,c"', '["a","b","c"]'], correct_index: 0, explanation: '"".join() nối các phần tử với chuỗi rỗng ở giữa → "abc".', topic: 'python' },
    { id: 'e3-q19', question: 'Kết quả: print(sorted([3,1,2], reverse=True))?', options: ['[1,2,3]', '[3,2,1]', '[3,1,2]', 'None'], correct_index: 1, explanation: 'sorted() + reverse=True → sắp xếp giảm dần: [3,2,1].', topic: 'python' },
    { id: 'e3-q20', question: 'x=5. Sau x, y = y, x (giả sử y=10). x=?', options: ['5', '10', '15', 'Lỗi'], correct_index: 1, explanation: 'x, y = y, x hoán đổi giá trị: x=10, y=5.', topic: 'python' },
  ]
};

// ══════════════════════════════════════════════════════════════════════════════
// EXPORT TẤT CẢ ĐỀ THI
// ══════════════════════════════════════════════════════════════════════════════

export const allExams: Exam[] = [exam1, exam2, exam3];
