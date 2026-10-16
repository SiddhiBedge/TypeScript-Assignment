"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    add(item) {
        const newItem = {
            ...item,
            id: this.nextId
        };
        this.items.push(newItem);
        this.nextId++;
        return newItem;
    }
    getById(id) {
        return this.items.find(item => item.id === id);
    }
    update(id, changes) {
        const item = this.getById(id);
        if (item === undefined) {
            return undefined;
        }
        Object.assign(item, changes);
        return item;
    }
    remove(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1); // Jo remove kiya hain wo chodke baki items 1 for array start with index 1
        return true;
    }
    // remove(id: number): boolean{
    //     const index = this.items.findIndex(item => item.id === id);
    //     if (index === -1){
    //         return false;
    //     }
    //     return true;
    // }
    filter(check) {
        return this.items.filter(check);
    }
}
exports.Repository = Repository;
