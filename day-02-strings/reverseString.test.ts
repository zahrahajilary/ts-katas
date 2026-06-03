import {describe,test,expect} from "vitest";
import reverseString from "./reverseString";

describe('reverse string',()=>{
    test('should reverse a string',()=>{
        expect(reverseString('hello')).toBe('olleh');
    })
})