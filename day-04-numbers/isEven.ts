/*
is just appled on integer number
 */
export default function isEven(n:number):boolean {
    if (!Number.isInteger(n)) throw new Error(`isEven requires an integer, got ${n}`);
    return n % 2 === 0;
}