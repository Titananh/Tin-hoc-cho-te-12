'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  FileText,
  Code,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  ArrowUpDown,
  Moon,
  Sun,
  BookOpen,
  Dumbbell,
  Brain,
} from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { courses, exercises, flashcards } from '@/data/content';
import { Lesson, Exercise, Flashcard } from '@/types';

type ResultType = 'lesson' | 'exercise' | 'concept';
type SortOption = 'relevance' | 'name' | 'level';
type FilterType = 'all' | ResultType;
type FilterDifficulty = 'all' | 'easy' | 'medium' | 'hard';

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  snippet: string;
  icon: React.ReactNode;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  level?: number;
  href: string;
  matchedText: string;
}

// Icon components
const LessonIcon = () => <BookOpen className="w-5 h-5" />;
const ExerciseIcon = () => <Dumbbell className="w-5 h-5" />;
const ConceptIcon = () => <Brain className="w-5 h-5" />;

// Difficulty colors
const difficultyColors = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  extreme: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

const difficultyLabels = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
  extreme: 'Rất khó',
};

// Highlight matching text
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/40 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Recent searches localStorage hook
function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== query);
      const updated = [query, ...filtered].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  return { recentSearches, addRecentSearch, clearRecentSearches };
}

// Search function
function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  // Search lessons
  courses.forEach((course) => {
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (
          lesson.title.toLowerCase().includes(lowerQuery) ||
          lesson.description.toLowerCase().includes(lowerQuery) ||
          lesson.content.theory.toLowerCase().includes(lowerQuery)
        ) {
          const matchIndex = lesson.content.theory.toLowerCase().indexOf(lowerQuery);
          const snippetStart = Math.max(0, matchIndex - 50);
          const snippetEnd = Math.min(lesson.content.theory.length, matchIndex + query.length + 100);
          let snippet = lesson.content.theory.slice(snippetStart, snippetEnd);

          // Clean up markdown
          snippet = snippet
            .replace(/[#*`\[\]]/g, '')
            .replace(/\n/g, ' ')
            .trim();

          if (matchIndex > 0) snippet = '...' + snippet;
          if (matchIndex + query.length < lesson.content.theory.length - 1) snippet += '...';

          results.push({
            id: lesson.id,
            type: 'lesson',
            title: lesson.title,
            snippet,
            icon: <LessonIcon />,
            category: course.title,
            difficulty: lesson.difficulty,
            level: course.order_index,
            href: `/learn/${course.slug}/${module.slug}/${lesson.slug}`,
            matchedText: query,
          });
        }
      });
    });
  });

  // Search exercises
  exercises.forEach((exercise) => {
    if (
      exercise.title.toLowerCase().includes(lowerQuery) ||
      exercise.description.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: exercise.id,
        type: 'exercise',
        title: exercise.title,
        snippet: exercise.description,
        icon: <ExerciseIcon />,
        category: 'Bài tập',
        difficulty: exercise.difficulty,
        matchedText: query,
        href: `/learn/${exercise.lesson_id}/exercise/${exercise.id}`,
      });
    }
  });

  // Search concepts (flashcards)
  flashcards.forEach((flashcard) => {
    if (
      flashcard.term.toLowerCase().includes(lowerQuery) ||
      flashcard.definition.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: flashcard.id,
        type: 'concept',
        title: flashcard.term,
        snippet: flashcard.definition,
        icon: <ConceptIcon />,
        category: flashcard.category,
        difficulty: flashcard.difficulty,
        matchedText: query,
        href: `/flashcards/${flashcard.id}`,
      });
    }
  });

  return results;
}

// Group results by type
function groupResultsByType(results: SearchResult[]) {
  return {
    lessons: results.filter((r) => r.type === 'lesson'),
    exercises: results.filter((r) => r.type === 'exercise'),
    concepts: results.filter((r) => r.type === 'concept'),
  };
}

