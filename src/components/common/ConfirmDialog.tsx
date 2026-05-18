'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

const variantConfig = {
  danger: {
    icon: XCircle,
    iconColor: 'text-error',
    iconBg: 'bg-error/10',
    confirmBtn: 'bg-error hover:bg-error/90 text-white',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-warning',
    iconBg: 'bg-warning/10',
    confirmBtn: 'bg-warning hover:bg-warning/90 text-white',
  },
  info: {
    icon: Info,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    confirmBtn: 'bg-primary hover:bg-primary/90 text-white',
  },
};

const defaultLabels = {
  danger: { confirm: 'Xác nhận', cancel: 'Hủy' },
  warning: { confirm: 'Tiếp tục', cancel: 'Hủy' },
  info: { confirm: 'Đồng ý', cancel: 'Hủy' },
};

export function ConfirmDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant = 'info',
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const labels = defaultLabels[variant];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-full ${config.iconBg} flex items-center justify-center mb-4`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 200 }}
        >
          <Icon className={`w-8 h-8 ${config.iconColor}`} />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>

        {/* Message */}
        <p className="text-muted mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-foreground font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {cancelText || labels.cancel}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl ${config.confirmBtn} text-white font-medium transition-colors`}
          >
            {confirmText || labels.confirm}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;