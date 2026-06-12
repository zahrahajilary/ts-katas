/**
 * never as the return type matters too: since assertNever always throws,
 * it never returns a value. TypeScript needs to know this so the outer function (like area) doesn't complain that
 * its default branch doesn't return a number. The never return says "execution doesn't continue past this call."
 * @param x
 */
export default function assertNever(x: never): never {
    throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}