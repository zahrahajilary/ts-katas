import {describe,it, expect} from "vitest";
import isEmpty from "./isEmpty";

describe("isEmpty", () => {
    describe("nullish", () => {
        it("null is empty", () => expect(isEmpty(null)).toBe(true));
        it("undefined is empty", () => expect(isEmpty(undefined)).toBe(true));
    });

    describe("strings", () => {
        it("empty string is empty", () => expect(isEmpty("")).toBe(true));
        it("non-empty string is not empty", () => expect(isEmpty("hi")).toBe(false));
    });

    describe("arrays", () => {
        it("empty array is empty", () => expect(isEmpty([])).toBe(true));
        it("non-empty array is not empty", () => expect(isEmpty([1])).toBe(false));
    });

    describe("plain objects", () => {
        it("empty object is empty", () => expect(isEmpty({})).toBe(true));
        it("non-empty object is not empty", () => expect(isEmpty({ a: 1 })).toBe(false));
    });

    describe("Map and Set", () => {
        it("empty Map is empty", () => expect(isEmpty(new Map())).toBe(true));
        it("Map with entries is not empty", () => expect(isEmpty(new Map([["a", 1]]))).toBe(false));
        it("empty Set is empty", () => expect(isEmpty(new Set())).toBe(true));
        it("Set with values is not empty", () => expect(isEmpty(new Set([1, 2]))).toBe(false));
    });

    describe("primitives — values, not empty", () => {
        it("0 is not empty", () => expect(isEmpty(0)).toBe(false));
        it("false is not empty", () => expect(isEmpty(false)).toBe(false));
        it("42 is not empty", () => expect(isEmpty(42)).toBe(false));
    });
});

