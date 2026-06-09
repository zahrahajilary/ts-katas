import {it, describe,expect} from "vitest";
import typedValues from "./typedValues";
describe("typedValues", () => {
    it("returns an array of values", () => {
        const arr = {a:1,b:2,c:1}
        const result = typedValues(arr);
        expect(typedValues(arr)).toEqual(result)
    })
    it("empty object", () => {
        expect(typedValues({})).toEqual([]);
    });
    it("single key", () => {
        expect(typedValues({ x: 1 })).toEqual([1]);
    });
    it("mixed value types", () => {
        expect(typedValues({ a: 1, b: "hi", c: true, d: null })).toEqual([1, 'hi', true, null]);
    });
    it("ignores inherited enumerable properties (matches Object.keys)", () => {
        const parent = { inherited: "from parent" };
        const child = Object.create(parent);
        child.own = "from child";
        expect(typedValues(child)).toEqual(["from child"]);
    });
})