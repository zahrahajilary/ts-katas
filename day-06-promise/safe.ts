type Result<T> = Promise<[Error, null] | [null, T]>
export default async function safe<T>(p: Promise<T>): Result<T> {
    try {
        const res = await p;
        return [null, res];
    } catch(e) {
        return [e instanceof Error ? e : new Error(String(e)), null];
    }
}