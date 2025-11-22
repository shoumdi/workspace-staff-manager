import { StaffCard } from "./StaffCard.mjs";

export class AsigningModal {
    constructor(workers,roomName) {
        this.workers = workers;
        this.roomName = roomName;
    }

    show(){
        const view = `
            <div id="assign-worker-modal" class ="grid place-items-center size-full  
                 bg-black/60 fixed top-0 overflow-y-scroll md:p-4">
                <div class="w-[90vw] h-fit p-3 bg-white rounded-lg md:w-[35vw]">
                    <h4 class="font-semibold">Select Worker To Assign <span class="text-neutral-600">(${this.roomName})</spane></h4>
                    <ul id="workers-list" class="my-4 flex flex-col gap-2">
                        ${this.workers.map(w=> `<li>${StaffCard(w)}</li>`).join("")}
                    </ul>
                    <button id="close" class="w-full py-2 px-3 bg-red-200 rounded-lg">Close</button>
                </div>
            </div> `
        document.body.insertAdjacentHTML("beforeend",view); 

        document.getElementById("close").addEventListener("click",this.hide);
    }

    onItemSelected(callback){
        document.getElementById("workers-list").addEventListener("click",e=>{
            callback(e.target.closest("article").getAttribute("staffId"));
        })
    }

    hide(){ document.body.removeChild(document.getElementById("assign-worker-modal"))}

    removeView(staffId){
        const workersList = document.getElementById("workers-list");
        workersList.removeChild(workersList.querySelector(`[staffId="${staffId}"]`).closest("li"));
    }
}