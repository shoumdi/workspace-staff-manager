import { AddModal } from "./components/AddModal.mjs"
import { AsigningModal } from "./components/AsigningModal.mjs";
import { DetailsModal } from "./components/DetailsModal.mjs";
import { RoomCard } from "./components/RoomCard.mjs";
import { StaffCard } from "./components/StaffCard.mjs";
import { service } from "./services/Service.mjs";


window.addEventListener("unload",e=>{
    e.preventDefault();
    service.saveDataToLocalStorage();
})





/// events listeners
document.getElementById("add-worker").addEventListener("click", e => {
    e.stopPropagation();
    const modal = new AddModal(service.getCurrentId());
    modal.show();
    modal.onConfirm(staff => {
        service.addNewStaff(staff)
        document.getElementById("unassignedList").insertAdjacentHTML("beforeend", `<li>${StaffCard(staff)}</li>`);
    })
})
document.getElementById("plan").addEventListener("click", e => {
    e.stopPropagation();
    if (e.target.closest("button")) { 
        
        switch (e.target.closest("button").getAttribute("btnRole")) {
            case "asign-worker":
                assignerWorker(e.target.closest("div").getAttribute("id"));
                break;

            case "retirer":
                retirerWorker(e.target.closest("article").getAttribute("id"),e.target.closest("article").closest("div").getAttribute("id"))
                break;
        
            default:
                break;
        }
        
    }

})


document.getElementById("unassignedList").addEventListener("click", e => {
    if(e.target.closest("button")){
        e.stopPropagation();
        switch (target?.getAttribute("id")) {
        case "editStaff": alert("not implemented"); break;
        case "deleteStaff": deleteStaff(target.closest("article")); break;
    }
    } else if(e.target.closest("article")){        
        const staff = service.getStaffById(e.target.closest("article").getAttribute("staffId"));        
        const modal = new DetailsModal(staff);
        modal.show();
    }
    
})



///manipulation functions
function deleteStaff(item) {
    if (service.deleteStaff(item.getAttribute("staffId"))) {
        document.getElementById("unassignedList").removeChild(item.closest("li"));
    }
}





function assignerWorker(id){
    let room = service.getRoomById(id)
        const modal = new AsigningModal(service.getUnassignedStaffs(),room.name);
        modal.show();
        modal.onItemSelected(staffId => {
            const result = service.assignStaffToRoom(staffId,room)            
            switch(result){
                case 0: alert("room is full"); break;
                case 1: {    
                                    
                    assignTo(
                        document.getElementById("unassignedList"),
                        document.getElementById(room.id).querySelector("ul"),
                        service.getStaffById(staffId))
                } ;break;
                case -1: alert("this room restricted"); break;
            }
            
        });
}

function retirerWorker(id,oldViewId){    
    const staff = service.retirerWorker(id);
    
    const oldView = document.getElementById(oldViewId).querySelector("ul");

    document.getElementById("unassignedList").insertAdjacentHTML("beforeend",`<li>${StaffCard(staff)}</li>`)
    oldView.removeChild(document.getElementById(id).closest("li"));
    
    
}


/// rendring functions
function renderData() {
    let htmlText = ""

    service.getUnassignedStaffs().forEach(staff => {
        htmlText += `<li>${StaffCard(staff)}</li>`;
    });
    document.getElementById("unassignedList").insertAdjacentHTML("beforeend", htmlText);
    
    

    service.getAssignedStaffs().forEach((list,key)=>{
        let html = "";
        list.forEach(s=>{            
            console.log(s);
            
            html+=`<li class="shrink-1 basis[calc(50%-0.5rem)] list-none">${RoomCard(s)}</li>`;
        })

        document.getElementById(key).querySelector("ul").innerHTML = html;
        
    })
    
}

function assignTo(fromView,toView,staff){        
    fromView?.removeChild(fromView.querySelector(`[staffId="${staff.id}"]`).closest("li"));
    toView.insertAdjacentHTML("beforeend",`<li class="shrink-1 basis[calc(50%-0.5rem)]">${RoomCard(staff)}</li>`);
}



renderData();
