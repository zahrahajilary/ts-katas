
import { describe, it, expect } from "vitest";
import typedEntries from "./typedEntries";

describe("typedEntries", () => {
    it("basic object with numbers", () => {
        expect(typedEntries({ a: 1, b: 2 })).toEqual([["a", 1], ["b", 2]]);
    });

    it("empty object", () => {
        expect(typedEntries({})).toEqual([]);
    });

    it("mixed value types", () => {
        expect(typedEntries({ a: 1, b: "hi", c: true })).toEqual([
            ["a", 1], ["b", "hi"], ["c", true]
        ]);
    });

    it("preserves insertion order", () => {
        expect(typedEntries({ z: 1, a: 2, m: 3 })).toEqual([["z", 1], ["a", 2], ["m", 3]]);
    });
});
