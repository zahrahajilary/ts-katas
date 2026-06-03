
export default function isPalindrome(str: string): boolean {
    let i =0
    let j=str.length-1
    while(i<=j){
        if(str[i]!==str[j]){
            return false
        }
        j--;
        i++
    }
    return true
}