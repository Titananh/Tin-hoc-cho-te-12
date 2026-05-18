'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Crown,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Medal,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

// Types
interface LeaderboardUser {
  id: string;
  name: string;
  avatar_url: string;
  xp: number;
  level: number;
  streak_count: number;
  rank_change: number;
  is_current_user: boolean;
}

type TimeFilter = 'week' | 'month' | 'all';
type Theme = 'light' | 'dark';

// Mock data
const generateMockData = (): LeaderboardUser[] => {
  const names = [
    'Nguyễn Minh Tuấn', 'Trần Thu Hà', 'Lê Hoàng Nam', 'Phạm Đức Anh',
    'Hoàng Mai Phương', 'Vũ Gia Huy', 'Đặng Minh Châu', 'Bùi Quang Đạt',
    'Phan Thị Lan', 'Đỗ Trọng Kiên', 'Cao Thanh Sơn', 'Trịnh Minh Đức',
    'Lý Thanh Hà', 'Ngô Đình Phong', 'Dương Thu Hương', 'Hà Đức Trung',
    'Lưu Thị Mai', 'Võ Thanh Sang', 'Chu Minh Tuệ', 'Phạm Hồng Đức',
  ];

  return names.map((name, index) => {
    const baseXP = 5000 - index * 200 + Math.floor(Math.random() * 100);
    const level = Math.floor(baseXP / 500) + 1;
    const rankChange = Math.floor(Math.random() * 10) - 4;

    return {
      id: `user_${index + 1}`,
      name,
      avatar_url: '',
      xp: baseXP,
      level,
      streak_count: Math.floor(Math.random() * 30) + 1,
      rank_change: rankChange,
      is_current_user: index === 6, // Current user at position 7
    };
  });
};

const MOCK_USERS = generateMockData();

