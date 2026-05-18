---
inclusion: always
---

# Coding conventions

## Stack thật (kiểm tra `package.json` để chắc chắn)

- Next.js 16 App Router, React 19, TypeScript 5.
- Tailwind CSS 4 (dùng `@theme inline`, biến CSS trong `globals.css`).
- Framer Motion 12, Lucide React, `@monaco-editor/react`.
- **Không** có Pyodide / Supabase / NextAuth / Zustand / Recharts.
  Đừng `import` các package này.

## Page conventions

- Mọi page **PHẢI** check `'use client'` rõ ràng trước khi dùng hook.
- Trang tĩnh thuần (về, FAQ, chính sách) nên SSR (không `'use client'`).
- Auth-required pages: dùng `useAuth()` và redirect `/login` nếu null.

## Data access

- UI components đọc trực tiếp từ `src/data/*.ts` cho bản MVP.
- API routes (`src/app/api/.../route.ts`) cũng `import` từ `src/data/*`,
  không tạo mock duplicate.

## Theme tokens

Dùng class Tailwind/biến đã định nghĩa trong `globals.css`:
`bg-background bg-surface bg-surface-elevated text-foreground
text-muted text-primary text-secondary text-accent text-success
text-warning text-error border-border`.

## i18n strings

Tất cả label hiển thị bằng tiếng Việt có dấu. Tránh trộn:
- Sai: "Day Streak", "Total Cards", "Know it!"
- Đúng: "Ngày liên tiếp", "Tổng số thẻ", "Đã thuộc"

## Commit style

- Tiếng Anh ngắn gọn, conventional commits:
  - `feat(canhdieu): add Topic A lessons skeleton`
  - `fix(auth): remove auto-login default user`
  - `chore(docs): rewrite README to match real stack`
