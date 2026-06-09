import {describe,it,expect} from "vitest";
import isEmpty from "./isEmpty";
describe("isEmpty", () => {
        it("Should return true if value is empty", () => {
            const obj= {a:1}
            expect(isEmpty(obj)).toBe(false)
        })
    it("Should return true if value is empty", () => {
        const obj={}
        expect(isEmpty(obj)).toBe(true)
    })
})
describe("isEmpty", () => {
    it("empty object → true", () => {
        expect(isEmpty({})).toBe(true);
    });

    it("non-empty object → false", () => {
        expect(isEmpty({ a: 1 })).toBe(false);
    });

    it("empty array → true", () => {
        expect(isEmpty([])).toBe(true);
    });

    it("non-empty array → false", () => {
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it("sneaky: Map with entries", () => {
        const m = new Map([["a", 1]]);
        console.log("Map with entries -> isEmpty says:", isEmpty(m), "but map.size =", m.size);
        // Object.keys(map) returns [] because Map data isn't in own properties
        expect(isEmpty(m)).toBe(true);  // your current behaviour
    });

    it("sneaky: Set with entries", () => {
        const s = new Set([1, 2, 3]);
        console.log("Set with entries -> isEmpty says:", isEmpty(s), "but set.size =", s.size);
        expect(isEmpty(s)).toBe(true);  // your current behaviour
    });

    it("sneaky: object with only inherited props", () => {
        const child = Object.create({ inherited: 1 });
        // No own properties → isEmpty says true, even though `inherited in child` is true
        expect(isEmpty(child)).toBe(true);
    });
});
