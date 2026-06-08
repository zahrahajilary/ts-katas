import {describe,it,expect} from "vitest";
import {deepClone} from "./deepClone";
describe("deepClone", () => {
    it('deepClone', () => {
        const objA = {}
        const res = deepClone(objA)
        expect(res).toEqual({})
    })
    it('objects have the same values but different memory addresses', () => {
        const objA = {a:1,b:2}
        const result = deepClone(objA)
        expect(result).not.toBe(objA)
        expect(result).toEqual(objA)
    })
    describe("deepClone — investigating what actually happens", () => {
        it("flat object with only primitives", () => {
            const input = { name: "Zahra", age: 33 };
            const out = deepClone(input);
            console.log("flat input ->", out);
            expect(out).toEqual(input);
        });

        it("nested object — does the inner survive?", () => {
            const input = { name: "Zahra", address: { city: "London" } };
            const out = deepClone(input);
            console.log("nested input ->", JSON.stringify(out));
            expect(out).toEqual(input);
        });

        it("contract: mutating result must not touch input", () => {
            const input = { address: { city: "London" } };
            const out = deepClone(input);
            if (out.address) out.address.city = "Paris";
            console.log("after mutation, input.address.city =", input.address.city);
            expect(input.address.city).toBe("London");
        });

        it("array at top level", () => {
            const out = deepClone([1, 2, 3]);
            console.log("array input ->", out, "isArray?", Array.isArray(out));
            expect(out).toEqual([1, 2, 3]);
        });

        it("primitive at top level", () => {
            const out = deepClone(5);
            console.log("primitive 5 ->", out);
            expect(out).toBe(5);
        });
    });
})