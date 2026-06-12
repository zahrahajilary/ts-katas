
import { describe, it, expect } from "vitest";
import isString from "./isString";
import isNumber from "./isNumber";
import isMyArray from "./isArray";


describe("isMyArray (composable)", () => {
    it("array of all numbers passes with isNumber check", () => {
        expect(isMyArray([1, 2, 3], isNumber)).toBe(true);
    });
    it("mixed array FAILS the type check (this is the win)", () => {
        expect(isMyArray([1, 2, "three"], isNumber)).toBe(false);
    });
    it("empty array passes for any item type", () => {
        expect(isMyArray([], isNumber)).toBe(true);
        expect(isMyArray([], isString)).toBe(true);
    });
    it("non-array returns false regardless", () => {
        expect(isMyArray("not an array", isString)).toBe(false);
        expect(isMyArray({}, isString)).toBe(false);
        expect(isMyArray(null, isString)).toBe(false);
    })
})
