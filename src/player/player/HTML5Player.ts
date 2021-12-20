import { AbstractPlayer } from "./AbstractPlayer";
import { AsyncStandby } from "../../lib/AsyncStandby";
import { EventDispatcher } from "../../lib/EventDispatcher";

export class HTML5Player extends  AbstractPlayer {

    private listeners:any[] = [];
    private playerStatus: PlayerStatus;
    private mediaElement:Element;

    public constructor(config:object) {
        super(config);


    }

    protected init() : void {

    }

    protected onPlayHandler(evt:Event) : void {

    }

    protected onPlayingHandler(evt:Event) : void {

    }

    protected onPausedHandler(evt:Event) : void {

    }

    protected onVolumeChangeHandler(evt:Event) : void {

    }

    protected onStalledHandler(evt:Event|null) : void {

    }

    protected onTimeupdateHandler(evt:Event|null) : void {

    }

    public attachMediaElement(Element) : void {

    }

    public detachMediaElement() : void {
        if(this.mediaElement) {
            this.unregisterEventListeners();
            this.mediaElement = null;
        }
    }

    public registerEventListeners() : void {

    }

    public unregisterEventListeners() : void {
        while(this.listeners.length) {
            var remove = this.listeners.shift();
            remove();
        }
    }

    public addEventListener(eventName:string, callback:(...args: any[]) => any) : (() => any) | null {
        if(this.mediaElement) {
            let removed = false;
            let fn:(...args: any[]) => any = (params) => {
                callback(params);
            };
            let remove: () => void = () => {
                if(!removed) {
                    removed = true;
                }
            };
            this.mediaElement.addEventListener(eventName, fn, false);

        }

        return null;
    }

    public addEventListenerOnce(eventName:string) {

    }

    private getMediaElement() : Promise<any>  {

    }

    public play() : Promise<any> {

    }

    public isActuallyPlaying() :boolean {

    }

    public isPlaying() : boolean {

    }

}
