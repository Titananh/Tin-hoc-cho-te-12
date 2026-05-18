'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: 'python' | 'javascript' | 'bash';
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showOutput?: boolean;
  output?: string;
  explanation?: string;
}

// Syntax highlighting colors
const syntaxColors = {
  keyword: '#C678DD',   // purple - def, if, for, return, etc.
  string: '#98C379',    // green
  number: '#D19A66',    // orange
  comment: '#5C6370',   // gray
  function: '#61AFEF',  // blue
  builtin: '#E5C07B',   // yellow
  plain: '#ABB2BF',      // default text
};

// Python keywords
const pythonKeywords = [
  'def', 'if', 'elif', 'else', 'for', 'while', 'return', 'break', 'continue',
  'import', 'from', 'as', 'class', 'try', 'except', 'finally', 'with',
  'lambda', 'yield', 'raise', 'pass', 'True', 'False', 'None', 'and', 'or', 'not',
  'in', 'is', 'global', 'nonlocal', 'assert', 'del',
];

// JavaScript keywords
const jsKeywords = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch',
  'finally', 'throw', 'new', 'this', 'super', 'extends', 'true', 'false',
  'null', 'undefined', 'typeof', 'instanceof',
];

// Bash keywords
const bashKeywords = [
  'echo', 'export', 'cd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep',
  'find', 'chmod', 'chown', 'sudo', 'apt', 'yum', 'npm', 'yarn', 'git',
  'docker', 'ps', 'kill', 'touch', 'pwd', 'whoami', 'if', 'then', 'else',
];

const builtins = {
  python: ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'input', 'open', 'type', 'round', 'abs', 'min', 'max', 'sum', 'sorted', 'enumerate', 'zip', 'map', 'filter'],
  javascript: ['console', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'JSON', 'parseInt', 'parseFloat', 'setTimeout', 'setInterval'],
  bash: [],
};

function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let i = 0;
    let inString = false;
    let stringChar = '';
    let stringStart = 0;

    while (i < line.length) {
      // Handle comments
      if (!inString && line[i] === '#') {
        tokens.push(<span key={i} style={{ color: syntaxColors.comment }}>{line.slice(i)}</span>);
        break;
      }

      // Handle strings
      if (!inString && (line[i] === '"' || line[i] === "'" || (line[i] === 'f' && (line[i + 1] === '"' || line[i + 1] === "'")))) {
        if (line[i] === 'f' || line[i] === 'r') {
          // f-string or r-string
          stringChar = line[i + 1];
          inString = true;
          stringStart = i;
          i += 2;
        } else {
          stringChar = line[i];
          inString = true;
          stringStart = i;
          i++;
        }
        continue;
      }

      if (inString && line[i] === stringChar && line[i - 1] !== '\\') {
        tokens.push(<span key={stringStart} style={{ color: syntaxColors.string }}>{line.slice(stringStart, i + 1)}</span>);
        inString = false;
        stringChar = '';
        i++;
        continue;
      }

      // Handle numbers
      if (!inString && /\d/.test(line[i]) && (i === 0 || /[^\w]/.test(line[i - 1]))) {
        const match = line.slice(i).match(/^\d+(\.\d+)?/);
        if (match) {
          tokens.push(<span key={i} style={{ color: syntaxColors.number }}>{match[0]}</span>);
          i += match[0].length;
          continue;
        }
      }

      // Handle words (keywords, builtins, functions)
      if (!inString && /[a-zA-Z_]/.test(line[i])) {
        const match = line.slice(i).match(/^[a-zA-Z_]\w*/);
        if (match) {
          const word = match[0];
          const nextChar = line[i + word.length];
          
          if (pythonKeywords.includes(word)) {
            tokens.push(<span key={i} style={{ color: syntaxColors.keyword }}>{word}</span>);
          } else if (builtins.python.includes(word)) {
            tokens.push(<span key={i} style={{ color: syntaxColors.builtin }}>{word}</span>);
          } else if (nextChar === '(') {
            tokens.push(<span key={i} style={{ color: syntaxColors.function }}>{word}</span>);
          } else {
            tokens.push(<span key={i} style={{ color: syntaxColors.plain }}>{word}</span>);
          }
          i += word.length;
          continue;
        }
      }

      tokens.push(<span key={i} style={{ color: syntaxColors.plain }}>{line[i]}</span>);
      i++;
    }

    return (
      <div key={lineIndex}>
        {tokens.length > 0 ? tokens : <span style={{ color: syntaxColors.plain }}> </span>}
      </div>
    );
  });
}

