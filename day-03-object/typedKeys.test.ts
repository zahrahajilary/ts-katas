import {describe, it, expect} from "vitest";
import typedKeys from "./typedKeys";
describe('typedkeys', () => {
    it('Should return true if value is empty', () => {
        const obj={}
        expect(typedKeys(obj)).toEqual([])
    })

    it('Should return true if value is empty', () => {
        const obj={a:'salam',b:'hello'}
        expect(typedKeys(obj)).toEqual(['a','b'])
    })
})

describe("typedKeys", () => {
    it("basic object", () => {
        expect(typedKeys({ a: 1, b: 2, c: 3 })).toEqual(["a", "b", "c"]);
    });

    it("empty object", () => {
        expect(typedKeys({})).toEqual([]);
    });

    it("single key", () => {
        expect(typedKeys({ x: 1 })).toEqual(["x"]);
    });

    it("mixed value types", () => {
        expect(typedKeys({ a: 1, b: "hi", c: true, d: null })).toEqual(["a", "b", "c", "d"]);
    });

    it("preserves insertion order", () => {
        expect(typedKeys({ z: 1, a: 2, m: 3 })).toEqual(["z", "a", "m"]);
    });

    // Child literally has just one property in its own box: own. There's also a link (the prototype pointer) up to parent, but the parent's properties aren't copied down — they stay on parent.
    // When you write child.inherited, JS does this dance:
    //
    //     Does child have an own property called inherited? No.
    //     Does its prototype (parent) have one? Yes — return "from parent".
    //
    //     So child can reach inherited by following the link, but it doesn't contain it.
    // Then each "lookup" tool reflects a different question:
    it("ignores inherited enumerable properties (matches Object.keys)", () => {
        const parent = { inherited: "from parent" };
        const child = Object.create(parent);
        child.own = "from child";
        expect(typedKeys(child)).toEqual(["own"]);
    });
});

