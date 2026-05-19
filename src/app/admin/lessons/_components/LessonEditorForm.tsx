'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────

interface LessonFormData {
  title: string;
  slug: string;
  description: string;
  content: Record<string, unknown>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_minutes: number;
  xp_reward: number;
  module_id: number;
  is_published: boolean;
}

interface ModuleOption {
  id: number;
  title: string;
  course_title: string;
}

interface FormErrors {
  title?: string;
  slug?: string;
  module_id?: string;
  estimated_minutes?: string;
  xp_reward?: string;
  content?: string;
}

interface Props {
  mode: 'create' | 'edit';
  lessonId?: number;
  initialData: LessonFormData;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Cơ bản' },
  { value: 'intermediate', label: 'Trung bình' },
  { value: 'advanced', label: 'Nâng cao' },
];


// ─── Main Component ──────────────────────────────────────────────────────────

export default function LessonEditorForm({ mode, lessonId, initialData }: Props) {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState<LessonFormData>(initialData);
  const [contentJson, setContentJson] = useState(
    JSON.stringify(initialData.content, null, 2)
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit');

  // UI state
  const [modules, setModules] = useState<ModuleOption[]>([]);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch modules for dropdown
  const fetchModules = useCallback(async () => {
    setModulesLoading(true);
    try {
      // Use the levels API to get courses and their modules
      const res = await fetch('/api/levels');
      if (!res.ok) throw new Error('Không thể tải danh sách module');
      const data = await res.json();

      const moduleOptions: ModuleOption[] = [];
      for (const level of data.levels ?? []) {
        for (const chapter of level.chapters ?? []) {
          moduleOptions.push({
            id: chapter.id,
            title: chapter.title,
            course_title: level.title,
          });
        }
      }
      setModules(moduleOptions);
    } catch {
      // Fallback: try fetching from lessons API to get module info
      try {
        const res = await fetch('/api/admin/lessons?page=1');
        if (res.ok) {
          const data = await res.json();
          const seen = new Set<number>();
          const moduleOptions: ModuleOption[] = [];
          for (const lesson of data.lessons ?? []) {
            const mod = lesson.modules;
            if (mod && !seen.has(mod.id)) {
              seen.add(mod.id);
              moduleOptions.push({
                id: mod.id,
                title: mod.title,
                course_title: mod.courses?.title ?? '',
              });
            }
          }
          setModules(moduleOptions);
        }
      } catch {
        // silently fail - user can still type module_id
      }
    } finally {
      setModulesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && form.title) {
      setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [form.title, slugManuallyEdited]);

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

    if (!form.slug.trim()) {
      newErrors.slug = 'Slug là bắt buộc';
    } else if (!/^[a-z0-9-]+$/.test(form.slug)) {
      newErrors.slug = 'Slug chỉ chứa chữ thường, số và dấu gạch ngang';
    }

    if (!form.module_id || form.module_id === 0) {
      newErrors.module_id = 'Vui lòng chọn module/chương';
    }

    if (!form.estimated_minutes || form.estimated_minutes <= 0) {
      newErrors.estimated_minutes = 'Thời gian phải lớn hơn 0';
    }

    if (form.xp_reward < 0) {
      newErrors.xp_reward = 'XP không được âm';
    }

    // Validate JSON content
    try {
      JSON.parse(contentJson);
    } catch {
      newErrors.content = 'Nội dung JSON không hợp lệ';
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
      let parsedContent: Record<string, unknown> = {};
      try {
        parsedContent = JSON.parse(contentJson);
      } catch {
        parsedContent = {};
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description.trim() || null,
        content: parsedContent,
        difficulty: form.difficulty,
        estimated_minutes: form.estimated_minutes,
        xp_reward: form.xp_reward,
        module_id: form.module_id,
        is_published: form.is_published,
      };

      const url =
        mode === 'edit'
          ? `/api/admin/lessons/${lessonId}`
          : '/api/admin/lessons';

      const res = await fetch(url, {
        method: mode === 'edit' ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Không thể lưu bài học');
      }

      setSaveMessage({ type: 'success', text: data.message ?? 'Lưu thành công!' });

      // If creating, redirect to edit page
      if (mode === 'create' && data.lesson?.id) {
        setTimeout(() => {
          router.push(`/admin/lessons/${data.lesson.id}/edit`);
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
    if (mode !== 'edit' || !lessonId) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Không thể xóa bài học');
      }

      router.push('/admin/lessons');
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

  // ─── Field Handlers ──────────────────────────────────────────────────────

  function updateField<K extends keyof LessonFormData>(key: K, value: LessonFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/lessons')}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Danh sách bài học
          </button>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {mode === 'edit' ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {mode === 'edit' && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {showPreview ? 'Ẩn xem trước' : 'Xem trước'}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors flex items-center gap-2"
          >
            {saving && <SpinnerIcon className="h-4 w-4 animate-spin" />}
            {saving ? 'Đang lưu...' : 'Lưu bài học'}
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

      <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
          {/* Title */}
          <FormField label="Tiêu đề" required error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Nhập tiêu đề bài học..."
              className={inputClass(errors.title)}
            />
          </FormField>

          {/* Slug */}
          <FormField label="Slug (URL)" required error={errors.slug}>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  updateField('slug', e.target.value);
                }}
                placeholder="ten-bai-hoc"
                className={inputClass(errors.slug) + ' flex-1'}
              />
              {slugManuallyEdited && (
                <button
                  type="button"
                  onClick={() => {
                    setSlugManuallyEdited(false);
                    updateField('slug', generateSlug(form.title));
                  }}
                  className="px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors whitespace-nowrap"
                >
                  Tự tạo
                </button>
              )}
            </div>
          </FormField>

          {/* Module selector */}
          <FormField label="Module / Chương" required error={errors.module_id}>
            <select
              value={form.module_id || ''}
              onChange={(e) => updateField('module_id', parseInt(e.target.value, 10) || 0)}
              className={inputClass(errors.module_id)}
              disabled={modulesLoading}
            >
              <option value="">
                {modulesLoading ? 'Đang tải...' : '-- Chọn module --'}
              </option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.course_title} → {mod.title}
                </option>
              ))}
            </select>
          </FormField>

          {/* Difficulty + Estimated minutes row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Độ khó" required>
              <select
                value={form.difficulty}
                onChange={(e) =>
                  updateField('difficulty', e.target.value as LessonFormData['difficulty'])
                }
                className={inputClass()}
              >
                {DIFFICULTY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Thời gian (phút)" required error={errors.estimated_minutes}>
              <input
                type="number"
                min={1}
                value={form.estimated_minutes}
                onChange={(e) => updateField('estimated_minutes', parseInt(e.target.value, 10) || 0)}
                className={inputClass(errors.estimated_minutes)}
              />
            </FormField>
          </div>

          {/* XP reward */}
          <FormField label="Điểm XP thưởng" required error={errors.xp_reward}>
            <input
              type="number"
              min={0}
              value={form.xp_reward}
              onChange={(e) => updateField('xp_reward', parseInt(e.target.value, 10) || 0)}
              className={inputClass(errors.xp_reward)}
            />
          </FormField>

          {/* Description */}
          <FormField label="Mô tả">
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Mô tả ngắn về bài học..."
              rows={3}
              className={inputClass()}
            />
          </FormField>

          {/* Content JSON editor */}
          <FormField
            label="Nội dung bài học (JSON)"
            error={errors.content}
            hint="Định dạng JSON chứa: objectives, theory, examples, quiz"
          >
            <textarea
              value={contentJson}
              onChange={(e) => {
                setContentJson(e.target.value);
                if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
              }}
              placeholder={`{\n  "objectives": ["Mục tiêu 1", "Mục tiêu 2"],\n  "theory": "Nội dung lý thuyết...",\n  "examples": [],\n  "quiz": []\n}`}
              rows={12}
              className={`${inputClass(errors.content)} font-mono text-sm`}
              spellCheck={false}
            />
          </FormField>

          {/* Published toggle */}
          <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Xuất bản</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Bài học sẽ hiển thị cho học sinh khi được xuất bản
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

          {/* Delete button (edit mode only) */}
          {mode === 'edit' && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Xóa bài học
                </button>
              ) : (
                <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    Bạn có chắc muốn xóa bài học này? Hành động này không thể hoàn tác.
                    Tất cả bài tập và tiến độ học sinh liên quan sẽ bị xóa.
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

        {/* Preview panel */}
        {showPreview && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 overflow-y-auto max-h-[80vh]">
            <LessonPreview form={form} contentJson={contentJson} />
          </div>
        )}
      </div>
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

// ─── Preview Component ───────────────────────────────────────────────────────

function LessonPreview({
  form,
  contentJson,
}: {
  form: LessonFormData;
  contentJson: string;
}) {
  let content: Record<string, unknown> = {};
  try {
    content = JSON.parse(contentJson);
  } catch {
    // invalid JSON
  }

  const difficultyLabel = DIFFICULTY_OPTIONS.find((d) => d.value === form.difficulty)?.label ?? form.difficulty;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
        <EyeIcon className="h-4 w-4" />
        <span>Xem trước bài học</span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {form.title || 'Chưa có tiêu đề'}
      </h2>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 text-blue-700 dark:text-blue-300">
          {difficultyLabel}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-gray-700 dark:text-gray-300">
          ⏱ {form.estimated_minutes} phút
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-1 text-yellow-700 dark:text-yellow-300">
          ⭐ {form.xp_reward} XP
        </span>
        {form.is_published ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-1 text-green-700 dark:text-green-300">
            Đã xuất bản
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-1 text-orange-700 dark:text-orange-300">
            Bản nháp
          </span>
        )}
      </div>

      {form.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-blue-300 dark:border-blue-600 pl-3">
          {form.description}
        </p>
      )}

      {/* Objectives */}
      {Array.isArray(content.objectives) && content.objectives.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            🎯 Mục tiêu bài học
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {(content.objectives as string[]).map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Theory */}
      {content.theory && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            📖 Lý thuyết
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {String(content.theory).slice(0, 500)}
            {String(content.theory).length > 500 && '...'}
          </div>
        </div>
      )}

      {/* Examples */}
      {Array.isArray(content.examples) && content.examples.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            💡 Ví dụ ({(content.examples as unknown[]).length})
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Có {(content.examples as unknown[]).length} ví dụ trong bài học
          </p>
        </div>
      )}

      {/* Quiz */}
      {Array.isArray(content.quiz) && content.quiz.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            📝 Câu hỏi trắc nghiệm ({(content.quiz as unknown[]).length})
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Có {(content.quiz as unknown[]).length} câu hỏi trắc nghiệm
          </p>
        </div>
      )}

      {Object.keys(content).length === 0 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic">
          Chưa có nội dung. Nhập JSON vào trường nội dung để xem trước.
        </p>
      )}
    </div>
  );
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

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
