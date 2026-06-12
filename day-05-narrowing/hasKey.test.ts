
import { describe, it, expect } from "vitest";
import hasKey from "./hasKey";

describe("hasKey", () => {
    it("returns true when the key exists as own property", () => {
        expect(hasKey({ a: 1 }, "a")).toBe(true);
    });
    it("returns false when the key is missing", () => {
        expect(hasKey({ a: 1 }, "b")).toBe(false);
    });
    it("inherited keys are NOT counted (own property check)", () => {
        const child = Object.create({ inherited: 1 });
        expect(hasKey(child, "inherited")).toBe(false);
    });
    it("the narrowing actually works at the type level", () => {
        const obj: object = { foo: "bar" };
        if (hasKey(obj, "foo")) {
            // TS narrows obj — we can now access obj.foo (type: unknown)
            expect(obj.foo).toBe("bar");
        }
    });
});
