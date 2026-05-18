/**
 * AI Tutor — Rule-based tiếng Việt theo SGK Cánh Diều.
 *
 * Khi chưa có API key LLM, tutor hoạt động bằng cách:
 * 1. Phân tích câu hỏi → tìm từ khoá → match chủ đề.
 * 2. Trả về đoạn lý thuyết liên quan + gợi ý bài học.
 * 3. Nếu không match → trả câu mặc định mời chọn chủ đề.
 */

import { topics } from '@/data/canhdieu';
import { TopicCode } from '@/types';

export interface TutorResponse {
  content: string;
  topic_code?: TopicCode;
  related_lesson_slug?: string;
}

// Từ khoá → chủ đề
const KEYWORD_MAP: { keywords: string[]; topic: TopicCode; lessonIndex?: number }[] = [
  // Chủ đề A
  { keywords: ['thế hệ máy tính', 'lịch sử máy tính', 'ENIAC', 'transistor', 'VLSI', 'IC', 'mạch tích hợp'], topic: 'A', lessonIndex: 0 },
  { keywords: ['AI', 'trí tuệ nhân tạo', 'machine learning', 'học máy', 'deep learning', 'học sâu', 'mạng nơ-ron'], topic: 'A', lessonIndex: 1 },
  { keywords: ['IoT', 'internet vạn vật', 'big data', 'dữ liệu lớn', 'cloud', 'đám mây', 'SaaS', 'IaaS', 'PaaS'], topic: 'A', lessonIndex: 2 },

  // Chủ đề B
  { keywords: ['mạng LAN', 'mạng WAN', 'mạng MAN', 'router', 'switch', 'hub', 'modem', 'access point'], topic: 'B', lessonIndex: 0 },
  { keywords: ['IP', 'IPv4', 'địa chỉ IP', 'DNS', 'tên miền', 'lớp mạng', 'lớp A', 'lớp B', 'lớp C', 'localhost', '127.0.0.1'], topic: 'B', lessonIndex: 1 },
  { keywords: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'POP3', 'IMAP', 'email', 'giao thức', 'web', 'port', 'cổng'], topic: 'B', lessonIndex: 2 },

  // Chủ đề C
  { keywords: ['virus', 'worm', 'trojan', 'ransomware', 'phishing', 'malware', 'an toàn', 'bảo mật', '2FA', 'mật khẩu'], topic: 'C', lessonIndex: 0 },
  { keywords: ['bản quyền', 'copyright', 'creative commons', 'CC', 'nguồn mở', 'open source', 'crack', 'phần mềm'], topic: 'C', lessonIndex: 1 },
  { keywords: ['cyberbullying', 'bắt nạt', 'netiquette', 'ứng xử', 'thông tin cá nhân', 'quyền riêng tư'], topic: 'C', lessonIndex: 2 },

  // Chủ đề D — SQL
  { keywords: ['CSDL', 'cơ sở dữ liệu', 'database', 'bảng', 'table', 'khoá chính', 'primary key', 'khoá ngoại', 'foreign key', 'quan hệ'], topic: 'D', lessonIndex: 0 },
  { keywords: ['SELECT', 'WHERE', 'ORDER BY', 'LIKE', 'BETWEEN', 'IN', 'truy vấn', 'lọc'], topic: 'D', lessonIndex: 1 },
  { keywords: ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'GROUP BY', 'HAVING', 'hàm gộp', 'nhóm'], topic: 'D', lessonIndex: 2 },
  { keywords: ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'kết nối bảng', 'ON'], topic: 'D', lessonIndex: 3 },

  // Chủ đề E — Python & thuật toán
  { keywords: ['thuật toán', 'sơ đồ khối', 'mã giả', 'pseudocode', 'flowchart', 'bài toán'], topic: 'E', lessonIndex: 0 },
  { keywords: ['O(n)', 'O(n²)', 'O(log n)', 'big-O', 'độ phức tạp', 'complexity'], topic: 'E', lessonIndex: 1 },
  { keywords: ['bubble sort', 'selection sort', 'insertion sort', 'sắp xếp', 'nổi bọt', 'chọn', 'chèn'], topic: 'E', lessonIndex: 2 },
  { keywords: ['tìm kiếm nhị phân', 'binary search', 'tìm kiếm tuyến tính', 'đệ quy', 'recursion', 'giai thừa'], topic: 'E' },
  { keywords: ['python', 'biến', 'vòng lặp', 'for', 'while', 'if', 'else', 'hàm', 'def', 'list', 'dict', 'tuple'], topic: 'E' },

  // Chủ đề F
  { keywords: ['nghề nghiệp', 'CNTT', 'lập trình viên', 'data scientist', 'QA', 'tester', 'kỹ năng số', 'digital literacy'], topic: 'F', lessonIndex: 0 },

  // Chủ đề G_CS
  { keywords: ['HTML', 'thẻ', 'tag', '<a>', '<img>', '<h1>', 'trang web', 'cấu trúc'], topic: 'G_CS', lessonIndex: 0 },
  { keywords: ['CSS', 'selector', 'class', 'box model', 'padding', 'margin', 'border', 'style'], topic: 'G_CS', lessonIndex: 1 },
  { keywords: ['JavaScript', 'JS', 'DOM', 'getElementById', 'addEventListener', 'event', 'click', 'const', 'let'], topic: 'G_CS', lessonIndex: 2 },
  { keywords: ['KNN', 'supervised', 'unsupervised', 'reinforcement', 'training', 'model', 'mô hình'], topic: 'G_CS', lessonIndex: 3 },

  // Chủ đề G_TUD
  { keywords: ['CMS', 'WordPress', 'Google Sites', 'Wix', 'hosting', 'tên miền', 'domain'], topic: 'G_TUD', lessonIndex: 0 },
  { keywords: ['Google Docs', 'Google Sheets', 'Canva', 'Notion', 'Trello', 'Microsoft 365', 'cộng tác'], topic: 'G_TUD', lessonIndex: 1 },
];

