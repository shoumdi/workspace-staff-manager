import { repository } from "../repositories/Repository.mjs";

class Service{
    constructor(repo){
        this.repo = repo;
    }

    getRoomById(id){
        return repository.getRoomById(id);
    }
    getStaffs(){
        return this.repo.getStaffs();
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
    getUnassignedStaffs(){
        return this.repo.getStaffs();
    }

    deleteStaff(id){
        return this.repo.deleteStaff(id);
    }

    assignStaffToRoom(staffId,room){
        const staff = this.repo.getStaffById(staffId);
        
        if(room.members.length === room.maxPlaces) return 0;                
        if(room.allowedIds.findIndex(id=>id===staff.role.id)===-1) return -1;
        room.members.push(staffId);
        this.repo.updateRooms(room);
        return 1;
    }

    removeStaffFrom(){
        
    }

    editStaff(){
        
    }

}

export const service = new Service(repository);