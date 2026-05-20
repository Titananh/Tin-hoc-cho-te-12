/**
 * Progress Sync - Đồng bộ tiến trình học lên Supabase.
 *
 * Lưu toàn bộ gamification state (XP, level, streak, achievements, solved problems)
 * vào bảng `user_progress` trên Supabase. Khi user đăng nhập trên thiết bị mới,
 * state sẽ được tải xuống và merge với localStorage.
 *
 * Bảng `user_progress`:
 *   - user_id (text, PK, = auth.uid())
 *   - gamification_state (jsonb)
 *   - solved_problems (jsonb - array of slugs)
 *   - updated_at (timestamptz)
 */

import { getSupabase, isSupabaseConfigured } from './supabase-browser';
import { getGamificationState, type GamificationState } from './gamification-store';
import { getSolvedProblems } from './solved-tracker';

const GAMIFICATION_KEY = 'python_master_gamification';
const SOLVED_KEY = 'python_master_solved';

/** Upload current localStorage state to Supabase. */
export async function uploadProgress(userId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const supabase = getSupabase()!;
  const state = getGamificationState();
  const solved = [...getSolvedProblems()];

  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      gamification_state: state,
      solved_problems: solved,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) {
    console.error('Upload progress failed:', error.message);
  }
}

/** Download progress from Supabase and merge into localStorage. */
export async function downloadProgress(userId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from('user_progress')
    .select('gamification_state, solved_problems, updated_at')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    // No remote data yet — first time user or error
    return;
  }

  const remoteState = data.gamification_state as GamificationState | null;
  const remoteSolved = data.solved_problems as string[] | null;

  // Merge strategy: take whichever has more XP (= more progress)
  const localState = getGamificationState();

  if (remoteState && remoteState.totalXP > localState.totalXP) {
    // Remote is ahead — overwrite local
    if (typeof window !== 'undefined') {
      localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(remoteState));
    }
  }

  // Merge solved problems (union of both sets)
  if (remoteSolved && remoteSolved.length > 0) {
    const localSolved = getSolvedProblems();
    const merged = new Set([...localSolved, ...remoteSolved]);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SOLVED_KEY, JSON.stringify([...merged]));
    }
  }
}

/** Auto-sync: upload after each state change (debounced). */
let _syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function scheduleSync(userId: string): void {
  if (_syncTimeout) clearTimeout(_syncTimeout);
  _syncTimeout = setTimeout(() => {
    uploadProgress(userId);
  }, 3000); // Debounce 3 seconds
}
