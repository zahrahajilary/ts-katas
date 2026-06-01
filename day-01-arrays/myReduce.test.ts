import {test, it, describe,expect} from "vitest";
import myReduce from "./myReduce";


describe("myReduce", () => {
    it("sums numbers (T=number, U=number)", () => {
        expect(myReduce(0, [1, 2, 3, 5], (a, b) => a + b)).toBe(11);
    });

    it("matches native reduce", () => {
        expect(myReduce(0, [1, 2, 3, 5], (a, b) => a + b))
            .toBe([1, 2, 3, 5].reduce((a, b) => a + b, 0));
    });

    it("transforms T=number into U=string", () => {
        expect(myReduce("", [1, 2, 3], (acc, n) => acc + n)).toBe("123");
    });

    it("returns initVal on empty array", () => {
        expect(myReduce(42, [] as number[], (a, b) => a + b)).toBe(42);
    });

    it("can build an object (U=Record)", () => {
        expect(
            myReduce<string, Record<string, number>>(
                {},
                ["a", "bb"],
                (acc, s) => { acc[s] = s.length; return acc; }
            )
        ).toEqual({ a: 1, bb: 2 });
    });
});

