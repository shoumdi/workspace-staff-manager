export const RoomCard = (staff) => {    
    return `
     <div class="p-1 flex gap-1 items-center bg-blue-50 rounded-lg border-1 border-neutral-300">
        <img src=${staff.photo} alt="staff imge"
              class="size-5 rounded-full">
            <div class="grow-1">
                <h6 class="text-xs font-medium line-clamp-1">${staff.name}</h6>
                <p class="text-xs text-neutral-600 line-clamp-1">${staff.role.name}</p>
                </div>
            <button class="text-red-500"><i class="fa-regular fa-trash-can"></i></button>
    </div>
    `
}