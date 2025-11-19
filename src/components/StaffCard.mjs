export const StaffCard = (worker)=>{
    return `
        <article staffId="${worker.id}" class="p-2 flex gap-3 items-center bg-blue-50 rounded-lg border-1 border-neutral-300 hover:bg-blue-100">
                    <img src=${worker.photo} alt="staff imge"
                        class="size-10 rounded-full">
                    <div class="grow-1">
                        <h6 class="text-base font-medium">${worker.name}</h6>
                        <p class="text-neutral-600">${worker.role.name}</p>
                    </div>
                    <button id="editStaff" class="text-green-500"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button id="deleteStaff" class="text-red-500"><i class="fa-regular fa-trash-can"></i></button>
        </article>
    `
}