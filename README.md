# Tin học 12 Cánh Diều

Nền tảng web ôn thi **Tin học lớp 12** theo **SGK Cánh Diều**
(chương trình Giáo dục Phổ thông 2018), dành cho học sinh Việt Nam
chuẩn bị thi tốt nghiệp THPT và đánh giá năng lực.

> Trạng thái: **MVP** — frontend Next.js đã đầy đủ, backend đang ở
> dạng mock in‑memory. Xem `docs/BLUEPRINT.md` để biết chi tiết
> roadmap và những gì còn lại cần làm.

## Mục tiêu

- Bao phủ **7 chủ đề SGK** (A → G) bằng lý thuyết + quiz + thực hành.
- Cung cấp **trình thực hành Python** (Monaco editor) và sân chơi
  **SQL / HTML / CSS / JS** ngay trên trình duyệt.
- Cung cấp **chế độ ôn thi**: bộ đề minh hoạ tốt nghiệp THPT có
  đếm ngược, chấm điểm và xem lại câu sai.
- **AI Tutor tiếng Việt** trả lời theo phạm vi SGK.

## Stack thật (đã cài)

| Tầng | Công nghệ | Phiên bản |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Ngôn ngữ | TypeScript | 5.x |
| UI lib | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.38.0 |
| Editor | Monaco (`@monaco-editor/react`) | 4.7.0 |
| Icons | Lucide React | 1.16.0 |

> **Chưa** có Pyodide, Supabase, NextAuth, Zustand, Recharts...
> Tất cả các tính năng đó là kế hoạch tương lai (xem
> `docs/BLUEPRINT.md` mục "Pha 5").

## Bắt đầu

```bash
npm install
npm run dev
# http://localhost:3000
```

Tài khoản demo (mock): `minh@example.com` / `password123`.

## Cấu trúc thư mục chính

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # Mock REST API
│   │   ├── auth/             # login / register
│   │   ├── ai/chat/          # AI Tutor
│   │   ├── dashboard/        # Dashboard data
│   │   ├── exercises/[id]/   # Bài tập + grader
│   │   └── lessons/[id]/     # Bài học
│   ├── chu-de/               # 7 chủ đề SGK Cánh Diều
│   ├── de-thi/               # Đề thi minh hoạ THPT
│   ├── lesson/[slug]/        # Trang bài học
│   ├── practice/[id]/        # Trang bài tập code
│   ├── quiz/[id]/            # Quiz đơn lẻ
│   ├── sql-playground/       # Sân chơi SQL
│   └── web-playground/       # Sân chơi HTML/CSS/JS
├── components/
│   ├── ai-tutor/  common/  course/  dashboard/
│   ├── editor/  gamification/  landing/  layout/  lesson/
├── data/
│   ├── canhdieu.ts           # Nội dung 7 chủ đề SGK (nguồn sự thật)
│   ├── content.ts            # Python 10 cấp độ (chuyên đề tự chọn)
│   └── exams.ts              # Đề thi minh hoạ
├── hooks/                    # useDebounce, useInView, ...
├── lib/                      # auth, theme, grader, tutor, utils
└── types/                    # TypeScript types
```

## Bản đồ nội dung theo SGK

| Mã | Chủ đề | Số bài | Tỷ trọng đề thi |
|---|---|---|---|
| A | Máy tính và xã hội tri thức | 3 | ★★ |
| B | Mạng máy tính và Internet | 3 | ★★★ |
| C | Đạo đức, pháp luật, văn hoá môi trường số | 3 | ★★ |
| D | Ứng dụng tin học (CSDL & SQL) | 4 | ★★★★ |
| E | Giải quyết vấn đề với máy tính (Python, thuật toán) | 5 | ★★★★ |
| F | Hướng nghiệp với Tin học | 2 | ★ |
| G‑CS | Định hướng Khoa học máy tính (HTML/CSS/JS, ML) | 4 | ★★★★ |
| G‑TUD | Định hướng Tin học ứng dụng | 2 | ★★ |

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run start` | Start production |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

## Đóng góp

Đọc `docs/BLUEPRINT.md` để biết kiến trúc và roadmap. Mọi PR thay đổi
nội dung SGK phải bám đúng chương trình Cánh Diều.

## License

MIT
