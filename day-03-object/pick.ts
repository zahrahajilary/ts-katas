// LESSON: when you have a function that takes (collection, subset),
// iterate the SUBSET, not the collection. Two benefits:
//
//   1. TYPES: the subset is more narrowly typed (K vs keyof T),
//      so you avoid casts. for...in gives you a generic key; the
//      subset array gives you the specific key.
//
//   2. PERFORMANCE: iterating n items beats iterating m items and
//      filtering by n each time. O(n) vs O(m*n).
//
// More broadly: `for...in` loses type info on object keys. Prefer:
//   - `for (const key of Object.keys(obj))` if you need all keys
//   - `for (const key of someKeysArray)` if you have a typed subset
export default function pick<T,K extends keyof T>(obj:T,keys:K[]):Pick<T,K>{
    const result:Pick<T,K>={} as Pick<T,K>;
    for(const key of keys){
       result[key]=obj[key]
    }
    return result
}