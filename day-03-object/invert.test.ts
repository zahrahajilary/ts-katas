import { describe, it, expect } from "vitest";
import invert from "./invert";

describe("invert", () => {
    it("inverts string keys → number values", () => {
        expect(invert({ a: 1, b: 2, c: 3 })).toEqual({ "1": "a", "2": "b", "3": "c" });
    });

    it("inverts string keys → string values", () => {
        expect(invert({ a: "x", b: "y" })).toEqual({ x: "a", y: "b" });
    });

    it("handles empty object", () => {
        expect(invert({})).toEqual({});
    });

    it("handles single entry", () => {
        expect(invert({ hello: "world" })).toEqual({ world: "hello" });
    });

    it("duplicate values — last key wins (lodash behaviour)", () => {
        expect(invert({ a: 1, b: 1, c: 1 })).toEqual({ "1": "c" });
    });

    it("does NOT mutate the input", () => {
        const input = { a: 1, b: 2 };
        const snapshot = { ...input };
        invert(input);
        expect(input).toEqual(snapshot);
    });

    it("handles numeric-looking string values", () => {
        // values are strings "1","2" — still work as keys
        expect(invert({ a: "1", b: "2" })).toEqual({ "1": "a", "2": "b" });
    });

    it("preserves insertion order in result", () => {
        const result = invert({ first: "A", second: "B", third: "C" });
        expect(Object.keys(result)).toEqual(["A", "B", "C"]);
    });

    it("works with negative numbers and zero", () => {
        expect(invert({ a: 0, b: -1, c: -42 })).toEqual({ "0": "a", "-1": "b", "-42": "c" });
    });
});
