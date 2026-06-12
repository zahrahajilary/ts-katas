import {expect,describe,it} from "vitest";
import isDefined from "./isDefined";

describe("isDefined", () => {
    it("should return true if the value is defined", () => {
        expect(isDefined('hi')).toBeTruthy()
    })
    it('should return true if the value is defined as null', () => {
        const test=null;
        expect(isDefined(test)).toBeFalsy()
    })
    it('should return false if the value is undefined', () => {
        const val = undefined;
        expect(isDefined(val)).toBeFalsy()
    })
})