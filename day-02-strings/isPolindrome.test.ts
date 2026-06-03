import {it,describe,expect} from "vitest";
import isPalindrome from "./isPalindrome";

describe('is palindrome', () => {
    it('should return true for palindrome strings', () => {
        expect(isPalindrome('racecar')).toBe(true);
        expect(isPalindrome('madam')).toBe(true);
        expect(isPalindrome('level')).toBe(true);
        expect(isPalindrome('test')).toBe(false);
        expect(isPalindrome('')).toBe(true);
    })
})
