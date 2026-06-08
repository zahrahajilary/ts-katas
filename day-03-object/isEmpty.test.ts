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