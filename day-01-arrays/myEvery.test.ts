import { describe, it, expect } from "vitest";
import myEvery from "./myEvery";

describe("myEvery", () => {
    it("returns true when all match", () => {
        expect(myEvery([2, 4, 6], n => n % 2 === 0)).toBe(true);
    });

    it("returns false when any fail", () => {
        expect(myEvery([2, 4, 5, 6], n => n % 2 === 0)).toBe(false);
    });

    it("returns true for empty array (vacuous truth)", () => {
        expect(myEvery<number>([], () => false)).toBe(true);
    });

    it("short-circuits on the first failure", () => {
        let calls = 0;
        myEvery([2, 4, 5, 6, 8], n => { calls++; return n % 2 === 0; });
        expect(calls).toBe(3);  // stopped at the 5 (3rd call)
    });

    it("matches native .every", () => {
        const arr = [1, 2, 3];
        expect(myEvery(arr, n => n > 0)).toBe(arr.every(n => n > 0));
        expect(myEvery(arr, n => n > 2)).toBe(arr.every(n => n > 2));
    });
});