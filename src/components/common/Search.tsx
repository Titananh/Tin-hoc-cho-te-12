'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, FileText, Dumbbell, MessageCircle, Clock, X, Command } from 'lucide-react';
import { useTheme } from '@/lib/theme';

// Types
interface SearchResult {
  id: string;
  type: 'lesson' | 'exercise' | 'ai-tutor';
  title: string;
  snippet: string;
  icon: React.ReactNode;
}

interface RecentSearch {
  id: string;
  type: 'lesson' | 'exercise' | 'ai-tutor';
  title: string;
  query: string;
}

// Mock AI chat history
const mockAIHistory = [
  { id: 'ai-1', query: 'Giải thích về biến trong Python', response: 'Biến là một vùng nhớ để lưu trữ dữ liệu...' },
  { id: 'ai-2', query: 'Cách sử dụng vòng lặp for', response: 'Vòng lặp for trong Python dùng để duyệt qua các phần tử...' },
  { id: 'ai-3', query: 'Sự khác nhau giữa list và tuple', response: 'List có thể thay đổi được, tuple không thể thay đổi...' },
];

// Extract lessons and exercises from courses data
function extractSearchableContent(courses: any[]): { lessons: any[], exercises: any[] } {
  const lessons: any[] = [];
  const exercises: any[] = [];

  courses.forEach(course => {
    course.modules?.forEach((module: any) => {
      module.lessons?.forEach((lesson: any) => {
        lessons.push({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          slug: lesson.slug,
          moduleTitle: module.title,
          courseTitle: course.title,
        });
        lesson.content?.exercises?.forEach((exercise: any) => {
          exercises.push({
            id: exercise.id,
            title: exercise.title,
            description: exercise.description,
            difficulty: exercise.difficulty,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          });
        });
      });
    });
  });

  return { lessons, exercises };
}

// Load courses data dynamically to avoid circular dependency
async function getSearchableData() {
  const { courses } = await import('@/data/content');
  return extractSearchableContent(courses);
}

// Highlight matching text
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <mark key={i} className="bg-yellow-500/30 dark:bg-yellow-500/40 rounded px-0.5">{part}</mark>
          : part
      )}
    </>
  );
}

// Category config
const categoryConfig = {
  'lesson': { 
    label: 'Bài học', 
    icon: FileText, 
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
  },
  'exercise': { 
    label: 'Bài tập', 
    icon: Dumbbell, 
    color: 'text-green-500 dark:text-green-400',
    bgColor: 'bg-green-500/10 dark:bg-green-500/20',
  },
  'ai-tutor': { 
    label: 'AI Tutor', 
    icon: MessageCircle, 
    color: 'text-purple-500 dark:text-purple-400',
    bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
  },
};

