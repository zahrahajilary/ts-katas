import { expect, test, it, describe } from "vitest";
import pip from './pip'

describe('test pip functionality', () => {

    test('run a simple test', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;
        const cal = pip(double, addTen);
        const res = cal(2)
        expect(res).toEqual(14)
    })

    test('order matters - left to right', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;

        const doubleFirst = pip(double, addTen);
        const addFirst = pip(addTen, double);

        expect(doubleFirst(3)).toEqual(16); // (3*2)+10
        expect(addFirst(3)).toEqual(26);    // (3+10)*2
    })

    test('handles a single function', () => {
        const double = (n: number) => n * 2;
        const cal = pip(double);
        expect(cal(5)).toEqual(10);
    })

    test('handles no functions - returns input unchanged', () => {
        const cal = pip<number>();
        expect(cal(7)).toEqual(7);
    })

    test('handles falsy value 0 correctly', () => {
        const double = (n: number) => n * 2;
        const addTen = (n: number) => n + 10;
        const cal = pip(double, addTen);
        expect(cal(0)).toEqual(10); // (0*2)+10 — this is the bug we caught earlier!
    })

    test('works with strings', () => {
        const toUpper = (s: string) => s.toUpperCase();
        const addExclaim = (s: string) => s + "!";
        const cal = pip(toUpper, addExclaim);
        expect(cal("hello")).toEqual("HELLO!");
    })

    test('each function only runs once (no double-invoke)', () => {
        let callCount = 0;
        const track = (n: number) => {
            callCount++;
            return n + 1;
        };
        const cal = pip(track, track, track);
        cal(0);
        expect(callCount).toEqual(3); // not 6
    })

})