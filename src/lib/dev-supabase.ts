/**
 * Mock Supabase client for DEV MODE.
 * Returns reasonable seed data so the app runs without a real Supabase.
 * Provides chainable query API matching @supabase/supabase-js.
 */

import {
  DEV_LEVELS,
  DEV_LESSONS,
  DEV_EXERCISES,
  DEV_BADGES,
  DEV_PROJECTS,
  DEV_FLASHCARDS,
} from './dev-mock';
import { devGetAllUsers } from './dev-store';

type Row = Record<string, unknown>;

interface QueryState {
  table: string;
  filters: Array<{ op: string; column: string; value: unknown }>;
  orderBy: { column: string; ascending: boolean } | null;
  limitVal: number | null;
  rangeVal: { from: number; to: number } | null;
  isHead: boolean;
  isCount: boolean;
  isSingle: boolean;
  isMaybeSingle: boolean;
  selectColumns: string;
  insertData: Row | Row[] | null;
  updateData: Row | null;
  deleteOp: boolean;
  upsertData: Row | Row[] | null;
}

function getDataForTable(table: string): Row[] {
  switch (table) {
    case 'courses':
    case 'levels':
      return DEV_LEVELS as unknown as Row[];
    case 'modules':
      // Synthetic: 1 module per level
      return DEV_LEVELS.map((l) => ({
        id: l.id,
        course_id: l.id,
        title: l.title,
        order_index: l.order_index,
        is_published: true,
      }));
    case 'lessons':
      return DEV_LESSONS as unknown as Row[];
    case 'exercises':
      return DEV_EXERCISES as unknown as Row[];
    case 'badges':
      return DEV_BADGES as unknown as Row[];
    case 'projects':
      return DEV_PROJECTS as unknown as Row[];
    case 'flashcards':
      return DEV_FLASHCARDS as unknown as Row[];
    case 'users':
      return devGetAllUsers() as unknown as Row[];
    default:
      // user_progress, submissions, xp_logs, streaks, user_badges,
      // user_streaks, project_submissions, notifications, certificates,
      // flashcard_reviews, login_attempts, etc. -> empty in dev mode.
      return [];
  }
}

function applyFilters(rows: Row[], filters: QueryState['filters']): Row[] {
  let result = rows;
  for (const f of filters) {
    switch (f.op) {
      case 'eq':
        result = result.filter((r) => r[f.column] === f.value);
        break;
      case 'neq':
        result = result.filter((r) => r[f.column] !== f.value);
        break;
      case 'gt':
        result = result.filter((r) => (r[f.column] as number) > (f.value as number));
        break;
      case 'gte':
        result = result.filter((r) => (r[f.column] as number) >= (f.value as number));
        break;
      case 'lt':
        result = result.filter((r) => (r[f.column] as number) < (f.value as number));
        break;
      case 'lte':
        result = result.filter((r) => (r[f.column] as number) <= (f.value as number));
        break;
      case 'in':
        result = result.filter((r) => (f.value as unknown[]).includes(r[f.column]));
        break;
      case 'ilike':
      case 'like':
        result = result.filter((r) => {
          const s = String(r[f.column] ?? '').toLowerCase();
          const pat = String(f.value ?? '').toLowerCase().replace(/%/g, '');
          return s.includes(pat);
        });
        break;
      default:
        break;
    }
  }
  return result;
}

class DevQueryBuilder<T = unknown> implements PromiseLike<{ data: T; error: null; count?: number }> {
  private state: QueryState;

  constructor(table: string) {
    this.state = {
      table,
      filters: [],
      orderBy: null,
      limitVal: null,
      rangeVal: null,
      isHead: false,
      isCount: false,
      isSingle: false,
      isMaybeSingle: false,
      selectColumns: '*',
      insertData: null,
      updateData: null,
      deleteOp: false,
      upsertData: null,
    };
  }

  select(columns?: string, options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) {
    if (columns) this.state.selectColumns = columns;
    if (options?.count) this.state.isCount = true;
    if (options?.head) this.state.isHead = true;
    return this;
  }

  insert(data: Row | Row[]) {
    this.state.insertData = data;
    return this;
  }

  update(data: Row) {
    this.state.updateData = data;
    return this;
  }

  upsert(data: Row | Row[]) {
    this.state.upsertData = data;
    return this;
  }

  delete() {
    this.state.deleteOp = true;
    return this;
  }

