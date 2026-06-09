export default function mapValues<T, U>(obj: Record<string, T>, fn: (v: T) => U): Record<string, U> {
    const result:Record<string,U>={}
    for(const [k, v] of Object.entries(obj)) {
            result[k] = fn(v)
    }
    return result
}