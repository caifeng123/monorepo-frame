import { useCallback, useState } from 'react';

export type CounterProps = {
  init?: number
  cb?: (val: number) => number
};

export const useCounter = ({ init = 0, cb = (val: number) => val }: CounterProps) => {
  const [value, setValue] = useState(init);

  const change = useCallback((val: number) => {
    setValue(cb(val));
  }, []);

  return [value, change] as const;
};
