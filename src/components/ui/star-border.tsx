import React from 'react';
import { cn } from '../../lib/utils';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  duration?: number;
}

export function StarBorder({ 
  children, 
  className,
  speed = 1,
  duration = 20 
}: StarBorderProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors duration-300",
      className
    )}>
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl">
        <div 
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-20 dark:opacity-30"
          style={{
            background: `conic-gradient(from 0deg, #3b82f6, #8b5cf6, #14b8a6, #3b82f6)`,
            animation: `spin ${duration}s linear infinite`,
          }}
        />
        <div className="absolute inset-[1px] rounded-xl bg-white dark:bg-gray-900 transition-colors duration-300" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}