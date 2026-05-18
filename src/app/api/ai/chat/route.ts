import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface AIResponse {
  id: string;
  role: 'assistant';
  content: string;
  created_at: string;
}

// Pattern matching responses for mock AI
const responsePatterns: { pattern: RegExp; response: string }[] = [
  {
    pattern: /what is python|what's python|explain python/i,
    response: "Python is a high-level, interpreted programming language known for its readable syntax and versatility. It's great for web development, data science, AI, automation, and more!"
  },
  {
    pattern: /how do i (use|create|work with) (variable|variables)/i,
    response: "In Python, variables are created when you assign a value to them. Example: `name = \"Minh\"` creates a variable called 'name' with the value 'Minh'. No declaration needed!"
  },
  {
    pattern: /what is a (for|while) loop|how.*loop/i,
    response: "Loops let you repeat code! A `for` loop iterates over a sequence (like a list): `for item in items:`. A `while` loop repeats while a condition is true: `while x > 0:`."
  },
  {
    pattern: /debug|error|not working|bug|fix.*code/i,
    response: "I'd be happy to help debug! Common issues include: 1) Indentation errors (Python relies on whitespace), 2) Typos in variable names, 3) Using `=` instead of `==` for comparison, 4) Misspelling built-in functions. Can you share your code and the error message?"
  },
  {
    pattern: /write.*code|create.*function|help.*code/i,
    response: "I'll help you write code! Please tell me: 1) What programming language (Python, JavaScript, etc.), 2) What you want the code to do, 3) Any specific requirements or constraints."
  },
  {
    pattern: /list|array|dictionary|dict/i,
    response: "Python has built-in collection types: Lists (ordered, mutable): `my_list = [1, 2, 3]` • Tuples (ordered, immutable): `my_tuple = (1, 2, 3)` • Dictionaries (key-value): `my_dict = {'name': 'Minh'}` • Sets (unordered, unique): `my_set = {1, 2, 3}`"
  },
  {
    pattern: /function|def.*method/i,
    response: "In Python, you define functions using `def`: ```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nresult = greet(\"Minh\")\nprint(result)  # Output: Hello, Minh!```"
  },
  {
    pattern: /class|object|oop/i,
    response: "Python supports OOP! Example: ```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        return f\"{self.name} says Woof!\"\n\nmy_dog = Dog(\"Buddy\")\nprint(my_dog.bark())```"
  }
];

function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Find matching pattern
  for (const { pattern, response } of responsePatterns) {
    if (pattern.test(message)) {
      return response;
    }
  }

  // Default responses
  if (message.includes('?')) {
    return "That's a great question! I can help with Python programming, code debugging, explaining concepts, and more. What specifically would you like to know?";
  }

  return "I understand you're asking about Python. Could you be more specific? I can help with syntax, concepts, debugging, code examples, and more!";
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid field: messages (array required)' },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: 'No user message found in messages array' },
        { status: 400 }
      );
    }

    // Generate AI response
    const aiContent = generateResponse(lastUserMessage.content);

    const aiResponse: AIResponse = {
      id: generateId(),
      role: 'assistant',
      content: aiContent,
      created_at: new Date().toISOString()
    };

    return NextResponse.json(
      { message: aiResponse },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('AI Chat error:', error);
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