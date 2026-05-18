'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Copy,
  CheckCheck,
  Mic,
  Menu,
  X,
  Bot,
  Sparkles,
  Trash2,
  ChevronLeft
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import type { AIChatMessage } from '@/types';

interface ChatSession {
  id: string;
  title: string;
  messages: AIChatMessage[];
  created_at: string;
}

const SUGGESTED_QUESTIONS = [
  'Giải thích về biến trong Python',
  'Debug code giúp tôi',
  'Tạo bài tập về vòng lặp',
  'Giải thích thuật toán sắp xếp',
];

const PYTHON_CODE_BLOCK = `
\`\`\`python
# Ví dụ về biến trong Python
name = "PyMate"        # Chuỗi (string)
age = 12              # Số nguyên (integer)
height = 1.65         # Số thực (float)
is_student = True     # Boolean

# In ra màn hình
print(f"Xin chào! Mình là {name}")
print(f"Mình {age} tuổi, cao {height}m")
\`\`\`
`;

const MOCK_RESPONSES: Record<string, string> = {
  'variable':
    `Oh, câu hỏi tuyệt vời! 🎯 Biến trong Python là một "chiếc hộp" để lưu trữ dữ liệu nha!

**Biến có thể lưu trữ nhiều loại dữ liệu khác nhau:**

${PYTHON_CODE_BLOCK}

**Lưu ý quan trọng khi đặt tên biến:**
- ✅ Bắt đầu bằng chữ cái hoặc dấu gạch dưới
- ✅ Chỉ chứa chữ, số và dấu gạch dưới
- ✅ Phân biệt hoa thường (name ≠ Name)
- ❌ Không được đặt tên trùng với từ khóa (if, for, while...)

Bạn có muốn mình giải thích thêm về kiểu dữ liệu không? 😊`,
  'debug':
    `Được rồi, để mình giúp bạn debug! 🔧

Để mình có thể hỗ trợ tốt nhất, bạn hãy gửi đoạn code bị lỗi lên nhé!

**Mẹo debug nhanh:**
1. 📌 Đọc kỹ thông báo lỗi (error message)
2. 📌 Kiểm tra dấu cách và thụt lề (indentation)
3. 📌 Đảm bảo tên biến viết đúng chính tả
4. 📌 Chạy từng phần code để tìm lỗi

Bạn có thể paste code vào đây, mình sẽ giúp bạn tìm và sửa lỗi nha! 💪`,
  'loop':
    `Bài tập về vòng lặp nè bạn ơi! 🎯

**Bài 1: Vòng lặp FOR (Dễ)**
\`\`\`python
# In các số từ 1 đến 5
for i in range(1, 6):
    print(i)
\`\`\`

**Bài 2: Vòng lặp WHILE (Trung bình)**
\`\`\`python
# Đếm ngược từ 10 về 1
count = 10
while count > 0:
    print(count)
    count -= 1
print("Bắt đầu!")
\`\`\`

**Bài 3: Vòng lặp lồng nhau (Khó)**
\`\`\`python
# In bảng cửu chương 5
for i in range(1, 10):
    print(f"5 x {i} = {5 * i}")
\`\`\`

Hãy thử làm và gửi cho mình kết quả nhé! 🚀`,
  'algorithm':
    `Thuật toán sắp xếp là một chủ đề thú vị! 🤓

Mình sẽ giải thích **Bubble Sort** - thuật toán sắp xếp đơn giản nhất:

**Ý tưởng:**
So sánh hai phần tử liền kề và đổi chỗ nếu chúng không đúng thứ tự. Lặp lại cho đến khi toàn bộ danh sách được sắp xếp.

**Minh họa bằng ví dụ:**
\`\`\`
Mảng ban đầu: [5, 2, 8, 1, 3]

Lượt 1: [2, 5, 1, 3, 8]  (đổi 5 và 2)
Lượt 2: [2, 1, 3, 5, 8]  (đổi 5 và 1)
Lượt 3: [1, 2, 3, 5, 8]  (đổi 2 và 1)
Kết quả: [1, 2, 3, 5, 8] ✅
\`\`\`

**Code Python:**
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Test
numbers = [5, 2, 8, 1, 3]
print(bubble_sort(numbers))  # [1, 2, 3, 5, 8]
\`\`\`

Bạn muốn mình giải thích thêm về thuật toán nào khác không? 😊`,
};

