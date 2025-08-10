import { useEffect, useState } from 'react';

/**
 * A hook that provides a debounced value alongside the current value
 * @template T
 * @param {T} initialValue - The initial value
 * @param {number} delay - The delay in milliseconds (default: 500)
 * @returns {[T, (value: T) => void, T]} - [value, setValue, debouncedValue]
 */
export function useDebouncedState<T>(initialValue: T, delay = 500) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue] as const;
}
