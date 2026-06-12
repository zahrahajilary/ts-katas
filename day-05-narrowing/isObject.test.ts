import { describe, expect, it } from 'vitest';
import isObject from './isObject';

describe('isObject', () => {
    it('returns true for plain objects', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
        expect(isObject(Object.create(null))).toBe(true);
    });

    it('returns false for null', () => {
        expect(isObject(null)).toBe(false);
    });

    it('returns false for arrays', () => {
        expect(isObject([])).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
    });

    it('returns false for primitive values', () => {
        expect(isObject(undefined)).toBe(false);
        expect(isObject('hello')).toBe(false);
        expect(isObject(123)).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(Symbol('x'))).toBe(false);
        expect(isObject(10n)).toBe(false);
    });

    it('returns false for functions', () => {
        expect(
            isObject(() => {})
        ).toBe(false);

        expect(
            isObject(function test() {})
        ).toBe(false);
    });

    it('narrows the type correctly', () => {
        const value: unknown = { name: 'Alice' };

        if (isObject(value)) {
            // TypeScript now knows:
            // value: Record<string, unknown>
            expect(value.name).toBe('Alice');
        } else {
            throw new Error('Expected value to be an object');
        }
    });
});