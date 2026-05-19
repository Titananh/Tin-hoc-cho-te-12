# Python Master 12

Nền tảng học lập trình Python trực tuyến dành cho học sinh lớp 12 Việt Nam. Hệ thống cung cấp bài học tương tác, bài tập thực hành với code editor trực tiếp, AI Tutor hỗ trợ học tập, và hệ thống gamification để tạo động lực học tập.

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| **Next.js 14** (App Router) | Framework React full-stack |
| **TypeScript** | Type safety |
| **React 18** | UI library |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Monaco Editor** | Code editor (VS Code engine) |
| **Supabase** | Database (PostgreSQL), Auth, Storage |
| **NextAuth.js** | Authentication |
| **OpenAI API** | AI Tutor (PyMate) |
| **Judge0 API** | Code execution sandbox |
| **Vercel** | Hosting & deployment |

## 📋 Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 hoặc **yarn** >= 1.22.0
- **Tài khoản Supabase** (miễn phí tại [supabase.com](https://supabase.com))
- **OpenAI API Key** (cho AI Tutor)
- **Judge0 API Key** (cho code execution - RapidAPI hoặc self-hosted)
- **Google Cloud Console** project (cho Google OAuth)

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd Web_Học_code
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

```bash
# Copy file mẫu
cp .env.example .env.local

# Mở file và điền các giá trị cần thiết
# Xem phần "Biến môi trường" bên dưới để biết chi tiết
```

### 4. Thiết lập Database

```bash
# Chạy migration scripts trong Supabase SQL Editor
# File migration nằm tại: docs/DATABASE.md
```

### 5. Chạy ứng dụng

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## 📝 Lệnh phát triển

```bash
# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production server
npm run start

# Kiểm tra linting
npm run lint
```

## 📁 Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── admin/             # Admin dashboard pages
│   ├── dashboard/         # User dashboard
│   ├── learn/             # Learning path pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ai-tutor/         # AI chat components
│   ├── common/           # Shared UI components
│   ├── dashboard/        # Dashboard widgets
│   ├── editor/           # Code editor components
│   ├── landing/          # Landing page sections
│   ├── layout/           # Layout components (Header, Sidebar)
│   ├── notifications/    # Notification components
│   └── quiz/             # Quiz components
├── data/                  # Static data & seed content
├── db/                    # Database queries & migrations
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── supabase.ts       # Supabase client
│   ├── judge0.ts         # Judge0 API integration
│   ├── openai.ts         # OpenAI API integration
│   ├── gamification.ts   # XP & level calculations
│   ├── validation.ts     # Input validation
│   └── rate-limiter.ts   # Rate limiting logic
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware (auth, security)
```

## 🔐 Biến môi trường

| Biến | Mô tả | Bắt buộc |
|------|--------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL của Supabase project | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key cho client-side | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key cho server | ✅ |
| `NEXTAUTH_SECRET` | Secret key cho JWT | ✅ |
| `NEXTAUTH_URL` | URL gốc của ứng dụng | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `JUDGE0_API_URL` | URL của Judge0 API | ✅ |
| `JUDGE0_API_KEY` | API key cho Judge0 | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ⚠️ |
| `EMAIL_API_KEY` | API key dịch vụ email | ⚠️ |
| `EMAIL_FROM` | Địa chỉ email gửi đi | ⚠️ |

> ✅ = Bắt buộc, ⚠️ = Tùy chọn (một số tính năng sẽ không hoạt động nếu thiếu)

## 🌐 Deployment (Vercel)

### 1. Kết nối repository

- Đăng nhập [Vercel](https://vercel.com)
- Import repository từ GitHub/GitLab
- Chọn framework: **Next.js**

### 2. Cấu hình biến môi trường

Thêm tất cả biến môi trường từ `.env.example` vào Vercel Dashboard:
- Settings → Environment Variables
- Thêm từng biến cho môi trường Production

### 3. Cấu hình build

- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Deploy

Vercel sẽ tự động deploy khi push code lên branch `main`.

### 5. Cấu hình domain (tùy chọn)

- Settings → Domains → Add domain
- Cập nhật `NEXTAUTH_URL` thành domain mới

## 🤝 Đóng góp

### Quy trình đóng góp

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit changes: `git commit -m "feat: mô tả thay đổi"`
4. Push branch: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

### Quy ước commit message

```
feat: thêm tính năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
style: thay đổi style (không ảnh hưởng logic)
refactor: tái cấu trúc code
test: thêm/sửa tests
chore: công việc bảo trì
```

### Coding standards

- Sử dụng TypeScript strict mode
- Tuân thủ ESLint rules
- Viết component với React functional components
- Sử dụng Tailwind CSS cho styling
- Đặt tên file theo PascalCase cho components, camelCase cho utilities
- Viết comments bằng tiếng Việt cho business logic

## 📄 License

Dự án này được phát triển cho mục đích giáo dục.
