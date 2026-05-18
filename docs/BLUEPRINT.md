# BLUEPRINT — "Tin học 12 Cánh Diều"

> Tài liệu kim chỉ nam cho lần refactor lớn, biến repo từ một
> "khoá học Python tự do" thành **nền tảng ôn thi Tin học 12 theo SGK
> Cánh Diều** chuẩn chương trình GDPT 2018.

Phiên bản: 1.0 — Ngày: 2026-05-18

---

## 1. Mục tiêu sản phẩm

Học sinh lớp 12 dùng nền tảng này có thể:

1. **Học lý thuyết** đủ 7 chủ đề SGK (A → G).
2. **Thực hành** Python, SQL, HTML/CSS/JS ngay trên trình duyệt.
3. **Làm đề thi minh hoạ tốt nghiệp THPT** với đếm ngược, chấm điểm,
   xem lại câu sai.
4. **Theo dõi tiến độ** theo chuẩn yêu cầu cần đạt từng chủ đề.
5. **Hỏi gia sư AI tiếng Việt** chỉ trả lời theo phạm vi SGK.

Sản phẩm **không** phải:

- Một khoá học Python tự do "từ zero đến hero".
- Một LeetCode / Codeforces.
- Một tool của giáo viên (admin sẽ giữ ở mức tối giản, không trọng tâm).

---

## 2. Bản đồ nội dung theo SGK Cánh Diều

| Mã | Chủ đề | Trọng tâm thi | Kiểu nội dung chính |
|---|---|---|---|
| **A** | Máy tính và xã hội tri thức | ★★ | Lý thuyết + quiz |
| **B** | Mạng máy tính và Internet | ★★★ | Lý thuyết + quiz |
| **C** | Đạo đức, pháp luật, văn hoá môi trường số | ★★ | Lý thuyết + quiz |
| **D** | Ứng dụng tin học (CSDL & SQL) | ★★★★ | Lý thuyết + **SQL playground** + quiz |
| **E** | Giải quyết vấn đề với máy tính (Python, thuật toán) | ★★★★ | Lý thuyết + **Code editor** + quiz |
| **F** | Hướng nghiệp với Tin học | ★ | Lý thuyết ngắn |
| **G‑CS** | Định hướng Khoa học máy tính (HTML/CSS/JS, ML cơ bản) | ★★★★ | Lý thuyết + **Web playground** + quiz |
| **G‑TUD** | Định hướng Tin học ứng dụng (CMS, dịch vụ web) | ★★ | Lý thuyết + ảnh hướng dẫn |

> Phạm vi MVP của repo này: **A, B, C, D, E, G‑CS** (đủ cho đa số HS).
> F và G‑TUD ở dạng skeleton để dễ mở rộng sau.

### 2.1. Cấu trúc dữ liệu mỗi chủ đề

```ts
type Topic = {
  id: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G_CS' | 'G_TUD';
  code: string;          // 'A', 'B', ...
  title: string;         // 'Máy tính và xã hội tri thức'
  description: string;
  icon: string;          // emoji hoặc lucide name
  color: string;         // hex
  examWeight: 1|2|3|4;   // sao trọng tâm
  lessons: Lesson[];     // tái dùng schema Lesson đã có
};
```

`Lesson` giữ nguyên schema cũ (`objectives, theory, examples, quiz, exercises`)
để không phá UI hiện tại của trang lesson.

### 2.2. Đề thi minh hoạ

```ts
type ExamSet = {
  id: string;
  title: string;            // 'Đề minh hoạ THPT 2025 - Số 1'
  durationMinutes: number;  // 50
  questions: QuizQuestion[]; // 40 câu
  topics: Topic['id'][];     // ['A','B','C','D','E','G_CS']
};
```

---

## 3. Roadmap thực hiện

### Pha 1 — Vá kỹ thuật (PR này)

- [x] Tạo branch `fix/canh-dieu-revamp`
- [ ] Thay README/SUMMARY/AGENTS/package metadata.
- [ ] **lib/auth.tsx**: bỏ auto‑login, gọi API thật.
- [ ] **API mock** đọc trực tiếp từ `@/data/content` thay vì hardcode lại.
- [ ] **Grader bài tập**: thay `Math.random()` bằng so khớp output thật.
- [ ] **Routing**: `/learn` link đúng `/lesson/<lesson-slug>` đầu tiên.
   `Header` không còn link tới `/practice` (không id).
- [ ] **AI Tutor**: 1 endpoint, prompt + fallback tiếng Việt theo SGK.
- [ ] **types**: thêm `Topic`, `ExamSet`, `Difficulty` mở rộng.
- [ ] **Hooks dư**: xoá `useDebounce`, `useInView`, `useMediaQuery`,
   `useTheme.ts`, `useLocalStorage.ts` (file rỗng).

### Pha 2 — Nội dung SGK Cánh Diều

- [ ] `src/data/canhdieu.ts`: 7 chủ đề × 3‑5 bài × 5‑8 câu quiz =
   ≥ 30 bài × ≥ 200 câu quiz (skeleton chất lượng).
- [ ] `src/data/exams.ts`: ≥ 2 đề minh hoạ THPT × 40 câu = 80 câu.
- [ ] Giữ `src/data/content.ts` cũ (Python 10 level) làm
   "Đào sâu Python (Chuyên đề tự chọn)" — gắn vào chủ đề E.

