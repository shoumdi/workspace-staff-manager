import { Experience } from "../models/Experience.mjs"

export const ExperienceCard = (experience ,includeDelete = true) => {    
    return `
            <div class="p-3 flex flex-col gap-2 bg-neutral-200 rounded-lg relative">
                ${(includeDelete)? `<button type="button" id="delete-exp" class="absolute top-0 end-0 m-2 text-red-400"><i name="removeExp" class="fa-regular fa-trash-can"></i></button>` : `` }
                <div>
                    <label for="company">Company</label><br>
                    <input value="${experience.company}" type"text" name="company" placeholder="write company name" class="w-full p-2 bg-neutral-50 border-1 border-neutral-300 rounded-lg" required>
                </div>

                <div>
                    <label for="experienceRole">Role</label><br>
                    <input value="${experience.role}" type"text" name="experienceRole" placeholder="write company name" class="w-full p-2 bg-neutral-50 border-1 border-neutral-300 rounded-lg" required>
                </div>

                <div>
                    <label for="dateStart">From</label><br>
                    <input  type="date" value=${experience.startDate} name="dateStart" class="w-full p-2 bg-neutral-50 border-1 border-neutral-300 rounded-lg" required>
                </div>

                <div>
                    <label for="dateEnd">To</label><br>
                    <input type="date" value=${experience.startDate} name="dateEnd" class="w-full p-2 bg-neutral-50 border-1 border-neutral-300 rounded-lg" required>
                </div>

            </div>`
}