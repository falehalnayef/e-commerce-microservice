export class statusError extends Error{
    status: number;
    constructor(status: number, msg: string){
        super(msg);
        this.status = status;
    }
}