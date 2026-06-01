import { describe, it, expect } from "vitest";
import mySome from "./mySome";

describe("mySome", () => {
    it("returns true when at least one matches", () => {
        expect(mySome([1, 2, 3], n => n > 2)).toBe(true);
    });

    it("returns false when none match", () => {
        expect(mySome([1, 2, 3], n => n > 10)).toBe(false);
    });

    it("returns false for empty array", () => {
        expect(mySome<number>([], () => true)).toBe(false);
    });

    it("short-circuits — stops on first match", () => {
        let calls = 0;
        mySome([1, 2, 3, 4, 5], n => { calls++; return n === 2; });
        expect(calls).toBe(2);  // stopped after 2nd call
    });
});