// Avatar component with gradient
function Avatar({
  name,
  size = 'md',
  isGold = false,
}: {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isGold?: boolean;
}) {
  const initial = name.charAt(0).toUpperCase();
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-indigo-500 to-purple-500',
  ];

  const colorIndex =
    name.charCodeAt(0) % gradients.length;

  return (
    <div
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        bg-gradient-to-br ${gradients[colorIndex]} text-white font-bold
        ${isGold ? 'ring-4 ring-yellow-400/50 shadow-lg shadow-yellow-500/30' : ''}
      `}
    >
      {initial}
    </div>
  );
}

// Level badge component
function LevelBadge({ level }: { level: number }) {
  return (
    <div className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
      LV {level}
    </div>
  );
}

// Rank change indicator
function RankChange({ change }: { change: number }) {
  if (change > 0) {
    return (
      <div className="flex items-center gap-1 text-success text-sm">
        <TrendingUp className="w-4 h-4" />
        <span>+{change}</span>
      </div>
    );
  }
  if (change < 0) {
    return (
      <div className="flex items-center gap-1 text-error text-sm">
        <TrendingDown className="w-4 h-4" />
        <span>{change}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-muted text-sm">
      <Minus className="w-4 h-4" />
      <span>0</span>
    </div>
  );
}

// Medal icons for podium
function MedalIcon({ place }: { place: 1 | 2 | 3 }) {
  const colors = {
    1: 'text-yellow-400 drop-shadow-lg shadow-yellow-400/50',
    2: 'text-gray-300 drop-shadow-lg shadow-gray-300/50',
    3: 'text-orange-400 drop-shadow-lg shadow-orange-400/50',
  };

  return <Medal className={`w-8 h-8 ${colors[place]}`} />;
}

// Podium Card
function PodiumCard({
  user,
  place,
}: {
  user: LeaderboardUser;
  place: 1 | 2 | 3;
}) {
  const isFirst = place === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: place * 0.1,
      }}
      className={`
        flex flex-col items-center p-4 rounded-2xl
        glass card-shadow hover:card-shadow-hover transition-all duration-300
        ${isFirst ? 'scale-110 z-10' : ''}
      `}
    >
      {/* Crown for 1st place */}
      {isFirst && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-2"
        >
          <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
        </motion.div>
      )}

      {/* Medal */}
      <div className="mb-3">
        <MedalIcon place={place} />
      </div>

      {/* Avatar */}
      <div className={`relative ${isFirst ? 'mb-2' : ''}`}>
        <Avatar name={user.name} size={isFirst ? 'xl' : 'lg'} isGold={isFirst} />
        {isFirst && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl"
          />
        )}
      </div>

      {/* Name */}
      <h3 className="font-semibold text-center mb-1 line-clamp-1">
        {user.is_current_user ? (
          <span className="gradient-text">{user.name}</span>
        ) : (
          user.name
        )}
      </h3>

      {/* Level */}
      <LevelBadge level={user.level} />

      {/* XP */}
      <p className="text-sm text-muted mt-2 font-medium">
        {user.xp.toLocaleString()} XP
      </p>

      {/* Rank change */}
      <div className="mt-2">
        <RankChange change={user.rank_change} />
      </div>
    </motion.div>
  );
}

// List item for positions 4+
function LeaderboardListItem({
  user,
  rank,
}: {
  user: LeaderboardUser;
  rank: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: (rank - 3) * 0.05 }}
      className={`
        flex items-center gap-4 p-4 rounded-xl
        glass card-shadow hover:card-shadow-hover transition-all duration-300
        ${user.is_current_user ? 'ring-2 ring-primary bg-primary/5' : ''}
      `}
    >
      {/* Rank number */}
      <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center font-bold text-muted">
        {rank}
      </div>

      {/* Avatar */}
      <Avatar name={user.name} size="md" />

      {/* Name & Level */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold line-clamp-1">
          {user.is_current_user ? (
            <span className="gradient-text">{user.name}</span>
          ) : (
            user.name
          )}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <LevelBadge level={user.level} />
          <span className="text-xs text-muted">
            🔥 {user.streak_count} ngày
          </span>
        </div>
      </div>

      {/* XP */}
      <div className="text-right">
        <p className="font-bold text-primary">
          {user.xp.toLocaleString()}
        </p>
        <p className="text-xs text-muted">XP</p>
      </div>

      {/* Rank change */}
      <div className="w-16 flex justify-end">
        <RankChange change={user.rank_change} />
      </div>
    </motion.div>
  );
}

// Time filter tabs
function TimeFilterTabs({
  active,
  onChange,
}: {
  active: TimeFilter;
  onChange: (filter: TimeFilter) => void;
}) {
  const tabs: { key: TimeFilter; label: string }[] = [
    { key: 'week', label: 'Tuần' },
    { key: 'month', label: 'Tháng' },
    { key: 'all', label: 'Tất cả' },
  ];

  return (
    <div className="flex gap-2 p-1 rounded-xl bg-surface-elevated">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${
              active === tab.key
                ? 'bg-primary text-white shadow-md'
                : 'text-muted hover:text-foreground hover:bg-surface'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Search bar
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
      <input
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-elevated border border-border
          focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
      />
    </div>
  );
}

// Main Leaderboard page
export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let users = [...MOCK_USERS];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      users = users.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
    }

    return users;
  }, [searchQuery]);

  // Get top 3 and rest
  const top3 = filteredUsers.slice(0, 3);
  const rest = filteredUsers.slice(3);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-bg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">
                Bảng xếp hạng
              </h1>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-surface-elevated hover:bg-surface transition-colors"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Search */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Time filter */}
        <TimeFilterTabs active={timeFilter} onChange={setTimeFilter} />

        {/* Podium */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* 2nd place - first in DOM for proper ordering */}
          <div className="order-1 md:order-1">
            {top3[1] && <PodiumCard user={top3[1]} place={2} />}
          </div>

          {/* 1st place - center, larger */}
          <div className="order-2 md:order-2">
            {top3[0] && <PodiumCard user={top3[0]} place={1} />}
          </div>

          {/* 3rd place */}
          <div className="order-3 md:order-3">
            {top3[2] && <PodiumCard user={top3[2]} place={3} />}
          </div>
        </div>

        {/* Rest of the list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {rest.map((user, index) => (
              <LeaderboardListItem
                key={user.id}
                user={user}
                rank={index + 4}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Không tìm thấy người dùng
            </h3>
            <p className="text-muted">
              Thử tìm kiếm với từ khóa khác
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}