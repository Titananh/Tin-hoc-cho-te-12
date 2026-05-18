"use client";

import { motion, type Variants } from "framer-motion";
import { useTheme } from "@/lib/theme";
import Link from "next/link";
import {
  Route,
  BookOpen,
  Brain,
  BarChart3,
  Award,
  Zap,
  Code2,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Route,
    title: "Học theo lộ trình",
    description: "Từ cơ bản đến nâng cao, bài bản theo chương trình lớp 12",
  },
  {
    icon: BookOpen,
    title: "Làm bài tập trực tiếp",
    description: "Hàng trăm bài tập thực hành ngay trên nền tảng",
  },
  {
    icon: Brain,
    title: "AI Tutor kèm riêng",
    description: "Trợ lý AI giải đáp 24/7, giải thích chi tiết từng bước",
  },
  {
    icon: BarChart3,
    title: "Theo dõi tiến độ",
    description: "Biểu đồ trực quan, đánh giá chính xác năng lực",
  },
  {
    icon: Award,
    title: "Nhận huy hiệu và XP",
    description: "Hệ thống thành tích, vinh danh thành tích học tập",
  },
];

const codeLines = [
  { text: 'print(', color: "text-accent" },
  { text: '"Xin chào học sinh lớp 12!"', color: "text-secondary" },
  { text: ')', color: "text-accent" },
  { text: "\n# Chương trình Python đầu tiên", color: "text-muted" },
  { text: "\nfor i in range(5):", color: "text-primary" },
  { text: '\n    print(f"Lần chạy #{i+1}")', color: "text-accent" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
          }`}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Mới: AI Tutor thông minh</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Học Python</span> từ cơ bản đến nâng cao
                <br />
                dành riêng cho{" "}
                <span className="gradient-text">học sinh lớp 12</span>
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-xl">
                Nền tảng học lập trình Python hiện đại với lộ trình bài bản,
                bài tập thực hành và trợ lý AI hỗ trợ 24/7
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white gradient-bg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
              >
                <Play className="w-5 h-5" />
                Bắt đầu học miễn phí
                <motion.span
                  className="absolute inset-0 rounded-xl bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link
                href="/learn"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold glass border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <Code2 className="w-5 h-5 text-primary" />
                Xem lộ trình học
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Code Editor */}
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass shadow-2xl">
              {/* Editor Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <div className="flex-1 text-center text-sm text-muted font-mono">
                  python-master-12.py
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 bg-surface/50 code-editor">
                <div className="space-y-1">
                  {codeLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3, duration: 0.5 }}
                      className={`${line.color} flex items-center gap-1`}
                    >
                      <span className="w-8 text-muted/50 select-none text-right">
                        {index + 1}
                      </span>
                      <span>{line.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Output */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <div className="text-sm text-muted mb-2">Output:</div>
                  <div className="space-y-1 text-accent font-semibold">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2, duration: 0.3 }}
                    >
                      Xin chào học sinh lớp 12!
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.4, duration: 0.3 }}
                    >
                      Lần chạy #1
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.6, duration: 0.3 }}
                    >
                      Lần chạy #2
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.8, duration: 0.3 }}
                    >
                      Lần chạy #3
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.0, duration: 0.3 }}
                      className="text-primary"
                    >
                      ...
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 -z-10 blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại sao chọn{" "}
              <span className="gradient-text">Python Master 12</span>?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Nền tảng được thiết kế riêng cho chương trình Tin học lớp 12,
              giúp bạn nắm vững kiến thức và kỹ năng lập trình Python
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group p-6 rounded-2xl glass hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "10K+", label: "Học sinh" },
              { value: "500+", label: "Bài tập" },
              { value: "50+", label: "Bài học" },
              { value: "24/7", label: "AI hỗ trợ" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}