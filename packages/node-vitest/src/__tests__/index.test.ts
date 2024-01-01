import { describe, expect, it } from 'vitest';

import { a, b } from '..';

describe('node index', () => {
  it('should be end with 123', () => {
    expect(a.endsWith('123')).toBeTruthy();
  });

  it('should be 2', () => {
    expect(b).toBe(2);
  });
});
