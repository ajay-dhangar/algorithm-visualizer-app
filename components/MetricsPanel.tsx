'use client';

import React from 'react';

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
  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const progress = totalFrames > 0 ? (currentFrame / (totalFrames - 1)) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>Progress</span>
          <span>{currentFrame} / {totalFrames}</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">Comparisons</div>
          <div className="text-2xl font-bold text-amber-400">{comparisons}</div>
        </div>
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">Swaps</div>
          <div className="text-2xl font-bold text-rose-500">{swaps}</div>
        </div>
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">Time</div>
          <div className="text-2xl font-bold text-emerald-400">{formatTime(elapsedTime)}</div>
        </div>
      </div>

      {/* Operation Legend */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 space-y-2">
        <div className="text-sm font-medium text-slate-300 mb-3">Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-600" />
          <span className="text-sm text-slate-400">Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-400" />
          <span className="text-sm text-slate-400">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-rose-500" />
          <span className="text-sm text-slate-400">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-400" />
          <span className="text-sm text-slate-400">Sorted</span>
        </div>
      </div>
    </div>
  );
}
