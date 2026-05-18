import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/common/UI";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Python Master 12 - Học Python cho học sinh lớp 12",
  description:
    "Nền tảng học Python từ cơ bản đến nâng cao dành riêng cho học sinh Việt Nam. AI Tutor, bài tập thực hành, gamification.",
  keywords: "Python, học lập trình, lớp 12, AI Tutor, bài tập Python",
  authors: [{ name: "Python Master 12 Team" }],
  openGraph: {
    title: "Python Master 12 - Học Python cho học sinh lớp 12",
    description:
      "Nền tảng học Python từ cơ bản đến nâng cao dành riêng cho học sinh Việt Nam. AI Tutor, bài tập thực hành, gamification.",
    url: "https://pythonmaster12.com",
    siteName: "Python Master 12",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Python Master 12 - Học Python cho học sinh lớp 12",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Master 12 - Học Python cho học sinh lớp 12",
    description:
      "Nền tảng học Python từ cơ bản đến nâng cao dành riêng cho học sinh Việt Nam. AI Tutor, bài tập thực hành, gamification.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Python Master 12",
    description: "Học Python từ cơ bản đến nâng cao dành riêng cho học sinh lớp 12",
    url: "https://pythonmaster12.example.com",
    inLanguage: "vi",
    audience: {
      "@type": "EducationalAudience",
      audienceType: "Học sinh lớp 12 Việt Nam",
    },
    educationalLevel: "Trung học phổ thông",
    courseMode: "online",
  };

  return (
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}