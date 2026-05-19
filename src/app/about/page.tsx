'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import {
  Code2,
  Users,
  Target,
  BookOpen,
  Brain,
  Award,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Lộ trình 10 cấp độ',
    description: 'Nội dung bám sát sách giáo khoa Cánh Diều, từ cơ bản đến nâng cao.',
  },
  {
    icon: Code2,
    title: 'Code Editor trực tuyến',
    description: 'Viết và chạy code Python ngay trên trình duyệt với Monaco Editor.',
  },
  {
    icon: Brain,
    title: 'AI Tutor (PyMate)',
    description: 'Trợ lý AI hỗ trợ 24/7, giải thích bài học và gợi ý khi gặp khó khăn.',
  },
  {
    icon: Zap,
    title: 'Tự động chấm điểm',
    description: 'Hệ thống test case tự động đánh giá bài tập ngay lập tức.',
  },
  {
    icon: Award,
    title: 'Gamification',
    description: 'Hệ thống XP, huy hiệu, streak và bảng xếp hạng tạo động lực học.',
  },
  {
    icon: Shield,
    title: 'Sandbox an toàn',
    description: 'Môi trường thực thi code cách ly, an toàn cho học sinh thử nghiệm.',
  },
];

const teamMembers = [
  {
    name: 'Đội ngũ phát triển',
    role: 'Full-stack Development',
    description: 'Xây dựng nền tảng với công nghệ hiện đại nhất.',
  },
  {
    name: 'Đội ngũ nội dung',
    role: 'Content & Curriculum',
    description: 'Biên soạn bài học theo chuẩn SGK Cánh Diều.',
  },
  {
    name: 'Đội ngũ AI',
    role: 'AI & Machine Learning',
    description: 'Phát triển PyMate - trợ lý AI thông minh.',
  },
];

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/20'
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/20'
          }`}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10'
                : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/20 shadow-xl'
            } backdrop-blur-xl`}
          >
            <Globe
              className={`w-10 h-10 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
          </motion.div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Về{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Python Master 12
            </span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Nền tảng học lập trình Python trực tuyến dành cho học sinh lớp 12 Việt Nam,
            bám sát chương trình sách giáo khoa Cánh Diều.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div
            className={`p-8 rounded-2xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10'
                : 'bg-white/70 border border-white/20 shadow-lg'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target
                className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              />
              <h2
                className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Sứ mệnh
              </h2>
            </div>
            <p
              className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Python Master 12 ra đời với mục tiêu giúp học sinh lớp 12 Việt Nam tiếp cận
              lập trình Python một cách dễ dàng, hiệu quả và thú vị. Chúng tôi tin rằng
              mỗi học sinh đều có thể trở thành lập trình viên giỏi khi được hướng dẫn
              đúng cách. Với sự kết hợp giữa công nghệ AI, gamification và nội dung chất
              lượng, chúng tôi mong muốn tạo ra một môi trường học tập tương tác, nơi các
              em có thể tự tin khám phá thế giới lập trình.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2
            className={`text-2xl font-bold mb-8 text-center ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Tính năng nổi bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`p-6 rounded-xl backdrop-blur-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-white/70 border border-white/20 hover:bg-white/90 shadow-md'
                } transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                      : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                  }`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2
            className={`text-2xl font-bold mb-8 text-center ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Đội ngũ
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`p-6 rounded-xl text-center backdrop-blur-xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white/70 border border-white/20 shadow-md'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                      : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                  }`}
                >
                  <Users
                    className={`w-8 h-8 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {member.role}
                </p>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`p-8 rounded-2xl text-center backdrop-blur-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10'
              : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-white/20 shadow-lg'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Bạn có câu hỏi?
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Liên hệ với chúng tôi qua email: support@pymaster12.com
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Xem câu hỏi thường gặp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
