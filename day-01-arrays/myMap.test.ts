import {expect, test,describe} from "vitest";
import myMap from "./myMap";


const arr = [2,3,5]

describe("myMap", () => {

    test('double numbers',()=>{
        expect(myMap(arr,(x)=>x*2)).toEqual([4,6,10])
    })
    test('empty array',()=>{

        expect(myMap([],(x)=>x*2)).toEqual([])
    })
})

