/*

at runtime, Array.isArray(x) can only check "is this an array?"
 — it has no idea what's inside. The generic T doesn't exist at runtime;
 TypeScript's type information is erased before the code runs.
  So you can pass ["a", "b"] and say isMyArray<number>(x),
  the check passes, TS believes you, and the lie surfaces the moment
  you try to actually treat the strings as numbers.
  This is called an unsound type predicate —
  the type system trusts you but reality doesn't back you up.
 */
export default function isMyArray<T>(x:unknown,
                                     isItem:(v:unknown)=>v is T):x is T[]{
    return Array.isArray(x) && x.every(item => isItem(item));
}