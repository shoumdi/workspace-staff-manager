
export function isNotEmpty(arr) {
    return arr.length > 0 ;
}

export function saveToLocalStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}