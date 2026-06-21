'use client';

import React from 'react';

export interface HistoryEntry {
  id: string;
  algorithm: string;
  arraySize: number;
  comparisons: number;
  swaps: number;
  timestamp: number;
}

interface HistoryPanelProps {
  history: HistoryEntry[];
  onLoadRun: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

export default function HistoryPanel({
  history,
  onLoadRun,
  onClearHistory,
}: HistoryPanelProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">Run History</h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            No runs yet. Complete a sort to save it here.
          </p>
        ) : (
          history.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onLoadRun(entry)}
              className="w-full text-left p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors border border-slate-600/50 hover:border-violet-500/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-100 text-sm">{entry.algorithm}</span>
                <span className="text-xs text-slate-400">{formatDate(entry.timestamp)}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-slate-400">
                  Size: <span className="text-slate-200">{entry.arraySize}</span>
                </div>
                <div className="text-amber-400/70">
                  Comps: <span className="text-amber-300">{entry.comparisons}</span>
                </div>
                <div className="text-rose-400/70">
                  Swaps: <span className="text-rose-300">{entry.swaps}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
