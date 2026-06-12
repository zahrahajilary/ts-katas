export default function isEmpty(x: unknown): boolean {
    // 1. Nullish
    if (x === null || x === undefined) return true;

    // 2. Strings & arrays — both have `.length`
    if (typeof x === 'string' || Array.isArray(x)) return x.length === 0;

    // 3. Map & Set — use `.size`, not `.length` or `Object.keys`
    if (x instanceof Map || x instanceof Set) return x.size === 0;

    // 4. Plain objects — no own keys
    if (typeof x === 'object') return Object.keys(x).length === 0;

    // 5. Everything else (numbers, booleans) — not "empty," they're values
    return false
}