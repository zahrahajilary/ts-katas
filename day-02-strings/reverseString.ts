export default function reverseString(str: string): string {
    const arr = str.split('');
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        const temp = arr[i];
        arr[i] = arr[arr.length - 1 - i]!;
        arr[arr.length - 1 - i] = temp!;
    }
    return arr.join('');
}

console.log(reverseString('hello'))
