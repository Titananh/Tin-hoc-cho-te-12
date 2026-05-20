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

// ─── Python Snippets (giống VS Code) ────────────────────────────────────────────

const PYTHON_SNIPPETS = [
  { label: 'for', detail: 'Vòng lặp for', insertText: 'for ${1:i} in ${2:range(${3:10})}:\n\t${0:pass}' },
  { label: 'for range', detail: 'for i in range(n)', insertText: 'for ${1:i} in range(${2:n}):\n\t${0:pass}' },
  { label: 'for enumerate', detail: 'for i, item in enumerate()', insertText: 'for ${1:i}, ${2:item} in enumerate(${3:items}):\n\t${0:pass}' },
  { label: 'while', detail: 'Vòng lặp while', insertText: 'while ${1:condition}:\n\t${0:pass}' },
  { label: 'if', detail: 'Câu lệnh if', insertText: 'if ${1:condition}:\n\t${0:pass}' },
  { label: 'if else', detail: 'if...else', insertText: 'if ${1:condition}:\n\t${2:pass}\nelse:\n\t${0:pass}' },
  { label: 'if elif else', detail: 'if...elif...else', insertText: 'if ${1:condition}:\n\t${2:pass}\nelif ${3:condition}:\n\t${4:pass}\nelse:\n\t${0:pass}' },
  { label: 'def', detail: 'Định nghĩa hàm', insertText: 'def ${1:function_name}(${2:params}):\n\t"""${3:Mô tả hàm}"""\n\t${0:pass}' },
  { label: 'class', detail: 'Định nghĩa class', insertText: 'class ${1:ClassName}:\n\tdef __init__(self${2:, params}):\n\t\t${0:pass}' },
  { label: 'try', detail: 'try...except', insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${0:print(e)}' },
  { label: 'with open', detail: 'Mở file', insertText: "with open('${1:filename}', '${2:r}') as ${3:f}:\n\t${0:data = f.read()}" },
  { label: 'list comp', detail: 'List comprehension', insertText: '[${1:x} for ${2:x} in ${3:items}]' },
  { label: 'lambda', detail: 'Hàm lambda', insertText: 'lambda ${1:x}: ${0:x}' },
  { label: 'main', detail: 'if __name__ == "__main__"', insertText: 'if __name__ == "__main__":\n\t${0:main()}' },
  { label: 'print f', detail: 'print(f"...")', insertText: 'print(f"${0}")' },
  { label: 'input int', detail: 'Nhập số nguyên', insertText: '${1:n} = int(input("${2:Nhập số: }"))' },
  { label: 'input split', detail: 'Nhập nhiều giá trị', insertText: '${1:a}, ${2:b} = map(int, input().split())' },
];

// ─── Python method suggestions (khi gõ dấu .) ──────────────────────────────────

const DOT_SUGGESTIONS = [
  // String methods
  { label: 'split', detail: 'str.split(sep) → list', insertText: 'split(${1})' },
  { label: 'strip', detail: 'str.strip()', insertText: 'strip()' },
  { label: 'replace', detail: 'str.replace(old, new)', insertText: "replace('${1}', '${2}')" },
  { label: 'join', detail: 'str.join(iterable)', insertText: 'join(${1})' },
  { label: 'find', detail: 'str.find(sub) → int', insertText: "find('${1}')" },
  { label: 'upper', detail: 'str.upper()', insertText: 'upper()' },
  { label: 'lower', detail: 'str.lower()', insertText: 'lower()' },
  { label: 'startswith', detail: 'str.startswith(prefix)', insertText: "startswith('${1}')" },
  { label: 'endswith', detail: 'str.endswith(suffix)', insertText: "endswith('${1}')" },
  { label: 'count', detail: '.count(item) → int', insertText: 'count(${1})' },
  { label: 'isdigit', detail: 'str.isdigit() → bool', insertText: 'isdigit()' },
  // List methods
  { label: 'append', detail: 'list.append(item)', insertText: 'append(${1})' },
  { label: 'extend', detail: 'list.extend(iterable)', insertText: 'extend(${1})' },
  { label: 'insert', detail: 'list.insert(i, item)', insertText: 'insert(${1:0}, ${2})' },
  { label: 'remove', detail: 'list.remove(item)', insertText: 'remove(${1})' },
  { label: 'pop', detail: 'list.pop(i)', insertText: 'pop(${1})' },
  { label: 'sort', detail: 'list.sort()', insertText: 'sort(${1})' },
  { label: 'reverse', detail: 'list.reverse()', insertText: 'reverse()' },
  { label: 'index', detail: 'list.index(item)', insertText: 'index(${1})' },
  { label: 'copy', detail: 'list.copy()', insertText: 'copy()' },
  // Dict methods
  { label: 'get', detail: 'dict.get(key, default)', insertText: "get('${1}', ${2:None})" },
  { label: 'keys', detail: 'dict.keys()', insertText: 'keys()' },
  { label: 'values', detail: 'dict.values()', insertText: 'values()' },
  { label: 'items', detail: 'dict.items()', insertText: 'items()' },
  { label: 'update', detail: 'dict.update(other)', insertText: 'update(${1})' },
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
        triggerCharacters: ['.'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        provideCompletionItems: (model: any, position: any) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          // Check if user just typed a dot (method suggestions)
          const lineContent = model.getLineContent(position.lineNumber);
          const charBefore = lineContent[position.column - 2];

          if (charBefore === '.') {
            const dotRange = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: position.column,
              endColumn: position.column,
            };
            const dotSuggestions = DOT_SUGGESTIONS.map((item) => ({
              label: item.label,
              kind: monaco.languages.CompletionItemKind.Method,
              detail: item.detail,
              insertText: item.insertText,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: dotRange,
            }));
            return { suggestions: dotSuggestions };
          }

          // Keywords
          const keywordSuggestions = PYTHON_KEYWORDS.map((keyword) => ({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range,
          }));

          // Built-in functions with parentheses
          const builtinSuggestions = PYTHON_BUILTINS.map((builtin) => ({
            label: builtin,
            kind: monaco.languages.CompletionItemKind.Function,
            detail: `Built-in: ${builtin}()`,
            insertText: builtin.includes('__')
              ? builtin
              : `${builtin}(\${0})`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          }));

          // Snippets (code templates)
          const snippetSuggestions = PYTHON_SNIPPETS.map((snippet) => ({
            label: snippet.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            detail: snippet.detail,
            insertText: snippet.insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            sortText: '0' + snippet.label, // Show snippets first
          }));

          return {
            suggestions: [...snippetSuggestions, ...keywordSuggestions, ...builtinSuggestions],
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
