import { RoomCard } from "./RoomCard.mjs"

export const RoomList = (list) => {
    return list.map(item => `<li class="shrink-1 basis-[calc(50%-0.5rem)]">
                ${RoomCard(item)}</li>`).join("")
}