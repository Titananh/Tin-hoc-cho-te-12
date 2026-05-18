# Python Master 12 - API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication via Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Table of Contents

1. [Auth](#auth)
   - [POST /api/auth/register](#post-apiauthregister)
   - [POST /api/auth/login](#post-apiauthlogin)
   - [GET /api/auth/me](#get-apiauthme)
2. [Courses & Lessons](#courses--lessons)
   - [GET /api/courses](#get-apicourses)
   - [GET /api/lessons/[id]](#get-apilessonsid)
   - [POST /api/lessons/[id]/complete](#post-apilessonsidcomplete)
3. [Exercises](#exercises)
   - [GET /api/exercises/[id]](#get-apiexercisesid)
   - [POST /api/exercises/[id]/submit](#post-apiexercisesidsubmit)
4. [Dashboard](#dashboard)
   - [GET /api/dashboard](#get-apidashboard)
5. [AI](#ai)
   - [POST /api/ai/chat](#post-apiaichat)
6. [Gamification](#gamification)
   - [GET /api/badges](#get-apibadges)
   - [GET /api/leaderboard](#get-apileaderboard)
7. [Admin](#admin)
   - [Lessons CRUD](#lessons-crud)
   - [Exercises CRUD](#exercises-crud)

---

## Auth

### POST /api/auth/register

Register a new user account.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | User's display name |
| `email` | string | Yes | Valid email address |
| `password` | string | Yes | Minimum 6 characters |

**Request Example:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minh Nguyễn",
    "email": "minh@example.com",
    "password": "password123"
  }'
```

**Response (201 Created):**

```json
{
  "user": {
    "id": "user_1749123456789_abc123",
    "name": "Minh Nguyễn",
    "email": "minh@example.com",
    "avatar_url": "",
    "role": "student",
    "xp": 0,
    "level": 1,
    "streak_count": 0,
    "created_at": "2026-05-17T10:30:00.000Z",
    "last_active": "2026-05-17T10:30:00.000Z"
  },
  "token": "token_1749123456789_abc123xyz"
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 400 | `Missing required fields: name, email, password` | Required fields not provided |
| 400 | `Invalid email format` | Email doesn't match pattern |
| 400 | `Password must be at least 6 characters` | Password too short |
| 409 | `Email already registered` | Email exists in system |

---

### POST /api/auth/login

Authenticate user and receive token.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Registered email |
| `password` | string | Yes | User password |

**Request Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "minh@example.com",
    "password": "password123"
  }'
```

**Response (200 OK):**

```json
{
  "user": {
    "id": "user-1",
    "name": "Minh Nguyễn",
    "email": "minh@example.com",
    "avatar_url": "",
    "role": "student",
    "xp": 1250,
    "level": 5,
    "streak_count": 7,
    "created_at": "2024-01-15",
    "last_active": "2026-05-17T10:30:00.000Z"
  },
  "token": "token_1749123456789_abc123xyz"
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 400 | `Missing required fields: email, password` | Required fields not provided |
| 401 | `Invalid credentials` | Email not found or wrong password |

---

### GET /api/auth/me

Get current authenticated user profile.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Example:**

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer token_1749123456789_abc123xyz"
```

**Response (200 OK):**

```json
{
  "user": {
    "id": "user-1",
    "name": "Minh Nguyễn",
    "email": "minh@example.com",
    "avatar_url": "",
    "role": "student",
    "xp": 1250,
    "level": 5,
    "streak_count": 7,
    "created_at": "2024-01-15",
    "last_active": "2026-05-17T10:30:00.000Z"
  }
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 401 | `Unauthorized` | Missing or invalid token |

---

## Courses & Lessons

### GET /api/courses

Retrieve all available courses.

**Request Example:**

```bash
curl -X GET http://localhost:3000/api/courses
```

**Response (200 OK):**

```json
{
  "courses": [
    {
      "id": "course-1",
      "title": "Nhập môn Python",
      "slug": "nhap-mon-python",
      "description": "Introduction to Python programming basics",
      "icon": "🐍",
      "color": "#3B82F6",
      "order_index": 1,
      "is_published": true,
      "modules_count": 3,
      "lessons_count": 10
    },
    {
      "id": "course-2",
      "title": "Điều kiện và vòng lặp",
      "slug": "dieu-kien-vong-lap",
      "description": "Conditional statements and loops in Python",
      "icon": "🔄",
      "color": "#8B5CF6",
      "order_index": 2,
      "is_published": true,
      "modules_count": 2,
      "lessons_count": 8
    }
  ]
}
```

---

### GET /api/lessons/[id]

Get a specific lesson by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Lesson ID (e.g., `lesson-1`) |

**Request Example:**

```bash
curl -X GET http://localhost:3000/api/lessons/lesson-1
```

**Response (200 OK):**

```json
{
  "lesson": {
    "id": "lesson-1",
    "module_id": "module-1",
    "title": "Python Basics - Variables and Data Types",
    "slug": "python-basics-variables",
    "description": "Learn about Python variables and different data types including strings, integers, and floats.",
    "content": {
      "objectives": [
        "Understand what variables are in Python",
        "Learn about different data types",
        "Practice creating and using variables"
      ],
      "theory": "Variables in Python are used to store data values...",
      "examples": [
        {
          "title": "Creating Variables",
          "code": "name = \"Minh\"\nage = 25\nheight = 1.75\nis_student = True\n\nprint(name)\nprint(age)",
          "explanation": "Variables are created when you assign a value to them using the = operator.",
          "output": "Minh\n25"
        }
      ],
      "quiz": [],
      "exercises": []
    },
    "difficulty": "easy",
    "estimated_minutes": 15,
    "order_index": 1,
    "xp_reward": 100,
    "is_published": true
  }
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 404 | `Lesson not found` | No lesson with given ID |

---

### POST /api/lessons/[id]/complete

Mark a lesson as completed and award XP.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Lesson ID |

**Headers:**

```
Authorization: Bearer <token>
```

**Request Example:**

```bash
curl -X POST http://localhost:3000/api/lessons/lesson-1/complete \
  -H "Authorization: Bearer token_1749123456789_abc123xyz"
```

**Response (200 OK):**

```json
{
  "success": true,
  "lesson_id": "lesson-1",
  "xp_earned": 100,
  "user": {
    "xp": 1350,
    "level": 5,
    "streak_count": 7
  }
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 401 | `Unauthorized` | Missing or invalid token |
| 404 | `Lesson not found` | No lesson with given ID |
| 400 | `Lesson already completed` | User already completed this lesson |

---

## Exercises

### GET /api/exercises/[id]

Get a specific exercise by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Exercise ID (e.g., `exercise-1`) |

**Request Example:**

```bash
curl -X GET http://localhost:3000/api/exercises/exercise-1
```

**Response (200 OK):**

```json
{
  "exercise": {
    "id": "exercise-1",
    "lesson_id": "lesson-1",
    "title": "Variable Assignment",
    "description": "Create a variable called \"greeting\" with the value \"Hello, Python!\" and print it.",
    "difficulty": "easy",
    "starter_code": "# Create a variable called greeting\n\n# Print the greeting",
    "solution_code": null,
    "hints": [
      "Use the = operator to assign a value",
      "Remember to use quotes for strings"
    ],
    "xp_reward": 50,
    "test_cases": [
      {
        "input": "",
        "expected_output": "Hello, Python!",
        "is_hidden": false
      }
    ]
  }
}
```

**Note:** `solution_code` is always `null` in GET requests to prevent leakage.

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 404 | `Exercise not found` | No exercise with given ID |

---

### POST /api/exercises/[id]/submit

Submit code solution for an exercise.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Exercise ID |

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | Python code solution |

**Request Example:**

```bash
curl -X POST http://localhost:3000/api/exercises/exercise-1/submit \
  -H "Authorization: Bearer token_1749123456789_abc123xyz" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "greeting = \"Hello, Python!\"\nprint(greeting)"
  }'
```

**Response (200 OK):**

```json
{
  "submission": {
    "status": "accepted",
    "score": 100,
    "output": "Hello, Python!",
    "test_results": [
      {
        "input": "",
        "expected_output": "Hello, Python!",
        "actual_output": "Hello, Python!",
        "passed": true
      }
    ]
  }
}
```

**Response (Wrong Answer - 200 OK):**

```json
{
  "submission": {
    "status": "wrong",
    "score": 0,
    "output": "",
    "test_results": [
      {
        "input": "",
        "expected_output": "Hello, Python!",
        "actual_output": "",
        "passed": false
      }
    ]
  }
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 400 | `Missing required field: code` | Code field not provided |
| 401 | `Unauthorized` | Missing or invalid token |
| 404 | `Exercise not found` | No exercise with given ID |

---

## Dashboard

### GET /api/dashboard

Get dashboard data for the authenticated user.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Example:**

```bash
curl -X GET http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer token_1749123456789_abc123xyz"
```

**Response (200 OK):**

```json
{
  "dashboard": {
    "user": {
      "id": "user-1",
      "name": "Minh Nguyễn",
      "email": "minh@example.com",
      "avatar_url": "",
      "role": "student",
      "xp": 1250,
      "level": 5,
      "streak_count": 7,
      "created_at": "2024-01-15",
      "last_active": "2026-05-17T10:30:00.000Z"
    },
    "recent_lessons": [
      {
        "id": "lesson-1",
        "module_id": "module-1",
        "title": "Python Basics - Variables and Data Types",
        "slug": "python-basics-variables",
        "description": "Learn about Python variables and different data types.",
        "difficulty": "easy",
        "estimated_minutes": 15,
        "xp_reward": 100,
        "is_published": true
      }
    ],
    "suggested_lesson": {
      "id": "lesson-4",
      "module_id": "module-2",
      "title": "Functions - Def and Return",
      "slug": "functions-def-return",
      "description": "Create reusable code with functions.",
      "difficulty": "medium",
      "estimated_minutes": 30,
      "xp_reward": 200,
      "is_published": true
    },
    "weekly_progress": [
      { "day": "Mon", "xp": 150 },
      { "day": "Tue", "xp": 200 },
      { "day": "Wed", "xp": 100 },
      { "day": "Thu", "xp": 175 },
      { "day": "Fri", "xp": 225 },
      { "day": "Sat", "xp": 80 },
      { "day": "Sun", "xp": 120 }
    ],
    "badges": [
      {
        "id": "badge-1",
        "name": "First Steps",
        "slug": "first-steps",
        "description": "Complete your first lesson",
        "icon": "🎯",
        "color": "#4CAF50",
        "requirement": "Complete 1 lesson",
        "xp_reward": 50
      }
    ],
    "current_streak": 7,
    "total_xp": 1250,
    "completed_lessons": 2,
    "total_lessons": 5
  }
}
```

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 401 | `Unauthorized` | Missing or invalid token |

---

## AI

### POST /api/ai/chat

Chat with PyMate AI tutor.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `messages` | array | Yes | Array of chat messages |

**Message Object:**

| Field | Type | Description |
|-------|------|-------------|
| `role` | string | `"user"` or `"assistant"` |
| `content` | string | Message text |

**Request Example:**

```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What is a for loop in Python?"
      }
    ]
  }'
```

**Response (200 OK):**

```json
{
  "message": {
    "id": "msg_1749123456789_abc123",
    "role": "assistant",
    "content": "Loops let you repeat code! A `for` loop iterates over a sequence (like a list): `for item in items:`. A `while` loop repeats while a condition is true: `while x > 0:`.",
    "created_at": "2026-05-17T10:30:00.000Z"
  }
}
```

**Supported Topics:**

| Pattern Keywords | Response Type |
|------------------|----------------|
| `what is python` | Python introduction |
| `variable` | Variable creation and usage |
| `for loop`, `while loop`, `loop` | Loop explanation with examples |
| `debug`, `error`, `bug`, `not working` | Debugging assistance |
| `write code`, `create function` | Code writing help |
| `list`, `array`, `dictionary`, `dict` | Data structures overview |
| `function`, `def`, `method` | Function definition examples |
| `class`, `object`, `oop` | OOP concepts and examples |

**Error Responses:**

| Status | Error | Description |
|--------|-------|-------------|
| 400 | `Missing or invalid field: messages (array required)` | Invalid messages format |
| 400 | `No user message found in messages array` | No user message in array |

---

## Gamification

### GET /api/badges

Get all available badges.

**Request Example:**

```bash
curl -X GET http://localhost:3000/api/badges
```

**Response (200 OK):**

```json
{
  "badges": [
    {
      "id": "badge-1",
      "name": "First Steps",
      "slug": "first-steps",
      "description": "Complete your first lesson",
      "icon": "🎯",
      "color": "#4CAF50",
      "requirement": "Complete 1 lesson",
      "xp_reward": 50
    },
    {
      "id": "badge-2",
      "name": "Streak Master",
      "slug": "streak-master",
      "description": "Maintain a 7-day streak",
      "icon": "🔥",
      "color": "#FF9800",
      "requirement": "7-day streak",
      "xp_reward": 100
    },
    {
      "id": "badge-3",
      "name": "Code Warrior",
      "slug": "code-warrior",
      "description": "Solve 10 exercises",
      "icon": "⚔️",
      "color": "#E91E63",
      "requirement": "Solve 10 exercises",
      "xp_reward": 200
    },
    {
      "id": "badge-4",
      "name": "Python Pro",
      "slug": "python-pro",
      "description": "Reach level 10",
      "icon": "🐍",
      "color": "#2196F3",
      "requirement": "Reach level 10",
      "xp_reward": 500
    }
  ]
}
```

---

### GET /api/leaderboard

Get top users ranked by XP.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 10 | Number of users to return (max 100) |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/leaderboard?limit=5"
```

**Response (200 OK):**

```json
{
  "leaderboard": [
    {
      "rank": 1,
      "user": {
        "id": "user-3",
        "name": "Tuấn Phạm",
        "avatar_url": "",
        "level": 12,
        "xp": 4500
      }
    },
    {
      "rank": 2,
      "user": {
        "id": "user-1",
        "name": "Minh Nguyễn",
        "avatar_url": "",
        "level": 5,
        "xp": 1250
      }
    }
  ],
  "current_user_rank": 15,
  "total_users": 150
}
```

---

## Admin

### Lessons CRUD

Admin endpoints for managing lessons.

#### GET /api/admin/lessons

List all lessons with pagination.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `course_id` | string | - | Filter by course |

#### GET /api/admin/lessons/[id]

Get a single lesson by ID.

#### POST /api/admin/lessons

Create a new lesson.

**Request Body:**

```json
{
  "module_id": "module-1",
  "title": "New Lesson Title",
  "slug": "new-lesson-title",
  "description": "Lesson description",
  "content": {
    "objectives": [],
    "theory": "",
    "examples": [],
    "quiz": [],
    "exercises": []
  },
  "difficulty": "easy",
  "estimated_minutes": 15,
  "order_index": 5,
  "xp_reward": 100,
  "is_published": false
}
```

#### PUT /api/admin/lessons/[id]

Update an existing lesson.

#### DELETE /api/admin/lessons/[id]

Delete a lesson.

---

### Exercises CRUD

Admin endpoints for managing exercises.

#### GET /api/admin/exercises

List all exercises.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `lesson_id` | string | - | Filter by lesson |
| `difficulty` | string | - | Filter by difficulty |

#### GET /api/admin/exercises/[id]

Get a single exercise (includes solution).

#### POST /api/admin/exercises

Create a new exercise.

**Request Body:**

```json
{
  "lesson_id": "lesson-1",
  "title": "New Exercise Title",
  "description": "Exercise description",
  "difficulty": "easy",
  "starter_code": "# Starter code here",
  "solution_code": "# Solution code here",
  "hints": ["Hint 1", "Hint 2"],
  "xp_reward": 50,
  "test_cases": [
    {
      "input": "",
      "expected_output": "Expected output",
      "is_hidden": false
    }
  ]
}
```

#### PUT /api/admin/exercises/[id]

Update an existing exercise.

#### DELETE /api/admin/exercises/[id]

Delete an exercise.

---

## Common Error Response Format

All error responses follow this structure:

```json
{
  "error": "Error message description"
}
```

## HTTP Status Codes Summary

| Status | Usage |
|--------|-------|
| 200 | Successful GET, POST, PUT |
| 201 | Successful creation (register, new resource) |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Resource not found |
| 409 | Conflict (email already exists) |
| 500 | Internal server error |