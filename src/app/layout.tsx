import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { ToastProvider } from '@/components/common/Toast';
import { AuthGuard } from '@/components/common/AuthGuard';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Python Master 12 - Học Lập Trình Python Theo Sách Cánh Diều',
    template: '%s | Python Master 12',
  },
  description:
    'Nền tảng học lập trình Python trực tuyến dành cho học sinh lớp 12 theo sách giáo khoa Cánh Diều. Bài tập tương tác, AI Tutor hỗ trợ 24/7, và gamification.',
  keywords: [
    'Python',
    'lập trình',
    'học sinh lớp 12',
    'Cánh Diều',
    'Tin học 12',
    'AI Tutor',
    'bài tập Python',
  ],
  authors: [{ name: 'Python Master 12 Team' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Python Master 12',
    title: 'Python Master 12 - Học Lập Trình Python Dễ Dàng',
    description:
      'Nền tảng học lập trình Python dành cho học sinh lớp 12 theo sách giáo khoa Cánh Diều.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          <AuthGuard>
            <Navbar />
            {children}
          </AuthGuard>
        </ToastProvider>
      </body>
    </html>
  );
}