export function Search() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchableData, setSearchableData] = useState<{ lessons: any[], exercises: any[] } | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load searchable data on mount
  useEffect(() => {
    getSearchableData().then(setSearchableData);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((search: RecentSearch) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.query.toLowerCase() !== search.query.toLowerCase());
      const updated = [search, ...filtered].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchableData]);

  // Perform search
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchableData) {
      setIsLoading(false);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    // Search lessons
    searchableData.lessons.forEach(lesson => {
      if (
        lesson.title.toLowerCase().includes(lowerQuery) ||
        lesson.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: lesson.id,
          type: 'lesson',
          title: lesson.title,
          snippet: lesson.description,
          icon: <FileText className="w-4 h-4" />,
        });
      }
    });

    // Search exercises
    searchableData.exercises.forEach(exercise => {
      if (
        exercise.title.toLowerCase().includes(lowerQuery) ||
        exercise.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: exercise.id,
          type: 'exercise',
          title: exercise.title,
          snippet: exercise.description,
          icon: <Dumbbell className="w-4 h-4" />,
        });
      }
    });

    // Search AI tutor history
    mockAIHistory.forEach(chat => {
      if (
        chat.query.toLowerCase().includes(lowerQuery) ||
        chat.response.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: chat.id,
          type: 'ai-tutor',
          title: chat.query,
          snippet: chat.response,
          icon: <MessageCircle className="w-4 h-4" />,
        });
      }
    });

    setResults(searchResults.slice(0, 10));
    setSelectedIndex(0);
    setIsLoading(false);
  }, [searchableData]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = query.trim() ? results.length : recentSearches.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(totalItems, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + Math.max(totalItems, 1)) % Math.max(totalItems, 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (query.trim() && results[selectedIndex]) {
          const item = results[selectedIndex];
          saveRecentSearch({ id: item.id, type: item.type, title: item.title, query });
          // Navigate to item
          handleSelectItem(item);
        } else if (!query.trim() && recentSearches[selectedIndex]) {
          const recent = recentSearches[selectedIndex];
          setQuery(recent.query);
          // Trigger search with this query
          setTimeout(() => performSearch(recent.query), 0);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        setResults([]);
        break;
    }
  };

  // Handle item selection
  const handleSelectItem = (item: SearchResult) => {
    // In a real app, this would navigate to the item
    console.log('Selected:', item);
    setIsOpen(false);
    setQuery('');
    setResults([]);
    inputRef.current?.blur();
  };

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div ref={containerRef} className="relative">
      {/* Search Trigger Button / Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm..."
          className="w-full h-10 pl-10 pr-20 rounded-xl bg-muted/30 dark:bg-muted/50 
                     border border-transparent focus:border-primary/50 
                     placeholder:text-muted text-sm
                     transition-all duration-200
                     focus:ring-2 focus:ring-primary/20
                     cursor-text"
        />
        {/* Keyboard shortcut hint */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-md bg-muted/50 dark:bg-muted/70 text-xs text-muted font-mono">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-50
                       backdrop-blur-xl bg-white/80 dark:bg-gray-900/80
                       border border-gray-200/50 dark:border-gray-700/50
                       rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30
                       overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            {/* Results Container */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {/* Search Input in Dropdown (Command Palette Style) */}
              <div className="sticky top-0 z-10 p-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tìm kiếm bài học, bài tập, hoặc chat với AI..."
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-muted/30 dark:bg-muted/50 
                               border border-transparent focus:border-primary/50 
                               placeholder:text-muted text-sm
                               transition-all duration-200
                               focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 transition-colors"
                    >
                      <X className="w-4 h-4 text-muted" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-2">
                {/* Loading State */}
                {isLoading && (
                  <div className="p-4 text-center text-sm text-muted">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      Đang tìm kiếm...
                    </div>
                  </div>
                )}

                {/* No Query - Show Recent Searches */}
                {!query.trim() && !isLoading && (
                  <div>
                    {recentSearches.length > 0 && (
                      <div className="mb-2">
                        <div className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          Tìm kiếm gần đây
                        </div>
                        {recentSearches.map((search, index) => (
                          <button
                            key={search.id}
                            onClick={() => {
                              setQuery(search.query);
                              performSearch(search.query);
                            }}
                            className={`w-full px-3 py-2.5 rounded-xl text-left text-sm transition-colors
                                       flex items-center gap-3
                                       ${index === selectedIndex 
                                         ? 'bg-primary/10 text-primary' 
                                         : 'hover:bg-muted/30 text-foreground'}`}
                          >
                            <Clock className="w-4 h-4 text-muted flex-shrink-0" />
                            <span className="truncate">{search.query}</span>
                            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${categoryConfig[search.type].bgColor} ${categoryConfig[search.type].color}`}>
                              {categoryConfig[search.type].label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Empty state for no recent searches */}
                    {recentSearches.length === 0 && (
                      <div className="p-8 text-center">
                        <SearchIcon className="w-12 h-12 mx-auto mb-3 text-muted/50" />
                        <p className="text-sm text-muted">Bắt đầu tìm kiếm</p>
                        <p className="text-xs text-muted mt-1">Tìm bài học, bài tập, hoặc trò chuyện với AI Tutor</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Has Results */}
                {!query.trim() === false && !isLoading && results.length > 0 && (
                  <div>
                    {/* Group by category */}
                    {Object.entries(groupedResults).map(([type, items]) => {
                      const config = categoryConfig[type as keyof typeof categoryConfig];
                      const Icon = config.icon;
                      
                      return (
                        <div key={type} className="mb-2 last:mb-0">
                          <div className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-2">
                            <Icon className="w-3 h-3" />
                            {config.label}
                          </div>
                          {items.map((item, index) => {
                            const globalIndex = results.findIndex(r => r.id === item.id);
                            
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleSelectItem(item)}
                                className={`w-full px-3 py-3 rounded-xl text-left text-sm transition-all duration-150
                                           flex items-start gap-3
                                           ${globalIndex === selectedIndex 
                                             ? 'bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/20' 
                                             : 'hover:bg-muted/30'}`}
                              >
                                <div className={`w-8 h-8 rounded-lg ${config.bgColor} ${config.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate">
                                    <HighlightText text={item.title} query={query} />
                                  </div>
                                  <div className="text-xs text-muted mt-0.5 line-clamp-2">
                                    <HighlightText text={item.snippet} query={query} />
                                  </div>
                                </div>
                                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${config.bgColor} ${config.color} flex-shrink-0`}>
                                  {config.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* No Results */}
                {!query.trim() === false && !isLoading && results.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/30 flex items-center justify-center">
                      <SearchIcon className="w-6 h-6 text-muted" />
                    </div>
                    <p className="text-sm font-medium">Không tìm thấy kết quả</p>
                    <p className="text-xs text-muted mt-1">Thử tìm kiếm với từ khóa khác</p>
                  </div>
                )}
              </div>

              {/* Footer Hint */}
              <div className="p-2 border-t border-gray-200/50 dark:border-gray-700/50 bg-muted/20/50">
                <div className="flex items-center justify-between px-3 py-1 text-xs text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">↑</kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">↓</kbd>
                      <span className="ml-1">điều hướng</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">Enter</kbd>
                      <span>chọn</span>
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">Esc</kbd>
                    <span>đóng</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;