function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('biến') || lowerMessage.includes('variable')) {
    return MOCK_RESPONSES['variable'];
  }
  if (lowerMessage.includes('debug') || lowerMessage.includes('lỗi')) {
    return MOCK_RESPONSES['debug'];
  }
  if (lowerMessage.includes('vòng lặp') || lowerMessage.includes('loop') || lowerMessage.includes('bài tập')) {
    return MOCK_RESPONSES['loop'];
  }
  if (lowerMessage.includes('thuật toán') || lowerMessage.includes('sắp xếp') || lowerMessage.includes('sort')) {
    return MOCK_RESPONSES['algorithm'];
  }

  return `Câu hỏi hay lắm! 🌟

Mình sẽ cố gắng giải thích rõ ràng nhất có thể nhé.

Python là một ngôn ngữ lập trình rất mạnh mẽ và dễ học. Nếu bạn có câu hỏi cụ thể hơn về:
- 📦 Biến và kiểu dữ liệu
- 🔄 Vòng lặp (for, while)
- 📝 Hàm (function)
- 📚 Cấu trúc dữ liệu (list, dict)

Hãy hỏi cụ thể hơn, mình sẽ giúp bạn ngay nha! 💪`;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-border bg-[#1E293B]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-border/50">
        <span className="text-xs text-[#94A3B8] font-mono">Python</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <>
              <CheckCheck className="w-3.5 h-3.5 text-success" />
              <span className="text-success">Đã chép</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-[#E2E8F0] whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function parseMessageContent(content: string) {
  const parts: { type: 'text' | 'code'; content: string }[] = [];
  const codeBlockRegex = /```python\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return parts;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </div>
  );
}

export default function TutorPage() {
  const { theme } = useTheme();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, isTyping, scrollToBottom]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'Cuộc trò chuyện mới',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Chào bạn! Mình là PyMate, trợ lý học Python của bạn. Hãy hỏi mình bất cứ điều gì nhé! 🤖',
          created_at: new Date().toISOString(),
        },
      ],
      created_at: new Date().toISOString(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !currentSessionId) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      created_at: new Date().toISOString(),
    };

    setSessions(prev =>
      prev.map(s =>
        s.id === currentSessionId
          ? { ...s, messages: [...s.messages, userMessage] }
          : s
      )
    );
    setInputValue('');

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResponse = generateMockResponse(userMessage.content);
    const assistantMessage: AIChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: mockResponse,
      created_at: new Date().toISOString(),
    };

    setSessions(prev =>
      prev.map(s =>
        s.id === currentSessionId
          ? {
              ...s,
              messages: [...s.messages, assistantMessage],
              title: s.messages.length === 1 ? userMessage.content.slice(0, 30) + '...' : s.title,
            }
          : s
      )
    );
    setIsTyping(false);
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(sessions.length > 1 ? sessions[1].id : null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!currentSessionId) {
      createNewSession();
    }
    setInputValue(question);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:relative z-50 lg:z-auto w-72 h-full bg-surface border-r border-border flex flex-col ${
          sidebarOpen ? '' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-border lg:hidden flex items-center justify-between">
          <h2 className="font-semibold">Lịch sử chat</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-border">
          <button
            onClick={createNewSession}
            className="w-full py-3 px-4 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Cuộc trò chuyện mới
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Chưa có cuộc trò chuyện nào</p>
              <p className="text-xs mt-1">Bắt đầu hỏi PyMate ngay!</p>
            </div>
          ) : (
            sessions.map(session => (
              <div
                key={session.id}
                className={`group relative p-3 rounded-xl cursor-pointer transition-all ${
                  currentSessionId === session.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => {
                  setCurrentSessionId(session.id);
                  setSidebarOpen(false);
                }}
              >
                <div className="flex items-start gap-3">
                  <Bot className={`w-5 h-5 mt-0.5 ${currentSessionId === session.id ? 'text-primary' : 'text-muted'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{session.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {session.messages.length} tin nhắn
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-error/10 text-muted hover:text-error transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </motion.aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col h-full bg-background overflow-hidden">
        {/* Chat header */}
        <header className="flex items-center gap-3 p-4 border-b border-border bg-surface">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-lg">
              🤖
            </div>
            <div>
              <h1 className="font-semibold">PyMate</h1>
              <p className="text-xs text-muted">Trợ lý Python</p>
            </div>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!currentSession ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-4xl mb-6 shadow-lg shadow-primary/25"
              >
                🤖
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Chào bạn!</h2>
              <p className="text-muted max-w-md mb-8">
                Mình là PyMate, trợ lý học Python của bạn. Hãy hỏi mình bất cứ điều gì nhé!
              </p>

              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      createNewSession();
                      setTimeout(() => handleSuggestedQuestion(q), 100);
                    }}
                    className="px-4 py-2 rounded-full border border-border bg-surface hover:bg-muted/50 hover:border-primary/50 transition-all text-sm"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {currentSession.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm flex-shrink-0">
                        🤖
                      </div>
                    )}

                    <div className={`max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'gradient-bg text-white rounded-tr-md'
                            : 'bg-surface border border-border rounded-tl-md'
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {parseMessageContent(message.content).map((part, i) =>
                            part.type === 'code' ? (
                              <CodeBlock key={i} code={part.content} />
                            ) : (
                              <span key={i} className={message.role === 'user' ? '' : ''}>{part.content}</span>
                            )
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted opacity-0 hover:opacity-100 transition-opacity">
                        {new Date(message.created_at).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-surface border border-border rounded-2xl rounded-tl-md">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border bg-surface">
          <div className="flex flex-col gap-3 max-w-4xl mx-auto">
            {!currentSession && (
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted/50 transition-all text-xs"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Hỏi PyMate..."
                  rows={1}
                  className="w-full px-4 py-3 pr-24 rounded-xl border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted"
                  style={{ maxHeight: '120px' }}
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-muted/50 transition-colors opacity-50 cursor-not-allowed"
                    title="Tính năng sắp ra mắt"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className="p-3 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-muted text-center">
              PyMate có thể tạo ra thông tin không chính xác, hãy kiểm tra kỹ các đề xuất nhé! ⚠️
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}