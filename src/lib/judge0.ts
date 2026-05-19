import type {
  Judge0SubmissionRequest,
  Judge0SubmissionResult,
  SubmissionResult,
} from '@/types/judge0';

// Python 3 language ID in Judge0
const PYTHON3_LANGUAGE_ID = 71;

// Execution limits
const TIME_LIMIT_SECONDS = 10;
const MEMORY_LIMIT_KB = 256000;

// Output truncation limit
const MAX_OUTPUT_LENGTH = 50000;

// Polling configuration
const POLL_INTERVAL_MS = 1000;
const MAX_POLL_ATTEMPTS = 15;

/**
 * Get Judge0 API URL from environment variables
 */
function getApiUrl(): string {
  const url = process.env.JUDGE0_API_URL;
  if (!url) {
    throw new Error('JUDGE0_API_URL chưa được cấu hình');
  }
  return url;
}

/**
 * Get Judge0 API key from environment variables
 */
function getApiKey(): string {
  const key = process.env.JUDGE0_API_KEY;
  if (!key) {
    throw new Error('JUDGE0_API_KEY chưa được cấu hình');
  }
  return key;
}

/**
 * Truncate output string to maximum allowed length
 */
function truncateOutput(output: string | null): string {
  if (!output) return '';
  if (output.length > MAX_OUTPUT_LENGTH) {
    return output.substring(0, MAX_OUTPUT_LENGTH) + '\n... (đã cắt bớt do vượt quá giới hạn)';
  }
  return output;
}

/**
 * Map Judge0 status to internal status
 */
function mapStatus(statusId: number): SubmissionResult['status'] {
  switch (statusId) {
    case 3: // Accepted
      return 'success';
    case 5: // Time Limit Exceeded
      return 'timeout';
    case 8: // Runtime Error SIGXFSZ (memory/file size)
      return 'memory_exceeded';
    default:
      // Status IDs 6-14 are various errors
      if (statusId >= 6) return 'error';
      // Status IDs 1-2 are processing (shouldn't reach here)
      return 'error';
  }
}

/**
 * Check if a submission is still being processed
 */
function isProcessing(statusId: number): boolean {
  return statusId === 1 || statusId === 2; // InQueue or Processing
}

/**
 * Submit Python code to Judge0 API for execution
 * Uses polling strategy to wait for results
 */
export async function submitCode(
  code: string,
  stdin?: string
): Promise<SubmissionResult> {
  // ===== DEV MODE: simulate execution when Judge0 is not configured =====
  const apiKeyRaw = process.env.JUDGE0_API_KEY ?? '';
  if (apiKeyRaw.includes('placeholder') || apiKeyRaw === '') {
    return simulatePythonExecution(code, stdin);
  }

  const apiUrl = getApiUrl();
  const apiKey = getApiKey();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': new URL(apiUrl).host,
  };

  const requestBody: Judge0SubmissionRequest = {
    source_code: code,
    language_id: PYTHON3_LANGUAGE_ID,
    time_limit: TIME_LIMIT_SECONDS,
    memory_limit: MEMORY_LIMIT_KB,
  };

  if (stdin) {
    requestBody.stdin = stdin;
  }

  // Try with wait=true first (synchronous submission)
  try {
    const response = await fetch(
      `${apiUrl}/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,compile_output,message,status,time,memory`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Dịch vụ thực thi code đang quá tải. Vui lòng thử lại sau ít phút.');
      }
      if (response.status >= 500) {
        throw new Error('Dịch vụ thực thi code tạm thời không khả dụng. Vui lòng thử lại sau.');
      }
      throw new Error('Không thể gửi code để thực thi. Vui lòng thử lại.');
    }

    const result: Judge0SubmissionResult = await response.json();

    // If wait=true returned a completed result
    if (!isProcessing(result.status.id)) {
      return buildResult(result);
    }

    // If still processing, fall through to polling
    if (result.token) {
      return await pollForResult(result.token, apiUrl, headers);
    }

    throw new Error('Không nhận được kết quả từ dịch vụ thực thi code.');
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến dịch vụ thực thi code. Vui lòng kiểm tra kết nối mạng.');
    }
    throw error;
  }
}

