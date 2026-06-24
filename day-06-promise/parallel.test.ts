import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import parallel from './parallel'


// ─────────────────────────────────────────────
// HELPER — creates a promise that resolves after ms
// We use this to simulate slow async tasks
// ─────────────────────────────────────────────
function resolveAfter<T>(value: T, ms: number): Promise<T> {
    return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

// HELPER — creates a promise that rejects after ms
function rejectAfter(error: string, ms: number): Promise<never> {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(error)), ms))
}

// ─────────────────────────────────────────────
// PARALLEL TESTS
// ─────────────────────────────────────────────
describe('parallel', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('resolves with all values when all promises resolve', async () => {
        const ps = [
            resolveAfter('a', 100),
            resolveAfter('b', 200),
            resolveAfter('c', 300),
        ]

        const resultPromise = parallel(ps)

        // advance past all of them
        await vi.advanceTimersByTimeAsync(300)

        const result = await resultPromise
        expect(result).toEqual(['a', 'b', 'c'])
    })

    it('preserves order even if promises resolve out of order', async () => {
        // ps[0] is the SLOWEST — but should still be first in results
        const ps = [
            resolveAfter('slow', 300),
            resolveAfter('medium', 200),
            resolveAfter('fast', 100),
        ]

        const resultPromise = parallel(ps)
        await vi.advanceTimersByTimeAsync(300)

        const result = await resultPromise
        // order should match INPUT order, not resolve order
        expect(result).toEqual(['slow', 'medium', 'fast'])
    })

    it('rejects immediately if any promise rejects', async () => {
        const ps = [
            resolveAfter('a', 100),
            rejectAfter('Network error', 150),
            resolveAfter('c', 300),
        ]

        const resultPromise = parallel(ps)
        await vi.advanceTimersByTimeAsync(150)

        await expect(resultPromise).rejects.toThrow('Network error')
    })

    it('resolves with empty array when given empty array', async () => {
        // Edge case — no promises at all
        // NOTE: check if your implementation handles this!
        // If it hangs, you need to add: if (ps.length === 0) resolve([])
        const resultPromise = parallel([])
        await vi.advanceTimersByTimeAsync(0)

        // If this test fails, add the empty array check to your implementation
        const result = await Promise.race([
            resultPromise,
            resolveAfter('timeout', 100)
        ])
        // either resolves with [] or hangs — this tells you which
        expect(result).toEqual([])
    })

    it('works with a single promise', async () => {
        const ps = [resolveAfter(42, 100)]
        const resultPromise = parallel(ps)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        expect(result).toEqual([42])
    })

    it('runs all promises at the same time, not one after another', async () => {
        // If truly parallel, total time should be ~300ms (the slowest)
        // If sequential, total time would be 100+200+300 = 600ms
        const ps = [
            resolveAfter('a', 100),
            resolveAfter('b', 200),
            resolveAfter('c', 300),
        ]

        const resultPromise = parallel(ps)

        // After 300ms all should be done
        await vi.advanceTimersByTimeAsync(300)
        const result = await resultPromise
        expect(result).toEqual(['a', 'b', 'c'])
    })

    it('works with number values', async () => {
        const ps = [
            resolveAfter(1, 100),
            resolveAfter(2, 100),
            resolveAfter(3, 100),
        ]

        const resultPromise = parallel(ps)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        expect(result).toEqual([1, 2, 3])
    })
})