/**
 * Tìm chủ đề phù hợp nhất từ câu hỏi.
 */
function findMatchingTopic(question: string): { topic: TopicCode; lessonIndex: number } | null {
  const q = question.toLowerCase();
  let bestMatch: { topic: TopicCode; lessonIndex: number; score: number } | null = null;

  for (const entry of KEYWORD_MAP) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length; // từ khoá dài → match tốt hơn
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { topic: entry.topic, lessonIndex: entry.lessonIndex ?? 0, score };
    }
  }

  return bestMatch ? { topic: bestMatch.topic, lessonIndex: bestMatch.lessonIndex } : null;
}

/**
 * Tạo câu trả lời từ nội dung bài học.
 */
export function generateTutorResponse(question: string): TutorResponse {
  const match = findMatchingTopic(question);

  if (!match) {
    return {
      content:
        '🤔 Mình chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:\n\n' +
        '• **Chủ đề A**: Máy tính, AI, IoT, Big Data\n' +
        '• **Chủ đề B**: Mạng, Internet, IP, DNS\n' +
        '• **Chủ đề C**: An toàn thông tin, bản quyền\n' +
        '• **Chủ đề D**: Cơ sở dữ liệu, SQL\n' +
        '• **Chủ đề E**: Python, thuật toán, sắp xếp\n' +
        '• **Chủ đề G**: HTML/CSS/JS, Machine Learning\n\n' +
        'Ví dụ: "SQL SELECT là gì?", "Bubble Sort hoạt động thế nào?", "DNS dùng để làm gì?"',
    };
  }

  const topic = topics.find(t => t.id === match.topic);
  if (!topic) {
    return { content: 'Đã xảy ra lỗi. Vui lòng thử lại.' };
  }

  const lesson = topic.lessons[match.lessonIndex] || topic.lessons[0];
  if (!lesson) {
    return {
      content: `📚 Chủ đề **${topic.title}** đang được cập nhật. Hãy quay lại sau nhé!`,
      topic_code: match.topic,
    };
  }

  // Trích xuất 1 phần lý thuyết (max 500 ký tự đầu)
  const theoryPreview = lesson.content.theory.slice(0, 600).replace(/```[\s\S]*?```/g, '').trim();
  const truncated = theoryPreview.length >= 590 ? theoryPreview + '...' : theoryPreview;

  // Tạo câu trả lời
  let response = `📖 **${lesson.title}** (Chủ đề ${match.topic})\n\n`;
  response += truncated + '\n\n';

  // Gợi ý mở bài học
  response += `---\n👉 [Mở bài học đầy đủ](/lesson/${lesson.slug}) để xem thêm ví dụ và làm quiz.`;

  return {
    content: response,
    topic_code: match.topic,
    related_lesson_slug: lesson.slug,
  };
}

/**
 * Tạo gợi ý câu hỏi cho học sinh.
 */
export function getSuggestions(): string[] {
  return [
    'SQL SELECT dùng để làm gì?',
    'Bubble Sort hoạt động thế nào?',
    'DNS là gì?',
    'Ransomware là gì và cách phòng tránh?',
    'Big-O O(n²) nghĩa là gì?',
    'HTML khác CSS ở điểm nào?',
    'Machine Learning là gì?',
    'Khoá chính trong CSDL dùng để làm gì?',
  ];
}
