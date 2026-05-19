-- Migration 005: Create user_hint_views table for tracking progressive hint reveals
-- Database: PostgreSQL (Supabase)

-- ============================================================
-- user_hint_views - Tracks which hints a user has viewed per exercise
-- ============================================================
CREATE TABLE IF NOT EXISTS user_hint_views (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    hints_viewed INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_hint_views_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_hint_views_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_hint_views_user_exercise
        UNIQUE (user_id, exercise_id),
    CONSTRAINT chk_user_hint_views_count
        CHECK (hints_viewed >= 0 AND hints_viewed <= 3)
);

-- Index for quick lookups
CREATE INDEX idx_user_hint_views_user_exercise ON user_hint_views(user_id, exercise_id);

-- Trigger to auto-update updated_at
CREATE TRIGGER trigger_user_hint_views_updated_at
    BEFORE UPDATE ON user_hint_views
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
