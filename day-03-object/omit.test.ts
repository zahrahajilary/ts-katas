import {describe,test,expect} from "vitest";
import omit from "./omit";

describe("omit",()=>{
    test("should omit properties from an object",()=>{
        const obj={a:1,b:2,c:3};
        const result=omit(obj,["a","c"]);
        expect(result).toEqual({b:2});
    })
})