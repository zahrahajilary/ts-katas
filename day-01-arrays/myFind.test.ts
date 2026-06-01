import {test, describe, expect,it} from "vitest";
import myFind from "./myFind";


describe("myFind", () => {
    it("finds the first even number", () => {
        expect(myFind([1, 3, 4, 6], n => n % 2 === 0)).toBe(4);
    });

    it("returns undefined when nothing matches", () => {
        expect(myFind([1, 3, 5], n => n % 2 === 0)).toBeUndefined();
    });

    it("returns undefined for empty array", () => {
        expect(myFind<number>([], n => n > 0)).toBeUndefined();
    });

    it("returns the FIRST match, not all matches", () => {
        expect(myFind([1, 2, 3, 4], n => n > 1)).toBe(2);
    });

    it("works on objects", () => {
        const users = [{ id: 1, name: "a" }, { id: 2, name: "b" }];
        expect(myFind(users, u => u.id === 2)).toEqual({ id: 2, name: "b" });
    });
});