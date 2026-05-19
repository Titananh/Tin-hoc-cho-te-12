-- ============================================================
-- Migration 007: Create projects and project_submissions tables
-- Supports the Project System feature for Python Master 12
-- ============================================================

-- ============================================================
-- 1. projects - Practice projects for students
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    difficulty VARCHAR(20) NOT NULL DEFAULT 'easy',
    starter_code TEXT NOT NULL DEFAULT '',
    requirements JSON NOT NULL DEFAULT '[]',
    checklist JSON NOT NULL DEFAULT '[]',
    estimated_hours INT NULL,
    prerequisite_level_ids JSON NOT NULL DEFAULT '[]',
    test_cases JSON NOT NULL DEFAULT '[]',
    xp_reward INT NOT NULL DEFAULT 500,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_projects_difficulty
        CHECK (difficulty IN ('easy', 'medium', 'hard')),
    CONSTRAINT chk_projects_xp_reward
        CHECK (xp_reward >= 0)
);

-- ============================================================
-- 2. project_submissions - User submissions for projects
-- ============================================================
CREATE TABLE IF NOT EXISTS project_submissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    code TEXT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    ai_feedback TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_project_submissions_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_project_submissions_project
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT chk_project_submissions_score
        CHECK (score >= 0 AND score <= 100)
);

-- ============================================================
-- INDEXES for projects
-- ============================================================
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_difficulty ON projects(difficulty);
CREATE INDEX idx_projects_is_published ON projects(is_published);

-- ============================================================
-- INDEXES for project_submissions
-- ============================================================
CREATE INDEX idx_project_submissions_user_id ON project_submissions(user_id);
CREATE INDEX idx_project_submissions_project_id ON project_submissions(project_id);
CREATE INDEX idx_project_submissions_user_project ON project_submissions(user_id, project_id);
CREATE INDEX idx_project_submissions_created_at ON project_submissions(created_at DESC);
