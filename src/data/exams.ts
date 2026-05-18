import { ExamSet } from '@/types';

export const exams: ExamSet[] = [
  {
    id: 'exam-1',
    slug: 'de-minh-hoa-1',
    title: 'Đề minh hoạ tốt nghiệp THPT 2025 — Số 1',
    description: 'Đề thi minh hoạ môn Tin học theo cấu trúc đề tốt nghiệp THPT 2025, bao gồm đầy đủ 7 chủ đề SGK Cánh Diều.',
    duration_minutes: 50,
    passing_score: 50,
    source: 'Tự soạn theo cấu trúc Bộ GD&ĐT 2025',
    topics: ['A', 'B', 'C', 'D', 'E', 'G_CS'],
    questions: [
      // === CHỦ ĐỀ A: Máy tính và xã hội tri thức (6 câu) ===
      { id: 'ex1-1', question: 'Máy tính thế hệ thứ 3 sử dụng công nghệ gì?', options: ['Đèn chân không', 'Transistor', 'Mạch tích hợp (IC)', 'Vi xử lý VLSI'], correct_index: 2, explanation: 'Thế hệ 3 (1965-1975) dùng IC — hàng ngàn transistor trên 1 chip.', topic_code: 'A' },
      { id: 'ex1-2', question: 'IoT là viết tắt của cụm từ nào?', options: ['Internet of Technology', 'Internet of Things', 'Internal of Things', 'Integration of Technology'], correct_index: 1, explanation: 'IoT = Internet of Things = Internet vạn vật.', topic_code: 'A' },
      { id: 'ex1-3', question: 'Đặc trưng nào KHÔNG thuộc 3V của Big Data?', options: ['Volume', 'Velocity', 'Value', 'Variety'], correct_index: 2, explanation: '3V chuẩn: Volume, Velocity, Variety. Value là đặc trưng mở rộng (5V) nhưng không thuộc 3V gốc.', topic_code: 'A' },
      { id: 'ex1-4', question: 'AI hẹp (Narrow AI) có khả năng gì?', options: ['Giỏi mọi lĩnh vực như con người', 'Chuyên biệt giỏi ở 1 nhiệm vụ cụ thể', 'Có ý thức', 'Tự nhân bản'], correct_index: 1, explanation: 'Narrow AI chỉ giỏi 1 nhiệm vụ (VD: nhận diện khuôn mặt, dịch ngôn ngữ).', topic_code: 'A' },
      { id: 'ex1-5', question: 'Deep Learning sử dụng cấu trúc gì?', options: ['Cây quyết định', 'Mạng nơ-ron nhiều tầng', 'Bảng Hash', 'Danh sách liên kết'], correct_index: 1, explanation: 'Deep Learning dùng mạng nơ-ron nhân tạo nhiều tầng (deep neural network).', topic_code: 'A' },
      { id: 'ex1-6', question: 'SaaS trong Cloud Computing có ý nghĩa gì?', options: ['Storage as a Service', 'Software as a Service', 'Security as a Service', 'System as a Service'], correct_index: 1, explanation: 'SaaS = Software as a Service — người dùng sử dụng phần mềm qua trình duyệt (VD: Google Docs).', topic_code: 'A' },

      // === CHỦ ĐỀ B: Mạng máy tính và Internet (7 câu) ===
      { id: 'ex1-7', question: 'Mạng WAN có phạm vi hoạt động?', options: ['Trong 1 phòng', 'Trong 1 toà nhà', 'Trong 1 thành phố', 'Liên quốc gia / toàn cầu'], correct_index: 3, explanation: 'WAN (Wide Area Network) = mạng diện rộng, phạm vi quốc gia đến toàn cầu.', topic_code: 'B' },
      { id: 'ex1-8', question: 'Thiết bị nào có chức năng định tuyến gói tin?', options: ['Hub', 'Switch', 'Router', 'Repeater'], correct_index: 2, explanation: 'Router định tuyến (route) gói tin giữa các mạng khác nhau dựa trên địa chỉ IP.', topic_code: 'B' },
      { id: 'ex1-9', question: 'Địa chỉ IP 10.0.0.1 thuộc lớp mạng nào?', options: ['Lớp A', 'Lớp B', 'Lớp C', 'Lớp D'], correct_index: 0, explanation: 'Lớp A: octet đầu 1-126. Địa chỉ 10.x.x.x bắt đầu bằng 10 → Lớp A.', topic_code: 'B' },
      { id: 'ex1-10', question: 'DNS có chức năng chính là gì?', options: ['Chặn virus', 'Dịch tên miền thành địa chỉ IP', 'Mã hoá email', 'Nén dữ liệu'], correct_index: 1, explanation: 'DNS phân giải (resolve) tên miền dạng chữ sang địa chỉ IP dạng số.', topic_code: 'B' },
      { id: 'ex1-11', question: 'Giao thức HTTPS khác HTTP ở điểm nào?', options: ['Nhanh hơn 10 lần', 'Có mã hoá SSL/TLS', 'Không cần server', 'Chỉ dùng cho email'], correct_index: 1, explanation: 'HTTPS = HTTP + SSL/TLS — mã hoá dữ liệu truyền đi giữa client và server.', topic_code: 'B' },
      { id: 'ex1-12', question: 'Giao thức nào dùng để GỬI email?', options: ['POP3', 'IMAP', 'SMTP', 'HTTP'], correct_index: 2, explanation: 'SMTP (Simple Mail Transfer Protocol) chuyên gửi thư đi. POP3/IMAP để nhận.', topic_code: 'B' },
      { id: 'ex1-13', question: 'Cổng (port) mặc định của HTTP là?', options: ['21', '25', '80', '443'], correct_index: 2, explanation: 'HTTP dùng port 80. HTTPS dùng 443. FTP dùng 21. SMTP dùng 25.', topic_code: 'B' },

      // === CHỦ ĐỀ C: Đạo đức, pháp luật (5 câu) ===
      { id: 'ex1-14', question: 'Ransomware hoạt động bằng cách nào?', options: ['Xoá file', 'Mã hoá dữ liệu và đòi tiền chuộc', 'Gửi spam', 'Cài phần mềm quảng cáo'], correct_index: 1, explanation: 'Ransomware encrypt file nạn nhân, yêu cầu trả tiền (thường Bitcoin) để giải mã.', topic_code: 'C' },
      { id: 'ex1-15', question: 'Phishing là hình thức tấn công nào?', options: ['Tấn công DDoS', 'Lừa đảo qua email/website giả mạo để lấy thông tin', 'Cài virus qua USB', 'Hack camera'], correct_index: 1, explanation: 'Phishing = "câu cá" — dùng giao diện giả mạo (ngân hàng, mạng xã hội) để lừa nhập mật khẩu.', topic_code: 'C' },
      { id: 'ex1-16', question: 'Giấy phép CC BY-NC nghĩa là?', options: ['Dùng tự do không điều kiện', 'Ghi nguồn + không dùng mục đích thương mại', 'Không được chia sẻ', 'Phải trả phí'], correct_index: 1, explanation: 'CC BY-NC: BY=Attribution (ghi nguồn), NC=NonCommercial (phi thương mại).', topic_code: 'C' },
      { id: 'ex1-17', question: 'Hành vi nào vi phạm bản quyền phần mềm?', options: ['Mua Office chính hãng', 'Dùng LibreOffice miễn phí', 'Crack Adobe Photoshop để dùng miễn phí', 'Dùng Python (nguồn mở)'], correct_index: 2, explanation: 'Crack = bẻ khoá phần mềm trả phí, vi phạm bản quyền và pháp luật.', topic_code: 'C' },
      { id: 'ex1-18', question: 'Khi bị cyberbullying, cách xử lý đúng nhất?', options: ['Phản ứng lại ngay', 'Chặn, lưu bằng chứng, báo người lớn', 'Xoá tài khoản', 'Im lặng chịu'], correct_index: 1, explanation: 'Chặn người bắt nạt, screenshot bằng chứng, thông báo phụ huynh/giáo viên/cơ quan chức năng.', topic_code: 'C' },

      // === CHỦ ĐỀ D: CSDL & SQL (10 câu) ===
      { id: 'ex1-19', question: 'Khoá chính (Primary Key) có đặc điểm gì?', options: ['Có thể NULL', 'Có thể trùng', 'Duy nhất và không NULL', 'Chỉ dùng cho số'], correct_index: 2, explanation: 'Primary Key = xác định duy nhất mỗi hàng, không có 2 hàng trùng giá trị và không được NULL.', topic_code: 'D' },
      { id: 'ex1-20', question: 'Câu lệnh SQL nào lấy tất cả dữ liệu từ bảng SinhVien?', options: ['GET ALL SinhVien', 'SELECT * FROM SinhVien', 'SHOW SinhVien', 'READ * FROM SinhVien'], correct_index: 1, explanation: 'SELECT * FROM tên_bảng là cú pháp chuẩn SQL để lấy toàn bộ hàng và cột.', topic_code: 'D' },
      { id: 'ex1-21', question: 'Toán tử BETWEEN 5 AND 10 tương đương với?', options: ['> 5 AND < 10', '>= 5 AND <= 10', '= 5 OR = 10', '> 5 OR < 10'], correct_index: 1, explanation: 'BETWEEN bao gồm cả 2 biên: >= giá trị nhỏ AND <= giá trị lớn.', topic_code: 'D' },
      { id: 'ex1-22', question: "LIKE 'A%' sẽ tìm chuỗi nào?", options: ['Kết thúc bằng A', 'Chứa A ở giữa', 'Bắt đầu bằng A', 'Chính xác là A'], correct_index: 2, explanation: "'A%': A ở đầu, % đại diện cho bất kỳ chuỗi nào phía sau.", topic_code: 'D' },
      { id: 'ex1-23', question: 'Hàm COUNT(*) dùng để?', options: ['Tính tổng giá trị', 'Đếm số hàng', 'Tính trung bình', 'Tìm giá trị max'], correct_index: 1, explanation: 'COUNT(*) đếm tổng số hàng (bản ghi) trong bảng hoặc nhóm.', topic_code: 'D' },
      { id: 'ex1-24', question: 'Thứ tự đúng trong câu SELECT là?', options: ['SELECT - WHERE - FROM - ORDER BY', 'SELECT - FROM - WHERE - ORDER BY', 'FROM - SELECT - WHERE - ORDER BY', 'SELECT - FROM - ORDER BY - WHERE'], correct_index: 1, explanation: 'Thứ tự: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.', topic_code: 'D' },
      { id: 'ex1-25', question: 'HAVING khác WHERE ở điểm nào?', options: ['HAVING nhanh hơn', 'HAVING lọc nhóm sau GROUP BY, WHERE lọc hàng trước GROUP BY', 'HAVING là bí danh của WHERE', 'Không khác'], correct_index: 1, explanation: 'WHERE lọc từng hàng trước khi nhóm. HAVING lọc kết quả nhóm sau GROUP BY.', topic_code: 'D' },
      { id: 'ex1-26', question: 'INNER JOIN trả về kết quả gì?', options: ['Tất cả hàng bảng trái', 'Tất cả hàng cả 2 bảng', 'Chỉ hàng có khớp ở cả 2 bảng', 'Hàng không khớp'], correct_index: 2, explanation: 'INNER JOIN chỉ giữ hàng thoả mãn điều kiện ON ở CẢ HAI bảng.', topic_code: 'D' },
      { id: 'ex1-27', question: 'LEFT JOIN khi bảng phải không có dữ liệu khớp sẽ?', options: ['Bỏ qua hàng đó', 'Điền NULL cho các cột bảng phải', 'Báo lỗi', 'Tự động thêm dữ liệu'], correct_index: 1, explanation: 'LEFT JOIN giữ mọi hàng bảng trái; cột bảng phải trả NULL khi không khớp.', topic_code: 'D' },
      { id: 'ex1-28', question: 'Lệnh nào thêm dữ liệu mới vào bảng?', options: ['ADD INTO', 'INSERT INTO', 'PUT INTO', 'CREATE INTO'], correct_index: 1, explanation: 'INSERT INTO tên_bảng (cột1, cột2) VALUES (giá_trị1, giá_trị2).', topic_code: 'D' },

      // === CHỦ ĐỀ E: Python & Thuật toán (8 câu) ===
      { id: 'ex1-29', question: 'Thuật toán tìm kiếm nhị phân có độ phức tạp?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct_index: 2, explanation: 'Tìm nhị phân chia đôi mảng mỗi bước → log₂(n) bước → O(log n).', topic_code: 'E' },
      { id: 'ex1-30', question: 'Đoạn code: for i in range(n): for j in range(n): ... có O là?', options: ['O(n)', 'O(2n)', 'O(n²)', 'O(n log n)'], correct_index: 2, explanation: '2 vòng lặp lồng, mỗi vòng n lần → n×n = O(n²).', topic_code: 'E' },
      { id: 'ex1-31', question: 'Bubble Sort so sánh gì ở mỗi bước?', options: ['Phần tử đầu và cuối', 'Hai phần tử liền kề', 'Phần tử với trung bình', 'Phần tử ngẫu nhiên'], correct_index: 1, explanation: 'Bubble Sort so sánh 2 phần tử liền kề (adjacent), đổi chỗ nếu sai thứ tự.', topic_code: 'E' },
      { id: 'ex1-32', question: 'Selection Sort có ý tưởng chính là?', options: ['Chèn phần tử đúng vị trí', 'Chia đôi mảng', 'Tìm min đưa lên đầu phần chưa sắp', 'So sánh phần tử kề'], correct_index: 2, explanation: 'Selection = chọn: tìm phần tử nhỏ nhất trong phần chưa sắp xếp, đổi với vị trí đầu.', topic_code: 'E' },
      { id: 'ex1-33', question: 'Insertion Sort tốt nhất khi mảng?', options: ['Ngẫu nhiên', 'Sắp ngược', 'Gần như đã sắp xếp', 'Toàn số giống nhau'], correct_index: 2, explanation: 'Insertion Sort đạt O(n) khi mảng gần sắp xếp vì mỗi phần tử chỉ dịch ít bước.', topic_code: 'E' },
      { id: 'ex1-34', question: 'Trong sơ đồ khối, hình thoi biểu diễn?', options: ['Bắt đầu/Kết thúc', 'Nhập/Xuất', 'Xử lý', 'Điều kiện rẽ nhánh'], correct_index: 3, explanation: 'Hình thoi = quyết định (decision) — đặt câu hỏi Đúng/Sai để rẽ nhánh.', topic_code: 'E' },
      { id: 'ex1-35', question: 'O(n² + 3n + 5) đơn giản thành?', options: ['O(n² + 3n + 5)', 'O(n²)', 'O(3n)', 'O(5)'], correct_index: 1, explanation: 'Big-O: giữ hạng bậc cao nhất, bỏ hằng số và hạng thấp → O(n²).', topic_code: 'E' },
      { id: 'ex1-36', question: 'Mã giả (pseudocode) là?', options: ['Code Python', 'Ngôn ngữ máy', 'Mô tả thuật toán bằng ngôn ngữ tự nhiên có cấu trúc', 'File thực thi'], correct_index: 2, explanation: 'Pseudocode dùng ngôn ngữ gần tự nhiên có cấu trúc, không phụ thuộc ngôn ngữ lập trình.', topic_code: 'E' },

      // === CHỦ ĐỀ G_CS: HTML/CSS/JS/ML (4 câu) ===
      { id: 'ex1-37', question: 'Thẻ HTML nào tạo liên kết (hyperlink)?', options: ['<link>', '<a>', '<href>', '<url>'], correct_index: 1, explanation: '<a href="URL">text</a> tạo hyperlink. <link> dùng liên kết CSS/favicon trong <head>.', topic_code: 'G_CS' },
      { id: 'ex1-38', question: 'CSS selector "#main" chọn phần tử nào?', options: ['class="main"', 'id="main"', 'tag <main>', 'Tất cả phần tử'], correct_index: 1, explanation: '# = selector theo id. . = selector theo class. Không có dấu = selector theo tag.', topic_code: 'G_CS' },
      { id: 'ex1-39', question: 'JavaScript dùng lệnh nào để lấy phần tử theo id?', options: ['findElement("id")', 'document.getElementById("id")', 'select("#id")', 'get("id")'], correct_index: 1, explanation: 'document.getElementById("id") là phương thức DOM chuẩn.', topic_code: 'G_CS' },
      { id: 'ex1-40', question: 'Supervised Learning khác Unsupervised ở?', options: ['Cần GPU', 'Cần dữ liệu có nhãn (label)', 'Chạy nhanh hơn', 'Không cần dữ liệu'], correct_index: 1, explanation: 'Supervised Learning (Có giám sát) cần dữ liệu đã gán nhãn để huấn luyện.', topic_code: 'G_CS' }
    ]
  },

  {
    id: 'exam-2',
    slug: 'de-minh-hoa-2',
    title: 'Đề minh hoạ tốt nghiệp THPT 2025 — Số 2',
    description: 'Đề ôn luyện số 2 với nội dung khác đề 1, giúp học sinh làm quen với nhiều dạng câu hỏi.',
    duration_minutes: 50,
    passing_score: 50,
    source: 'Tự soạn theo cấu trúc Bộ GD&ĐT 2025',
    topics: ['A', 'B', 'C', 'D', 'E', 'G_CS'],
    questions: [
      // === A (5 câu) ===
      { id: 'ex2-1', question: 'Máy tính thế hệ 4 dùng công nghệ gì?', options: ['IC', 'Transistor', 'Vi xử lý VLSI', 'Đèn chân không'], correct_index: 2, explanation: 'Thế hệ 4 (1975-nay) dùng VLSI — hàng tỉ transistor trên 1 chip, PC ra đời.', topic_code: 'A' },
      { id: 'ex2-2', question: 'Cloud Computing mô hình IaaS cung cấp gì?', options: ['Phần mềm dùng ngay', 'Hạ tầng (máy ảo, lưu trữ)', 'Nền tảng phát triển', 'Mạng xã hội'], correct_index: 1, explanation: 'IaaS = Infrastructure as a Service — cung cấp máy ảo, ổ đĩa, mạng cho thuê.', topic_code: 'A' },
      { id: 'ex2-3', question: 'Ứng dụng nào là ví dụ của Machine Learning?', options: ['Máy tính bỏ túi', 'Bộ lọc spam email tự động', 'Đồng hồ cơ', 'Máy in'], correct_index: 1, explanation: 'Bộ lọc spam "học" từ dữ liệu email để tự phân loại — đó là Machine Learning.', topic_code: 'A' },
      { id: 'ex2-4', question: 'Reinforcement Learning (Học tăng cường) học qua?', options: ['Dữ liệu có nhãn', 'Phân nhóm', 'Cơ chế thưởng/phạt', 'Sao chép mã nguồn'], correct_index: 2, explanation: 'Reinforcement Learning: agent thực hiện hành động, nhận reward/penalty, tự cải thiện.', topic_code: 'A' },
      { id: 'ex2-5', question: 'Thiết bị nào KHÔNG phải IoT?', options: ['Camera an ninh WiFi', 'Bút mực thường', 'Đồng hồ thông minh', 'Tủ lạnh kết nối Internet'], correct_index: 1, explanation: 'Bút mực thường không có kết nối Internet hay khả năng thu thập/truyền dữ liệu → không phải IoT.', topic_code: 'A' },

      // === B (7 câu) ===
      { id: 'ex2-6', question: 'Mạng LAN thường dùng trong phạm vi?', options: ['Toàn cầu', 'Quốc gia', 'Thành phố', 'Toà nhà/phòng máy'], correct_index: 3, explanation: 'LAN = Local Area Network — mạng cục bộ trong phạm vi toà nhà, trường học.', topic_code: 'B' },
      { id: 'ex2-7', question: 'Switch khác Hub ở điểm nào?', options: ['Switch rẻ hơn', 'Switch gửi dữ liệu đúng cổng đích, Hub gửi tất cả cổng', 'Hub nhanh hơn', 'Không khác nhau'], correct_index: 1, explanation: 'Switch thông minh hơn: gửi frame đúng cổng đích dựa trên MAC address. Hub phát broadcast.', topic_code: 'B' },
      { id: 'ex2-8', question: '192.168.0.1 thuộc lớp mạng nào?', options: ['A', 'B', 'C', 'D'], correct_index: 2, explanation: 'Lớp C: octet đầu 192-223. 192.168.0.1 bắt đầu bằng 192 → Lớp C.', topic_code: 'B' },
      { id: 'ex2-9', question: 'IPv4 có tổng cộng bao nhiêu bit?', options: ['16', '32', '64', '128'], correct_index: 1, explanation: 'IPv4 = 4 octet × 8 bit = 32 bit. IPv6 = 128 bit.', topic_code: 'B' },
      { id: 'ex2-10', question: 'FTP dùng cổng mặc định?', options: ['80', '21', '443', '25'], correct_index: 1, explanation: 'FTP = port 21, HTTP = 80, HTTPS = 443, SMTP = 25.', topic_code: 'B' },
      { id: 'ex2-11', question: 'IMAP khác POP3 ở điểm nào?', options: ['IMAP nhanh hơn', 'IMAP giữ email trên server để đồng bộ nhiều thiết bị', 'POP3 an toàn hơn', 'Không khác'], correct_index: 1, explanation: 'IMAP đồng bộ + giữ email trên server. POP3 tải về máy rồi thường xoá trên server.', topic_code: 'B' },
      { id: 'ex2-12', question: '127.0.0.1 là địa chỉ gì?', options: ['Gateway mạng', 'DNS server', 'Localhost (loopback)', 'Broadcast'], correct_index: 2, explanation: '127.0.0.1 = loopback = chính máy tính đó (localhost), dùng để test.', topic_code: 'B' },

      // === C (5 câu) ===
      { id: 'ex2-13', question: 'Worm (sâu máy tính) khác Virus ở chỗ?', options: ['Worm nhẹ hơn', 'Worm tự lây lan qua mạng mà không cần người dùng kích hoạt', 'Worm không gây hại', 'Virus nhanh hơn'], correct_index: 1, explanation: 'Worm tự nhân bản và lây lan qua mạng. Virus cần người dùng mở file nhiễm.', topic_code: 'C' },
      { id: 'ex2-14', question: 'Mật khẩu mạnh nên có đặc điểm?', options: ['Tên + ngày sinh', '12345678', 'Kết hợp chữ hoa, thường, số, ký tự đặc biệt ≥8 ký tự', 'Giống nhau cho mọi tài khoản'], correct_index: 2, explanation: 'Mật khẩu mạnh: dài ≥8, kết hợp nhiều loại ký tự, không chứa thông tin cá nhân.', topic_code: 'C' },
      { id: 'ex2-15', question: '2FA (xác thực 2 yếu tố) yêu cầu?', options: ['2 mật khẩu', 'Mật khẩu + mã OTP hoặc vân tay', '2 tài khoản', 'Đăng nhập 2 lần'], correct_index: 1, explanation: '2FA: thứ bạn BIẾT (password) + thứ bạn CÓ (OTP) hoặc thứ bạn LÀ (sinh trắc học).', topic_code: 'C' },
      { id: 'ex2-16', question: 'Open Source (nguồn mở) có đặc điểm?', options: ['Phải trả phí cao', 'Được xem, sửa, phân phối mã nguồn', 'Không có bản quyền', 'Chỉ chạy Linux'], correct_index: 1, explanation: 'Open Source cho phép xem, sửa đổi và phân phối mã nguồn (vẫn có giấy phép bản quyền).', topic_code: 'C' },
      { id: 'ex2-17', question: 'Thông tin nào KHÔNG nên chia sẻ công khai trên mạng?', options: ['Sở thích đọc sách', 'Ảnh phong cảnh du lịch', 'Số CCCD và địa chỉ nhà', 'Bài thơ mình viết'], correct_index: 2, explanation: 'CCCD, địa chỉ nhà là thông tin nhạy cảm, có thể bị lợi dụng cho lừa đảo/trộm cắp.', topic_code: 'C' },

      // === D: SQL (10 câu) ===
      { id: 'ex2-18', question: 'Foreign Key dùng để?', options: ['Mã hoá bảng', 'Tạo quan hệ (liên kết) giữa 2 bảng', 'Xoá bảng', 'Sắp xếp dữ liệu'], correct_index: 1, explanation: 'Foreign Key tham chiếu tới Primary Key bảng khác, tạo mối quan hệ giữa 2 bảng.', topic_code: 'D' },
      { id: 'ex2-19', question: 'Lệnh nào xoá dữ liệu trong bảng (giữ lại bảng)?', options: ['DROP TABLE', 'DELETE FROM', 'REMOVE TABLE', 'CLEAR TABLE'], correct_index: 1, explanation: 'DELETE FROM tên_bảng WHERE... xoá hàng nhưng giữ bảng. DROP TABLE xoá luôn bảng.', topic_code: 'D' },
      { id: 'ex2-20', question: 'ORDER BY DiemTB ASC có ý nghĩa?', options: ['Sắp giảm dần', 'Sắp tăng dần', 'Lọc điểm > 0', 'Nhóm theo điểm'], correct_index: 1, explanation: 'ASC = Ascending = tăng dần (mặc định). DESC = Descending = giảm dần.', topic_code: 'D' },
      { id: 'ex2-21', question: "WHERE HoTen LIKE '%Minh%' tìm gì?", options: ['Tên bắt đầu bằng Minh', 'Tên kết thúc bằng Minh', 'Tên có chứa từ Minh', 'Tên chính xác là Minh'], correct_index: 2, explanation: "'%Minh%': % hai bên = tìm chuỗi có chứa 'Minh' ở bất kỳ vị trí nào.", topic_code: 'D' },
      { id: 'ex2-22', question: 'Hàm AVG(DiemTB) trả về?', options: ['Điểm cao nhất', 'Điểm thấp nhất', 'Giá trị trung bình', 'Tổng điểm'], correct_index: 2, explanation: 'AVG = Average = trung bình cộng của tất cả giá trị trong cột.', topic_code: 'D' },
      { id: 'ex2-23', question: 'Câu nào dùng để cập nhật dữ liệu?', options: ['INSERT INTO', 'UPDATE ... SET', 'ALTER TABLE', 'SELECT'], correct_index: 1, explanation: 'UPDATE tên_bảng SET cột=giá_trị WHERE điều_kiện — sửa dữ liệu hiện có.', topic_code: 'D' },
      { id: 'ex2-24', question: 'GROUP BY Lop dùng để?', options: ['Xoá lớp', 'Nhóm kết quả theo từng lớp', 'Sắp xếp theo lớp', 'Tạo lớp mới'], correct_index: 1, explanation: 'GROUP BY nhóm các hàng có cùng giá trị cột Lop lại, thường đi kèm hàm gộp.', topic_code: 'D' },
      { id: 'ex2-25', question: 'MAX(DiemTB) trả về?', options: ['Số hàng', 'Giá trị lớn nhất', 'Giá trị nhỏ nhất', 'Trung bình'], correct_index: 1, explanation: 'MAX trả về giá trị lớn nhất trong cột. MIN trả về nhỏ nhất.', topic_code: 'D' },
      { id: 'ex2-26', question: 'Từ khoá ON trong JOIN dùng để?', options: ['Bật bảng', 'Chỉ định điều kiện kết nối giữa 2 bảng', 'Đổi tên bảng', 'Xoá quan hệ'], correct_index: 1, explanation: 'ON chỉ điều kiện kết nối: ON bảng1.cột = bảng2.cột.', topic_code: 'D' },
      { id: 'ex2-27', question: 'NOT NULL nghĩa là?', options: ['Giá trị = 0', 'Cột không được để trống', 'Cột chỉ chứa số', 'Cột là khoá chính'], correct_index: 1, explanation: 'NOT NULL = ràng buộc bắt buộc phải có giá trị khi INSERT/UPDATE, không được bỏ trống.', topic_code: 'D' },

      // === E: Python & Thuật toán (8 câu) ===
      { id: 'ex2-28', question: 'Thuật toán có O(n log n) là?', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Tìm kiếm tuyến tính'], correct_index: 2, explanation: 'Merge Sort chia đôi mảng (log n tầng) × duyệt n phần tử mỗi tầng = O(n log n).', topic_code: 'E' },
      { id: 'ex2-29', question: 'Tìm kiếm tuyến tính có O là?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_index: 2, explanation: 'Tìm kiếm tuyến tính duyệt từ đầu đến cuối → tệ nhất n bước → O(n).', topic_code: 'E' },
      { id: 'ex2-30', question: 'Tìm kiếm nhị phân yêu cầu mảng phải?', options: ['Có phần tử > 0', 'Đã được sắp xếp', 'Có số chẵn phần tử', 'Không chứa số âm'], correct_index: 1, explanation: 'Binary Search chỉ hoạt động trên mảng đã sắp xếp (để biết chia nửa nào).', topic_code: 'E' },
      { id: 'ex2-31', question: 'Hàm đệ quy là hàm?', options: ['Không trả về giá trị', 'Gọi chính nó', 'Chỉ chạy 1 lần', 'Không có tham số'], correct_index: 1, explanation: 'Đệ quy (recursion) = hàm gọi chính nó với đầu vào nhỏ hơn cho đến khi gặp điều kiện dừng.', topic_code: 'E' },
      { id: 'ex2-32', question: 'def tinh_giai_thua(n): if n==0: return 1; return n*tinh_giai_thua(n-1) — Kết quả tinh_giai_thua(5)?', options: ['5', '15', '25', '120'], correct_index: 3, explanation: '5! = 5×4×3×2×1 = 120. Đệ quy: 5×4! = 5×24 = 120.', topic_code: 'E' },
      { id: 'ex2-33', question: 'O(1) nghĩa là thời gian chạy?', options: ['Tỉ lệ với n', 'Không phụ thuộc vào n (hằng số)', 'Tỉ lệ với n²', 'Tỉ lệ với log n'], correct_index: 1, explanation: 'O(1) = constant time — thời gian chạy cố định bất kể kích thước đầu vào.', topic_code: 'E' },
      { id: 'ex2-34', question: 'Thuật toán sắp xếp nào KHÔNG ổn định (unstable)?', options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort'], correct_index: 2, explanation: 'Selection Sort không ổn định — có thể đổi thứ tự 2 phần tử bằng nhau. Bubble, Insertion, Merge đều ổn định.', topic_code: 'E' },
      { id: 'ex2-35', question: 'Hình bình hành trong sơ đồ khối biểu diễn?', options: ['Điều kiện', 'Xử lý', 'Nhập/Xuất dữ liệu', 'Bắt đầu'], correct_index: 2, explanation: 'Hình bình hành = Input/Output (nhập dữ liệu từ bàn phím / xuất ra màn hình).', topic_code: 'E' },

      // === G_CS (5 câu) ===
      { id: 'ex2-36', question: 'Thẻ HTML nào chứa metadata của trang?', options: ['<body>', '<head>', '<footer>', '<main>'], correct_index: 1, explanation: '<head> chứa metadata: title, meta, link CSS, script... Không hiển thị trực tiếp.', topic_code: 'G_CS' },
      { id: 'ex2-37', question: 'Box Model trong CSS thứ tự từ trong ra ngoài?', options: ['Content-Padding-Border-Margin', 'Margin-Border-Padding-Content', 'Content-Border-Padding-Margin', 'Padding-Content-Border-Margin'], correct_index: 0, explanation: 'Content → Padding → Border → Margin (từ trong ra ngoài).', topic_code: 'G_CS' },
      { id: 'ex2-38', question: 'const x = 5; x = 10; sẽ?', options: ['x = 10', 'x = 5', 'Lỗi (TypeError)', 'x = 15'], correct_index: 2, explanation: 'const không cho phép gán lại giá trị → TypeError: Assignment to constant variable.', topic_code: 'G_CS' },
      { id: 'ex2-39', question: 'KNN phân loại dựa trên?', options: ['Cây quyết định', 'Khoảng cách tới k điểm gần nhất', 'Hồi quy tuyến tính', 'Mạng nơ-ron'], correct_index: 1, explanation: 'KNN tìm k điểm dữ liệu gần nhất, chọn nhãn đa số.', topic_code: 'G_CS' },
      { id: 'ex2-40', question: 'addEventListener("click", fn) dùng để?', options: ['Tạo phần tử mới', 'Gắn hàm xử lý khi click', 'Xoá phần tử', 'Đổi style'], correct_index: 1, explanation: 'addEventListener gắn handler fn chạy khi sự kiện click xảy ra trên phần tử.', topic_code: 'G_CS' }
    ]
  }
];
