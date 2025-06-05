// src/app/api/categories/route.test.ts
import { cn, formatCurrency } from '../utils';

describe('cn', () => {
  it('should return an empty string when no arguments are provided', () => {
    expect(cn()).toBe('');
  });

  it('should combine multiple string arguments', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
  });

  it('should handle mixed arguments', () => {
    expect(cn('foo', null, 'bar', undefined, { baz: true, qux: false })).toBe('foo bar baz');
  });

  it('should merge tailwind classes correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2'); // twMerge should handle this
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});

describe('formatCurrency', () => {
  it('should format a positive number correctly as IDR', () => {
    // Note: The exact output might vary slightly based on Intl implementation details
    // It's common to see "Rp" or "IDR" and non-breaking spaces.
    // This test assumes "Rp" and a non-breaking space. Adjust if your environment differs.
    const formatted = formatCurrency(12345.67);
    // Check for the presence of "Rp" and the formatted number.
    // Using a regex to be more flexible with spacing and currency symbol variations.
    expect(formatted).toMatch(/Rp\s*12.345,67/);
  });

  it('should format zero correctly', () => {
    const formatted = formatCurrency(0);
    expect(formatted).toMatch(/Rp\s*0,00/);
  });

  it('should format a large number correctly', () => {
    const formatted = formatCurrency(1000000);
    expect(formatted).toMatch(/Rp\s*1.000.000,00/);
  });

  it('should format numbers without decimal parts correctly', () => {
    const formatted = formatCurrency(50000);
    expect(formatted).toMatch(/Rp\s*50.000,00/);
  });
});