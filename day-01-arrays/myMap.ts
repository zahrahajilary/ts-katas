/**
 * myMap needs generics because it works on arrays of ANY type —
 * I don't know the element type until someone calls it.
 *
 * T = the type of the elements in the input array.
 *     It must match the callback's input, because each element
 *     is what gets passed into fn.
 * U = the type the callback returns. It can be different from T
 *     (that's the whole point of map — it transforms).
 *     So the final result is U[].
 *
 * Flow: T comes in from arr → fn turns each T into a U → return U[].
 *
 * @param arr - the input array, of type T[]
 * @param fn  - callback taking a T, returning a U
 * @returns a new array of U (the transformed values)
 *
 * @example
 * myMap([1, 2, 3], n => n.toString()) // T = number, U = string → ["1","2","3"]
 */
export default function myMap<T,U>(arr:T[],fn:(el:T)=>U):U[]{
  let result:U[]=[];
  for(let i=0;i<arr.length;i++){
     result.push(fn(arr[i] as T))
  }
  return result
}

