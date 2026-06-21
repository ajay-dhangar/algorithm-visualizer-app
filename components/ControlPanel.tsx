'use client';

import React from 'react';

interface ControlPanelProps {
  algorithm: string;
  onAlgorithmChange: (algo: string) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onGenerateArray: () => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function ControlPanel({
  algorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  onGenerateArray,
  isPlaying,
  onPlay,
  onPause,
  onReset,
}: ControlPanelProps) {
  return (
    <div className="space-y-6 bg-slate-800 rounded-lg border border-slate-700 p-6">
      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Algorithm
        </label>
        <div className="flex gap-2">
          {['Bubble Sort', 'Quick Sort'].map((algo) => (
            <button
              key={algo}
              onClick={() => onAlgorithmChange(algo)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-violet-500 ${
                algorithm === algo
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50'
                  : 'text-violet-200 hover:bg-slate-700'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      {/* Array Size */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Array Size: {arraySize}
        </label>
        <input
          type="range"
          min="5"
          max="100"
          value={arraySize}
          onChange={(e) => onArraySizeChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          disabled={isPlaying}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>5</span>
          <span>100</span>
        </div>
      </div>

      {/* Animation Speed */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Speed: {speed}%
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={onGenerateArray}
            className="flex-1 px-4 py-2 rounded-lg font-medium bg-slate-700 text-slate-100 hover:bg-slate-600 transition-colors"
            disabled={isPlaying}
          >
            Generate Array
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="flex-1 px-4 py-2 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2 rounded-lg font-medium bg-slate-700 text-slate-100 hover:bg-slate-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
