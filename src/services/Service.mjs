import { repository } from "../repositories/Repository.mjs";

class Service{
    constructor(repo){
        this.repo = repo;
    }

    getRoomById(id){
        return repository.getRoomById(id);
    }

    isRoomEmpty(id){
        return this.repo.getStaffs().filter(s=> s.room === id).length === 0;
    }
    getUnassignedStaffs(){
        return this.repo.getStaffs().filter(s=>s.room===null);
    }

    getAssignedStaffs(){
        const obj = this.repo.getStaffs().filter(s=>s.room!==null).reduce((accu,s,index)=>{
            (accu[index] ||= {zoneId:s.room,members:[]}).members.push(s);
            return accu;
        },{})
        return Object.values(obj);
    }


    retirerWorker(id){
        const staff = this.repo.getStaffs().find(s=>s.id===id);
        if(!staff) return null;
        staff.room = null;
        this.repo.upsert(staff);
        return staff;
    }
    getStaffById(id){
        return this.repo.getStaffById(id);
    }
    getCurrentId(){
        return this.repo.getCurrentId();
    }
    upsert(staff){
        this.repo.upsert(staff);
    }

    deleteStaff(id){
        return this.repo.deleteStaff(id);
    }

    assignStaffToRoom(staffId,room){
        const staff = this.repo.getStaffById(staffId);
        
        if(room.staffCount === room.maxPlaces) return 0;                
        if(room.allowedIds.findIndex(id=>id===staff.role.id)===-1) return -1;
        staff.room = room.id;
        this.repo.upsert(staff);
        return 1;
    }
    saveDataToLocalStorage(){
        this.repo.saveDataToLocalStorage();
    }

}

export const service = new Service(repository);