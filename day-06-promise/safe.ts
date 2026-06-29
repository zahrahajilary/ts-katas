type Result<T> = Promise<[Error, null] | [null, T]>
export default function safe<T>(p: Promise<T>): Result<T>{
   return new Promise ((resolve)=>{
     p.then(res=> resolve([null,res])
     ).catch((e:Error)=>resolve([e,null]))
   })
}