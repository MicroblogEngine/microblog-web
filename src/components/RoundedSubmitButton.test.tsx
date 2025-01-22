import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoundedSubmitButton from './RoundedSubmitButton';

describe('RoundedSubmitButton', () => {
  it('renders with the provided label', () => {
    render(<RoundedSubmitButton label="Submit" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveValue('Submit');
  });

  it('applies disabled styling when disabled prop is true', () => {
    render(<RoundedSubmitButton label="Submit" disabled={true} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gray-300');
    expect(button.className).not.toContain('bg-gray-600');
  });

  it('applies enabled styling when disabled prop is false', () => {
    render(<RoundedSubmitButton label="Submit" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gray-600');
    expect(button.className).not.toContain('bg-gray-300');
  });

  it('has correct base classes regardless of disabled state', () => {
    render(<RoundedSubmitButton label="Submit" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('flex');
    expect(button.className).toContain('justify-center');
    expect(button.className).toContain('rounded-lg');
    expect(button.className).toContain('text-white');
  });
}); 