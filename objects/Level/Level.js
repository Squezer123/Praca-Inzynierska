import {GameObject} from "../../Exporter.js";

export class Level extends GameObject{
    constructor() {
        super({});
        this.background = null;
        this.ground = null;
    }
}