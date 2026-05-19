-- ============================================================
-- Migration 004: Add authentication fields for NextAuth.js
-- ============================================================

-- Add password_hash column to users table for email/password auth
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) NULL;

-- ============================================================
-- accounts table - OAuth provider accounts linked to users
-- Required by NextAuth.js for OAuth providers (Google, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    refresh_token TEXT NULL,
    access_token TEXT NULL,
    expires_at BIGINT NULL,
    token_type VARCHAR(50) NULL,
    scope VARCHAR(255) NULL,
    id_token TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_accounts_provider
        UNIQUE (provider, provider_account_id)
);

-- ============================================================
-- verification_tokens table - Email verification and password reset
-- ============================================================
CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT uq_verification_tokens
        UNIQUE (identifier, token)
);

-- ============================================================
-- Indexes for auth tables
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider, provider_account_id);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_identifier ON verification_tokens(identifier);
