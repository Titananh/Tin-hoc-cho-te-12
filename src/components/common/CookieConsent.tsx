'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, X, ChevronRight } from 'lucide-react';

interface CookieCategory {
  id: 'necessary' | 'analytics' | 'marketing';
  label: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    label: 'Cần thiết',
    description: 'Những cookie này cần thiết để website hoạt động đúng cách.',
    required: true,
    enabled: true,
  },
  {
    id: 'analytics',
    label: 'Phân tích',
    description: 'Giúp chúng tôi hiểu cách visitors tương tác với website.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Được sử dụng để cá nhân hóa quảng cáo và đo lường hiệu quả.',
    required: false,
    enabled: false,
  },
];

const CONSENT_KEY = 'cookie_consent';
const PRIVACY_POLICY_URL = '/privacy-policy';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<CookieCategory[]>(cookieCategories);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (!savedConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Monitor dark mode changes
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

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const consent = {
      necessary: true, // Always true
      analytics: categories.find(c => c.id === 'analytics')?.enabled ?? false,
      marketing: categories.find(c => c.id === 'marketing')?.enabled ?? false,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setShowModal(false);
  };

  const handleToggleCategory = (categoryId: 'necessary' | 'analytics' | 'marketing') => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, enabled: !cat.enabled }
          : cat
      )
    );
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideUpVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
          onClick={() => setShowModal(false)}
        />

        {/* Banner */}
        <motion.div
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div
            className={`
              relative mx-auto max-w-4xl rounded-2xl p-6
              backdrop-blur-xl border shadow-2xl
              ${
                isDarkMode
                  ? 'bg-gray-900/90 border-gray-700/50 text-white'
                  : 'bg-white/90 border-gray-200/50 text-gray-900'
              }
            `}
            style={{
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className={`
                absolute top-4 right-4 p-2 rounded-full
                transition-colors duration-200
                ${
                  isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }
              `}
              aria-label="Đóng"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Icon */}
              <div
                className={`
                  flex-shrink-0 w-14 h-14 rounded-2xl
                  flex items-center justify-center
                  ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                      : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  }
                `}
              >
                <Cookie className="w-7 h-7 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    🍪 Cookie Consent
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn.{' '}
                    <a
                      href={PRIVACY_POLICY_URL}
                      className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2"
                    >
                      Chính sách bảo mật
                    </a>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className={`
                      px-6 py-2.5 rounded-xl font-medium text-sm
                      transition-all duration-200
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      text-white shadow-lg shadow-indigo-500/25
                      hover:shadow-xl hover:shadow-indigo-500/30
                      hover:scale-105
                    `}
                  >
                    Chấp nhận tất cả
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className={`
                      px-6 py-2.5 rounded-xl font-medium text-sm
                      transition-all duration-200
                      border-2 flex items-center gap-2
                      ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                      }
                    `}
                  >
                    Tùy chỉnh
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Customization Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`
                  w-full max-w-lg rounded-2xl p-6
                  backdrop-blur-xl border shadow-2xl
                  ${
                    isDarkMode
                      ? 'bg-gray-900/95 border-gray-700/50 text-white'
                      : 'bg-white/95 border-gray-200/50 text-gray-900'
                  }
                `}
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'}
                      `}
                    >
                      <Shield className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h2
                      className={`text-xl font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Tùy chỉnh Cookie
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className={`
                      p-2 rounded-full transition-colors duration-200
                      ${
                        isDarkMode
                          ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }
                    `}
                    aria-label="Đóng"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Description */}
                <p
                  className={`text-sm mb-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Quản lý các loại cookie bạn cho phép. Cookie cần thiết luôn được bật.
                </p>

                {/* Category List */}
                <div className="space-y-4 mb-6">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        p-4 rounded-xl border
                        ${
                          isDarkMode
                            ? 'border-gray-700/50 bg-gray-800/30'
                            : 'border-gray-200 bg-gray-50/50'
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        {/* Toggle Switch */}
                        <button
                          onClick={() => !category.required && handleToggleCategory(category.id)}
                          disabled={category.required}
                          className={`
                            relative mt-1 w-11 h-6 rounded-full transition-colors duration-200
                            ${
                              category.enabled
                                ? 'bg-indigo-500'
                                : isDarkMode
                                ? 'bg-gray-600'
                                : 'bg-gray-300'
                            }
                            ${category.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          aria-label={`Toggle ${category.label}`}
                        >
                          <span
                            className={`
                              absolute top-1 left-1 w-4 h-4 rounded-full bg-white
                              transition-transform duration-200
                              ${category.enabled ? 'translate-x-5' : 'translate-x-0'}
                            `}
                          />
                        </button>

                        {/* Text */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {category.label}
                            </h3>
                            {category.required && (
                              <span
                                className={`
                                  text-xs px-2 py-0.5 rounded-full
                                  ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}
                                `}
                              >
                                Bắt buộc
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm mt-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl font-medium text-sm
                      transition-colors duration-200
                      ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveCustom}
                    className={`
                      flex-1 px-4 py-2.5 rounded-xl font-medium text-sm
                      transition-all duration-200
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      text-white shadow-lg shadow-indigo-500/25
                      hover:shadow-xl hover:shadow-indigo-500/30
                      hover:scale-[1.02]
                    `}
                  >
                    Lưu cài đặt
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}