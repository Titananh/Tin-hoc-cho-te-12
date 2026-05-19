/**
 * Code Security Module
 * Consolidates all security checks for Python code execution.
 * Validates code before sending to Judge0 sandbox.
 */

// ============================================================
// Restricted Imports - modules that could compromise security
// ============================================================
export const RESTRICTED_IMPORTS = [
  'os',
  'subprocess',
  'socket',
  'sys',
  'shutil',
  'ctypes',
  'importlib',
] as const;

// ============================================================
// Restricted Builtins - dangerous built-in functions
// ============================================================
export const RESTRICTED_BUILTINS = [
  'exec',
  'eval',
  'compile',
  '__import__',
] as const;

// ============================================================
// File system access patterns
// ============================================================
const FILE_SYSTEM_PATTERNS = [
  /(?:^|[^a-zA-Z0-9_])open\s*\(/m,
  /\bwith\s+open\s*\(/m,
  /(?:^|\n)\s*(?:import\s+pathlib|from\s+pathlib\s)/m,
  /(?:^|\n)\s*(?:import\s+glob|from\s+glob\s)/m,
  /(?:^|\n)\s*(?:import\s+tempfile|from\s+tempfile\s)/m,
  /(?:^|\n)\s*(?:import\s+io|from\s+io\s)/m,
] as const;

// ============================================================
// Network access patterns
// ============================================================
const NETWORK_PATTERNS = [
  /(?:^|\n)\s*(?:import\s+urllib|from\s+urllib\s)/m,
  /(?:^|\n)\s*(?:import\s+requests|from\s+requests\s)/m,
  /(?:^|\n)\s*(?:import\s+http|from\s+http\s)/m,
  /(?:^|\n)\s*(?:import\s+ftplib|from\s+ftplib\s)/m,
  /(?:^|\n)\s*(?:import\s+smtplib|from\s+smtplib\s)/m,
  /(?:^|\n)\s*(?:import\s+xmlrpc|from\s+xmlrpc\s)/m,
] as const;

// ============================================================
// Vietnamese error messages
// ============================================================
export const SECURITY_ERRORS = {
  restrictedImport: (module: string) =>
    `Module "${module}" không được phép sử dụng vì lý do bảo mật. Vui lòng loại bỏ import này khỏi code.`,
  restrictedBuiltin: (fn: string) =>
    `Hàm "${fn}()" không được phép sử dụng vì lý do bảo mật. Vui lòng sử dụng cách khác.`,
  fileSystemAccess: () =>
    'Truy cập hệ thống file không được phép trong môi trường sandbox. Vui lòng loại bỏ các thao tác đọc/ghi file khỏi code.',
  networkAccess: () =>
    'Truy cập mạng không được phép trong môi trường sandbox. Vui lòng loại bỏ các thao tác mạng khỏi code.',
} as const;

// ============================================================
// Security check result type
// ============================================================
export interface SecurityValidationResult {
  isValid: boolean;
  error?: string;
}

// ============================================================
// Individual check functions
// ============================================================

/**
 * Check if code contains restricted imports.
 * Returns the name of the first restricted import found, or null if none.
 */
export function findRestrictedImport(code: string): string | null {
  for (const module of RESTRICTED_IMPORTS) {
    const importRegex = new RegExp(
      `(?:^|\\n)\\s*(?:import\\s+${module}(?:\\s|,|$)|from\\s+${module}(?:\\.|\\s))`,
      'm'
    );
    if (importRegex.test(code)) {
      return module;
    }
  }
  return null;
}

/**
 * Check if code contains restricted builtins.
 * Returns the name of the first restricted builtin found, or null if none.
 */
export function findRestrictedBuiltin(code: string): string | null {
  for (const builtin of RESTRICTED_BUILTINS) {
    const builtinRegex = new RegExp(
      `(?:^|[^a-zA-Z0-9_])${builtin}\\s*\\(`,
      'm'
    );
    if (builtinRegex.test(code)) {
      return builtin;
    }
  }
  return null;
}

/**
 * Check if code attempts to access the file system.
 * Detects open(), with open, pathlib, glob, tempfile, io usage.
 */
export function checkFileSystemAccess(code: string): boolean {
  return FILE_SYSTEM_PATTERNS.some((pattern) => pattern.test(code));
}

/**
 * Check if code attempts network access.
 * Detects urllib, requests, http, ftplib, smtplib, xmlrpc usage.
 */
export function checkNetworkAccess(code: string): boolean {
  return NETWORK_PATTERNS.some((pattern) => pattern.test(code));
}

// ============================================================
// Main validation function
// ============================================================

/**
 * Run all security checks on the provided code.
 * Returns { isValid: true } if code passes all checks,
 * or { isValid: false, error: string } with a Vietnamese error message.
 */
export function validateCodeSecurity(code: string): SecurityValidationResult {
  // Check restricted imports
  const restrictedImport = findRestrictedImport(code);
  if (restrictedImport) {
    return {
      isValid: false,
      error: SECURITY_ERRORS.restrictedImport(restrictedImport),
    };
  }

  // Check restricted builtins
  const restrictedBuiltin = findRestrictedBuiltin(code);
  if (restrictedBuiltin) {
    return {
      isValid: false,
      error: SECURITY_ERRORS.restrictedBuiltin(restrictedBuiltin),
    };
  }

  // Check file system access
  if (checkFileSystemAccess(code)) {
    return {
      isValid: false,
      error: SECURITY_ERRORS.fileSystemAccess(),
    };
  }

  // Check network access
  if (checkNetworkAccess(code)) {
    return {
      isValid: false,
      error: SECURITY_ERRORS.networkAccess(),
    };
  }

  return { isValid: true };
}
