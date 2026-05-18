'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accessibility,
  Target,
  Shield,
  Keyboard,
  Image,
  Tag,
  Navigation,
  Type,
  Palette,
  Video,
  AlertTriangle,
  RefreshCw,
  Mail,
  Clock,
  CheckCircle2
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <motion.div
      variants={item}
      className="glass rounded-2xl border border-border p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="text-sm text-muted-foreground space-y-3">
        {children}
      </div>
    </motion.div>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  available: boolean;
}

function FeatureItem({ icon, title, description, available }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/50">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        available ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground">{title}</p>
          {available ? (
            <CheckCircle2 className="w-4 h-4 text-success" />
          ) : (
            <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">Sắp ra mắt</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}

interface LimitationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function LimitationItem({ icon, title, description }: LimitationItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-warning/5 border border-warning/20">
      <div className="w-8 h-8 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}

interface ComplianceBadgeProps {
  icon: React.ReactNode;
  title: string;
  level: string;
  description: string;
}

function ComplianceBadge({ icon, title, level, description }: ComplianceBadgeProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{title}</p>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {level}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-4 mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl gradient-bg items-center justify-center mb-4">
            <Accessibility className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Tuyên bố về khả năng tiếp cận</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết đảm bảo rằng trang web Python Master 12 có thể tiếp cận được 
            bởi tất cả người dùng, bao gồm những người có khuyết tật.
          </p>
        </motion.div>

        {/* 1. Cam kết của chúng tôi */}
        <Section icon={<Target className="w-5 h-5" />} title="1. Cam kết của chúng tôi">
          <p>
            <strong className="text-foreground">Mục tiêu tiếp cận cho tất cả:</strong> Chúng tôi 
            tin rằng giáo dục nên có sẵn cho mọi người. Python Master 12 cam kết tạo ra 
            một môi trường học tập mà bất kỳ ai cũng có thể tham gia, bất kể khả năng 
            thể chất hoặc nhận thức.
          </p>
          <p>
            Chúng tôi liên tục cố gắng cải thiện khả năng tiếp cận của trang web và 
            cam kết làm cho nội dung của chúng tôi có thể tiếp cận được với tất cả 
            người dùng.
          </p>
        </Section>

        {/* 2. Tiêu chuẩn tuân thủ */}
        <Section icon={<Shield className="w-5 h-5" />} title="2. Tiêu chuẩn tuân thủ">
          <div className="space-y-4">
            <ComplianceBadge
              icon={<Shield className="w-6 h-6" />}
              title="WCAG 2.1"
              level="Level AA"
              description="Web Content Accessibility Guidelines - Hướng dẫn tiếp cận nội dung web được công nhận quốc tế"
            />
            <ComplianceBadge
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Section 508"
              level="Áp dụng"
              description="Đạo luật về khả năng tiếp cận của liên bang Hoa Kỳ cho các công nghệ thông tin"
            />
          </div>
          <p className="mt-4">
            Chúng tôi aim đạt được sự tuân thủ hoàn toàn với các tiêu chuẩn này và 
            đang làm việc để đảm bảo tất cả các yếu tố của trang web đáp ứng các 
            yêu cầu về khả năng tiếp cận.
          </p>
        </Section>

        {/* 3. Tính năng tiếp cận */}
        <Section icon={<CheckCircle2 className="w-5 h-5" />} title="3. Tính năng tiếp cận">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureItem
              icon={<Keyboard className="w-4 h-4" />}
              title="Hỗ trợ bàn phím"
              description="Điều hướng hoàn toàn bằng bàn phím với các phím tắt rõ ràng"
              available={true}
            />
            <FeatureItem
              icon={<Image className="w-4 h-4" />}
              title="Alt text cho hình ảnh"
              description="Tất cả hình ảnh đều có mô tả văn bản thay thế"
              available={true}
            />
            <FeatureItem
              icon={<Tag className="w-4 h-4" />}
              title="ARIA labels"
              description="Sử dụng ARIA để cải thiện khả năng tương thích với công nghệ hỗ trợ"
              available={true}
            />
            <FeatureItem
              icon={<Navigation className="w-4 h-4" />}
              title="Điều hướng rõ ràng"
              description="Cấu trúc trang logical và breadcrumb navigation"
              available={true}
            />
            <FeatureItem
              icon={<Type className="w-4 h-4" />}
              title="Font có thể đọc được"
              description="Kích thước font có thể điều chỉnh và font family rõ ràng"
              available={true}
            />
            <FeatureItem
              icon={<Palette className="w-4 h-4" />}
              title="Color contrast"
              description="Tỷ lệ tương phản màu tối thiểu 4.5:1 cho văn bản"
              available={true}
            />
          </div>
        </Section>

        {/* 4. Giới hạn hiện tại */}
        <Section icon={<AlertTriangle className="w-5 h-5" />} title="4. Giới hạn hiện tại">
          <div className="space-y-4">
            <LimitationItem
              icon={<Video className="w-4 h-4" />}
              title="Video không có phụ đề"
              description="Một số video hướng dẫn hiện tại chưa có phụ đề. Chúng tôi đang làm việc để thêm phụ đề cho tất cả các video vào cuối năm 2024."
            />
            <LimitationItem
              icon={<AlertTriangle className="w-4 h-4" />}
              title="Một số animation có thể gây khó chịu"
              description="Một số hiệu ứng animation có thể gây khó chịu cho người dùng nhạy cảm với chuyển động. Tính năng giảm chuyển động đang được phát triển."
            />
          </div>
          <p className="mt-4">
            Chúng tôi đang nỗ lực để giải quyết các hạn chế này và cập nhật tuyên bố 
            này khi các vấn đề được khắc phục.
          </p>
        </Section>

        {/* 5. Đánh giá định kỳ */}
        <Section icon={<RefreshCw className="w-5 h-5" />} title="5. Đánh giá định kỳ">
          <p>
            Chúng tôi thực hiện đánh giá khả năng tiếp cận định kỳ để đảm bảo trang 
            web luôn đáp ứng các tiêu chuẩn hiện hành:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Đánh giá nội bộ hàng tháng</li>
            <li>Kiểm tra với người dùng có khuyết tật hàng quý</li>
            <li>Cập nhật đánh giá sau mỗi lần phát hành lớn</li>
            <li>Báo cáo tiến độ hàng năm</li>
          </ul>
        </Section>

        {/* 6. Phản hồi và liên hệ */}
        <Section icon={<Mail className="w-5 h-5" />} title="6. Phản hồi và liên hệ">
          <p>
            Chúng tôi hoan nghênh phản hồi về khả năng tiếp cận của trang web. 
            Nếu bạn gặp bất kỳ vấn đề nào hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi:
          </p>
          <div className="mt-4 p-4 rounded-xl bg-surface/50 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email báo cáo vấn đề</p>
                <a 
                  href="mailto:accessibility@pythonmaster12.com" 
                  className="text-sm text-primary hover:underline"
                >
                  accessibility@pythonmaster12.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Thời gian phản hồi</p>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi cam kết phản hồi trong vòng 48 giờ làm việc
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs">
            Nếu bạn cần thông tin ở định dạng khác (PDF, audio, Braille), 
            vui lòng liên hệ và chúng tôi sẽ cố gắng đáp ứng yêu cầu.
          </p>
        </Section>

        {/* Footer note */}
        <motion.div variants={item} className="text-center text-xs text-muted-foreground">
          <p>Cập nhật lần cuối: Tháng 5, 2024</p>
          <p className="mt-1">
            Tuyên bố này được xem xét và cập nhật định kỳ để phản ánh những thay đổi 
            trong trang web và phản hồi từ người dùng.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}