import {describe,it,expect} from "vitest";
import isNumber from './isNumber'
describe('isNumbber', () => {
    it('returns true', () => {
        expect(isNumber('cheking')).toBe(false)
    })
    it('returns false as array', () => {
        expect(isNumber(['hiiiii'])).toBe(false)
    })
    it('returns false as number', () => {
        expect(isNumber(12)).toBe(true)
    })
    it('returns true number in qouted', () => {
        expect(isNumber('23')).toBe(false)
    })
})