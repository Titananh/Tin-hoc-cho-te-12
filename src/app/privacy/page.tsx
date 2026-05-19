'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import {
  Shield,
  ChevronDown,
  ChevronUp,
  Lock,
  Database,
  Share2,
  FileText,
  Cookie,
  Mail,
  Eye,
  Edit3,
  Trash2,
  Download,
  Scale,
} from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  icon: typeof Shield;
  children: React.ReactNode;
  index: number;
}

function PolicySection({ id, title, icon: Icon, children, index }: SectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-white/5 border border-white/10 hover:bg-white/10'
            : 'bg-white/70 border border-white/20 hover:bg-white/90 shadow-lg'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
            }`}
          >
            <Icon
              className={`w-6 h-6 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
          </div>
          <h2
            className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {title}
          </h2>
        </div>
        {isOpen ? (
          <ChevronUp
            className={`w-5 h-5 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          />
        ) : (
          <ChevronDown
            className={`w-5 h-5 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`p-6 rounded-b-2xl backdrop-blur-xl ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 border-t-0'
                  : 'bg-white/50 border border-white/20 border-t-0 shadow-lg'
              }`}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div className="mb-4 last:mb-0">
      <h3
        className={`font-medium mb-2 ${
          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
        }`}
      >
        {title}
      </h3>
      <div
        className={`text-sm leading-relaxed ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  const { theme } = useTheme();

  const lastUpdated = '17 Tháng 5, 2026';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}
    >
      {/* Decorative Background Elements */}
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
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10'
                : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/20 shadow-xl'
            } backdrop-blur-xl`}
          >
            <Shield
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
            Chính sách bảo mật
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            } mb-2`}
          >
            Python Master 12
          </p>
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}
          >
            Cập nhật lần cuối: {lastUpdated}
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-2">
          {/* 1. Giới thiệu */}
          <PolicySection
            id="introduction"
            title="1. Giới thiệu"
            icon={FileText}
            index={0}
          >
            <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Chính sách bảo mật này được xây dựng nhằm đảm bảo quyền riêng tư và bảo vệ thông tin cá nhân của người dùng khi sử dụng nền tảng Python Master 12. Chúng tôi cam kết tuân thủ các quy định hiện hành về bảo vệ dữ liệu cá nhân và luôn đặt quyền lợi của người dùng lên hàng đầu.
            </p>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Mục đích của chính sách này là giúp bạn hiểu rõ về các loại thông tin chúng tôi thu thập, cách chúng tôi sử dụng, lưu trữ và bảo vệ dữ liệu của bạn, cũng như các quyền lợi mà bạn có liên quan đến dữ liệu cá nhân của mình.
            </p>
          </PolicySection>

          {/* 2. Thông tin chúng tôi thu thập */}
          <PolicySection
            id="information-collected"
            title="2. Thông tin chúng tôi thu thập"
            icon={Database}
            index={1}
          >
            <SubSection title="2.1. Thông tin cá nhân">
              <p className="mb-2">
                Chúng tôi thu thập các thông tin cá nhân mà bạn trực tiếp cung cấp cho chúng tôi, bao gồm:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Họ và tên đầy đủ</li>
                <li>Địa chỉ email đăng ký</li>
                <li>Ảnh đại diện (avatar) do bạn tải lên</li>
                <li>Thông tin tài khoản mạng xã hội (nếu đăng nhập qua OAuth)</li>
              </ul>
            </SubSection>

            <SubSection title="2.2. Dữ liệu học tập">
              <p className="mb-2">
                Để cung cấp trải nghiệm học tập cá nhân hóa, chúng tôi thu thập và xử lý:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tiến độ học tập (progress) trên nền tảng</li>
                <li>Điểm kinh nghiệm (XP) và cấp bậc người dùng</li>
                <li>Thông tin về huy hiệu (badges) đã đạt được</li>
                <li>Lịch sử bài học và bài kiểm tra đã hoàn thành</li>
                <li>Kết quả luyện tập và bài tập thực hành</li>
              </ul>
            </SubSection>

            <SubSection title="2.3. Cookie Data">
              <p>
                Chúng tôi sử dụng cookie và các công nghệ theo dõi tương tự để thu thập thông tin về cách bạn tương tác với nền tảng. Chi tiết về cookie được mô tả trong phần 7 của chính sách này.
              </p>
            </SubSection>
          </PolicySection>

          {/* 3. Cách chúng tôi sử dụng thông tin */}
          <PolicySection
            id="how-we-use"
            title="3. Cách chúng tôi sử dụng thông tin"
            icon={Eye}
            index={2}
          >
            <SubSection title="3.1. Cải thiện trải nghiệm người dùng">
              <p>
                Chúng tôi sử dụng dữ liệu của bạn để phân tích xu hướng sử dụng, xác định các vấn đề kỹ thuật và liên tục cải thiện hiệu suất cũng như chức năng của nền tảng Python Master 12, nhằm mang lại trải nghiệm tốt nhất cho người dùng.
              </p>
            </SubSection>

            <SubSection title="3.2. Cá nhân hóa quá trình học tập">
              <p className="mb-2">
                Dữ liệu học tập được sử dụng để:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Đề xuất nội dung phù hợp với trình độ của bạn</li>
                <li>Tạo lộ trình học tập cá nhân hóa dựa trên mục tiêu của bạn</li>
                <li>Theo dõi và hiển thị tiến độ học tập của bạn</li>
                <li>Gợi ý các bài học hoặc bài tập cần cải thiện</li>
              </ul>
            </SubSection>

            <SubSection title="3.3. Gửi thông báo và cập nhật">
              <p>
                Chúng tôi có thể sử dụng địa chỉ email của bạn để gửi các thông báo liên quan đến tài khoản, cập nhật về khóa học, thông báo về streak và các tính năng mới của nền tảng. Bạn có thể từ chối nhận các thông báo này bất kỳ lúc nào thông qua cài đặt tài khoản.
              </p>
            </SubSection>
          </PolicySection>

          {/* 4. Chia sẻ thông tin */}
          <PolicySection
            id="information-sharing"
            title="4. Chia sẻ thông tin"
            icon={Share2}
            index={3}
          >
            <SubSection title="4.1. Không chia sẻ với bên thứ ba">
              <p>
                Chúng tôi cam kết không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào cho mục đích tiếp thị hoặc quảng cáo. Dữ liệu của bạn được sử dụng hoàn toàn cho các mục đích nội bộ nhằm cải thiện trải nghiệm học tập trên nền tảng.
              </p>
            </SubSection>

            <SubSection title="4.2. Ngoại lệ theo quy định pháp luật">
              <p>
                Chúng tôi có thể tiết lộ thông tin cá nhân của bạn trong trường hợp được yêu cầu bởi cơ quan có thẩm quyền, khi cần thiết để tuân thủ các nghĩa vụ pháp lý, bảo vệ quyền lợi hợp pháp của chúng tôi, hoặc trong trường hợp khẩn cấp liên quan đến an toàn công cộng.
              </p>
            </SubSection>
          </PolicySection>

          {/* 5. Bảo mật dữ liệu */}
          <PolicySection
            id="data-security"
            title="5. Bảo mật dữ liệu"
            icon={Lock}
            index={4}
          >
            <SubSection title="5.1. Các biện pháp bảo mật">
              <p className="mb-2">
                Chúng tôi áp dụng nhiều biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ dữ liệu của bạn:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Mã hóa dữ liệu trong quá trình truyền tải và lưu trữ</li>
                <li>Sử dụng tường lửa và hệ thống phát hiện xâm nhập</li>
                <li>Kiểm soát truy cập nghiêm ngặt cho nhân viên</li>
                <li>Thực hiện sao lưu dữ liệu định kỳ</li>
                <li>Định kỳ rà soát và cập nhật các biện pháp bảo mật</li>
              </ul>
            </SubSection>

            <SubSection title="5.2. Mã hóa dữ liệu">
              <p>
                Tất cả dữ liệu nhạy cảm được mã hóa bằng thuật toán AES-256 trong quá trình lưu trữ. Dữ liệu truyền tải giữa trình duyệt của bạn và máy chủ được bảo vệ bằng giao thức TLS 1.3, đảm bảo rằng thông tin của bạn không thể bị đánh cắp trong quá trình truyền tải.
              </p>
            </SubSection>
          </PolicySection>

          {/* 6. Quyền của bạn */}
          <PolicySection
            id="your-rights"
            title="6. Quyền của bạn"
            icon={Scale}
            index={5}
          >
            <SubSection title="6.1. Quyền truy cập, sửa đổi và xóa dữ liệu">
              <p className="mb-2">
                Bạn có các quyền sau đối với dữ liệu cá nhân của mình:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mb-2">
                <li><strong>Truy cập:</strong> Yêu cầu xem và nhận bản sao dữ liệu cá nhân của bạn</li>
                <li><strong>Sửa đổi:</strong> Yêu cầu chỉnh sửa thông tin không chính xác hoặc lỗi thời</li>
                <li><strong>Xóa:</strong> Yêu cầu xóa dữ liệu cá nhân của bạn khỏi hệ thống của chúng tôi</li>
              </ul>
              <p>
                Để thực hiện các quyền này, bạn có thể truy cập mục &quot;Cài đặt tài khoản&quot; trên nền tảng hoặc liên hệ với chúng tôi qua email được cung cấp trong phần liên hệ.
              </p>
            </SubSection>

            <SubSection title="6.2. Quyền yêu cầu xuất dữ liệu">
              <p>
                Bạn có quyền yêu cầu chúng tôi cung cấp dữ liệu cá nhân của bạn ở định dạng có thể đọc được bằng máy (JSON hoặc CSV). Chúng tôi sẽ đáp ứng yêu cầu này trong vòng 30 ngày làm việc kể từ ngày nhận được yêu cầu hợp lệ.
              </p>
            </SubSection>
          </PolicySection>

          {/* 7. Cookie Policy */}
          <PolicySection
            id="cookie-policy"
            title="7. Cookie Policy"
            icon={Cookie}
            index={6}
          >
            <SubSection title="7.1. Các loại cookie chúng tôi sử dụng">
              <ul className="space-y-2">
                <li className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Cookie cần thiết:</strong>
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}> Giúp nền tảng hoạt động đúng cách, bao gồm xác thực người dùng và duy trì phiên làm việc.</span>
                </li>
                <li className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Cookie phân tích:</strong>
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}> Giúp chúng tôi hiểu cách người dùng tương tác với nền tảng để cải thiện dịch vụ.</span>
                </li>
                <li className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Cookie chức năng:</strong>
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}> Ghi nhớ các tùy chọn của bạn như ngôn ngữ và cài đặt hiển thị.</span>
                </li>
              </ul>
            </SubSection>

            <SubSection title="7.2. Cách từ chối cookie">
              <p className="mb-2">
                Bạn có thể từ chối cookie thông qua:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Cài đặt trình duyệt để từ chối tất cả hoặc một số cookie</li>
                <li>Sử dụng tính năng &quot;Do Not Track&quot; trong trình duyệt của bạn</li>
                <li>Xóa cookie đã lưu từ cài đặt trình duyệt</li>
              </ul>
              <p className="mt-2">
                Lưu ý: Việc từ chối cookie có thể ảnh hưởng đến một số chức năng của nền tảng.
              </p>
            </SubSection>
          </PolicySection>

          {/* 8. Thay đổi chính sách */}
          <PolicySection
            id="policy-changes"
            title="8. Thay đổi chính sách"
            icon={Edit3}
            index={7}
          >
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Chúng tôi có thể cập nhật Chính sách bảo mật này theo thời gian để phản ánh các thay đổi trong thực tiễn bảo mật dữ liệu hoặc yêu cầu pháp lý. Mọi thay đổi quan trọng sẽ được thông báo trước qua email hoặc thông báo nổi bật trên nền tảng ít nhất 30 ngày trước khi có hiệu lực.
            </p>
            <p className={`text-sm leading-relaxed mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Chúng tôi khuyến khích bạn định kỳ xem lại chính sách này để cập nhật những thay đổi mới nhất.
            </p>
          </PolicySection>

          {/* 9. Liên hệ */}
          <PolicySection
            id="contact"
            title="9. Liên hệ"
            icon={Mail}
            index={8}
          >
            <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Nếu bạn có bất kỳ câu hỏi, mối lo ngại hoặc yêu cầu nào liên quan đến Chính sách bảo mật này hoặc việc xử lý dữ liệu cá nhân của bạn, vui lòng liên hệ với chúng tôi qua:
            </p>
            <div
              className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <p className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Bộ phận Bảo mật Dữ liệu - Python Master 12
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Email: privacy@pymaster12.com
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Thời gian phản hồi: Trong vòng 48 giờ làm việc
              </p>
            </div>
          </PolicySection>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className={`mt-12 p-6 rounded-2xl text-center ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/70 border border-white/20 shadow-lg'
          } backdrop-blur-xl`}
        >
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Bằng việc sử dụng nền tảng Python Master 12, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý với các điều khoản được nêu trong Chính sách bảo mật này.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`fixed bottom-6 right-6 p-4 rounded-2xl backdrop-blur-xl ${
            theme === 'dark'
              ? 'bg-slate-800/90 border border-white/10'
              : 'bg-white/90 border border-white/20 shadow-xl'
          }`}
        >
          <p className={`text-xs font-medium mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Điều hướng nhanh
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Giới thiệu', id: 'introduction' },
              { label: 'Thu thập', id: 'information-collected' },
              { label: 'Sử dụng', id: 'how-we-use' },
              { label: 'Chia sẻ', id: 'information-sharing' },
              { label: 'Bảo mật', id: 'data-security' },
              { label: 'Quyền', id: 'your-rights' },
              { label: 'Cookie', id: 'cookie-policy' },
              { label: 'Liên hệ', id: 'contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-xs transition-colors hover:${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                } ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      </div>
    </div>
  );
}