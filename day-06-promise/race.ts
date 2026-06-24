export default function race<T>(ps:Promise<T>[]):Promise<T>{
    return new Promise((resolve,reject)=>{
        for(const p of ps) {
            p.then(res=> resolve(res)).catch((err)=> reject(err))
        }
    })
}