### Pha 3 — Trang & Tính năng mới

- [ ] `/chu-de` — danh sách 7 chủ đề có progress bar.
- [ ] `/chu-de/[topicId]` — chi tiết 1 chủ đề + danh sách bài.
- [ ] `/de-thi` — danh sách đề thi.
- [ ] `/de-thi/[examId]` — làm đề (đếm ngược, lưu local, xem lại).
- [ ] `/sql-playground` — sandbox SQL (placeholder, dùng mock executor).
- [ ] `/web-playground` — sandbox HTML/CSS/JS sử dụng `<iframe srcdoc>`.

### Pha 4 — Tinh chỉnh UX

- [ ] Header/Sidebar đổi label đúng SGK ("Chủ đề SGK", "Đề thi", "Sân chơi").
- [ ] Trang chủ landing đổi hero: hứa hẹn ôn thi tốt nghiệp THPT.
- [ ] Dashboard hiển thị tiến độ theo 7 chủ đề.
- [ ] Footer link sang docs/SGK chính thống.

### Pha 5 — Hậu PR (giai đoạn sau)

- [ ] Tích hợp Pyodide thật cho code editor.
- [ ] Tích hợp `sql.js` cho SQL playground.
- [ ] Bật API LLM tiếng Việt (OpenAI/Gemini) cho AI Tutor.
- [ ] PWA + service worker cho offline.

---

## 4. Quy ước kỹ thuật

### 4.1. Routing

```
/                       Landing
/dashboard              Dashboard học sinh
/chu-de                 7 chủ đề
/chu-de/[topicId]       Chi tiết 1 chủ đề
/lesson/[slug]          Bài học (giữ nguyên)
/practice/[id]          Bài tập code (giữ nguyên)
/quiz/[id]              Quiz đơn lẻ (giữ nguyên)
/de-thi                 Đề thi
/de-thi/[examId]        Làm đề
/sql-playground         SQL sandbox
/web-playground         HTML/CSS/JS sandbox
/tutor                  AI Tutor
/badges /leaderboard /profile /settings /search /admin /accessibility
```

### 4.2. Dữ liệu nguồn

- `src/data/content.ts` — Python 10 levels (cũ).
- `src/data/canhdieu.ts` — 7 chủ đề SGK (mới).
- `src/data/exams.ts` — đề thi (mới).
- API routes phải `import` từ các file trên, **không** hardcode lại.

### 4.3. Auth

- `localStorage` key: `canhdieu_user`, `canhdieu_token`.
- Khi chưa đăng nhập: `user = null`, các route cần auth (dashboard,
  profile, settings, admin) redirect về `/login`.
- Mặc định **không** tạo user giả.

### 4.4. Chấm bài Python (Pha 1)

`src/lib/grader.ts`:
- Phân tích code, trích các chuỗi truyền vào `print(...)`.
- So khớp với `expected_output` của test case.
- Nếu code không có `print` hoặc không truyền chuỗi tĩnh → trả
  status `unsupported`, hiển thị thông báo "Cần Pyodide để chạy thật".

### 4.5. AI Tutor

`src/lib/tutor.ts`:
- Lấy câu hỏi → tìm chủ đề có từ khoá tương ứng trong `canhdieu.ts`.
- Trả về objectives + 1‑2 đoạn lý thuyết liên quan + link "Mở bài học".
- Nếu không match → trả lời mặc định tiếng Việt mời chọn chủ đề.

### 4.6. Naming

- File data tiếng Việt không dấu: `canhdieu.ts`, `exams.ts`.
- Component & route giữ tiếng Anh: `Header.tsx`, `/de-thi/[examId]`.
- Slug URL **có dấu gạch ngang, không dấu tiếng Việt**:
  `/chu-de/A`, `/de-thi/de-minh-hoa-1`.

---

## 5. Tiêu chí "DONE" cho PR này

- [ ] `npm run lint` pass.
- [ ] `npm run build` pass.
- [ ] Trang `/`, `/dashboard`, `/chu-de`, `/chu-de/A`, `/de-thi`,
   `/de-thi/de-minh-hoa-1`, `/lesson/<bất-kỳ>` đều render không crash.
- [ ] Đăng nhập với `minh@example.com / password123` chạy.
- [ ] `/api/exercises/exercise-1` POST `{code:"print('Hello, Python!')"}`
   trả `accepted`. POST code rỗng trả `wrong`.
- [ ] AI Tutor trả tiếng Việt với câu "biến trong python là gì".
- [ ] Header không có link gây 404 ("/practice", "/about", "/blog"…).
- [ ] README/SUMMARY mô tả đúng repo.

---

## 6. Phụ lục — Mapping từ tên cũ → tên mới

| UI cũ | UI mới |
|---|---|
| Python Master 12 | Tin học 12 Cánh Diều |
| Lộ trình 10 cấp độ | 7 chủ đề SGK |
| "Học sinh lớp 12 học Python" | "Học sinh lớp 12 ôn thi Tin học" |
| Nhiệm vụ hôm nay (gamify) | Nhiệm vụ hôm nay (vẫn giữ, opt‑in) |
| `/learn` | `/chu-de` (giữ `/learn` redirect) |
| Practice | Bài tập (mỗi bài học có) |

