export default function mySum(arr:number[]):number {
    let res = 0
    for(const number of arr){
        res= res + number
    }
    return res

}