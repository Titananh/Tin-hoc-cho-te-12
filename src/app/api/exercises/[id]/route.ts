import { NextResponse } from 'next/server';
import type { Exercise, TestCase, Submission } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface SubmissionRequest {
  code: string;
}

// Mock exercises database
const mockExercises: Record<string, Exercise> = {
  'exercise-1': {
    id: 'exercise-1',
    lesson_id: 'lesson-1',
    title: 'Variable Assignment',
    description: 'Create a variable called "greeting" with the value "Hello, Python!" and print it.',
    difficulty: 'easy',
    starter_code: '# Create a variable called greeting\n\n# Print the greeting',
    solution_code: 'greeting = "Hello, Python!"\nprint(greeting)',
    hints: [
      'Use the = operator to assign a value',
      'Remember to use quotes for strings'
    ],
    xp_reward: 50,
    test_cases: [
      {
        input: '',
        expected_output: 'Hello, Python!',
        is_hidden: false
      }
    ]
  },
  'exercise-2': {
    id: 'exercise-2',
    lesson_id: 'lesson-2',
    title: 'FizzBuzz Challenge',
    description: 'Print numbers from 1 to 15. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz".',
    difficulty: 'medium',
    starter_code: '# Write your FizzBuzz solution here',
    solution_code: 'for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    hints: [
      'Use the range() function',
      'Check for divisibility using % operator'
    ],
    xp_reward: 100,
    test_cases: [
      {
        input: '',
        expected_output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
        is_hidden: false
      }
    ]
  }
};

interface TestResult {
  input: string;
  expected_output: string;
  actual_output: string;
  passed: boolean;
}

interface SubmissionResult {
  status: 'accepted' | 'wrong' | 'error';
  score: number;
  output: string;
  test_results: TestResult[];
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const exercise = mockExercises[id];

    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    // Return exercise without solution
    const safeExercise = {
      ...exercise,
      solution_code: undefined // Hide solution
    };

    return NextResponse.json(
      { exercise: safeExercise },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Get exercise error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: SubmissionRequest = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Missing required field: code' },
        { status: 400 }
      );
    }

    const exercise = mockExercises[id];

    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    // Simulate code execution and validation
    const testResults: TestResult[] = [];
    let allPassed = true;
    const outputs: string[] = [];

    for (const testCase of exercise.test_cases) {
      // Mock execution - in real implementation, this would run the code safely
      const actualOutput = simulateExecution(code, testCase);
      const passed = actualOutput.trim() === testCase.expected_output.trim();

      testResults.push({
        input: testCase.input,
        expected_output: testCase.expected_output,
        actual_output: actualOutput,
        passed
      });

      if (!passed) allPassed = false;
      outputs.push(actualOutput);
    }

    // Calculate score based on test results
    const passedCount = testResults.filter(t => t.passed).length;
    const score = Math.round((passedCount / testResults.length) * 100);

    const result: SubmissionResult = {
      status: allPassed ? 'accepted' : 'wrong',
      score,
      output: outputs.join('\n'),
      test_results: testResults
    };

    return NextResponse.json(
      { submission: result },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Submit exercise error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock execution function - simulates code output
function simulateExecution(code: string, testCase: TestCase): string {
  // This is a simplified mock - real implementation would use a sandbox
  // For demo purposes, we'll check if code contains expected patterns

  // Mock FizzBuzz detection
  if (code.includes('FizzBuzz') || code.includes('range(1, 16)')) {
    return testCase.expected_output;
  }

  // Mock variable greeting detection
  if (code.includes('greeting') && code.includes('print')) {
    return 'Hello, Python!';
  }

  // Default: return expected output if code is non-empty
  if (code.trim().length > 0) {
    return testCase.expected_output;
  }

  return '';
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}