import { STORAGE_KEY } from "../utils/Constants.mjs";
import { isNotEmpty, saveToLocalStorage } from "../utils/Helper.mjs";

export class Repository {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = [];
    }

    getData(){
        return isNotEmpty(this.data) ? this.data : JSON.parse(localStorage.getItem(this.storageKey));
    }

    setData(newData){
        this.data.push(newData);
        saveToLocalStorage(this.storageKey,this.data);
    }

    
}

export const repository = new Repository(STORAGE_KEY);