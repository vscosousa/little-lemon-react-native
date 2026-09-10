import { useEffect, useState } from "react";

/**
 * Delays changes to a value until it has remained unchanged for a set time.
 *
 * @param value - The value to debounce.
 * @param delayMs - The quiet period in milliseconds.
 * @returns The latest value that remained unchanged for the full delay.
 */
export function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
}
