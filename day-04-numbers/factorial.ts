export default function factorial(n:number,result:number=1){
    if(n<=1){
        return result
    }else {
        return factorial(n-1,n*result)
    }
}