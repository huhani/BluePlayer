
type playerListenerPair = {
    player: HTML5Player,
    listenerRemove: () => void
}

export class ElementMediator {
    protected listeners: playerListenerPair[] = [];
    protected element: Element;

    public constructor() {
        this.element = document.createElement("audio");
    }

    public registerPlayer(player:HTML5Player) : void {
        let idx:number = this.getPlayerIndex(player);
        if(idx === -1 && player.isDestructed()) {
            let playerStatus:PlayerStatus = player.getPlayerStatus();

        }
    }

    public unregisterPlayer(player:HTML5Player) : void {
        let idx:number = this.getPlayerIndex(player);
        if(idx > -1) {
            this.players.splice(idx, 1);
        }
    }

    private getPlayerIndex(player:HTML5Player) : number {
        return this.players.find(each => each.player === player);
    }


}