'use client';

import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  earnedAt: string;
}

interface RecentBadgesProps {
  badges: Badge[];
  onBadgeClick?: (badgeId: string) => void;
}

export function RecentBadges({ badges, onBadgeClick }: RecentBadgesProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl' 
          : 'bg-white/70 border border-white/30 shadow-lg'
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-100'
              }`}
            >
              <Award className={`w-5 h-5 ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`} />
            </motion.div>
            <h3 className={`font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Huy hiệu gần đây
            </h3>
          </div>
        </div>

        {/* Badges Horizontal Scroll */}
        <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
          <div className="flex gap-3 pb-2">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                onClick={() => onBadgeClick?.(badge.id)}
                className={`flex-shrink-0 w-28 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Badge Icon */}
                <div 
                  className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${badge.color}20` }}
                >
                  <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    {badge.icon}
                  </span>
                </div>
                
                {/* Badge Name */}
                <p className={`text-xs font-semibold text-center mb-1 line-clamp-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {badge.name}
                </p>
                
                {/* Earned Date */}
                <div className="flex items-center justify-center gap-1">
                  <Calendar className={`w-3 h-3 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-xs ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {new Date(badge.earnedAt).toLocaleDateString('vi-VN', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Empty state */}
            {badges.length === 0 && (
              <div className={`flex-shrink-0 w-full py-8 text-center ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Chưa có huy hiệu nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}