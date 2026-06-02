import { describe, it, expect } from "vitest";
import myFlat from "./myFlat";

describe("myFlat", () => {
    it("flattens with nested array at the END", () => {
        expect(myFlat([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
    });

    it("flattens with nested array in the MIDDLE", () => {
        expect(myFlat([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    });

    it("flattens TWO nested arrays", () => {
        expect(myFlat([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    });

    it("flattens nested array at the START", () => {
        expect(myFlat([[1, 2], 3, 4])).toEqual([1, 2, 3, 4]);
    });

    it("works with already-flat array", () => {
        expect(myFlat([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("handles empty array", () => {
        expect(myFlat<number>([])).toEqual([]);
    });

    it("handles array of empty arrays", () => {
        expect(myFlat<number>([[], [], []])).toEqual([]);
    });

    it("works on strings", () => {
        expect(myFlat(["a", ["b", "c"], "d"])).toEqual(["a", "b", "c", "d"]);
    });
});