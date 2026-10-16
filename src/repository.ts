export class Repository<T extends { id: number }>{
    private items: T[] = [];
    private nextId = 1;

    add(item: Omit<T, "id">): T{
        const newItem = {
            ...item,
            id: this.nextId
        } as T;

        this.items.push(newItem);
        this.nextId++;

        return newItem;
    } 

    getById(id:number): T | undefined{
        return this.items.find(item => item.id === id);
    }

    update(id:number, changes: Partial<Omit<T, "id">>): T | undefined{
        const item = this.getById(id);
        if(item === undefined){
            return undefined;
        }

        Object.assign(item, changes);

        return item;
    }

    remove(id:number): boolean{
        const index = this.items.findIndex(item => item.id === id);
        if(index === -1){
            return false;
        }

        this.items.splice(index,1) // Jo remove kiya hain wo chodke baki items 1 for array start with index 1
        return true;
    }

    // remove(id: number): boolean{
    //     const index = this.items.findIndex(item => item.id === id);
    //     if (index === -1){
    //         return false;
    //     }

    //     return true;
    // }

    filter(check: (item: T) => boolean): T[] {
        return this.items.filter(check);
    }
}
