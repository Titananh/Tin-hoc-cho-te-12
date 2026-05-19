/**
 * Track solved problems in localStorage.
 * Used by practice list to show ✅ status.
 */

const STORAGE_KEY = 'python_master_solved';

export function getSolvedProblems(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch { return new Set(); }
}

export function markProblemSolved(slug: string): void {
  if (typeof window === 'undefined') return;
  const solved = getSolvedProblems();
  solved.add(slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]));
}

export function isProblemSolved(slug: string): boolean {
  return getSolvedProblems().has(slug);
}

export function getSolvedCount(): number {
  return getSolvedProblems().size;
}
