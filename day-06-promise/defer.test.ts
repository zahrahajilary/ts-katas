import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import defer from './defer'
describe('defer', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('returns a promise, resolve, and reject', () => {
        const deferred = defer<string>()

        // check the shape of what's returned
        expect(deferred.promise).toBeInstanceOf(Promise)
        expect(typeof deferred.resolve).toBe('function')
        expect(typeof deferred.reject).toBe('function')
    })

    it('promise resolves when resolve() is called from outside', async () => {
        const deferred = defer<string>()

        // resolve from OUTSIDE the promise
        deferred.resolve('hello from outside')

        const result = await deferred.promise
        expect(result).toBe('hello from outside')
    })

    it('promise rejects when reject() is called from outside', async () => {
        const deferred = defer<string>()

        // reject from OUTSIDE the promise
        deferred.reject(new Error('something went wrong'))

        await expect(deferred.promise).rejects.toThrow('something went wrong')
    })

    it('promise stays pending until resolve or reject is called', async () => {
        const deferred = defer<string>()
        let resolved = false

        deferred.promise.then(() => { resolved = true })

        // advance time — but nobody called resolve yet
        await vi.advanceTimersByTimeAsync(1000)
        expect(resolved).toBe(false)

        // NOW call resolve
        deferred.resolve('done')
        await vi.advanceTimersByTimeAsync(0)
        expect(resolved).toBe(true)
    })

    it('can be resolved after a delay', async () => {
        const deferred = defer<number>()

        // resolve after 500ms from somewhere else
        setTimeout(() => deferred.resolve(42), 500)

        const resultPromise = deferred.promise
        await vi.advanceTimersByTimeAsync(500)

        const result = await resultPromise
        expect(result).toBe(42)
    })

    it('works with different types', async () => {
        // with number
        const numDeferred = defer<number>()
        numDeferred.resolve(123)
        expect(await numDeferred.promise).toBe(123)

        // with object
        const objDeferred = defer<{ name: string }>()
        objDeferred.resolve({ name: 'Zahra' })
        expect(await objDeferred.promise).toEqual({ name: 'Zahra' })
    })

    it('second resolve call is ignored — first one wins', async () => {
        const deferred = defer<string>()

        deferred.resolve('first')
        deferred.resolve('second') // this should be ignored

        const result = await deferred.promise
        expect(result).toBe('first') // always first
    })

    it('real world use case — resolving from a button click simulation', async () => {
        // simulates: show a dialog, wait for user to click yes/no
        function showConfirmDialog(): { promise: Promise<boolean>, clickYes: () => void, clickNo: () => void } {
            const deferred = defer<boolean>()
            return {
                promise: deferred.promise,
                clickYes: () => deferred.resolve(true),
                clickNo: () => deferred.resolve(false),
            }
        }

        const dialog = showConfirmDialog()

        // simulate user clicking Yes after 200ms
        setTimeout(() => dialog.clickYes(), 200)

        const resultPromise = dialog.promise
        await vi.advanceTimersByTimeAsync(200)

        const confirmed = await resultPromise
        expect(confirmed).toBe(true)
    })
})