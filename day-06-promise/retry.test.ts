import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import retry from "./retry";

describe("retry", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    // ── HAPPY PATH ────────────────────────────────────────────────────

    it("resolves immediately if fn succeeds on the first attempt", async () => {
        const fn = vi.fn().mockResolvedValue("ok");

        const promise = retry(fn);
        await vi.runAllTimersAsync();

        await expect(promise).resolves.toBe("ok");
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("resolves with the correct value", async () => {
        const fn = vi.fn().mockResolvedValue({ data: 42 });

        const promise = retry(fn);
        await vi.runAllTimersAsync();

        await expect(promise).resolves.toEqual({ data: 42 });
    });

    // ── RETRY BEHAVIOUR ───────────────────────────────────────────────

    it("retries after failure and resolves when fn eventually succeeds", async () => {
        const fn = vi
            .fn()
            .mockRejectedValueOnce(new Error("fail"))   // attempt 1 fails
            .mockRejectedValueOnce(new Error("fail"))   // attempt 2 fails
            .mockResolvedValue("ok");                   // attempt 3 succeeds

        const promise = retry(fn, 5, 100);
        await vi.runAllTimersAsync();

        await expect(promise).resolves.toBe("ok");
        expect(fn).toHaveBeenCalledTimes(3);
    });



    // ── DEFAULTS ──────────────────────────────────────────────────────

    it("defaults to 5 attempts", async () => {
        const fn = vi.fn().mockRejectedValue(new Error("fail"));

        const promise = retry(fn);
        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow();
        expect(fn).toHaveBeenCalledTimes(5);
    });

    // ── ERROR PROPAGATION ─────────────────────────────────────────────

    it("throws the last error after exhausting attempts", async () => {
        const fn = vi
            .fn()
            .mockRejectedValueOnce(new Error("error 1"))
            .mockRejectedValueOnce(new Error("error 2"))
            .mockRejectedValueOnce(new Error("final error"));

        const promise = retry(fn, 3, 100);
        await vi.runAllTimersAsync();

        // should throw the LAST error, not the first
        await expect(promise).rejects.toThrow("final error");
    });

    // ── DELAY ─────────────────────────────────────────────────────────

    it("waits delayMs between attempts", async () => {
        const fn = vi
            .fn()
            .mockRejectedValueOnce(new Error("fail"))
            .mockResolvedValue("ok");

        const promise = retry(fn, 3, 500);

        // fn called once immediately
        expect(fn).toHaveBeenCalledTimes(1);

        // before delay passes, fn not called again
        vi.advanceTimersByTime(499);
        expect(fn).toHaveBeenCalledTimes(1);

        // after delay passes, fn called again
        await vi.runAllTimersAsync();
        await promise;
        expect(fn).toHaveBeenCalledTimes(2);
    });
});