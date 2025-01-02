import { useEffect, useState } from 'react';

type Props<T> = {
  value: T;
  delay: number;
  callback?: () => void;
}

export const useDebounce = <T>({ value, delay, callback }: Props<T>) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback?.();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);

  return debouncedValue;
};
