import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import safe from './safe'

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function resolveAfter<T>(value: T, ms: number): Promise<T> {
    return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

function rejectAfter(error: string, ms: number): Promise<never> {
    return new Promise((_, reject) =>
        setTimeout(() => reject(new Error(error)), ms)
    )
}

// ─────────────────────────────────────────────
// SAFE TESTS
// ─────────────────────────────────────────────
describe('safe', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    // ─────────────────────────────────────────
    // SUCCESS CASES
    // ─────────────────────────────────────────

    it('returns [null, value] when promise resolves', async () => {
        const p = resolveAfter('hello', 100)
        const resultPromise = safe(p)

        await vi.advanceTimersByTimeAsync(100)

        const [err, value] = await resultPromise

        expect(err).toBeNull()       // no error
        expect(value).toBe('hello')  // got the value
    })

    it('returns [null, value] with number', async () => {
        const p = resolveAfter(42, 100)
        const resultPromise = safe(p)

        await vi.advanceTimersByTimeAsync(100)

        const [err, value] = await resultPromise

        expect(err).toBeNull()
        expect(value).toBe(42)
    })

    it('returns [null, value] with object', async () => {
        const user = { id: 1, name: 'Zahra' }
        const p = resolveAfter(user, 100)
        const resultPromise = safe(p)

        await vi.advanceTimersByTimeAsync(100)

        const [err, value] = await resultPromise

        expect(err).toBeNull()
        expect(value).toEqual({ id: 1, name: 'Zahra' })
    })

    // ─────────────────────────────────────────
    // FAILURE CASES
    // ─────────────────────────────────────────

    it('returns [Error, null] when promise rejects', async () => {
        const p = rejectAfter('Network error', 100)
        const resultPromise = safe(p)

        await vi.advanceTimersByTimeAsync(100)

        const [err, value] = await resultPromise

        expect(err).toBeInstanceOf(Error)  // got an error
        expect(err?.message).toBe('Network error')
        expect(value).toBeNull()           // no value
    })

    it('returns [Error, null] with different error messages', async () => {
        const p = rejectAfter('Timeout', 100)
        const resultPromise = safe(p)

        await vi.advanceTimersByTimeAsync(100)

        const [err, value] = await resultPromise

        expect(err?.message).toBe('Timeout')
        expect(value).toBeNull()
    })

    // ─────────────────────────────────────────
    // THE KEY BEHAVIOUR — safe never throws
    // ─────────────────────────────────────────

    it('never rejects — even when the inner promise rejects', async () => {
        const p = rejectAfter('Something went wrong', 100)

        // safe() itself should NEVER throw
        // if it did, this would need a try/catch — but it shouldn't
        const resultPromise = safe(p)
        await vi.advanceTimersByTimeAsync(100)

        // this should not throw — safe always resolves
        const result = await resultPromise
        expect(result).toBeDefined()
    })

    it('always resolves — you never need try/catch around safe()', async () => {
        // this is the whole POINT of safe()
        // compare:

        // WITHOUT safe — need try/catch
        // try {
        //     const value = await rejectAfter('error', 100)
        // } catch(e) {
        //     console.log(e)
        // }

        // WITH safe — no try/catch needed
        const [err, value] = await safe(rejectAfter('error', 100)
            .finally(() => vi.advanceTimersByTimeAsync(100)))

        // just check the tuple — no try/catch anywhere
        expect(err).toBeInstanceOf(Error)
        expect(value).toBeNull()
    })

    // ─────────────────────────────────────────
    // REAL WORLD USE CASE
    // ─────────────────────────────────────────

    it('real world — handling API calls without try/catch', async () => {
        // simulates a fetch call
        async function fetchUser(id: number): Promise<{ id: number; name: string }> {
            if (id === 0) throw new Error('User not found')
            return resolveAfter({ id, name: 'Zahra' }, 100)
        }

        // SUCCESS case
        const [err1, user] = await safe(fetchUser(1)
            .finally(() => vi.advanceTimersByTimeAsync(100)))
        expect(err1).toBeNull()
        expect(user?.name).toBe('Zahra')

        // FAILURE case — no try/catch needed
        const [err2, noUser] = await safe(
            Promise.reject(new Error('User not found'))
        )
        expect(err2?.message).toBe('User not found')
        expect(noUser).toBeNull()
    })

    // ─────────────────────────────────────────
    // TUPLE SHAPE
    // ─────────────────────────────────────────

    it('success tuple is always [null, value] — error is first, value is second', async () => {
        const p = resolveAfter('test', 100)
        const resultPromise = safe(p)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise

        // result[0] is always the error slot
        // result[1] is always the value slot
        expect(result[0]).toBeNull()    // error slot → null on success
        expect(result[1]).toBe('test')  // value slot → value on success
    })

    it('failure tuple is always [Error, null] — error is first, value is second', async () => {
        const p = rejectAfter('fail', 100)
        const resultPromise = safe(p)
        await vi.advanceTimersByTimeAsync(100)

        const result = await resultPromise

        expect(result[0]).toBeInstanceOf(Error) // error slot → Error on failure
        expect(result[1]).toBeNull()            // value slot → null on failure
    })
})
