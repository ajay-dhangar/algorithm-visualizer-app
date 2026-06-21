'use client';

import { useState, useEffect, useCallback } from 'react';
import ControlPanel from '@/components/ControlPanel';
import VisualizationCanvas from '@/components/VisualizationCanvas';
import MetricsPanel from '@/components/MetricsPanel';
import HistoryPanel, { HistoryEntry } from '@/components/HistoryPanel';
import ComplexityAnalyzer from '@/components/ComplexityAnalyzer';
import CodeSnippet from '@/components/CodeSnippet';
import CustomArrayInput from '@/components/CustomArrayInput';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { useAnimationEngine } from '@/hooks/useAnimationEngine';
import {
  generateRandomArray,
  generateReverseArray,
  generateNearlySortedArray,
  generateDuplicatesArray,
  getFrameGeneratorByAlgorithm,
} from '@/lib/algorithms';

const STORAGE_KEY = 'algorithm_visualizer';

function PageContentInner() {
  const { theme } = useTheme();
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [array, setArray] = useState<number[]>([]);
  const [frames, setFrames] = useState([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showEducation, setShowEducation] = useState(false);

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

    const frameGenerator = getFrameGeneratorByAlgorithm(algorithm);
    const newFrames = frameGenerator(array);

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
    <main className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'} p-4 sm:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-50' : 'text-gray-900'}`}>
              Algorithm Visualizer
            </h1>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
              Visualize sorting algorithms and understand their complexity
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowEducation(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              !showEducation
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Visualizer
          </button>
          <button
            onClick={() => setShowEducation(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              showEducation
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Learn
          </button>
        </div>

        {!showEducation ? (
          <>
            {/* Main Grid - Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left: Controls & Canvas */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visualization */}
                <div>
                  <h2 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
                    Visualization
                  </h2>
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

                {/* Custom Array Input */}
                <CustomArrayInput
                  onArraySubmit={setArray}
                  onGenerateRandom={() => setArray(generateRandomArray(arraySize))}
                  onGenerateReverse={() => setArray(generateReverseArray(arraySize))}
                  onGenerateNearlySorted={() => setArray(generateNearlySortedArray(arraySize))}
                  onGenerateDuplicates={() => setArray(generateDuplicatesArray(arraySize))}
                  maxSize={200}
                />
              </div>

              {/* Right: Metrics & History */}
              <div className="space-y-6">
                <div>
                  <h2 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
                    Metrics
                  </h2>
                  <MetricsPanel
                    comparisons={engine.metrics.comparisons}
                    swaps={engine.metrics.swaps}
                    elapsedTime={engine.metrics.elapsedTime}
                    currentFrame={engine.currentFrameIndex}
                    totalFrames={engine.totalFrames}
                  />
                </div>

                <div>
                  <h2 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
                    History
                  </h2>
                  <HistoryPanel
                    history={history}
                    onLoadRun={handleLoadRun}
                    onClearHistory={handleClearHistory}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Learning Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ComplexityAnalyzer algorithm={algorithm} />
                <CodeSnippet algorithm={algorithm} />
              </div>
              <div>
                <h2 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
                  Quick Access
                </h2>
                <div className="space-y-4">
                  {['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'].map(
                    (algo) => (
                      <button
                        key={algo}
                        onClick={() => {
                          setAlgorithm(algo);
                          setShowEducation(true);
                        }}
                        className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                          algorithm === algo
                            ? theme === 'dark'
                              ? 'bg-blue-600 text-white border-2 border-blue-500'
                              : 'bg-blue-500 text-white border-2 border-blue-400'
                            : theme === 'dark'
                              ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{algo}</div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function PageContent() {
  return (
    <ThemeProvider>
      <PageContentInner />
    </ThemeProvider>
  );
}
