/**
 * Unit tests for validation utility functions
 * Tests validateEmail, validatePassword, sanitizeHtml, validateCodeLength
 */

import {
  validateEmail,
  validatePassword,
  sanitizeHtml,
  validateCodeLength,
} from '@/lib/validation';

// ─── validateEmail ───────────────────────────────────────────────────────────

describe('validateEmail', () => {
  it('returns true for valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('test.user@domain.org')).toBe(true);
    expect(validateEmail('user+tag@gmail.com')).toBe(true);
    expect(validateEmail('name123@sub.domain.co')).toBe(true);
  });

  it('returns false for invalid email addresses', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('notanemail')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
    expect(validateEmail('user@domain')).toBe(false);
  });

  it('returns false for null/undefined-like inputs', () => {
    expect(validateEmail(null as unknown as string)).toBe(false);
    expect(validateEmail(undefined as unknown as string)).toBe(false);
    expect(validateEmail(123 as unknown as string)).toBe(false);
  });

  it('trims whitespace before validation', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });
});

// ─── validatePassword ────────────────────────────────────────────────────────

describe('validatePassword', () => {
  it('returns valid for a strong password', () => {
    const result = validatePassword('MyP@ssw0rd!');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('returns invalid for empty password', () => {
    const result = validatePassword('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu không được để trống');
  });

  it('returns invalid for null/undefined', () => {
    const result = validatePassword(null as unknown as string);
    expect(result.valid).toBe(false);
  });

  it('returns error for password shorter than 8 characters', () => {
    const result = validatePassword('Ab1!xyz');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu phải có ít nhất 8 ký tự');
  });

  it('returns error for password longer than 128 characters', () => {
    const longPassword = 'Aa1!' + 'x'.repeat(125);
    const result = validatePassword(longPassword);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu không được vượt quá 128 ký tự');
  });

  it('returns error when missing uppercase letter', () => {
    const result = validatePassword('myp@ssw0rd!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu phải chứa ít nhất 1 chữ hoa');
  });

  it('returns error when missing lowercase letter', () => {
    const result = validatePassword('MYP@SSW0RD!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu phải chứa ít nhất 1 chữ thường');
  });

  it('returns error when missing digit', () => {
    const result = validatePassword('MyP@ssword!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu phải chứa ít nhất 1 chữ số');
  });

  it('returns error when missing special character', () => {
    const result = validatePassword('MyPassw0rd');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
  });

  it('can return multiple errors at once', () => {
    const result = validatePassword('short');
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});

// ─── sanitizeHtml ────────────────────────────────────────────────────────────

describe('sanitizeHtml', () => {
  it('returns empty string for null/undefined', () => {
    expect(sanitizeHtml(null as unknown as string)).toBe('');
    expect(sanitizeHtml(undefined as unknown as string)).toBe('');
    expect(sanitizeHtml('')).toBe('');
  });

  it('keeps safe HTML tags', () => {
    const input = '<p>Hello</p><strong>World</strong>';
    const result = sanitizeHtml(input);
    expect(result).toContain('<p>');
    expect(result).toContain('<strong>');
  });

  it('removes script tags and their content', () => {
    const input = '<p>Safe</p><script>alert("xss")</script><p>Also safe</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('<script');
    expect(result).not.toContain('alert');
    expect(result).toContain('Safe');
    expect(result).toContain('Also safe');
  });

  it('removes style tags and their content', () => {
    const input = '<style>body{display:none}</style><p>Content</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('<style');
    expect(result).not.toContain('display:none');
    expect(result).toContain('Content');
  });

  it('removes event handlers', () => {
    const input = '<p onclick="alert(1)">Click me</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('alert');
  });

  it('removes iframe tags', () => {
    const input = '<iframe src="evil.com"></iframe><p>Safe</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('<iframe');
    expect(result).toContain('Safe');
  });

  it('removes javascript: URLs', () => {
    const input = '<a href="javascript:alert(1)">Link</a>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('javascript:');
  });

  it('preserves code blocks', () => {
    const input = '<code>print("hello")</code><pre>x = 1</pre>';
    const result = sanitizeHtml(input);
    expect(result).toContain('<code>');
    expect(result).toContain('<pre>');
  });
});

// ─── validateCodeLength ──────────────────────────────────────────────────────

describe('validateCodeLength', () => {
  it('returns true for code within default limit', () => {
    expect(validateCodeLength('print("hello")')).toBe(true);
  });

  it('returns true for code at exactly the limit', () => {
    const code = 'x'.repeat(50000);
    expect(validateCodeLength(code)).toBe(true);
  });

  it('returns false for code exceeding default limit', () => {
    const code = 'x'.repeat(50001);
    expect(validateCodeLength(code)).toBe(false);
  });

  it('returns false for empty/null code', () => {
    expect(validateCodeLength('')).toBe(false);
    expect(validateCodeLength(null as unknown as string)).toBe(false);
    expect(validateCodeLength(undefined as unknown as string)).toBe(false);
  });

  it('respects custom maxLength parameter', () => {
    expect(validateCodeLength('hello', 5)).toBe(true);
    expect(validateCodeLength('hello!', 5)).toBe(false);
  });

  it('returns false for non-positive maxLength', () => {
    expect(validateCodeLength('code', 0)).toBe(false);
    expect(validateCodeLength('code', -1)).toBe(false);
  });
});
