import {describe,expect,it} from "vitest";
import slugify from "./slugify";

describe('slugify', () => {
    it('should slugify a string', () => {
        expect(slugify('Hello World')).toBe('hello-world')
    })
    it('should slugify a string with custom separator', () => {
        expect(slugify('Hello World')).toBe('hello-world')
    })
    it('should slugify a string with custom separator and uppercase', () => {
        expect(slugify('Hello  World')).toBe('hello-world')
    })
})