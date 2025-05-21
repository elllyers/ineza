"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import * as lucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type LucideIconName = keyof typeof lucideIcons;

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  icon: LucideIconName;
  decimalPlaces?: number;
  animationConfig?: {
    stiffness?: number;
    damping?: number;
    duration?: number;
  };
}

interface AnimatedStatsProps {
  stats: StatItem[];
  staggerDelay?: number;
  containerClass?: string;
}

function SingleStat({
  value,
  prefix = "",
  suffix = "",
  title,
  icon,
  decimalPlaces = 0,
  animationConfig,
  index,
  staggerDelay,
  isInView,
}: StatItem & {
  index: number;
  staggerDelay: number;
  isInView: boolean;
}) {
  const Icon = lucideIcons[icon] as LucideIcon;
  const [currentValue, setCurrentValue] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);
  const animationRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);

  // Handle hydration mismatch by only showing animation on client
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient || !isInView) return;

    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const duration = (animationConfig?.duration ?? 2) * 1000;
    const staggerTime = index * (staggerDelay * 1000);
    const springStiffness = animationConfig?.stiffness ?? 100;
    const springDamping = animationConfig?.damping ?? 10;

    const animate = () => {
      if (!startTimeRef.current) return;

      const now = performance.now();
      const elapsed = now - startTimeRef.current - staggerTime;

      if (elapsed < 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (elapsed < duration) {
        const progress = Math.min(elapsed / duration, 1);
        // Simplified spring calculation for better stability
        const spring =
          progress *
          (1 - Math.exp((-springStiffness * progress) / springDamping));
        const newValue = Math.floor(value * spring);

        if (newValue !== currentValue) {
          setCurrentValue(newValue);
        }
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isClient,
    isInView,
    value,
    index,
    staggerDelay,
    currentValue,
    animationConfig,
  ]);

  // Only show animation on client side
  const displayValue = isClient
    ? currentValue.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })
    : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * staggerDelay }}
      className="flex flex-col items-center space-y-2 p-4"
    >
      <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-3 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg shadow-blue-500/10">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <motion.div
        className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm"
        style={{
          textShadow: "0 4px 12px rgba(37, 99, 235, 0.1)",
        }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </motion.div>
      <div className="text-sm font-medium bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent dark:from-slate-300 dark:to-slate-400">
        {title}
      </div>
    </motion.div>
  );
}

export function AnimatedStats({
  stats,
  staggerDelay = 0.2,
  containerClass,
}: AnimatedStatsProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        containerClass
      )}
    >
      {stats.map((stat, index) => (
        <SingleStat
          key={stat.title}
          {...stat}
          index={index}
          staggerDelay={staggerDelay}
          isInView={isInView}
        />
      ))}
    </div>
  );
}
