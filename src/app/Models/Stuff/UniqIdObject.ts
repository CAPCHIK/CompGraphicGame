export class UniqIdObject {
    private static _lastId = 0;
    private currentId: number;
    public get id(): number {
        return this.currentId;
    }
    constructor() {
        this.currentId = UniqIdObject._lastId++;
    }
}
