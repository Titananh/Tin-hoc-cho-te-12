'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

interface DayData {
  date: string;
  dayName: string;
  xp: number;
  isToday: boolean;
}

interface WeeklyHeatmapProps {
  weeks?: number;
}

// Generate mock data for the heatmap
function generateMockData(weeks: number): DayData[][] {
  const data: DayData[][] = [];
  const today = new Date();
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  for (let w = weeks - 1; w >= 0; w--) {
    const weekData: DayData[] = [];
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (today.getDay() + 7 * w));

    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + d);

      // Don't include future dates
      if (currentDate > today) {
        weekData.push({
          date: currentDate.toISOString().split('T')[0],
          dayName: dayNames[d],
          xp: 0,
          isToday: false,
        });
      } else {
        // Generate random XP for past dates (more realistic distribution)
        const randomXP = Math.random() > 0.3 ? Math.floor(Math.random() * 150) : 0;
        weekData.push({
          date: currentDate.toISOString().split('T')[0],
          dayName: dayNames[d],
          xp: randomXP,
          isToday: currentDate.toDateString() === today.toDateString(),
        });
      }
    }
    data.push(weekData);
  }

  return data;
}

function getHeatmapColor(xp: number, isDark: boolean): string {
  if (xp === 0) return isDark ? '#334155' : '#e2e8f0';
  if (xp <= 50) return isDark ? '#166534' : '#bbf7d0';
  if (xp <= 100) return isDark ? '#15803d' : '#4ade80';
  return isDark ? '#22c55e' : '#16a34a';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function WeeklyHeatmap({ weeks = 8 }: WeeklyHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mockData = generateMockData(weeks);

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Hoạt động học tập
      </h3>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1 min-w-max">
          {/* Day labels */}
          <div className="flex gap-1 mb-1">
            <div className="w-8" /> {/* Spacer for row labels */}
            {mockData[0]?.map((day, i) => (
              <div
                key={i}
                className="w-8 text-center text-xs text-muted"
              >
                {dayNames[i]}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {mockData.map((week, weekIndex) => (
            <motion.div
              key={weekIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: weekIndex * 0.05 }}
              className="flex gap-1"
            >
              {/* Week label */}
              <div className="w-8 text-xs text-muted flex items-center">
                Tuần {weekIndex + 1}
              </div>

              {/* Days */}
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.02 }}
                  className="relative"
                >
                  <div
                    className={`
                      w-8 h-8 rounded-md cursor-pointer transition-all duration-200
                      hover:scale-110 hover:z-10
                      ${day.isToday ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : ''}
                    `}
                    style={{ backgroundColor: getHeatmapColor(day.xp, false) }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                      setHoveredDay(day);
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted">Ít</span>
        <div className="flex gap-1">
          {[0, 25, 75, 125].map((xp) => (
            <div
              key={xp}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: getHeatmapColor(xp, false) }}
            />
          ))}
        </div>
        <span className="text-xs text-muted">Nhiều</span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 60,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-surface-elevated dark:bg-slate-800 px-4 py-3 rounded-xl shadow-lg border border-border">
              <p className="text-sm font-medium text-foreground">
                {formatDate(hoveredDay.date)}
              </p>
              <p className="text-xs text-muted mt-1">
                <span className="text-primary font-medium">{hoveredDay.xp} XP</span>
                {hoveredDay.isToday && (
                  <span className="ml-2 text-xs text-primary">(Hôm nay)</span>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WeeklyHeatmap;