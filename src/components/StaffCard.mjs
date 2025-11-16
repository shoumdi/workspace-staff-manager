export const StaffCard = ()=>{
    return `
        <div class="p-2 flex gap-3 items-center bg-blue-50 rounded-lg border-1 border-neutral-300">
                    <img src="../src/assets/images/default_pfp.png" alt="staff imge"
                        class="size-10 rounded-full">
                    <div class="grow-1">
                        <h6 class="text-base font-medium">Yassine err</h6>
                        <p class="text-neutral-600">Security</p>
                    </div>
                    <button class="text-green-500"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="text-red-500"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    `
}