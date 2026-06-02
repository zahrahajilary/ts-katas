/**
 *
 * @param arr - T[]
 * @return - T[]
 */
export default function myReverse<T>(arr:T[]):T[] {
    const reversedArr:T[] = []
    for(let i=arr.length-1;i>=0;i--){
        reversedArr.push(arr[i] as T)
    }
    return reversedArr
}