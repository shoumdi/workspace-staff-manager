import { Experience } from "./Experience.mjs";

export class AddModal {
    constructor(view) {
        this.view = view;
    }


    show() {
        document.body.innerHTML += `
            <div id="add-worker-modal" class ="w-screen h-screen p-4 overflow-scroll
                 bg-black/30 absolute top-0 grid place-items-center">
                <div class="w-[35vw] h-fit p-3 bg-white rounded-lg">
                    <h4 class="font-semibold">Add new worker</h4>
                    <form id="add-worker-form" class="mt-3 flex flex-col gap-2" action="">
                        <div>
                            <label for"name">Name</label><br>
                            <input type="text" name="name" placeholder="write a name" class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                        </div>

                        <div>
                            <label for"role">Role</label><br>
                            <select name="role" class="w-full p-2 border-1 border-neutral-200 rounded-lg">
                                <option selected hidden>Select a role</option>
                                <option value="0">Reciptionist</option>
                                <option value="1">Security</option>
                                <option value="1">Security</option>
                            </select>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <label for"photo" class="basis-1/1">Photo</label>
                            <input type="url" name="photo" placeholder="http://..." class="grow-1 p-2 border-1 border-neutral-200 rounded-lg">
                            <img src="../src/assets/images/default_pfp.png" class="size-10 rounded-full">
                        </div>
                        <fieldset>Experiences</fieldset>
                        <div id="experienceList" class="flex flex-col gap-2">
                        ${Experience()}
                        </div>
                        
                        <input name="addExp" type="button" value="Add Experience" class="w-full py-2 px-4 bg-green-400 text-white rounded-lg">
                        <input name="submit" type="submit" value="add worker" class="mt-6 w-full px-4 py-2 bg-black text-white rounded-lg">
                        <input name="annuler" type="button" value="annuler" class=" w-full px-4 py-2 border-2 border-black text-black rounded-lg">
                        </form>
                </div>
            </div>
        `
        document.forms["add-worker-form"].addEventListener("click",  (e) => {
            switch (e.target.getAttribute("name")) {
                case "removeExp": document.getElementById("experienceList").removeChild(e.target.closest("div")); break;
                case "addExp": document.getElementById("experienceList").innerHTML += Experience(); break;
                case "submit": e.preventDefault() ;break;
                case "annuler": this.#hide(); break;
                default: break;
            }
        })
    }

    #hide(){
        document.body.removeChild(document.getElementById("add-worker-modal"));
    }

}