import { describe, it, expect } from "vitest";
import mergeFn from "./mergeFn";

describe("mergeFn", () => {
    it("merges flat objects with no overlap", () => {
        expect(mergeFn({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it("B overwrites A on overlapping keys", () => {
        expect(mergeFn({ a: 1, b: 2 }, { b: 99 })).toEqual({ a: 1, b: 99 });
    });

    it("two empty objects", () => {
        expect(mergeFn({}, {})).toEqual({});
    });

    it("does NOT mutate either input", () => {
        const a = { x: 1 };
        const b = { y: 2 };
        mergeFn(a, b);
        expect(a).toEqual({ x: 1 });
        expect(b).toEqual({ y: 2 });
    });

    // ── THE NESTED-OBJECT QUESTION ─────────────────────────────────────
    it("SHALLOW: nested object reference is SHARED with the input", () => {
        const a = { inner: { count: 1 } };
        const b = { other: "hi" };
        const merged = mergeFn(a, b);

        // Same reference — not a clone!
        expect(merged.inner).toBe(a.inner);

        // Mutating the result's nested also mutates the input
        merged.inner.count = 999;
        expect(a.inner.count).toBe(999); // 😱 input was touched
    });

    it("SHALLOW: B's nested object REPLACES A's, no recursive merge", () => {
        const a = { user: { name: "Zahra", age: 33 } };
        const b = { user: { name: "Sara" } };  // no `age`

        const merged = mergeFn(a, b);

        // `age` is gone — B's user totally replaced A's user
        expect(merged.user).toEqual({ name: "Sara" });
        expect("age" in merged.user).toBe(false);
    });

    it("arrays are also shallow — same reference", () => {
        const a = { tags: ["red", "blue"] };
        const b = { id: 1 };
        const merged = mergeFn(a, b);

        expect(merged.tags).toBe(a.tags); // same array reference
    });
});