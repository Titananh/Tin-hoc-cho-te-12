'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Python Master 12 có miễn phí không?',
    answer: 'Có! Bạn có thể học miễn phí toàn bộ khóa học từ cơ bản đến nâng cao.',
  },
  {
    question: 'Tôi chưa biết gì về lập trình, có học được không?',
    answer: 'Hoàn toàn có! Khóa học được thiết kế dành cho người mới bắt đầu với ngôn ngữ đơn giản, dễ hiểu.',
  },
  {
    question: 'Học xong có chứng chỉ không?',
    answer: 'Có! Khi hoàn thành toàn bộ khóa học, bạn sẽ nhận được chứng chỉ Python Master 12.',
  },
  {
    question: 'AI Tutor PyMate là gì?',
    answer: 'PyMate là trợ lý AI giúp bạn giải đáp thắc mắc, gợi ý code, và hỗ trợ debug lỗi 24/7.',
  },
  {
    question: 'Tôi có thể học trên điện thoại không?',
    answer: 'Có! Website hoàn toàn responsive, bạn có thể học trên máy tính, tablet và điện thoại.',
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
          aria-expanded={isOpen}
        >
          <span className="font-semibold text-foreground pr-4">{item.question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pt-0">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                <p className="text-muted leading-relaxed">{item.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted">Câu hỏi thường gặp</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Giải đáp thắc mắc</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Tìm hiểu những câu hỏi phổ biến nhất về khóa học Python Master 12
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
          <div className="absolute -top-5 right-1/4 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}