/**
 * Poll Judge0 API for submission result
 */
async function pollForResult(
  token: string,
  apiUrl: string,
  headers: Record<string, string>
): Promise<SubmissionResult> {
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

    const response = await fetch(
      `${apiUrl}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,compile_output,message,status,time,memory`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      throw new Error('Không thể lấy kết quả thực thi. Vui lòng thử lại.');
    }

    const result: Judge0SubmissionResult = await response.json();

    if (!isProcessing(result.status.id)) {
      return buildResult(result);
    }
  }

  // Exceeded max polling attempts
  return {
    stdout: '',
    stderr: 'Thời gian chờ kết quả đã hết. Vui lòng thử lại.',
    status: 'timeout',
    time: 0,
    memory: 0,
  };
}

/**
 * Build internal SubmissionResult from Judge0 response
 */
function buildResult(result: Judge0SubmissionResult): SubmissionResult {
  const status = mapStatus(result.status.id);

  // Combine stderr and compile_output for error reporting
  let stderr = '';
  if (result.stderr) {
    stderr = result.stderr;
  } else if (result.compile_output) {
    stderr = result.compile_output;
  } else if (result.message) {
    stderr = result.message;
  }

  // Add Vietnamese messages for specific statuses
  if (status === 'timeout') {
    stderr = 'Chương trình đã vượt quá thời gian thực thi cho phép (10 giây). Vui lòng tối ưu code của bạn.';
  } else if (status === 'memory_exceeded') {
    stderr = 'Chương trình đã vượt quá giới hạn bộ nhớ cho phép (256MB). Vui lòng tối ưu code của bạn.';
  }

  // Parse execution time (Judge0 returns time as string in seconds)
  const timeMs = result.time ? Math.round(parseFloat(result.time) * 1000) : 0;

  // Memory in KB
  const memoryKb = result.memory ?? 0;

  return {
    stdout: truncateOutput(result.stdout),
    stderr: truncateOutput(stderr),
    status,
    time: timeMs,
    memory: memoryKb,
  };
}

/**
 * Python-like simulator for DEV MODE (no Judge0 key configured).
 * Handles a subset of Python sufficient for SGK Cánh Diều lớp 12 exercises:
 * - Variables, ints, floats, strings, lists
 * - Arithmetic + comparisons + boolean ops
 * - input(), print(), int(), float(), str(), len(), range(), map(), list()
 * - if/elif/else, while, for-in (with range and lists)
 * - String ops: split, lower, upper, count, [::-1] reverse slice
 * - List ops: append, sort, indexing, slicing
 * - f-strings (basic)
 *
 * Sufficient to let students get accepted on most "easy/medium" problems
 * in dev mode without a real Judge0 key.
 */
function simulatePythonExecution(
  code: string,
  stdin?: string
): SubmissionResult {
  const start = Date.now();
  try {
    const interp = new MiniPython(code, stdin ?? '');
    const out = interp.run();
    return {
      stdout: out.stdout,
      stderr: out.stderr,
      status: out.stderr ? 'runtime_error' : 'accepted',
      time: Date.now() - start,
      memory: 0,
    };
  } catch (err) {
    return {
      stdout: '',
      stderr: `Lỗi mô phỏng: ${err instanceof Error ? err.message : String(err)}`,
      status: 'runtime_error',
      time: Date.now() - start,
      memory: 0,
    };
  }
}

/**
 * Minimal Python interpreter for dev mode.
 * Implementation: tokenize blocks by indentation and recursively interpret.
 */
class MiniPython {
  private lines: string[];
  private stdin: string[];
  private stdinIdx = 0;
  private stdout = '';
  private stderr = '';
  private vars: Record<string, unknown> = {};

  constructor(code: string, stdin: string) {
    // Strip comments while preserving strings
    this.lines = code.split('\n').map((line) => this.stripComment(line));
    this.stdin = stdin.split(/\r?\n/);
  }

