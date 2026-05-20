'use client';

import { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { OnMount, OnChange } from '@monaco-editor/react';

// Dynamic import to avoid SSR issues with Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <CodeEditorSkeleton />,
});

// ─── Props Interface ────────────────────────────────────────────────────────────

export interface CodeEditorProps {
  /** Code content */
  value: string;
  /** Callback when code changes */
  onChange: (value: string) => void;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Editor theme synced with app theme */
  theme?: 'light' | 'dark';
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Editor height */
  height?: string;
  /** Callback when user presses Ctrl+Enter or Run button */
  onRun?: () => void;
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────────

function CodeEditorSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="ml-4 h-3 w-24 rounded bg-gray-300 dark:bg-gray-600" />
      </div>
      {/* Editor lines */}
      <div className="p-4 space-y-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 w-6 rounded bg-gray-200 dark:bg-gray-700" />
            <div
              className="h-3 rounded bg-gray-200 dark:bg-gray-700"
              style={{ width: `${Math.random() * 50 + 20}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Python Keywords for Auto-Completion ────────────────────────────────────────

const PYTHON_KEYWORDS = [
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
  'try', 'while', 'with', 'yield',
];

const PYTHON_BUILTINS = [
  'print', 'input', 'len', 'range', 'int', 'float', 'str', 'list',
  'dict', 'set', 'tuple', 'bool', 'type', 'isinstance', 'issubclass',
  'abs', 'all', 'any', 'bin', 'chr', 'dir', 'divmod', 'enumerate',
  'eval', 'filter', 'format', 'getattr', 'hasattr', 'hash', 'hex',
  'id', 'iter', 'map', 'max', 'min', 'next', 'oct', 'open', 'ord',
  'pow', 'repr', 'reversed', 'round', 'setattr', 'slice', 'sorted',
  'sum', 'super', 'vars', 'zip', '__init__', '__str__', '__repr__',
];

// ─── CodeEditor Component ───────────────────────────────────────────────────────

function CodeEditor({
  value,
  onChange,
  language = 'python',
  theme = 'light',
  readOnly = false,
  height = '400px',
  onRun,
}: CodeEditorProps) {
  // Map app theme to Monaco theme
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  // Editor options
  const editorOptions = useMemo(
    () => ({
      readOnly,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontLigatures: true,
      lineNumbers: 'on' as const,
      minimap: { enabled: false },
      folding: true,
      foldingStrategy: 'indentation' as const,
      autoIndent: 'full' as const,
      tabSize: 4,
      insertSpaces: true,
      detectIndentation: false,
      wordWrap: 'on' as const,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      padding: { top: 12, bottom: 12 },
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      renderLineHighlight: 'line' as const,
      cursorBlinking: 'smooth' as const,
      cursorSmoothCaretAnimation: 'on' as const,
      smoothScrolling: true,
      bracketPairColorization: { enabled: true },
      guides: {
        indentation: true,
        bracketPairs: true,
      },
    }),
    [readOnly]
  );

  // Handle editor mount - register keybindings and completions
  const handleEditorMount: OnMount = useCallback(
    (editor, monaco) => {
      // Register Ctrl+Enter keybinding for running code
      if (onRun) {
        editor.addCommand(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
          () => {
            onRun();
          }
        );
      }

      // Register Python auto-completion provider
      monaco.languages.registerCompletionItemProvider('python', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        provideCompletionItems: (model: any, position: any) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const keywordSuggestions = PYTHON_KEYWORDS.map((keyword) => ({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range,
          }));

          const builtinSuggestions = PYTHON_BUILTINS.map((builtin) => ({
            label: builtin,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: builtin.includes('__')
              ? builtin
              : `${builtin}($0)`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          }));

          return {
            suggestions: [...keywordSuggestions, ...builtinSuggestions],
          };
        },
      });

      // Focus the editor
      editor.focus();
    },
    [onRun]
  );

  // Handle value changes
  const handleChange: OnChange = useCallback(
    (newValue) => {
      onChange(newValue ?? '');
    },
    [onChange]
  );

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <MonacoEditor
        height={height}
        language={language}
        theme={monacoTheme}
        value={value}
        onChange={handleChange}
        onMount={handleEditorMount}
        options={editorOptions}
        loading={<CodeEditorSkeleton />}
      />
    </div>
  );
}

export default CodeEditor;
