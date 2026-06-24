//Start the original promise and a countdown timer at the same time.
// Whoever finishes first wins. If the timer fires first — throw a timeout error.
// If the promise resolves first — return its value.
export default function withTimeout<T>(p:Promise<T>,ms:number):Promise<T> {
    return new Promise<T>((resolve, reject) => {
        // Race 1: timer that rejects after ms
        setTimeout(() => {
            reject(new Error('Timeout'))
        }, ms)

        // Race 2: connect p to the outer promise
        p.then(resolve).catch(reject)
    })

}