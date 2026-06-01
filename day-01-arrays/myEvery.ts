/**
 * T is generic type
 * @param arr - T[]
 * @param fn - (el:T)=>boolean
 *@return - boolean
 */


export default function myEvery<T>(arr:T[],fn:(el:T)=>boolean):boolean {
  for(const item of arr){
      if(!fn(item)){
          return false
      }
  }
  return true
}