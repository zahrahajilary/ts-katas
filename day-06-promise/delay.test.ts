
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import delay from './delay'

// ─────────────────────────────────────────────
// HOW VITEST HANDLES TIME
// ─────────────────────────────────────────────
// vi.useFakeTimers() → replaces setTimeout with a fake version
// vi.advanceTimersByTimeAsync(ms) → fast-forwards fake time by ms
// This means your tests don't actually wait 1000ms — they run instantly
// ─────────────────────────────────────────────

describe('delay', () => {
    // Before each test: switch to fake timers
    beforeEach(() => {
        vi.useFakeTimers()
    })

    // After each test: restore real timers
    afterEach(() => {
        vi.useRealTimers()
    })

    it('resolves with the value after the given delay', async () => {
        // Start the delay promise (doesn't resolve yet — time is frozen)
        const promise = delay('hello', 1000)

        // Fast-forward fake time by 1000ms
        await vi.advanceTimersByTimeAsync(1000)

        // Now the promise should have resolved
        const result = await promise
        expect(result).toBe('hello')
    })

    it('works with number values', async () => {
        const promise = delay(42, 500)
        await vi.advanceTimersByTimeAsync(500)
        const result = await promise
        expect(result).toBe(42)
    })

    it('works with object values', async () => {
        const obj = { name: 'Zahra' }
        const promise = delay(obj, 200)
        await vi.advanceTimersByTimeAsync(200)
        const result = await promise
        expect(result).toEqual({ name: 'Zahra' })
    })

    it('does not resolve before the delay is up', async () => {
        // We'll track whether it resolved using a flag
        let resolved = false
        delay('hello', 1000).then(() => { resolved = true })

        // Only advance 500ms — not enough
        await vi.advanceTimersByTimeAsync(500)
        expect(resolved).toBe(false)

        // Now advance the rest
        await vi.advanceTimersByTimeAsync(500)
        expect(resolved).toBe(true)
    })
})