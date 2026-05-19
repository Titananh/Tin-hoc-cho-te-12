/**
 * Pyodide-based Python runner for the browser.
 * Loads Pyodide on demand from the official CDN and exposes a single
 * runPython(code, stdin) function that returns stdout + stderr.
 *
 * Why: replaces the home-grown MiniPython interpreter with a real Python 3.11
 * runtime including stdlib (math, random, statistics, datetime, json, re,
 * collections, itertools, ...), correct semantics for def/class/try/except,
 * list/dict comprehension, decorators, etc.
 *
 * No API key required, no server round-trip, fully sandboxed in WebAssembly.
 */

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL?: string }) => Promise<PyodideInstance>;
  }
}

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdin: (config: { stdin: () => string | null }) => void;
  setStdout: (config: { raw: (charCode: number) => void }) => void;
  setStderr: (config: { raw: (charCode: number) => void }) => void;
  globals: {
    set: (k: string, v: unknown) => void;
    get: (k: string) => unknown;
  };
}

let pyodideInstance: PyodideInstance | null = null;
let loadPromise: Promise<PyodideInstance> | null = null;

const PYODIDE_VERSION = '0.26.2';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export async function loadPyodide(): Promise<PyodideInstance> {
  if (pyodideInstance) return pyodideInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    if (typeof window === 'undefined') {
      throw new Error('Pyodide chỉ chạy được ở client');
    }

    // Inject script tag if not already present
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${PYODIDE_CDN}pyodide.js`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Không thể tải Pyodide từ CDN'));
        document.head.appendChild(script);
      });
    }

    if (!window.loadPyodide) {
      throw new Error('Pyodide load function chưa sẵn sàng');
    }

    const py = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    pyodideInstance = py;
    return py;
  })();

  return loadPromise;
}

export interface PyodideRunResult {
  stdout: string;
  stderr: string;
  status: 'accepted' | 'runtime_error';
  timeMs: number;
}

/**
 * Run a chunk of Python code with optional stdin.
 * Returns captured stdout/stderr.
 */
export async function runPython(code: string, stdin = ''): Promise<PyodideRunResult> {
  const start = Date.now();
  const py = await loadPyodide();

  const stdoutChunks: string[] = [];
  const stderrChunks: string[] = [];

  py.setStdout({ raw: (charCode: number) => stdoutChunks.push(String.fromCharCode(charCode)) });
  py.setStderr({ raw: (charCode: number) => stderrChunks.push(String.fromCharCode(charCode)) });

  // Provide stdin as an iterator pulling lines from the supplied string
  const lines = stdin.split(/\r?\n/);
  let idx = 0;
  py.setStdin({ stdin: () => (idx < lines.length ? lines[idx++] : null) });

  let status: 'accepted' | 'runtime_error' = 'accepted';
  try {
    await py.runPythonAsync(code);
  } catch (err) {
    status = 'runtime_error';
    stderrChunks.push(err instanceof Error ? err.message : String(err));
  }

  return {
    stdout: stdoutChunks.join('').replace(/\n$/, ''),
    stderr: stderrChunks.join('').trim(),
    status,
    timeMs: Date.now() - start,
  };
}

/**
 * Returns whether Pyodide has finished loading at least once in this session.
 */
export function isPyodideReady(): boolean {
  return pyodideInstance !== null;
}
