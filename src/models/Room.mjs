export class Room {
    constructor(id,name,allowedIds,maxPlaces,members) {
        this.id = id;
        this.allowedIds = allowedIds;
        this.name = name;
        this.maxPlaces = maxPlaces;
        this.members = members;
    }
}