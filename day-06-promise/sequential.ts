export default async function sequential <T>(tasks:(()=>Promise<T>)[]):Promise<T[]>{
    const results:T[] = []
    for(const task of tasks){
        const value = await task()
        results.push(value)
    }
    return results
}