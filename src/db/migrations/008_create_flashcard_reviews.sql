-- ============================================================
-- Migration 008: Create flashcard_reviews table
-- Supports the Flashcard Spaced Repetition system (SM-2 algorithm)
-- for Python Master 12
-- ============================================================

-- ============================================================
-- 1. flashcard_reviews - Tracks user review state per flashcard
-- ============================================================
CREATE TABLE IF NOT EXISTS flashcard_reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    flashcard_id BIGINT NOT NULL,
    ease_factor DECIMAL(4, 2) NOT NULL DEFAULT 2.50,
    interval_days INT NOT NULL DEFAULT 1,
    next_review_date DATE NOT NULL DEFAULT CURRENT_DATE,
    review_count INT NOT NULL DEFAULT 0,
    last_reviewed_at TIMESTAMP WITH TIME ZONE NULL,

    CONSTRAINT fk_flashcard_reviews_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_flashcard_reviews_flashcard
        FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE,
    CONSTRAINT uq_flashcard_reviews_user_flashcard
        UNIQUE (user_id, flashcard_id),
    CONSTRAINT chk_flashcard_reviews_ease_factor
        CHECK (ease_factor >= 1.30 AND ease_factor <= 5.00),
    CONSTRAINT chk_flashcard_reviews_interval
        CHECK (interval_days >= 1 AND interval_days <= 180)
);

-- ============================================================
-- INDEXES for flashcard_reviews
-- ============================================================

-- Primary query: get cards due for review today for a user
CREATE INDEX idx_flashcard_reviews_user_next_review
    ON flashcard_reviews(user_id, next_review_date);

-- Query by user to get all review states
CREATE INDEX idx_flashcard_reviews_user_id
    ON flashcard_reviews(user_id);

-- Query by flashcard to check review status
CREATE INDEX idx_flashcard_reviews_flashcard_id
    ON flashcard_reviews(flashcard_id);

-- Query for cards reviewed recently (analytics)
CREATE INDEX idx_flashcard_reviews_last_reviewed
    ON flashcard_reviews(last_reviewed_at DESC);
