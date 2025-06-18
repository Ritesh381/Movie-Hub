import { useState, useEffect } from 'react';

export const useLoadingProgress = (isLoading) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);

      // Simulate realistic loading progress
      const intervals = [
        { time: 100, progress: 15 },
        { time: 300, progress: 35 },
        { time: 600, progress: 55 },
        { time: 900, progress: 75 },
        { time: 1200, progress: 90 },
      ];

      const timers = intervals.map(({ time, progress: targetProgress }) =>
        setTimeout(() => {
          setProgress(prev => Math.max(prev, targetProgress));
        }, time)
      );

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } else {
      // Complete the loading
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  return progress;
};

export default useLoadingProgress; 