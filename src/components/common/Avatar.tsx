'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  src?: string;
  name?: string;
  icon?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
};

const shapeMap = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-xl',
};

// Generate consistent gradient based on name using hash
function getGradientFromName(name: string): string {
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-yellow-500 to-orange-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-green-600',
    'from-amber-500 to-yellow-600',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function Avatar({
  src,
  name,
  icon,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
}: AvatarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const showImage = src && !imgError;
  const showInitials = !src || imgError;
  const showIcon = !src && !name;

  const sizeClasses = sizeMap[size];
  const shapeClasses = shapeMap[shape];
  const initialGradient = name ? getGradientFromName(name) : 'from-gray-400 to-gray-500';
  const initial = name ? getInitial(name) : '';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center ${sizeClasses} ${shapeClasses} overflow-hidden flex-shrink-0 ${className}`}
    >
      {/* Image Avatar */}
      {showImage && (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`w-full h-full object-cover ${shapeClasses}`}
          onError={() => setImgError(true)}
        />
      )}

      {/* Initial Avatar */}
      {showInitials && name && (
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${initialGradient} ${shapeClasses}`}
        >
          <span className="font-semibold text-white">{initial}</span>
        </div>
      )}

      {/* Icon Avatar */}
      {showIcon && (
        <div
          className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          } ${shapeClasses}`}
        >
          {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
        </div>
      )}

      {/* Fallback when nothing provided */}
      {!src && !name && !icon && (
        <div
          className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          } ${shapeClasses}`}
        >
          <span className="text-gray-500 dark:text-gray-400">?</span>
        </div>
      )}

      {/* Status Indicator */}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ${
            isDarkMode ? 'ring-gray-900' : 'ring-white'
          } ${statusColors[status]}`}
        />
      )}
    </motion.div>
  );
}