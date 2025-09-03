import {useState, useEffect} from 'react';

/**
 * useDebounce hook
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds.
 * @returns Debounced value.
 */
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Clear timeout on value or delay change
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
