'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

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
  {
    question: 'Flashcard và Spaced Repetition là gì?',
    answer: 'Flashcard là thẻ ghi nhớ giúp bạn ôn tập kiến thức. Hệ thống sử dụng thuật toán SM-2 (Spaced Repetition) để lên lịch ôn tập thông minh - những thẻ bạn nhớ tốt sẽ xuất hiện ít hơn, thẻ khó sẽ xuất hiện thường xuyên hơn.',
  },
  {
    question: 'Streak hoạt động như thế nào?',
    answer: 'Streak đếm số ngày liên tiếp bạn hoàn thành ít nhất một bài học hoặc bài tập. Duy trì streak giúp bạn xây dựng thói quen học tập đều đặn. Bạn sẽ nhận huy hiệu đặc biệt khi đạt streak 7, 30, 100 ngày.',
  },
  {
    question: 'Làm sao để liên hệ hỗ trợ?',
    answer: 'Bạn có thể liên hệ đội ngũ hỗ trợ qua email support@pymaster12.com. Chúng tôi sẽ phản hồi trong vòng 48 giờ làm việc. Ngoài ra, PyMate (AI Tutor) có thể hỗ trợ bạn 24/7 với các câu hỏi về bài học.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            theme === 'dark' ? 'bg-green-500/10' : 'bg-green-500/20'
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
          }`}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10'
                : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/20 shadow-xl'
            } backdrop-blur-xl`}
          >
            <HelpCircle
              className={`w-10 h-10 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}
            />
          </motion.div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Câu Hỏi{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Thường Gặp
            </span>
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Giải đáp những thắc mắc phổ biến về Python Master 12
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className={`rounded-xl overflow-hidden border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                  : 'bg-white/70 border-white/20 hover:bg-white/90 shadow-sm'
              } backdrop-blur-xl transition-all duration-300`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
              >
                <span
                  className={`text-base font-medium pr-4 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  />
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
                    <div className="px-6 pb-5 pt-0">
                      <p
                        className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-12 p-8 rounded-2xl text-center backdrop-blur-xl ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/70 border border-white/20 shadow-lg'
          }`}
        >
          <MessageCircle
            className={`w-8 h-8 mx-auto mb-3 ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}
          />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Không tìm thấy câu trả lời?
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Liên hệ đội ngũ hỗ trợ hoặc hỏi PyMate - AI Tutor của chúng tôi.
          </p>
          <a
            href="/ai-tutor"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Hỏi PyMate
          </a>
        </motion.div>
      </div>
    </div>
  );
}
