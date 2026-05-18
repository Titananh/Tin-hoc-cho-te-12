'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  start?: boolean;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  start = true,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration,
  });

  const formattedValue = useTransform(spring, (latest) => {
    const num = Math.round(latest);
    return new Intl.NumberFormat('vi-VN').format(num);
  });

  useEffect(() => {
    if (start) {
      spring.set(end);
    }
  }, [spring, end, start]);

  useEffect(() => {
    const unsubscribe = formattedValue.on('change', (value) => {
      setDisplayValue(parseInt(value.replace(/[.,]/g, ''), 10));
    });
    return unsubscribe;
  }, [formattedValue]);

  return (
    <motion.span>
      {prefix}
      {new Intl.NumberFormat('vi-VN').format(displayValue)}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;