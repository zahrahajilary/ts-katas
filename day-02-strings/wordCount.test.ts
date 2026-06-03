import {describe,expect,it} from "vitest";
import wordCount from "./wordCount";

describe('word cound function',()=>{
    it('check word count',()=>{
        expect(wordCount('')).toBe(0);
        expect(wordCount('hello')).toBe(1);
        expect(wordCount('hello world')).toBe(2);
    })
})