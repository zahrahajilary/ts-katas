import {test,describe,expect} from "vitest";
import factorial from "./factorial";
describe("factorial", () => {
    test('should return ', () => {
        expect(factorial(4,1)).toBe(24)
    });
})