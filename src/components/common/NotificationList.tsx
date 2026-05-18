'use client';

import { X, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import NotificationItem from './NotificationItem';
import { Notification } from '@/types';

interface NotificationListProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  onClose: () => void;
}

export default function NotificationList({ notifications, onRead, onClose }: NotificationListProps) {
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.is_read) {
        onRead(n.id);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900 dark:text-white">Thông báo</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
              {unreadCount} mới
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              title="Đánh dấu tất cả đã đọc"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Không có thông báo nào
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Thông báo mới sẽ xuất hiện ở đây
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NotificationItem
                  id={notification.id}
                  type={notification.type}
                  title={notification.title}
                  content={notification.content}
                  time={notification.created_at}
                  isRead={notification.is_read}
                  onRead={onRead}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}