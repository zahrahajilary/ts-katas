
import { describe, it, expect } from "vitest";
import isEven from "./isEven";

describe("isEven", () => {

    describe("integers — the supported contract", () => {
        it("zero is even", () => {
            expect(isEven(0)).toBe(true);
        });

        it("positive even integers", () => {
            expect(isEven(2)).toBe(true);
            expect(isEven(100)).toBe(true);
            expect(isEven(2002)).toBe(true);
        });

        it("positive odd integers", () => {
            expect(isEven(1)).toBe(false);
            expect(isEven(19)).toBe(false);
            expect(isEven(99)).toBe(false);
        });

        it("negative even integers", () => {
            expect(isEven(-2)).toBe(true);
            expect(isEven(-100)).toBe(true);
        });

        it("negative odd integers", () => {
            expect(isEven(-1)).toBe(false);
            expect(isEven(-19)).toBe(false);
        });
    });

    // describe("non-integers — by contract, always false", () => {
    //     // "even" doesn't apply to decimals; we treat them as not-even.
    //     it("positive decimals are not even", () => {
    //         expect(isEven(12.6)).toBe(false);
    //         expect(isEven(12.5)).toBe(false);
    //         expect(isEven(0.1)).toBe(false);
    //     });
    //
    //     it("negative decimals are not even", () => {
    //         expect(isEven(-12.6)).toBe(false);
    //     });
    // });
    //
    // describe("special numeric values", () => {
    //     it("NaN is not even (NaN % 2 = NaN)", () => {
    //         expect(isEven(NaN)).toBe(false);
    //     });
    //
    //     it("Infinity is not even (Infinity % 2 = NaN)", () => {
    //         expect(isEven(Infinity)).toBe(false);
    //         expect(isEven(-Infinity)).toBe(false);
    //     });
    // });
});
