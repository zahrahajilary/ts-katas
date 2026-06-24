/*
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());
These two lines replace setTimeout, setInterval, Date, etc. with controllable fakes for each test.
The cleanup in afterEach is critical — without it,
 fake timers leak into other test files and cause weird failures.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import sleep from "./sleep";

describe("sleep", () => {

    // ── Section 1: identity — returns a Promise ─────────────────────────
    it("returns a Promise", () => {
        const result = sleep(0);
        expect(result).toBeInstanceOf(Promise);
    });

    // ── Section 2: timing with fake timers (the real testing) ───────────
    describe("with fake timers", () => {
        beforeEach(() => vi.useFakeTimers());
        afterEach(() => vi.useRealTimers());

        it("does NOT resolve before the time has elapsed", async () => {
            let resolved = false;
            sleep(1000).then(() => { resolved = true; });

            // No time has passed yet — the promise should still be pending
            await vi.advanceTimersByTimeAsync(999);
            expect(resolved).toBe(false);

            // One more ms and it should resolve
            await vi.advanceTimersByTimeAsync(1);
            expect(resolved).toBe(true);
        });

        it("resolves with undefined (void promise)", async () => {
            const promise = sleep(500);
            await vi.advanceTimersByTimeAsync(500);
            await expect(promise).resolves.toBeUndefined();
        });

        it("works for sleep(0)", async () => {
            const promise = sleep(0);
            await vi.advanceTimersByTimeAsync(0);
            await expect(promise).resolves.toBeUndefined();
        });

        it("sequential sleeps work correctly", async () => {
            const events: string[] = [];
            const seq = async () => {
                events.push("start");
                await sleep(100);
                events.push("after 100ms");
                await sleep(200);
                events.push("after 300ms total");
            };
            const run = seq();

            // Run all pending timers (and microtasks)
            await vi.runAllTimersAsync();
            await run;

            expect(events).toEqual(["start", "after 100ms", "after 300ms total"]);
        });
    });

    // ── Section 3: real timer sanity check (kept tiny) ──────────────────
    it("real-timer sanity: 10ms sleep takes at least ~5ms", async () => {
        const start = Date.now();
        await sleep(10);
        expect(Date.now() - start).toBeGreaterThanOrEqual(5);
    });
});
