import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 'A',
    order_index: 1,
    title: 'Máy tính và xã hội tri thức',
    description: 'Vai trò của máy tính, xu hướng công nghệ, trí tuệ nhân tạo và xã hội số',
    icon: '💻',
    color: '#3B82F6',
    exam_weight: 2,
    outcomes: [
      'Hiểu vai trò của máy tính trong xã hội tri thức',
      'Nhận biết xu hướng phát triển công nghệ: AI, IoT, Big Data, Cloud',
      'Phân biệt máy tính cá nhân, máy chủ, siêu máy tính, thiết bị nhúng'
    ],
    lessons: [
      {
        id: 'A-1',
        module_id: 'A',
        title: 'Máy tính và các thế hệ phát triển',
        slug: 'may-tinh-va-cac-the-he',
        description: 'Lịch sử phát triển của máy tính qua các thế hệ, từ chân không đến vi mạch',
        difficulty: 'easy',
        estimated_minutes: 20,
        order_index: 1,
        xp_reward: 50,
        is_published: true,
        content: {
          objectives: [
            'Trình bày được các thế hệ máy tính',
            'Nêu được đặc trưng công nghệ của mỗi thế hệ',
            'Nhận biết xu hướng phát triển hiện đại'
          ],
          theory:
            "## Các thế hệ máy tính\n\n" +
            "### Thế hệ 1 (1940–1955): Đèn chân không\n" +
            "- Kích thước rất lớn (chiếm cả phòng)\n" +
            "- Tốc độ: vài nghìn phép tính/giây\n" +
            "- Ví dụ: ENIAC, UNIVAC\n\n" +
            "### Thế hệ 2 (1955–1965): Transistor\n" +
            "- Nhỏ hơn, nhanh hơn, tiết kiệm điện hơn\n" +
            "- Bắt đầu có ngôn ngữ lập trình bậc cao (FORTRAN, COBOL)\n\n" +
            "### Thế hệ 3 (1965–1975): Mạch tích hợp (IC)\n" +
            "- Hàng ngàn transistor trên 1 chip\n" +
            "- Hệ điều hành đa chương trình\n\n" +
            "### Thế hệ 4 (1975–nay): Vi xử lý (VLSI)\n" +
            "- Hàng tỉ transistor trên 1 chip\n" +
            "- Máy tính cá nhân (PC) ra đời\n" +
            "- Internet phổ biến\n\n" +
            "### Thế hệ 5 (đang phát triển): Trí tuệ nhân tạo\n" +
            "- Máy tính lượng tử\n" +
            "- AI, Machine Learning, Deep Learning\n" +
            "- IoT, điện toán đám mây",
          examples: [
            {
              title: 'So sánh thế hệ máy tính',
              code: '# Bảng so sánh (minh hoạ bằng Python dictionary)\nthe_he = {\n    1: {"cong_nghe": "Đèn chân không", "toc_do": "Nghìn phép/s"},\n    2: {"cong_nghe": "Transistor", "toc_do": "Triệu phép/s"},\n    3: {"cong_nghe": "IC", "toc_do": "Chục triệu phép/s"},\n    4: {"cong_nghe": "VLSI", "toc_do": "Tỉ phép/s"},\n}\nfor k, v in the_he.items():\n    print(f"Thế hệ {k}: {v[\'cong_nghe\']} - {v[\'toc_do\']}")',
              explanation: 'Minh hoạ cách tổ chức dữ liệu so sánh bằng dictionary Python',
              output: 'Thế hệ 1: Đèn chân không - Nghìn phép/s\nThế hệ 2: Transistor - Triệu phép/s\nThế hệ 3: IC - Chục triệu phép/s\nThế hệ 4: VLSI - Tỉ phép/s'
            }
          ],
          quiz: [
            { id: 'qA-1-1', question: 'Máy tính thế hệ 1 sử dụng công nghệ gì?', options: ['Transistor', 'Đèn chân không', 'Vi mạch tích hợp', 'Vi xử lý'], correct_index: 1, explanation: 'Thế hệ 1 (1940-1955) dùng đèn chân không (vacuum tube), kích thước rất lớn.', topic_code: 'A' },
            { id: 'qA-1-2', question: 'ENIAC thuộc thế hệ máy tính nào?', options: ['Thế hệ 1', 'Thế hệ 2', 'Thế hệ 3', 'Thế hệ 4'], correct_index: 0, explanation: 'ENIAC (1945) là một trong những máy tính điện tử đầu tiên, thuộc thế hệ 1.', topic_code: 'A' },
            { id: 'qA-1-3', question: 'Máy tính cá nhân (PC) ra đời ở thế hệ nào?', options: ['Thế hệ 2', 'Thế hệ 3', 'Thế hệ 4', 'Thế hệ 5'], correct_index: 2, explanation: 'Thế hệ 4 (1975-nay) với công nghệ VLSI cho phép tạo ra máy tính cá nhân nhỏ gọn.', topic_code: 'A' },
            { id: 'qA-1-4', question: 'Công nghệ nào đặc trưng cho xu hướng máy tính thế hệ 5?', options: ['Mạch tích hợp', 'Transistor', 'Trí tuệ nhân tạo', 'Đèn chân không'], correct_index: 2, explanation: 'Thế hệ 5 hướng tới AI, máy tính lượng tử và các hệ thống thông minh.', topic_code: 'A' },
            { id: 'qA-1-5', question: 'Ngôn ngữ lập trình bậc cao đầu tiên xuất hiện ở thế hệ máy tính nào?', options: ['Thế hệ 1', 'Thế hệ 2', 'Thế hệ 3', 'Thế hệ 4'], correct_index: 1, explanation: 'Thế hệ 2 (transistor) bắt đầu có FORTRAN (1957) và COBOL — ngôn ngữ bậc cao đầu tiên.', topic_code: 'A' }
          ],
          exercises: []
        }
      },
      {
        id: 'A-2',
        module_id: 'A',
        title: 'Trí tuệ nhân tạo và ứng dụng',
        slug: 'tri-tue-nhan-tao',
        description: 'Khái niệm AI, Machine Learning, ứng dụng AI trong đời sống',
        difficulty: 'easy',
        estimated_minutes: 25,
        order_index: 2,
        xp_reward: 60,
        is_published: true,
        content: {
          objectives: [
            'Hiểu khái niệm trí tuệ nhân tạo (AI)',
            'Phân biệt AI, Machine Learning, Deep Learning',
            'Nêu ứng dụng AI trong thực tế'
          ],
          theory:
            "## Trí tuệ nhân tạo (AI)\n\n" +
            "**Trí tuệ nhân tạo** (Artificial Intelligence) là lĩnh vực khoa học máy tính nghiên cứu và phát triển các hệ thống có khả năng thực hiện những nhiệm vụ thường đòi hỏi trí tuệ con người.\n\n" +
            "### Phân loại AI\n\n" +
            "1. **AI hẹp (Narrow AI)**: Chuyên biệt cho 1 nhiệm vụ (nhận diện khuôn mặt, dịch ngôn ngữ)\n" +
            "2. **AI tổng quát (General AI)**: Có khả năng như con người (chưa đạt được)\n" +
            "3. **Siêu AI (Super AI)**: Vượt trội con người (giả thuyết)\n\n" +
            "### Machine Learning vs Deep Learning\n\n" +
            "- **Machine Learning (Học máy)**: Máy tính học từ dữ liệu mà không cần lập trình cụ thể\n" +
            "- **Deep Learning (Học sâu)**: Dùng mạng nơ-ron nhiều tầng, xử lý dữ liệu phức tạp (ảnh, video, âm thanh)\n\n" +
            "### Ứng dụng AI trong đời sống\n\n" +
            "| Lĩnh vực | Ví dụ |\n" +
            "|---|---|\n" +
            "| Y tế | Chẩn đoán bệnh qua ảnh X-quang |\n" +
            "| Giao thông | Xe tự lái |\n" +
            "| Giáo dục | Hệ thống gợi ý bài học |\n" +
            "| Tài chính | Phát hiện gian lận |\n" +
            "| Nông nghiệp | Dự đoán thời tiết, phun thuốc tự động |",
          examples: [
            {
              title: 'Ví dụ phân loại (Machine Learning đơn giản)',
              code: '# Minh hoạ ý tưởng phân loại\n# Nếu chiều cao > 170 và cân nặng > 60 → "Người lớn"\ndulieu = [(175, 70), (160, 45), (180, 80), (150, 40)]\nfor cao, nang in dulieu:\n    if cao > 170 and nang > 60:\n        print(f"({cao}cm, {nang}kg) → Người lớn")\n    else:\n        print(f"({cao}cm, {nang}kg) → Trẻ em/Thanh thiếu niên")',
              explanation: 'Đây chỉ là minh hoạ logic phân loại đơn giản. ML thật sẽ "tự học" ngưỡng từ dữ liệu.',
              output: '(175cm, 70kg) → Người lớn\n(160cm, 45kg) → Trẻ em/Thanh thiếu niên\n(180cm, 80kg) → Người lớn\n(150cm, 40kg) → Trẻ em/Thanh thiếu niên'
            }
          ],
          quiz: [
            { id: 'qA-2-1', question: 'AI hẹp (Narrow AI) có đặc điểm gì?', options: ['Vượt trội con người ở mọi lĩnh vực', 'Chuyên biệt cho một nhiệm vụ cụ thể', 'Có ý thức như con người', 'Không cần dữ liệu để hoạt động'], correct_index: 1, explanation: 'AI hẹp chỉ giỏi ở 1 nhiệm vụ cụ thể, ví dụ nhận diện khuôn mặt hoặc dịch ngôn ngữ.', topic_code: 'A' },
            { id: 'qA-2-2', question: 'Deep Learning khác Machine Learning ở điểm nào?', options: ['Không cần dữ liệu', 'Dùng mạng nơ-ron nhiều tầng', 'Chỉ dùng cho robot', 'Không thuộc AI'], correct_index: 1, explanation: 'Deep Learning dùng mạng nơ-ron nhân tạo nhiều tầng (deep neural network) để xử lý dữ liệu phức tạp.', topic_code: 'A' },
            { id: 'qA-2-3', question: 'Ứng dụng nào KHÔNG phải là ứng dụng của AI?', options: ['Xe tự lái', 'Nhận diện khuôn mặt', 'Máy tính bỏ túi', 'Chatbot hỗ trợ khách hàng'], correct_index: 2, explanation: 'Máy tính bỏ túi chỉ thực hiện phép tính cơ bản theo lập trình cứng, không có AI.', topic_code: 'A' },
            { id: 'qA-2-4', question: 'Machine Learning có nghĩa là gì?', options: ['Máy tính tự sửa phần cứng', 'Máy tính học từ dữ liệu mà không cần lập trình cụ thể', 'Máy tính kết nối Internet', 'Máy tính chạy nhanh hơn'], correct_index: 1, explanation: 'Machine Learning = Học máy: hệ thống cải thiện hiệu suất dựa trên kinh nghiệm (dữ liệu) mà không cần viết luật cụ thể.', topic_code: 'A' }
          ],
          exercises: []
        }
      },
      {
        id: 'A-3',
        module_id: 'A',
        title: 'Internet vạn vật (IoT) và Dữ liệu lớn (Big Data)',
        slug: 'iot-va-big-data',
        description: 'Khái niệm IoT, Big Data, Cloud Computing và tác động tới xã hội',
        difficulty: 'easy',
        estimated_minutes: 20,
        order_index: 3,
        xp_reward: 50,
        is_published: true,
        content: {
          objectives: [
            'Hiểu khái niệm IoT, Big Data, Cloud Computing',
            'Nêu ứng dụng thực tế của các công nghệ này',
            'Nhận thức tác động tích cực và tiêu cực tới xã hội'
          ],
          theory:
            "## Internet vạn vật (IoT)\n\n" +
            "**IoT** (Internet of Things) là mạng lưới các thiết bị vật lý được kết nối Internet, có khả năng thu thập và trao đổi dữ liệu.\n\n" +
            "**Ví dụ**: Đồng hồ thông minh, tủ lạnh thông minh, hệ thống tưới cây tự động, camera an ninh kết nối WiFi.\n\n" +
            "## Dữ liệu lớn (Big Data)\n\n" +
            "**Big Data** là tập dữ liệu có kích thước rất lớn, tốc độ sinh ra nhanh, đa dạng về loại hình mà các công cụ truyền thống không xử lý nổi.\n\n" +
            "### Đặc trưng 3V:\n" +
            "1. **Volume** (Dung lượng): Petabytes, Exabytes dữ liệu\n" +
            "2. **Velocity** (Tốc độ): Dữ liệu sinh ra liên tục theo thời gian thực\n" +
            "3. **Variety** (Đa dạng): Văn bản, ảnh, video, sensor...\n\n" +
            "## Điện toán đám mây (Cloud Computing)\n\n" +
            "Cung cấp tài nguyên máy tính (lưu trữ, tính toán, phần mềm) qua Internet thay vì cài đặt trên máy cục bộ.\n\n" +
            "**3 mô hình dịch vụ:**\n" +
            "- **IaaS**: Hạ tầng (máy ảo, lưu trữ) — VD: AWS EC2\n" +
            "- **PaaS**: Nền tảng (phát triển ứng dụng) — VD: Google App Engine\n" +
            "- **SaaS**: Phần mềm (dùng luôn) — VD: Google Docs, Office 365",
          examples: [],
          quiz: [
            { id: 'qA-3-1', question: 'IoT là viết tắt của?', options: ['Internet of Things', 'Internal of Technology', 'Internet of Technology', 'Integration of Things'], correct_index: 0, explanation: 'IoT = Internet of Things = Internet vạn vật.', topic_code: 'A' },
            { id: 'qA-3-2', question: 'Đặc trưng 3V của Big Data gồm?', options: ['Volume, Velocity, Variety', 'Volume, Value, Velocity', 'Variety, Value, Vision', 'Volume, Version, Variety'], correct_index: 0, explanation: '3V = Volume (dung lượng), Velocity (tốc độ), Variety (đa dạng).', topic_code: 'A' },
            { id: 'qA-3-3', question: 'Google Docs thuộc mô hình dịch vụ đám mây nào?', options: ['IaaS', 'PaaS', 'SaaS', 'DaaS'], correct_index: 2, explanation: 'SaaS (Software as a Service) — người dùng sử dụng phần mềm trực tiếp qua trình duyệt.', topic_code: 'A' },
            { id: 'qA-3-4', question: 'Thiết bị nào là ví dụ của IoT?', options: ['Máy tính để bàn không có WiFi', 'Đồng hồ thông minh kết nối Internet', 'Sách giáo khoa in giấy', 'Bút chì'], correct_index: 1, explanation: 'Đồng hồ thông minh kết nối Internet, thu thập dữ liệu sức khoẻ là thiết bị IoT.', topic_code: 'A' }
          ],
          exercises: []
        }
      }
    ]
  },

  {
    id: 'B',
    order_index: 2,
    title: 'Mạng máy tính và Internet',
    description: 'Kiến thức về mạng LAN, WAN, Internet, giao thức, địa chỉ IP, dịch vụ mạng',
    icon: '🌐',
    color: '#8B5CF6',
    exam_weight: 3,
    outcomes: [
      'Phân biệt mạng LAN, WAN, Internet',
      'Hiểu giao thức TCP/IP, địa chỉ IP, DNS',
      'Biết các dịch vụ mạng phổ biến: Web, Email, FTP'
    ],
    lessons: [
      {
        id: 'B-1',
        module_id: 'B',
        title: 'Mạng máy tính: LAN, WAN, Internet',
        slug: 'mang-may-tinh-lan-wan',
        description: 'Phân loại mạng theo phạm vi địa lý, thiết bị mạng cơ bản',
        difficulty: 'easy',
        estimated_minutes: 20,
        order_index: 1,
        xp_reward: 50,
        is_published: true,
        content: {
          objectives: [
            'Phân biệt LAN, MAN, WAN',
            'Kể tên các thiết bị mạng cơ bản',
            'Hiểu vai trò của Internet'
          ],
          theory:
            "## Phân loại mạng máy tính\n\n" +
            "### Theo phạm vi địa lý\n\n" +
            "| Loại | Phạm vi | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| **LAN** (Local Area Network) | Toà nhà, phòng máy | Mạng phòng tin học |\n" +
            "| **MAN** (Metropolitan Area Network) | Thành phố | Mạng truyền hình cáp |\n" +
            "| **WAN** (Wide Area Network) | Quốc gia, toàn cầu | Internet |\n\n" +
            "### Thiết bị mạng\n\n" +
            "- **Hub/Switch**: Kết nối các máy trong LAN\n" +
            "- **Router**: Định tuyến gói tin giữa các mạng\n" +
            "- **Modem**: Chuyển đổi tín hiệu (analog ↔ digital)\n" +
            "- **Access Point (AP)**: Phát sóng WiFi\n\n" +
            "### Internet\n\n" +
            "Internet là **mạng của các mạng** — kết nối hàng tỉ thiết bị trên toàn thế giới thông qua giao thức TCP/IP.",
          examples: [],
          quiz: [
            { id: 'qB-1-1', question: 'Mạng LAN có phạm vi?', options: ['Toàn cầu', 'Thành phố', 'Toà nhà/phòng máy', 'Quốc gia'], correct_index: 2, explanation: 'LAN (Local Area Network) — mạng cục bộ, phạm vi trong toà nhà hoặc phòng máy.', topic_code: 'B' },
            { id: 'qB-1-2', question: 'Thiết bị nào dùng để định tuyến gói tin giữa các mạng?', options: ['Hub', 'Switch', 'Router', 'Modem'], correct_index: 2, explanation: 'Router (bộ định tuyến) có nhiệm vụ chuyển tiếp gói tin giữa các mạng khác nhau.', topic_code: 'B' },
            { id: 'qB-1-3', question: 'Internet hoạt động dựa trên bộ giao thức nào?', options: ['HTTP', 'TCP/IP', 'FTP', 'SMTP'], correct_index: 1, explanation: 'TCP/IP là bộ giao thức nền tảng của Internet, gồm TCP (truyền tin cậy) và IP (định địa chỉ).', topic_code: 'B' },
            { id: 'qB-1-4', question: 'Modem dùng để làm gì?', options: ['Phát sóng WiFi', 'Lưu trữ dữ liệu', 'Chuyển đổi tín hiệu analog và digital', 'Kết nối bàn phím'], correct_index: 2, explanation: 'Modem (MOdulator-DEModulator) chuyển đổi tín hiệu giữa dạng analog (đường dây điện thoại) và digital (máy tính).', topic_code: 'B' }
          ],
          exercises: []
        }
      },
      {
        id: 'B-2',
        module_id: 'B',
        title: 'Địa chỉ IP và Tên miền (DNS)',
        slug: 'dia-chi-ip-va-dns',
        description: 'Cấu trúc địa chỉ IPv4, lớp mạng, hệ thống DNS',
        difficulty: 'medium',
        estimated_minutes: 25,
        order_index: 2,
        xp_reward: 60,
        is_published: true,
        content: {
          objectives: [
            'Hiểu cấu trúc địa chỉ IPv4 (4 octet)',
            'Biết các lớp mạng A, B, C',
            'Giải thích vai trò của DNS'
          ],
          theory:
            "## Địa chỉ IP (IPv4)\n\n" +
            "Mỗi thiết bị trên mạng Internet cần 1 **địa chỉ IP** duy nhất để giao tiếp.\n\n" +
            "**Cấu trúc**: 4 số (octet) ngăn cách bởi dấu chấm, mỗi số 0–255.\n" +
            "Ví dụ: `192.168.1.100`\n\n" +
            "### Các lớp địa chỉ\n\n" +
            "| Lớp | Octet đầu | Dùng cho |\n" +
            "|---|---|---|\n" +
            "| A | 1–126 | Mạng rất lớn (hàng triệu host) |\n" +
            "| B | 128–191 | Mạng vừa (hàng chục nghìn host) |\n" +
            "| C | 192–223 | Mạng nhỏ (tối đa 254 host) |\n\n" +
            "### DNS (Domain Name System)\n\n" +
            "DNS **dịch** tên miền (VD: `google.com`) thành địa chỉ IP (VD: `142.250.196.110`) để trình duyệt kết nối được.\n\n" +
            "**Quy trình**: Gõ URL → trình duyệt hỏi DNS server → nhận IP → kết nối server.",
          examples: [
            {
              title: 'Kiểm tra IP bằng Python',
              code: 'import socket\n\n# Tra cứu IP của tên miền\nip = socket.gethostbyname("google.com")\nprint(f"IP của google.com: {ip}")',
              explanation: 'Hàm socket.gethostbyname() thực hiện tra cứu DNS, trả về địa chỉ IP.',
              output: 'IP của google.com: 142.250.196.110'
            }
          ],
          quiz: [
            { id: 'qB-2-1', question: 'Địa chỉ IP nào sau đây thuộc lớp C?', options: ['10.0.0.1', '172.16.0.1', '192.168.1.1', '8.8.8.8'], correct_index: 2, explanation: 'Lớp C có octet đầu từ 192–223. 192.168.1.1 bắt đầu bằng 192 → lớp C.', topic_code: 'B' },
            { id: 'qB-2-2', question: 'DNS dùng để làm gì?', options: ['Mã hoá dữ liệu', 'Dịch tên miền thành địa chỉ IP', 'Nén file', 'Quét virus'], correct_index: 1, explanation: 'DNS (Domain Name System) phân giải tên miền dạng chữ sang địa chỉ IP dạng số.', topic_code: 'B' },
            { id: 'qB-2-3', question: 'Một địa chỉ IPv4 gồm bao nhiêu octet?', options: ['2', '3', '4', '8'], correct_index: 2, explanation: 'IPv4 gồm 4 octet (mỗi octet 8 bit = 32 bit tổng cộng), ví dụ: 192.168.1.1.', topic_code: 'B' },
            { id: 'qB-2-4', question: 'Địa chỉ 127.0.0.1 thường được gọi là gì?', options: ['Gateway', 'Broadcast', 'Localhost (loopback)', 'DNS server'], correct_index: 2, explanation: '127.0.0.1 là địa chỉ loopback — trỏ về chính máy tính đó (localhost).', topic_code: 'B' }
          ],
          exercises: []
        }
      },
      {
        id: 'B-3',
        module_id: 'B',
        title: 'Dịch vụ Internet: Web, Email, FTP',
        slug: 'dich-vu-internet',
        description: 'Giao thức HTTP/HTTPS, dịch vụ email SMTP/POP3/IMAP, FTP',
        difficulty: 'easy',
        estimated_minutes: 20,
        order_index: 3,
        xp_reward: 50,
        is_published: true,
        content: {
          objectives: [
            'Hiểu cách hoạt động của World Wide Web (HTTP/HTTPS)',
            'Phân biệt giao thức email: SMTP, POP3, IMAP',
            'Biết FTP dùng để truyền file'
          ],
          theory:
            "## Dịch vụ Internet\n\n" +
            "### 1. World Wide Web (WWW)\n\n" +
            "- Giao thức: **HTTP** (không mã hoá) / **HTTPS** (có mã hoá SSL/TLS)\n" +
            "- URL: `https://www.example.com/trang.html`\n" +
            "- Trình duyệt gửi yêu cầu (request) → Web server trả về trang HTML\n\n" +
            "### 2. Email (Thư điện tử)\n\n" +
            "| Giao thức | Vai trò |\n" +
            "|---|---|\n" +
            "| **SMTP** | Gửi thư đi |\n" +
            "| **POP3** | Nhận thư (tải về máy, xoá trên server) |\n" +
            "| **IMAP** | Nhận thư (đồng bộ, giữ trên server) |\n\n" +
            "### 3. FTP (File Transfer Protocol)\n\n" +
            "- Dùng để **truyền file** giữa máy tính và server\n" +
            "- Cổng mặc định: 21\n" +
            "- Ứng dụng: Upload website lên hosting, chia sẻ file lớn",
          examples: [],
          quiz: [
            { id: 'qB-3-1', question: 'HTTPS khác HTTP ở điểm nào?', options: ['Nhanh hơn', 'Có mã hoá dữ liệu (SSL/TLS)', 'Dùng cho email', 'Không cần Internet'], correct_index: 1, explanation: 'HTTPS = HTTP + SSL/TLS, mã hoá dữ liệu truyền đi để bảo mật.', topic_code: 'B' },
            { id: 'qB-3-2', question: 'Giao thức nào dùng để GỬI email?', options: ['POP3', 'IMAP', 'SMTP', 'FTP'], correct_index: 2, explanation: 'SMTP (Simple Mail Transfer Protocol) chuyên dùng để gửi thư đi.', topic_code: 'B' },
            { id: 'qB-3-3', question: 'FTP dùng cổng mặc định nào?', options: ['80', '443', '21', '25'], correct_index: 2, explanation: 'FTP dùng cổng 21. Cổng 80 là HTTP, 443 là HTTPS, 25 là SMTP.', topic_code: 'B' },
            { id: 'qB-3-4', question: 'IMAP khác POP3 ở điểm nào?', options: ['IMAP mã hoá còn POP3 thì không', 'IMAP giữ thư trên server, POP3 tải về rồi xoá', 'IMAP chỉ dùng cho Gmail', 'Không có sự khác biệt'], correct_index: 1, explanation: 'IMAP đồng bộ và giữ email trên server; POP3 tải về máy rồi thường xoá bản trên server.', topic_code: 'B' }
          ],
          exercises: []
        }
      }
    ]
  },

  {
    id: 'C',
    order_index: 3,
    title: 'Đạo đức, pháp luật và văn hoá trong môi trường số',
    description: 'An toàn thông tin, bản quyền số, ứng xử văn minh trên mạng',
    icon: '⚖️',
    color: '#F59E0B',
    exam_weight: 2,
    outcomes: [
      'Nhận biết các hành vi vi phạm pháp luật trên không gian mạng',
      'Hiểu khái niệm bản quyền, Creative Commons',
      'Biết cách bảo vệ thông tin cá nhân'
    ],
    lessons: [
      {
        id: 'C-1',
        module_id: 'C',
        title: 'An toàn thông tin và bảo mật',
        slug: 'an-toan-thong-tin',
        description: 'Mối đe doạ an ninh mạng, virus, phishing, cách phòng tránh',
        difficulty: 'easy',
        estimated_minutes: 20,
        order_index: 1,
        xp_reward: 50,
        is_published: true,
        content: {
          objectives: [
            'Liệt kê các mối đe doạ an toàn thông tin',
            'Phân biệt virus, worm, trojan, ransomware',
            'Nêu biện pháp bảo vệ'
          ],
          theory:
            "## An toàn thông tin\n\n" +
            "### Các mối đe doạ\n\n" +
            "| Loại | Đặc điểm |\n" +
            "|---|---|\n" +
            "| **Virus** | Lây qua file, cần người dùng kích hoạt |\n" +
            "| **Worm** | Tự lây lan qua mạng, không cần tác động |\n" +
            "| **Trojan** | Giả dạng phần mềm hợp pháp |\n" +
            "| **Ransomware** | Mã hoá dữ liệu, đòi tiền chuộc |\n" +
            "| **Phishing** | Email/website giả mạo để lừa lấy thông tin |\n\n" +
            "### Biện pháp bảo vệ\n\n" +
            "1. Cài và cập nhật phần mềm diệt virus\n" +
            "2. Không mở email, link lạ\n" +
            "3. Sử dụng mật khẩu mạnh (≥8 ký tự, chữ HOA, thường, số, ký tự đặc biệt)\n" +
            "4. Bật xác thực 2 yếu tố (2FA)\n" +
            "5. Sao lưu dữ liệu định kỳ\n" +
            "6. Cập nhật hệ điều hành và phần mềm",
          examples: [],
          quiz: [
            { id: 'qC-1-1', question: 'Phishing là gì?', options: ['Virus lây qua USB', 'Lừa đảo qua email/website giả mạo để đánh cắp thông tin', 'Phần mềm diệt virus', 'Mã hoá dữ liệu an toàn'], correct_index: 1, explanation: 'Phishing = "câu cá" — dùng email/website giả mạo để lừa người dùng nhập thông tin cá nhân.', topic_code: 'C' },
            { id: 'qC-1-2', question: 'Ransomware hoạt động như thế nào?', options: ['Xoá toàn bộ file', 'Mã hoá dữ liệu và đòi tiền chuộc', 'Làm chậm máy tính', 'Gửi spam email'], correct_index: 1, explanation: 'Ransomware mã hoá (encrypt) file của nạn nhân, yêu cầu trả tiền (thường bằng Bitcoin) để giải mã.', topic_code: 'C' },
            { id: 'qC-1-3', question: 'Mật khẩu mạnh cần có đặc điểm gì?', options: ['Chỉ cần dài', 'Kết hợp chữ hoa, thường, số và ký tự đặc biệt', 'Dùng tên + ngày sinh', 'Giống nhau cho mọi tài khoản'], correct_index: 1, explanation: 'Mật khẩu mạnh cần ≥8 ký tự, kết hợp nhiều loại ký tự và không dùng thông tin cá nhân.', topic_code: 'C' },
            { id: 'qC-1-4', question: '2FA (xác thực 2 yếu tố) nghĩa là?', options: ['Đăng nhập 2 lần', 'Cần 2 bước xác minh danh tính (VD: mật khẩu + mã OTP)', 'Dùng 2 mật khẩu', 'Có 2 tài khoản'], correct_index: 1, explanation: '2FA yêu cầu 2 yếu tố: thứ bạn BIẾT (mật khẩu) + thứ bạn CÓ (điện thoại nhận OTP) hoặc thứ bạn LÀ (vân tay).', topic_code: 'C' }
          ],
          exercises: []
        }
      },
      {
        id: 'C-2',
        module_id: 'C',
        title: 'Bản quyền và sở hữu trí tuệ số',
        slug: 'ban-quyen-so',
        description: 'Luật sở hữu trí tuệ, Creative Commons, phần mềm nguồn mở',
        difficulty: 'easy',
        estimated_minutes: 15,
        order_index: 2,
        xp_reward: 40,
        is_published: true,
        content: {
          objectives: [
            'Hiểu khái niệm bản quyền (copyright) trong lĩnh vực số',
            'Phân biệt phần mềm thương mại, miễn phí, nguồn mở',
            'Biết các giấy phép Creative Commons'
          ],
          theory:
            "## Bản quyền số\n\n" +
            "**Bản quyền (Copyright)** bảo vệ quyền của tác giả đối với tác phẩm sáng tạo (phần mềm, bài viết, ảnh, nhạc...).\n\n" +
            "### Phân loại phần mềm\n\n" +
            "| Loại | Đặc điểm | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| Thương mại | Phải mua bản quyền | Microsoft Office, Adobe Photoshop |\n" +
            "| Miễn phí (Freeware) | Dùng miễn phí, không được sửa | WinRAR (dùng thử), 7-Zip |\n" +
            "| Nguồn mở (Open Source) | Miễn phí, được xem và sửa mã nguồn | Linux, Python, Firefox |\n\n" +
            "### Creative Commons (CC)\n\n" +
            "Hệ thống giấy phép linh hoạt cho tác phẩm sáng tạo:\n" +
            "- **CC BY**: Dùng tự do, chỉ cần ghi nguồn\n" +
            "- **CC BY-SA**: Ghi nguồn + chia sẻ cùng giấy phép\n" +
            "- **CC BY-NC**: Ghi nguồn + không thương mại\n" +
            "- **CC BY-ND**: Ghi nguồn + không được chỉnh sửa\n\n" +
            "### Hành vi vi phạm bản quyền\n" +
            "- Sao chép phần mềm trái phép (crack)\n" +
            "- Tải nhạc/phim lậu\n" +
            "- Copy bài viết không ghi nguồn (đạo văn)",
          examples: [],
          quiz: [
            { id: 'qC-2-1', question: 'Phần mềm nguồn mở (Open Source) có đặc điểm gì?', options: ['Phải trả phí', 'Được xem và sửa mã nguồn', 'Chỉ chạy trên Linux', 'Không có bản quyền'], correct_index: 1, explanation: 'Open Source cho phép xem, sửa đổi và phân phối mã nguồn tự do (vẫn có bản quyền theo giấy phép).', topic_code: 'C' },
            { id: 'qC-2-2', question: 'Giấy phép CC BY-NC có nghĩa là?', options: ['Dùng tự do không điều kiện', 'Ghi nguồn và không dùng cho mục đích thương mại', 'Không được chia sẻ', 'Chỉ dùng trong giáo dục'], correct_index: 1, explanation: 'CC BY-NC: Attribution (ghi nguồn) + NonCommercial (phi thương mại).', topic_code: 'C' },
            { id: 'qC-2-3', question: 'Hành vi nào vi phạm bản quyền số?', options: ['Mua phần mềm chính hãng', 'Dùng phần mềm nguồn mở', 'Crack phần mềm trả phí để dùng miễn phí', 'Ghi nguồn khi trích dẫn'], correct_index: 2, explanation: 'Crack (bẻ khoá) phần mềm trả phí là hành vi vi phạm bản quyền, có thể bị xử phạt theo pháp luật.', topic_code: 'C' }
          ],
          exercises: []
        }
      },
      {
        id: 'C-3',
        module_id: 'C',
        title: 'Ứng xử văn minh trên mạng',
        slug: 'ung-xu-van-minh-tren-mang',
        description: 'Netiquette, cyberbullying, bảo vệ thông tin cá nhân',
        difficulty: 'easy',
        estimated_minutes: 15,
        order_index: 3,
        xp_reward: 40,
        is_published: true,
        content: {
          objectives: [
            'Biết các quy tắc ứng xử văn minh trên mạng (netiquette)',
            'Nhận diện hành vi bắt nạt trực tuyến (cyberbullying)',
            'Biết cách bảo vệ thông tin cá nhân'
          ],
          theory:
            "## Ứng xử trên mạng\n\n" +
            "### Netiquette (Quy tắc ứng xử trên mạng)\n\n" +
            "1. Tôn trọng người khác như giao tiếp trực tiếp\n" +
            "2. Không viết HOA toàn bộ (= HÉT)\n" +
            "3. Kiểm tra thông tin trước khi chia sẻ (tránh tin giả)\n" +
            "4. Bảo vệ quyền riêng tư của người khác\n" +
            "5. Không spam, không quấy rối\n\n" +
            "### Cyberbullying (Bắt nạt trực tuyến)\n\n" +
            "- Đăng ảnh/video xấu của người khác\n" +
            "- Nhắn tin đe doạ, xúc phạm\n" +
            "- Tạo tài khoản giả mạo\n" +
            "- Lan truyền tin đồn thất thiệt\n\n" +
            "**Cách xử lý**: Chặn, báo cáo, giữ bằng chứng, nói với người lớn.\n\n" +
            "### Bảo vệ thông tin cá nhân\n\n" +
            "- Không chia sẻ CMND/CCCD, địa chỉ nhà, số điện thoại trên mạng xã hội\n" +
            "- Cẩn thận khi cấp quyền cho ứng dụng\n" +
            "- Đọc chính sách bảo mật trước khi đăng ký dịch vụ\n" +
            "- Kiểm tra quyền riêng tư trên mạng xã hội",
          examples: [],
          quiz: [
            { id: 'qC-3-1', question: 'Hành vi nào là cyberbullying?', options: ['Like bài viết của bạn', 'Đăng ảnh xấu của bạn cùng lớp lên mạng để chế nhạo', 'Chia sẻ bài học hữu ích', 'Comment góp ý lịch sự'], correct_index: 1, explanation: 'Đăng ảnh xấu để chế nhạo là hành vi bắt nạt trực tuyến, gây tổn thương tinh thần nạn nhân.', topic_code: 'C' },
            { id: 'qC-3-2', question: 'Thông tin nào KHÔNG nên chia sẻ công khai trên mạng xã hội?', options: ['Sở thích đọc sách', 'Số CCCD và địa chỉ nhà', 'Bức ảnh phong cảnh', 'Bài viết về môn học'], correct_index: 1, explanation: 'Số CCCD và địa chỉ nhà là thông tin nhạy cảm, có thể bị lợi dụng cho lừa đảo hoặc trộm cắp.', topic_code: 'C' },
            { id: 'qC-3-3', question: 'Khi bị cyberbullying, nên làm gì ĐẦU TIÊN?', options: ['Phản ứng lại ngay', 'Chặn và giữ bằng chứng, báo cho người lớn', 'Xoá tài khoản', 'Im lặng chịu đựng'], correct_index: 1, explanation: 'Chặn người bắt nạt, lưu bằng chứng (screenshot), và thông báo cho phụ huynh/giáo viên/cơ quan chức năng.', topic_code: 'C' }
          ],
          exercises: []
        }
      }
    ]
  },

  {
    id: 'D',
    order_index: 4,
    title: 'Ứng dụng tin học — Cơ sở dữ liệu và SQL',
    description: 'Thiết kế CSDL quan hệ, ngôn ngữ truy vấn SQL, thao tác dữ liệu',
    icon: '🗄️',
    color: '#06B6D4',
    exam_weight: 4,
    outcomes: [
      'Hiểu mô hình CSDL quan hệ (bảng, hàng, cột, khoá)',
      'Viết được các câu truy vấn SELECT cơ bản và nâng cao',
      'Sử dụng JOIN, GROUP BY, hàm gộp (COUNT, SUM, AVG, MAX, MIN)',
      'Tạo bảng với CREATE TABLE, thêm/sửa/xoá dữ liệu'
    ],
    lessons: [
      {
        id: 'D-1',
        module_id: 'D',
        title: 'Giới thiệu Cơ sở dữ liệu quan hệ',
        slug: 'gioi-thieu-csdl-quan-he',
        description: 'Khái niệm CSDL, bảng, hàng, cột, khoá chính, khoá ngoại',
        difficulty: 'easy',
        estimated_minutes: 25,
        order_index: 1,
        xp_reward: 60,
        is_published: true,
        content: {
          objectives: [
            'Định nghĩa CSDL quan hệ',
            'Phân biệt bảng, hàng (bản ghi), cột (trường)',
            'Hiểu khoá chính (PRIMARY KEY) và khoá ngoại (FOREIGN KEY)'
          ],
          theory:
            "## Cơ sở dữ liệu quan hệ\n\n" +
            "**CSDL quan hệ** (Relational Database) tổ chức dữ liệu dưới dạng **các bảng** có quan hệ với nhau.\n\n" +
            "### Thuật ngữ cơ bản\n\n" +
            "| Thuật ngữ | Ý nghĩa | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| **Bảng** (Table) | Tập hợp dữ liệu cùng loại | Bảng `HocSinh` |\n" +
            "| **Hàng** (Row/Record) | Một bản ghi | 1 học sinh cụ thể |\n" +
            "| **Cột** (Column/Field) | Một thuộc tính | `HoTen`, `DiemTB` |\n" +
            "| **Khoá chính** (Primary Key) | Cột xác định duy nhất mỗi hàng | `MaHS` |\n" +
            "| **Khoá ngoại** (Foreign Key) | Cột liên kết sang bảng khác | `MaLop` trong bảng HocSinh |\n\n" +
            "### Ví dụ bảng HocSinh\n\n" +
            "```\n" +
            "| MaHS | HoTen          | Lop   | DiemTB |\n" +
            "|------|----------------|-------|--------|\n" +
            "| HS01 | Nguyễn Văn An  | 12A1  | 8.5    |\n" +
            "| HS02 | Trần Thị Bình  | 12A2  | 9.0    |\n" +
            "| HS03 | Lê Minh Châu   | 12A1  | 7.8    |\n" +
            "```\n\n" +
            "- **Khoá chính**: `MaHS` (không có 2 học sinh cùng mã)\n" +
            "- **Quan hệ**: Nếu có bảng `Lop` thì `Lop` trong bảng `HocSinh` là khoá ngoại",
          examples: [
            {
              title: 'Tạo bảng HocSinh bằng SQL',
              code: 'CREATE TABLE HocSinh (\n    MaHS VARCHAR(10) PRIMARY KEY,\n    HoTen NVARCHAR(50) NOT NULL,\n    Lop VARCHAR(10),\n    DiemTB FLOAT\n);',
              explanation: 'CREATE TABLE tạo bảng mới. PRIMARY KEY đánh dấu cột khoá chính. NOT NULL bắt buộc phải có giá trị.',
              output: 'Table created successfully.'
            }
          ],
          quiz: [
            { id: 'qD-1-1', question: 'Khoá chính (Primary Key) dùng để làm gì?', options: ['Mã hoá dữ liệu', 'Xác định duy nhất mỗi bản ghi trong bảng', 'Liên kết 2 bảng', 'Sắp xếp dữ liệu'], correct_index: 1, explanation: 'Primary Key đảm bảo mỗi hàng trong bảng có giá trị duy nhất, không trùng lặp.', topic_code: 'D' },
            { id: 'qD-1-2', question: 'Khoá ngoại (Foreign Key) có vai trò gì?', options: ['Mã hoá bảng', 'Tạo quan hệ (liên kết) giữa 2 bảng', 'Xoá dữ liệu', 'Sao lưu bảng'], correct_index: 1, explanation: 'Foreign Key là cột trong bảng này tham chiếu tới Primary Key của bảng khác, tạo quan hệ.', topic_code: 'D' },
            { id: 'qD-1-3', question: 'Trong bảng CSDL, một "bản ghi" (record) tương ứng với?', options: ['Một cột', 'Một hàng', 'Toàn bộ bảng', 'Tên bảng'], correct_index: 1, explanation: 'Mỗi hàng (row) trong bảng là một bản ghi, chứa thông tin của 1 đối tượng cụ thể.', topic_code: 'D' },
            { id: 'qD-1-4', question: 'Lệnh SQL nào dùng để tạo bảng mới?', options: ['INSERT TABLE', 'MAKE TABLE', 'CREATE TABLE', 'NEW TABLE'], correct_index: 2, explanation: 'CREATE TABLE là lệnh DDL (Data Definition Language) để tạo bảng mới trong CSDL.', topic_code: 'D' },
            { id: 'qD-1-5', question: 'NOT NULL trong SQL có ý nghĩa gì?', options: ['Giá trị phải là số', 'Cột không được để trống', 'Cột là khoá chính', 'Dữ liệu sẽ bị xoá'], correct_index: 1, explanation: 'NOT NULL ràng buộc cột phải có giá trị khi thêm/sửa dữ liệu, không được bỏ trống.', topic_code: 'D' }
          ],
          exercises: []
        }
      },
      {
        id: 'D-2',
        module_id: 'D',
        title: 'Truy vấn SELECT cơ bản',
        slug: 'truy-van-select-co-ban',
        description: 'SELECT, WHERE, ORDER BY, LIKE, BETWEEN, IN',
        difficulty: 'medium',
        estimated_minutes: 30,
        order_index: 2,
        xp_reward: 80,
        is_published: true,
        content: {
          objectives: [
            'Viết câu truy vấn SELECT lấy dữ liệu từ bảng',
            'Dùng WHERE với các toán tử so sánh, LIKE, BETWEEN, IN',
            'Sắp xếp kết quả bằng ORDER BY'
          ],
          theory:
            "## Câu lệnh SELECT\n\n" +
            "```sql\n" +
            "SELECT cot1, cot2, ...\n" +
            "FROM ten_bang\n" +
            "WHERE dieu_kien\n" +
            "ORDER BY cot ASC|DESC;\n" +
            "```\n\n" +
            "### Ví dụ với bảng HocSinh\n\n" +
            "```sql\n" +
            "-- Lấy tất cả học sinh\n" +
            "SELECT * FROM HocSinh;\n\n" +
            "-- Lấy tên và điểm của HS lớp 12A1\n" +
            "SELECT HoTen, DiemTB FROM HocSinh WHERE Lop = '12A1';\n\n" +
            "-- HS có điểm >= 8, sắp xếp giảm dần\n" +
            "SELECT * FROM HocSinh WHERE DiemTB >= 8 ORDER BY DiemTB DESC;\n" +
            "```\n\n" +
            "### Toán tử trong WHERE\n\n" +
            "| Toán tử | Ý nghĩa | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| `=, <>, <, >, <=, >=` | So sánh | `DiemTB >= 8` |\n" +
            "| `BETWEEN a AND b` | Trong khoảng | `DiemTB BETWEEN 7 AND 9` |\n" +
            "| `IN (v1, v2,...)` | Thuộc tập | `Lop IN ('12A1','12A2')` |\n" +
            "| `LIKE` | So khớp mẫu | `HoTen LIKE 'Nguyễn%'` |\n" +
            "| `IS NULL` | Giá trị rỗng | `DiemTB IS NULL` |\n\n" +
            "### Ký tự đại diện trong LIKE\n" +
            "- `%` : Bất kỳ chuỗi ký tự nào (kể cả rỗng)\n" +
            "- `_` : Đúng 1 ký tự bất kỳ",
          examples: [
            {
              title: 'Truy vấn SELECT với WHERE',
              code: "-- Tìm HS tên bắt đầu bằng 'Nguyễn' và điểm >= 8\nSELECT MaHS, HoTen, DiemTB\nFROM HocSinh\nWHERE HoTen LIKE 'Nguyễn%' AND DiemTB >= 8\nORDER BY DiemTB DESC;",
              explanation: "LIKE 'Nguyễn%' tìm họ bắt đầu bằng Nguyễn. AND kết hợp 2 điều kiện. ORDER BY DESC sắp xếp giảm dần.",
              output: '| MaHS | HoTen         | DiemTB |\n| HS01 | Nguyễn Văn An | 8.5    |'
            }
          ],
          quiz: [
            { id: 'qD-2-1', question: "Câu lệnh nào lấy TẤT CẢ dữ liệu từ bảng HocSinh?", options: ["SELECT ALL HocSinh", "SELECT * FROM HocSinh", "GET * FROM HocSinh", "SHOW HocSinh"], correct_index: 1, explanation: "SELECT * FROM tên_bảng lấy tất cả cột và tất cả hàng.", topic_code: 'D' },
            { id: 'qD-2-2', question: "LIKE 'Tr_n%' sẽ khớp với tên nào?", options: ["Trịnh Văn A", "Trần Thị B", "Trương Văn C", "Cả 3 đáp án trên"], correct_index: 1, explanation: "'Tr_n%': _ khớp đúng 1 ký tự (ầ), % khớp phần còn lại. → khớp 'Trần...' nhưng không khớp 'Trịnh' (ị≠_n) hay 'Trương'.", topic_code: 'D' },
            { id: 'qD-2-3', question: "ORDER BY DiemTB DESC có ý nghĩa gì?", options: ["Sắp xếp điểm tăng dần", "Sắp xếp điểm giảm dần", "Xoá cột DiemTB", "Lọc điểm > 0"], correct_index: 1, explanation: "DESC = descending = giảm dần. ASC (mặc định) = ascending = tăng dần.", topic_code: 'D' },
            { id: 'qD-2-4', question: "Toán tử BETWEEN 7 AND 9 tương đương với?", options: [">= 7 AND <= 9", "> 7 AND < 9", "= 7 OR = 9", "> 7 OR < 9"], correct_index: 0, explanation: "BETWEEN a AND b bao gồm cả 2 biên: >= a AND <= b.", topic_code: 'D' },
            { id: 'qD-2-5', question: "Lệnh nào tìm HS có DiemTB là NULL?", options: ["WHERE DiemTB = NULL", "WHERE DiemTB IS NULL", "WHERE DiemTB == NULL", "WHERE DiemTB LIKE NULL"], correct_index: 1, explanation: "Trong SQL, so sánh với NULL phải dùng IS NULL (không dùng = NULL).", topic_code: 'D' }
          ],
          exercises: [
            {
              id: 'ex-D-2-1',
              lesson_id: 'D-2',
              title: 'Viết câu truy vấn lọc học sinh giỏi',
              description: 'Viết câu SQL lấy HoTen và DiemTB của học sinh lớp 12A1 có DiemTB >= 8, sắp xếp giảm dần theo điểm.',
              difficulty: 'medium',
              language: 'sql',
              starter_code: "-- Viết câu truy vấn ở đây\nSELECT \nFROM HocSinh\nWHERE \nORDER BY ;",
              solution_code: "SELECT HoTen, DiemTB\nFROM HocSinh\nWHERE Lop = '12A1' AND DiemTB >= 8\nORDER BY DiemTB DESC;",
              hints: ['Dùng SELECT cột1, cột2 thay vì *', 'WHERE kết hợp 2 điều kiện bằng AND', 'ORDER BY cột DESC để sắp giảm dần'],
              xp_reward: 30,
              test_cases: [
                { input: '', expected_output: "SELECT HoTen, DiemTB FROM HocSinh WHERE Lop = '12A1' AND DiemTB >= 8 ORDER BY DiemTB DESC", is_hidden: false }
              ]
            }
          ]
        }
      },
      {
        id: 'D-3',
        module_id: 'D',
        title: 'Hàm gộp và GROUP BY',
        slug: 'ham-gop-va-group-by',
        description: 'COUNT, SUM, AVG, MAX, MIN, GROUP BY, HAVING',
        difficulty: 'medium',
        estimated_minutes: 30,
        order_index: 3,
        xp_reward: 80,
        is_published: true,
        content: {
          objectives: [
            'Sử dụng hàm gộp COUNT, SUM, AVG, MAX, MIN',
            'Nhóm dữ liệu với GROUP BY',
            'Lọc nhóm với HAVING'
          ],
          theory:
            "## Hàm gộp (Aggregate Functions)\n\n" +
            "| Hàm | Ý nghĩa | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| `COUNT(*)` | Đếm số hàng | Đếm số HS |\n" +
            "| `SUM(cot)` | Tổng | Tổng điểm |\n" +
            "| `AVG(cot)` | Trung bình | Điểm TB lớp |\n" +
            "| `MAX(cot)` | Giá trị lớn nhất | Điểm cao nhất |\n" +
            "| `MIN(cot)` | Giá trị nhỏ nhất | Điểm thấp nhất |\n\n" +
            "### GROUP BY\n\n" +
            "Nhóm các hàng có cùng giá trị và áp dụng hàm gộp lên mỗi nhóm:\n\n" +
            "```sql\n" +
            "-- Đếm số HS mỗi lớp\n" +
            "SELECT Lop, COUNT(*) AS SoHS\n" +
            "FROM HocSinh\n" +
            "GROUP BY Lop;\n" +
            "```\n\n" +
            "### HAVING\n\n" +
            "Lọc **nhóm** (dùng sau GROUP BY, khác WHERE lọc **hàng**):\n\n" +
            "```sql\n" +
            "-- Chỉ hiện lớp có trên 30 HS\n" +
            "SELECT Lop, COUNT(*) AS SoHS\n" +
            "FROM HocSinh\n" +
            "GROUP BY Lop\n" +
            "HAVING COUNT(*) > 30;\n" +
            "```\n\n" +
            "### Phân biệt WHERE vs HAVING\n\n" +
            "| | WHERE | HAVING |\n" +
            "|---|---|---|\n" +
            "| Vị trí | Trước GROUP BY | Sau GROUP BY |\n" +
            "| Lọc | Từng hàng | Từng nhóm |\n" +
            "| Dùng hàm gộp? | Không | Có |",
          examples: [
            {
              title: 'Tính điểm trung bình mỗi lớp',
              code: "SELECT Lop, COUNT(*) AS SoHS, AVG(DiemTB) AS DiemTBLop\nFROM HocSinh\nGROUP BY Lop\nHAVING AVG(DiemTB) >= 7\nORDER BY DiemTBLop DESC;",
              explanation: 'GROUP BY Lop nhóm theo lớp, AVG tính trung bình, HAVING lọc nhóm có điểm TB >= 7.',
              output: '| Lop  | SoHS | DiemTBLop |\n| 12A1 | 35   | 7.8       |\n| 12A2 | 33   | 7.5       |'
            }
          ],
          quiz: [
            { id: 'qD-3-1', question: 'Hàm COUNT(*) dùng để làm gì?', options: ['Tính tổng giá trị', 'Đếm số hàng (bản ghi)', 'Tìm giá trị lớn nhất', 'Tính trung bình'], correct_index: 1, explanation: 'COUNT(*) đếm tổng số hàng trong bảng hoặc trong mỗi nhóm (nếu có GROUP BY).', topic_code: 'D' },
            { id: 'qD-3-2', question: 'HAVING khác WHERE ở điểm nào?', options: ['HAVING nhanh hơn', 'HAVING lọc nhóm (sau GROUP BY), WHERE lọc hàng (trước GROUP BY)', 'HAVING là WHERE viết tắt', 'Không khác nhau'], correct_index: 1, explanation: 'WHERE lọc từng hàng trước khi nhóm. HAVING lọc nhóm sau khi đã GROUP BY và tính hàm gộp.', topic_code: 'D' },
            { id: 'qD-3-3', question: 'Muốn tìm điểm cao nhất trong bảng HocSinh, dùng hàm nào?', options: ['SUM(DiemTB)', 'MAX(DiemTB)', 'TOP(DiemTB)', 'HIGH(DiemTB)'], correct_index: 1, explanation: 'MAX(cot) trả về giá trị lớn nhất trong cột. SUM tính tổng, không phải giá trị max.', topic_code: 'D' },
            { id: 'qD-3-4', question: 'Câu SQL nào đúng cú pháp?', options: ['SELECT Lop, COUNT(*) FROM HocSinh GROUP BY Lop HAVING COUNT(*) > 5', 'SELECT Lop, COUNT(*) FROM HocSinh HAVING COUNT(*) > 5 GROUP BY Lop', 'SELECT Lop, COUNT(*) GROUP BY Lop FROM HocSinh', 'GROUP BY Lop SELECT COUNT(*) FROM HocSinh'], correct_index: 0, explanation: 'Thứ tự đúng: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.', topic_code: 'D' }
          ],
          exercises: []
        }
      },
      {
        id: 'D-4',
        module_id: 'D',
        title: 'JOIN — Kết nối bảng',
        slug: 'join-ket-noi-bang',
        description: 'INNER JOIN, LEFT JOIN để truy vấn dữ liệu từ nhiều bảng',
        difficulty: 'hard',
        estimated_minutes: 35,
        order_index: 4,
        xp_reward: 100,
        is_published: true,
        content: {
          objectives: [
            'Hiểu khi nào cần JOIN nhiều bảng',
            'Viết câu INNER JOIN và LEFT JOIN',
            'Phân biệt INNER JOIN, LEFT JOIN'
          ],
          theory:
            "## Kết nối bảng (JOIN)\n\n" +
            "Khi dữ liệu nằm ở **nhiều bảng**, ta dùng JOIN để kết hợp chúng.\n\n" +
            "### Giả sử có 2 bảng:\n\n" +
            "**HocSinh**: MaHS, HoTen, MaLop\n" +
            "**Lop**: MaLop, TenLop, GVCN\n\n" +
            "### INNER JOIN\n\n" +
            "Chỉ lấy các hàng **có kết quả khớp ở cả 2 bảng**:\n\n" +
            "```sql\n" +
            "SELECT hs.HoTen, l.TenLop, l.GVCN\n" +
            "FROM HocSinh hs\n" +
            "INNER JOIN Lop l ON hs.MaLop = l.MaLop;\n" +
            "```\n\n" +
            "### LEFT JOIN\n\n" +
            "Lấy **tất cả** hàng bảng trái, nếu không khớp bảng phải thì NULL:\n\n" +
            "```sql\n" +
            "SELECT hs.HoTen, l.TenLop\n" +
            "FROM HocSinh hs\n" +
            "LEFT JOIN Lop l ON hs.MaLop = l.MaLop;\n" +
            "```\n\n" +
            "### So sánh\n\n" +
            "| | INNER JOIN | LEFT JOIN |\n" +
            "|---|---|---|\n" +
            "| Kết quả | Chỉ hàng khớp cả 2 bên | Tất cả bên trái + khớp bên phải |\n" +
            "| NULL | Không có | Có (khi bên phải không khớp) |",
          examples: [
            {
              title: 'INNER JOIN 2 bảng',
              code: "SELECT hs.MaHS, hs.HoTen, l.TenLop, l.GVCN\nFROM HocSinh hs\nINNER JOIN Lop l ON hs.MaLop = l.MaLop\nWHERE l.TenLop = '12A1';",
              explanation: 'INNER JOIN kết nối HocSinh với Lop qua cột MaLop. Alias hs, l giúp viết ngắn gọn.',
              output: '| MaHS | HoTen         | TenLop | GVCN          |\n| HS01 | Nguyễn Văn An | 12A1   | Cô Hương      |'
            }
          ],
          quiz: [
            { id: 'qD-4-1', question: 'INNER JOIN trả về kết quả gì?', options: ['Tất cả hàng bảng trái', 'Tất cả hàng bảng phải', 'Chỉ các hàng có khớp ở cả 2 bảng', 'Toàn bộ 2 bảng'], correct_index: 2, explanation: 'INNER JOIN chỉ giữ lại hàng mà điều kiện ON thoả mãn ở CẢ HAI bảng.', topic_code: 'D' },
            { id: 'qD-4-2', question: 'LEFT JOIN khác INNER JOIN ở chỗ nào?', options: ['Nhanh hơn', 'Giữ tất cả hàng bảng trái, bảng phải không khớp thì NULL', 'Chỉ dùng được với 2 bảng', 'Không cần điều kiện ON'], correct_index: 1, explanation: 'LEFT JOIN giữ mọi hàng bảng bên trái; nếu bảng phải không có hàng khớp thì các cột bên phải là NULL.', topic_code: 'D' },
            { id: 'qD-4-3', question: 'Từ khoá nào dùng để chỉ điều kiện kết nối trong JOIN?', options: ['WHERE', 'ON', 'HAVING', 'BY'], correct_index: 1, explanation: 'ON chỉ định điều kiện kết nối giữa 2 bảng trong câu JOIN (VD: ON a.id = b.id).', topic_code: 'D' },
            { id: 'qD-4-4', question: 'Alias (bí danh) "hs" trong "FROM HocSinh hs" dùng để?', options: ['Đổi tên bảng vĩnh viễn', 'Viết tắt tên bảng trong câu truy vấn hiện tại', 'Tạo bảng mới', 'Xoá bảng cũ'], correct_index: 1, explanation: 'Alias là tên rút gọn tạm thời, chỉ có hiệu lực trong câu truy vấn đó, giúp viết ngắn gọn.', topic_code: 'D' }
          ],
          exercises: []
        }
      }
    ]
  },

  {
    id: 'E',
    order_index: 5,
    title: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
    description: 'Lập trình Python, thuật toán, độ phức tạp, đệ quy, sắp xếp, tìm kiếm',
    icon: '🧠',
    color: '#10B981',
    exam_weight: 4,
    outcomes: [
      'Phân tích bài toán và thiết kế thuật toán',
      'Đánh giá độ phức tạp thuật toán O(n), O(n²), O(log n)',
      'Cài đặt thuật toán đệ quy, sắp xếp, tìm kiếm bằng Python',
      'Giải bài toán mô phỏng đơn giản'
    ],
    lessons: [
      {
        id: 'E-1',
        module_id: 'E',
        title: 'Phân tích bài toán và thuật toán',
        slug: 'phan-tich-bai-toan-thuat-toan',
        description: 'Bước phân tích, biểu diễn thuật toán bằng mã giả và sơ đồ khối',
        difficulty: 'easy',
        estimated_minutes: 25,
        order_index: 1,
        xp_reward: 60,
        is_published: true,
        content: {
          objectives: [
            'Nắm được 3 bước giải bài toán bằng máy tính',
            'Biểu diễn thuật toán bằng mã giả (pseudocode)',
            'Đọc được sơ đồ khối (flowchart)'
          ],
          theory:
            "## 3 bước giải bài toán bằng máy tính\n\n" +
            "1. **Xác định bài toán**: Input (đầu vào) → Output (đầu ra)\n" +
            "2. **Thiết kế thuật toán**: Mô tả các bước giải\n" +
            "3. **Cài đặt chương trình**: Viết code bằng ngôn ngữ lập trình\n\n" +
            "## Biểu diễn thuật toán\n\n" +
            "### Mã giả (Pseudocode)\n" +
            "```\n" +
            "Thuật toán: Tìm số lớn nhất trong dãy\n" +
            "Input: Dãy n số nguyên a[1..n]\n" +
            "Output: Giá trị lớn nhất\n\n" +
            "B1: max ← a[1]\n" +
            "B2: Với i từ 2 đến n:\n" +
            "    B2.1: Nếu a[i] > max thì max ← a[i]\n" +
            "B3: Trả về max\n" +
            "```\n\n" +
            "### Sơ đồ khối\n" +
            "- **Hình oval**: Bắt đầu / Kết thúc\n" +
            "- **Hình bình hành**: Nhập / Xuất\n" +
            "- **Hình chữ nhật**: Xử lý\n" +
            "- **Hình thoi**: Điều kiện (rẽ nhánh)\n" +
            "- **Mũi tên**: Luồng thực hiện",
          examples: [
            {
              title: 'Cài đặt thuật toán tìm max bằng Python',
              code: 'def tim_max(day):\n    """Tìm số lớn nhất trong dãy"""\n    max_val = day[0]\n    for i in range(1, len(day)):\n        if day[i] > max_val:\n            max_val = day[i]\n    return max_val\n\n# Test\nday_so = [3, 7, 1, 9, 4, 6]\nprint(f"Số lớn nhất: {tim_max(day_so)}")',
              explanation: 'Khởi tạo max = phần tử đầu, duyệt so sánh từng phần tử, cập nhật max khi tìm thấy giá trị lớn hơn.',
              output: 'Số lớn nhất: 9'
            }
          ],
          quiz: [
            { id: 'qE-1-1', question: 'Bước đầu tiên khi giải bài toán bằng máy tính là gì?', options: ['Viết code', 'Xác định bài toán (Input/Output)', 'Chạy thử', 'Thiết kế giao diện'], correct_index: 1, explanation: 'Phải xác định rõ đầu vào (Input) và đầu ra mong muốn (Output) trước khi thiết kế thuật toán.', topic_code: 'E' },
            { id: 'qE-1-2', question: 'Trong sơ đồ khối, hình thoi biểu diễn?', options: ['Bắt đầu/Kết thúc', 'Xử lý', 'Điều kiện (rẽ nhánh)', 'Nhập/Xuất'], correct_index: 2, explanation: 'Hình thoi dùng cho câu hỏi điều kiện (đúng/sai), tạo nhánh trong thuật toán.', topic_code: 'E' },
            { id: 'qE-1-3', question: 'Mã giả (pseudocode) là gì?', options: ['Code Python', 'Mô tả thuật toán bằng ngôn ngữ gần tự nhiên, không phụ thuộc ngôn ngữ lập trình', 'File thực thi', 'Ngôn ngữ máy'], correct_index: 1, explanation: 'Pseudocode mô tả logic thuật toán dễ hiểu cho con người, không ràng buộc cú pháp ngôn ngữ cụ thể.', topic_code: 'E' }
          ],
          exercises: []
        }
      },
      {
        id: 'E-2',
        module_id: 'E',
        title: 'Độ phức tạp thuật toán',
        slug: 'do-phuc-tap-thuat-toan',
        description: 'Big-O notation: O(1), O(log n), O(n), O(n log n), O(n²)',
        difficulty: 'medium',
        estimated_minutes: 30,
        order_index: 2,
        xp_reward: 80,
        is_published: true,
        content: {
          objectives: [
            'Hiểu khái niệm độ phức tạp thời gian',
            'Xác định Big-O của thuật toán đơn giản',
            'So sánh hiệu quả các thuật toán'
          ],
          theory:
            "## Độ phức tạp thuật toán (Big-O)\n\n" +
            "Big-O mô tả **tốc độ tăng** của thời gian chạy khi kích thước đầu vào (n) tăng.\n\n" +
            "### Các mức phổ biến (từ nhanh → chậm)\n\n" +
            "| Big-O | Tên gọi | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| O(1) | Hằng số | Truy cập phần tử mảng theo index |\n" +
            "| O(log n) | Logarit | Tìm kiếm nhị phân |\n" +
            "| O(n) | Tuyến tính | Duyệt mảng 1 lần |\n" +
            "| O(n log n) | n log n | Merge Sort, Quick Sort (TB) |\n" +
            "| O(n²) | Bình phương | 2 vòng lặp lồng nhau, Bubble Sort |\n" +
            "| O(2ⁿ) | Mũ | Brute-force tổ hợp |\n\n" +
            "### Quy tắc xác định Big-O\n\n" +
            "1. **Bỏ hằng số**: 3n → O(n)\n" +
            "2. **Giữ hạng lớn nhất**: n² + n → O(n²)\n" +
            "3. **Vòng lặp đơn**: O(n)\n" +
            "4. **Vòng lặp lồng nhau**: O(n × m) hoặc O(n²)\n" +
            "5. **Chia đôi mỗi bước**: O(log n)",
          examples: [
            {
              title: 'So sánh O(n) vs O(n²)',
              code: 'import time\n\ndef tim_kiem_tuyen_tinh(arr, x):  # O(n)\n    for i in range(len(arr)):\n        if arr[i] == x:\n            return i\n    return -1\n\ndef dem_cap_bang_nhau(arr):  # O(n²)\n    count = 0\n    for i in range(len(arr)):\n        for j in range(i+1, len(arr)):\n            if arr[i] == arr[j]:\n                count += 1\n    return count\n\narr = list(range(1000))\nprint(f"Tìm kiếm O(n): {tim_kiem_tuyen_tinh(arr, 500)}")\nprint(f"Đếm cặp O(n²): {dem_cap_bang_nhau([1,2,1,3,2])}")',
              explanation: 'Tìm kiếm tuyến tính duyệt 1 lần → O(n). Đếm cặp dùng 2 vòng lặp lồng → O(n²).',
              output: 'Tìm kiếm O(n): 500\nĐếm cặp O(n²): 2'
            }
          ],
          quiz: [
            { id: 'qE-2-1', question: 'Thuật toán tìm kiếm nhị phân có độ phức tạp?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct_index: 2, explanation: 'Tìm kiếm nhị phân chia đôi mảng mỗi bước → số bước = log₂(n) → O(log n).', topic_code: 'E' },
            { id: 'qE-2-2', question: 'Đoạn code "for i in range(n): for j in range(n): ..." có độ phức tạp?', options: ['O(n)', 'O(2n)', 'O(n²)', 'O(log n)'], correct_index: 2, explanation: '2 vòng lặp lồng nhau, mỗi vòng chạy n lần → tổng n×n = n² lần → O(n²).', topic_code: 'E' },
            { id: 'qE-2-3', question: 'O(n² + n) đơn giản thành?', options: ['O(n² + n)', 'O(n²)', 'O(n)', 'O(2n²)'], correct_index: 1, explanation: 'Quy tắc Big-O: giữ hạng bậc cao nhất, bỏ hạng thấp → n² + n → O(n²).', topic_code: 'E' },
            { id: 'qE-2-4', question: 'Thuật toán nào nhanh nhất khi n lớn?', options: ['O(n²)', 'O(n log n)', 'O(2ⁿ)', 'O(n)'], correct_index: 3, explanation: 'O(n) < O(n log n) < O(n²) < O(2ⁿ). O(n) tuyến tính là nhanh nhất trong 4 lựa chọn.', topic_code: 'E' }
          ],
          exercises: []
        }
      },
      {
        id: 'E-3',
        module_id: 'E',
        title: 'Thuật toán sắp xếp',
        slug: 'thuat-toan-sap-xep',
        description: 'Bubble Sort, Selection Sort, Insertion Sort — cài đặt Python',
        difficulty: 'medium',
        estimated_minutes: 35,
        order_index: 3,
        xp_reward: 90,
        is_published: true,
        content: {
          objectives: [
            'Hiểu ý tưởng 3 thuật toán sắp xếp cơ bản',
            'Cài đặt Bubble Sort, Selection Sort, Insertion Sort bằng Python',
            'So sánh ưu nhược điểm'
          ],
          theory:
            "## Thuật toán sắp xếp\n\n" +
            "### 1. Bubble Sort (Sắp xếp nổi bọt)\n" +
            "- **Ý tưởng**: So sánh 2 phần tử liền kề, đổi chỗ nếu sai thứ tự. Lặp đến khi không còn đổi.\n" +
            "- **Độ phức tạp**: O(n²)\n\n" +
            "### 2. Selection Sort (Sắp xếp chọn)\n" +
            "- **Ý tưởng**: Tìm phần tử nhỏ nhất trong phần chưa sắp xếp, đưa lên đầu.\n" +
            "- **Độ phức tạp**: O(n²)\n\n" +
            "### 3. Insertion Sort (Sắp xếp chèn)\n" +
            "- **Ý tưởng**: Chèn từng phần tử vào vị trí đúng trong phần đã sắp xếp.\n" +
            "- **Độ phức tạp**: O(n²) tệ nhất, O(n) tốt nhất (đã gần sắp xếp)\n\n" +
            "### So sánh\n" +
            "| Thuật toán | Tốt nhất | Tệ nhất | Ổn định |\n" +
            "|---|---|---|---|\n" +
            "| Bubble Sort | O(n) | O(n²) | Có |\n" +
            "| Selection Sort | O(n²) | O(n²) | Không |\n" +
            "| Insertion Sort | O(n) | O(n²) | Có |",
          examples: [
            {
              title: 'Cài đặt 3 thuật toán sắp xếp',
              code: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\ndef selection_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\ndef insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j+1] = arr[j]\n            j -= 1\n        arr[j+1] = key\n    return arr\n\nprint(bubble_sort([5, 3, 8, 1, 2]))',
              explanation: 'Cả 3 đều có O(n²). Bubble so sánh kề, Selection tìm min, Insertion chèn đúng vị trí.',
              output: '[1, 2, 3, 5, 8]'
            }
          ],
          quiz: [
            { id: 'qE-3-1', question: 'Bubble Sort so sánh gì ở mỗi bước?', options: ['Phần tử đầu và cuối', 'Hai phần tử liền kề', 'Phần tử với giá trị trung bình', 'Phần tử ngẫu nhiên'], correct_index: 1, explanation: 'Bubble Sort so sánh 2 phần tử liền kề (cạnh nhau), đổi chỗ nếu sai thứ tự.', topic_code: 'E' },
            { id: 'qE-3-2', question: 'Selection Sort có ý tưởng chính là gì?', options: ['Chèn phần tử vào đúng vị trí', 'Tìm phần tử nhỏ nhất đưa lên đầu phần chưa sắp xếp', 'Chia đôi mảng', 'So sánh phần tử kề'], correct_index: 1, explanation: 'Selection Sort "chọn" phần tử nhỏ nhất trong phần chưa sắp xếp, hoán đổi với vị trí đầu phần đó.', topic_code: 'E' },
            { id: 'qE-3-3', question: 'Thuật toán sắp xếp nào tốt nhất khi mảng GẦN NHƯ ĐÃ SẮP XẾP?', options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Cả 3 như nhau'], correct_index: 2, explanation: 'Insertion Sort có O(n) khi mảng gần sắp xếp vì mỗi phần tử chỉ dịch ít bước.', topic_code: 'E' }
          ],
          exercises: [
            {
              id: 'ex-E-3-1',
              lesson_id: 'E-3',
              title: 'Cài đặt Bubble Sort',
              description: 'Viết hàm bubble_sort(arr) sắp xếp mảng tăng dần và in kết quả.',
              difficulty: 'medium',
              language: 'python',
              starter_code: 'def bubble_sort(arr):\n    # Viết code ở đây\n    pass\n\nprint(bubble_sort([5, 3, 8, 1, 2]))',
              solution_code: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nprint(bubble_sort([5, 3, 8, 1, 2]))',
              hints: ['Dùng 2 vòng for lồng nhau', 'So sánh arr[j] với arr[j+1]', 'Đổi chỗ bằng: a, b = b, a'],
              xp_reward: 40,
              test_cases: [
                { input: '[5, 3, 8, 1, 2]', expected_output: '[1, 2, 3, 5, 8]', is_hidden: false },
                { input: '[1, 2, 3]', expected_output: '[1, 2, 3]', is_hidden: true }
              ]
            }
          ]
        }
      }
    ]
  },

  {
    id: 'F',
    order_index: 6,
    title: 'Hướng nghiệp với Tin học',
    description: 'Các ngành nghề liên quan đến CNTT, kỹ năng số cần thiết',
    icon: '🎯',
    color: '#EC4899',
    exam_weight: 1,
    outcomes: [
      'Liệt kê các nhóm ngành nghề CNTT',
      'Xác định kỹ năng số cần thiết cho từng ngành',
      'Lập kế hoạch phát triển nghề nghiệp ICT'
    ],
    lessons: [
      {
        id: 'F-1',
        module_id: 'F',
        title: 'Các ngành nghề trong lĩnh vực CNTT',
        slug: 'nganh-nghe-cntt',
        description: 'Lập trình viên, quản trị mạng, thiết kế web, data analyst, AI engineer...',
        difficulty: 'easy',
        estimated_minutes: 15,
        order_index: 1,
        xp_reward: 30,
        is_published: true,
        content: {
          objectives: [
            'Kể tên các nhóm ngành nghề CNTT phổ biến',
            'Mô tả công việc của từng nhóm',
            'Biết yêu cầu kỹ năng cơ bản'
          ],
          theory:
            "## Các nhóm ngành nghề CNTT\n\n" +
            "### 1. Phát triển phần mềm\n" +
            "- Lập trình viên (Developer)\n" +
            "- Kỹ sư phần mềm (Software Engineer)\n" +
            "- Kiểm thử phần mềm (QA/Tester)\n\n" +
            "### 2. Quản trị hệ thống & Mạng\n" +
            "- Quản trị mạng (Network Admin)\n" +
            "- Quản trị hệ thống (System Admin)\n" +
            "- Chuyên gia an ninh mạng (Cybersecurity)\n\n" +
            "### 3. Dữ liệu & AI\n" +
            "- Data Analyst (Phân tích dữ liệu)\n" +
            "- Data Scientist (Khoa học dữ liệu)\n" +
            "- AI/ML Engineer\n\n" +
            "### 4. Thiết kế & Đa phương tiện\n" +
            "- UX/UI Designer\n" +
            "- Web Designer\n" +
            "- Game Designer\n\n" +
            "### 5. Quản lý & Kinh doanh CNTT\n" +
            "- Project Manager\n" +
            "- Business Analyst\n" +
            "- IT Consultant",
          examples: [],
          quiz: [
            { id: 'qF-1-1', question: 'QA/Tester có nhiệm vụ chính là gì?', options: ['Viết code ứng dụng', 'Kiểm thử phần mềm, tìm lỗi', 'Thiết kế giao diện', 'Quản trị mạng'], correct_index: 1, explanation: 'QA (Quality Assurance) / Tester kiểm tra phần mềm để phát hiện lỗi trước khi ra mắt.', topic_code: 'F' },
            { id: 'qF-1-2', question: 'Data Scientist cần kỹ năng gì NHIỀU NHẤT?', options: ['Thiết kế đồ hoạ', 'Phân tích dữ liệu, thống kê, Machine Learning', 'Quản trị mạng', 'Viết tài liệu'], correct_index: 1, explanation: 'Data Scientist kết hợp thống kê + lập trình + kiến thức chuyên ngành để rút ra tri thức từ dữ liệu.', topic_code: 'F' }
          ],
          exercises: []
        }
      },
      {
        id: 'F-2',
        module_id: 'F',
        title: 'Kỹ năng số trong thời đại 4.0',
        slug: 'ky-nang-so',
        description: 'Digital literacy, kỹ năng cần thiết cho mọi ngành nghề',
        difficulty: 'easy',
        estimated_minutes: 15,
        order_index: 2,
        xp_reward: 30,
        is_published: true,
        content: {
          objectives: [
            'Hiểu khái niệm năng lực số (digital literacy)',
            'Liệt kê các kỹ năng số cơ bản mọi người cần có',
            'Lập kế hoạch tự học và phát triển kỹ năng số'
          ],
          theory:
            "## Kỹ năng số (Digital Literacy)\n\n" +
            "Là khả năng sử dụng công nghệ số một cách hiệu quả, an toàn và có trách nhiệm.\n\n" +
            "### 5 nhóm kỹ năng số cơ bản\n\n" +
            "1. **Xử lý thông tin**: Tìm kiếm, đánh giá, lưu trữ thông tin\n" +
            "2. **Giao tiếp số**: Email, mạng xã hội, làm việc nhóm online\n" +
            "3. **Sáng tạo nội dung**: Soạn thảo, trình bày, lập trình cơ bản\n" +
            "4. **An toàn số**: Bảo vệ thiết bị, dữ liệu, danh tính\n" +
            "5. **Giải quyết vấn đề**: Dùng công nghệ để giải quyết nhu cầu\n\n" +
            "### Kỹ năng hữu ích cho học sinh lớp 12\n" +
            "- Sử dụng thành thạo bộ công cụ văn phòng (Word, Excel, PowerPoint)\n" +
            "- Quản lý email chuyên nghiệp\n" +
            "- Lập trình cơ bản (Python)\n" +
            "- Sử dụng công cụ AI hỗ trợ học tập (có trách nhiệm)\n" +
            "- Tư duy logic và phân tích dữ liệu",
          examples: [],
          quiz: [
            { id: 'qF-2-1', question: 'Digital Literacy là gì?', options: ['Biết đọc sách điện tử', 'Khả năng sử dụng công nghệ số hiệu quả, an toàn và có trách nhiệm', 'Biết sửa máy tính', 'Có nhiều tài khoản mạng xã hội'], correct_index: 1, explanation: 'Digital Literacy = năng lực số — bao gồm cả kỹ năng sử dụng VÀ thái độ có trách nhiệm.', topic_code: 'F' },
            { id: 'qF-2-2', question: 'Nhóm kỹ năng "An toàn số" bao gồm?', options: ['Soạn thảo văn bản', 'Bảo vệ thiết bị, dữ liệu và danh tính số', 'Thiết kế website', 'Chơi game online'], correct_index: 1, explanation: 'An toàn số = bảo vệ dữ liệu cá nhân, mật khẩu, thiết bị khỏi malware và lừa đảo.', topic_code: 'F' }
          ],
          exercises: []
        }
      }
    ]
  },

  {
    id: 'G_CS',
    order_index: 7,
    title: 'Định hướng Khoa học máy tính',
    description: 'Thiết kế web (HTML/CSS/JS), giới thiệu Machine Learning, dự án thực hành',
    icon: '🚀',
    color: '#6366F1',
    exam_weight: 4,
    outcomes: [
      'Tạo trang web cơ bản với HTML, CSS, JavaScript',
      'Hiểu cấu trúc trang HTML, CSS selector, JS event',
      'Biết sơ lược về Machine Learning và ứng dụng'
    ],
    lessons: [
      {
        id: 'G_CS-1',
        module_id: 'G_CS',
        title: 'HTML — Cấu trúc trang web',
        slug: 'html-cau-truc-trang-web',
        description: 'Thẻ HTML cơ bản, headings, paragraphs, links, images, lists, tables',
        difficulty: 'easy',
        estimated_minutes: 30,
        order_index: 1,
        xp_reward: 70,
        is_published: true,
        content: {
          objectives: [
            'Hiểu HTML là gì và vai trò trong trang web',
            'Sử dụng các thẻ HTML cơ bản',
            'Tạo được trang web đơn giản'
          ],
          theory:
            "## HTML là gì?\n\n" +
            "**HTML** (HyperText Markup Language) là ngôn ngữ đánh dấu dùng để tạo **cấu trúc** cho trang web.\n\n" +
            "### Cấu trúc file HTML\n\n" +
            "```html\n" +
            "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "    <title>Tiêu đề trang</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "    <h1>Xin chào!</h1>\n" +
            "    <p>Đây là đoạn văn.</p>\n" +
            "</body>\n" +
            "</html>\n" +
            "```\n\n" +
            "### Các thẻ cơ bản\n\n" +
            "| Thẻ | Ý nghĩa |\n" +
            "|---|---|\n" +
            "| `<h1>`..`<h6>` | Tiêu đề (heading) |\n" +
            "| `<p>` | Đoạn văn (paragraph) |\n" +
            "| `<a href=\"...\">` | Liên kết (link) |\n" +
            "| `<img src=\"...\">` | Hình ảnh |\n" +
            "| `<ul>`, `<ol>`, `<li>` | Danh sách |\n" +
            "| `<table>`, `<tr>`, `<td>` | Bảng |\n" +
            "| `<div>` | Khối chứa (block) |\n" +
            "| `<span>` | Nội tuyến (inline) |",
          examples: [
            {
              title: 'Trang HTML đầu tiên',
              code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Trang của tôi</title>\n</head>\n<body>\n    <h1>Xin chào lớp 12!</h1>\n    <p>Đây là trang web đầu tiên của em.</p>\n    <a href="https://google.com">Tìm kiếm Google</a>\n    <img src="anh.jpg" alt="Ảnh minh hoạ">\n</body>\n</html>',
              explanation: 'DOCTYPE khai báo HTML5. head chứa metadata. body chứa nội dung hiển thị. Mỗi thẻ có thẻ mở và thẻ đóng.',
              output: '(Trang web với tiêu đề, đoạn văn, link và ảnh)'
            }
          ],
          quiz: [
            { id: 'qG-1-1', question: 'HTML là viết tắt của?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct_index: 0, explanation: 'HTML = HyperText Markup Language — ngôn ngữ đánh dấu siêu văn bản.', topic_code: 'G_CS' },
            { id: 'qG-1-2', question: 'Thẻ nào dùng để tạo liên kết (link)?', options: ['<link>', '<a>', '<href>', '<url>'], correct_index: 1, explanation: 'Thẻ <a href="URL">text</a> tạo hyperlink. <link> dùng liên kết CSS trong <head>.', topic_code: 'G_CS' },
            { id: 'qG-1-3', question: 'Nội dung hiển thị trên trang web nằm trong thẻ nào?', options: ['<head>', '<body>', '<title>', '<meta>'], correct_index: 1, explanation: '<body> chứa toàn bộ nội dung hiển thị cho người dùng. <head> chứa metadata.', topic_code: 'G_CS' },
            { id: 'qG-1-4', question: 'Thẻ <img> có cần thẻ đóng không?', options: ['Có, phải viết </img>', 'Không, <img> là thẻ tự đóng', 'Tuỳ trình duyệt', 'Chỉ khi có alt'], correct_index: 1, explanation: '<img> là void element (thẻ rỗng), tự đóng, không cần </img>.', topic_code: 'G_CS' }
          ],
          exercises: []
        }
      },
      {
        id: 'G_CS-2',
        module_id: 'G_CS',
        title: 'CSS — Trang trí trang web',
        slug: 'css-trang-tri-trang-web',
        description: 'CSS selector, properties cơ bản, box model, layout',
        difficulty: 'medium',
        estimated_minutes: 30,
        order_index: 2,
        xp_reward: 70,
        is_published: true,
        content: {
          objectives: [
            'Hiểu CSS dùng để làm gì',
            'Viết CSS với selector, property, value',
            'Áp dụng box model và một số layout cơ bản'
          ],
          theory:
            "## CSS là gì?\n\n" +
            "**CSS** (Cascading Style Sheets) dùng để **trang trí** (màu sắc, font, kích thước, bố cục) cho HTML.\n\n" +
            "### Cú pháp CSS\n\n" +
            "```css\n" +
            "selector {\n" +
            "    property: value;\n" +
            "}\n" +
            "```\n\n" +
            "### Các selector cơ bản\n\n" +
            "| Selector | Ý nghĩa | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| `tag` | Chọn theo thẻ | `h1 { color: red; }` |\n" +
            "| `.class` | Chọn theo class | `.highlight { ... }` |\n" +
            "| `#id` | Chọn theo id | `#header { ... }` |\n\n" +
            "### Box Model\n\n" +
            "Mỗi phần tử HTML là 1 \"hộp\" gồm:\n" +
            "- **Content**: Nội dung\n" +
            "- **Padding**: Khoảng đệm (trong)\n" +
            "- **Border**: Đường viền\n" +
            "- **Margin**: Khoảng cách (ngoài)\n\n" +
            "### Một số property phổ biến\n" +
            "```css\n" +
            "color: blue;            /* Màu chữ */\n" +
            "background-color: #f0f; /* Màu nền */\n" +
            "font-size: 16px;        /* Cỡ chữ */\n" +
            "margin: 10px;           /* Lề ngoài */\n" +
            "padding: 10px;          /* Đệm trong */\n" +
            "border: 1px solid #000; /* Viền */\n" +
            "```",
          examples: [
            {
              title: 'CSS cơ bản cho trang web',
              code: '<style>\n  body {\n    font-family: Arial, sans-serif;\n    background-color: #f5f5f5;\n  }\n  h1 {\n    color: #2563eb;\n    text-align: center;\n  }\n  .card {\n    background: white;\n    padding: 20px;\n    margin: 10px;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  }\n</style>',
              explanation: 'body thay đổi font và nền. h1 đổi màu chữ. .card tạo thẻ có shadow.',
              output: '(Trang web với nền xám, tiêu đề xanh, thẻ card trắng có bóng đổ)'
            }
          ],
          quiz: [
            { id: 'qG-2-1', question: 'CSS dùng để làm gì?', options: ['Tạo cấu trúc trang', 'Trang trí giao diện (màu, font, bố cục)', 'Xử lý logic', 'Lưu dữ liệu'], correct_index: 1, explanation: 'CSS = Cascading Style Sheets — chịu trách nhiệm về giao diện (presentation) của trang web.', topic_code: 'G_CS' },
            { id: 'qG-2-2', question: 'Selector .highlight chọn phần tử nào?', options: ['Thẻ <highlight>', 'Phần tử có class="highlight"', 'Phần tử có id="highlight"', 'Tất cả phần tử'], correct_index: 1, explanation: 'Dấu chấm (.) trước tên = selector theo class. Dấu # = selector theo id.', topic_code: 'G_CS' },
            { id: 'qG-2-3', question: 'Box Model gồm những thành phần nào (từ trong ra ngoài)?', options: ['Margin → Border → Padding → Content', 'Content → Padding → Border → Margin', 'Content → Border → Padding → Margin', 'Padding → Content → Border → Margin'], correct_index: 1, explanation: 'Từ trong ra ngoài: Content → Padding → Border → Margin.', topic_code: 'G_CS' }
          ],
          exercises: []
        }
      },
      {
        id: 'G_CS-3',
        module_id: 'G_CS',
        title: 'JavaScript — Tương tác trang web',
        slug: 'javascript-tuong-tac',
        description: 'Biến, hàm, sự kiện (event), DOM manipulation cơ bản',
        difficulty: 'medium',
        estimated_minutes: 35,
        order_index: 3,
        xp_reward: 80,
        is_published: true,
        content: {
          objectives: [
            'Hiểu vai trò của JavaScript trong trang web',
            'Khai báo biến, viết hàm cơ bản',
            'Bắt sự kiện (click, submit) và thao tác DOM'
          ],
          theory:
            "## JavaScript là gì?\n\n" +
            "**JavaScript** là ngôn ngữ lập trình chạy trên trình duyệt, làm trang web **tương tác** (phản hồi người dùng).\n\n" +
            "### 3 trụ cột web: HTML + CSS + JS\n" +
            "- HTML = cấu trúc (xương)\n" +
            "- CSS = giao diện (da)\n" +
            "- JS = hành vi (não)\n\n" +
            "### Cú pháp cơ bản\n\n" +
            "```javascript\n" +
            "// Khai báo biến\n" +
            "let ten = \"An\";\n" +
            "const tuoi = 18;\n\n" +
            "// Hàm\n" +
            "function xinChao(name) {\n" +
            "    return \"Xin chào \" + name;\n" +
            "}\n\n" +
            "// Sự kiện\n" +
            "document.getElementById(\"btn\").addEventListener(\"click\", function() {\n" +
            "    alert(xinChao(ten));\n" +
            "});\n" +
            "```\n\n" +
            "### DOM (Document Object Model)\n\n" +
            "DOM là cách JS \"nhìn\" trang HTML như cây đối tượng:\n" +
            "- `document.getElementById(\"id\")` — lấy phần tử theo id\n" +
            "- `element.textContent = \"...\"` — đổi nội dung\n" +
            "- `element.style.color = \"red\"` — đổi style",
          examples: [
            {
              title: 'Nút bấm đổi nội dung',
              code: '<button id="btn">Bấm tôi</button>\n<p id="output">Chưa bấm</p>\n\n<script>\n  let count = 0;\n  document.getElementById("btn").addEventListener("click", function() {\n    count++;\n    document.getElementById("output").textContent = "Bạn đã bấm " + count + " lần";\n  });\n</script>',
              explanation: 'addEventListener lắng nghe sự kiện click. Khi bấm, cập nhật nội dung thẻ <p> bằng textContent.',
              output: '(Mỗi lần bấm nút, số đếm tăng lên)'
            }
          ],
          quiz: [
            { id: 'qG-3-1', question: 'JavaScript chạy ở đâu?', options: ['Chỉ trên server', 'Trên trình duyệt (browser) của người dùng', 'Chỉ trong IDE', 'Trên máy in'], correct_index: 1, explanation: 'JavaScript chạy phía client (trình duyệt). Cũng chạy được server-side nhờ Node.js nhưng mặc định là browser.', topic_code: 'G_CS' },
            { id: 'qG-3-2', question: 'Lệnh nào lấy phần tử HTML có id="title"?', options: ['getElement("title")', 'document.getElementById("title")', 'findById("title")', 'select("#title")'], correct_index: 1, explanation: 'document.getElementById("id") là phương thức DOM chuẩn để lấy phần tử theo id.', topic_code: 'G_CS' },
            { id: 'qG-3-3', question: 'let và const khác nhau ở điểm nào?', options: ['let nhanh hơn const', 'const không thể gán lại giá trị, let có thể', 'const chỉ dùng cho số', 'Không khác nhau'], correct_index: 1, explanation: 'const = hằng (không gán lại được). let = biến (có thể gán lại giá trị mới).', topic_code: 'G_CS' },
            { id: 'qG-3-4', question: 'addEventListener("click", ...) dùng để?', options: ['Tạo nút mới', 'Lắng nghe sự kiện click trên phần tử', 'Xoá phần tử', 'Đổi màu nền'], correct_index: 1, explanation: 'addEventListener gắn một hàm xử lý (handler) chạy khi sự kiện xảy ra (ở đây là click).', topic_code: 'G_CS' }
          ],
          exercises: []
        }
      },
      {
        id: 'G_CS-4',
        module_id: 'G_CS',
        title: 'Giới thiệu Machine Learning',
        slug: 'gioi-thieu-machine-learning',
        description: 'Khái niệm ML, quy trình xây dựng mô hình, ví dụ phân loại đơn giản',
        difficulty: 'medium',
        estimated_minutes: 25,
        order_index: 4,
        xp_reward: 70,
        is_published: true,
        content: {
          objectives: [
            'Hiểu quy trình xây dựng mô hình Machine Learning',
            'Biết 3 loại học máy: Supervised, Unsupervised, Reinforcement',
            'Nêu ví dụ ứng dụng ML trong thực tế'
          ],
          theory:
            "## Machine Learning (Học máy)\n\n" +
            "### Quy trình xây dựng mô hình ML\n\n" +
            "1. **Thu thập dữ liệu** (data collection)\n" +
            "2. **Tiền xử lý** (preprocessing): làm sạch, chuẩn hoá\n" +
            "3. **Chia dữ liệu**: training set (80%) + test set (20%)\n" +
            "4. **Huấn luyện** (training): mô hình học từ training set\n" +
            "5. **Đánh giá** (evaluation): test trên test set\n" +
            "6. **Triển khai** (deployment): đưa vào sử dụng\n\n" +
            "### 3 loại Machine Learning\n\n" +
            "| Loại | Đặc điểm | Ví dụ |\n" +
            "|---|---|---|\n" +
            "| **Supervised** (Có giám sát) | Có nhãn (label) | Phân loại email spam |\n" +
            "| **Unsupervised** (Không giám sát) | Không có nhãn | Phân nhóm khách hàng |\n" +
            "| **Reinforcement** (Tăng cường) | Học qua thưởng/phạt | AlphaGo chơi cờ |\n\n" +
            "### Thuật toán phổ biến (Supervised)\n" +
            "- **KNN** (K-Nearest Neighbors): Phân loại theo k láng giềng gần nhất\n" +
            "- **Decision Tree**: Cây quyết định\n" +
            "- **Linear Regression**: Hồi quy tuyến tính (dự đoán giá trị liên tục)",
          examples: [
            {
              title: 'Ý tưởng KNN bằng Python (minh hoạ)',
              code: '# Minh hoạ KNN đơn giản (không dùng thư viện)\n# Dữ liệu: (chiều cao, cân nặng) → "nam" hoặc "nữ"\ndata = [(170, 65, "nam"), (160, 50, "nữ"), (180, 75, "nam"), (155, 45, "nữ")]\n\ndef khoang_cach(a, b):\n    return ((a[0]-b[0])**2 + (a[1]-b[1])**2) ** 0.5\n\ndef knn(moi, k=3):\n    ds = sorted(data, key=lambda d: khoang_cach(moi, d))\n    labels = [d[2] for d in ds[:k]]\n    return max(set(labels), key=labels.count)\n\nprint(knn((165, 55)))  # Dự đoán giới tính',
              explanation: 'KNN tính khoảng cách tới tất cả điểm, chọn k điểm gần nhất, "bỏ phiếu" nhãn phổ biến nhất.',
              output: 'nữ'
            }
          ],
          quiz: [
            { id: 'qG-4-1', question: 'Supervised Learning cần gì mà Unsupervised không cần?', options: ['Máy tính', 'Dữ liệu có nhãn (label)', 'Internet', 'GPU'], correct_index: 1, explanation: 'Supervised Learning (Học có giám sát) cần dữ liệu đã được gán nhãn (VD: email "spam"/"không spam").', topic_code: 'G_CS' },
            { id: 'qG-4-2', question: 'Bước nào KHÔNG thuộc quy trình ML?', options: ['Thu thập dữ liệu', 'Huấn luyện mô hình', 'Thiết kế giao diện web', 'Đánh giá mô hình'], correct_index: 2, explanation: 'Thiết kế giao diện web là lĩnh vực khác. Quy trình ML gồm: data → tiền xử lý → training → evaluation → deploy.', topic_code: 'G_CS' },
            { id: 'qG-4-3', question: 'KNN phân loại dựa trên nguyên lý nào?', options: ['Cây quyết định', 'Khoảng cách tới k điểm gần nhất', 'Xác suất', 'Mạng nơ-ron'], correct_index: 1, explanation: 'KNN tìm k điểm dữ liệu gần nhất (theo khoảng cách), rồi chọn nhãn phổ biến nhất trong k điểm đó.', topic_code: 'G_CS' }
          ],
          exercises: []
        }
      }
    ]
  },

  {
    id: 'G_TUD',
    order_index: 8,
    title: 'Định hướng Tin học ứng dụng',
    description: 'Sử dụng CMS, dịch vụ web trực tuyến để tạo website, blog',
    icon: '🌍',
    color: '#F97316',
    exam_weight: 2,
    outcomes: [
      'Sử dụng CMS (WordPress/Google Sites) để tạo website',
      'Biết cách đăng ký tên miền, hosting',
      'Quản lý nội dung website cơ bản'
    ],
    lessons: [
      {
        id: 'G_TUD-1',
        module_id: 'G_TUD',
        title: 'Tạo website bằng CMS',
        slug: 'tao-website-bang-cms',
        description: 'Sử dụng Google Sites hoặc WordPress để tạo website không cần code',
        difficulty: 'easy',
        estimated_minutes: 20,
        order_index: 1,
        xp_reward: 50,
        is_published: true,
        content: {
          objectives: [
            'Hiểu CMS là gì và tại sao nên dùng',
            'Tạo được website đơn giản bằng Google Sites',
            'Biết các bước cơ bản quản lý nội dung'
          ],
          theory:
            "## CMS (Content Management System)\n\n" +
            "**CMS** là hệ thống quản lý nội dung — cho phép tạo và quản lý website **mà không cần viết code**.\n\n" +
            "### CMS phổ biến\n\n" +
            "| CMS | Đặc điểm | Phù hợp |\n" +
            "|---|---|---|\n" +
            "| **WordPress** | Phổ biến nhất, nhiều plugin | Blog, website doanh nghiệp |\n" +
            "| **Google Sites** | Miễn phí, rất đơn giản | Trang cá nhân, dự án trường |\n" +
            "| **Wix** | Kéo thả, đẹp | Portfolio, landing page |\n\n" +
            "### Tạo website với Google Sites\n\n" +
            "1. Truy cập sites.google.com\n" +
            "2. Chọn mẫu hoặc tạo trang trống\n" +
            "3. Thêm nội dung: tiêu đề, văn bản, ảnh, video\n" +
            "4. Tuỳ chỉnh: đổi theme, màu sắc, font\n" +
            "5. Xuất bản (Publish) → có link chia sẻ\n\n" +
            "### Tên miền & Hosting\n" +
            "- **Tên miền** (domain): địa chỉ website (VD: `truong12a.edu.vn`)\n" +
            "- **Hosting**: máy chủ lưu trữ file website\n" +
            "- Google Sites cung cấp cả 2 miễn phí (dạng subdomain)",
          examples: [],
          quiz: [
            { id: 'qG_TUD-1-1', question: 'CMS là viết tắt của?', options: ['Computer Management System', 'Content Management System', 'Code Making Software', 'Creative Media Studio'], correct_index: 1, explanation: 'CMS = Content Management System — hệ thống quản lý nội dung.', topic_code: 'G_TUD' },
            { id: 'qG_TUD-1-2', question: 'Ưu điểm lớn nhất của CMS là gì?', options: ['Chạy rất nhanh', 'Tạo website mà không cần viết code', 'Miễn phí hoàn toàn', 'Bảo mật tuyệt đối'], correct_index: 1, explanation: 'CMS cho phép người không biết lập trình cũng có thể tạo và quản lý website thông qua giao diện trực quan.', topic_code: 'G_TUD' },
            { id: 'qG_TUD-1-3', question: 'Hosting là gì?', options: ['Tên miền website', 'Máy chủ lưu trữ file website', 'Phần mềm thiết kế', 'Trình duyệt web'], correct_index: 1, explanation: 'Hosting (web hosting) là dịch vụ cho thuê không gian trên máy chủ để lưu trữ và phục vụ website.', topic_code: 'G_TUD' }
          ],
          exercises: []
        }
      },
      {
        id: 'G_TUD-2',
        module_id: 'G_TUD',
        title: 'Dịch vụ trực tuyến hỗ trợ công việc',
        slug: 'dich-vu-truc-tuyen',
        description: 'Google Workspace, Microsoft 365, Canva, công cụ cộng tác',
        difficulty: 'easy',
        estimated_minutes: 15,
        order_index: 2,
        xp_reward: 40,
        is_published: true,
        content: {
          objectives: [
            'Biết các công cụ cộng tác trực tuyến phổ biến',
            'Sử dụng Google Docs/Sheets/Slides để làm việc nhóm',
            'Hiểu lợi ích của điện toán đám mây trong học tập và công việc'
          ],
          theory:
            "## Dịch vụ trực tuyến\n\n" +
            "### Google Workspace (miễn phí cho cá nhân)\n" +
            "- **Google Docs**: Soạn thảo văn bản (thay Word)\n" +
            "- **Google Sheets**: Bảng tính (thay Excel)\n" +
            "- **Google Slides**: Trình chiếu (thay PowerPoint)\n" +
            "- **Google Drive**: Lưu trữ đám mây 15GB free\n" +
            "- **Google Meet**: Họp trực tuyến\n\n" +
            "### Microsoft 365 (phiên bản web miễn phí)\n" +
            "- Word, Excel, PowerPoint online\n" +
            "- OneDrive: Lưu trữ 5GB free\n" +
            "- Teams: Làm việc nhóm\n\n" +
            "### Công cụ khác\n" +
            "- **Canva**: Thiết kế poster, infographic không cần biết Photoshop\n" +
            "- **Notion**: Ghi chú, quản lý dự án\n" +
            "- **Trello**: Bảng Kanban quản lý công việc\n\n" +
            "### Ưu điểm làm việc trực tuyến\n" +
            "1. Cộng tác thời gian thực (nhiều người cùng sửa)\n" +
            "2. Truy cập mọi nơi có Internet\n" +
            "3. Tự động lưu, không sợ mất file\n" +
            "4. Dễ chia sẻ qua link",
          examples: [],
          quiz: [
            { id: 'qG_TUD-2-1', question: 'Google Sheets tương đương với phần mềm nào?', options: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Microsoft Access'], correct_index: 1, explanation: 'Google Sheets = bảng tính trực tuyến, tương đương Microsoft Excel.', topic_code: 'G_TUD' },
            { id: 'qG_TUD-2-2', question: 'Ưu điểm nào KHÔNG phải của công cụ cộng tác trực tuyến?', options: ['Nhiều người cùng sửa', 'Chạy được khi không có Internet', 'Tự động lưu', 'Truy cập mọi nơi'], correct_index: 1, explanation: 'Công cụ trực tuyến CẦN Internet để hoạt động (một số có chế độ offline hạn chế).', topic_code: 'G_TUD' }
          ],
          exercises: []
        }
      }
    ]
  }
];
