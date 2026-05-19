'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Bắt đầu hành trình ngay hôm nay
          </motion.div>
          
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Sẵn Sàng Chinh Phục{' '}
            <span className="text-yellow-300">Python?</span>
          </motion.h2>
          
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Tham gia cùng hàng nghìn học sinh đang học lập trình Python theo chương trình Cánh Diều. Không cần kinh nghiệm — chỉ cần đam mê và quyết tâm.
          </motion.p>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Học Miễn Phí Ngay
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/tutor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Thử AI Tutor
            </a>
          </motion.div>
          
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-8 text-white/60 text-sm"
          >
            Không cần thẻ tín dụng. Hủy bất cứ lúc nào.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
