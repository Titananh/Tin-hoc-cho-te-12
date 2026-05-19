/**
 * Email Service Wrapper
 * Hỗ trợ SendGrid hoặc Resend cho gửi email
 * Fallback logging trong development mode
 */

// ─── Types ───────────────────────────────────────────────────────────────────

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// ─── Configuration ───────────────────────────────────────────────────────────

const EMAIL_FROM = process.env.EMAIL_FROM || 'Python Master 12 <noreply@pythonmaster12.com>';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// ─── Core Send Function ──────────────────────────────────────────────────────

/**
 * Gửi email qua SendGrid hoặc Resend.
 * Trong development mode, chỉ log ra console.
 *
 * @param to - Địa chỉ email người nhận
 * @param subject - Tiêu đề email
 * @param html - Nội dung HTML
 * @returns true nếu gửi thành công, false nếu thất bại
 */
export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<boolean> {
  // Development fallback: log to console
  if (IS_DEVELOPMENT) {
    console.log('═══════════════════════════════════════════');
    console.log('📧 [DEV] Email gửi đi:');
    console.log(`   Đến: ${to}`);
    console.log(`   Tiêu đề: ${subject}`);
    console.log(`   Nội dung: ${html.substring(0, 200)}...`);
    console.log('═══════════════════════════════════════════');
    return true;
  }

  try {
    // Prefer Resend if configured
    if (RESEND_API_KEY) {
      return await sendViaResend(to, subject, html);
    }

    // Fallback to SendGrid
    if (SENDGRID_API_KEY) {
      return await sendViaSendGrid(to, subject, html);
    }

    console.warn('[Email] Không có API key nào được cấu hình. Email không được gửi.');
    return false;
  } catch (error) {
    console.error('[Email] Lỗi gửi email:', error);
    return false;
  }
}

// ─── Provider: Resend ────────────────────────────────────────────────────────

async function sendViaResend(to: string, subject: string, html: string): Promise<boolean> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[Resend] Lỗi:', response.status, errorBody);
    return false;
  }

  return true;
}

// ─── Provider: SendGrid ──────────────────────────────────────────────────────

async function sendViaSendGrid(to: string, subject: string, html: string): Promise<boolean> {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: EMAIL_FROM.match(/<(.+)>/)?.[1] || EMAIL_FROM },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[SendGrid] Lỗi:', response.status, errorBody);
    return false;
  }

  return true;
}

// ─── Email Templates ─────────────────────────────────────────────────────────

/**
 * Template email chào mừng người dùng mới
 */
export function getWelcomeEmailTemplate(userName: string): { subject: string; html: string } {
  return {
    subject: 'Chào mừng bạn đến với Python Master 12! 🐍',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🐍 Python Master 12</h1>
        </div>
        <h2 style="color: #1f2937;">Xin chào ${userName}! 👋</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Chào mừng bạn đến với <strong>Python Master 12</strong> - nền tảng học lập trình Python 
          dành riêng cho học sinh lớp 12!
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Bạn đã sẵn sàng bắt đầu hành trình chinh phục Python chưa? Dưới đây là những gì đang chờ bạn:
        </p>
        <ul style="color: #4b5563; line-height: 1.8;">
          <li>📚 10 cấp độ học từ cơ bản đến nâng cao</li>
          <li>💻 Trình soạn thảo code trực tuyến</li>
          <li>🤖 AI Tutor PyMate hỗ trợ 24/7</li>
          <li>🏆 Hệ thống XP, huy hiệu và bảng xếp hạng</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL || 'https://pythonmaster12.com'}/dashboard" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Bắt đầu học ngay
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 40px;">
          Python Master 12 - Học Python, chinh phục tương lai 🚀
        </p>
      </div>
    `,
  };
}

/**
 * Template email reset mật khẩu
 */
export function getPasswordResetEmailTemplate(
  userName: string,
  resetUrl: string
): { subject: string; html: string } {
  return {
    subject: 'Đặt lại mật khẩu - Python Master 12',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🐍 Python Master 12</h1>
        </div>
        <h2 style="color: #1f2937;">Đặt lại mật khẩu</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Xin chào <strong>${userName}</strong>,
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. 
          Nhấn nút bên dưới để tạo mật khẩu mới:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc2626; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Đặt lại mật khẩu
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          ⚠️ Link này sẽ hết hạn sau <strong>1 giờ</strong>. 
          Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
        </p>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 40px;">
          Python Master 12 - Học Python, chinh phục tương lai 🚀
        </p>
      </div>
    `,
  };
}

/**
 * Template email nhắc nhở streak
 */
export function getStreakReminderEmailTemplate(
  userName: string,
  currentStreak: number
): { subject: string; html: string } {
  return {
    subject: `🔥 Đừng để mất streak ${currentStreak} ngày của bạn!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🐍 Python Master 12</h1>
        </div>
        <h2 style="color: #1f2937;">🔥 Streak sắp bị mất!</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Xin chào <strong>${userName}</strong>,
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Bạn đang có chuỗi học liên tục <strong style="color: #f59e0b;">${currentStreak} ngày</strong> 🔥. 
          Đừng để nó bị mất nhé!
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Chỉ cần hoàn thành 1 bài học hoặc 1 bài tập hôm nay để duy trì streak.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL || 'https://pythonmaster12.com'}/dashboard" 
             style="background-color: #f59e0b; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Học ngay bây giờ
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 40px;">
          Bạn nhận email này vì đã bật thông báo streak. 
          <a href="${process.env.NEXTAUTH_URL || 'https://pythonmaster12.com'}/settings" style="color: #6b7280;">Tắt thông báo</a>
        </p>
      </div>
    `,
  };
}
