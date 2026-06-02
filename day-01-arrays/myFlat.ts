export default function myFlat<T>(arr:(T|T[])[]):T[]{
    const result:T[] = [];
    function checkIsArray(array:(T|T[])[]){
        for(const item of array){
            if(!Array.isArray(item)){
                result.push(item)
            } else {
                checkIsArray(item)
            }
        }
    }
    checkIsArray(arr)
    return result
}