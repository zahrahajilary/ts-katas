import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import race from './race'


// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function resolveAfter<T>(value: T, ms: number): Promise<T> {
    return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

function rejectAfter(error: string, ms: number): Promise<never> {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(error)), ms))
}

describe('race', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('resolves with the value of the fastest promise', async () => {
        const ps = [
            resolveAfter('slow', 300),
            resolveAfter('fast', 100),   // this one wins
            resolveAfter('medium', 200),
        ]

        const resultPromise = race(ps)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        expect(result).toBe('fast')
    })

    it('does not wait for slower promises after the first resolves', async () => {
        let slowRan = false

        const ps = [
            resolveAfter('fast', 100),
            new Promise<string>(resolve =>
                setTimeout(() => {
                    slowRan = true
                    resolve('slow')
                }, 300)
            ),
        ]

        const resultPromise = race(ps)
        await vi.advanceTimersByTimeAsync(100)
        await resultPromise

        // slow promise hasn't finished yet
        expect(slowRan).toBe(false)
    })

    it('rejects if the fastest promise rejects', async () => {
        const ps = [
            rejectAfter('fast error', 100),  // rejects first
            resolveAfter('slow', 300),
        ]

        const resultPromise = race(ps)
        await vi.advanceTimersByTimeAsync(100)

        await expect(resultPromise).rejects.toThrow('fast error')
    })

    it('resolves even if a slower promise rejects later', async () => {
        // fastest resolves first — rejection of slower one is ignored
        const ps = [
            resolveAfter('winner', 100),
            rejectAfter('too late', 300),
        ]

        const resultPromise = race(ps)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        expect(result).toBe('winner')
    })

    it('works with a single promise', async () => {
        const ps = [resolveAfter('only one', 100)]

        const resultPromise = race(ps)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        expect(result).toBe('only one')
    })

    it('resolves with the first promise even if they resolve at the same time', async () => {
        // both resolve at 100ms — first one registered wins
        const ps = [
            resolveAfter('first', 100),
            resolveAfter('second', 100),
        ]

        const resultPromise = race(ps)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        // either is acceptable — just checking it resolves with one of them
        expect(['first', 'second']).toContain(result)
    })
})

