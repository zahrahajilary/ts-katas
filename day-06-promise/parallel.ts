export default function parallel<T>(ps: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        let completed =0
        for (let i = 0; i < ps.length; i++) {
            ps[i]?.then(value => {
                results[i] = value  // store at correct index
                completed++

                if (completed === ps.length) {
                    resolve(results)  // ALL done — resolve now
                }
            }).catch(reject)  // if ANY fails — reject immediately
        }
    })
}