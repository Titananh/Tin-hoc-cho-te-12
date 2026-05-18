---
inclusion: always
---

# Định hướng dự án "Tin học 12 Cánh Diều"

> Đọc kỹ trước khi sửa code. Mọi thay đổi không khớp định hướng này
> phải được người dùng xác nhận trước.

## Tóm tắt

Repo này là **nền tảng ôn thi Tin học 12 cho học sinh Việt Nam theo SGK
Cánh Diều** (chương trình GDPT 2018). KHÔNG phải khoá học Python tự do.

## 5 nguyên tắc bất di bất dịch

1. **Bám sát SGK Cánh Diều 7 chủ đề (A–G)**. Mọi nội dung mới phải
   gắn vào ít nhất 1 chủ đề. Không thêm OOP / REST / DevOps...
   nếu SGK không có.
2. **Tiếng Việt là chính**. UI, mô tả, AI Tutor mặc định tiếng Việt
   chuẩn miền Bắc. Code Python ví dụ có thể dùng tiếng Việt có dấu
   (Python 3 hỗ trợ Unicode).
3. **Không hứa hẹn quá**. README và UI chỉ nói đúng những gì đã làm
   được. Nếu chưa có Pyodide thật, ghi rõ "Trình mô phỏng".
4. **Sources of truth**: `src/data/canhdieu.ts` (lý thuyết & quiz),
   `src/data/exams.ts` (đề thi), `src/data/content.ts` (Python sâu).
   API routes phải import từ đây, không hardcode lại.
5. **Auth thật**: không auto‑login user giả. Học sinh phải đăng nhập
   mới truy cập dashboard/profile/settings.

## Naming

- Slug URL không dấu, kebab‑case: `/chu-de/A`, `/de-thi/de-minh-hoa-1`.
- Cấp bậc người dùng: "Học sinh", "Lớp trưởng", "HSG cấp trường",
  "HSG cấp tỉnh", "HSG quốc gia". KHÔNG dùng "Tân Binh / Đại Sư /
  Huyền Thoại" kiểu game.

## Khi mở rộng

- Thêm bài học → thêm vào `canhdieu.ts` đúng chủ đề.
- Thêm đề thi → thêm vào `exams.ts`.
- Thêm tính năng UI → cập nhật `docs/BLUEPRINT.md` mục "Roadmap".
