export default function isEmpty(obj:object):boolean{
  if(Object.keys(obj).length == 0){
      return true
  }else{
      return false
  }
}