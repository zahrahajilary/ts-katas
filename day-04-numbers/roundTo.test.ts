import {describe,it,expect} from "vitest";
import roundTo from './roundTo';

describe("roundTo", () => {
    it("the famous 1.005 case", () => {
        expect(roundTo(1.005, 2)).toBe(1.01);
    });

    it("basic rounding", () => {
        expect(roundTo(3.14159, 2)).toBe(3.14);
        expect(roundTo(3.14159, 4)).toBe(3.1416);
        expect(roundTo(2.5, 0)).toBe(3);
    });

    it("zero decimals = integer rounding", () => {
        expect(roundTo(1.7, 0)).toBe(2);
        expect(roundTo(1.3, 0)).toBe(1);
    });

    it("zero input", () => {
        expect(roundTo(0, 2)).toBe(0);
    });

    it("negative numbers", () => {
        expect(roundTo(-1.235, 2)).toBe(-1.23);  // Math.round of -1.235 quirks
        expect(roundTo(-3.7, 0)).toBe(-4);
    });

    it("negative decimals = round to tens/hundreds", () => {
        expect(roundTo(123, -1)).toBe(120);
        expect(roundTo(1567, -2)).toBe(1600);
    });

    it("already-clean numbers stay clean", () => {
        expect(roundTo(5, 2)).toBe(5);
        expect(roundTo(5.5, 1)).toBe(5.5);
    });
});
