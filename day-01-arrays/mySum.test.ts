import { describe, it, expect } from "vitest";
import mySum from "./mySum";

describe("mySum", () => {
    it("Should return an number", () => {
        expect(mySum([1,2,3,4])).toBe(10)
    })
    it("Should return an number", () => {
        expect(mySum([])).toBe(0)
    })
    it("Should return an number", () => {
        expect(mySum([-1,1])).toBe(0)
    })
})