  eq(column: string, value: unknown) {
    this.state.filters.push({ op: 'eq', column, value });
    return this;
  }
  neq(column: string, value: unknown) {
    this.state.filters.push({ op: 'neq', column, value });
    return this;
  }
  gt(column: string, value: unknown) {
    this.state.filters.push({ op: 'gt', column, value });
    return this;
  }
  gte(column: string, value: unknown) {
    this.state.filters.push({ op: 'gte', column, value });
    return this;
  }
  lt(column: string, value: unknown) {
    this.state.filters.push({ op: 'lt', column, value });
    return this;
  }
  lte(column: string, value: unknown) {
    this.state.filters.push({ op: 'lte', column, value });
    return this;
  }
  in(column: string, values: unknown[]) {
    this.state.filters.push({ op: 'in', column, value: values });
    return this;
  }
  like(column: string, value: string) {
    this.state.filters.push({ op: 'like', column, value });
    return this;
  }
  ilike(column: string, value: string) {
    this.state.filters.push({ op: 'ilike', column, value });
    return this;
  }
  is(column: string, value: unknown) {
    this.state.filters.push({ op: 'eq', column, value });
    return this;
  }
  not() {
    return this;
  }
  or() {
    return this;
  }
  filter() {
    return this;
  }
  match(query: Record<string, unknown>) {
    for (const [k, v] of Object.entries(query)) {
      this.state.filters.push({ op: 'eq', column: k, value: v });
    }
    return this;
  }
  contains() {
    return this;
  }
  containedBy() {
    return this;
  }
  textSearch() {
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.state.orderBy = { column, ascending: options?.ascending ?? true };
    return this;
  }

  limit(n: number) {
    this.state.limitVal = n;
    return this;
  }

  range(from: number, to: number) {
    this.state.rangeVal = { from, to };
    return this;
  }

  single() {
    this.state.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.state.isMaybeSingle = true;
    return this;
  }

  csv() {
    return this;
  }

  private execute(): { data: T; error: null; count?: number } {
    const s = this.state;

    // Mutations: pretend success
    if (s.insertData !== null) {
      const inserted = Array.isArray(s.insertData) ? s.insertData : [s.insertData];
      const withId = inserted.map((row, i) => ({ id: Date.now() + i, ...row }));
      const result = s.isSingle ? withId[0] : withId;
      return { data: result as unknown as T, error: null };
    }
    if (s.updateData !== null) {
      return { data: null as unknown as T, error: null };
    }
    if (s.upsertData !== null) {
      return { data: null as unknown as T, error: null };
    }
    if (s.deleteOp) {
      return { data: null as unknown as T, error: null };
    }

    // Reads
    let rows = getDataForTable(s.table);
    rows = applyFilters(rows, s.filters);

    if (s.orderBy) {
      const { column, ascending } = s.orderBy;
      rows = [...rows].sort((a, b) => {
        const av = a[column] as number | string;
        const bv = b[column] as number | string;
        if (av < bv) return ascending ? -1 : 1;
        if (av > bv) return ascending ? 1 : -1;
        return 0;
      });
    }

    const totalCount = rows.length;

    if (s.rangeVal) {
      rows = rows.slice(s.rangeVal.from, s.rangeVal.to + 1);
    }
    if (s.limitVal !== null) {
      rows = rows.slice(0, s.limitVal);
    }

    if (s.isHead) {
      return { data: null as unknown as T, error: null, count: totalCount };
    }

    if (s.isSingle) {
      return {
        data: (rows[0] ?? null) as unknown as T,
        error: rows.length === 0 ? ({ message: 'No rows', code: 'PGRST116' } as unknown as null) : null,
      };
    }
    if (s.isMaybeSingle) {
      return { data: (rows[0] ?? null) as unknown as T, error: null };
    }

    return { data: rows as unknown as T, error: null, count: totalCount };
  }

  then<TResult1 = { data: T; error: null; count?: number }, TResult2 = never>(
    onfulfilled?: ((value: { data: T; error: null; count?: number }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return Promise.resolve(this.execute()).then(onfulfilled, onrejected);
  }
}

export const devSupabaseAdmin = {
  from(table: string) {
    return new DevQueryBuilder(table);
  },
  rpc() {
    return Promise.resolve({ data: null, error: null });
  },
  storage: {
    from() {
      return {
        upload: async () => ({ data: null, error: null }),
        download: async () => ({ data: null, error: null }),
        remove: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      };
    },
  },
  auth: {
    admin: {
      createUser: async () => ({ data: { user: null }, error: null }),
      deleteUser: async () => ({ data: null, error: null }),
    },
  },
};
