'use client';

import React from 'react';
import { AnimationFrame } from '@/hooks/useAnimationEngine';

interface VisualizationCanvasProps {
  frame: AnimationFrame;
}

export default function VisualizationCanvas({ frame }: VisualizationCanvasProps) {
  if (!frame || !frame.bars || frame.bars.length === 0) {
    return <div className="h-64 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400">
      No data to visualize
    </div>;
  }

  const maxValue = Math.max(...frame.bars);
  const minValue = Math.min(...frame.bars);
  const range = maxValue - minValue || 1;

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing':
        return 'bg-amber-400';
      case 'swapping':
        return 'bg-rose-500';
      case 'sorted':
        return 'bg-emerald-400';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className="flex items-end justify-center gap-0.5 h-64 bg-slate-800 rounded-lg p-4 border border-slate-700">
      {frame.bars.map((value, idx) => {
        const heightPercent = ((value - minValue) / range) * 100;
        const state = frame.states[idx] || 'default';
        
        return (
          <div
            key={idx}
            className={`${getBarColor(state)} transition-all duration-75 rounded-t flex-1 min-w-0`}
            style={{
              height: `${Math.max(heightPercent, 5)}%`,
            }}
          />
        );
      })}
    </div>
  );
}
