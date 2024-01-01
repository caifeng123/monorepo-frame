import { act, renderHook } from '@testing-library/react';
import {
  describe, expect, it, test
} from 'vitest';

import { useCounter } from '../useCounter';

describe('useCounter', () => {
  test('init value', () => {
    const { result } = renderHook(() => useCounter({
      init: 9
    }));
    expect(result.current[0]).toBe(9);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter({
      cb: (val) => val + 2
    }));
    act(() => {
      const [value, change] = result.current;
      change(value);
    });
    act(() => {
      const [value, change] = result.current;
      change(value);
    });
    expect(result.current[0]).toBe(4);
  });
});
