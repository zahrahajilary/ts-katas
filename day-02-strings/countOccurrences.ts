/**
 * Count NON-OVERLAPPING occurrences of `sub` in `str`.
 * @example countOccurrences("banana", "an") // → 2
 * how to solve it:
 *
 * 1. Check if `sub` is empty, return 0 if true.
 * 2. Initialize count and index variables.
 * 3. Iterate through `str` with a while loop until reaching the end.
 * 4. Check if current substring matches `sub`.
 * 5. If match, increment count and move index by `sub` length.
 * 6. If no match, increment index by 1.
 * 7. Return final count.
 */
export default function countOccurrences(str: string, sub: string): number {
    if (sub.length === 0) return 0;
    let count = 0;
    let i = 0;
    //maybe we have more than one sub so we have to continue until we reach the end
    while (i <= str.length - sub.length) {
        if (str.slice(i, i + sub.length) === sub) {
            count++;
            i += sub.length;
        } else {
            i++;
        }
    }
    return count;
}