'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ALGORITHMS = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'];

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
  const { theme } = useTheme();

  return (
    <div className={`panel ${theme} space-y-6`}>
      {/* Algorithm Selection */}
      <div>
        <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>
          Sorting Algorithm
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo}
              onClick={() => onAlgorithmChange(algo)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 border ${
                algorithm === algo
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                    : 'bg-blue-500 text-white border-blue-400 shadow-md'
                  : theme === 'dark'
                    ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      {/* Array Size */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>
          Array Size: <span className="font-bold">{arraySize}</span>
        </label>
        <input
          type="range"
          min="5"
          max="200"
          value={arraySize}
          onChange={(e) => onArraySizeChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
          disabled={isPlaying}
          style={{
            background:
              theme === 'dark'
                ? `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(arraySize / 200) * 100}%, rgb(51, 65, 85) ${(arraySize / 200) * 100}%, rgb(51, 65, 85) 100%)`
                : `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(arraySize / 200) * 100}%, rgb(229, 231, 235) ${(arraySize / 200) * 100}%, rgb(229, 231, 235) 100%)`,
          }}
        />
        <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
          <span>5 elements</span>
          <span>200 elements</span>
        </div>
      </div>

      {/* Animation Speed */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>
          Speed: <span className="font-bold">{speed}%</span>
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
          style={{
            background:
              theme === 'dark'
                ? `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${speed}%, rgb(51, 65, 85) ${speed}%, rgb(51, 65, 85) 100%)`
                : `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${speed}%, rgb(229, 231, 235) ${speed}%, rgb(229, 231, 235) 100%)`,
          }}
        />
        <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="space-y-3 pt-2 border-t border-slate-600 dark:border-gray-200">
        <button
          onClick={onGenerateArray}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
            isPlaying
              ? theme === 'dark'
                ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400'
                : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-600'
              : theme === 'dark'
                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
          disabled={isPlaying}
        >
          New Array
        </button>
        <div className="flex gap-2">
          <button
            onClick={isPlaying ? onPause : onPlay}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-white ${
              theme === 'dark'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={onReset}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
