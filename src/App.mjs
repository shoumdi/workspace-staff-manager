import { AddModal } from "./components/AddModal.mjs"
import { AsigningModal } from "./components/AsigningModal.mjs";
import { DetailsModal } from "./components/DetailsModal.mjs";
import { RoomCard } from "./components/RoomCard.mjs";
import { StaffCard } from "./components/StaffCard.mjs";
import { Staff } from "./models/Staff.mjs";
import { service } from "./services/Service.mjs";


// window.addEventListener("beforeunload", e => {
//     e.preventDefault();
//     service.saveDataToLocalStorage();
//     console.log("called");

// })





/// events listeners
document.getElementById("add-worker").addEventListener("click", e => {
    e.stopPropagation();
    const newStaff = new Staff(
        service.getCurrentId(),
        "",
        null,
        "",
        "",
        "",
        "",
        [])
    const modal = new AddModal(newStaff);
    modal.show();
    modal.onConfirm(staff => {
        service.upsert(staff)
        document.getElementById("unassignedList").insertAdjacentHTML("beforeend", `<li>${StaffCard(staff)}</li>`);
    })
})
document.getElementById("plan").addEventListener("click", e => {
    
    if (e.target.closest("button")) {
        switch (e.target.closest("button").getAttribute("btnRole")) {
            case "asign-worker":
                assignerWorker(e.target.closest(`[zoneId]`).getAttribute("zoneId"));
                break;

            case "retirer":
                retirerWorker(
                    e.target.closest("article").getAttribute("id"),
                    e.target.closest(`[zoneId]`))
                break;

            default:
                break;
        }

    }
    // e.stopPropagation();

})


document.getElementById("unassignedList").addEventListener("click", e => {
    if (e.target.closest("button")) {                
        e.stopPropagation();        
        switch (e.target.closest("button").getAttribute("id")) {
            case "editStaff": editStaff(e.target.closest("article").getAttribute("staffId")); break;
            case "deleteStaff": deleteStaff(e.target.closest("article")); break;
        }
    } else if (e.target.closest("article")) {
        const staff = service.getStaffById(e.target.closest("article").getAttribute("staffId"));
        const modal = new DetailsModal(staff);
        modal.show();
    }

})



///manipulation functions
function deleteStaff(item) {
    if (service.deleteStaff(item.getAttribute("staffId"))) {
        document.getElementById("unassignedList").removeChild(item.closest("li"));
        console.log("deleted");
        
    }
}

function editStaff(id){
    const staff = service.getStaffById(id);
    const modal = new AddModal(staff);
    modal.show();
    modal.onConfirm(staff=>{        
        service.upsert(staff);
        renderUnassignedList()
    })
}




function assignerWorker(id) {    
    let room = service.getRoomById(id)
    const modal = new AsigningModal(service.getUnassignedStaffs(), room.name);
    modal.show();
    modal.onItemSelected(staffId => {
        const result = service.assignStaffToRoom(staffId, room)
        switch (result) {
            case 0: alert("room is full"); break;
            case 1: {
                const oldView = document.querySelector(`[zoneId="${room.id}"]`);
                assignTo(
                    document.getElementById("unassignedList"),
                    oldView.querySelector("ul"),
                    service.getStaffById(staffId))
                modal.removeView(staffId)
                oldView.querySelector("div").classList.remove("bg-red-500/30");
            }; break;
            case -1: alert("this room restricted"); break;
        }

    });
}

function retirerWorker(id, oldView) {
    const staff = service.retirerWorker(id);
    
    document.getElementById("unassignedList").insertAdjacentHTML("beforeend", `<li>${StaffCard(staff)}</li>`)
    oldView.querySelector("ul").removeChild(oldView.querySelector(`[id="${id}"]`).closest("li"));   
     
    if(["1","2","3","5"].includes(`${oldView.getAttribute("zoneId")}`) && service.isRoomEmpty(oldView.getAttribute("zoneId"))) oldView.querySelector("div").classList.add("bg-red-500/30");

}


/// rendring functions
function renderData() {
    renderUnassignedList();


    console.log(service.getAssignedStaffs());
    
    service.getAssignedStaffs().forEach((zone) => {
        let html = "";
        zone.members.forEach(s => {
            html += `<li class="shrink-1 basis[calc(50%-0.5rem)] list-none">${RoomCard(s)}</li>`;
        })
        const zoneView = document.querySelector(`[zoneId="${zone.zoneId}"]`);
        console.log(zoneView);
        
        if(zone.members.length> 0 && ["1","2","3","5"].includes(`${zone.zoneId}`)) zoneView.querySelector("div").classList.remove("bg-red-500/30");
        
        zoneView.querySelector("ul").innerHTML = html;

    })

}

function renderUnassignedList(){
    let htmlText = ""

    service.getUnassignedStaffs().forEach(staff => {
        htmlText += `<li>${StaffCard(staff)}</li>`;
    });
    document.getElementById("unassignedList").innerHTML = htmlText;
}

function assignTo(fromView, toView, staff) {
    fromView?.removeChild(fromView.querySelector(`[staffId="${staff.id}"]`).closest("li"));
    toView.insertAdjacentHTML("beforeend", `<li class="shrink-1 basis[calc(50%-0.5rem)]">${RoomCard(staff)}</li>`);
}



renderData();
