
import { describe, it, expect } from "vitest";
import assertNever from "./assertNever";

describe("assertNever", () => {

    // ── Section 1: runtime behavior in isolation ─────────────────────────
    // assertNever's body just throws. Tests confirm the error is well-formed
    // for the case where bad data slips through (e.g. from JSON, API, etc.)
    describe("runtime behavior", () => {
        it("throws when called with any value", () => {
            // `as never` forces TS to let us call it from a test
            expect(() => assertNever("unexpected" as never)).toThrow();
        });

        it("throws an Error instance", () => {
            expect(() => assertNever(42 as never)).toThrow(Error);
        });

        it("error message includes the offending value", () => {
            expect(() => assertNever("bad" as never)).toThrow(/bad/);
        });

        it("handles object values in the error message", () => {
            expect(() => assertNever({ kind: "alien" } as never)).toThrow(/alien/);
        });
    });

    // ── Section 2: the REAL use case — exhaustiveness checking ──────────
    // This is how assertNever is actually used in production code.
    // We define a discriminated union, write a switch that handles every
    // case, and call assertNever in the default to lock the exhaustiveness.
    describe("exhaustiveness checking (the real use case)", () => {
        type Animal =
            | { kind: "dog"; breed: string }
            | { kind: "cat"; lives: number };

        function describeAnimal(a: Animal): string {
            switch (a.kind) {
                case "dog": return `A dog of breed ${a.breed}`;
                case "cat": return `A cat with ${a.lives} lives`;
                default: return assertNever(a);
            }
        }

        it("handles dog case correctly", () => {
            expect(describeAnimal({ kind: "dog", breed: "labrador" }))
                .toBe("A dog of breed labrador");
        });

        it("handles cat case correctly", () => {
            expect(describeAnimal({ kind: "cat", lives: 9 }))
                .toBe("A cat with 9 lives");
        });

        it("throws at runtime if a bogus variant slips through types", () => {
            // Simulating what happens when data from untyped sources
            // (JSON.parse, fetch response, etc.) violates the type contract
            const bogus = { kind: "bird", wingspan: 30 } as unknown as Animal;
            expect(() => describeAnimal(bogus)).toThrow(/bird/);
        });
    });

});
