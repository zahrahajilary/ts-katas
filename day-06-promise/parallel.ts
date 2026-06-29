export default function parallel<T>(ps: Promise<T>[]): Promise<T[]> {
    if(ps.length === 0) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        let completed =0
        if(ps.length === 0) return Promise.resolve([]);
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