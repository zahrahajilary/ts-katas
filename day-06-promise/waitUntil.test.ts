import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import waitUntil from "./waitUntil";

describe("waitUntil", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("resolves immediately if pred is already true", async () => {
        const pred = vi.fn(() => true);

        const promise = waitUntil(pred, 100);
        await vi.runAllTimersAsync();

        await expect(promise).resolves.toBeUndefined();
    });

    it("resolves after pred becomes true on the second tick", async () => {
        let count = 0;
        const pred = vi.fn(() => {
            count++;
            return count >= 2; // false on first tick, true on second
        });

        const promise = waitUntil(pred, 100);
        await vi.runAllTimersAsync();

        await expect(promise).resolves.toBeUndefined();
        expect(pred).toHaveBeenCalledTimes(2);
    });

    it("calls pred multiple times before resolving", async () => {
        let count = 0;
        const pred = vi.fn(() => {
            count++;
            return count >= 5;
        });

        const promise = waitUntil(pred, 100);
        await vi.runAllTimersAsync();

        await expect(promise).resolves.toBeUndefined();
        expect(pred).toHaveBeenCalledTimes(5);
    });

    it("stops polling after pred returns true (no extra calls)", async () => {
        let count = 0;
        const pred = vi.fn(() => {
            count++;
            return count === 3;
        });

        const promise = waitUntil(pred, 100);
        await vi.runAllTimersAsync();

        await promise;

        // Advance time further — interval should be cleared, no extra calls
        vi.advanceTimersByTime(1000);
        expect(pred).toHaveBeenCalledTimes(3);
    });

    it("respects the intervalMs parameter", async () => {
        let count = 0;
        const pred = vi.fn(() => {
            count++;
            return count >= 3;
        });

        const promise = waitUntil(pred, 200);

        // After 400ms, only 2 ticks should have fired (at 200ms and 400ms)
        vi.advanceTimersByTime(400);
        expect(pred).toHaveBeenCalledTimes(2);

        // One more tick resolves it
        await vi.runAllTimersAsync();
        await expect(promise).resolves.toBeUndefined();
    });

    it("never resolves if pred always returns false (use withTimeout in practice)", async () => {
        const pred = vi.fn(() => false);

        let resolved = false;
        waitUntil(pred, 100).then(() => {
            resolved = true;
        });

        vi.advanceTimersByTime(10_000);
        await Promise.resolve(); // flush microtasks

        expect(resolved).toBe(false);
        expect(pred).toHaveBeenCalled();
    });
});