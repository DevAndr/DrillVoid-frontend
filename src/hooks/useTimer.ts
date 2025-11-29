import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const useTimer = (callback?: () => void) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const savedCallback = useRef(null);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const startTimer = useCallback((delayMs: number = 0) => {
    clearTimeout(timerRef.current);
    setIsTimerRunning(true);
    timerRef.current = setTimeout(() => {
      setIsTimerRunning(false);
      savedCallback.current && savedCallback.current();
    }, delayMs);
  }, []);

  const stopTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsTimerRunning(false);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return { isTimerRunning, startTimer, stopTimer };
};
