'use client';

import React from 'react';
import { AnimationFrame } from '@/hooks/useAnimationEngine';
import { useTheme } from '@/context/ThemeContext';

interface VisualizationCanvasProps {
  frame: AnimationFrame;
}

export default function VisualizationCanvas({ frame }: VisualizationCanvasProps) {
  const { theme } = useTheme();

  if (!frame || !frame.bars || frame.bars.length === 0) {
    return (
      <div
        className={`h-64 rounded-lg border flex items-center justify-center transition-colors ${
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700 text-slate-400'
            : 'bg-gray-100 border-gray-200 text-gray-600'
        }`}
      >
        No data to visualize
      </div>
    );
  }

  const maxValue = Math.max(...frame.bars);
  const minValue = Math.min(...frame.bars);
  const range = maxValue - minValue || 1;

  const getBarColor = (state: string) => {
    if (theme === 'dark') {
      switch (state) {
        case 'comparing':
          return 'bg-amber-400';
        case 'swapping':
          return 'bg-orange-500';
        case 'sorted':
          return 'bg-emerald-400';
        case 'active':
          return 'bg-rose-500';
        default:
          return 'bg-blue-500';
      }
    } else {
      switch (state) {
        case 'comparing':
          return 'bg-yellow-400';
        case 'swapping':
          return 'bg-orange-500';
        case 'sorted':
          return 'bg-green-500';
        case 'active':
          return 'bg-red-500';
        default:
          return 'bg-blue-400';
      }
    }
  };

  return (
    <div
      className={`flex items-end justify-center gap-1 h-80 rounded-lg p-4 border transition-colors ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700'
          : 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200'
      }`}
    >
      {frame.bars.map((value, idx) => {
        const heightPercent = ((value - minValue) / range) * 100;
        const state = frame.states[idx] || 'default';

        return (
          <div
            key={idx}
            className={`${getBarColor(state)} transition-all duration-100 rounded-t flex-1 min-w-0 shadow-md hover:shadow-lg`}
            style={{
              height: `${Math.max(heightPercent, 4)}%`,
            }}
            role="img"
            aria-label={`Bar ${idx + 1} with value ${value}, state: ${state}`}
          />
        );
      })}
    </div>
  );
}
