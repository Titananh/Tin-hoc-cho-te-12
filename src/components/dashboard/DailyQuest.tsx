'use client';

import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface QuestItem {
  id: string;
  title: string;
  xpReward: number;
  isCompleted: boolean;
}

interface DailyQuestProps {
  quests: QuestItem[];
  onToggleQuest: (questId: string) => void;
}

export function DailyQuest({ quests, onToggleQuest }: DailyQuestProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const completedCount = quests.filter(q => q.isCompleted).length;
  const totalXP = quests.reduce((sum, q) => sum + q.xpReward, 0);
  const earnedXP = quests.filter(q => q.isCompleted).reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl' 
          : 'bg-white/70 border border-white/30 shadow-lg'
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: completedCount === quests.length ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' 
                  : 'bg-gradient-to-br from-emerald-100 to-teal-100'
              }`}
            >
              <Star className={`w-5 h-5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </motion.div>
            <div>
              <h3 className={`font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Nhiệm vụ hàng ngày
              </h3>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {completedCount}/{quests.length} hoàn thành
              </p>
            </div>
          </div>
          
          <div className={`text-right ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            <span className="text-lg font-bold">+{earnedXP}</span>
            <span className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              / {totalXP} XP
            </span>
          </div>
        </div>

        {/* Quest Items */}
        <div className="space-y-3">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onToggleQuest(quest.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  quest.isCompleted
                    ? isDark
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : 'bg-emerald-50 border border-emerald-200'
                    : isDark
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {/* Checkbox */}
                <motion.div
                  animate={quest.isCompleted ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    quest.isCompleted
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                      : isDark
                        ? 'bg-white/10 border-2 border-gray-600'
                        : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {quest.isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Quest info */}
                <span className={`flex-1 text-left text-sm font-medium ${
                  quest.isCompleted
                    ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                    : isDark ? 'text-gray-300' : 'text-gray-700'
                } ${quest.isCompleted ? 'line-through' : ''}`}
                >
                  {quest.title}
                </span>

                {/* XP Reward */}
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  quest.isCompleted
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-emerald-100 text-emerald-600'
                    : isDark
                      ? 'bg-white/10 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  +{quest.xpReward} XP
                </span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Progress bar at bottom */}
        <div className="mt-4">
          <div className={`h-1.5 rounded-full overflow-hidden ${
            isDark ? 'bg-white/10' : 'bg-gray-200'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / quests.length) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}