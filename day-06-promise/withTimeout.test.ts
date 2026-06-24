import {describe, it, vi,expect,beforeEach,afterEach } from "vitest";
import withTimeout from "./withTimeout";

describe('withTimeout', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('resolves with the value if promise finishes before timeout', async () => {
        // A promise that resolves after 500ms
        const fastPromise = new Promise<string>(resolve =>
            setTimeout(() => resolve('done'), 500)
        )

        const resultPromise = withTimeout(fastPromise, 2000)

        // Advance 500ms — fast promise resolves, timer hasn't fired yet
        await vi.advanceTimersByTimeAsync(500)

        const result = await resultPromise
        expect(result).toBe('done')
    })

    it('rejects with a timeout error if promise takes too long', async () => {
        // A promise that resolves after 5000ms — too slow
        const slowPromise = new Promise<string>(resolve =>
            setTimeout(() => resolve('too late'), 5000)
        )

        const resultPromise = withTimeout(slowPromise, 1000)

        // Advance 1000ms — timeout fires first
        await vi.advanceTimersByTimeAsync(1000)

        // We expect it to reject — use rejects.toThrow to test this
        await expect(resultPromise).rejects.toThrow('Timeout')
    })

    it('rejects if the original promise rejects', async () => {
        // A promise that rejects with an error
        const failingPromise = new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error('Network error')), 300)
        )

        const resultPromise = withTimeout(failingPromise, 2000)

        await vi.advanceTimersByTimeAsync(300)

        await expect(resultPromise).rejects.toThrow('Network error')
    })

    it('resolves exactly at the timeout boundary', async () => {
        // Edge case: promise resolves at exactly the same ms as timeout
        // In practice the promise wins because it was registered first
        const promise = new Promise<string>(resolve =>
            setTimeout(() => resolve('just in time'), 1000)
        )

        const resultPromise = withTimeout(promise, 1000)
        await vi.advanceTimersByTimeAsync(1000)

        // This is an edge case — either outcome is acceptable
        // but good to know your implementation's behaviour
        const result = await resultPromise.catch(e => e.message)
        expect(['just in time', 'Timeout']).toContain(result)
    })
})