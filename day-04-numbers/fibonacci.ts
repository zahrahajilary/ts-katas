export default function fibonacci(n:number):number{
    if(n===0 ){
        return 0;
    } else if(n <= 2){
        return 1;
    } else{
        return fibonacci(n-1)+fibonacci(n-2)
    }
}