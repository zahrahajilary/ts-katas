import {describe,test,expect} from "vitest";
import pick from "./pick";

describe("pick",()=>{
    test("should pick properties from an object",()=>{
        const obj={a:1,b:2,c:3};
        const result=pick(obj,["a","c"]);
        expect(result).toEqual({a:1,c:3});
    })
})
