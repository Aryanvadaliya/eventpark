import { useEffect, useState } from "react";

export const useDebounce = (
  value: string,
  delay: number | undefined
) => {
  const [debounceValue, setDebounceValue] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
};
