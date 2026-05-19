-- ============================================================================
-- Python Master 12 - Database Indexes and Constraints
-- ============================================================================
-- This file contains all database indexes and constraints for the platform.
-- Organized by priority level as documented in docs/DATABASE.md.
--
-- Note: If running after schema.sql, some constraints (foreign keys, unique)
-- are already defined inline in the CREATE TABLE statements. This file can be
-- used independently for adding indexes/constraints to an existing schema,
-- or as a reference for all performance-related database objects.
--
-- Usage: Run this file after creating the base schema tables.
-- ============================================================================

-- ============================================================================
-- HIGH PRIORITY INDEXES (Performance Critical)
-- ============================================================================

-- User lookups (email for authentication, last_active for streak/activity queries)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active);

-- Submission queries (composite index for user+exercise lookups, status filtering, time ordering)
CREATE INDEX IF NOT EXISTS idx_submissions_user_exercise ON submissions(user_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);

-- Progress tracking (composite index for user+lesson progress lookups)
CREATE INDEX IF NOT EXISTS idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);

-- Lesson queries (composite index for ordered lesson retrieval within a module)
CREATE INDEX IF NOT EXISTS idx_lessons_module_order ON lessons(module_id, order_index);

-- Module queries (composite index for ordered module retrieval within a course)
CREATE INDEX IF NOT EXISTS idx_modules_course_order ON modules(course_id, order_index);

-- ============================================================================
-- MEDIUM PRIORITY INDEXES
-- ============================================================================

-- Badge queries (user badge lookups for profile/dashboard display)
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);

-- XP log queries (user XP history with time-based filtering)
CREATE INDEX IF NOT EXISTS idx_xp_logs_user_created ON xp_logs(user_id, created_at);

-- Notification queries (unread notification filtering per user)
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- Flashcard queries (category-based flashcard retrieval)
CREATE INDEX IF NOT EXISTS idx_flashcards_category ON flashcards(category);

-- ============================================================================
-- LOW PRIORITY INDEXES (Query Specific)
-- ============================================================================

-- Search functionality (slug-based URL lookups)
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_modules_slug ON modules(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);

-- Streak maintenance (finding users by last activity date for streak updates)
CREATE INDEX IF NOT EXISTS idx_streaks_last_activity ON streaks(last_activity_date);

-- ============================================================================
-- UNIQUE CONSTRAINTS
-- ============================================================================
-- Note: These may already be defined in schema.sql CREATE TABLE statements.
-- Using DO blocks to add only if not already present.

-- Users email must be unique
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_users_email') THEN
        ALTER TABLE users ADD CONSTRAINT uk_users_email UNIQUE (email);
    END IF;
END $$;

-- A user can only earn each badge once
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_user_badges_user_badge') THEN
        ALTER TABLE user_badges ADD CONSTRAINT uk_user_badges_user_badge UNIQUE (user_id, badge_id);
    END IF;
END $$;

-- A user can only have one progress record per lesson
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_user_progress_user_lesson') THEN
        ALTER TABLE user_progress ADD CONSTRAINT uk_user_progress_user_lesson UNIQUE (user_id, lesson_id);
    END IF;
END $$;

-- One streak record per user
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_streaks_user') THEN
        ALTER TABLE streaks ADD CONSTRAINT uk_streaks_user UNIQUE (user_id);
    END IF;
END $$;

-- Slugs must be unique
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_courses_slug') THEN
        ALTER TABLE courses ADD CONSTRAINT uk_courses_slug UNIQUE (slug);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_modules_slug') THEN
        ALTER TABLE modules ADD CONSTRAINT uk_modules_slug UNIQUE (slug);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_lessons_slug') THEN
        ALTER TABLE lessons ADD CONSTRAINT uk_lessons_slug UNIQUE (slug);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uk_badges_slug') THEN
        ALTER TABLE badges ADD CONSTRAINT uk_badges_slug UNIQUE (slug);
    END IF;
END $$;

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

-- Submission score must be between 0 and 100
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_submissions_score') THEN
        ALTER TABLE submissions ADD CONSTRAINT chk_submissions_score CHECK (score IS NULL OR (score >= 0 AND score <= 100));
    END IF;
END $$;

-- User progress score must be between 0 and 100
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_user_progress_score') THEN
        ALTER TABLE user_progress ADD CONSTRAINT chk_user_progress_score CHECK (score IS NULL OR (score >= 0 AND score <= 100));
    END IF;
END $$;

-- Time spent must be non-negative
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_user_progress_time') THEN
        ALTER TABLE user_progress ADD CONSTRAINT chk_user_progress_time CHECK (time_spent >= 0);
    END IF;
END $$;

-- Streak values must be non-negative and longest >= current
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_streaks_current') THEN
        ALTER TABLE streaks ADD CONSTRAINT chk_streaks_current CHECK (current_streak >= 0);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_streaks_longest') THEN
        ALTER TABLE streaks ADD CONSTRAINT chk_streaks_longest CHECK (longest_streak >= 0);
    END IF;
END $$;

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

-- ============================================================================
-- FOREIGN KEY CONSTRAINTS (with CASCADE rules)
-- ============================================================================
-- Note: These are already defined in schema.sql CREATE TABLE statements.
-- Included here for completeness and as a standalone migration reference.

-- Modules belong to courses
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_modules_course') THEN
        ALTER TABLE modules ADD CONSTRAINT fk_modules_course
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Lessons belong to modules
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_lessons_module') THEN
        ALTER TABLE lessons ADD CONSTRAINT fk_lessons_module
            FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Exercises belong to lessons
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_exercises_lesson') THEN
        ALTER TABLE exercises ADD CONSTRAINT fk_exercises_lesson
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Submissions reference users and exercises
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_submissions_user') THEN
        ALTER TABLE submissions ADD CONSTRAINT fk_submissions_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_submissions_exercise') THEN
        ALTER TABLE submissions ADD CONSTRAINT fk_submissions_exercise
            FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE;
    END IF;
END $$;

-- User badges reference users and badges
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_badges_user') THEN
        ALTER TABLE user_badges ADD CONSTRAINT fk_user_badges_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_badges_badge') THEN
        ALTER TABLE user_badges ADD CONSTRAINT fk_user_badges_badge
            FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE;
    END IF;
END $$;

-- User progress references users and lessons
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_progress_user') THEN
        ALTER TABLE user_progress ADD CONSTRAINT fk_user_progress_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_progress_lesson') THEN
        ALTER TABLE user_progress ADD CONSTRAINT fk_user_progress_lesson
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;
    END IF;
END $$;

-- XP logs reference users
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_xp_logs_user') THEN
        ALTER TABLE xp_logs ADD CONSTRAINT fk_xp_logs_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Streaks reference users
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_streaks_user') THEN
        ALTER TABLE streaks ADD CONSTRAINT fk_streaks_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- AI chat history references users
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_ai_chat_history_user') THEN
        ALTER TABLE ai_chat_history ADD CONSTRAINT fk_ai_chat_history_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Notifications reference users
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_notifications_user') THEN
        ALTER TABLE notifications ADD CONSTRAINT fk_notifications_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;
