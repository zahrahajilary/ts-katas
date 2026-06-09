// Two notes:
//
//     == → === (tiny style nit).
//     Doesn't matter in this case because Object.keys(...).length is always a number and you're comparing to a number,
//     but the habit is: always strict equality unless you have a specific reason.
//     Some linters flag every == automatically.
//     Map and Set look "empty" even when they aren't. This one's sneaky and worth knowing about:
//
//     tsconst m = new Map([["a", 1]]);
// isEmpty(m);  // true  😬  but m.size === 1
// isEmpty(new Set([1, 2, 3]));  // true  😬  but set.size === 3
// Object.keys reads own enumerable string properties. Maps and Sets don't store their contents that way — they have internal [[MapData]] slots. For a kata called isEmpty on plain objects this is fine. If you ever wanted it to work for collections, you'd need 'size' in obj ? obj.size === 0 : Object.keys(obj).length === 0. Don't add that unless the kata asks for it; just file it away.
export default function isEmpty(obj:object):boolean{
  return Object.keys(obj).length == 0;
}