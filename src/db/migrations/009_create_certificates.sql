-- ============================================================
-- Migration 009: Create certificates table
-- Supports the Certificate Generation system for Python Master 12
-- ============================================================

-- ============================================================
-- 1. certificates - Stores user completion certificates
-- ============================================================
CREATE TABLE IF NOT EXISTS certificates (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    verification_code UUID NOT NULL DEFAULT gen_random_uuid(),
    course_title VARCHAR(255) NOT NULL,
    completion_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_certificates_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_certificates_verification_code
        UNIQUE (verification_code)
);

-- ============================================================
-- INDEXES for certificates
-- ============================================================

-- Primary query: verify certificate by code (public endpoint)
CREATE INDEX idx_certificates_verification_code
    ON certificates(verification_code);

-- Query: get all certificates for a user
CREATE INDEX idx_certificates_user_id
    ON certificates(user_id);

-- Query: order by completion date
CREATE INDEX idx_certificates_completion_date
    ON certificates(completion_date DESC);
