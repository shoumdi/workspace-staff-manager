import { Room } from "../models/Room.mjs";
import { STORAGE_KEY } from "../utils/Constants.mjs";
import { isNotEmpty, saveToLocalStorage } from "../utils/Helper.mjs";

export class Repository {
    constructor() {
        this.data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
            uid:0,
            staffs:[],
            rooms : [
            new Room("0","Conference",["0","1","2","3","4","5"],6,0),
            new Room("1","Reception",["0","3","4"],8,0),
            new Room("2","Servers",["1","3","4"],4,0),
            new Room("3","Security",["2","3","4"],3,0),
            new Room("4","Staff",["3","4","5"],4,0),
            new Room("5","Vault",["3"],3,0)]
        }
    }
    getRooms(){
        return this.data.rooms;
    }

    getStaffs(){
        return this.data.staffs;
    }
    
    getRoomById(id){        
        return this.data.rooms.find(r=>r.id === id);
    }
    getCurrentId(){
        return `${this.data.uid}`;
    }
    getData(){
        return isNotEmpty(this.data) ? this.data : JSON.parse(localStorage.getItem(this.storageKey));
    }

    getStaffs(){        
        return this.data.staffs;
    }
    getStaffById(id){
        return this.data.staffs.find(s=>s.id === id);
    }

    upsert(staff){
        const index = this.data.staffs.findIndex(s=>s.id===staff.id);
        if(index !==-1) this.data.staffs.splice(index,1,staff);
        else {
            this.data.staffs.push(staff);
            this.data.uid++;
        }
        this.saveDataToLocalStorage();
    }


    deleteStaff(id){                
        const index = this.data.staffs.findIndex(s=>s.id === id);        
        if (index == -1) return false;
        this.data.staffs.splice(index,1);
        return true;
    }

    saveDataToLocalStorage(){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(this.data));
    }

    
}

export const repository = new Repository();