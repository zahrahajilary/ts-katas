import {test, describe,expect} from "vitest";
import myFilter from "./myFilter";

const data = [
    {id:2,name:'John',age:25},
    {id:3,name:'John2',age:26},
    {id:4,name:'John3',age:27},
    {id:5,name:'John4',age:28},
    {id:6,name:'John5',age:29},
]

const testfn:<T extends { age:number } >(el:T)=>boolean = (el)=>{
    return el['age']>=27
}
const numbers =[3,5,1,0]
describe('myFilter',()=>{
    test('filter element bigger than 2',()=>{
        expect(myFilter(numbers,(x)=>x>2)).toEqual([3,5])
    })
    test('return all object that age us upper than 27',()=>{
        expect(myFilter(data,testfn)).toEqual([
            {id:4,name:'John3',age:27},
            {id:5,name:'John4',age:28},
            {id:6,name:'John5',age:29},
        ])
    })
})