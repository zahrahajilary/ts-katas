import {test, describe,expect} from "vitest";
import myReduce from "./myReduce";


describe('myReduce',()=>{
    test('it has to return 11',()=>{
        expect(myReduce(0,[1,2,3,5],(a,b)=>a+b)).toEqual(11)
    })

})



