'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Shuffle,
  Moon,
  Sun,
  Check,
  X,
  Flame,
  Trophy,
  BookOpen,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { flashcards as initialFlashcards } from '@/data/content';
import { Flashcard } from '@/types';
import { useTheme } from '@/lib/theme';

// Flashcard with example for display
interface FlashcardDisplay extends Flashcard {
  example?: string;
}

interface CardProgress {
  cardId: string;
  status: 'known' | 'learning' | 'new';
  lastReviewed: string | null;
  reviewCount: number;
  easeFactor: number;
  interval: number;
}

interface StudyStats {
  knownCount: number;
  learningCount: number;
  newCount: number;
  streakCount: number;
  lastStudyDate: string | null;
}

// Category options
const categories = [
  'All',
  'Basics',
  'Control Flow',
  'Data Structures',
  'Functions',
  'OOP',
  'Error Handling',
  'Advanced'
];

export default function FlashcardsPage() {
  const { theme, toggleTheme } = useTheme();
  const [cards, setCards] = useState<FlashcardDisplay[]>(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [progress, setProgress] = useState<CardProgress[]>([]);
  const [stats, setStats] = useState<StudyStats>({
    knownCount: 0,
    learningCount: 0,
    newCount: 0,
    streakCount: 0,
    lastStudyDate: null
  });

  // Load progress from localStorage
  useEffect(() => {
    const storedProgress = localStorage.getItem('flashcard_progress');
    const storedStats = localStorage.getItem('flashcard_stats');
    const storedCategory = localStorage.getItem('flashcard_category');

    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    } else {
      // Initialize progress for all cards
      const initialProgress = initialFlashcards.map(card => ({
        cardId: card.id,
        status: 'new' as const,
        lastReviewed: null,
        reviewCount: 0,
        easeFactor: 2.5,
        interval: 0
      }));
      setProgress(initialProgress);
    }

    if (storedStats) {
      setStats(JSON.parse(storedStats));
    }

    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem('flashcard_progress', JSON.stringify(progress));
    }
  }, [progress]);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('flashcard_stats', JSON.stringify(stats));
  }, [stats]);

  // Save category preference
  useEffect(() => {
    localStorage.setItem('flashcard_category', selectedCategory);
  }, [selectedCategory]);

  // Filter cards by category
  const filteredCards = selectedCategory === 'All'
    ? cards
    : cards.filter(card => card.category === selectedCategory);

  // Filter progress for filtered cards
  const filteredProgress = progress.filter(p =>
    filteredCards.some(c => c.id === p.cardId)
  );

  // Calculate stats
  useEffect(() => {
    const known = filteredProgress.filter(p => p.status === 'known').length;
    const learning = filteredProgress.filter(p => p.status === 'learning').length;
    const newCards = filteredProgress.filter(p => p.status === 'new').length;

    setStats(prev => ({
      ...prev,
      knownCount: known,
      learningCount: learning,
      newCount: newCards
    }));
  }, [filteredProgress]);

  // Update streak on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (stats.lastStudyDate === yesterdayStr) {
        // Continue streak
        setStats(prev => ({
          ...prev,
          streakCount: prev.streakCount + 1,
          lastStudyDate: today
        }));
      } else if (stats.lastStudyDate !== today) {
        // Reset streak (more than 1 day gap)
        setStats(prev => ({
          ...prev,
          streakCount: 1,
          lastStudyDate: today
        }));
      }
    }
  }, [stats.lastStudyDate]);

  // Handle shuffle
  const handleShuffle = () => {
    const shuffled = [...filteredCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(prev => {
      if (selectedCategory === 'All') return shuffled;
      // Preserve order of non-filtered cards
      const otherCards = prev.filter(c => c.category !== selectedCategory);
      return [...shuffled, ...otherCards];
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Navigation handlers
  const goToNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleSkip = () => {
    goToNext();
  };

  // Mark card status
  const markCard = (status: 'known' | 'learning') => {
    const card = filteredCards[currentIndex];
    if (!card) return;

    setProgress(prev => {
      const updated = [...prev];
      const cardProgressIndex = updated.findIndex(p => p.cardId === card.id);

      if (cardProgressIndex !== -1) {
        updated[cardProgressIndex] = {
          ...updated[cardProgressIndex],
          status,
          lastReviewed: new Date().toISOString(),
          reviewCount: updated[cardProgressIndex].reviewCount + 1,
          easeFactor: status === 'known'
            ? Math.min(updated[cardProgressIndex].easeFactor + 0.1, 3.0)
            : Math.max(updated[cardProgressIndex].easeFactor - 0.2, 1.3),
          interval: status === 'known'
            ? updated[cardProgressIndex].interval + 1
            : 0
        };
      }

      return updated;
    });

    // Update stats
    setStats(prev => ({
      ...prev,
      lastStudyDate: new Date().toISOString().split('T')[0]
    }));

    goToNext();
  };

  // Calculate progress percentage
  const totalCards = filteredCards.length;
  const currentCard = filteredCards[currentIndex];
  const cardProgress = currentCard
    ? progress.find(p => p.cardId === currentCard.id)
    : null;

  // Get example code for a term (simplified)
  const getExampleForTerm = (term: string): string => {
    const examples: Record<string, string> = {
      'Variable': 'name = "Minh"\nprint(f"Xin chào, {name}")',
      'Integer (int)': 'age = 17\nprint(type(age))  # <class \'int\'>',
      'Float': 'price = 9.99\nprint(type(price))  # <class \'float\'>',
      'String (str)': 'message = "Hello"\nprint(message.upper())',
      'Boolean (bool)': 'is_student = True\nprint(type(True))  # <class \'bool\'>',
      'if statement': 'if score >= 8:\n    print("Giỏi")\nelse:\n    print("Khá")',
      'for loop': 'for i in range(5):\n    print(i)',
      'while loop': 'count = 0\nwhile count < 3:\n    print(count)\n    count += 1',
      'List': 'fruits = ["Táo", "Cam"]\nfruits.append("Chuối")',
      'Tuple': 'coordinates = (10, 20)\nx, y = coordinates',
      'Dictionary (dict)': 'student = {"name": "An", "age": 18}\nprint(student["name"])',
      'Function': 'def greet(name):\n    return f"Xin chào, {name}!"',
      'Parameter': 'def add(a, b):\n    return a + b',
      'Return': 'def square(x):\n    return x * x',
      'Class': 'class Person:\n    def __init__(self, name):\n        self.name = name',
      'Object': 'person = Person("Minh")\nprint(person.name)',
      'Inheritance': 'class Student(Person):\n    def __init__(self, name, grade):\n        super().__init__(name)\n        self.grade = grade',
      'try/except': 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Lỗi chia cho 0")',
      'List Comprehension': 'squares = [x**2 for x in range(5)]\nprint(squares)  # [0, 1, 4, 9, 16]',
      'Lambda': 'double = lambda x: x * 2\nprint(double(5))  # 10'
    };
    return examples[term] || '# Example code not available';
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Flashcards</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Python Master 12</p>
                </div>
              </div>
            </div>

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
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.knownCount}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Known</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.learningCount}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Learning</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCards}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Cards</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.streakCount}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Day Streak</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Progress
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {currentIndex + 1} / {totalCards}
            </span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Flashcard */}
        {totalCards > 0 && currentCard ? (
          <div className="mb-8">
            <div
              className="relative h-[400px] cursor-pointer perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                        {currentCard.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {currentCard.category}
                      </span>
                    </div>

                    {/* Term */}
                    <div className="flex-1 flex items-center justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white">
                        {currentCard.term}
                      </h2>
                    </div>

                    {/* Hint */}
                    <div className="text-center text-sm text-slate-400 dark:text-slate-500">
                      Tap to flip
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 180, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col text-white"
                  >
                    {/* Definition */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 opacity-80">Definition</h3>
                      <p className="text-xl leading-relaxed">
                        {currentCard.definition}
                      </p>
                    </div>

                    {/* Example Code */}
                    <div className="flex-1 bg-white/10 rounded-xl p-4 overflow-auto">
                      <h3 className="text-sm font-semibold mb-2 opacity-80">Example</h3>
                      <pre className="text-sm font-mono whitespace-pre-wrap">
                        {getExampleForTerm(currentCard.term)}
                      </pre>
                    </div>

                    {/* Hint */}
                    <div className="text-center text-sm opacity-60 mt-4">
                      Tap to flip back
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No cards in this category
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Select a different category or add more flashcards
            </p>
          </div>
        )}

        {/* Navigation Controls */}
        {totalCards > 0 && (
          <div className="flex items-center justify-between gap-4">
            {/* Previous */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentIndex === 0
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {/* Skip */}
            <button
              onClick={handleSkip}
              disabled={currentIndex === totalCards - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentIndex === totalCards - 1
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <SkipForward className="w-5 h-5" />
              Skip
            </button>

            {/* Next */}
            <button
              onClick={goToNext}
              disabled={currentIndex === totalCards - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentIndex === totalCards - 1
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Action Buttons - Know it / Still Learning */}
        {totalCards > 0 && isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => markCard('learning')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Still Learning
            </button>
            <button
              onClick={() => markCard('known')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-all"
            >
              <Check className="w-5 h-5" />
              Know it!
            </button>
          </motion.div>
        )}

        {/* Session Summary */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Session Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.knownCount}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cards Known</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.learningCount}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Still Learning</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalCards - stats.knownCount - stats.learningCount}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">New Cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}