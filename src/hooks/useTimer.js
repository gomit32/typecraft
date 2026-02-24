import { useState, useRef, useCallback } from 'react';

const useTimer = (initialTime, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - (elapsedTime * 1000);

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = initialTime - elapsed;

      setElapsedTime(elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        setTimeLeft(0);
        setElapsedTime(initialTime);
        if (onComplete) onComplete();
      }
    }, 100);
  }, [initialTime, elapsedTime, onComplete]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTimeLeft(initialTime);
    setElapsedTime(0);
    startTimeRef.current = null;
  }, [initialTime]);

  return { timeLeft, isRunning, elapsedTime, start, pause, reset };
};

export default useTimer;