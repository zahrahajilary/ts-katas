import {expect,describe,it} from "vitest";
import assertDefined from "./assertDefined";
describe(assertDefined, () => {
    it("Should return throw when no value is given", () => {
        function sayHi(x?: unknown) {
            if (x === null || x === undefined) {
                assertDefined(x);
            } else {
                return x;
            }
        }

        expect(() => sayHi()).toThrow()
    })

    describe("assertDefined", () => {

        // ── Section 1: when it SHOULD throw ─────────────────────────────────
        describe("throws on null/undefined", () => {
            it("throws when value is undefined", () => {
                expect(() => assertDefined(undefined)).toThrow();
            });

            it("throws when value is null", () => {
                expect(() => assertDefined(null)).toThrow();
            });

            it("throws an Error instance", () => {
                expect(() => assertDefined(null)).toThrow(Error);
            });

            it("throws with a helpful message", () => {
                expect(() => assertDefined(null)).toThrow(/defined/i);
            });
        });

        // ── Section 2: when it SHOULD NOT throw ─────────────────────────────
        describe("does not throw on actual values", () => {
            it("accepts strings (including empty)", () => {
                expect(() => assertDefined("hi")).not.toThrow();
                expect(() => assertDefined("")).not.toThrow();   // empty string is defined
            });

            it("accepts numbers (including zero)", () => {
                expect(() => assertDefined(42)).not.toThrow();
                expect(() => assertDefined(0)).not.toThrow();    // zero is defined!
            });

            it("accepts booleans (including false)", () => {
                expect(() => assertDefined(true)).not.toThrow();
                expect(() => assertDefined(false)).not.toThrow();  // false is defined!
            });

            it("accepts objects and arrays (including empty)", () => {
                expect(() => assertDefined({})).not.toThrow();
                expect(() => assertDefined([])).not.toThrow();
            });
        });

        // ── Section 3: the real use case — narrowing after the call ─────────
        describe("narrows the type after the call (real use case)", () => {
            it("lets you use a value as non-null after assertion", () => {
                const maybeUser: { name: string } | null = {name: "Zahra"};
                assertDefined(maybeUser);
                // From here on, TS knows maybeUser is { name: string }, not null
                expect(maybeUser.name).toBe("Zahra");
            });

            it("Array.find pattern — narrows from undefined", () => {
                const items = [1, 2, 3];
                const found = items.find(n => n === 2);
                // found is number | undefined
                assertDefined(found);
                // found is now number
                expect(found * 10).toBe(20);
            });
        });

    });
})