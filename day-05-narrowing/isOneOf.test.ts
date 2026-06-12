import {describe,it,expect} from "vitest";
import isOneOf from "./isOneOf";

describe("isOneOf", () => {
    it("returns true when value is in opts", () => {
        expect(isOneOf("red", ["red", "green", "blue"])).toBe(true);
    });
    it("returns false when value is not in opts", () => {
        expect(isOneOf("purple", ["red", "green", "blue"])).toBe(false);
    });
    it("works with numbers", () => {
        expect(isOneOf(2, [1, 2, 3])).toBe(true);
        expect(isOneOf(99, [1, 2, 3])).toBe(false);
    });
    it("empty opts always returns false", () => {
        expect(isOneOf("anything", [])).toBe(false);
    });

    it("the magic: with `as const`, narrows to literal union", () => {
        const colors = ["red", "green", "blue"] as const;
        const input: string = "red";
        if (isOneOf(input, colors)) {
            // input is now "red" | "green" | "blue" — literal types!
            const _check: "red" | "green" | "blue" = input;  // ✅ this assignment proves narrowing
            expect(_check).toBe("red");
        }
    });
});
