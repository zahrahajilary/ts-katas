// the A & B return type works fine for your case,
// but if A and B had the same key with different value types ({x: number} and {x: string}),
// the intersection makes x into number & string = never,
// which is unusable. Spread types are actually smarter than intersections in modern TS,
// so dropping the : A & B annotation and letting TS infer would give a slightly more accurate type.
// Not worth
export default function mergeFn<A,B>(objA:A,objB:B):A&B {
    return {...objA,...objB}
}