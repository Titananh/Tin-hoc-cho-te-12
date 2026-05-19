-- Migration 002: Create all indexes and constraints for Python Master 12
-- Database: PostgreSQL (Supabase)
-- Consistent with src/db/indexes.sql

-- ============================================================================
-- HIGH PRIORITY INDEXES (Performance Critical)
-- ============================================================================

-- User lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active);

-- Submission queries
CREATE INDEX IF NOT EXISTS idx_submissions_user_exercise ON submissions(user_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);

-- Progress tracking
CREATE INDEX IF NOT EXISTS idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);

-- Lesson queries
CREATE INDEX IF NOT EXISTS idx_lessons_module_order ON lessons(module_id, order_index);

-- Module queries
CREATE INDEX IF NOT EXISTS idx_modules_course_order ON modules(course_id, order_index);

-- ============================================================================
-- MEDIUM PRIORITY INDEXES
-- ============================================================================

-- Badge queries
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);

-- XP log queries
CREATE INDEX IF NOT EXISTS idx_xp_logs_user_created ON xp_logs(user_id, created_at);

-- Notification queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- Flashcard queries
CREATE INDEX IF NOT EXISTS idx_flashcards_category ON flashcards(category);

-- ============================================================================
-- LOW PRIORITY INDEXES (Query Specific)
-- ============================================================================

-- Search functionality
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_modules_slug ON modules(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);

-- Streak maintenance
CREATE INDEX IF NOT EXISTS idx_streaks_last_activity ON streaks(last_activity_date);

-- ============================================================================
-- CHECK CONSTRAINTS
-- ============================================================================

-- XP must be non-negative
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_users_xp') THEN
        ALTER TABLE users ADD CONSTRAINT chk_users_xp CHECK (xp >= 0);
    END IF;
END $$;

-- Level must be between 1 and 12
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_users_level') THEN
        ALTER TABLE users ADD CONSTRAINT chk_users_level CHECK (level >= 1 AND level <= 12);
    END IF;
END $$;

-- Streak count must be non-negative
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_users_streak') THEN
        ALTER TABLE users ADD CONSTRAINT chk_users_streak CHECK (streak_count >= 0);
    END IF;
END $$;

-- Time spent must be non-negative
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_user_progress_time') THEN
        ALTER TABLE user_progress ADD CONSTRAINT chk_user_progress_time CHECK (time_spent >= 0);
    END IF;
END $$;

-- Streak longest >= current
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_streaks_longest_gte_current') THEN
        ALTER TABLE streaks ADD CONSTRAINT chk_streaks_longest_gte_current CHECK (longest_streak >= current_streak);
    END IF;
END $$;

-- XP rewards must be non-negative
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_lessons_xp_reward') THEN
        ALTER TABLE lessons ADD CONSTRAINT chk_lessons_xp_reward CHECK (xp_reward >= 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_exercises_xp_reward') THEN
        ALTER TABLE exercises ADD CONSTRAINT chk_exercises_xp_reward CHECK (xp_reward >= 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_badges_xp_reward') THEN
        ALTER TABLE badges ADD CONSTRAINT chk_badges_xp_reward CHECK (xp_reward >= 0);
    END IF;
END $$;

-- Order index must be non-negative
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_courses_order') THEN
        ALTER TABLE courses ADD CONSTRAINT chk_courses_order CHECK (order_index >= 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_modules_order') THEN
        ALTER TABLE modules ADD CONSTRAINT chk_modules_order CHECK (order_index >= 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_lessons_order') THEN
        ALTER TABLE lessons ADD CONSTRAINT chk_lessons_order CHECK (order_index >= 0);
    END IF;
END $$;

-- Estimated minutes must be positive
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_lessons_estimated_minutes') THEN
        ALTER TABLE lessons ADD CONSTRAINT chk_lessons_estimated_minutes CHECK (estimated_minutes > 0);
    END IF;
END $$;
