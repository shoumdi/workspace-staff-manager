import { Room } from "../models/Room.mjs";
import { ID_KEY, STORAGE_KEY } from "../utils/Constants.mjs";
import { isNotEmpty, saveToLocalStorage } from "../utils/Helper.mjs";

export class Repository {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = [];
        this.rooms = [
            new Room("0","Conference",["0","1","2","3","4","5"],6,[]),
            new Room("1","Reception",["0","3","4"],8,[]),
            new Room("2","Servers",["1","3","4"],4,[]),
            new Room("3","Security",["2","3","4"],3,[]),
            new Room("4","Staff",["3","4","5"],4,[]),
            new Room("5","Vault",["3"],3,[])
        ]
        this.staffs= JSON.parse(localStorage.getItem(storageKey)) || [];
        this.currentId = parseInt(localStorage.getItem(ID_KEY)) || 0;
    }
    getRooms(){
        return this.rooms;
    }
    getRoomById(id){        
        return this.rooms.find(r=>r.id === id);
    }
    getCurrentId(){
        return `${this.currentId}`;
    }
    getData(){
        return isNotEmpty(this.data) ? this.data : JSON.parse(localStorage.getItem(this.storageKey));
    }

    getStaffs(){        
        return this.staffs;
    }
    getStaffById(id){
        return this.staffs.find(s=>s.id === id);
    }

    setData(newData){
        this.data.push(newData);
        saveToLocalStorage(this.storageKey,this.data);
    }

    updateRooms(room){
        this.rooms.find(r=>r.id===room.id).members = room.members;
    }

    setNewStaff(staff){
        this.staffs.push(staff);
        saveToLocalStorage(this.storageKey,this.staffs);
        this.currentId++;
        localStorage.setItem(ID_KEY,`${this.currentId}`);
    }


    deleteStaff(id){                
        const index = this.staffs.findIndex(s=>s.id === id);        
        if (index == -1) return false;
        this.staffs.splice(index,1);
        saveToLocalStorage(this.storageKey,this.staffs);
        return true;
    }

    
}

export const repository = new Repository(STORAGE_KEY);