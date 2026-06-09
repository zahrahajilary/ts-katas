// const result=[];
// for(const key in obj){
//     result.push(key)
// }
// return result

//first try i went with this solution
// or...in walks the prototype chain.
// If someone passes an object with inherited enumerable properties
// , those come back in your result:

export default function typedKeys<T extends object>(obj: T): (keyof T)[] {
        return Object.keys(obj) as (keyof T)[];
}