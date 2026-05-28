/**
 *
 * @param initVal the type of this param is same as return and acc in fn
 * @param arr T[] is a generic
 * @param fn the acc in here and outer one should have the same time so i consider as U
 * @return is same as acc in callback function
 */
export default function myReduce<T,U>(initVal:U,arr:T[],fn:(acc:U,el:T)=>U):U{
    let val:U=initVal;
    for(const el of arr){
        val=fn(val,el);
    }
    return val
}

[1,2, 3,5].reduce((a,b)=>a+b,0)