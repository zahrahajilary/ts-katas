// MUTATION TRAP: `const result = obj` does NOT copy the object.
// Both variables point to the SAME object in memory. Any mutation
// (delete, push, assignment) shows up on both.
//
// To get a real copy:
//   - Shallow:  { ...obj } or Object.assign({}, obj)
//   - Deep:structuredClone(obj)
//
// Senior rule: utility functions should be PURE — never mutate inputs.
// Mutation bugs are the worst kind: code "works" but corrupts state
// elsewhere in the system, often hours or days later.
//
// Always include "does NOT mutate input" as a test case for any function
// that takes an object or array
export default function omit<T,K extends keyof T>(obj:T,keys:K[]):Omit<T,K>{
    const result= {...obj}
    for(const key of keys){
        delete result[key]
    }
    return result as Omit <T,K>

}