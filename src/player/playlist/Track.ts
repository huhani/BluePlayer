export class Track {
    public mimeType: string;
    public url: string;
    public title: string | null = null;
    public album: string | null = null;
    public artist: string | null = null;
    public duration: number | null = null;
    public constructor(mimeType:string, url:string, title?:string, album?:string, artist?:string, duration?:number) {

        this.mimeType = mimeType;
        this.url = url;
        if(title) {
            this.title = title;
        }
        if(album) {
            this.album = album;
        }
        if(artist) {
            this.artist = artist;
        }
        if(duration !== void 0 && duration >= 0) {
            this.duration = duration;
        }
    }
}