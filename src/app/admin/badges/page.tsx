'use client';

import { useEffect, useState, useCallback } from 'react';

interface Badge {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  xp_reward: number;
  is_active: boolean;
  earned_count: number;
  created_at: string;
}

export default function AdminBadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create/Edit modal
  const [showModal, setShowModal] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formIcon, setFormIcon] = useState('🏆');
  const [formColor, setFormColor] = useState('#FFD700');
  const [formRequirement, setFormRequirement] = useState('');
  const [formXpReward, setFormXpReward] = useState(0);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Badge | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBadges = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/badges');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể tải danh sách huy hiệu');
      }

      const data = await res.json();
      setBadges(data.badges);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const openCreateModal = () => {
    setEditingBadge(null);
    setFormName('');
    setFormDescription('');
    setFormIcon('🏆');
    setFormColor('#FFD700');
    setFormRequirement('');
    setFormXpReward(0);
    setShowModal(true);
  };

  const openEditModal = (badge: Badge) => {
    setEditingBadge(badge);
    setFormName(badge.name);
    setFormDescription(badge.description);
    setFormIcon(badge.icon);
    setFormColor(badge.color);
    setFormRequirement(badge.requirement);
    setFormXpReward(badge.xp_reward);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formName.trim() || !formDescription.trim()) {
      setError('Tên và mô tả huy hiệu là bắt buộc.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        name: formName.trim(),
        description: formDescription.trim(),
        icon: formIcon.trim(),
        color: formColor.trim(),
        requirement: formRequirement.trim(),
        xp_reward: formXpReward,
      };

      const url = editingBadge
        ? `/api/admin/badges/${editingBadge.id}`
        : '/api/admin/badges';

      const res = await fetch(url, {
        method: editingBadge ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể lưu huy hiệu');
      }

      setShowModal(false);
      fetchBadges();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi lưu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/badges/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Không thể xóa huy hiệu');
      }

      setDeleteTarget(null);
      fetchBadges();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi xóa');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý huy hiệu
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Tạo và quản lý huy hiệu thưởng cho người dùng
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Tạo huy hiệu mới
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => { setError(null); fetchBadges(); }}
            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Badge grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1">
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="mt-2 h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chưa có huy hiệu nào trong hệ thống.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 ${
                badge.is_active
                  ? 'border-gray-200 dark:border-gray-700'
                  : 'border-gray-200 opacity-60 dark:border-gray-700'
              }`}
            >
              {/* Badge status */}
              {!badge.is_active && (
                <span className="absolute top-2 right-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  Đã vô hiệu
                </span>
              )}

              {/* Badge icon and info */}
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                  style={{ backgroundColor: `${badge.color}20`, border: `2px solid ${badge.color}` }}
                >
                  {badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {badge.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Badge details */}
              <div className="mt-3 space-y-1.5">
                {badge.requirement && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <TargetIcon className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{badge.requirement}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                    <StarIcon className="h-3.5 w-3.5" />
                    +{badge.xp_reward} XP
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <UsersIcon className="h-3.5 w-3.5" />
                    {badge.earned_count} người nhận
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                <button
                  onClick={() => openEditModal(badge)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <EditIcon className="mr-1 h-3.5 w-3.5" />
                  Sửa
                </button>
                <button
                  onClick={() => setDeleteTarget(badge)}
                  className="inline-flex items-center rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm transition-colors hover:bg-red-50 dark:border-red-700 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <TrashIcon className="mr-1 h-3.5 w-3.5" />
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingBadge ? 'Chỉnh sửa huy hiệu' : 'Tạo huy hiệu mới'}
            </h3>

            <div className="mt-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tên huy hiệu *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="VD: Người mới bắt đầu"
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mô tả *
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Mô tả điều kiện nhận huy hiệu..."
                  rows={2}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Icon and Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Biểu tượng
                  </label>
                  <input
                    type="text"
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    placeholder="🏆"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Màu sắc
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="color"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="h-9 w-9 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="block flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Requirement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Điều kiện nhận
                </label>
                <input
                  type="text"
                  value={formRequirement}
                  onChange={(e) => setFormRequirement(e.target.value)}
                  placeholder="VD: Hoàn thành 10 bài tập"
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* XP Reward */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Thưởng XP
                </label>
                <input
                  type="number"
                  value={formXpReward}
                  onChange={(e) => setFormXpReward(parseInt(e.target.value) || 0)}
                  min={0}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={saving}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : editingBadge ? (
                  'Cập nhật'
                ) : (
                  'Tạo huy hiệu'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Xác nhận vô hiệu hóa huy hiệu
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Bạn có chắc chắn muốn vô hiệu hóa huy hiệu{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                &ldquo;{deleteTarget.name}&rdquo;
              </span>
              ? Huy hiệu sẽ không còn được trao cho người dùng mới.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  'Vô hiệu hóa'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Icon Components ---

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-2.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
