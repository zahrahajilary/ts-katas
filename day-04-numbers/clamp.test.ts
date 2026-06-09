import {describe,it, expect} from "vitest";
import clamp from "./clamp";
describe("clamp", () => {
    it("should return a positive clamp", () => {
        expect(clamp(19,20,25)).toEqual(20)
    })
})