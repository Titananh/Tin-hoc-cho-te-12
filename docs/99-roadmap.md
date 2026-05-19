# Roadmap to 99/100

## Trạng thái hiện tại: **78/100** (sau Phase A)

### ✅ Phase A đã hoàn thành (+16 từ 62 → 78)

#### A1. Pyodide thay MiniPython (+5)
- Tích hợp Pyodide 0.26.2 từ jsDelivr CDN, lazy load qua `loadPyodide()`
- React hook `usePython()` với loading/ready/running state
- Tự động download + khởi tạo trong background ngay khi mount trang
- Áp dụng cho `/practice/[slug]`, `/learn/[lvl]/exercises/[id]`, `/projects/[id]`
- **Hỗ trợ Python thật**: `def`, `class`, `try/except`, list/dict comprehension, đệ quy, `import math`, `import random`, `import statistics`, ... toàn bộ stdlib Python 3.11
- Submission auto-test với feedback chi tiết khi fail (Input / Mong đợi / Bạn nhận)

#### A2. Nội dung bài học thật (+6)
- `src/lib/lesson-content.ts`: 50 bài học theo SGK Cánh Diều, mỗi bài 200-1000 từ
- 10 cấp độ: Giới thiệu → Biểu thức → Điều kiện → Vòng lặp → Hàm → List → Chuỗi → Dict → Tệp tin → Thuật toán
- Mỗi bài có: Mục tiêu, lý thuyết, ví dụ code chạy được, lưu ý, bài tập tự luyện
- Markdown được render thành HTML với syntax-highlighting cho code

#### A3. Bug fixes lớn (+3)
- Fix bug terms.tsx export metadata làm sập 100% routes
- Tạo missing pages: /notifications, /projects/[id], /search, /contests/[slug], /blog/[slug]
- Fix hydration error trên /challenge
- Fix double navbar trên landing/auth pages
- Fix /api/projects shape mismatch

#### A4. UX cải thiện (+2)
- Pyodide loading indicator sticky
- Test failure detail panel hiển thị I/O so sánh
- Markdown renderer trên blog detail và lesson page

---

## 🚀 Phase B - Cần credentials thực

### B1. Supabase production (+8)
**Cần từ bạn**:
- `NEXT_PUBLIC_SUPABASE_URL` và `SUPABASE_SERVICE_ROLE_KEY` từ supabase.com
- Tạo Supabase project (free tier 500MB OK cho 1000+ học sinh)

**Tôi sẽ làm**:
- Chạy migrations để tạo schema (đã có trong `src/migrations/`)
- Seed dữ liệu 50 bài học, 150 bài tập, 20 problem set, 5 dự án vào Supabase
- Tắt dev-store fallback khi env có giá trị thật
- Audit RLS policies cho Supabase

### B2. OpenAI cho AI Tutor (+2)
**Cần từ bạn**: `OPENAI_API_KEY` (gpt-3.5-turbo $0.5/1M tokens)
**Tôi làm**: Đã có code, chỉ cần key. AI Tutor (PyMate) sẽ trả lời chi tiết.

### B3. Vercel deploy (+1)
**Cần từ bạn**: Vercel account + token, hoặc tự deploy
**Tôi làm**: Đã có vercel.json. Chỉ cần `vercel --prod`.

---

## 🎨 Phase C - Polish (+5 điểm)

### C1. Test infrastructure (+2)
- Khắc phục Jest qua OneDrive (cần move project ra ngoài OneDrive)
- Hoặc dùng Vitest (nhẹ hơn, ít conflict)
- Playwright test suite cho 30 user flow chính

### C2. Observability (+1)
- Sentry cho error tracking
- Vercel Analytics
- Web Vitals monitoring

### C3. SEO + a11y (+1)
- sitemap.xml, robots.txt
- OG/Twitter cards trên tất cả các trang
- Lighthouse audit > 95
- Audit ARIA labels

### C4. Admin tools (+1)
- Markdown editor cho bài học (admin tự soạn)
- Bulk import CSV cho exercises
- Analytics dashboard cho thấy số học sinh active, bài hot, v.v.

---

## Cách chạy tất cả lên 99

1. Bạn cung cấp Supabase credentials (5 phút trên supabase.com)
2. Bạn cung cấp OpenAI key (đăng ký + nạp $5)
3. Tôi chạy Phase B trong 1 buổi (cài migration, seed data, test)
4. Bạn deploy lên Vercel (1 click)
5. Tôi chạy Phase C trong 1 buổi (Sentry, sitemap, audit)

**Kết quả: 99/100.** 1 điểm cuối cùng dành cho phần luôn cần thời gian thực:
real-user-feedback từ học sinh thật + iterate.
