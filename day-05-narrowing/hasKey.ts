/**
 * The O & Record<K, unknown> says:
 * "keep everything you already knew about obj,
 * AND now you also know it has key K." That's the standard pattern for
 * "I'm adding information, not replacing it."
 * The narrowing-day takeaway worth pocketing:
 * when you write a type predicate that adds knowledge to an object,
 * use an intersection with the original type (O & Record<K, unknown>),
 * not a replacement (Record<K, unknown>).
 * The pattern T & { newStuff } is everywhere in TypeScript — type guards,
 * mapped types, conditional types. Adding-not-replacing is the move. 🌱
 * @param obj
 * @param key
 */
export default function hasKey<T extends string,K extends object>(obj:K,key:T):obj is K & Record<T, unknown>{
    return Object.hasOwn(obj,key);
}