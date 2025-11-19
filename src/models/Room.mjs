export class Room {
    constructor(id,name,allowedIds,maxPlaces,staffCount) {
        this.id = id;
        this.allowedIds = allowedIds;
        this.name = name;
        this.maxPlaces = maxPlaces;
        this.staffCount = staffCount;
    }
}