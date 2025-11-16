export class Room {
    constructor(id,name,role,maxPlaces,members) {
        this.id = id,
        this.name = name,
        this.role = role,
        this.maxPlaces = maxPlaces,
        this.members = members
    }

    addMemeber(m){
        if(this.members.length === this.maxPlaces) return false
        this.members.push(m);
    }

    removeMember(m){
        const index = this.members.indexOf(member=>member.id === m.id);
        this.members.splice(index,1);
    }
}