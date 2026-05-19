'use client';

import { motion } from 'framer-motion';
import { Code2, Github, Globe, Youtube } from 'lucide-react';

const footerLinks = {
  sanPham: [
    { label: 'Tính Năng', href: '#features' },
    { label: 'Lộ Trình Học', href: '#roadmap' },
    { label: 'Bảng Giá', href: '/pricing' },
    { label: 'Cập Nhật', href: '/changelog' },
  ],
  taiNguyen: [
    { label: 'Bài Học', href: '/lessons' },
    { label: 'Bài Tập', href: '/exercises' },
    { label: 'Dự Án', href: '/projects' },
    { label: 'AI Tutor', href: '/tutor' },
  ],
  hoTro: [
    { label: 'Hướng Dẫn', href: '/docs' },
    { label: 'Câu Hỏi Thường Gặp', href: '#faq' },
    { label: 'Liên Hệ', href: '/contact' },
    { label: 'Góp Ý', href: '/feedback' },
  ],
  phapLy: [
    { label: 'Chính Sách Bảo Mật', href: '/privacy' },
    { label: 'Điều Khoản Sử Dụng', href: '/terms' },
    { label: 'Bảo Mật', href: '/security' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Globe, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Python Master 12</span>
            </motion.div>
            <p className="text-slate-400 mb-6 max-w-xs">
              Nền tảng học lập trình Python dành cho học sinh lớp 12 Việt Nam theo sách giáo khoa Cánh Diều.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Sản Phẩm</h3>
            <ul className="space-y-2">
              {footerLinks.sanPham.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tài Nguyên</h3>
            <ul className="space-y-2">
              {footerLinks.taiNguyen.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              {footerLinks.hoTro.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Pháp Lý</h3>
            <ul className="space-y-2">
              {footerLinks.phapLy.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Python Master 12. Bảo lưu mọi quyền.
          </p>
          <p className="text-slate-400 text-sm">
            Được xây dựng với ❤️ dành cho học sinh Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
