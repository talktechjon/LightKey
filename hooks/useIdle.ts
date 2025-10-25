import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A custom React hook to detect when the user is idle.
 * @param timeout The duration in milliseconds after which the user is considered idle.
 * @param isEnabled A boolean to enable or disable the idle detection.
 * @returns A boolean `isIdle` state.
 */
export const useIdle = (timeout: number, isEnabled: boolean): boolean => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<number | null>(null);

  // The core function to reset the idle timer.
  // It clears any existing timer and sets a new one.
  // It also sets the `isIdle` state to false, as any activity resets the idle status.
  const resetTimer = useCallback(() => {
    // If the feature is globally disabled, ensure state is false and no timers are running.
    if (!isEnabled) {
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Mark as active and reset the timer.
    setIsIdle(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timeout to mark the user as idle.
    timerRef.current = window.setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  }, [timeout, isEnabled]);

  // Effect to manage event listeners based on the `isEnabled` flag.
  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    if (isEnabled) {
      // If enabled, attach event listeners that reset the timer on user activity.
      events.forEach(event => window.addEventListener(event, resetTimer, { passive: true }));
      resetTimer(); // Initial call to start the timer.
    } else {
      // If disabled, clean up all listeners and timers, and reset state.
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsIdle(false);
    }

    // Cleanup function to remove listeners when the component unmounts or dependencies change.
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer, isEnabled]);

  return isIdle;
};
