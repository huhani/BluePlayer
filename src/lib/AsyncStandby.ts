export class AsyncStandby {
    private promise: Promise<any>;
    private resolved: boolean = false;
    private _resolve: any;
    private _reject: any;

    constructor() {
        this.promise = new Promise<any>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    public resolve(...args: any[]) : void {
        if(!this.resolved) {
            this.resolved = true;
            this._resolve(...args);
        }
    }

    public reject(...args: any[]) : void {
        if(!this.resolved) {
            this.resolved = true;
            this._reject(...args);
        }
    }

    public isResolved() : boolean {
        return this.resolved;
    }

    public getPromise() : Promise<any> {
        return this.promise;
    }
}