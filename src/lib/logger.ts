/**
 * Global Error Logging Utility
 * Provides structured logging with timestamps, levels, and metadata
 */

// Log levels
export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

// Color codes for console output
const colors = {
  [LogLevel.ERROR]: '\x1b[31m', // Red
  [LogLevel.WARN]: '\x1b[33m', // Yellow
  [LogLevel.INFO]: '\x1b[34m', // Blue
  [LogLevel.DEBUG]: '\x1b[90m', // Gray
  reset: '\x1b[0m',
};

const colorDisabled = process.env.NODE_ENV === 'production';

/**
 * Format timestamp to locale string
 */
function formatTimestamp(): string {
  return new Date().toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/**
 * Format log message with consistent structure
 * Format: [TIMESTAMP] [LEVEL] context: message {metadata}
 */
function formatMessage(
  level: LogLevel,
  context: string,
  message: string,
  metadata?: Record<string, unknown>
): string {
  const timestamp = formatTimestamp();
  const metadataStr = metadata ? ` ${JSON.stringify(metadata)}` : '';
  return `[${timestamp}] [${level}] ${context}: ${message}${metadataStr}`;
}

/**
 * Output to console with colors (development) or plain (production)
 */
function outputLog(level: LogLevel, formattedMessage: string): void {
  if (level === LogLevel.DEBUG && process.env.NODE_ENV !== 'development') {
    return; // Skip debug logs in production
  }

  const colorCode = colorDisabled ? '' : colors[level];
  const resetCode = colorDisabled ? '' : colors.reset;

  switch (level) {
    case LogLevel.ERROR:
      console.error(`${colorCode}${formattedMessage}${resetCode}`);
      break;
    case LogLevel.WARN:
      console.warn(`${colorCode}${formattedMessage}${resetCode}`);
      break;
    case LogLevel.INFO:
      console.info(`${colorCode}${formattedMessage}${resetCode}`);
      break;
    case LogLevel.DEBUG:
      console.debug(`${colorCode}${formattedMessage}${resetCode}`);
      break;
  }
}

/**
 * Send error to error tracking service (placeholder for production)
 * In production, this would send to Sentry, LogRocket, etc.
 */
function sendToErrorTracking(
  context: string,
  error: Error,
  metadata?: Record<string, unknown>
): void {
  // Placeholder: In production, integrate with error tracking service
  // Example: Sentry.captureException(error, { extra: { context, ...metadata } });
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement error tracking service integration
    console.debug('[ERROR_TRACKING]', { context, error: error.message, metadata });
  }
}

// ============================================
// Public Logging Functions
// ============================================

/**
 * Log an error with context and optional metadata
 */
export function logError(
  context: string,
  error: Error | unknown,
  metadata?: Record<string, unknown>
): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  const formattedMessage = formatMessage(
    LogLevel.ERROR,
    context,
    errorMessage,
    metadata
  );

  outputLog(LogLevel.ERROR, formattedMessage);

  if (errorStack) {
    console.error(`${colorDisabled ? '' : '\x1b[31m'}${errorStack}${colorDisabled ? '' : '\x1b[0m'}`);
  }

  // Send to error tracking service in production
  if (error instanceof Error) {
    sendToErrorTracking(context, error, metadata);
  }
}

/**
 * Log an info message with optional metadata
 */
export function logInfo(
  message: string,
  metadata?: Record<string, unknown>
): void {
  const formattedMessage = formatMessage(LogLevel.INFO, 'INFO', message, metadata);
  outputLog(LogLevel.INFO, formattedMessage);
}

/**
 * Log a warning message with optional metadata
 */
export function logWarning(
  message: string,
  metadata?: Record<string, unknown>
): void {
  const formattedMessage = formatMessage(LogLevel.WARN, 'WARN', message, metadata);
  outputLog(LogLevel.WARN, formattedMessage);
}

/**
 * Log a debug message with optional metadata
 * Only outputs in development mode
 */
export function logDebug(
  message: string,
  metadata?: Record<string, unknown>
): void {
  const formattedMessage = formatMessage(LogLevel.DEBUG, 'DEBUG', message, metadata);
  outputLog(LogLevel.DEBUG, formattedMessage);
}

/**
 * Create a scoped logger instance for a specific module/service
 */
export function createLogger(scope: string) {
  return {
    error: (error: Error | unknown, metadata?: Record<string, unknown>) =>
      logError(scope, error, metadata),
    info: (message: string, metadata?: Record<string, unknown>) =>
      logInfo(message, { ...metadata, scope }),
    warn: (message: string, metadata?: Record<string, unknown>) =>
      logWarning(message, { ...metadata, scope }),
    debug: (message: string, metadata?: Record<string, unknown>) =>
      logDebug(message, { ...metadata, scope }),
  };
}

export default {
  logError,
  logInfo,
  logWarning,
  logDebug,
  createLogger,
};