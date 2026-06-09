import {describe,it, expect} from "vitest";
import mapValues from "./mapValues";

describe("mapValues", () => {
    it("returns an new obj", () => {
        const a = {a:1,b:2,c:3}
        const result = {
            a:2,b:4,c:6
        }
        const fn = (el:number)=>el*2
        expect(mapValues(a,fn)).toEqual(result)
    })
    it("doubles numbers", () => {
        expect(mapValues({ a: 1, b: 2, c: 3 }, x => x * 2)).toEqual({ a: 2, b: 4, c: 6 });
    });

    it("transforms value TYPE (number → string)", () => {
        expect(mapValues({ a: 1, b: 2 }, x => `[${x}]`)).toEqual({ a: "[1]", b: "[2]" });
    });

    it("empty object → empty object", () => {
        expect(mapValues({}, (x: number) => x * 2)).toEqual({});
    });

    it("preserves all keys", () => {
        const result = mapValues({ x: 1, y: 2, z: 3 }, v => v + 100);
        expect(Object.keys(result).sort()).toEqual(["x", "y", "z"]);
    });

    it("does NOT mutate input", () => {
        const input = { a: 1, b: 2 };
        const snapshot = { ...input };
        mapValues(input, x => x * 10);
        expect(input).toEqual(snapshot);
    });

    it("fn is called once per key with the value", () => {
        const calls: Array<[number]> = [];
        mapValues({ a: 1, b: 2, c: 3 }, v => { calls.push([v]); return v; });
        expect(calls).toEqual([[1], [2], [3]]);
    });
});

