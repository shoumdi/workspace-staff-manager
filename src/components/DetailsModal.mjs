export class DetailsModal {
    constructor(staff) {
        this.staff = staff
    }



    show(){
            const view = `
                <div id="details-modal" class ="w-screen h-screen p-4 overflow-scroll
                     bg-black/30 absolute top-0 grid place-items-center">
                    <div class="w-[35vw] h-fit p-3 bg-white rounded-lg">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="p-4 col-span-1 bg-neutral-100 rounded-lg">
                                <img src = ${this.staff.photo} alt=${this.staff.name} class="size-12 rounded-full"></img>
                                <h6 class="font-medium">${this.staff.name}</h6>
                                <p>${this.staff.email}</p>
                            </div>

                            <div class="p-4 col-span-1 bg-neutral-100 rounded-lg">
                                <div class="grid grid-cols-2 gap-3 ">
                                    <p class="col-span-1 font-medium">Role</p>
                                    <p class="col-span-1">${this.staff.role.name}</p>
                                </div>
                                
                                <div class="grid grid-cols-2 gap-3 ">
                                    <p class="col-span-1 font-medium">Role</p>
                                    <p class="col-span-1">${this.staff.role.name}</p>
                                </div>

                                <div class="grid grid-cols-2 gap-3 ">
                                    <p class="col-span-1 font-medium">Role</p>
                                    <p class="col-span-1">${this.staff.role.name}</p>
                                </div>
                            </div>
                        </div>
                        <button id="close" class="mt-3 w-full py-2 px-3 bg-red-200 rounded-lg">Close</button>
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
    
        hide(){ document.body.removeChild(document.getElementById("details-modal"))}
}