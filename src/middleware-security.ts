/**
 * Security Headers & CSRF Protection
 * 
 * File tham khảo - Cấu hình bảo mật cho ứng dụng.
 * Middleware thực tế được cấu hình trong src/middleware.ts
 * 
 * Các security headers được áp dụng thông qua next.config.js
 * và middleware để bảo vệ ứng dụng khỏi các cuộc tấn công phổ biến.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security headers cần thiết cho ứng dụng
 */
export const securityHeaders = {
  // Ngăn chặn MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Ngăn chặn clickjacking bằng cách không cho phép iframe
  'X-Frame-Options': 'DENY',
  
  // Bật XSS protection trên trình duyệt cũ
  'X-XSS-Protection': '1; mode=block',
  
  // Chỉ gửi referrer cho same-origin requests
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Kiểm soát quyền truy cập các tính năng trình duyệt
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  
  // Bắt buộc sử dụng HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Content Security Policy - Giới hạn nguồn tài nguyên được phép tải
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://api.openai.com https://judge0-ce.p.rapidapi.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

/**
 * Áp dụng security headers vào response
 * Sử dụng trong middleware hoặc API routes
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * Tạo CSRF token
 * Sử dụng crypto API để tạo token ngẫu nhiên
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Xác thực CSRF token
 * So sánh token từ request header với token trong session
 */
export function validateCsrfToken(requestToken: string | null, sessionToken: string | null): boolean {
  if (!requestToken || !sessionToken) return false;
  if (requestToken.length !== sessionToken.length) return false;
  
  // Sử dụng constant-time comparison để tránh timing attacks
  let result = 0;
  for (let i = 0; i < requestToken.length; i++) {
    result |= requestToken.charCodeAt(i) ^ sessionToken.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Middleware bảo mật - kiểm tra CSRF cho state-changing requests
 * Áp dụng cho các phương thức POST, PUT, DELETE, PATCH
 */
export function csrfProtectionMiddleware(request: NextRequest): NextResponse | null {
  const method = request.method.toUpperCase();
  const stateMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  
  if (!stateMethods.includes(method)) {
    return null; // Không cần kiểm tra CSRF cho GET, HEAD, OPTIONS
  }

  // Bỏ qua CSRF cho API routes sử dụng Bearer token authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return null;
  }

  // Kiểm tra CSRF token trong header
  const csrfToken = request.headers.get('x-csrf-token');
  // Token session sẽ được lấy từ cookie hoặc session store
  // Đây là logic tham khảo - implementation thực tế phụ thuộc vào session management
  
  if (!csrfToken) {
    return NextResponse.json(
      { error: 'Thiếu CSRF token. Vui lòng thử lại.' },
      { status: 403 }
    );
  }

  return null; // Token hợp lệ, cho phép request tiếp tục
}

/**
 * Cấu hình security headers cho next.config.js
 * Thêm vào phần headers() trong next.config.js
 * 
 * Ví dụ sử dụng:
 * ```js
 * // next.config.js
 * const { getSecurityHeadersConfig } = require('./src/middleware-security');
 * 
 * module.exports = {
 *   async headers() {
 *     return [
 *       {
 *         source: '/(.*)',
 *         headers: getSecurityHeadersConfig(),
 *       },
 *     ];
 *   },
 * };
 * ```
 */
export function getSecurityHeadersConfig() {
  return Object.entries(securityHeaders).map(([key, value]) => ({
    key,
    value,
  }));
}
