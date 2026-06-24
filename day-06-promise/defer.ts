interface Deffer <T>{
    promise: Promise<T>;
    resolve: (v: T) => void;
    reject: (e: unknown) => void
}
export default function defer<T>(): Deffer <T>{
    const deffer = {} as Deffer<T>
    deffer.promise = new Promise((resolve,reject)=>{
        deffer.resolve = resolve;
        deffer.reject =reject;
    })
    return deffer

}