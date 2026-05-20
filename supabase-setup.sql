-- ============================================================
-- Python Master 12 - Supabase Database Setup
-- Chạy script này trong Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Bảng lưu tiến trình học của user (đồng bộ giữa các thiết bị)
CREATE TABLE IF NOT EXISTS user_progress (
  user_id TEXT PRIMARY KEY,
  gamification_state JSONB DEFAULT '{}'::jsonb,
  solved_problems JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: User chỉ đọc/ghi row của chính mình
CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Index cho performance
CREATE INDEX IF NOT EXISTS idx_user_progress_updated
  ON user_progress (updated_at DESC);

-- ============================================================
-- DONE! Bảng đã sẵn sàng.
-- ============================================================
