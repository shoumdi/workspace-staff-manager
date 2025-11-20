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
    e.stopPropagation();
    if (e.target.closest("button")) {

        switch (e.target.closest("button").getAttribute("btnRole")) {
            case "asign-worker":
                assignerWorker(e.target.closest("div").getAttribute("id"));
                break;

            case "retirer":
                retirerWorker(e.target.closest("article").getAttribute("id"), e.target.closest("article").closest("div").getAttribute("id"))
                break;

            default:
                break;
        }

    }

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

                assignTo(
                    document.getElementById("unassignedList"),
                    document.getElementById(room.id).querySelector("ul"),
                    service.getStaffById(staffId))
                    document.getElementById(room.id).classList.remove("bg-red-500/30");
            }; break;
            case -1: alert("this room restricted"); break;
        }

    });
}

function retirerWorker(id, oldViewId) {
    const staff = service.retirerWorker(id);

    const oldView = document.getElementById(oldViewId).querySelector("ul");

    document.getElementById("unassignedList").insertAdjacentHTML("beforeend", `<li>${StaffCard(staff)}</li>`)
    oldView.removeChild(document.getElementById(id).closest("li"));

    console.log(service.isRoomEmpty(oldViewId));
    
    if(service.isRoomEmpty(oldViewId)) document.getElementById(oldViewId).classList.add("bg-red-500/30");

}


/// rendring functions
function renderData() {
    renderUnassignedList();


    service.getAssignedStaffs().forEach((list, key) => {
        let html = "";
        list.forEach(s => {
            html += `<li class="shrink-1 basis[calc(50%-0.5rem)] list-none">${RoomCard(s)}</li>`;
        })
        const zone = document.getElementById(key);
        if(list.length> 0) zone.classList.remove("bg-red-500/30");
        
        zone.querySelector("ul").innerHTML = html;

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
