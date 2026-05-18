import { NextResponse } from 'next/server';
import type { Lesson } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Mock lessons database
const mockLessons: Record<string, Lesson> = {
  'lesson-1': {
    id: 'lesson-1',
    module_id: 'module-1',
    title: 'Python Basics - Variables and Data Types',
    slug: 'python-basics-variables',
    description: 'Learn about Python variables and different data types including strings, integers, and floats.',
    content: {
      objectives: [
        'Understand what variables are in Python',
        'Learn about different data types',
        'Practice creating and using variables'
      ],
      theory: 'Variables in Python are used to store data values. Unlike other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.',
      examples: [
        {
          title: 'Creating Variables',
          code: 'name = "Minh"\nage = 25\nheight = 1.75\nis_student = True\n\nprint(name)\nprint(age)',
          explanation: 'Variables are created when you assign a value to them using the = operator.',
          output: 'Minh\n25'
        }
      ],
      quiz: [],
      exercises: []
    },
    difficulty: 'easy',
    estimated_minutes: 15,
    order_index: 1,
    xp_reward: 100,
    is_published: true
  },
  'lesson-2': {
    id: 'lesson-2',
    module_id: 'module-1',
    title: 'Control Flow - If Statements',
    slug: 'control-flow-if-statements',
    description: 'Master conditional statements in Python to control program flow.',
    content: {
      objectives: [
        'Learn to use if statements',
        'Understand elif and else clauses',
        'Build conditional logic'
      ],
      theory: 'Control flow statements allow you to execute code conditionally based on certain conditions. The if statement is the most basic form of conditional execution.',
      examples: [
        {
          title: 'Simple If Statement',
          code: 'age = 18\n\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a minor")',
          explanation: 'The if statement checks if the condition is true.',
          output: 'You are an adult'
        }
      ],
      quiz: [],
      exercises: []
    },
    difficulty: 'medium',
    estimated_minutes: 20,
    order_index: 2,
    xp_reward: 150,
    is_published: true
  },
  'lesson-3': {
    id: 'lesson-3',
    module_id: 'module-2',
    title: 'Loops - For and While',
    slug: 'loops-for-while',
    description: 'Learn to iterate with for loops and while loops in Python.',
    content: {
      objectives: [
        'Understand for loops',
        'Master while loops',
        'Learn loop control statements'
      ],
      theory: 'Loops allow you to execute a block of code multiple times. Python supports two types of loops: for loops and while loops.',
      examples: [
        {
          title: 'For Loop',
          code: 'fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(fruit)',
          explanation: 'For loops iterate over sequences like lists.',
          output: 'apple\nbanana\ncherry'
        }
      ],
      quiz: [],
      exercises: []
    },
    difficulty: 'medium',
    estimated_minutes: 25,
    order_index: 3,
    xp_reward: 175,
    is_published: true
  }
};

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const lesson = mockLessons[id];

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { lesson },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Get lesson error:', error);
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