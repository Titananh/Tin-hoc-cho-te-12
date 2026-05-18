'use client';

import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import NotificationList from './NotificationList';
import { Notification } from '@/types';

interface NotificationBellProps {
  notifications: Notification[];
  onRead: (id: string) => void;
}

export default function NotificationBell({ notifications, onRead }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const prevCountRef = useRef(notifications.filter(n => !n.is_read).length);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Shake bell when new notification arrives
  useEffect(() => {
    const currentCount = notifications.filter(n => !n.is_read).length;
    if (currentCount > prevCountRef.current) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
    }
    prevCountRef.current = currentCount;
  }, [notifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification-bell-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleRead = (id: string) => {
    onRead(id);
  };

  return (
    <div className="relative notification-bell-container">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        animate={shouldShake ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full px-1"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <NotificationList
            notifications={notifications}
            onRead={handleRead}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}