const ITEMS_PER_PAGE = 10;

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const initialQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<FilterDifficulty>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync query with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, pathname, router, searchParams]);

  // Search and filter results
  const allResults = useMemo(() => searchContent(debouncedQuery), [debouncedQuery]);

  const filteredResults = useMemo(() => {
    let results = allResults;

    // Filter by type
    if (filterType !== 'all') {
      results = results.filter((r) => r.type === filterType);
    }

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      results = results.filter((r) => r.difficulty === filterDifficulty);
    }

    // Sort
    if (sortBy === 'name') {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'level') {
      results = [...results].sort((a, b) => (a.level || 0) - (b.level || 0));
    }

    return results;
  }, [allResults, filterType, filterDifficulty, sortBy]);

  const groupedResults = useMemo(
    () => groupResultsByType(filteredResults),
    [filteredResults]
  );

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, filterType, filterDifficulty, sortBy]);

  const handleSearch = (value: string) => {
    setInputValue(value);
    setQuery(value);
  };

  const handleResultClick = () => {
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setInputValue(searchTerm);
    setQuery(searchTerm);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeLearn
              </span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Tìm kiếm</h1>

          {/* Search Input */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Tìm kiếm bài học, bài tập, khái niệm..."
                className="w-full pl-12 pr-12 py-4 text-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              />
              {inputValue && (
                <button
                  onClick={() => {
                    setInputValue('');
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-4 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              )}
            </div>

            {/* Recent Searches Dropdown */}
            <AnimatePresence>
              {isFocused && recentSearches.length > 0 && !inputValue && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-medium text-slate-500">Tìm kiếm gần đây</span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                  {recentSearches.map((search, i) => (
                    <button
                      key={i}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-700 dark:text-slate-300">{search}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filters and Results */}
        {debouncedQuery ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-slate-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">Bộ lọc</span>
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Loại nội dung
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Tất cả' },
                      { value: 'lesson', label: 'Bài học' },
                      { value: 'exercise', label: 'Bài tập' },
                      { value: 'concept', label: 'Khái niệm' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="filterType"
                          value={option.value}
                          checked={filterType === option.value}
                          onChange={(e) => setFilterType(e.target.value as FilterType)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-slate-600 dark:text-slate-400">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Độ khó
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Tất cả' },
                      { value: 'easy', label: 'Dễ' },
                      { value: 'medium', label: 'Trung bình' },
                      { value: 'hard', label: 'Khó' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="filterDifficulty"
                          value={option.value}
                          checked={filterDifficulty === option.value}
                          onChange={(e) => setFilterDifficulty(e.target.value as FilterDifficulty)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-slate-600 dark:text-slate-400">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowUpDown className="w-4 h-4 text-slate-500" />
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Sắp xếp theo
                    </h3>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Liên quan nhất</option>
                    <option value="name">Tên (A-Z)</option>
                    <option value="level">Cấp độ</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Results */}
            <main className="flex-1">
              {/* Results Count */}
              <div className="mb-4 text-slate-600 dark:text-slate-400">
                Tìm thấy <span className="font-semibold text-slate-900 dark:text-white">{filteredResults.length}</span>{' '}
                kết quả
              </div>

              {/* Results List */}
              {filteredResults.length > 0 ? (
                <div className="space-y-6">
                  {/* Grouped Results */}
                  {filterType === 'all' ? (
                    <>
                      {groupedResults.lessons.length > 0 && (
                        <ResultGroup
                          title="Bài học"
                          icon={<BookOpen className="w-5 h-5" />}
                          results={groupedResults.lessons.slice(0, 5)}
                          query={debouncedQuery}
                          onResultClick={handleResultClick}
                        />
                      )}
                      {groupedResults.exercises.length > 0 && (
                        <ResultGroup
                          title="Bài tập"
                          icon={<Dumbbell className="w-5 h-5" />}
                          results={groupedResults.exercises.slice(0, 5)}
                          query={debouncedQuery}
                          onResultClick={handleResultClick}
                        />
                      )}
                      {groupedResults.concepts.length > 0 && (
                        <ResultGroup
                          title="Khái niệm"
                          icon={<Brain className="w-5 h-5" />}
                          results={groupedResults.concepts.slice(0, 5)}
                          query={debouncedQuery}
                          onResultClick={handleResultClick}
                        />
                      )}
                    </>
                  ) : (
                    <div className="space-y-4">
                      {paginatedResults.map((result, index) => (
                        <ResultItem
                          key={result.id}
                          result={result}
                          query={debouncedQuery}
                          index={index}
                          onClick={handleResultClick}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState query={debouncedQuery} />
              )}
            </main>
          </div>
        ) : (
          <EmptyState query="" />
        )}
      </div>
    </div>
  );
}

// Result Group Component
function ResultGroup({
  title,
  icon,
  results,
  query,
  onResultClick,
}: {
  title: string;
  icon: React.ReactNode;
  results: SearchResult[];
  query: string;
  onResultClick: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
        <span className="text-sm text-slate-500">({results.length})</span>
      </div>
      <div className="space-y-4">
        {results.map((result, index) => (
          <ResultItem
            key={result.id}
            result={result}
            query={query}
            index={index}
            onClick={onResultClick}
          />
        ))}
      </div>
    </div>
  );
}

// Result Item Component
function ResultItem({
  result,
  query,
  index,
  onClick,
}: {
  result: SearchResult;
  query: string;
  index: number;
  onClick: () => void;
}) {
  const typeConfig = {
    lesson: { icon: <BookOpen className="w-5 h-5" />, label: 'Bài học' },
    exercise: { icon: <Dumbbell className="w-5 h-5" />, label: 'Bài tập' },
    concept: { icon: <Brain className="w-5 h-5" />, label: 'Khái niệm' },
  };

  return (
    <motion.a
      href={result.href}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
          {typeConfig[result.type].icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              <HighlightMatch text={result.title} query={query} />
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
            <HighlightMatch text={result.snippet} query={query} />
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
              {typeConfig[result.type].icon}
              {typeConfig[result.type].label}
            </span>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
              {result.category}
            </span>
            {result.difficulty && (
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[result.difficulty]}`}
              >
                {difficultyLabels[result.difficulty]}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// Empty State Component
function EmptyState({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <Search className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Bắt đầu tìm kiếm
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          Nhập từ khóa để tìm kiếm bài học, bài tập và khái niệm trong khóa học Python Master 12
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <FileText className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        Không tìm thấy kết quả
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        Không có kết quả nào phù hợp với "{query}". Hãy thử từ khóa khác hoặc kiểm tra lại chính tả.
      </p>
    </div>
  );
}