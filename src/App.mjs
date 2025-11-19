import { AddModal } from "./components/AddModal.mjs"
import { AsigningModal } from "./components/AsigningModal.mjs";
import { RoomCard } from "./components/RoomCard.mjs";
import { StaffCard } from "./components/StaffCard.mjs";
import { service } from "./services/Service.mjs";



function renderData() {
    let htmlText = ""

    service.getStaffs().forEach(staff => {
        htmlText += `<li>${StaffCard(staff)}</li>`;
    });
    document.getElementById("unassignedList").insertAdjacentHTML("beforeend", htmlText);
}



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
        let room = service.getRoomById(e.target.closest("div").getAttribute("id"))
        const modal = new AsigningModal(service.getStaffs(),room.name);
        modal.show();
        modal.onItemSelected(staffId => {
            const result = service.assignStaffToRoom(staffId,room)  
                                console.log(room);
          
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

})


document.getElementById("unassignedList").addEventListener("click", e => {
    const target = e.target.closest("button");

    switch (target.getAttribute("id")) {
        case "editStaff": alert("not implemented"); break;
        case "deleteStaff": deleteStaff(target.closest("article")); break;
    }
})

function deleteStaff(item) {
    if (service.deleteStaff(item.getAttribute("staffId"))) {
        document.getElementById("unassignedList").removeChild(item.closest("li"));
    }
}

renderData();

function assignTo(fromView,toView,staff){        
    fromView?.removeChild(fromView.querySelector(`[staffId="${staff.id}"]`).closest("li"));
    toView.insertAdjacentHTML("beforeend",`<li class="shrink-1 basis[calc(50%-0.5rem)]">${RoomCard(staff)}</li>`);
}