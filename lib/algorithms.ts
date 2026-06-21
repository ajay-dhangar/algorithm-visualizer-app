import { AnimationFrame } from '@/hooks/useAnimationEngine';

export function generateBubbleSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  // Initial frame
  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison frame
      const states = arr.map((_, idx) => {
        if (idx === j || idx === j + 1) return 'comparing';
        if (idx >= n - i) return 'sorted';
        return 'default';
      });

      comparisons++;
      frames.push({
        bars: [...arr],
        states,
        metrics: { comparisons, swaps },
      });

      // Swap if needed
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;

        const swapStates = arr.map((_, idx) => {
          if (idx === j || idx === j + 1) return 'swapping';
          if (idx >= n - i) return 'sorted';
          return 'default';
        });

        frames.push({
          bars: [...arr],
          states: swapStates,
          metrics: { comparisons, swaps },
        });
      }
    }
  }

  // Final sorted frame
  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

export function generateQuickSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  // Initial frame
  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      const states = arr.map((_, idx) => {
        if (idx === j || idx === high) return 'comparing';
        if (idx <= i) return 'sorted';
        return 'default';
      });

      comparisons++;
      frames.push({
        bars: [...arr],
        states,
        metrics: { comparisons, swaps },
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;

        const swapStates = arr.map((_, idx) => {
          if (idx === i || idx === j) return 'swapping';
          if (idx <= i) return 'sorted';
          return 'default';
        });

        frames.push({
          bars: [...arr],
          states: swapStates,
          metrics: { comparisons, swaps },
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;

    const finalStates = arr.map((_, idx) => (idx === i + 1 ? 'sorted' : 'default'));
    frames.push({
      bars: [...arr],
      states: finalStates,
      metrics: { comparisons, swaps },
    });

    return i + 1;
  }

  function quickSort(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, arr.length - 1);

  // Final sorted frame
  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}
