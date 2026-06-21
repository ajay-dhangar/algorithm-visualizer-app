'use client';

import { useState, useEffect, useCallback } from 'react';
import ControlPanel from '@/components/ControlPanel';
import VisualizationCanvas from '@/components/VisualizationCanvas';
import MetricsPanel from '@/components/MetricsPanel';
import HistoryPanel, { HistoryEntry } from '@/components/HistoryPanel';
import { useAnimationEngine } from '@/hooks/useAnimationEngine';
import { generateBubbleSortFrames, generateQuickSortFrames, generateRandomArray } from '@/lib/algorithms';

const STORAGE_KEY = 'algorithm_visualizer';

export default function Page() {
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [array, setArray] = useState<number[]>([]);
  const [frames, setFrames] = useState([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Initialize app
  useEffect(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    
    // Load preferences and history from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { history: savedHistory, arraySize: savedSize, speed: savedSpeed } = JSON.parse(saved);
        if (savedHistory) setHistory(savedHistory);
        if (savedSize) setArraySize(savedSize);
        if (savedSpeed) setSpeed(savedSpeed);
      } catch (e) {
        console.log('[v0] Error loading saved data');
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const toSave = { history, arraySize, speed };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [history, arraySize, speed]);

  // Generate frames when algorithm or array changes
  useEffect(() => {
    if (array.length === 0) return;
    
    const newFrames = algorithm === 'Bubble Sort'
      ? generateBubbleSortFrames(array)
      : generateQuickSortFrames(array);
    
    setFrames(newFrames);
  }, [array, algorithm]);

  const engine = useAnimationEngine(frames, speed);

  const handleGenerateArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
  }, [arraySize]);

  const handleAlgorithmChange = (algo: string) => {
    setAlgorithm(algo);
    engine.reset();
  };

  const handleArraySizeChange = (size: number) => {
    setArraySize(size);
    const newArray = generateRandomArray(size);
    setArray(newArray);
    engine.reset();
  };

  const handlePlayComplete = useCallback(() => {
    if (engine.isPlaying) return;
    
    if (engine.currentFrameIndex === engine.totalFrames - 1) {
      // Add to history
      const entry: HistoryEntry = {
        id: Date.now().toString(),
        algorithm,
        arraySize,
        comparisons: engine.metrics.comparisons,
        swaps: engine.metrics.swaps,
        timestamp: Date.now(),
      };
      
      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, 50);
        return updated;
      });
    }
  }, [engine, algorithm, arraySize]);

  useEffect(() => {
    if (!engine.isPlaying && engine.currentFrameIndex === engine.totalFrames - 1) {
      handlePlayComplete();
    }
  }, [engine.isPlaying, engine.currentFrameIndex, engine.totalFrames]);

  const handleLoadRun = (entry: HistoryEntry) => {
    setAlgorithm(entry.algorithm);
    setArraySize(entry.arraySize);
    engine.reset();
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <main className="min-h-screen bg-slate-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-2">
            Algorithm Visualizer
          </h1>
          <p className="text-slate-400">
            Visualize sorting algorithms in real-time and understand their complexity
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Controls & Canvas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visualization */}
            <div>
              <h2 className="text-lg font-semibold text-slate-100 mb-3">Visualization</h2>
              <VisualizationCanvas frame={engine.currentFrame} />
            </div>

            {/* Control Panel */}
            <ControlPanel
              algorithm={algorithm}
              onAlgorithmChange={handleAlgorithmChange}
              arraySize={arraySize}
              onArraySizeChange={handleArraySizeChange}
              speed={speed}
              onSpeedChange={setSpeed}
              onGenerateArray={handleGenerateArray}
              isPlaying={engine.isPlaying}
              onPlay={engine.play}
              onPause={engine.pause}
              onReset={engine.reset}
            />
          </div>

          {/* Right: Metrics & History */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-100 mb-3">Metrics</h2>
              <MetricsPanel
                comparisons={engine.metrics.comparisons}
                swaps={engine.metrics.swaps}
                elapsedTime={engine.metrics.elapsedTime}
                currentFrame={engine.currentFrameIndex}
                totalFrames={engine.totalFrames}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100 mb-3">History</h2>
              <HistoryPanel
                history={history}
                onLoadRun={handleLoadRun}
                onClearHistory={handleClearHistory}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
          <h3 className="font-semibold text-slate-100 mb-3">About</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-400">
            <div>
              <span className="text-slate-300 font-medium">Bubble Sort:</span> Simple comparison-based algorithm that repeatedly steps through the list and swaps adjacent elements if they&apos;re in the wrong order.
            </div>
            <div>
              <span className="text-slate-300 font-medium">Quick Sort:</span> Efficient divide-and-conquer algorithm that partitions the array around a pivot and recursively sorts the resulting subarrays.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
