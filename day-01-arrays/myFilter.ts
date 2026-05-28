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

    for (let i=0;i<arr.length;i++){
        let res = fn(arr[i] as T);
        console.log(res,'ress')
        if(res){
            console.log(arr[i],'arri')
            result.push(arr[i] as T)
        }
    }
    return result


}