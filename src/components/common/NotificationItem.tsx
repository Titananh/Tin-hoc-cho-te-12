'use client';

import { Trophy, Bell, Flame, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';

type NotificationType = 'achievement' | 'reminder' | 'streak' | 'info';

interface NotificationItemProps {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  onRead: (id: string) => void;
}

const typeConfig = {
  achievement: {
    icon: Trophy,
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  reminder: {
    icon: Bell,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  streak: {
    icon: Flame,
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-400',
  },
};

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ngày trước`;
  }
  if (hours > 0) {
    return `${hours} giờ trước`;
  }
  if (minutes > 0) {
    return `${minutes} phút trước`;
  }
  return 'Vừa xong';
}

export default function NotificationItem({
  id,
  type,
  title,
  content,
  time,
  isRead,
  onRead,
}: NotificationItemProps) {
  const { theme } = useTheme();
  const config = typeConfig[type];
  const Icon = config.icon;
  const isDarkMode = theme === 'dark';

  const handleClick = () => {
    if (!isRead) {
      onRead(id);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`
        relative px-4 py-3 cursor-pointer transition-all duration-200
        hover:bg-gray-50 dark:hover:bg-gray-800/50
        ${!isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`
              font-medium text-sm leading-tight
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              {title}
            </h4>
            {!isRead && (
              <span className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
            )}
          </div>
          <p className={`
            text-sm mt-0.5 leading-snug
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `}>
            {content}
          </p>
          <p className={`
            text-xs mt-1.5
            ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
          `}>
            {getTimeAgo(time)}
          </p>
        </div>
      </div>

      {/* Unread indicator line */}
      {!isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-full" />
      )}
    </motion.div>
  );
}