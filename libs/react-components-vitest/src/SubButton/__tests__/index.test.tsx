import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import AddButton from '..';

describe('AddButton', () => {
  render(<AddButton />);

  test('should render correctly with default props', () => {
    expect(screen.getByText('-2:0')).not.toBeNull();
  });

  test('should increase the counter when button is clicked', () => {
    fireEvent.click(screen.getByText('-2:0'));
    expect(screen.getByText('-2:-2')).not.toBeNull();
  });
});
