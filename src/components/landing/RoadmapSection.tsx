'use client';

import { motion } from 'framer-motion';
import { Code2, Hash, GitBranch, Braces, Type, ListOrdered, BookOpen, FileText, Boxes, Cpu } from 'lucide-react';

const roadmapLevels = [
  {
    level: 1,
    title: 'Giới thiệu Python',
    description: 'Làm quen với ngôn ngữ lập trình Python, cài đặt môi trường và viết chương trình đầu tiên.',
    icon: Code2,
    topics: ['Cài đặt Python', 'IDLE & VS Code', 'print()', 'Chương trình đầu tiên'],
    color: 'from-green-400 to-emerald-500',
  },
  {
    level: 2,
    title: 'Kiểu dữ liệu và biến',
    description: 'Tìm hiểu các kiểu dữ liệu cơ bản, khai báo biến và các phép toán trong Python.',
    icon: Hash,
    topics: ['int, float, str, bool', 'Khai báo biến', 'Phép toán', 'Ép kiểu dữ liệu'],
    color: 'from-blue-400 to-cyan-500',
  },
  {
    level: 3,
    title: 'Cấu trúc điều khiển',
    description: 'Học cách sử dụng câu lệnh điều kiện và vòng lặp để điều khiển luồng chương trình.',
    icon: GitBranch,
    topics: ['if/elif/else', 'Vòng lặp for', 'Vòng lặp while', 'break & continue'],
    color: 'from-purple-400 to-pink-500',
  },
  {
    level: 4,
    title: 'Hàm và module',
    description: 'Xây dựng hàm, truyền tham số, giá trị trả về và sử dụng module có sẵn.',
    icon: Braces,
    topics: ['Định nghĩa hàm', 'Tham số & return', 'Module & import', 'Hàm đệ quy'],
    color: 'from-orange-400 to-red-500',
  },
  {
    level: 5,
    title: 'Chuỗi và xử lý văn bản',
    description: 'Thao tác với chuỗi ký tự, các phương thức xử lý chuỗi và định dạng văn bản.',
    icon: Type,
    topics: ['Cắt chuỗi', 'Phương thức chuỗi', 'f-string', 'Biểu thức chính quy'],
    color: 'from-yellow-400 to-amber-500',
  },
  {
    level: 6,
    title: 'Danh sách và tuple',
    description: 'Làm việc với danh sách (list) và tuple, các phương thức và kỹ thuật xử lý.',
    icon: ListOrdered,
    topics: ['List & Tuple', 'Thêm/xóa phần tử', 'List comprehension', 'Sắp xếp & tìm kiếm'],
    color: 'from-teal-400 to-cyan-500',
  },
  {
    level: 7,
    title: 'Từ điển và tập hợp',
    description: 'Sử dụng dictionary và set để lưu trữ và xử lý dữ liệu hiệu quả.',
    icon: BookOpen,
    topics: ['Dictionary', 'Set', 'Phương thức dict', 'Duyệt & lọc dữ liệu'],
    color: 'from-indigo-400 to-violet-500',
  },
  {
    level: 8,
    title: 'Xử lý file',
    description: 'Đọc, ghi file văn bản và CSV, xử lý ngoại lệ khi làm việc với file.',
    icon: FileText,
    topics: ['Đọc file', 'Ghi file', 'File CSV', 'try/except'],
    color: 'from-rose-400 to-pink-500',
  },
  {
    level: 9,
    title: 'Lập trình hướng đối tượng',
    description: 'Tìm hiểu OOP với class, object, kế thừa và đa hình trong Python.',
    icon: Boxes,
    topics: ['Class & Object', 'Kế thừa', 'Đa hình', 'Đóng gói'],
    color: 'from-fuchsia-400 to-purple-500',
  },
  {
    level: 10,
    title: 'Thuật toán và dự án tổng hợp',
    description: 'Áp dụng kiến thức vào thuật toán và hoàn thành dự án thực tế tổng hợp.',
    icon: Cpu,
    topics: ['Thuật toán sắp xếp', 'Thuật toán tìm kiếm', 'Dự án mini', 'Ôn thi đại học'],
    color: 'from-amber-400 to-orange-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function RoadmapSection() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4"
          >
            Lộ Trình Học
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            10 Cấp Độ Theo{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sách Cánh Diều
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Lộ trình học có hệ thống từ cơ bản đến nâng cao, bám sát chương trình Tin học 12 Cánh Diều.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-400 via-purple-400 via-orange-400 to-amber-400 hidden md:block" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-8 md:space-y-0"
          >
            {roadmapLevels.map((level, index) => (
              <motion.div
                key={level.level}
                variants={itemVariants}
                className={`relative md:flex md:items-center md:justify-between md:mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${level.color}`}>
                        <level.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Cấp độ {level.level}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {level.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {level.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {level.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {level.level}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="md:w-5/12" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
