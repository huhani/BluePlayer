import {PlayerConfigIntercafe } from "./PlayerConfigInterface";

interface HTML5PlayerConfigInterface extends PlayerConfigInterface {
    element? : Element|null,
    elementMediator? : ElementMediator|null,
}