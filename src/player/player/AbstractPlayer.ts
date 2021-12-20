import {AsyncStandby} from "../../lib/AsyncStandby";
import {PlayerStatus} from "./component/PlayerStatus";
import { EventDispatcher } from "../../lib/EventDispatcher";

interface waitAction {
    [name: string]: AsyncStandby | null
}

export abstract class AbstractPlayer {
    public onReady:EventDispatcher = new EventDispatcher();
    public onMuted:EventDispatcher = new EventDispatcher();
    public onDestructed:EventDispatcher = new EventDispatcher();
    public onDurationChanged:EventDispatcher = new EventDispatcher();
    public onTimeUpdate:EventDispatcher = new EventDispatcher();
    public onInitialize:EventDispatcher = new EventDispatcher();
    public onPaused: EventDispatcher = new EventDispatcher();
    public onPlaying: EventDispatcher = new EventDispatcher();
    public onActuallyPlaying: EventDispatcher = new EventDispatcher();
    public onSeeking: EventDispatcher = new EventDispatcher();
    public onSeeked: EventDispatcher = new EventDispatcher();
    public onStalled: EventDispatcher = new EventDispatcher();
    protected config: object;
    protected status: PlayerStatus;
    protected destructed: boolean = false;
    protected initialized: boolean = false;
    protected initTimerID:number = -1;
    protected initAsyncStandby: AsyncStandby;
    protected waitAction: waitAction = {
        play: null,
        pause: null,
        seek: null
    };
    protected duration:number = -1;
    protected position:number = 0;
    protected paused:boolean = true;
    protected seeking:boolean = false;
    protected actuallyPlaying: boolean = false;
    protected volume:number = 100;
    protected muted:boolean = false;
    protected ready:boolean = false;

    public constructor(config:object) {
        this.config = config;
        this.initAsyncStandby = new AsyncStandby();

        this.initTimerID = window.setTimeout(() => {
            this.init();
        }, 0);
    }

    protected abstract init() : void {
        if(!this.hasInitialized()) {
            if(this.initTimerID > -1) {
                this.initTimerID = -1;
            }
            this.initAsyncStandby.resolve();
        }
    };
    
    public hasInitialized() : boolean {
        return this.initialized;
    }

    public isDestructed(): boolean {
        return this.destructed;
    }

    public abstract getPlayingTime() : number;
    public abstract play();
    public abstract pause();
    public abstract seek(position:number);
    public abstract destruct() {
        if(!this.isDestructed()) {
            this.destructed = true;
            this.playerStatus.set('destruct', true);
        }
    }

    public abstract getDuration(): number;
    public abstract getPosition(): number;
    public abstract getVolume(): number;
    public abstract setVolume(): void;
    public abstract getMuted(): boolean;
    public abstract setMuted(muted: boolean): boolean;
    public abstract getPlayingTime():number;
    public abstract isPlaying():boolean;
    public abstract isActuallyPlaying():boolean;
    public abstract isReady() : boolean;





}