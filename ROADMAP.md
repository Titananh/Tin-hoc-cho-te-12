# ROADMAP & BLUEPRINT CHI TIẾT
## Dự án: Tin học cho Tẻ 12 — Luyện thi Tin học lớp 12 (SGK Cánh Diều — KHMT)

> **Mục tiêu:** Xây dựng nền tảng học tập & luyện thi Tin học 12 (định hướng Khoa học Máy tính) 
> theo SGK Cánh Diều, chương trình GDPT 2018, sẵn sàng giao cho học viên sử dụng.

---

## I. CẤU TRÚC NỘI DUNG THEO SGK TIN HỌC 12 — CÁNH DIỀU (KHMT)

### Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính (tiếp theo lớp 11)
| Bài | Tên bài | Nội dung chính |
|-----|---------|----------------|
| Bài 1 | Kiểu dữ liệu danh sách | List, truy cập, thao tác cơ bản |
| Bài 2 | Một số thuật toán sắp xếp | Sắp xếp chọn, sắp xếp chèn, sắp xếp nổi bọt |
| Bài 3 | Thuật toán tìm kiếm | Tìm kiếm tuần tự, tìm kiếm nhị phân |
| Bài 4 | Bài toán sắp xếp và tìm kiếm trong thực tế | Ứng dụng thực tiễn |
| Bài 5 | Kiểu dữ liệu từ điển | Dictionary, key-value, thao tác |
| Bài 6 | Kiểu dữ liệu tập hợp | Set, phép toán tập hợp |
| Bài 7 | Thực hành tổng hợp CTDL | Bài tập tổng hợp List, Dict, Set |

### Chủ đề 6: Mạng máy tính và Internet (nâng cao)
| Bài | Tên bài | Nội dung chính |
|-----|---------|----------------|
| Bài 8 | Giao thức mạng | TCP/IP, HTTP, DNS, mô hình OSI/TCP-IP |
| Bài 9 | An toàn thông tin trên Internet | Bảo mật, mã hóa, tường lửa |
| Bài 10 | Dịch vụ trên Internet | Web, Email, Cloud, API |
| Bài 11 | Thực hành: Tìm hiểu giao thức mạng | Thực hành với Wireshark/mô phỏng |

### Chủ đề 7: Đạo đức, pháp luật và văn hóa trong môi trường số
| Bài | Tên bài | Nội dung chính |
|-----|---------|----------------|
| Bài 12 | Quyền sở hữu trí tuệ trong CNTT | Bản quyền phần mềm, Creative Commons |
| Bài 13 | Ứng xử trên mạng xã hội | An toàn mạng xã hội, cyberbullying |
| Bài 14 | Luật An ninh mạng Việt Nam | Quy định pháp luật cơ bản |

### Chủ đề 8: Hướng nghiệp với Tin học
| Bài | Tên bài | Nội dung chính |
|-----|---------|----------------|
| Bài 15 | Các ngành nghề CNTT | Developer, Data, AI, Security, DevOps |
| Bài 16 | Tự học và phát triển kỹ năng CNTT | Lộ trình tự học, tài nguyên |
| Bài 17 | Dự án cuối khóa | Tổng hợp kiến thức, làm mini-project |

### Chuyên đề (nâng cao — cho HS chuyên/thi HSG)
| Bài | Tên bài | Nội dung chính |
|-----|---------|----------------|
| CĐ1 | Đệ quy và ứng dụng | Hàm đệ quy, bài toán Fibonacci, Hanoi |
| CĐ2 | Thuật toán trên đồ thị cơ bản | BFS, DFS (lý thuyết + minh họa) |
| CĐ3 | Lập trình hướng đối tượng | Class, Object, Kế thừa trong Python |
| CĐ4 | Xử lý file và ngoại lệ | Đọc/ghi file, try-except |

---

## II. ROADMAP PHÁT TRIỂN (4 PHASES)

### Phase 1: Nền tảng nội dung (Tuần 1-2)
```
┌─────────────────────────────────────────────────────┐
│  1. Viết lại toàn bộ data/content.ts               │
│     - 17 bài chính + 4 chuyên đề = 21 bài học     │
│     - Mỗi bài: lý thuyết + ví dụ + quiz + code    │
│  2. Tổ chức theo đúng thứ tự SGK                   │
│  3. Mỗi bài có: objectives, theory (markdown),     │
│     examples (code runnable), quiz (3-5 câu),       │
│     exercises (2-5 bài)                             │
└─────────────────────────────────────────────────────┘
```

