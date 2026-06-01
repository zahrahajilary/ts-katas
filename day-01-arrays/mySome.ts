/**
 * T is generic type
 * @param arr - T[]
 * @param fn - (item:T)=>boolean
 * @return - boolean
 */

export default function mySome<T>(arr:T[],fn:(item:T)=>boolean):boolean{
    for(const el of arr){
        if(fn(el)){
            return true
        }
    }
    return false;
}