function highlightJavaScript(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let i = 0;
    let inString = false;
    let stringChar = '';
    let stringStart = 0;

    while (i < line.length) {
      // Handle comments
      if (!inString && line[i] === '/' && line[i + 1] === '/') {
        tokens.push(<span key={i} style={{ color: syntaxColors.comment }}>{line.slice(i)}</span>);
        break;
      }

      // Handle strings
      if (!inString && (line[i] === '"' || line[i] === "'" || line[i] === '`')) {
        stringChar = line[i];
        inString = true;
        stringStart = i;
        i++;
        continue;
      }

      if (inString && line[i] === stringChar && line[i - 1] !== '\\') {
        tokens.push(<span key={stringStart} style={{ color: syntaxColors.string }}>{line.slice(stringStart, i + 1)}</span>);
        inString = false;
        stringChar = '';
        i++;
        continue;
      }

      // Handle numbers
      if (!inString && /\d/.test(line[i]) && (i === 0 || /[^\w]/.test(line[i - 1]))) {
        const match = line.slice(i).match(/^\d+(\.\d+)?/);
        if (match) {
          tokens.push(<span key={i} style={{ color: syntaxColors.number }}>{match[0]}</span>);
          i += match[0].length;
          continue;
        }
      }

      // Handle words
      if (!inString && /[a-zA-Z_]/.test(line[i])) {
        const match = line.slice(i).match(/^[a-zA-Z_]\w*/);
        if (match) {
          const word = match[0];
          const nextChar = line[i + word.length];
          
          if (jsKeywords.includes(word)) {
            tokens.push(<span key={i} style={{ color: syntaxColors.keyword }}>{word}</span>);
          } else if (builtins.javascript.includes(word)) {
            tokens.push(<span key={i} style={{ color: syntaxColors.builtin }}>{word}</span>);
          } else if (nextChar === '(') {
            tokens.push(<span key={i} style={{ color: syntaxColors.function }}>{word}</span>);
          } else {
            tokens.push(<span key={i} style={{ color: syntaxColors.plain }}>{word}</span>);
          }
          i += word.length;
          continue;
        }
      }

      tokens.push(<span key={i} style={{ color: syntaxColors.plain }}>{line[i]}</span>);
      i++;
    }

    return (
      <div key={lineIndex}>
        {tokens.length > 0 ? tokens : <span style={{ color: syntaxColors.plain }}> </span>}
      </div>
    );
  });
}

function highlightBash(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let i = 0;

    // Handle comments
    if (line[i] === '#') {
      return <div key={lineIndex}><span style={{ color: syntaxColors.comment }}>{line}</span></div>;
    }

    while (i < line.length) {
      // Handle strings
      if (line[i] === '"' || line[i] === "'") {
        const stringChar = line[i];
        let j = i + 1;
        while (j < line.length && line[j] !== stringChar) {
          if (line[j] === '\\') j++;
          j++;
        }
        tokens.push(<span key={i} style={{ color: syntaxColors.string }}>{line.slice(i, j + 1)}</span>);
        i = j + 1;
        continue;
      }

      // Handle words
      if (/[a-zA-Z_]/.test(line[i])) {
        const match = line.slice(i).match(/^[a-zA-Z_]\w*/);
        if (match) {
          const word = match[0];
          if (bashKeywords.includes(word)) {
            tokens.push(<span key={i} style={{ color: syntaxColors.keyword }}>{word}</span>);
          } else {
            tokens.push(<span key={i} style={{ color: syntaxColors.plain }}>{word}</span>);
          }
          i += word.length;
          continue;
        }
      }

      tokens.push(<span key={i} style={{ color: syntaxColors.plain }}>{line[i]}</span>);
      i++;
    }

    return (
      <div key={lineIndex}>
        {tokens.length > 0 ? tokens : <span style={{ color: syntaxColors.plain }}> </span>}
      </div>
    );
  });
}

function highlightCode(code: string, language: string): React.ReactNode[] {
  switch (language) {
    case 'python':
      return highlightPython(code);
    case 'javascript':
      return highlightJavaScript(code);
    case 'bash':
      return highlightBash(code);
    default:
      return highlightPython(code);
  }
}

export function CodeBlock({
  title,
  code,
  language = 'python',
  showLineNumbers = true,
  showCopyButton = true,
  showOutput = false,
  output,
  explanation,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  const highlightedLines = highlightCode(code, language);
  const lines = code.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative my-4 rounded-xl overflow-hidden"
    >
      {/* Gradient left border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl" />
      
      {/* Main container */}
      <div className="bg-slate-900 rounded-xl shadow-lg">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
          {/* Terminal dots */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {title && (
              <span className="ml-2 text-sm text-slate-400 font-medium">{title}</span>
            )}
          </div>

          {/* Copy button */}
          {showCopyButton && (
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                copied
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-slate-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                copied ? 'bg-green-500/10' : 'bg-blue-500/10'
              }`} />
            </motion.button>
          )}
        </div>

        {/* Code area */}
        <div className="flex">
          {/* Line numbers */}
          {showLineNumbers && (
            <div className="flex-shrink-0 py-3 px-4 bg-slate-800/30 border-r border-slate-700/30 select-none">
              {lines.map((_, index) => (
                <div
                  key={index}
                  className="text-right text-sm leading-6 font-mono text-slate-600"
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code content */}
          <div className="flex-1 overflow-x-auto">
            <pre className="p-4 font-mono text-sm leading-6">
              <code className="text-slate-300">{highlightedLines}</code>
            </pre>
          </div>
        </div>

        {/* Output section */}
        {showOutput && output && (
          <div className="border-t border-slate-700/50 bg-slate-800/30">
            <div className="px-4 py-2 border-b border-slate-700/30">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Output
              </span>
            </div>
            <pre className="p-4 font-mono text-sm leading-6 text-emerald-300/90">
              {output}
            </pre>
          </div>
        )}
      </div>

      {/* Explanation */}
      {explanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 px-4 py-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
        >
          <p className="text-sm text-slate-400 leading-relaxed">{explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}