### Phase 2: Code Runner thật (Tuần 2-3)
```
┌─────────────────────────────────────────────────────┐
│  1. Tích hợp Pyodide (Python in WebAssembly)        │
│  2. Cập nhật CodeEditor component                   │
│     - Chạy code Python thật, hiện output thật      │
│     - Support input() qua prompt/modal             │
│     - Hiển thị lỗi runtime rõ ràng                 │
│  3. Auto-check kết quả so với expected output       │
└─────────────────────────────────────────────────────┘
```

### Phase 3: Bài tập & Đề thi (Tuần 3-4)
```
┌─────────────────────────────────────────────────────┐
│  1. 100+ bài tập coding (dễ/trung bình/khó)        │
│     - Mỗi chủ đề: 15-25 bài                       │
│     - Có test cases tự động                         │
│  2. Hệ thống đề thi thử                            │
│     - 5 đề trắc nghiệm (40 câu/đề, 50 phút)      │
│     - 3 đề thực hành coding (5 bài/đề, 90 phút)   │
│     - Chấm điểm tự động                            │
│  3. Flashcards theo từng bài                        │
└─────────────────────────────────────────────────────┘
```

### Phase 4: Hoàn thiện & Polish (Tuần 4-5)
```
┌─────────────────────────────────────────────────────┐
│  1. Cập nhật Landing page                           │
│  2. Dark/Light mode hoàn chỉnh                     │
│  3. Progressive learning (mở khóa bài tiếp)        │
│  4. LocalStorage cho tiến độ (không cần backend)    │
│  5. SEO, accessibility                              │
│  6. Build production, test toàn bộ                  │
└─────────────────────────────────────────────────────┘
```

---

## III. BLUEPRINT KIẾN TRÚC KỸ THUẬT

### A. Data Model (TypeScript)

```typescript
// src/types/index.ts
interface Course {
  id: string;           // 'chu-de-5', 'chu-de-6', etc.
  title: string;        // 'Giải quyết vấn đề với máy tính'
  slug: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  is_published: boolean;
  modules: Module[];
}

interface Module {
  id: string;           // 'bai-1', 'bai-2', etc.
  course_id: string;
  title: string;        // 'Kiểu dữ liệu danh sách'
  slug: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_minutes: number;
  order_index: number;
  xp_reward: number;
  is_published: boolean;
  content: LessonContent;
}

interface LessonContent {
  objectives: string[];
  theory: string;        // Markdown
  examples: CodeExample[];
  quiz: QuizQuestion[];
  exercises: Exercise[];
}

interface CodeExample {
  title: string;
  code: string;          // Python code (runnable via Pyodide)
  explanation: string;
  output: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  starter_code: string;
  solution_code: string;
  hints: string[];
  test_cases: TestCase[];
}

interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

interface Exam {
  id: string;
  title: string;
  type: 'multiple_choice' | 'coding' | 'mixed';
  time_limit_minutes: number;
  passing_score: number;
  questions: ExamQuestion[];
}

interface ExamQuestion {
  id: string;
  type: 'single' | 'multiple' | 'coding' | 'fill_blank';
  question: string;
  options?: string[];
  correct_indexes?: number[];
  correct_answer?: string;
  explanation: string;
  points: number;
  code_template?: string;
  test_cases?: TestCase[];
}
```

### B. File Structure (Sau khi rebuild)

```
src/
├── app/
│   ├── page.tsx                    # Landing page (cập nhật)
│   ├── layout.tsx                  # Root layout
│   ├── learn/page.tsx              # Lộ trình học theo SGK
│   ├── lesson/[slug]/page.tsx      # Nội dung bài học
│   ├── practice/[id]/page.tsx      # Bài tập thực hành
│   ├── quiz/[id]/page.tsx          # Quiz sau bài học
│   ├── exam/page.tsx               # Danh sách đề thi thử  ← MỚI
│   ├── exam/[id]/page.tsx          # Làm đề thi             ← MỚI
│   ├── exam/[id]/result/page.tsx   # Kết quả đề thi        ← MỚI
│   ├── flashcards/page.tsx         # Flashcards
│   ├── dashboard/page.tsx          # Tiến độ học tập
│   ├── tutor/page.tsx              # AI Tutor
│   ├── search/page.tsx             # Tìm kiếm
│   ├── settings/page.tsx           # Cài đặt
│   └── api/
│       ├── ai/chat/route.ts        # AI chat (cải thiện)
│       └── ...
├── components/
│   ├── editor/
│   │   ├── CodeEditor.tsx          # Monaco + Pyodide runner
│   │   └── PythonRunner.tsx        # Pyodide integration    ← MỚI
│   ├── exam/
│   │   ├── ExamCard.tsx            # Card đề thi           ← MỚI
│   │   ├── ExamTimer.tsx           # Bộ đếm thời gian     ← MỚI
│   │   └── ExamResult.tsx          # Hiển thị kết quả     ← MỚI
│   ├── lesson/
│   │   ├── TheorySection.tsx       # Phần lý thuyết
│   │   ├── ExampleSection.tsx      # Phần ví dụ minh họa
│   │   └── QuizSection.tsx         # Quiz inline
│   └── ...
├── data/
│   ├── content.ts                  # Nội dung bài học (viết lại)
│   ├── exercises.ts                # 100+ bài tập          ← MỚI
│   ├── exams.ts                    # Đề thi thử           ← MỚI
│   └── flashcards.ts               # Flashcards            ← MỚI (tách riêng)
├── lib/
│   ├── pyodide.ts                  # Pyodide loader        ← MỚI
│   ├── progress.ts                 # LocalStorage progress ← MỚI
│   └── ...
├── hooks/
│   ├── usePyodide.ts               # Hook chạy Python      ← MỚI
│   ├── useProgress.ts              # Hook tiến độ          ← MỚI
│   └── ...
└── types/
    └── index.ts                    # Types (cập nhật)
```

