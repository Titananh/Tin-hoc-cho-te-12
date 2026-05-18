'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Check,
  Moon,
  Sun,
  Terminal,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  Zap,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

interface CodeEditorProps {
  starterCode?: string;
  testCases?: TestCase[];
  onSubmit?: (code: string) => void;
  exerciseId?: string;
  value?: string;
  onChange?: (code: string) => void;
  height?: string;
}

export default function CodeEditor({
  starterCode,
  testCases = [],
  onSubmit,
  exerciseId,
  value: externalValue,
  onChange: externalOnChange,
  height: externalHeight
}: CodeEditorProps) {
  const { theme, toggleTheme } = useTheme();
  const [code, setCode] = useState(externalValue ?? starterCode ?? '');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [showOutput, setShowOutput] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [outputCollapsed, setOutputCollapsed] = useState(false);
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    results: Array<{ input: string; expected: string; actual: string; passed: boolean }>;
  } | null>(null);
  const editorRef = useRef<Parameters<NonNullable<Parameters<typeof Editor>[0]['onMount']>>[0] | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Sync external value changes
  useEffect(() => {
    if (externalValue !== undefined) {
      setCode(externalValue);
    }
  }, [externalValue]);

  const handleCodeChange = useCallback((newCode: string | undefined) => {
    const finalCode = newCode ?? '';
    setCode(finalCode);
    if (externalOnChange) {
      externalOnChange(finalCode);
    }
  }, [externalOnChange]);

  const handleEditorMount = (editor: Parameters<NonNullable<Parameters<typeof Editor>[0]['onMount']>>[0], monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const simulateExecution = useCallback((userCode: string) => {
    setIsRunning(true);
    setHasError(false);
    setOutput([]);
    setTestResults(null);
    setShowOutput(true);

    const startTime = Date.now();
    const lines: string[] = [];

    // Simple simulation based on code content
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      setExecutionTime(elapsed);

      // Check for print statements
      const printMatches = userCode.match(/print\s*\((?:["']([^"']*)["']|\()([^)]*)\)?\)/g);
      const hasInput = userCode.includes('input(');
      const hasForLoop = userCode.includes('for ');
      const hasIfCondition = userCode.includes('if ');

      if (printMatches && printMatches.length > 0) {
        printMatches.forEach(match => {
          const contentMatch = match.match(/print\s*\(\s*["']([^"']*)["']/);
          if (contentMatch) {
            lines.push(contentMatch[1]);
          } else {
            lines.push('None');
          }
        });
      }

      // Simulate some common patterns
      if (userCode.includes('print(f"') || userCode.includes("print(f'")) {
        const fStringMatch = userCode.match(/print\s*\(f?["'](.+?)["']/);
        if (fStringMatch) {
          const str = fStringMatch[1];
          let result = str.replace(/\{([^}]+)\}/g, 'value');
          lines.push(result);
        }
      }

      if (userCode.includes('print(') && printMatches?.length === 0) {
        lines.push('None');
      }

      if (hasForLoop && !printMatches) {
        lines.push('Running loop...');
        lines.push('Loop completed.');
      }

      if (!printMatches && !hasForLoop && !lines.length) {
        if (hasInput) {
          lines.push('Waiting for input...');
        } else {
          lines.push('Code executed successfully.');
          lines.push('No output displayed.');
        }
      }

      // Check for syntax errors
      if (userCode.includes('===') || userCode.includes('!==')) {
        setHasError(true);
        lines.unshift('SyntaxError: invalid syntax');
        lines.unshift('  File "<stdin>", line 1');
        setOutput(lines);
        setIsRunning(false);
        return;
      }

      // Run test cases if available
      if (testCases.length > 0 && userCode.trim() !== (starterCode ?? '').trim()) {
        const results = testCases.map(tc => {
          // Simple mock - in real app, this would run actual code
          const passed = Math.random() > 0.3; // Simulate random pass/fail
          return {
            input: tc.input,
            expected: tc.expected_output,
            actual: passed ? tc.expected_output : 'Actual output may vary',
            passed
          };
        });

        const passed = results.filter(r => r.passed).length;
        const failed = results.filter(r => !r.passed).length;
        setTestResults({ passed, failed, results });
      }

      setOutput(lines);
      setIsRunning(false);
    }, 800 + Math.random() * 700);
  }, [testCases, starterCode]);

  const handleRun = () => {
    simulateExecution(code);
  };

  const handleReset = () => {
    setCode(starterCode ?? '');
    setOutput([]);
    setExecutionTime(null);
    setHasError(false);
    setTestResults(null);
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const handleSubmit = () => {
    simulateExecution(code);
    if (onSubmit) {
      onSubmit(code);
    }
  };

  const beforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('python-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2d2d2d',
        'editorCursor.foreground': '#aeafad',
        'editor.selectionBackground': '#264f78',
      }
    });

    monaco.editor.defineTheme('python-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'function', foreground: '795E26' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
      }
    });
  };

  const editorTheme = theme === 'dark' ? 'python-dark' : 'python-light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${isFullScreen ? 'fixed inset-0 z-50' : 'relative'} bg-surface rounded-2xl overflow-hidden shadow-xl border border-border`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-sm font-medium text-muted">Python Editor</span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
            title="Reset Code"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFormat}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
            title="Format Code"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Format</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
            title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col ${isFullScreen ? 'flex-1' : 'h-[500px]'} md:flex-row`}>
        {/* Editor Panel */}
        <div className={`flex-1 ${!isFullScreen && outputCollapsed ? 'h-full' : 'md:h-full'} ${!isFullScreen ? 'h-[250px] md:h-full' : ''}`}>
          <Editor
            height={externalHeight || "100%"}
            defaultLanguage="python"
            value={code}
            onChange={handleCodeChange}
            theme={editorTheme}
            beforeMount={beforeMount}
            onMount={handleEditorMount}
            options={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              fontSize: 14,
              lineNumbers: 'on',
              minimap: { enabled: false },
              wordWrap: 'on',
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: 'line',
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              smoothScrolling: true,
              tabSize: 4,
              insertSpaces: true,
              folding: true,
              linkedEditing: true,
            }}
          />
        </div>

        {/* Output Panel */}
        <AnimatePresence>
          {showOutput && !outputCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:w-[400px] md:h-full h-[200px] border-t md:border-t-0 md:border-l border-border flex flex-col bg-surface"
            >
              {/* Output Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-muted" />
                  <span className="text-sm font-medium">Output</span>
                  {executionTime !== null && !isRunning && (
                    <span className="text-xs text-muted">({executionTime}ms)</span>
                  )}
                </div>
                <button
                  onClick={() => setOutputCollapsed(true)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-muted" />
                </button>
              </div>

              {/* Output Content */}
              <div className="flex-1 overflow-auto p-4 font-mono text-sm">
                {isRunning ? (
                  <div className="flex items-center gap-3 text-muted">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                    <span>Running...</span>
                  </div>
                ) : hasError ? (
                  <div className="space-y-1">
                    {output.map((line, i) => (
                      <div key={i} className="text-error flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                ) : output.length > 0 ? (
                  <div className="space-y-1">
                    {output.map((line, i) => (
                      <div key={i} className="text-foreground whitespace-pre-wrap">{line}</div>
                    ))}
                  </div>
                ) : testResults ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-success flex items-center gap-1">
                        <Check className="w-4 h-4" /> {testResults.passed} passed
                      </span>
                      {testResults.failed > 0 && (
                        <span className="text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {testResults.failed} failed
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {testResults.results.filter(r => !testCases.find(tc => tc.is_hidden && tc.expected_output === r.expected)).map((result, i) => (
                        <div key={i} className="p-2 rounded bg-muted/20 text-xs">
                          <div className="text-muted mb-1">Test {i + 1}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-muted">Input: </span>
                              <span className="text-foreground">{result.input}</span>
                            </div>
                            <div>
                              <span className="text-muted">Expected: </span>
                              <span className="text-foreground">{result.expected}</span>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            {result.passed ? (
                              <span className="text-success flex items-center gap-1">
                                <Check className="w-3 h-3" /> Passed
                              </span>
                            ) : (
                              <span className="text-error flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Failed
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-muted italic">Click "Run" to execute your code</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Output Indicator */}
        {!showOutput || outputCollapsed ? (
          <button
            onClick={() => {
              setOutputCollapsed(false);
              setShowOutput(true);
            }}
            className="flex items-center justify-center gap-2 py-2 border-t md:border-t-0 md:border-l border-border bg-surface hover:bg-muted/20 transition-colors text-sm text-muted"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Show Output</span>
          </button>
        ) : null}
      </div>

      {/* Test Cases Display */}
      {testCases.length > 0 && (
        <div className="border-t border-border p-4 bg-surface">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Test Cases
          </h4>
          <div className="space-y-2">
            {testCases.filter(tc => !tc.is_hidden).map((tc, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 text-sm">
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-muted font-medium">Test {i + 1}</span>
                  {testResults && (
                    <span className={testResults.results[i]?.passed ? 'text-success' : 'text-error'}>
                      {testResults.results[i]?.passed ? 'Passed' : 'Failed'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted">Input: </span>
                    <span className="text-foreground font-mono">{tc.input}</span>
                  </div>
                  <div>
                    <span className="text-muted">Expected: </span>
                    <span className="text-foreground font-mono">{tc.expected_output}</span>
                  </div>
                </div>
              </div>
            ))}
            {testCases.some(tc => tc.is_hidden) && (
              <div className="text-xs text-muted italic">
                + {testCases.filter(tc => tc.is_hidden).length} hidden test case(s)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 p-4 border-t border-border bg-surface">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success hover:bg-success/90 text-white font-medium transition-colors disabled:opacity-50"
          >
            {isRunning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-5 h-5" />
              </motion.div>
            ) : (
              <Play className="w-5 h-5" />
            )}
            Run
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg hover:opacity-90 text-white font-medium transition-colors disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
            Submit
          </motion.button>
        </div>

        {testCases.length > 0 && testResults && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success flex items-center gap-1">
              <Check className="w-4 h-4" />
              {testResults.passed}/{testCases.filter(tc => !tc.is_hidden).length}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}