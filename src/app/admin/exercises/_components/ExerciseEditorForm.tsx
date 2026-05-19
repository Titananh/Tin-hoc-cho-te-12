'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

interface ExerciseFormData {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starter_code: string;
  solution_code: string;
  hints: string[];
  xp_reward: number;
  lesson_id: number;
  is_published: boolean;
}

interface LessonOption {
  id: number;
  title: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  difficulty?: string;
  xp_reward?: string;
  lesson_id?: string;
  test_cases?: string;
}

interface Props {
  mode: 'create' | 'edit';
  exerciseId?: number;
  initialData: ExerciseFormData;
  initialTestCases: TestCase[];
}

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Dễ', xp: 10 },
  { value: 'medium', label: 'Trung bình', xp: 25 },
  { value: 'hard', label: 'Khó', xp: 50 },
];


// ─── Main Component ──────────────────────────────────────────────────────────

export default function ExerciseEditorForm({ mode, exerciseId, initialData, initialTestCases }: Props) {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState<ExerciseFormData>(initialData);
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const [errors, setErrors] = useState<FormErrors>({});

  // UI state
  const [lessons, setLessons] = useState<LessonOption[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[] | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch lessons for dropdown
  const fetchLessons = useCallback(async () => {
    setLessonsLoading(true);
    try {
      const res = await fetch('/api/admin/lessons?page=1');
      if (res.ok) {
        const data = await res.json();
        const lessonOptions: LessonOption[] = (data.lessons ?? []).map(
          (l: { id: number; title: string }) => ({ id: l.id, title: l.title })
        );
        setLessons(lessonOptions);
      }
    } catch {
      // silently fail
    } finally {
      setLessonsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // Clear save message after 4 seconds
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => setSaveMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  // ─── Validation ──────────────────────────────────────────────────────────

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    }

    if (!form.lesson_id || form.lesson_id === 0) {
      newErrors.lesson_id = 'Vui lòng chọn bài học';
    }

    if (form.xp_reward < 0) {
      newErrors.xp_reward = 'XP không được âm';
    }

    if (testCases.length === 0) {
      newErrors.test_cases = 'Phải có ít nhất một test case';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ─── Save Handler ────────────────────────────────────────────────────────

  async function handleSave() {
    if (!validate()) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        starter_code: form.starter_code,
        solution_code: form.solution_code,
        difficulty: form.difficulty,
        xp_reward: form.xp_reward,
        lesson_id: form.lesson_id,
        hints: form.hints.filter((h) => h.trim().length > 0),
        test_cases: testCases,
        is_published: form.is_published,
      };

      const url =
        mode === 'edit'
          ? `/api/admin/exercises/${exerciseId}`
          : '/api/admin/exercises';

      const res = await fetch(url, {
        method: mode === 'edit' ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Không thể lưu bài tập');
      }

      setSaveMessage({ type: 'success', text: data.message ?? 'Lưu thành công!' });

      if (mode === 'create' && data.exercise?.id) {
        setTimeout(() => {
          router.push(`/admin/exercises/${data.exercise.id}/edit`);
        }, 1000);
      }
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Đã xảy ra lỗi khi lưu',
      });
    } finally {
      setSaving(false);
    }
  }

  // ─── Delete Handler ──────────────────────────────────────────────────────

  async function handleDelete() {
    if (mode !== 'edit' || !exerciseId) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/exercises/${exerciseId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Không thể xóa bài tập');
      }

      router.push('/admin/exercises');
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Đã xảy ra lỗi khi xóa',
      });
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  }

  // ─── Test Handler ────────────────────────────────────────────────────────

  async function handleTest() {
    if (!form.solution_code.trim()) {
      setSaveMessage({ type: 'error', text: 'Vui lòng nhập code lời giải trước khi test' });
      return;
    }
    if (testCases.length === 0) {
      setSaveMessage({ type: 'error', text: 'Vui lòng thêm ít nhất một test case' });
      return;
    }

    setTesting(true);
    setTestResults(null);

    try {
      const results: { passed: boolean; output: string }[] = [];

      for (const tc of testCases) {
        const res = await fetch('/api/code/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: form.solution_code,
            input: tc.input,
          }),
        });

        if (!res.ok) {
          results.push({ passed: false, output: 'Lỗi khi chạy code' });
          continue;
        }

        const data = await res.json();
        const actualOutput = (data.output ?? '').trim();
        const expectedOutput = tc.expected_output.trim();
        const passed = actualOutput === expectedOutput;

        results.push({
          passed,
          output: passed
            ? '✓ Đúng'
            : `Mong đợi: "${expectedOutput}"\nThực tế: "${actualOutput}"${data.error ? `\nLỗi: ${data.error}` : ''}`,
        });
      }

      setTestResults(results);
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text: 'Không thể kết nối đến dịch vụ chạy code. Vui lòng thử lại.',
      });
    } finally {
      setTesting(false);
    }
  }

  // ─── Field Handlers ──────────────────────────────────────────────────────

  function updateField<K extends keyof ExerciseFormData>(key: K, value: ExerciseFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  // ─── Hints Management ────────────────────────────────────────────────────

  function addHint() {
    setForm((prev) => ({ ...prev, hints: [...prev.hints, ''] }));
  }

  function updateHint(index: number, value: string) {
    setForm((prev) => {
      const newHints = [...prev.hints];
      newHints[index] = value;
      return { ...prev, hints: newHints };
    });
  }

  function removeHint(index: number) {
    setForm((prev) => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index),
    }));
  }

  // ─── Test Cases Management ───────────────────────────────────────────────

  function addTestCase() {
    setTestCases((prev) => [...prev, { input: '', expected_output: '', is_hidden: false }]);
    if (errors.test_cases) {
      setErrors((prev) => ({ ...prev, test_cases: undefined }));
    }
  }

  function updateTestCase(index: number, field: keyof TestCase, value: string | boolean) {
    setTestCases((prev) => {
      const newCases = [...prev];
      newCases[index] = { ...newCases[index], [field]: value };
      return newCases;
    });
  }

  function removeTestCase(index: number) {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  }


  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/exercises')}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Danh sách bài tập
          </button>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {mode === 'edit' ? 'Chỉnh sửa bài tập' : 'Tạo bài tập mới'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTest}
            disabled={testing}
            className="px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {testing && <SpinnerIcon className="h-4 w-4 animate-spin" />}
            {testing ? 'Đang test...' : '▶ Test'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors flex items-center gap-2"
          >
            {saving && <SpinnerIcon className="h-4 w-4 animate-spin" />}
            {saving ? 'Đang lưu...' : 'Lưu bài tập'}
          </button>
        </div>
      </div>

      {/* Save message */}
      {saveMessage && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            saveMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
              : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      {/* Test results */}
      {testResults && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Kết quả test ({testResults.filter((r) => r.passed).length}/{testResults.length} passed)
          </h3>
          <div className="space-y-2">
            {testResults.map((result, i) => (
              <div
                key={i}
                className={`rounded-md px-3 py-2 text-xs font-mono ${
                  result.passed
                    ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}
              >
                <span className="font-sans font-medium">Test {i + 1}:</span>{' '}
                <span className="whitespace-pre-wrap">{result.output}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setTestResults(null)}
            className="mt-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Đóng kết quả
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column - Basic info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Thông tin cơ bản</h2>

            {/* Title */}
            <FormField label="Tiêu đề" required error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Nhập tiêu đề bài tập..."
                className={inputClass(errors.title)}
              />
            </FormField>

            {/* Description */}
            <FormField label="Mô tả đề bài" required error={errors.description}>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Mô tả yêu cầu bài tập, định dạng input/output..."
                rows={5}
                className={inputClass(errors.description)}
              />
            </FormField>

            {/* Lesson selector */}
            <FormField label="Bài học" required error={errors.lesson_id}>
              <select
                value={form.lesson_id || ''}
                onChange={(e) => updateField('lesson_id', parseInt(e.target.value, 10) || 0)}
                className={inputClass(errors.lesson_id)}
                disabled={lessonsLoading}
              >
                <option value="">
                  {lessonsLoading ? 'Đang tải...' : '-- Chọn bài học --'}
                </option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Difficulty + XP row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Độ khó" required>
                <select
                  value={form.difficulty}
                  onChange={(e) => updateField('difficulty', e.target.value as ExerciseFormData['difficulty'])}
                  className={inputClass()}
                >
                  {DIFFICULTY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} ({opt.xp} XP)
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Điểm XP thưởng" required error={errors.xp_reward}>
                <input
                  type="number"
                  min={0}
                  value={form.xp_reward}
                  onChange={(e) => updateField('xp_reward', parseInt(e.target.value, 10) || 0)}
                  className={inputClass(errors.xp_reward)}
                />
              </FormField>
            </div>

            {/* Published toggle */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Xuất bản</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Bài tập sẽ hiển thị cho học sinh khi được xuất bản
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.is_published}
                onClick={() => updateField('is_published', !form.is_published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.is_published ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    form.is_published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Hints section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Gợi ý ({form.hints.length})
              </h2>
              <button
                onClick={addHint}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Thêm gợi ý
              </button>
            </div>

            {form.hints.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Chưa có gợi ý nào. Thêm gợi ý để hỗ trợ học sinh.
              </p>
            )}

            {form.hints.map((hint, index) => (
              <div key={index} className="flex gap-2">
                <span className="mt-2.5 text-xs font-medium text-gray-500 dark:text-gray-400 w-6 flex-shrink-0">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => updateHint(index, e.target.value)}
                  placeholder={`Gợi ý ${index + 1}...`}
                  className={inputClass() + ' flex-1'}
                />
                <button
                  onClick={() => removeHint(index)}
                  className="mt-1 p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  title="Xóa gợi ý"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Code and Test Cases */}
        <div className="space-y-6">
          {/* Code editors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Code</h2>

            {/* Starter code */}
            <FormField label="Code khởi đầu" hint="Code mẫu hiển thị cho học sinh khi bắt đầu bài tập">
              <textarea
                value={form.starter_code}
                onChange={(e) => updateField('starter_code', e.target.value)}
                placeholder="# Code khởi đầu cho học sinh..."
                rows={6}
                className={`${inputClass()} font-mono text-sm`}
                spellCheck={false}
              />
            </FormField>

            {/* Solution code */}
            <FormField label="Code lời giải" hint="Lời giải mẫu để test với test cases">
              <textarea
                value={form.solution_code}
                onChange={(e) => updateField('solution_code', e.target.value)}
                placeholder="# Lời giải mẫu..."
                rows={8}
                className={`${inputClass()} font-mono text-sm`}
                spellCheck={false}
              />
            </FormField>
          </div>

          {/* Test cases */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Test Cases ({testCases.length})
              </h2>
              <button
                onClick={addTestCase}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Thêm test case
              </button>
            </div>

            {errors.test_cases && (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.test_cases}</p>
            )}

            {testCases.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Chưa có test case nào. Thêm ít nhất một test case.
              </p>
            )}

            {testCases.map((tc, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 dark:border-gray-600 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Test case {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={tc.is_hidden}
                        onChange={(e) => updateTestCase(index, 'is_hidden', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      Ẩn
                    </label>
                    <button
                      onClick={() => removeTestCase(index)}
                      className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Xóa test case"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Input
                    </label>
                    <textarea
                      value={tc.input}
                      onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                      placeholder="Dữ liệu đầu vào..."
                      rows={3}
                      className={`${inputClass()} font-mono text-xs`}
                      spellCheck={false}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Expected Output
                    </label>
                    <textarea
                      value={tc.expected_output}
                      onChange={(e) => updateTestCase(index, 'expected_output', e.target.value)}
                      placeholder="Kết quả mong đợi..."
                      rows={3}
                      className={`${inputClass()} font-mono text-xs`}
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete button (edit mode only) */}
      {mode === 'edit' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Xóa bài tập
            </button>
          ) : (
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Bạn có chắc muốn xóa bài tập này? Hành động này không thể hoàn tác.
                Tất cả test cases và bài nộp của học sinh sẽ bị xóa.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-lg transition-colors flex items-center gap-2"
                >
                  {deleting && <SpinnerIcon className="h-4 w-4 animate-spin" />}
                  {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ─── Sub-Components ──────────────────────────────────────────────────────────

function FormField({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

function inputClass(error?: string): string {
  const base =
    'block w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 transition-colors';
  if (error) {
    return `${base} border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500`;
  }
  return `${base} border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400`;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
