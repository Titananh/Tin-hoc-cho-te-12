-- Migration 001: Create all tables for Python Master 12
-- Database: PostgreSQL (Supabase)
-- Consistent with src/db/schema.sql

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. users - User accounts for the learning platform
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar_url VARCHAR(500) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student',
    xp INT NOT NULL DEFAULT 0,
    level INT NOT NULL DEFAULT 1,
    streak_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. courses - Top-level course categories
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(100) NULL,
    color VARCHAR(7) NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. modules - Course sections/modules
-- ============================================================
CREATE TABLE IF NOT EXISTS modules (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(100) NULL,
    color VARCHAR(7) NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_modules_course
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ============================================================
-- 4. lessons - Individual learning content units
-- ============================================================
CREATE TABLE IF NOT EXISTS lessons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    module_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    content JSON NOT NULL DEFAULT '{}',
    difficulty VARCHAR(20) NOT NULL DEFAULT 'beginner',
    estimated_minutes INT NOT NULL DEFAULT 10,
    order_index INT NOT NULL DEFAULT 0,
    xp_reward INT NOT NULL DEFAULT 10,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_lessons_module
        FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- ============================================================
-- 5. exercises - Coding exercises linked to lessons
-- ============================================================
CREATE TABLE IF NOT EXISTS exercises (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lesson_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'beginner',
    starter_code TEXT NOT NULL DEFAULT '',
    solution_code TEXT NOT NULL DEFAULT '',
    hints JSON NULL,
    xp_reward INT NOT NULL DEFAULT 5,
    test_cases JSON NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_exercises_lesson
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- ============================================================
-- 6. submissions - User code submissions for exercises
-- ============================================================
CREATE TABLE IF NOT EXISTS submissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    code TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    runtime INT NULL,
    score INT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_submissions_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_submissions_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    CONSTRAINT chk_submissions_score
        CHECK (score IS NULL OR (score >= 0 AND score <= 100))
);

-- ============================================================
-- 7. badges - Achievement badges available to earn
-- ============================================================
CREATE TABLE IF NOT EXISTS badges (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#000000',
    requirement VARCHAR(255) NOT NULL,
    xp_reward INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. user_badges - Tracks badges earned by users
-- ============================================================
CREATE TABLE IF NOT EXISTS user_badges (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_badges_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_badges_badge
        FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_badges_user_badge
        UNIQUE (user_id, badge_id)
);

-- ============================================================
-- 9. user_progress - Tracks user progress on lessons
-- ============================================================
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE NULL,
    time_spent INT NOT NULL DEFAULT 0,
    score INT NULL,

    CONSTRAINT fk_user_progress_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_progress_lesson
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_progress_user_lesson
        UNIQUE (user_id, lesson_id),
    CONSTRAINT chk_user_progress_score
        CHECK (score IS NULL OR (score >= 0 AND score <= 100))
);

-- ============================================================
-- 10. xp_logs - Experience point transaction history
-- ============================================================
CREATE TABLE IF NOT EXISTS xp_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_xp_logs_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 11. streaks - User streak tracking
-- ============================================================
CREATE TABLE IF NOT EXISTS streaks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    current_streak INT NOT NULL DEFAULT 0,
    longest_streak INT NOT NULL DEFAULT 0,
    last_activity_date DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT fk_streaks_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_streaks_current
        CHECK (current_streak >= 0),
    CONSTRAINT chk_streaks_longest
        CHECK (longest_streak >= 0)
);

-- ============================================================
-- 12. ai_chat_history - AI tutor conversation history
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_chat_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    messages JSON NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_ai_chat_history_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 13. notifications - User notifications and alerts
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'system',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 14. flashcards - Flashcard collection for spaced learning
-- ============================================================
CREATE TABLE IF NOT EXISTS flashcards (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    term VARCHAR(500) NOT NULL,
    definition TEXT NOT NULL,
    category VARCHAR(100) NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'beginner',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS - Auto-update updated_at timestamp
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
