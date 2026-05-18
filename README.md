# Python Master 12

![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Nền tảng học Python từ cơ bản đến nâng cao cho học sinh lớp 12 Việt Nam**

---

## ✨ Features

### 🎯 Lộ trình học 10 cấp độ
Hệ thống bài học được thiết kế từ cơ bản đến nâng cao, phù hợp với chương trình lớp 12.

### 💻 Trình code editor online (Monaco)
Trình soạn thảo code mạnh mẽ với syntax highlighting, auto-completion và error detection.

### 🤖 AI Tutor PyMate
Trợ lý AI thông minh hỗ trợ 24/7, giải đáp thắc mắc và gợi ý giải pháp lập trình.

### 🏆 Hệ thống gamification (XP, badges, streaks)
Kiếm điểm XP, nhận huy hiệu, duy trì streak để motivation học tập.

### 📊 Dashboard theo dõi tiến độ
Trực quan hóa quá trình học tập với biểu đồ và thống kê chi tiết.

### 📚 200+ bài tập lập trình
Thực hành với đa dạng bài tập từ dễ đến khó, có test cases tự động.

### 🧪 Môi trường thực thi Python
Chạy code trực tiếp trên trình duyệt với Pyodide (WebAssembly).

### 🎮 Coding Challenges hàng tuần
Thử thách lập trình với bảng xếp hạng và phần thưởng.

### 💬 Diễn đàn học tập
Kết nối với cộng đồng học viên, chia sẻ kiến thức và kinh nghiệm.

### 🔥 Streak System
Duy trì学习的 tính nhất quán với streak counter và reminders.

### 🏅 Achievements & Badges
Thu thập badges khi hoàn thành milestones và thành tích đặc biệt.

### 📱 Responsive Design
Giao diện tương thích với mọi thiết bị: desktop, tablet, mobile.

### 🌙 Dark/Light Mode
Chế độ nền tối và nền sáng cho trải nghiệm đọc thoải mái.

### 🔒 Secure Authentication
Hệ thống đăng nhập an toàn với JWT và OAuth support.

### 📈 Skill Tree Visualization
Trực quan hóa kỹ năng với skill tree đồ thị.

---

## 🛠 Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| **Next.js** | 15.0.0 | React framework for production |
| **TypeScript** | 5.6.0 | Type-safe JavaScript |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Monaco Editor** | 0.52.0 | VS Code editor component |
| **Pyodide** | 0.26.0 | Python in WebAssembly |
| **Supabase** | 2.50.0 | Backend as a Service |
| **NextAuth.js** | 4.24.0 | Authentication framework |
| **Zustand** | 4.5.0 | State management |
| **Recharts** | 2.13.0 | Charts library |
| **Framer Motion** | 11.0.0 | Animation library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/python-master-12.git
cd python-master-12

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
python-master-12/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # UI components
│   ├── editor/            # Code editor components
│   └── dashboard/         # Dashboard components
├── lib/                   # Utilities and helpers
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── types/                 # TypeScript types
├── public/                # Static assets
├── styles/                # Global styles
├── .env.example           # Environment variables template
└── README.md              # Project documentation
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

---

## 🔧 Environment Variables

Tạo file `.env.local` trong thư mục gốc với các biến sau:

```env
# AI Configuration
OPENAI_API_KEY=sk-your-api-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=
```

### Required Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | API key cho AI Tutor PyMate |
| `NEXT_PUBLIC_APP_URL` | URL của ứng dụng |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ANALYTICS_ID` | Google Analytics tracking ID |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code lên GitHub repository
2. Kết nối repository với [Vercel](https://vercel.com)
3. Thêm environment variables trong Vercel dashboard
4. Deploy!

### Supabase

1. Tạo project mới tại [supabase.com](https://supabase.com)
2. Lấy các keys từ Settings > API
3. Thêm vào environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📄 License

MIT License - Copyright © 2024 Python Master 12

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [Pyodide](https://pyodide.org)