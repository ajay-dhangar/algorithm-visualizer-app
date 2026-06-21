'use client';

import { ALGORITHM_DATA } from '@/lib/algorithms';
import { useTheme } from '@/context/ThemeContext';

interface ComplexityAnalyzerProps {
  algorithm: string;
}

export default function ComplexityAnalyzer({ algorithm }: ComplexityAnalyzerProps) {
  const { theme } = useTheme();
  const data = ALGORITHM_DATA[algorithm];

  if (!data) return null;

  const complexityItems = [
    { label: 'Best Case', value: data.best, color: 'text-green-600 dark:text-green-400' },
    { label: 'Average Case', value: data.average, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Worst Case', value: data.worst, color: 'text-red-600 dark:text-red-400' },
    { label: 'Space', value: data.space, color: 'text-blue-600 dark:text-blue-400' },
  ];

  return (
    <div
      className={`panel ${theme} space-y-4`}
    >
      <div>
        <h3 className={`label-primary ${theme} mb-2`}>Time & Space Complexity</h3>
        <p className={`label-secondary ${theme} mb-4`}>{data.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {complexityItems.map((item) => (
          <div
            key={item.label}
            className={`p-3 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-slate-700/50 border-slate-600'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className={`label-secondary ${theme}`}>{item.label}</div>
            <div className={`font-mono font-bold text-sm ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-600 dark:border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className={`label-secondary ${theme}`}>Stable:</span>
          <span className={`font-semibold ${data.stable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {data.stable ? 'Yes' : 'No'}
          </span>
        </div>
        <p className={`label-secondary ${theme} text-xs leading-relaxed`}>
          {data.explanation}
        </p>
      </div>
    </div>
  );
}
