/*
i had a mistake over here when i wanted to add a recursive i forget to assign it to a key so its break :D
have to be carful more
 */
export function deepClone<T>(obj: T): T {
    let result: T;
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    result = Array.isArray(obj) ? [] as T : {} as T;

    for (const key in obj) {
        if (typeof obj[key] !== 'object') {
            result[key] = obj[key]
        } else {
            result [key] = deepClone(obj[key])
        }
    }
    return result
}