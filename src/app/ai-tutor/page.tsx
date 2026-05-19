'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Loader2,
  AlertCircle,
  RefreshCw,
  Code2,
  Bug,
  Sparkles,
  MessageSquare,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface LessonContext {
  lessonId: number;
  title: string;
  topic: string;
}

// Constants
const MAX_CHARS = 1000;
const MAX_DAILY_MESSAGES = 100;

export default function AITutorPage() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messagesUsed, setMessagesUsed] = useState(0);
  const [lessonContext, setLessonContext] = useState<LessonContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load lesson context from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('lessonId');
    const title = params.get('title');
    const topic = params.get('topic');

    if (lessonId && title) {
      setLessonContext({
        lessonId: parseInt(lessonId),
        title: decodeURIComponent(title),
        topic: topic ? decodeURIComponent(topic) : '',
      });
    }
  }, []);

  // Load message count from API
  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const res = await fetch('/api/ai/usage');
        if (res.ok) {
          const data = await res.json();
          setMessagesUsed(data.messagesUsed || 0);
        }
      } catch {
        // Silently fail - will show default count
      }
    };
    fetchMessageCount();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: lessonContext
        ? `Xin chào! Mình là PyMate 🐍, trợ lý AI của bạn. Mình thấy bạn đang học bài "${lessonContext.title}". Bạn cần mình giúp gì nào?`
        : 'Xin chào! Mình là PyMate 🐍, trợ lý AI hỗ trợ học Python của bạn. Mình có thể giải thích code, giúp debug lỗi, hoặc trả lời câu hỏi về Python. Hãy hỏi mình bất cứ điều gì nhé!',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [lessonContext]);

  const remainingMessages = MAX_DAILY_MESSAGES - messagesUsed;

  const sendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;
    if (remainingMessages <= 0) {
      setError('Bạn đã hết lượt hỏi hôm nay. Vui lòng quay lại vào ngày mai!');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: lessonContext
            ? { lessonId: lessonContext.lessonId }
            : undefined,
          conversationHistory: messages
            .filter(m => m.id !== 'welcome')
            .slice(-10)
            .map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 429) {
        setError('Bạn đã hết lượt hỏi hôm nay (100/100). Vui lòng quay lại vào ngày mai!');
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error('Không thể kết nối với AI. Vui lòng thử lại.');
      }

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setMessagesUsed(prev => prev + 1);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Xin lỗi, mình gặp sự cố khi xử lý yêu cầu. Vui lòng thử lại nhé!',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, remainingMessages, lessonContext, messages]);

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      // Remove the error message
      setMessages(prev => prev.filter(m => !m.isError));
      sendMessage(lastUserMessage.content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAction = (action: 'explain' | 'debug') => {
    const text =
      action === 'explain'
        ? 'Giải thích đoạn code sau cho mình hiểu:'
        : 'Giúp mình debug lỗi trong đoạn code sau:';
    setInput(text + '\n\n```python\n# Dán code của bạn vào đây\n```');
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href="/dashboard"
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Quay lại"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </a>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  PyMate
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Trợ lý AI học Python
                </p>
              </div>
            </div>

            {/* Messages counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
              <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {messagesUsed}/{MAX_DAILY_MESSAGES}
              </span>
            </div>
          </div>

          {/* Lesson context banner */}
          {lessonContext && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-sm text-blue-700 dark:text-blue-300 truncate">
                Đang học: {lessonContext.title}
                {lessonContext.topic && ` — ${lessonContext.topic}`}
              </span>
            </motion.div>
          )}
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Assistant avatar */}
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : message.isError
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user'
                        ? 'text-blue-200'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* User avatar */}
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    PyMate đang suy nghĩ...
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error with retry */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Thử lại
              </button>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      <footer className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          {/* Quick actions */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => handleQuickAction('explain')}
              disabled={isLoading || remainingMessages <= 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Code2 className="w-3.5 h-3.5" />
              Giải thích code
            </button>
            <button
              onClick={() => handleQuickAction('debug')}
              disabled={isLoading || remainingMessages <= 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-lg text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bug className="w-3.5 h-3.5" />
              Debug code
            </button>
          </div>

          {/* Input field */}
          <div className="relative flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_CHARS) {
                    setInput(e.target.value);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  remainingMessages <= 0
                    ? 'Đã hết lượt hỏi hôm nay...'
                    : 'Hỏi PyMate bất cứ điều gì về Python...'
                }
                disabled={isLoading || remainingMessages <= 0}
                rows={1}
                className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-16 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{
                  minHeight: '44px',
                  maxHeight: '120px',
                  height: 'auto',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />

              {/* Character counter */}
              <div className="absolute bottom-2 right-3 text-xs text-slate-400 dark:text-slate-500">
                {input.length}/{MAX_CHARS}
              </div>
            </div>

            {/* Send button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading || remainingMessages <= 0}
              className="flex-shrink-0 w-11 h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              aria-label="Gửi tin nhắn"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Remaining messages info */}
          {remainingMessages <= 20 && remainingMessages > 0 && (
            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
              ⚠️ Còn lại {remainingMessages} lượt hỏi hôm nay
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
