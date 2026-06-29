//this function will call continuously if its return false all the time
//so its better to wrap it inside of setTimeout to call it in a specefic period
// If you baked the timeout inside waitUntil, you'd have a function that does
// two things, and you'd lose the flexibility to use either piece separately.
export default function waitUntil(pred:()=>boolean,intervalsMs:number):Promise<void>{
    return new Promise((resolve)=>{
       let timer = setInterval(()=>{
            const val = pred();
           if(val){
               clearInterval(timer);
               resolve()
           }
        },intervalsMs)

    })
}