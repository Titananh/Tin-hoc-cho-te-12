# Hướng dẫn cho AI agent / Code assistant

> Đọc kỹ trước khi sửa code. Tài liệu này tóm tắt những thứ ngắn gọn
> nhất để khỏi đi sai hướng. Roadmap đầy đủ ở `docs/BLUEPRINT.md`.

## Đây là cái gì?

Đây là **nền tảng ôn thi Tin học lớp 12 theo SGK Cánh Diều**, không phải
khoá học Python tự do. Mọi nội dung mới phải gắn vào 1 trong 7 chủ đề
A–G của SGK.

## 5 quy tắc bất biến

1. **Tiếng Việt là chính** — UI, mô tả, AI Tutor mặc định tiếng Việt
   chuẩn miền Bắc, code Python ví dụ có thể dùng Unicode.
2. **Không hứa hẹn quá** — Nếu chưa làm thì viết "đang phát triển",
   không nói "đã có Pyodide" trong khi chưa cài.
3. **Source of truth nội dung**: `src/data/canhdieu.ts`,
   `src/data/exams.ts`, `src/data/content.ts`. API routes import từ đó.
4. **Auth thật** — không tự tạo user giả. Phải đăng nhập mới vào
   dashboard / profile / settings.
5. **Slug URL không dấu, kebab-case** — `/chu-de/A`,
   `/de-thi/de-minh-hoa-1`.

## Stack THẬT (đã cài)

Next.js 16 + React 19 + Tailwind 4 + Framer Motion 12 + Monaco +
Lucide React. **Đừng** import Pyodide / Supabase / NextAuth / Zustand /
Recharts — chưa được cài.

## Không có IDE hay file explorer

Người dùng dùng web → push lên branch + tạo PR là cách review tốt nhất.
Đừng nói "mở file XYZ trong sidebar" — họ không có sidebar.

## Đặt câu hỏi khi không chắc

Ưu tiên: hỏi ngắn 1 câu chốt định hướng, hơn là sửa nửa vời rồi đoán.
