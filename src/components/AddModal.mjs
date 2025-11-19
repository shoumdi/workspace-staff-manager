import { Experience } from "../models/Experience.mjs";
import { Role } from "../models/Role.mjs";
import { Staff } from "../models/Staff.mjs";
import { COMPANY_ERR, Email_ERR, EMAIL_REG, NAME_ERR, NAME_REG, PHONE_ERR, PHONE_REG, PHOTO_URL_ERR, ROLE_ERR, URL_REG } from "../utils/Constants.mjs";
import { debounce, isImgUrl, validate } from "../utils/Helper.mjs";
import { ExperienceCard } from "./ExperienceCard.mjs";

export class AddModal {
    constructor(workerId) {
        this.workerId =  workerId;
        this.debouncer = debounce( (element)=>{this.#validateInput(element)});
        this.validInput = 0;
    }


    show() {
        const view =  `
            <div id="add-worker-modal" class ="w-screen h-screen p-4 overflow-scroll
                 bg-black/30 absolute top-0 grid place-items-center">
                <div class="w-[35vw] h-fit p-3 bg-white rounded-lg">
                    <h4 class="font-semibold">Add new worker</h4>
                    <form id="add-worker-form" class="mt-3 flex flex-col gap-2" action="">
                        <div>
                            <label for"name">Name</label><br>
                            <input type="text" name="name" placeholder="write a name" class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                            <span class="text-sm text-pink-700"></span>
                            </div>

                        <div>
                            <label for"email">Email</label><br>
                            <input type="email" name="email" placeholder="example@domain.com" class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                            <span class="text-pink-700"></span>
                        </div>

                        <div>
                            <label for"phone">Phone</label><br>
                            <input type="phone" name="phone" placeholder="06000000" class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                            <span class="text-pink-700"></span>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <div class="grow-1">
                                <label for"photo">Photo</label><br>
                                <input type="url" name="photo" placeholder="http://..." class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                                <span class="font-xs text-pink-700"></span>
                            </div>
                            <img id="form-img" src="../src/assets/images/default_pfp.png" class="mt-6 size-10 rounded-full">  
                        </div>

                        <div>
                            <label for"role">Role</label><br>
                            <select name="role" class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                                <option selected hidden>Select a role</option>
                                <option value="0 Reciptionist">Reciptionist</option>
                                <option value="1 Techniciens IT">Techniciens IT</option>
                                <option value="2 Security">Security</option>
                                <option value="3 Manager">Manager</option>
                                <option value="4 Nettoyage">Nettoyage</option>
                                <option value="5 autre">autre</option>
                            </select>
                        </div>

                        

                        
                        <fieldset>Experiences</fieldset>
                        <div id="experienceList" class="flex flex-col gap-2">${ExperienceCard(false)}</div>
                        
                        <input name="addExp" type="button" value="Add Experience" class="w-full py-2 px-4 bg-yellow-600 text-white rounded-lg">
                        <input name="submit" type="submit" value="add worker" class="mt-6 w-full px-4 py-2 bg-black text-white rounded-lg">
                        <input name="annuler" type="button" value="annuler" class=" w-full px-4 py-2 border-2 border-black text-black rounded-lg">
                    </form>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML("beforeend",view);

        document.forms["add-worker-form"].addEventListener("input",e=>{
            this.debouncer(e.target)
            
        })
            
        document.forms["add-worker-form"].addEventListener("click",  (e) => {
            switch (e.target.getAttribute("name")) {
                case "removeExp": document.getElementById("experienceList").removeChild(e.target.closest("div")); break;
                case "addExp": document.getElementById("experienceList").insertAdjacentHTML("beforeend",ExperienceCard()); break;
                case "annuler": this.#hide(); break;
                default: break;
            }
        })
    }


    onConfirm(callback){
        document.forms["add-worker-form"].addEventListener("submit",(e)=>{
            e.preventDefault();
            const formData = new FormData(document.forms["add-worker-form"]);          
            
            
            const roleValue = formData.get("role").split(" ");
            let staff = new Staff(
                this.workerId,
                formData.get("name").trim(),
                new Role(roleValue[0],roleValue[1]),
                formData.get("photo").trim(),
                formData.get("email").trim(),
                null,
                formData.get("phone").trim(),
                []
            );

            const companies = formData.getAll("company");
            const roles = formData.getAll("experienceRole");
            const startDates = formData.getAll("dateStart");
            const endDates = formData.getAll("dateEnd");
            
            const experiences = [];
            const expLength = companies.length;
            for(let i=0;i<expLength;i++)
                experiences.push(new Experience(
                    `${i}`,
                    companies[i],
                    roles[i],
                    startDates[i],
                    endDates[i],
                ))
            staff.experiences = experiences;

            callback(staff);
            this.#hide();
        })
    }

    #hide(){
        document.body.removeChild(document.getElementById("add-worker-modal"));
    }

    async #validateInput(input){
        switch(input.getAttribute("name")){
            case "name": this.#validate(input,NAME_ERR,NAME_REG) ; break;
            case "email": this.#validate(input,Email_ERR,EMAIL_REG); break;
            case "photo": await this.#validatePhoto(input); break;
            case "phone": this.#validate(input,PHONE_ERR,PHONE_REG); break;
            case "company": this.#validate(input,COMPANY_ERR,NAME_REG); break;
            case "experienceRole": this.#validate(input,ROLE_ERR,NAME_REG); break; 
        } 

    }

    #validate(input,err,reg){
        if(validate(input.value,reg)) {            
            input.nextElementSibling.innerText ="";
        }
        else {                        
           input.nextElementSibling.innerText = err; 
        }        
    }

    async #validatePhoto(input){
        if(input.value && (URL_REG.test(input.value) || await isImgUrl(input.value))){
            input.closest("div").nextElementSibling.src = input.value;
            input.nextElementSibling.innerText = ""
            return;
        }        
        input.nextElementSibling.innerText = "This image url not valid"
    }
}