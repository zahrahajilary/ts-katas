export default function truncateString(input: string, number: number): string {
    if(input.length<=number){
        return input
    }else {
        return input.slice(0,number)+'...'
    }
}