'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Link2 } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

function parseMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let key = 0;

  const lines = text.split('\n');
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        parts.push(
          <CodeBlock key={key++} language={codeLanguage} code={codeContent.trim()} />
        );
        codeContent = '';
        codeLanguage = '';
      } else {
        codeLanguage = line.slice(3).trim();
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    if (line.trim() === '') continue;

    if (line.startsWith('- ') || line.startsWith('* ')) {
      parts.push(
        <li key={key++} className="ml-4 list-disc">
          {parseInline(line.slice(2))}
        </li>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        parts.push(
          <li key={key++} className="ml-4 list-decimal">
            {parseInline(match[2])}
          </li>
        );
        continue;
      }
    }

    parts.push(
      <p key={key++} className={line.startsWith('#') ? 'text-xl font-bold' : ''}>
        {parseInline(line)}
      </p>
    );
  }

  return parts;
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/\*(.+?)\*/);
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    const boldIndex = boldMatch?.index ?? Infinity;
    const italicIndex = italicMatch?.index ?? Infinity;
    const linkIndex = linkMatch?.index ?? Infinity;

    let earliestType: 'bold' | 'italic' | 'link' | null = null;
    let earliestMatch: RegExpMatchArray | null = null;
    let earliestIndex = Infinity;

    if (boldMatch && boldIndex < earliestIndex) {
      earliestType = 'bold';
      earliestMatch = boldMatch;
      earliestIndex = boldIndex;
    }
    if (italicMatch && italicIndex < earliestIndex) {
      earliestType = 'italic';
      earliestMatch = italicMatch;
      earliestIndex = italicIndex;
    }
    if (linkMatch && linkIndex < earliestIndex) {
      earliestType = 'link';
      earliestMatch = linkMatch;
      earliestIndex = linkIndex;
    }

    if (!earliestType || !earliestMatch) {
      parts.push(remaining);
      break;
    }

    if (earliestIndex > 0) {
      parts.push(remaining.slice(0, earliestIndex));
    }

    if (earliestType === 'bold') {
      parts.push(<strong key={key++}>{earliestMatch[1]}</strong>);
    } else if (earliestType === 'italic') {
      parts.push(<em key={key++}>{earliestMatch[1]}</em>);
    } else if (earliestType === 'link') {
      parts.push(
        <a
          key={key++}
          href={earliestMatch[2]}
          className="text-primary underline hover:text-primary/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {earliestMatch[1]}
        </a>
      );
    }

    remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden bg-slate-900 dark:bg-slate-900 text-slate-100">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
        <span className="text-xs text-slate-400 font-mono">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function PyMateAvatar() {
  return (
    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-lg">
      P
    </div>
  );
}

export function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  const formattedTime = timestamp.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && <PyMateAvatar />}
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`relative px-4 py-3 rounded-2xl ${
              isUser
                ? 'gradient-bg text-white rounded-tr-sm rounded-tl-lg rounded-br-lg'
                : 'bg-surface dark:bg-surface-elevated border border-border text-foreground rounded-tl-sm rounded-tr-lg rounded-bl-lg shadow-sm'
            }`}
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {parseMarkdown(message)}
            </div>
          </div>
          
          <span className={`text-xs text-muted mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formattedTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
}