import { describe, it, expect } from "vitest";
import myReverse from "./myReverse";

describe("myReverse", () => {
    it("reverses numbers", () => {
        expect(myReverse([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
    });

    it("reverses strings", () => {
        expect(myReverse(["a", "b", "c"])).toEqual(["c", "b", "a"]);
    });

    it("handles empty array", () => {
        expect(myReverse<number>([])).toEqual([]);
    });

    it("handles single element", () => {
        expect(myReverse([42])).toEqual([42]);
    });

    it("does NOT mutate input (important!)", () => {
        const original = [1, 2, 3];
        myReverse(original);
        expect(original).toEqual([1, 2, 3]);  // still original
    });
});