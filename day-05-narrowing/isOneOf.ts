/*
standalone T like this => T[] is not valid generic syntax for a constraint
[] is a type of constructor, not a constraint
why we need the unknown[]
typescript loses precision
for example opts = ['a','b'] will become string[] and loses the constraint
without extends it means accept an array but i forget whats inside
T[number] is means the memeber of array
 string union from a list" pattern in TypeScript => <T extends readonly unknown[]>
 */
export default function isOneOf<T extends readonly unknown[]>(v:unknown,opts:T):v is T[number]{
    return opts.some((x)=>x ===v)

}