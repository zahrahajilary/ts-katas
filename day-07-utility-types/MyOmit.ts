//in ts we dont have ! for excluding but directly we have Exclude
// type Keys = "name" | "age" | "email"
//
// type WithoutName = Exclude<Keys, "name">
// → "age" | "email"

type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K >]:T[P]
}