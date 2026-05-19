'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface FloatingTutorButtonProps {
  hasUnreadMessage?: boolean;
  onClick?: () => void;
}

export default function FloatingTutorButton({
  hasUnreadMessage = false,
  onClick,
}: FloatingTutorButtonProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 10, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 px-4 py-2 rounded-lg whitespace-nowrap shadow-lg ${
              isDarkMode
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            <span className="font-medium">Hỏi PyMate</span>
            {/* Tooltip arrow */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0 h-0 border-y-8 border-y-transparent ${
                isDarkMode ? 'border-l-gray-800' : 'border-l-white'
              }`}
              style={{
                borderLeftWidth: '8px',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <button
        onClick={handleClick}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-shadow ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700 shadow-gray-900/50'
            : 'bg-white hover:bg-gray-50 shadow-gray-400/50'
        }`}
        aria-label="Open AI Tutor Chat"
      >
        {/* PyMate Avatar with robot icon */}
        <div className="relative">
          {/* Robot icon (PyMate) */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>

          {/* Online status badge */}
          <div className="absolute -bottom-0.5 -right-0.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDarkMode ? 'bg-green-400' : 'bg-green-500'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isDarkMode ? 'bg-green-500' : 'bg-green-600'
                }`}
              />
            </span>
            <span
              className={`text-xs font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Online
            </span>
          </div>

          {/* Unread message notification dot */}
          <AnimatePresence>
            {hasUnreadMessage && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
}