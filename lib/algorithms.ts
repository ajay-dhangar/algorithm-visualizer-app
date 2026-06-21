import { AnimationFrame } from '@/hooks/useAnimationEngine';

export interface AlgorithmComplexity {
  name: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: boolean;
  description: string;
  explanation: string;
}

export const ALGORITHM_DATA: Record<string, AlgorithmComplexity> = {
  'Bubble Sort': {
    name: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    description: 'Simple comparison-based algorithm that repeatedly steps through and swaps adjacent elements.',
    explanation: 'Bubble Sort compares adjacent elements and swaps them if they are in the wrong order. This process repeats until the array is sorted.',
  },
  'Selection Sort': {
    name: 'Selection Sort',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: false,
    description: 'Divides array into sorted and unsorted portions, repeatedly selecting the minimum.',
    explanation: 'Selection Sort finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
  },
  'Insertion Sort': {
    name: 'Insertion Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    description: 'Builds sorted array by inserting elements one at a time into their correct position.',
    explanation: 'Insertion Sort maintains a sorted portion and inserts unsorted elements into the correct position within it.',
  },
  'Merge Sort': {
    name: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    description: 'Divide-and-conquer algorithm that divides array in half and merges sorted subarrays.',
    explanation: 'Merge Sort recursively divides the array, then merges the sorted halves back together.',
  },
  'Quick Sort': {
    name: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: false,
    description: 'Efficient divide-and-conquer algorithm using partitioning around a pivot element.',
    explanation: 'Quick Sort selects a pivot and partitions the array, then recursively sorts each partition.',
  },
  'Heap Sort': {
    name: 'Heap Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    stable: false,
    description: 'Uses a heap data structure to sort by repeatedly extracting the maximum element.',
    explanation: 'Heap Sort builds a max heap and repeatedly extracts the largest element to place it at the end.',
  },
};

// Bubble Sort
export function generateBubbleSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
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

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

// Selection Sort
export function generateSelectionSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      const states = arr.map((_, idx) => {
        if (idx === j || idx === minIdx) return 'comparing';
        if (idx < i) return 'sorted';
        return 'default';
      });

      comparisons++;
      frames.push({
        bars: [...arr],
        states,
        metrics: { comparisons, swaps },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;

      const swapStates = arr.map((_, idx) => {
        if (idx === i || idx === minIdx) return 'swapping';
        if (idx < i) return 'sorted';
        return 'default';
      });

      frames.push({
        bars: [...arr],
        states: swapStates,
        metrics: { comparisons, swaps },
      });
    }
  }

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

// Insertion Sort
export function generateInsertionSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      const states = arr.map((_, idx) => {
        if (idx === j || idx === i) return 'comparing';
        if (idx < i) return 'sorted';
        return 'default';
      });

      comparisons++;
      frames.push({
        bars: [...arr],
        states,
        metrics: { comparisons, swaps },
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;

        const shiftStates = arr.map((_, idx) => {
          if (idx === j || idx === j + 1) return 'swapping';
          if (idx < i && idx !== j + 1) return 'sorted';
          return 'default';
        });

        frames.push({
          bars: [...arr],
          states: shiftStates,
          metrics: { comparisons, swaps },
        });

        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
  }

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

// Merge Sort
export function generateMergeSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  function merge(left: number, mid: number, right: number, sortedIndices: Set<number>) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      const states = arr.map((_, idx) => {
        if ((idx >= left && idx <= right) || idx === left + i || idx === mid + 1 + j) return 'comparing';
        if (sortedIndices.has(idx)) return 'sorted';
        return 'default';
      });

      comparisons++;
      frames.push({
        bars: [...arr],
        states,
        metrics: { comparisons, swaps },
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      swaps++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      swaps++;
    }

    for (let idx = left; idx <= right; idx++) {
      sortedIndices.add(idx);
    }
  }

  function mergeSort(left: number, right: number, sortedIndices: Set<number>) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(left, mid, sortedIndices);
      mergeSort(mid + 1, right, sortedIndices);
      merge(left, mid, right, sortedIndices);
    }
  }

  mergeSort(0, arr.length - 1, new Set());

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

// Quick Sort
export function generateQuickSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

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

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

// Heap Sort
export function generateHeapSortFrames(array: number[]): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'default'),
    metrics: { comparisons, swaps },
  });

  function heapify(n: number, i: number, sortedStart: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      const states = arr.map((_, idx) => {
        if (idx === i || idx === largest) return 'comparing';
        if (idx >= sortedStart) return 'sorted';
        return 'default';
      });

      comparisons++;
      frames.push({
        bars: [...arr],
        states,
        metrics: { comparisons, swaps },
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;

      const swapStates = arr.map((_, idx) => {
        if (idx === i || idx === largest) return 'swapping';
        if (idx >= sortedStart) return 'sorted';
        return 'default';
      });

      frames.push({
        bars: [...arr],
        states: swapStates,
        metrics: { comparisons, swaps },
      });

      heapify(n, largest, sortedStart);
    }
  }

  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i, n);
  }

  for (let i = n - 1; i > 0; i--) {
    const states = arr.map((_, idx) => {
      if (idx === 0 || idx === i) return 'swapping';
      if (idx >= i) return 'sorted';
      return 'default';
    });

    frames.push({
      bars: [...arr],
      states,
      metrics: { comparisons, swaps },
    });

    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    heapify(i, 0, i);
  }

  frames.push({
    bars: [...arr],
    states: arr.map(() => 'sorted'),
    metrics: { comparisons, swaps },
  });

  return frames;
}

// Utility Functions
export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

export function generateReverseArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i);
}

export function generateNearlySortedArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i + 1);
  const swaps = Math.floor(size * 0.1);
  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }
  return arr;
}

export function generateDuplicatesArray(size: number): number[] {
  const values = Array.from({ length: Math.floor(Math.sqrt(size)) }, (_, i) => i + 1);
  return Array.from({ length: size }, () => values[Math.floor(Math.random() * values.length)]);
}

export function parseCustomArray(input: string): number[] | null {
  try {
    const numbers = input
      .split(/[,\s]+/)
      .filter(s => s.trim())
      .map(s => {
        const num = parseInt(s, 10);
        if (isNaN(num)) throw new Error('Invalid number');
        return num;
      });
    
    if (numbers.length === 0 || numbers.length > 200) return null;
    return numbers;
  } catch {
    return null;
  }
}

export function getFrameGeneratorByAlgorithm(algo: string) {
  switch (algo) {
    case 'Bubble Sort':
      return generateBubbleSortFrames;
    case 'Selection Sort':
      return generateSelectionSortFrames;
    case 'Insertion Sort':
      return generateInsertionSortFrames;
    case 'Merge Sort':
      return generateMergeSortFrames;
    case 'Quick Sort':
      return generateQuickSortFrames;
    case 'Heap Sort':
      return generateHeapSortFrames;
    default:
      return generateBubbleSortFrames;
  }
}