### C. Pyodide Integration Blueprint

```
┌─────────────────────────────────────────────────┐
│  User viết code Python trong Monaco Editor       │
│                    ↓                             │
│  Click "Chạy" → gọi usePyodide hook            │
│                    ↓                             │
│  Pyodide (loaded from CDN, cached)              │
│  → executes Python in Web Worker                │
│  → captures stdout, stderr                      │
│                    ↓                             │
│  Hiển thị output/error trong Output panel        │
│                    ↓                             │
│  Nếu exercise: so sánh output vs expected       │
│  → Hiện kết quả PASS/FAIL cho mỗi test case    │
└─────────────────────────────────────────────────┘
```

### D. Progress System (LocalStorage)

```typescript
// Lưu trữ trong localStorage (không cần backend)
interface UserProgress {
  completed_lessons: string[];      // IDs bài đã hoàn thành
  completed_exercises: string[];    // IDs bài tập đã pass
  quiz_scores: Record<string, number>; // quiz_id → score
  exam_results: ExamResult[];       // Kết quả đề thi
  xp_total: number;
  current_streak: number;
  last_active_date: string;
  badges_earned: string[];
}
```

---

## IV. TIÊU CHÍ "SẴN SÀNG GIAO CHO HỌC VIÊN"

| # | Tiêu chí | Yêu cầu |
|---|----------|----------|
| 1 | Nội dung đúng SGK | 100% bài học theo mục lục Cánh Diều KHMT |
| 2 | Code chạy thật | Pyodide thực thi Python ngay trên browser |
| 3 | Bài tập đủ lượng | ≥ 100 bài, mỗi chủ đề 15-25 bài |
| 4 | Đề thi thử | ≥ 5 đề trắc nghiệm + 3 đề thực hành |
| 5 | Quiz mỗi bài | 3-5 câu quiz/bài, giải thích đáp án |
| 6 | Tiến độ lưu được | LocalStorage, không mất khi reload |
| 7 | UI chuyên nghiệp | Responsive, dark/light, animation |
| 8 | Build thành công | Zero errors, production-ready |
| 9 | Không cần backend | Hoạt động hoàn toàn client-side |
| 10 | Deploy được ngay | Vercel/Netlify 1-click deploy |

---

## V. TECH STACK CHÍNH THỨC

| Layer | Công nghệ | Phiên bản | Vai trò |
|-------|-----------|-----------|---------|
| Framework | Next.js | 16.x | App Router, SSG |
| UI | React | 19.x | Component-based UI |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Animation | Framer Motion | 12.x | Smooth transitions |
| Code Editor | Monaco Editor | 4.x | VS Code experience |
| Python Runtime | Pyodide | 0.26.x | Python in browser |
| Icons | Lucide React | 1.x | Consistent icons |

---

## VI. KẾ HOẠCH THỰC HIỆN (BẮT ĐẦU NGAY)

```
[Bước 1] ✅ Roadmap & Blueprint (file này)
[Bước 2] → Viết lại src/data/content.ts — nội dung 21 bài theo SGK
[Bước 3] → Tạo src/lib/pyodide.ts + src/hooks/usePyodide.ts
[Bước 4] → Cập nhật CodeEditor để chạy Pyodide thật
[Bước 5] → Tạo src/data/exercises.ts — 100+ bài tập
[Bước 6] → Tạo src/data/exams.ts — đề thi thử
[Bước 7] → Tạo exam pages (listing + taking + result)
[Bước 8] → Tạo progress system (localStorage)
[Bước 9] → Cập nhật Landing page & Learn page
[Bước 10] → Build & test final
```

---

*Tạo ngày: 18/05/2026*
*Tác giả: Kiro AI — phục vụ dự án Tin học cho Tẻ 12*
