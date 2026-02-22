import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const condition = false;
    expect(cn('foo', condition && 'bar', 'baz')).toBe('foo baz');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('should handle objects with conditional classes', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('should handle mixed inputs', () => {
    expect(cn('foo', ['bar', { baz: true, qux: false }], null, undefined)).toBe('foo bar baz');
  });

  it('should merge Tailwind classes correctly', () => {
    // Tailwind-merge should handle conflicting classes
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
  });

  it('should handle undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('should handle number values (converted to strings)', () => {
    expect(cn('foo', 1, 'bar')).toBe('foo 1 bar');
  });

  it('should handle duplicate classes', () => {
    expect(cn('foo', 'foo', 'bar')).toBe('foo foo bar');
  });

  it('should preserve order of non-conflicting classes', () => {
    expect(cn('flex', 'items-center', 'justify-center')).toBe('flex items-center justify-center');
  });

  it('should handle deeply nested conditional logic', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base-class', isActive && 'active', isDisabled && 'disabled')).toBe('base-class active');
  });

  it('should work with complex Tailwind utility combinations', () => {
    expect(cn('bg-white', 'dark:bg-gray-900', 'text-gray-900', 'dark:text-gray-100'))
      .toBe('bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100');
  });

  it('should handle spacing conflicts correctly', () => {
    expect(cn('mt-4', 'mt-2')).toBe('mt-2');
    expect(cn('mb-4', 'mb-8')).toBe('mb-8');
    expect(cn('mx-4', 'mx-2')).toBe('mx-2');
  });

  it('should handle color conflicts correctly', () => {
    expect(cn('bg-blue-500', 'bg-red-500')).toBe('bg-red-500');
    expect(cn('text-white', 'text-gray-900')).toBe('text-gray-900');
  });

  it('should handle responsive variants', () => {
    expect(cn('p-4', 'md:p-6', 'lg:p-8')).toBe('p-4 md:p-6 lg:p-8');
  });
});
