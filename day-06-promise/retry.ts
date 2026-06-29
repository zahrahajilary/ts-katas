import sleep from "./sleep";

export default async function retry <T>(fn:()=>Promise<T>,attempts:number=5,delayMs:number=100):Promise<T>{
    let count = 0;
    while(count < attempts){
          try {
              return await fn();
          }
          catch (e) {
              count ++;
              if(count === attempts){
                  throw e;
              }else {
                 await sleep(delayMs)

              }
          }
        }
    throw new Error("retry: exhausted all attempts");

}