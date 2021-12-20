
class EventDispatcherSubscriber {
    public priority: number = 20;
    public callback: (...args: any[]) => any;
    public dead: boolean = false;

    public constructor(callback: (...args: any[]) => any, priority: number) {
        this.callback = callback;
        this.priority = priority;
    }
}

export class EventDispatcher {
    private static ID: number = 0;
    private listeners: Array<EventDispatcherSubscriber> = [];
    private ID: number = 0;

    public cunstructor() {
        this.ID = EventDispatcher.ID++;
    }

    public subscribe(callback: (...args: any[]) => any, priority?: number) : () => void {
        if(priority === void 0) {
            priority = 20;
        }
        let subscriber:EventDispatcherSubscriber = new EventDispatcherSubscriber(callback, priority)

        this.listeners.push(subscriber);
        this.listeners.sort((a, b) => {
            return a.priority - b.priority;
        });

        return () => {
            let idxPosition:number = this.listeners.indexOf(subscriber);
            if(idxPosition > -1) {
                this.listeners.splice(idxPosition, 1);
            }
        };

    }

    public getListeners() : Array<EventDispatcherSubscriber> {
        return this.listeners;
    }

    public dispatch(payload?:any) {
        this.getListeners().forEach(subscribe => {
            this.handleCallback(subscribe.callback, payload);
        });
    }

    private handleCallback(handler:any, payload?: any) {
        try {
            handler(payload);
        } catch(err) {
            window.setTimeout(function() {
                throw err;
            }, 0);
        }
    }

}