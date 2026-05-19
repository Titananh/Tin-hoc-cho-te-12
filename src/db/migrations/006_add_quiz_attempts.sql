-- ============================================================
-- Migration 006: Add quiz_attempts column to user_progress
-- Tracks the number of quiz attempts per lesson for each user
-- ============================================================

-- Add quiz_attempts column to user_progress table
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS quiz_attempts INT NOT NULL DEFAULT 0;

-- Add constraint to ensure quiz_attempts is non-negative
ALTER TABLE user_progress ADD CONSTRAINT chk_user_progress_quiz_attempts
    CHECK (quiz_attempts >= 0);
