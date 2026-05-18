'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Video, Code2, Heart } from 'lucide-react';
import { useTheme } from '@/lib/theme';

const quickLinks = [
  { label: 'Về chúng tôi', href: '/about' },
  { label: 'Lộ trình học', href: '/roadmap' },
  { label: 'Bài tập', href: '/exercises' },
  { label: 'AI Tutor', href: '/tutor' },
  { label: 'Liên hệ', href: '/contact' },
];

const resources = [
  { label: 'Tài liệu', href: '/docs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Video hướng dẫn', href: '/videos' },
  { label: 'Cộng đồng', href: '/community' },
  { label: 'FAQ', href: '/faq' },
];

const legalLinks = [
  { label: 'Điều khoản sử dụng', href: '/terms' },
  { label: 'Chính sách bảo mật', href: '/privacy' },
  { label: 'Giấy phép', href: '/license' },
];

const socialLinks = [
  { icon: Globe, label: 'Facebook', href: 'https://facebook.com/pythonmaster12' },
  { icon: Video, label: 'YouTube', href: 'https://youtube.com/@pythonmaster12' },
  { icon: Code2, label: 'GitHub', href: 'https://github.com/pythonmaster12' },
];

interface FooterLinkProps {
  label: string;
  href: string;
}

function FooterLink({ label, href }: FooterLinkProps) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className="text-muted hover:text-foreground transition-colors duration-200 text-sm"
      >
        {label}
      </Link>
    </motion.div>
  );
}

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FooterColumn({ title, children, className = '' }: FooterColumnProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <ul className="space-y-3">
        {children}
      </ul>
    </div>
  );
}

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative mt-auto">
      {/* Glassmorphism border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="glass border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Brand info - always visible */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  Py
                </div>
                <span className="font-bold text-xl gradient-text">
                  Python Master 12
                </span>
              </Link>

              {/* Tagline */}
              <p className="text-muted text-sm leading-relaxed">
                Nền tảng học Python hàng đầu cho học sinh Việt Nam
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Quick Links - hidden on mobile */}
            <div className="hidden md:block">
              <FooterColumn title="Quick Links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink label={link.label} href={link.href} />
                  </li>
                ))}
              </FooterColumn>
            </div>

            {/* Column 3: Resources - hidden on mobile */}
            <div className="hidden md:block">
              <FooterColumn title="Resources">
                {resources.map((link) => (
                  <li key={link.label}>
                    <FooterLink label={link.label} href={link.href} />
                  </li>
                ))}
              </FooterColumn>
            </div>

            {/* Column 4: Legal - hidden on mobile */}
            <div className="hidden lg:block">
              <FooterColumn title="Legal">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink label={link.label} href={link.href} />
                  </li>
                ))}
              </FooterColumn>
            </div>
          </div>

          {/* Mobile menu - show columns in 2x2 grid on tablet, stacked on mobile */}
          <div className="grid grid-cols-2 gap-8 mt-8 md:mt-12 lg:hidden">
            <div>
              <FooterColumn title="Quick Links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink label={link.label} href={link.href} />
                  </li>
                ))}
              </FooterColumn>
            </div>
            <div>
              <FooterColumn title="Resources">
                {resources.map((link) => (
                  <li key={link.label}>
                    <FooterLink label={link.label} href={link.href} />
                  </li>
                ))}
              </FooterColumn>
            </div>
            <div className="col-span-2">
              <FooterColumn title="Legal">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {legalLinks.map((link) => (
                    <div key={link.label}>
                      <FooterLink label={link.label} href={link.href} />
                    </div>
                  ))}
                </div>
              </FooterColumn>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-muted text-sm">
                © {new Date().getFullYear()} Python Master 12. All rights reserved.
              </p>
              <p className="text-muted text-sm flex items-center gap-1.5">
                Made with <Heart className="w-4 h-4 text-error fill-error" /> for Vietnamese students
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}