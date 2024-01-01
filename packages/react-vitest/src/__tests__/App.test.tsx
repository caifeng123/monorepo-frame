import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('App render', () => {
  render(<App />);
  it('should render two button', () => {
    expect(screen.getByText('+2:0')).not.toBeNull();
    expect(screen.getByText('-2:0')).toBeTruthy();
  });
  it('should change after click', () => {
    fireEvent.click(screen.getByText('+2:0'));
    fireEvent.click(screen.getByText('-2:0'));
    expect(screen.getByText('+2:2')).toBeTruthy();
    expect(screen.getByText('-2:-2')).toBeTruthy();
  });
});
