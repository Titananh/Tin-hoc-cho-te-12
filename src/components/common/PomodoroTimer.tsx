'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

type TimerMode = 'work' | 'break';

const WORK_DURATION = 25 * 60; // 25 phút
const BREAK_DURATION = 5 * 60; // 5 phút

/**
 * Pomodoro Timer - Đồng hồ đếm ngược 25/5 phút.
 * Hiển thị vòng tròn tiến trình, âm thanh khi hoàn thành.
 */
export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const totalTime = mode === 'work' ? WORK_DURATION : BREAK_DURATION;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Phát âm thanh beep khi hoàn thành
  const playBeep = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch {
      // Bỏ qua nếu Web Audio API không khả dụng
    }
  }, []);

  // Xử lý khi hết thời gian
  const handleComplete = useCallback(() => {
    playBeep();
    setIsRunning(false);

    if (mode === 'work') {
      setSessions((prev) => prev + 1);
      setMode('break');
      setTimeLeft(BREAK_DURATION);
    } else {
      setMode('work');
      setTimeLeft(WORK_DURATION);
    }
  }, [mode, playBeep]);

  // Timer interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, handleComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? WORK_DURATION : BREAK_DURATION);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? WORK_DURATION : BREAK_DURATION);
  };

  // Format thời gian mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // SVG circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Mode tabs */}
      <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <button
          onClick={() => switchMode('work')}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === 'work'
              ? 'bg-white text-red-600 shadow-sm dark:bg-gray-700 dark:text-red-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Làm việc
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === 'break'
              ? 'bg-white text-green-600 shadow-sm dark:bg-gray-700 dark:text-green-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Nghỉ ngơi
        </button>
      </div>

      {/* Circular progress */}
      <div className="relative flex items-center justify-center">
        <svg width="180" height="180" className="-rotate-90">
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={mode === 'work' ? 'text-red-500' : 'text-green-500'}
            initial={false}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {mode === 'work' ? 'Làm việc' : 'Nghỉ ngơi'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTimer}
          className={`rounded-full px-6 py-2.5 text-sm font-medium text-white transition-colors ${
            isRunning
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRunning ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
        <button
          onClick={resetTimer}
          className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Đặt lại
        </button>
      </div>

      {/* Session count */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Phiên hoàn thành: <span className="font-semibold">{sessions}</span>
      </p>
    </div>
  );
}
