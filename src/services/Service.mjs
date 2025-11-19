import { repository } from "../repositories/Repository.mjs";

class Service{
    constructor(repo){
        this.repo = repo;
    }

    getRoomById(id){
        return repository.getRoomById(id);
    }
    getUnassignedStaffs(){
        return this.repo.getStaffs().filter(s=>s.room===null);
    }

    getAssignedStaffs(){
        const obj = this.repo.getStaffs().filter(s=>s.room!==null).reduce((accu,s)=>{
            (accu[s.room] ||= []).push(s);
            return accu;
        },{})
        return Object.values(obj);
    }


    retirerWorker(id){
        const staff = this.repo.getStaffs().find(s=>s.id===id);
        if(!staff) return null;
        staff.room = null;
        this.repo.updateStaff(staff);
        return staff;
    }
    getStaffById(id){
        return this.repo.getStaffById(id);
    }
    getCurrentId(){
        return this.repo.getCurrentId();
    }
    addNewStaff(staff){
        this.repo.setNewStaff(staff);
    }

    deleteStaff(id){
        return this.repo.deleteStaff(id);
    }

    assignStaffToRoom(staffId,room){
        const staff = this.repo.getStaffById(staffId);
        
        if(room.staffCount === room.maxPlaces) return 0;                
        if(room.allowedIds.findIndex(id=>id===staff.role.id)===-1) return -1;
        staff.room = room.id;
        this.repo.updateStaff(staff);
        return 1;
    }

    removeStaffFrom(){
        
    }

    editStaff(){
        
    }

    saveDataToLocalStorage(){
        this.repo.saveDataToLocalStorage();
    }

}

export const service = new Service(repository);