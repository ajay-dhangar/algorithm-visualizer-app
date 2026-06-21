'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface MetricsPanelProps {
  comparisons: number;
  swaps: number;
  elapsedTime: number;
  currentFrame: number;
  totalFrames: number;
}

export default function MetricsPanel({
  comparisons,
  swaps,
  elapsedTime,
  currentFrame,
  totalFrames,
}: MetricsPanelProps) {
  const { theme } = useTheme();

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const progress = totalFrames > 0 ? (currentFrame / (totalFrames - 1)) * 100 : 0;

  const legendItems = [
    { color: theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400', label: 'Default' },
    { color: theme === 'dark' ? 'bg-amber-400' : 'bg-yellow-400', label: 'Comparing' },
    { color: theme === 'dark' ? 'bg-orange-500' : 'bg-orange-500', label: 'Swapping' },
    { color: theme === 'dark' ? 'bg-emerald-400' : 'bg-green-500', label: 'Sorted' },
  ];

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div>
        <div className={`flex justify-between text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
          <span>Progress</span>
          <span>
            {currentFrame} / {totalFrames}
          </span>
        </div>
        <div
          className={`w-full h-2 rounded-full overflow-hidden border transition-colors ${
            theme === 'dark'
              ? 'bg-slate-700 border-slate-600'
              : 'bg-gray-300 border-gray-400'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Comparisons', value: comparisons, valueColor: 'text-yellow-500' },
          { label: 'Swaps', value: swaps, valueColor: 'text-orange-500' },
          { label: 'Time', value: formatTime(elapsedTime), valueColor: 'text-green-500' },
        ].map((metric) => (
          <div
            key={metric.label}
            className={`rounded-lg border p-3 transition-colors ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}
          >
            <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              {metric.label}
            </div>
            <div className={`text-xl font-bold ${metric.valueColor}`}>{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Operation Legend */}
      <div className={`rounded-lg border p-4 space-y-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-900'}`}>
          Legend
        </div>
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