  private stripComment(line: string): string {
    let result = '';
    let inStr: string | null = null;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inStr) {
        if (c === inStr && line[i - 1] !== '\\') inStr = null;
        result += c;
      } else if (c === '"' || c === "'") {
        inStr = c;
        result += c;
      } else if (c === '#') {
        break;
      } else {
        result += c;
      }
    }
    return result;
  }

  private indent(line: string): number {
    let n = 0;
    while (n < line.length && (line[n] === ' ' || line[n] === '\t')) {
      n += line[n] === '\t' ? 4 : 1;
    }
    return n;
  }

  run(): { stdout: string; stderr: string } {
    try {
      this.execBlock(this.lines, 0);
    } catch (e) {
      this.stderr += `${e instanceof Error ? e.message : String(e)}\n`;
    }
    return { stdout: this.stdout.trimEnd(), stderr: this.stderr.trim() };
  }

  private execBlock(lines: string[], baseIndent: number) {
    let i = 0;
    while (i < lines.length) {
      const raw = lines[i];
      if (!raw.trim()) {
        i++;
        continue;
      }
      const ind = this.indent(raw);
      if (ind < baseIndent) return;
      if (ind > baseIndent) {
        // skip; should be eaten by parent
        i++;
        continue;
      }
      const stmt = raw.trim();

      if (stmt.startsWith('if ')) {
        const consumed = this.execIf(lines, i, baseIndent);
        i += consumed;
        continue;
      }
      if (stmt.startsWith('while ')) {
        const consumed = this.execWhile(lines, i, baseIndent);
        i += consumed;
        continue;
      }
      if (stmt.startsWith('for ')) {
        const consumed = this.execFor(lines, i, baseIndent);
        i += consumed;
        continue;
      }
      this.execStmt(stmt);
      i++;
    }
  }

  private collectBlock(lines: string[], startIdx: number, parentIndent: number): { body: string[]; consumed: number; childIndent: number } {
    const body: string[] = [];
    let i = startIdx;
    let childIndent = -1;
    while (i < lines.length) {
      const raw = lines[i];
      if (!raw.trim()) {
        body.push(raw);
        i++;
        continue;
      }
      const ind = this.indent(raw);
      if (ind <= parentIndent) break;
      if (childIndent === -1) childIndent = ind;
      body.push(raw);
      i++;
    }
    if (childIndent === -1) childIndent = parentIndent + 4;
    return { body, consumed: i - startIdx, childIndent };
  }

  private execIf(lines: string[], idx: number, baseIndent: number): number {
    let i = idx;
    let executed = false;
    while (i < lines.length) {
      const raw = lines[i];
      if (!raw.trim()) {
        i++;
        continue;
      }
      const ind = this.indent(raw);
      const stmt = raw.trim();
      if (ind !== baseIndent) break;
      let cond: boolean;
      if (stmt.startsWith('if ') && i === idx) {
        cond = !!this.evalExpr(stmt.slice(3, stmt.length - 1).trim());
      } else if (stmt.startsWith('elif ')) {
        cond = !!this.evalExpr(stmt.slice(5, stmt.length - 1).trim());
      } else if (stmt === 'else:') {
        cond = !executed;
      } else {
        break;
      }
      const { body, consumed, childIndent } = this.collectBlock(lines, i + 1, baseIndent);
      if (cond && !executed) {
        this.execBlock(body, childIndent);
        executed = true;
      }
      i += 1 + consumed;
    }
    return i - idx;
  }

  private execWhile(lines: string[], idx: number, baseIndent: number): number {
    const header = lines[idx].trim();
    const condExpr = header.slice(6, header.length - 1).trim();
    const { body, consumed, childIndent } = this.collectBlock(lines, idx + 1, baseIndent);
    let safety = 100000;
    while (safety-- > 0 && this.evalExpr(condExpr)) {
      try {
        this.execBlock(body, childIndent);
      } catch (e) {
        if (e instanceof BreakSignal) break;
        if (e instanceof ContinueSignal) continue;
        throw e;
      }
    }
    if (safety <= 0) this.stderr += '(Dev Mode) Vòng lặp while chạy quá nhiều bước, đã dừng.\n';
    return 1 + consumed;
  }

  private execFor(lines: string[], idx: number, baseIndent: number): number {
    const header = lines[idx].trim();
    const m = /^for\s+([\w,\s]+)\s+in\s+(.+):$/.exec(header);
    const { body, consumed, childIndent } = this.collectBlock(lines, idx + 1, baseIndent);
    if (!m) return 1 + consumed;
    const varName = m[1].trim();
    const iter = this.evalExpr(m[2]);
    const items = Array.isArray(iter) ? iter : typeof iter === 'string' ? Array.from(iter) : [];
    for (const item of items) {
      if (varName.includes(',')) {
        const names = varName.split(',').map((s) => s.trim());
        const vals = item as unknown[];
        names.forEach((n, k) => (this.vars[n] = vals[k]));
      } else {
        this.vars[varName] = item;
      }
      try {
        this.execBlock(body, childIndent);
      } catch (e) {
        if (e instanceof BreakSignal) break;
        if (e instanceof ContinueSignal) continue;
        throw e;
      }
    }
    return 1 + consumed;
  }

  private execStmt(stmt: string) {
    if (stmt === 'break') throw new BreakSignal();
    if (stmt === 'continue') throw new ContinueSignal();
    if (stmt === 'pass') return;

    // Augmented assignment: x += y, x -= y, etc.
    const augM = /^([\w]+)\s*([+\-*/%])=\s*(.+)$/.exec(stmt);
    if (augM) {
      const [, name, op, rhs] = augM;
      const a = this.vars[name] as number;
      const b = this.evalExpr(rhs) as number;
      switch (op) {
        case '+': this.vars[name] = (typeof a === 'string' ? a + String(b) : a + b); break;
        case '-': this.vars[name] = a - b; break;
        case '*': this.vars[name] = a * b; break;
        case '/': this.vars[name] = a / b; break;
        case '%': this.vars[name] = a % b; break;
      }
      return;
    }

    // Tuple assignment: a, b = ... or a, b = map(int, input().split())
    const tupleM = /^([\w,\s]+)\s*=\s*(.+)$/.exec(stmt);
    if (tupleM && /,/.test(tupleM[1])) {
      const names = tupleM[1].split(',').map((s) => s.trim()).filter(Boolean);
      const rhsRaw = tupleM[2].trim();
      let arr: unknown[];
      // If RHS itself is a comma-separated tuple at depth 0, evaluate each piece
      const rhsParts = this.splitArgs(rhsRaw);
      if (rhsParts.length > 1) {
        arr = rhsParts.map((p) => this.evalExpr(p));
      } else {
        const val = this.evalExpr(rhsRaw);
        arr = Array.isArray(val) ? val : typeof val === 'string' ? val.split(/\s+/) : [val];
      }
      names.forEach((n, k) => (this.vars[n] = arr[k]));
      return;
    }

    // Simple assignment: x = expr
    const assignM = /^([\w]+)\s*=\s*(.+)$/.exec(stmt);
    if (assignM) {
      const [, name, rhs] = assignM;
      this.vars[name] = this.evalExpr(rhs);
      return;
    }

    // Expression as statement (e.g., print(...))
    this.evalExpr(stmt);
  }

  private evalExpr(expr: string): unknown {
    const trimmed = expr.trim();
    if (trimmed === '') return undefined;

    // String literal
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    // f-string
    if (/^[fF]['"]/.test(trimmed)) {
      const inner = trimmed.slice(2, -1);
      return inner.replace(/\{([^}]+)\}/g, (_m, e) => {
        const v = this.evalExpr(e);
        return v === undefined ? '' : String(v);
      });
    }
    // Number
    if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
    // Bool / None
    if (trimmed === 'True') return true;
    if (trimmed === 'False') return false;
    if (trimmed === 'None') return null;

    // List literal
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return [];
      return this.splitArgs(inner).map((s) => this.evalExpr(s));
    }

    // print(...)
    const printM = /^print\s*\((.*)\)\s*$/.exec(trimmed);
    if (printM) {
      const args = this.splitArgs(printM[1]).map((a) => this.evalExpr(a));
      this.stdout += args.map((a) => this.pyRepr(a)).join(' ') + '\n';
      return undefined;
    }

    // input(...) or input("prompt")
    const inputM = /^input\s*\((.*)\)\s*$/.exec(trimmed);
    if (inputM) {
      const line = this.stdin[this.stdinIdx++] ?? '';
      return line;
    }

    // int(x), float(x), str(x), len(x), list(x), abs(x)
    const cast = /^(int|float|str|len|list|abs|sum|min|max|sorted|reversed)\s*\((.*)\)\s*$/.exec(trimmed);
    if (cast) {
      const fn = cast[1];
      const args = this.splitArgs(cast[2]).map((a) => this.evalExpr(a));
      const a = args[0];
      switch (fn) {
        case 'int': return parseInt(typeof a === 'string' ? a.trim() : String(a), 10);
        case 'float': return parseFloat(typeof a === 'string' ? a.trim() : String(a));
        case 'str': return String(a);
        case 'len': return Array.isArray(a) || typeof a === 'string' ? (a as { length: number }).length : 0;
        case 'list': return Array.isArray(a) ? [...a] : typeof a === 'string' ? Array.from(a) : [];
        case 'abs': return Math.abs(Number(a));
        case 'sum': return Array.isArray(a) ? a.reduce((s, x) => (s as number) + Number(x), 0) : 0;
        case 'min': return Array.isArray(a) ? Math.min(...(a as number[]).map(Number)) : Math.min(...args.map(Number));
        case 'max': return Array.isArray(a) ? Math.max(...(a as number[]).map(Number)) : Math.max(...args.map(Number));
        case 'sorted': return Array.isArray(a) ? [...(a as number[])].sort((x, y) => Number(x) - Number(y)) : a;
        case 'reversed': return Array.isArray(a) ? [...(a as unknown[])].reverse() : typeof a === 'string' ? (a as string).split('').reverse().join('') : a;
      }
    }

    // map(fn, iterable)
    const mapM = /^map\s*\(([^,]+),\s*(.+)\)\s*$/.exec(trimmed);
    if (mapM) {
      const fn = mapM[1].trim();
      const it = this.evalExpr(mapM[2]);
      const arr = Array.isArray(it) ? it : typeof it === 'string' ? (it as string).split(/\s+/) : [];
      if (fn === 'int') return arr.map((x) => parseInt(String(x).trim(), 10));
      if (fn === 'float') return arr.map((x) => parseFloat(String(x).trim()));
      if (fn === 'str') return arr.map((x) => String(x));
      return arr;
    }

    // range(...)
    const rangeM = /^range\s*\((.*)\)\s*$/.exec(trimmed);
    if (rangeM) {
      const args = this.splitArgs(rangeM[1]).map((a) => Number(this.evalExpr(a)));
      const [a, b, c] = args.length === 1 ? [0, args[0], 1] : args.length === 2 ? [args[0], args[1], 1] : args;
      const out: number[] = [];
      if (c > 0) for (let i = a; i < b; i += c) out.push(i);
      else if (c < 0) for (let i = a; i > b; i += c) out.push(i);
      return out;
    }

    // Reverse slice s[::-1] (very common)
    const revM = /^([\w()."'\[\]]+)\[::-1\]\s*$/.exec(trimmed);
    if (revM) {
      const v = this.evalExpr(revM[1]);
      if (typeof v === 'string') return v.split('').reverse().join('');
      if (Array.isArray(v)) return [...v].reverse();
    }

    // Method calls and attribute access: a.b(args)
    const methodM = /^([\w()."'\[\]]+)\.(\w+)\s*\((.*)\)\s*$/.exec(trimmed);
    if (methodM) {
      const objVal = this.evalExpr(methodM[1]);
      const method = methodM[2];
      const args = methodM[3].trim() ? this.splitArgs(methodM[3]).map((a) => this.evalExpr(a)) : [];
      return this.callMethod(objVal, method, args);
    }

    // Index access: arr[i]
    const idxM = /^([\w]+)\[([^\]]+)\]\s*$/.exec(trimmed);
    if (idxM) {
      const arr = this.vars[idxM[1]];
      const idx = Number(this.evalExpr(idxM[2]));
      if (Array.isArray(arr) || typeof arr === 'string') {
        const i = idx < 0 ? (arr as { length: number }).length + idx : idx;
        return (arr as unknown[])[i];
      }
    }

    // Variable lookup
    if (/^[\w]+$/.test(trimmed)) {
      if (trimmed in this.vars) return this.vars[trimmed];
    }

    // Try arithmetic / comparison / boolean operator: substitute variables and eval via JS Function
    return this.evalArithmetic(trimmed);
  }

  private callMethod(obj: unknown, method: string, args: unknown[]): unknown {
    if (typeof obj === 'string') {
      switch (method) {
        case 'lower': return obj.toLowerCase();
        case 'upper': return obj.toUpperCase();
        case 'strip': return obj.trim();
        case 'split':
          if (args.length === 0) return obj.trim().split(/\s+/);
          return obj.split(String(args[0]));
        case 'count': return (obj.match(new RegExp(escapeRegex(String(args[0])), 'g')) ?? []).length;
        case 'replace': return obj.replace(new RegExp(escapeRegex(String(args[0])), 'g'), String(args[1] ?? ''));
        case 'startswith': return obj.startsWith(String(args[0]));
        case 'endswith': return obj.endsWith(String(args[0]));
        case 'find': return obj.indexOf(String(args[0]));
        case 'join': return Array.isArray(args[0]) ? (args[0] as unknown[]).map((x) => String(x)).join(obj) : '';
      }
    }
    if (Array.isArray(obj)) {
      switch (method) {
        case 'append': obj.push(args[0]); return undefined;
        case 'sort': obj.sort((a, b) => Number(a) - Number(b)); return undefined;
        case 'reverse': obj.reverse(); return undefined;
        case 'count': return obj.filter((x) => x === args[0]).length;
        case 'index': return obj.indexOf(args[0]);
        case 'pop': return obj.pop();
      }
    }
    return undefined;
  }

  private splitArgs(s: string): string[] {
    const out: string[] = [];
    let depth = 0;
    let inStr: string | null = null;
    let buf = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (inStr) {
        buf += c;
        if (c === inStr && s[i - 1] !== '\\') inStr = null;
      } else if (c === '"' || c === "'") {
        inStr = c;
        buf += c;
      } else if (c === '(' || c === '[' || c === '{') {
        depth++;
        buf += c;
      } else if (c === ')' || c === ']' || c === '}') {
        depth--;
        buf += c;
      } else if (c === ',' && depth === 0) {
        out.push(buf.trim());
        buf = '';
      } else {
        buf += c;
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  private evalArithmetic(expr: string): unknown {
    // Substitute variables (longest-first)
    const names = Object.keys(this.vars).sort((a, b) => b.length - a.length);
    let js = expr;
    for (const n of names) {
      const re = new RegExp(`\\b${n}\\b`, 'g');
      const v = this.vars[n];
      js = js.replace(re, () => {
        if (typeof v === 'string') return JSON.stringify(v);
        if (Array.isArray(v)) return JSON.stringify(v);
        if (v === null) return 'null';
        if (v === undefined) return 'undefined';
        return String(v);
      });
    }
    // Translate Python ops to JS ops (best-effort)
    js = js
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b/g, '!')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/(?<![=!<>])==(?!=)/g, '===')
      .replace(/!=/g, '!==');
    // Python // floor div → Math.floor / 
    js = js.replace(/\/\//g, '___FLOORDIV___');
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
      const fn = new Function('FLOOR', `
        const __ = (a,b) => FLOOR(a / b);
        return (${js.replace(/___FLOORDIV___/g, ',') === js ? js : '0'});
      `);
      // simpler: eval directly
      // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
      const fn2 = new Function(`return (${js.replace(/___FLOORDIV___/g, '/')});`);
      const r = fn2();
      // Python int/int = float; we don't differentiate. Acceptable for dev.
      return r;
    } catch {
      return undefined;
    }
  }

  private pyRepr(v: unknown): string {
    if (v === null || v === undefined) return '';
    if (typeof v === 'boolean') return v ? 'True' : 'False';
    if (Array.isArray(v)) return '[' + v.map((x) => this.pyRepr(x)).join(', ') + ']';
    return String(v);
  }
}

class BreakSignal extends Error {}
class ContinueSignal extends Error {}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

