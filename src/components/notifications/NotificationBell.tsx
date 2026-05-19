'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

/**
 * NotificationBell - Biểu tượng chuông thông báo trong header.
 * Hiển thị badge số thông báo chưa đọc.
 * Click mở dropdown danh sách thông báo gần đây.
 * Tự động đánh dấu đã đọc khi mở.
 */
export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/notifications?page=1');
      if (!res.ok) return;

      const data = await res.json();
      setNotifications(data.notifications ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    } catch (error) {
      console.error('Lỗi tải thông báo:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount and periodically
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Refresh mỗi 60s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark as read when opening dropdown
  const handleOpen = async () => {
    setIsOpen(!isOpen);

    if (!isOpen && unreadCount > 0) {
      // Đánh dấu tất cả thông báo hiển thị là đã đọc
      const unreadIds = notifications
        .filter((n) => !n.isRead)
        .map((n) => n.id);

      if (unreadIds.length > 0) {
        try {
          const res = await fetch('/api/notifications', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationIds: unreadIds }),
          });

          if (res.ok) {
            const data = await res.json();
            setUnreadCount(data.unreadCount ?? 0);
            setNotifications((prev) =>
              prev.map((n) =>
                unreadIds.includes(n.id) ? { ...n, isRead: true } : n
              )
            );
          }
        } catch (error) {
          console.error('Lỗi đánh dấu đã đọc:', error);
        }
      }
    }
  };

  // Format relative time in Vietnamese
  const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Vừa xong';
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  // Get icon for notification type
  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'badge':
        return '🏆';
      case 'level_up':
        return '⬆️';
      case 'streak':
        return '🔥';
      case 'reminder':
        return '⏰';
      default:
        return '🔔';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Thông báo${unreadCount > 0 ? ` (${unreadCount} chưa đọc)` : ''}`}
      >
        {/* Bell Icon */}
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Thông báo
            </h3>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {unreadCount} thông báo chưa đọc
              </p>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center">
                <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Đang tải...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <span className="text-3xl" role="img" aria-label="Không có thông báo">
                  🔔
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Chưa có thông báo nào
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                      !notification.isRead
                        ? 'bg-blue-50/50 dark:bg-blue-900/10'
                        : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <span className="text-lg flex-shrink-0" aria-hidden="true">
                        {getTypeIcon(notification.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/notifications"
                className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Xem tất cả thông báo
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
