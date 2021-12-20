import {EventDispatcher} from "../../../lib/EventDispatcher";


class StatusObject {
    public key:string;
    public dispatcher:EventDispatcher = new EventDispatcher();
    public value:any;

    public constructor(key:string, initVal?: any) {
        this.key = key;
        this.value = initVal;
    }

    public setValue(value:any) : void {
        if(value !== this.value) {
            this.value = value;
            this.dispatcher.dispatch(this.value);
        }
    }

    public getValue() : any {
        return this.value;
    }

    public getDispatcher() : EventDispatcher {
        return this.dispatcher;
    }
}


export class PlayerStatus {

    private onUpdate: EventDispatcher = new EventDispatcher();
    private statusObj: {[key:string]:StatusObject} = {};
    private destructed:boolean = false;

    public constructor(keyValPairList: {[key:string]: any}) {
        Object.keys(keyValPairList).forEach( (eachKeys:string) => {
            let eachVal:any = keyValPairList[eachKeys];
            this.statusObj[eachKeys] = new StatusObject(eachKeys, eachVal);
        });
    }

    public hasKey (key:string) {
        return !this.destructed && key && this.statusObj.hasOwnProperty(key);
    }

    public set(key:string, val: any) : void {
        if(this.hasKey(key)) {
            this.statusObj[key].setValue(val);
        }
    }

    public setObject(keyValPairList: {[key:string]: any}) : void {

    }

    public get(key:string) : any {
        return this.hasKey(key) ? this.statusObj[key].getValue() : void 0;
    }

    public subscribe(key:string, callback: (...args: any[]) => any): (() => void) | null {
        var dispatcher = this.hasKey(key) ? this.statusObj[key].getDispatcher() : null;
        if(dispatcher) {
            return dispatcher.subscribe(callback);
        }

        return null;
    }

    public isDestructed() : boolean {
        return this.destructed;
    }

    public destruct() : void {
        if(!this.destructed) {
            this.destructed = true;
        }
    }

}
