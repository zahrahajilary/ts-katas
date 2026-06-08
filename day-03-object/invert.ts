export default function invert<V extends string | number>(obj:Record<string, V>):Record<V,string> {
    const result: Record<V, string>={} as Record<V, string>;
    for (const [key, value] of Object.entries(obj)) {
        result[value] = key
    }
    return result
}