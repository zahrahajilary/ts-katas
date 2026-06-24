import {describe, expect,vi,beforeEach,afterEach,it} from "vitest";
import sequential from "./sequential";
import parallel from "./parallel";
function resolveAfter<T>(value: T, ms: number): Promise<T> {
    return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

// HELPER — creates a promise that rejects after ms
function rejectAfter(error: string, ms: number): Promise<never> {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(error)), ms))
}

describe('sequential', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('resolves with all values in order', async () => {
        // tasks is an array of FUNCTIONS that return promises
        const tasks = [
            () => resolveAfter('first', 100),
            () => resolveAfter('second', 100),
            () => resolveAfter('third', 100),
        ]

        const resultPromise = sequential(tasks)

        // sequential = 100 + 100 + 100 = 300ms total
        await vi.advanceTimersByTimeAsync(300)

        const result = await resultPromise
        expect(result).toEqual(['first', 'second', 'third'])
    })

    it('runs tasks ONE AFTER ANOTHER, not at the same time', async () => {
        const order: string[] = []

        const tasks = [
            async () => {
                await resolveAfter(null, 100)
                order.push('first')
                return 'first'
            },
            async () => {
                await resolveAfter(null, 100)
                order.push('second')
                return 'second'
            },
            async () => {
                await resolveAfter(null, 100)
                order.push('third')
                return 'third'
            },
        ]

        const resultPromise = sequential(tasks)
        await vi.advanceTimersByTimeAsync(300)
        await resultPromise

        // should always be in order — never 'second' before 'first'
        expect(order).toEqual(['first', 'second', 'third'])
    })

    it('does not start next task until previous one finishes', async () => {
        let secondStarted = false

        const tasks = [
            () => resolveAfter('first', 200),
            () => {
                secondStarted = true
                return resolveAfter('second', 100)
            },
        ]

        const resultPromise = sequential(tasks)

        // After 100ms — first task is still running
        await vi.advanceTimersByTimeAsync(100)
        expect(secondStarted).toBe(false) // second hasn't started yet

        // After 200ms — first task done, second starts
        await vi.advanceTimersByTimeAsync(100)
        expect(secondStarted).toBe(true)

        await vi.advanceTimersByTimeAsync(100)
        await resultPromise
    })

    it('rejects if any task rejects', async () => {
        const tasks = [
            () => resolveAfter('first', 100),
            () => rejectAfter('Task failed', 100),
            () => resolveAfter('third', 100),
        ]

        const resultPromise = sequential(tasks)
        await vi.advanceTimersByTimeAsync(200)

        await expect(resultPromise).rejects.toThrow('Task failed')
    })

    it('resolves with empty array when given empty array', async () => {
        const result = await sequential([])
        expect(result).toEqual([])
    })

    it('works with a single task', async () => {
        const tasks = [() => resolveAfter(42, 100)]
        const resultPromise = sequential(tasks)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise
        expect(result).toEqual([42])
    })

    it('takes longer than parallel for same tasks', async () => {
        // This test demonstrates WHY sequential exists vs parallel
        // 3 tasks of 100ms each:
        // parallel  → ~100ms total (all at once)
        // sequential → ~300ms total (one after another)

        let sequentialDone = false
        let parallelDone = false

        const tasks = [
            () => resolveAfter('a', 100),
            () => resolveAfter('b', 100),
            () => resolveAfter('c', 100),
        ]

        // parallel versions (promises start immediately)
        const parallelPromises = [
            resolveAfter('a', 100),
            resolveAfter('b', 100),
            resolveAfter('c', 100),
        ]

        sequential(tasks).then(() => { sequentialDone = true })
        parallel(parallelPromises).then(() => { parallelDone = true })

        // After 100ms — parallel is done, sequential is not
        await vi.advanceTimersByTimeAsync(100)
        expect(parallelDone).toBe(true)
        expect(sequentialDone).toBe(false)

        // After 300ms — sequential is finally done
        await vi.advanceTimersByTimeAsync(200)
        expect(sequentialDone).toBe(true)
    })
})