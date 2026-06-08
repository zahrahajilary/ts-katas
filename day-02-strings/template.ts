// String.replace(pattern, callbackFn) is wildly powerful:
//   - With a regex + /g flag, callback runs once per match
//   - Callback signature: (fullMatch, ...captures, offset, wholeString)
//   - Capture groups (parens in the regex) become args 2, 3, 4, ...
//   - Whatever you return gets spliced in as the replacement
//
// Use `_` for params you don't care about — common JS convention.
// Use `??` not `||` when falling back on missing values.

export default function template(s:string,vars:Record<string,string>) {
    return s.replace(/{{\s*(\w+)\s*}}/g,(_,key)=>vars[key] ?? '')
}