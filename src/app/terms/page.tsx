'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { FileText, Shield, User, CheckCircle, Copyright, CreditCard, AlertTriangle, XCircle, Scale, Mail } from 'lucide-react';

interface SectionProps {
  icon: React.ElementType;
  title: string;
  content: string[];
  index: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function Section({ icon: Icon, title, content, index }: SectionProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/30">
        {/* Gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Phần {index}</span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <ul className="space-y-3">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function TermsPage() {
  const { theme } = useTheme();

  const sections = [
    {
      icon: FileText,
      title: '1. Giới thiệu',
      content: [
        'Điều khoản sử dụng này ("Điều khoản") quy định các điều kiện và điều khoản áp dụng cho việc sử dụng nền tảng Python Master 12 ("Nền tảng") do chúng tôi cung cấp.',
        'Bằng việc truy cập, đăng ký hoặc sử dụng bất kỳ phần nào của Nền tảng, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản này.',
        'Nếu bạn không đồng ý với bất kỳ phần nào của Điều khoản, vui lòng không sử dụng Nền tảng.',
        'Điều khoản này áp dụng cho tất cả người dùng, bao gồm người dùng miễn phí và người dùng trả phí.',
      ],
    },
    {
      icon: Shield,
      title: '2. Dịch vụ của chúng tôi',
      content: [
        'Python Master 12 là nền tảng giáo dục lập trình Python trực tuyến, cung cấp các khóa học tương tác, bài tập thực hành và tính năng hỗ trợ học tập.',
        'Các tính năng chính bao gồm: khóa học tương tác với code editor trực tuyến, AI tutor hỗ trợ 24/7, hệ thống thử thách lập trình,追踪 tiến độ học tập, và chứng chỉ hoàn thành.',
        'Chúng tôi cam kết cung cấp nội dung chất lượng cao và cập nhật liên tục để đảm bảo người dùng tiếp cận kiến thức mới nhất.',
        'Chúng tôi reserved the right to modify, suspend, or discontinue any part of the Service at any time without prior notice.',
      ],
    },
    {
      icon: User,
      title: '3. Tài khoản người dùng',
      content: [
        'Để sử dụng một số tính năng nhất định, bạn cần đăng ký tài khoản với thông tin chính xác và đầy đủ.',
        'Bạn chịu trách nhiệm bảo mật thông tin tài khoản, bao gồm mật khẩu và mã xác thực. Mọi hoạt động dưới tài khoản của bạn đều là trách nhiệm của bạn.',
        'Bạn cam kết thông báo ngay cho chúng tôi qua email: support@pythonmaster12.com nếu phát hiện bất kỳ việc sử dụng trái phép nào của tài khoản.',
        'Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài khoản nếu phát hiện thông tin sai lệch hoặc vi phạm Điều khoản.',
      ],
    },
    {
      icon: CheckCircle,
      title: '4. Sử dụng hợp lệ',
      content: [
        'Quyền của người dùng: Bạn có quyền truy cập và sử dụng Nền tảng cho mục đích học tập cá nhân, tuân thủ các Điều khoản này.',
        'Nghĩa vụ của người dùng: Bạn cam kết sử dụng Nền tảng một cách có trách nhiệm, không gây gián đoạn hoạt động của Nền tảng.',
        'Hành vi cấm: Nghiêm cấm sử dụng Nền tảng cho bất kỳ mục đích bất hợp pháp, bao gồm nhưng không giới hạn: phát tán mã độc, tấn công hacker, hoặc vi phạm quyền sở hữu trí tuệ của người khác.',
        'Nghiêm cấm chia sẻ tài khoản, sao chép nội dung khóa học để phân phối thương mại, hoặc sử dụng automated tools để truy cập trái phép.',
      ],
    },
    {
      icon: Copyright,
      title: '5. Sở hữu trí tuệ',
      content: [
        'Quyền sở hữu nội dung: Tất cả nội dung trên Nền tảng, bao gồm văn bản, hình ảnh, video, mã nguồn, và tài liệu học tập, thuộc sở hữu của Python Master 12 hoặc các bên cấp phép.',
        'Nhãn hiệu: Tên "Python Master 12" và các logo liên quan là nhãn hiệu đã đăng ký của chúng tôi.',
        'License sử dụng: Chúng tôi cấp cho bạn license không độc quyền, có thể thu hồi để sử dụng nội dung Nền tảng cho mục đích học tập cá nhân.',
        'Bạn không được phép sao chép, phân phối, hoặc tạo ra các tác phẩm ph Derivative từ nội dung Nền tảng mà không có sự đồng ý bằng văn bản của chúng tôi.',
      ],
    },
    {
      icon: CreditCard,
      title: '6. Thanh toán',
      content: [
        'Phương thức thanh toán: Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ (Visa, Mastercard), chuyển khoản ngân hàng, và các cổng thanh toán điện tử được hỗ trợ.',
        'Giá cả: Giá dịch vụ được hiển thị rõ ràng trên Nền tảng. Chúng tôi reserved quyền thay đổi giá cả vào bất kỳ lúc nào với thông báo trước 30 ngày.',
        'Chính sách hoàn tiền: Nếu bạn không hài lòng với dịch vụ, bạn có thể yêu cầu hoàn tiền trong vòng 30 ngày kể từ ngày đăng ký. Quyết định hoàn tiền sẽ được xử lý trong vòng 7-14 ngày làm việc.',
        'Thanh toán định kỳ: Đối với các gói đăng ký theo tháng/năm, thanh toán sẽ được tự động gia hạn trừ khi bạn hủy trước kỳ thanh toán tiếp theo.',
      ],
    },
    {
      icon: AlertTriangle,
      title: '7. Giới hạn trách nhiệm',
      content: [
        'Nền tảng được cung cấp "như hiện tại" và "như có sẵn" mà không có bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý.',
        'Chúng tôi không bảo đảm rằng Nền tảng sẽ không bị gián đoạn, an toàn hoặc không có lỗi. Mọi rủi ro về chất lượng, hiệu suất và độ chính xác thuộc về bạn.',
        'Trong phạm vi tối đa được pháp luật cho phép, chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng Nền tảng, bao gồm nhưng không giới hạn thiệt hại gián tiếp, đặc biệt, ngẫu nhiên hoặc mang tính chất buộc tội.',
        'Tổng trách nhiệm của chúng tôi đối với bạn, cho dù trong hợp đồng, sơ suất hay trách nhiệm khác, không vượt quá số tiền bạn đã thanh toán cho chúng tôi trong 12 tháng trước khi xảy ra khiếu nại.',
      ],
    },
    {
      icon: XCircle,
      title: '8. Bồi thường',
      content: [
        'Bạn đồng ý bồi thường, bảo vệ và giữ cho chúng tôi, các giám đốc, nhân viên và đối tác không bị tổn thương trước bất kỳ khiếu nại, yêu cầu, thiệt hại hoặc chi phí nào phát sinh từ việc bạn vi phạm Điều khoản này.',
        'Bạn chịu trách nhiệm thanh toán các chi phí pháp lý do vi phạm Điều khoản gây ra cho chúng tôi.',
        'Chúng tôi có quyền tham gia bảo vệ và kiểm soát mọi vấn đề liên quan đến bồi thường, và bạn cam kết hợp tác đầy đủ trong quá trình đó.',
      ],
    },
    {
      icon: XCircle,
      title: '9. Chấm dứt dịch vụ',
      content: [
        'Chấm dứt bởi người dùng: Bạn có thể chấm dứt tài khoản và ngừng sử dụng Nền tảng bất kỳ lúc nào thông qua cài đặt tài khoản hoặc liên hệ hỗ trợ.',
        'Chấm dứt bởi chúng tôi: Chúng tôi có quyền chấm dứt hoặc tạm ngừng quyền truy cập của bạn vào Nền tảng ngay lập tức nếu bạn vi phạm Điều khoản hoặc có hành vi gây hại cho Nền tảng.',
        'Hậu quả của việc chấm dứt: Khi tài khoản bị chấm dứt, bạn sẽ mất quyền truy cập vào tất cả nội dung và dữ liệu. Chúng tôi không có nghĩa vụ cung cấp hoặc chuyển giao bất kỳ nội dung nào.',
        'Các điều khoản liên quan đến thanh toán, giới hạn trách nhiệm và bồi thường sẽ tiếp tục có hiệu lực sau khi chấm dứt.',
      ],
    },
    {
      icon: FileText,
      title: '10. Thay đổi điều khoản',
      content: [
        'Chúng tôi reserved quyền cập nhật hoặc sửa đổi Điều khoản này vào bất kỳ lúc nào theo quyết định riêng của mình.',
        'Khi có thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc thông báo nổi bật trên Nền tảng trước khi thay đổi có hiệu lực.',
        'Bằng việc tiếp tục sử dụng Nền tảng sau khi Điều khoản được cập nhật, bạn đồng ý với các thay đổi đó.',
        'Nếu bạn không đồng ý với các thay đổi, bạn phải ngừng sử dụng Nền tảng và yêu cầu chấm dứt tài khoản.',
      ],
    },
    {
      icon: Scale,
      title: '11. Luật áp dụng',
      content: [
        'Điều khoản này được điều chỉnh và giải thích theo pháp luật Việt Nam.',
        'Mọi tranh chấp phát sinh từ hoặc liên quan đến Điều khoản này sẽ được giải quyết trước tiên thông qua đàm phán thiện chí giữa các bên.',
        'Nếu không thể giải quyết bằng đàm phán trong vòng 30 ngày, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại Việt Nam.',
        'Điều khoản này constitutes toàn bộ thỏa thuận giữa bạn và chúng tôi liên quan đến việc sử dụng Nền tảng và thay thế mọi thỏa thuận trước đó.',
      ],
    },
    {
      icon: Mail,
      title: '12. Liên hệ',
      content: [
        'Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về Điều khoản này, vui lòng liên hệ với chúng tôi qua: Email: support@pythonmaster12.com',
        'Hoặc qua địa chỉ bưu chính: Công ty TNHH Python Master 12, Tầng 10, Tòa nhà ABC, 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh, Việt Nam.',
        'Chúng tôi cam kết phản hồi trong vòng 48 giờ làm việc.',
        'Điều khoản có hiệu lực từ ngày: 17 tháng 5 năm 2026.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Điều khoản sử dụng
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Cập nhật lần cuối: <span className="font-medium text-blue-600 dark:text-blue-400">17 tháng 5 năm 2026</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6"
          >
            {sections.map((section, index) => (
              <Section
                key={index}
                icon={section.icon}
                title={section.title}
                content={section.content}
                index={index + 1}
              />
            ))}
          </motion.div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 rounded-xl px-6 py-4 border border-blue-500/20 dark:border-blue-400/20">
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Bằng việc sử dụng Python Master 12, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý với các 
                <span className="font-medium text-blue-600 dark:text-blue-400"> Điều khoản sử dụng </span> 
                này.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
