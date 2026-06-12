import {describe,it,expect} from "vitest";
import isString from './isString'
describe('isString', () => {
    it('returns true', () => {
        expect(isString('cheking')).toBe(true)
    })
    it('returns false as array', () => {
        expect(isString(['hiiiii'])).toBe(false)
    })
    it('returns false as number', () => {
        expect(isString(12)).toBe(false)
    })
    it('returns true number in qouted', () => {
        expect(isString('23')).toBe(true)
    })
})