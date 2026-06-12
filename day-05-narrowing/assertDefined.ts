/*
If this function returns (i.e., doesn't throw), then you, TypeScript, can treat x as type T for the rest of this scope."

 */
export default function assertDefined<T>(x: T | null | undefined): asserts x is T {
    if (x === null || x === undefined) {
        throw new Error("Expected value to be defined");
    }

}