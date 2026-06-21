'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface AnimationFrame {
  bars: number[];
  states: string[]; // 'default', 'comparing', 'swapping', 'sorted'
  metrics: {
    comparisons: number;
    swaps: number;
  };
}

interface AnimationMetrics {
  comparisons: number;
  swaps: number;
  elapsedTime: number;
}

export function useAnimationEngine(
  frames: AnimationFrame[],
  speed: number = 50
) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [metrics, setMetrics] = useState<AnimationMetrics>({
    comparisons: 0,
    swaps: 0,
    elapsedTime: 0,
  });

  const frameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const currentFrame = frames[currentFrameIndex] || frames[0];

  const play = useCallback(() => {
    if (currentFrameIndex >= frames.length - 1) {
      setCurrentFrameIndex(0);
    }
    setIsPlaying(true);
    startTimeRef.current = Date.now() - elapsedRef.current;
  }, [currentFrameIndex, frames.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
    setMetrics({ comparisons: 0, swaps: 0, elapsedTime: 0 });
    elapsedRef.current = 0;
  }, []);

  const goToFrame = useCallback((index: number) => {
    setCurrentFrameIndex(Math.min(index, frames.length - 1));
    setMetrics({
      comparisons: frames[Math.min(index, frames.length - 1)]?.metrics.comparisons || 0,
      swaps: frames[Math.min(index, frames.length - 1)]?.metrics.swaps || 0,
      elapsedTime: (index / Math.max(frames.length - 1, 1)) * ((101 - speed) * 10),
    });
  }, [frames, speed]);

  useEffect(() => {
    if (!isPlaying) return;

    frameIntervalRef.current = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        const next = prev + 1;
        if (next >= frames.length) {
          setIsPlaying(false);
          return prev;
        }
        return next;
      });

      elapsedRef.current = Date.now() - startTimeRef.current;
      setMetrics((prev) => ({
        ...prev,
        elapsedTime: elapsedRef.current,
      }));
    }, Math.max(10, 101 - speed));

    return () => {
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    };
  }, [isPlaying, frames.length, speed]);

  useEffect(() => {
    if (currentFrameIndex < frames.length) {
      setMetrics({
        comparisons: frames[currentFrameIndex].metrics.comparisons,
        swaps: frames[currentFrameIndex].metrics.swaps,
        elapsedTime: metrics.elapsedTime,
      });
    }
  }, [currentFrameIndex]);

  return {
    currentFrame,
    currentFrameIndex,
    isPlaying,
    metrics,
    play,
    pause,
    reset,
    goToFrame,
    totalFrames: frames.length,
  };
}
