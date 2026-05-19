/**
 * Unit tests for gamification utility functions
 * Tests calculateLevel() and getXPForNextLevel()
 */

import { calculateLevel, getXPForNextLevel } from '@/lib/gamification';

describe('calculateLevel', () => {
  it('returns level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('returns level 1 for negative XP', () => {
    expect(calculateLevel(-100)).toBe(1);
    expect(calculateLevel(-1)).toBe(1);
  });

  it('returns level 1 for small XP values (< 400)', () => {
    // level = floor(sqrt(XP / 100))
    // For XP = 99: floor(sqrt(0.99)) = 0 → max(1, 0) = 1
    expect(calculateLevel(99)).toBe(1);
    // For XP = 100: floor(sqrt(1)) = 1
    expect(calculateLevel(100)).toBe(1);
    // For XP = 399: floor(sqrt(3.99)) = 1
    expect(calculateLevel(399)).toBe(1);
  });

  it('returns level 2 for XP = 400', () => {
    // floor(sqrt(400 / 100)) = floor(sqrt(4)) = 2
    expect(calculateLevel(400)).toBe(2);
  });

  it('returns level 3 for XP = 900', () => {
    // floor(sqrt(900 / 100)) = floor(sqrt(9)) = 3
    expect(calculateLevel(900)).toBe(3);
  });

  it('returns level 10 for XP = 10000', () => {
    // floor(sqrt(10000 / 100)) = floor(sqrt(100)) = 10
    expect(calculateLevel(10000)).toBe(10);
  });

  it('handles large XP values correctly', () => {
    // floor(sqrt(1000000 / 100)) = floor(sqrt(10000)) = 100
    expect(calculateLevel(1000000)).toBe(100);
  });

  it('handles boundary values between levels', () => {
    // Just below level 2: XP = 399 → floor(sqrt(3.99)) = 1
    expect(calculateLevel(399)).toBe(1);
    // Exactly level 2: XP = 400 → floor(sqrt(4)) = 2
    expect(calculateLevel(400)).toBe(2);
    // Just below level 3: XP = 899 → floor(sqrt(8.99)) = 2
    expect(calculateLevel(899)).toBe(2);
    // Exactly level 3: XP = 900 → floor(sqrt(9)) = 3
    expect(calculateLevel(900)).toBe(3);
  });
});

describe('getXPForNextLevel', () => {
  it('returns 400 XP needed for level 2 (from level 1)', () => {
    // nextLevel = 2, XP = 2^2 * 100 = 400
    expect(getXPForNextLevel(1)).toBe(400);
  });

  it('returns 900 XP needed for level 3 (from level 2)', () => {
    // nextLevel = 3, XP = 3^2 * 100 = 900
    expect(getXPForNextLevel(2)).toBe(900);
  });

  it('returns 1600 XP needed for level 4 (from level 3)', () => {
    // nextLevel = 4, XP = 4^2 * 100 = 1600
    expect(getXPForNextLevel(3)).toBe(1600);
  });

  it('returns 10000 XP needed for level 10 (from level 9)', () => {
    // nextLevel = 10, XP = 10^2 * 100 = 10000
    expect(getXPForNextLevel(9)).toBe(10000);
  });

  it('handles large level values', () => {
    // nextLevel = 101, XP = 101^2 * 100 = 1020100
    expect(getXPForNextLevel(100)).toBe(1020100);
  });

  it('XP for next level is always greater than XP for current level', () => {
    for (let level = 1; level <= 20; level++) {
      const xpForNext = getXPForNextLevel(level);
      const xpForCurrent = level * level * 100;
      expect(xpForNext).toBeGreaterThan(xpForCurrent);
    }
  });
});
