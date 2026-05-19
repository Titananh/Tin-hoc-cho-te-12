/**
 * Unit tests for rate limiter
 * Tests checkRateLimit, recordRequest, and rate limit exceeded scenario
 */

import {
  checkRateLimit,
  recordRequest,
  _testHelpers,
} from '@/lib/rate-limiter';

const { clearStore, MAX_REQUESTS_PER_WINDOW } = _testHelpers;

describe('Rate Limiter', () => {
  beforeEach(() => {
    clearStore();
  });

  describe('checkRateLimit', () => {
    it('allows request for new user with no history', () => {
      const result = checkRateLimit('user-1');
      expect(result.allowed).toBe(true);
      expect(result.remainingRequests).toBe(MAX_REQUESTS_PER_WINDOW);
    });

    it('allows request when under the limit', () => {
      // Record a few requests
      recordRequest('user-2');
      recordRequest('user-2');
      recordRequest('user-2');

      const result = checkRateLimit('user-2');
      expect(result.allowed).toBe(true);
      expect(result.remainingRequests).toBe(MAX_REQUESTS_PER_WINDOW - 3);
    });

    it('returns resetTime in the future', () => {
      const now = Date.now();
      const result = checkRateLimit('user-3');
      expect(result.resetTime).toBeGreaterThan(now);
    });
  });

  describe('recordRequest', () => {
    it('creates a new record for a new user', () => {
      recordRequest('new-user');
      const result = checkRateLimit('new-user');
      expect(result.remainingRequests).toBe(MAX_REQUESTS_PER_WINDOW - 1);
    });

    it('increments request count for existing user', () => {
      recordRequest('user-x');
      recordRequest('user-x');

      const result = checkRateLimit('user-x');
      expect(result.remainingRequests).toBe(MAX_REQUESTS_PER_WINDOW - 2);
    });
  });

  describe('rate limit exceeded', () => {
    it('blocks request when limit is reached', () => {
      const userId = 'heavy-user';

      // Fill up the rate limit
      for (let i = 0; i < MAX_REQUESTS_PER_WINDOW; i++) {
        recordRequest(userId);
      }

      const result = checkRateLimit(userId);
      expect(result.allowed).toBe(false);
      expect(result.remainingRequests).toBe(0);
    });

    it('different users have independent limits', () => {
      // Fill up user-a's limit
      for (let i = 0; i < MAX_REQUESTS_PER_WINDOW; i++) {
        recordRequest('user-a');
      }

      // user-b should still be allowed
      const resultA = checkRateLimit('user-a');
      const resultB = checkRateLimit('user-b');

      expect(resultA.allowed).toBe(false);
      expect(resultB.allowed).toBe(true);
    });

    it('provides a valid resetTime when blocked', () => {
      const userId = 'blocked-user';
      const now = Date.now();

      for (let i = 0; i < MAX_REQUESTS_PER_WINDOW; i++) {
        recordRequest(userId);
      }

      const result = checkRateLimit(userId);
      expect(result.allowed).toBe(false);
      // resetTime should be in the future (within the window duration)
      expect(result.resetTime).toBeGreaterThan(now);
    });
  });
});
