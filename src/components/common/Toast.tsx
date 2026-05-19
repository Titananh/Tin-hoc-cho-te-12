'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Zap, Flame, Star, CheckCircle2 } from 'lucide-react';

interface ToastMessage {
  id: string;
  type: 'success' | 'xp' | 'achievement' | 'streak' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...msg, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, msg.duration || 4000);
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'xp': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-purple-400" />;
      case 'streak': return <Flame className="w-5 h-5 text-orange-400" />;
      default: return <Star className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'success': return 'from-green-900/90 to-emerald-900/90 border-green-700/50';
      case 'xp': return 'from-yellow-900/90 to-amber-900/90 border-yellow-700/50';
      case 'achievement': return 'from-purple-900/90 to-violet-900/90 border-purple-700/50';
      case 'streak': return 'from-orange-900/90 to-red-900/90 border-orange-700/50';
      default: return 'from-slate-800/90 to-slate-900/90 border-slate-700/50';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-md bg-gradient-to-r ${getBg(toast.type)} shadow-2xl max-w-sm`}
            >
              {getIcon(toast.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{toast.title}</p>
                {toast.description && (
                  <p className="text-xs text-slate-300 mt-0.5">{toast.description}</p>
                )}
              </div>
              <button onClick={() => dismiss(toast.id)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
