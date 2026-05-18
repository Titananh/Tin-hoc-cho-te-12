# Tin học 12 Cánh Diều — Project Summary

## 1. Project Overview

- **Tên**: Tin học 12 Cánh Diều
- **Loại**: Nền tảng học tập & ôn thi (web app)
- **Người dùng**: Học sinh lớp 12 Việt Nam (định hướng Khoa học máy
  tính / Tin học ứng dụng theo chương trình GDPT 2018).
- **Phiên bản**: 0.2.0
- **Trạng thái**: MVP (frontend đầy đủ, backend mock).

Repo này được rebrand từ phiên bản 0.1.0 ("Python Master 12") để
phục vụ đúng đối tượng học sinh lớp 12 ôn thi Tin học theo SGK
Cánh Diều, thay vì là một khoá học Python tự do.

---

## 2. Tính năng

### Đã có

| Tính năng | Trạng thái | Ghi chú |
|---|---|---|
| Landing page | ✅ | Hero + features + stats |
| Auth (mock) | ✅ | Login/register với 1 user demo |
| Dashboard học sinh | ✅ | Stat cards, daily quest, weekly progress |
| 7 chủ đề SGK Cánh Diều | ✅ (skeleton) | A–G với lý thuyết + quiz |
| Trang bài học | ✅ | Objectives, theory, examples, quiz |
| Code editor (Monaco) | ✅ | Cho bài tập Python |
| Bài tập có chấm | ✅ | Grader so output (không còn random) |
| AI Tutor tiếng Việt | ✅ | Rule-based theo SGK |
| Đề thi minh hoạ THPT | ✅ | 2 đề × 40 câu × 50 phút |
| SQL playground | ✅ | Sandbox mock, sẽ tích hợp `sql.js` sau |
| Web playground | ✅ | `<iframe srcdoc>` HTML/CSS/JS |
| Search | ✅ | Tìm bài học, bài tập, flashcard |
| Flashcards | ✅ | Spaced repetition đơn giản |
| Leaderboard | ✅ | Theo XP |
| Profile / Settings | ✅ | UI hoàn chỉnh |
| Admin dashboard | ✅ | UI hoàn chỉnh, mock data |
| Dark / Light mode | ✅ | |
| Responsive | ✅ | |

### Chưa có (xem `docs/BLUEPRINT.md` Pha 5)

- Pyodide thật để chạy Python trên trình duyệt.
- `sql.js` thật để chạy SQL trên trình duyệt.
- Tích hợp LLM thật cho AI Tutor (OpenAI/Gemini).
- Backend thật (database).
- PWA / offline mode.

---

## 3. Stack

| Lớp | Công nghệ | Phiên bản |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Ngôn ngữ | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.38.0 |
| Code editor | `@monaco-editor/react` | 4.7.0 |
| Icons | Lucide React | 1.16.0 |

---

## 4. Cấu trúc

Xem `README.md` mục "Cấu trúc thư mục chính".

Nguồn dữ liệu chính:

- `src/data/canhdieu.ts` — 7 chủ đề SGK.
- `src/data/exams.ts` — đề thi minh hoạ.
- `src/data/content.ts` — Python 10 cấp độ (chuyên đề tự chọn).

---

## 5. API mock có sẵn

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/lessons/[id]` | Chi tiết bài (đọc từ `content.ts`) |
| GET | `/api/exercises/[id]` | Chi tiết bài tập |
| POST | `/api/exercises/[id]` | Nộp bài, chấm bằng grader thật |
| GET | `/api/dashboard` | Dữ liệu dashboard |
| POST | `/api/ai/chat` | AI Tutor tiếng Việt |

---

## 6. Roadmap & giới hạn

Xem `docs/BLUEPRINT.md`. Các giới hạn lớn nhất hiện tại:

| Giới hạn | Mức độ | Tác động |
|---|---|---|
| Code Python không chạy thật | Cao | Grader so output literal thôi |
| SQL/HTML/CSS/JS chỉ giả lập | Cao | Cần `sql.js` để chạy SQL thật |
| AI Tutor là rule-based | Trung bình | Không hiểu câu hỏi tự do |
| Auth giả lập | Cao | Mất dữ liệu khi xoá localStorage |

---

*Cập nhật: 2026-05-18*
