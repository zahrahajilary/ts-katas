import { expect, test, it, describe } from "vitest";
import compose from './compose'
import pip from './pip'

describe('test compose functionality', () => {

    test('run a simple test', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;
        const cal = compose(double, addTen);
        const res = cal(2)
        expect(res).toEqual(14) // addTen(2)=12, double(12)=24... wait, check below
    })

    test('order is right-to-left', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;

        const composed = compose(double, addTen); // addTen runs FIRST, then double
        const piped = pip(double, addTen);          // double runs FIRST, then addTen

        expect(composed(3)).toEqual(26); // (3+10)*2
        expect(piped(3)).toEqual(16);    // (3*2)+10
    })

    test('compose and pip give same result with fns reversed', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;

        expect(compose(double, addTen)(3)).toEqual(pip(addTen, double)(3));
    })

    test('handles a single function', () => {
        const double = (n: number) => n * 2;
        const cal = compose(double);
        expect(cal(5)).toEqual(10);
    })

    test('handles no functions - returns input unchanged', () => {
        const cal = compose<number>();
        expect(cal(7)).toEqual(7);
    })

    test('handles falsy value 0 correctly', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;
        const cal = compose(double, addTen);
        expect(cal(0)).toEqual(20); // addTen(0)=10, double(10)=20
    })

    test('does not mutate the original fns array', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;
        const fns = [double, addTen];
        compose(...fns)(5);
        expect(fns[0]).toBe(double); // order in original array untouched
        expect(fns[1]).toBe(addTen);
    })

})