import { DELAY } from "./Constants.mjs";

export function isNotEmpty(arr) {
    return arr.length > 0 ;
}

export async function isImgUrl(url) {
   try{
    const res = await fetch(url, {method: 'HEAD'});
    return res.headers.get('Content-Type').startsWith('image')
  }catch(e){
    return false;
  }
}

export function saveToLocalStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}


export function validate(text,reg){
    return text !== "" && reg.test(text);
}

export function debounce(callback,delay = DELAY){
    let timer;
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(()=>{
           callback.apply(this,args); 
        },delay);   
    }
}