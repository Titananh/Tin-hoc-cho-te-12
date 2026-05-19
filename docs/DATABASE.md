# Database Schema Documentation

## Python Master 12

**Version:** 1.0.0  
**Last Updated:** May 2026

---

## Table of Contents

1. [Data Types Explanation](#data-types-explanation)
2. [Database Tables](#database-tables)
3. [Index Recommendations](#index-recommendations)
4. [Seed Data Requirements](#seed-data-requirements)

---

## Data Types Explanation

| Type | Description |
|------|-------------|
| `INTEGER` | Whole numbers (auto-incrementing primary key) |
| `VARCHAR(n)` | Variable-length string with max length `n` |
| `TEXT` | Long-form text content |
| `BOOLEAN` | True/false flag |
| `JSON` | JSON-serialized data stored as text |
| `TIMESTAMP` | Date and time with timezone |
| `DATE` | Date only (no time) |
| `INT` | Integer numbers |
| `BIGINT` | Large integers (for foreign keys) |

---

## Database Tables

### 1. users

User accounts for the learning platform.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| `name` | VARCHAR(255) | NOT NULL | Display name |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | User email address |
| `avatar_url` | VARCHAR(500) | NULL | Profile avatar URL |
| `role` | VARCHAR(50) | NOT NULL, DEFAULT 'student' | User role (student/admin/instructor) |
| `xp` | INT | NOT NULL, DEFAULT 0 | Total experience points |
| `level` | INT | NOT NULL, DEFAULT 1 | Current level (1-12) |
| `streak_count` | INT | NOT NULL, DEFAULT 0 | Current daily streak count |
| `created_at` | TIMESTAMP | NOT NULL | Account creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL | Last update timestamp |
| `last_active` | TIMESTAMP | NOT NULL | Last activity timestamp |

**Relationships:**
- One-to-Many with `submissions` (user_id)
- One-to-Many with `user_badges` (user_id)
- One-to-Many with `user_progress` (user_id)
- One-to-Many with `xp_logs` (user_id)
- One-to-One with `streaks` (user_id)
- One-to-Many with `ai_chat_history` (user_id)
- One-to-Many with `notifications` (user_id)

---

### 2. courses

Top-level course categories.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique course identifier |
| `title` | VARCHAR(255) | NOT NULL | Course title |
| `slug` | VARCHAR(255) | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | NULL | Course description |
| `icon` | VARCHAR(100) | NULL | Icon identifier (emoji or class name) |
| `color` | VARCHAR(7) | NULL | Hex color code (e.g., #FF5733) |
| `order_index` | INT | NOT NULL, DEFAULT 0 | Display order |
| `is_published` | BOOLEAN | NOT NULL, DEFAULT FALSE | Publication status |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- One-to-Many with `modules` (course_id)

---

### 3. modules

Course sections/modules.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique module identifier |
| `course_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to parent course |
| `title` | VARCHAR(255) | NOT NULL | Module title |
| `slug` | VARCHAR(255) | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | NULL | Module description |
| `icon` | VARCHAR(100) | NULL | Icon identifier |
| `color` | VARCHAR(7) | NULL | Hex color code |
| `order_index` | INT | NOT NULL, DEFAULT 0 | Display order within course |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- Many-to-One with `courses` (course_id)
- One-to-Many with `lessons` (module_id)

**Foreign Key:**
```sql
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
```

---

### 4. lessons

Individual learning content units.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique lesson identifier |
| `module_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to parent module |
| `title` | VARCHAR(255) | NOT NULL | Lesson title |
| `slug` | VARCHAR(255) | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | NULL | Lesson description |
| `content` | JSON | NOT NULL | Lesson content (markdown/code blocks) |
| `difficulty` | VARCHAR(20) | NOT NULL | beginner/intermediate/advanced |
| `estimated_minutes` | INT | NOT NULL | Estimated completion time |
| `order_index` | INT | NOT NULL, DEFAULT 0 | Display order within module |
| `xp_reward` | INT | NOT NULL, DEFAULT 10 | XP awarded for completion |
| `is_published` | BOOLEAN | NOT NULL, DEFAULT FALSE | Publication status |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- Many-to-One with `modules` (module_id)
- One-to-Many with `exercises` (lesson_id)
- One-to-Many with `user_progress` (lesson_id)

**Foreign Key:**
```sql
FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
```

**JSON Content Structure:**
```json
{
  "type": "markdown|video|interactive",
  "body": "string (markdown or video URL)",
  "resources": [{ "title": "string", "url": "string" }]
}
```

---

### 5. exercises

Coding exercises linked to lessons.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique exercise identifier |
| `lesson_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to parent lesson |
| `title` | VARCHAR(255) | NOT NULL | Exercise title |
| `description` | TEXT | NOT NULL | Exercise instructions |
| `difficulty` | VARCHAR(20) | NOT NULL | beginner/intermediate/advanced |
| `starter_code` | TEXT | NOT NULL | Starting code template |
| `solution_code` | TEXT | NOT NULL | Correct solution code |
| `hints` | JSON | NULL | Array of progressive hints |
| `xp_reward` | INT | NOT NULL, DEFAULT 5 | XP awarded for passing |
| `test_cases` | JSON | NOT NULL | Test cases for validation |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- Many-to-One with `lessons` (lesson_id)
- One-to-Many with `submissions` (exercise_id)

**Foreign Key:**
```sql
FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
```

**JSON Hints Structure:**
```json
["First hint text", "Second hint text", "Third hint text"]
```

**JSON Test Cases Structure:**
```json
[
  {
    "input": "test input",
    "expected": "expected output",
    "is_hidden": false
  }
]
```

---

### 6. submissions

User code submissions for exercises.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique submission identifier |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to user |
| `exercise_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to exercise |
| `code` | TEXT | NOT NULL | Submitted code |
| `status` | VARCHAR(20) | NOT NULL | pending/accepted/wrong_answer/error |
| `runtime` | INT | NULL | Execution time in milliseconds |
| `score` | INT | NULL | Score percentage (0-100) |
| `created_at` | TIMESTAMP | NOT NULL | Submission timestamp |

**Relationships:**
- Many-to-One with `users` (user_id)
- Many-to-One with `exercises` (exercise_id)

**Foreign Keys:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
```

---

### 7. badges

Achievement badges available to earn.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique badge identifier |
| `name` | VARCHAR(100) | NOT NULL | Badge display name |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | NOT NULL | Badge description |
| `icon` | VARCHAR(100) | NOT NULL | Icon identifier (emoji or class name) |
| `color` | VARCHAR(7) | NOT NULL | Hex color code |
| `requirement` | VARCHAR(255) | NOT NULL | Criteria to earn badge |
| `xp_reward` | INT | NOT NULL, DEFAULT 0 | XP awarded when earned |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- One-to-Many with `user_badges` (badge_id)

---

### 8. user_badges

Tracks badges earned by users.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique record identifier |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to user |
| `badge_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to badge |
| `earned_at` | TIMESTAMP | NOT NULL | When badge was earned |

**Relationships:**
- Many-to-One with `users` (user_id)
- Many-to-One with `badges` (badge_id)

**Foreign Keys:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
```

**Unique Constraint:**
```sql
UNIQUE (user_id, badge_id)
```

---

### 9. user_progress

Tracks user progress on lessons.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique record identifier |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to user |
| `lesson_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to lesson |
| `is_completed` | BOOLEAN | NOT NULL, DEFAULT FALSE | Completion status |
| `completed_at` | TIMESTAMP | NULL | Completion timestamp |
| `time_spent` | INT | NOT NULL, DEFAULT 0 | Time spent in seconds |
| `score` | INT | NULL | Score percentage (0-100) |

**Relationships:**
- Many-to-One with `users` (user_id)
- Many-to-One with `lessons` (lesson_id)

**Foreign Keys:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
```

**Unique Constraint:**
```sql
UNIQUE (user_id, lesson_id)
```

---

### 10. xp_logs

Experience point transaction history.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique log identifier |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to user |
| `amount` | INT | NOT NULL | XP amount (positive or negative) |
| `reason` | VARCHAR(255) | NOT NULL | Reason for XP change |
| `created_at` | TIMESTAMP | NOT NULL | Log timestamp |

**Relationships:**
- Many-to-One with `users` (user_id)

**Foreign Key:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

**Sample Reasons:**
- `lesson_completed:lesson_id`
- `exercise_accepted:exercise_id`
- `badge_earned:badge_id`
- `daily_login`
- `streak_bonus:days`

---

### 11. streaks

User streak tracking.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique record identifier |
| `user_id` | BIGINT | NOT NULL, UNIQUE, FOREIGN KEY | Reference to user |
| `current_streak` | INT | NOT NULL, DEFAULT 0 | Current consecutive days |
| `longest_streak` | INT | NOT NULL, DEFAULT 0 | All-time longest streak |
| `last_activity_date` | DATE | NOT NULL | Last activity date |

**Relationships:**
- One-to-One with `users` (user_id)

**Foreign Key:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

---

### 12. ai_chat_history

AI tutor conversation history.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique session identifier |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to user |
| `messages` | JSON | NOT NULL | Array of message objects |
| `created_at` | TIMESTAMP | NOT NULL | Session creation timestamp |

**Relationships:**
- Many-to-One with `users` (user_id)

**Foreign Key:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

**JSON Messages Structure:**
```json
[
  {
    "role": "user|assistant",
    "content": "message text",
    "timestamp": "ISO 8601 datetime"
  }
]
```

---

### 13. notifications

User notifications and alerts.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique notification identifier |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | Reference to user |
| `title` | VARCHAR(255) | NOT NULL | Notification title |
| `content` | TEXT | NOT NULL | Notification content |
| `type` | VARCHAR(50) | NOT NULL | achievement/lesson/exercise/system |
| `is_read` | BOOLEAN | NOT NULL, DEFAULT FALSE | Read status |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- Many-to-One with `users` (user_id)

**Foreign Key:**
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

---

### 14. flashcards

Flashcard collection for spaced learning.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique flashcard identifier |
| `term` | VARCHAR(500) | NOT NULL | Flashcard term/question |
| `definition` | TEXT | NOT NULL | Flashcard definition/answer |
| `category` | VARCHAR(100) | NULL | Category or topic |
| `difficulty` | VARCHAR(20) | NOT NULL, DEFAULT 'beginner' | beginner/intermediate/advanced |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

---

## Index Recommendations

### High Priority Indexes (Performance Critical)

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_last_active ON users(last_active);

-- Submission queries
CREATE INDEX idx_submissions_user_exercise ON submissions(user_id, exercise_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);

-- Progress tracking
CREATE INDEX idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);

-- Lesson queries
CREATE INDEX idx_lessons_module_order ON lessons(module_id, order_index);

-- Module queries
CREATE INDEX idx_modules_course_order ON modules(course_id, order_index);
```

### Medium Priority Indexes

```sql
-- Badge queries
CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- XP log queries
CREATE INDEX idx_xp_logs_user_created ON xp_logs(user_id, created_at);

-- Notification queries
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- Flashcard queries
CREATE INDEX idx_flashcards_category ON flashcards(category);
```

### Low Priority Indexes (Query Specific)

```sql
-- Search functionality
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_modules_slug ON modules(slug);
CREATE INDEX idx_lessons_slug ON lessons(slug);

-- Streak maintenance
CREATE INDEX idx_streaks_last_activity ON streaks(last_activity_date);
```

---

## Seed Data Requirements

### Initial Admin User

```json
{
  "name": "Admin",
  "email": "admin@pythonmaster12.com",
  "role": "admin",
  "avatar_url": null,
  "xp": 0,
  "level": 1,
  "streak_count": 0
}
```

### Sample Courses

| Title | Slug | Description | Icon | Color |
|-------|------|-------------|------|-------|
| Python Basics | python-basics | Introduction to Python programming | 🐍 | #3776AB |
| Data Structures | data-structures | Lists, dictionaries, sets, and more | 📦 | #FDD835 |
| Object-Oriented Programming | oop | Classes, inheritance, and polymorphism | 🏗️ | #E91E63 |
| Web Development | web-dev | Flask, Django, and web basics | 🌐 | #4CAF50 |

### Sample Badges

| Name | Slug | Description | Requirement | XP |
|------|------|-------------|--------------|-----|
| First Steps | first-steps | Complete your first lesson | lesson_count:1 | 10 |
| Streak Starter | streak-starter | Maintain a 3-day streak | streak:3 | 25 |
| Code Warrior | code-warrior | Submit 10 exercises | submissions:10 | 50 |
| Python Master | python-master | Complete all courses | courses_completed:all | 500 |

### Difficulty Levels

| Level | XP Range | Badge Examples |
|-------|----------|----------------|
| Beginner | 1-100 XP | first_steps, streak_starter |
| Intermediate | 101-500 XP | code_warrior, fast_learner |
| Advanced | 501-2000 XP | python_master, perfectionist |

### Default Flashcard Categories

- `python-basics`
- `data-structures`
- `oop-concepts`
- `algorithms`
- `best-practices`

---

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   courses   │──────<│   modules   │──────<│   lessons   │
└─────────────┘       └─────────────┘       └─────────────┘
                                                    │
                                                    │
                                         ┌──────┐   │
                                         │exer- │───┘
                                         │cises │
                                         └──────┘
                                            │
                                            ▼
                                      ┌───────────┐
                                      │submissions│
                                      └───────────┘

┌─────────────┐       ┌─────────────┐
│    users    │──────<│user_badges  │
└─────────────┘       └─────────────┘
       │
       ├──────<│user_progress  │
       │       └──────────────┘
       │
       ├──────<│xp_logs        │
       │
       ├──────<│ai_chat_history│
       │
       ├──────<│notifications  │
       │
       └───────│   streaks     │
```

---

## Notes

- All tables include `created_at` timestamps for audit tracking
- Soft deletes recommended for users (preserve data integrity)
- JSON columns should be validated on write operations
- Foreign key constraints use `ON DELETE CASCADE` for data cleanup
- UUID recommended for slugs in production for better uniqueness
- Consider adding `updated_at` triggers for tables that lack them