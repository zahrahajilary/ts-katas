import {test, describe, expect} from "vitest";
import myFind from "./myFind";

const els=[28,19,34]
describe('myFind array', () => {
    test('first match of el<20',()=>{
        expect(myFind(els,(el)=>el<20)).toEqual(19)
    })
    test('first match of el>20',()=>{
        expect(myFind(els,(el)=>el>20)).toEqual(28)
    })
})