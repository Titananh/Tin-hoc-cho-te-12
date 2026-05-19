/**
 * TypeScript types for Judge0 API responses and requests
 */

// Judge0 submission status codes
export enum Judge0StatusId {
  InQueue = 1,
  Processing = 2,
  Accepted = 3,
  WrongAnswer = 4,
  TimeLimitExceeded = 5,
  CompilationError = 6,
  RuntimeErrorSIGSEGV = 7,
  RuntimeErrorSIGXFSZ = 8,
  RuntimeErrorSIGFPE = 9,
  RuntimeErrorSIGABRT = 10,
  RuntimeErrorNZEC = 11,
  RuntimeErrorOther = 12,
  InternalError = 13,
  ExecFormatError = 14,
}

// Judge0 status object
export interface Judge0Status {
  id: number;
  description: string;
}

// Judge0 submission request body
export interface Judge0SubmissionRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  time_limit?: number;
  memory_limit?: number;
  wall_time_limit?: number;
}

// Judge0 submission response (when creating)
export interface Judge0SubmissionToken {
  token: string;
}

// Judge0 submission result (when fetching)
export interface Judge0SubmissionResult {
  token: string;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: Judge0Status;
  time: string | null;
  memory: number | null;
  wall_time: string | null;
}

// Internal submission result used by our application
export interface SubmissionResult {
  stdout: string;
  stderr: string;
  status: 'success' | 'error' | 'timeout' | 'memory_exceeded';
  time: number; // execution time in milliseconds
  memory: number; // memory used in KB
}

// Code run API request body
export interface CodeRunRequest {
  code: string;
  stdin?: string;
}

// Code run API response body
export interface CodeRunResponse {
  output: string;
  error: string | null;
  executionTime: number;
  status: 'success' | 'error' | 'timeout' | 'memory_exceeded';
}
