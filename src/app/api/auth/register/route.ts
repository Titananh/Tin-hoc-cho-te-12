import { NextResponse } from 'next/server';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Mock existing emails for validation
const existingEmails = ['minh@example.com', 'test@example.com'];

function generateToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

function generateId(): string {
  return `user_${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, password' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (existingEmails.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create mock user
    const user = {
      id: generateId(),
      name,
      email: email.toLowerCase(),
      avatar_url: '',
      role: 'student' as const,
      xp: 0,
      level: 1,
      streak_count: 0,
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString()
    };

    const token = generateToken();

    return NextResponse.json(
      { user, token },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Register error:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}