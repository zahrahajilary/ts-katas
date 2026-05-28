/**
 * myFilter function is a function behave like fitler function in js
 * for type specefication i use generic type
 * for filter recevied a callback function and array and the return type is same becuase we are not going to modify
 * element
 * @param arr <T>
 * @param fn fn(el:T[]):boolean
 * @return  T[]
 */

export default function myFilter<T>(arr:T[],fn:(el:T)=>boolean):T[]{
    const result:T[]=[];
// With noUncheckedIndexedAccess enabled, TS types arr[i] as `T | undefined`,
// not `T`. That's because indexing an array by number could be out of bounds
// at runtime (e.g. arr[99] on a 3-item array is undefined), and TS can't
// verify the index is valid just by looking at the code.
// So it forces me to acknowledge the `undefined` case.
//
// Using `for...of` avoids this entirely — it only ever yields real elements,
// so each one is typed as plain `T`. No cast, no undefined.
    for (const el of arr){
        let res = fn(el);
        if(res){
            result.push(el)
        }
    }
    return result


}