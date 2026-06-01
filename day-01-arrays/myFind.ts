/**
 * T: generic type
 * @return:  T | undefined
 * @param arr: T[]
 * @param fn: (el: T) => boolean
 */
export default function myFind<T>(arr: T[],fn:(item:T)=>boolean):T|undefined {
    for(let item of arr){
        if(fn(item)){
            return item
        }
    }
    return undefined
}