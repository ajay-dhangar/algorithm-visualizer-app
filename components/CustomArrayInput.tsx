'use client';

import { useState } from 'react';
import { parseCustomArray } from '@/lib/algorithms';
import { useTheme } from '@/context/ThemeContext';

interface CustomArrayInputProps {
  onArraySubmit: (array: number[]) => void;
  onGenerateRandom: () => void;
  onGenerateReverse: () => void;
  onGenerateNearlySorted: () => void;
  onGenerateDuplicates: () => void;
  maxSize?: number;
}

export default function CustomArrayInput({
  onArraySubmit,
  onGenerateRandom,
  onGenerateReverse,
  onGenerateNearlySorted,
  onGenerateDuplicates,
  maxSize = 200,
}: CustomArrayInputProps) {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = () => {
    const array = parseCustomArray(input);
    if (!array) {
      setError(`Invalid input. Please enter numbers separated by commas or spaces (max ${maxSize})`);
      return;
    }
    if (array.length > maxSize) {
      setError(`Array too large. Maximum ${maxSize} elements allowed`);
      return;
    }
    setError('');
    onArraySubmit(array);
    setInput('');
    setShowInput(false);
  };

  const templateButtons = [
    { label: 'Random', onClick: onGenerateRandom, color: 'blue' },
    { label: 'Reverse', onClick: onGenerateReverse, color: 'purple' },
    { label: 'Nearly Sorted', onClick: onGenerateNearlySorted, color: 'green' },
    { label: 'Duplicates', onClick: onGenerateDuplicates, color: 'orange' },
  ];

  return (
    <div className={`panel ${theme} space-y-3`}>
      <h3 className={`label-primary ${theme}`}>Data Generation</h3>

      <div className="grid grid-cols-2 gap-2">
        {templateButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowInput(!showInput)}
        className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
          theme === 'dark'
            ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
        }`}
      >
        {showInput ? 'Hide Custom Input' : 'Custom Array'}
      </button>

      {showInput && (
        <div className="space-y-2 pt-2 border-t border-slate-600 dark:border-gray-200">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
            placeholder="Enter numbers separated by commas or spaces (e.g., 5, 2, 8, 1, 9)"
            className={`w-full p-2 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 border border-slate-600 text-slate-100 focus:ring-blue-500'
                : 'bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-400'
            }`}
            rows={3}
          />
          {error && <div className="text-xs text-red-500">{error}</div>}
          <button
            onClick={handleSubmit}
            className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Submit Array
          </button>
        </div>
      )}
    </div>
  );
}
