import {describe,it,expect}from 'vitest';
import countOccurrences from './countOccurrences';
describe('countOccurrences',()=>{
    it('should return 0 for empty string',()=>{
        expect(countOccurrences('','')).toBe(0)
    })
    it('should return 0 for empty substring',()=>{
        expect(countOccurrences('abc','')).toBe(0)
    })
    it('should count occurrences correctly',()=>{
        expect(countOccurrences('abcabc','abc')).toBe(2)
        expect(countOccurrences('hello','l')).toBe(2)
        expect(countOccurrences('mississippi','iss')).toBe(2)
    })
})