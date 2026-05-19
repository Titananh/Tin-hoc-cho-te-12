'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Python Master 12 dành cho ai?',
    answer: 'Python Master 12 được thiết kế dành riêng cho học sinh lớp 12 Việt Nam đang học môn Tin học theo sách giáo khoa Cánh Diều. Nội dung bám sát chương trình SGK, giúp các em vừa học tốt trên lớp vừa chuẩn bị cho kỳ thi.',
  },
  {
    question: 'Tôi chưa biết gì về lập trình, có học được không?',
    answer: 'Hoàn toàn được! Lộ trình bắt đầu từ cấp độ 1 - Giới thiệu Python, hướng dẫn từ cách cài đặt đến viết chương trình đầu tiên. Mỗi bài học đều có ví dụ minh họa và bài tập thực hành từ dễ đến khó.',
  },
  {
    question: 'AI Tutor (PyMate) hoạt động như thế nào?',
    answer: 'PyMate là trợ lý AI hỗ trợ 24/7, giúp giải thích bài học, gợi ý khi gặp khó khăn, và debug code. PyMate trả lời bằng tiếng Việt, phù hợp với chương trình Cánh Diều. Lưu ý: PyMate sẽ hướng dẫn cách giải chứ không đưa đáp án trực tiếp.',
  },
  {
    question: 'Có cần cài đặt phần mềm gì không?',
    answer: 'Không cần! Python Master 12 có trình soạn thảo code trực tuyến (Monaco Editor) tích hợp sẵn. Bạn có thể viết và chạy code Python ngay trên trình duyệt mà không cần cài đặt bất kỳ phần mềm nào.',
  },
  {
    question: 'Hệ thống chấm điểm tự động hoạt động ra sao?',
    answer: 'Khi bạn nộp bài tập, hệ thống sẽ chạy code của bạn qua các test case (bộ kiểm thử) và so sánh kết quả. Điểm được tính theo tỷ lệ test case đạt. Bạn có thể nộp lại không giới hạn để cải thiện điểm số.',
  },
  {
    question: 'Có chứng chỉ khi hoàn thành không?',
    answer: 'Có! Khi hoàn thành mỗi cấp độ hoặc toàn bộ khóa học, bạn sẽ nhận được chứng chỉ điện tử có mã QR xác thực. Chứng chỉ có thể chia sẻ trên mạng xã hội hoặc đính kèm hồ sơ học tập.',
  },
  {
    question: 'Nền tảng có miễn phí không?',
    answer: 'Python Master 12 cung cấp các bài học cơ bản miễn phí. Gói Premium mở khóa toàn bộ nội dung, AI Tutor không giới hạn, dự án thực tế, và nhiều tính năng nâng cao khác.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="text-center mb-16"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            Câu Hỏi Thường Gặp
          </motion.span>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Giải Đáp{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Thắc Mắc
            </span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Những câu hỏi phổ biến về nền tảng Python Master 12
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
