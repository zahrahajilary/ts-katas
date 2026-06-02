/**
 * capitalize the first letter of a string
 * @param str
 * @return string
 */
export default function capitalize(str: string): string {
    const arr:string[] = str.split(' ');
    for(let i=0;i<arr.length;i++){
        arr[i] =(arr[i] as string).charAt(0).toUpperCase()+(arr[i] as string).substring(1)
    }
    return arr.join(' ')
}