export default function template(s:string,vars:Record<string,string>) {
    return s.replace(/{{\s*(\w+)\s*}}/g,(_,key)=>vars[key] ?? '')
}