
// JavaScript equality cheat sheet:
//   Set, Map keys, ===  →  primitives by VALUE, objects by REFERENCE
//   This is "SameValueZero" equality (used by Set and Map).
//
// So `new Set([{id:1}, {id:1}]).size === 2` is correct, surprising JS behavior.
// To dedupe objects by content, you need a keyFn (lodash calls this uniqBy).
//
// Bigger lesson: when a test fails, ASK "is my code wrong, or is my
// expectation wrong?" Sometimes the function is honest about what it does
// and the test was demanding more than the function promised.
export default function unique<T>(arr: T[], keyFn?: (item: T) => unknown): T[] {
    if (!keyFn) {
        return Array.from(new Set(arr));   // primitive path
    }
    const seen = new Set<unknown>();
    const result: T[] = [];
    for (const item of arr) {
        const key = keyFn(item);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
        }
    }
    return result;
}