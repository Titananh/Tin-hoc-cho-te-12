/**
 * Input Validation & Sanitization
 * Xác thực và làm sạch dữ liệu đầu vào
 */

/**
 * Xác thực định dạng email
 * @param email - Địa chỉ email cần kiểm tra
 * @returns true nếu email hợp lệ
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Xác thực mật khẩu với các tiêu chí bảo mật
 * @param password - Mật khẩu cần kiểm tra
 * @returns Kết quả xác thực với danh sách lỗi
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    return { valid: false, errors: ['Mật khẩu không được để trống'] };
  }

  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự');
  }

  if (password.length > 128) {
    errors.push('Mật khẩu không được vượt quá 128 ký tự');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 chữ hoa');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 chữ thường');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 chữ số');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Làm sạch HTML - loại bỏ các thẻ nguy hiểm
 * Giữ lại các thẻ an toàn: p, br, strong, em, ul, ol, li, code, pre
 * @param input - Chuỗi HTML cần làm sạch
 * @returns Chuỗi đã được làm sạch
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';

  // Danh sách thẻ HTML an toàn được phép giữ lại
  const allowedTags = ['p', 'br', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'code', 'pre', 'span'];

  // Loại bỏ script tags và nội dung bên trong
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Loại bỏ style tags và nội dung bên trong
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Loại bỏ event handlers (onclick, onerror, onload, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Loại bỏ javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');
  sanitized = sanitized.replace(/src\s*=\s*["']javascript:[^"']*["']/gi, '');

  // Loại bỏ data: URLs trong src (có thể chứa mã độc)
  sanitized = sanitized.replace(/src\s*=\s*["']data:[^"']*["']/gi, '');

  // Loại bỏ iframe, object, embed, form, input tags
  const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button', 'link', 'meta', 'base'];
  for (const tag of dangerousTags) {
    const openTagRegex = new RegExp(`<${tag}\\b[^>]*>`, 'gi');
    const closeTagRegex = new RegExp(`</${tag}>`, 'gi');
    sanitized = sanitized.replace(openTagRegex, '');
    sanitized = sanitized.replace(closeTagRegex, '');
  }

  // Loại bỏ các thẻ không nằm trong danh sách cho phép
  sanitized = sanitized.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      // Giữ lại thẻ nhưng loại bỏ attributes nguy hiểm
      return match.replace(/\s+(style|class|id)\s*=\s*["'][^"']*["']/gi, '');
    }
    return '';
  });

  return sanitized.trim();
}

/**
 * Xác thực độ dài mã code
 * @param code - Mã nguồn cần kiểm tra
 * @param maxLength - Độ dài tối đa cho phép (mặc định 50000 ký tự)
 * @returns true nếu độ dài hợp lệ
 */
export function validateCodeLength(code: string, maxLength: number = 50000): boolean {
  if (!code || typeof code !== 'string') return false;
  if (maxLength <= 0) return false;
  return code.length <= maxLength;
}

/**
 * Xác thực tên người dùng
 * @param name - Tên cần kiểm tra
 * @returns Kết quả xác thực
 */
export function validateDisplayName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Tên hiển thị không được để trống' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Tên hiển thị phải có ít nhất 2 ký tự' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Tên hiển thị không được vượt quá 50 ký tự' };
  }

  return { valid: true };
}

/**
 * Escape ký tự đặc biệt để tránh XSS khi hiển thị
 * @param str - Chuỗi cần escape
 * @returns Chuỗi đã được escape
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, (char) => escapeMap[char] || char);
}
