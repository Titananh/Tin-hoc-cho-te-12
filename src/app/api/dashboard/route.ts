import { NextResponse } from 'next/server';
import type { DashboardData, User, Lesson, Badge } from '@/types';

interface DashboardResponse {
  dashboard: DashboardData;
}

// Mock user data
const mockUser: User = {
  id: 'user-1',
  name: 'Minh Nguyễn',
  email: 'minh@example.com',
  avatar_url: '',
  role: 'student',
  xp: 1250,
  level: 5,
  streak_count: 7,
  created_at: '2024-01-15',
  last_active: new Date().toISOString()
};

// Mock lessons
const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    module_id: 'module-1',
    title: 'Python Basics - Variables and Data Types',
    slug: 'python-basics-variables',
    description: 'Learn about Python variables and different data types.',
    content: { objectives: [], theory: '', examples: [], quiz: [], exercises: [] },
    difficulty: 'easy',
    estimated_minutes: 15,
    order_index: 1,
    xp_reward: 100,
    is_published: true
  },
  {
    id: 'lesson-2',
    module_id: 'module-1',
    title: 'Control Flow - If Statements',
    slug: 'control-flow-if-statements',
    description: 'Master conditional statements in Python.',
    content: { objectives: [], theory: '', examples: [], quiz: [], exercises: [] },
    difficulty: 'medium',
    estimated_minutes: 20,
    order_index: 2,
    xp_reward: 150,
    is_published: true
  },
  {
    id: 'lesson-3',
    module_id: 'module-2',
    title: 'Loops - For and While',
    slug: 'loops-for-while',
    description: 'Learn to iterate with loops.',
    content: { objectives: [], theory: '', examples: [], quiz: [], exercises: [] },
    difficulty: 'medium',
    estimated_minutes: 25,
    order_index: 3,
    xp_reward: 175,
    is_published: true
  },
  {
    id: 'lesson-4',
    module_id: 'module-2',
    title: 'Functions - Def and Return',
    slug: 'functions-def-return',
    description: 'Create reusable code with functions.',
    content: { objectives: [], theory: '', examples: [], quiz: [], exercises: [] },
    difficulty: 'medium',
    estimated_minutes: 30,
    order_index: 4,
    xp_reward: 200,
    is_published: true
  },
  {
    id: 'lesson-5',
    module_id: 'module-3',
    title: 'Lists and List Operations',
    slug: 'lists-operations',
    description: 'Master Python lists and common operations.',
    content: { objectives: [], theory: '', examples: [], quiz: [], exercises: [] },
    difficulty: 'hard',
    estimated_minutes: 35,
    order_index: 5,
    xp_reward: 250,
    is_published: true
  }
];

// Mock badges
const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Steps',
    slug: 'first-steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    color: '#4CAF50',
    requirement: 'Complete 1 lesson',
    xp_reward: 50
  },
  {
    id: 'badge-2',
    name: 'Streak Master',
    slug: 'streak-master',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    color: '#FF9800',
    requirement: '7-day streak',
    xp_reward: 100
  },
  {
    id: 'badge-3',
    name: 'Code Warrior',
    slug: 'code-warrior',
    description: 'Solve 10 exercises',
    icon: '⚔️',
    color: '#E91E63',
    requirement: 'Solve 10 exercises',
    xp_reward: 200
  },
  {
    id: 'badge-4',
    name: 'Python Pro',
    slug: 'python-pro',
    description: 'Reach level 10',
    icon: '🐍',
    color: '#2196F3',
    requirement: 'Reach level 10',
    xp_reward: 500
  }
];

// Mock weekly progress
const getWeeklyProgress = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    xp: Math.floor(Math.random() * 200) + 50
  }));
};

// Mock completed lessons (for demo, lessons 1 and 2 are completed)
const completedLessonIds = ['lesson-1', 'lesson-2'];

export async function GET() {
  try {
    const recentLessons = mockLessons.slice(0, 3);
    const suggestedLesson = mockLessons[3]; // Next uncompleted lesson

    const dashboardData: DashboardData = {
      user: mockUser,
      recent_lessons: recentLessons,
      suggested_lesson: suggestedLesson,
      weekly_progress: getWeeklyProgress(),
      badges: mockBadges,
      current_streak: mockUser.streak_count,
      total_xp: mockUser.xp,
      completed_lessons: completedLessonIds.length,
      total_lessons: mockLessons.length
    };

    return NextResponse.json(
      { dashboard: dashboardData },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}