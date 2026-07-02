export default function pip <T>(...fns:Array<(x:T)=>T>):(x:T)=>T {
    return function (x) {
        let res = x;
        for (const fn of fns) {
                res =  fn(res);

        }
        return res;
    };
}

/*
or
export default function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduce((acc, fn) => fn(acc), x);
}
 */
