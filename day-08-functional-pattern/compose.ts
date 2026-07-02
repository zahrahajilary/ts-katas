export default function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
    return function (x: T) {
        let res = x;
        for (const fn of [...fns].reverse()) {
            res = fn(res);
        }
        return res;
    };
}
/*
export default function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x);
}
 */