import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {events, gridCells, Hero, resources, Vector2} from "../Exporter.js";
import {Exit} from "../objects/Exit/Exit.js";
import {OutDoorLevel1} from "../helpers/level1.js";

export class CaveLevel1 extends Level{
    constructor() {
        super({});

        this.background = new Sprite({
            resource: resources.images.test,
            frameSize: new Vector2(320,180)
        })

        const ground = new Sprite({
            resource: resources.images.test,
            frameSize: new Vector2(320,180)
        })

        this.addChild(ground);

        const exit = new Exit(gridCells(3, gridCells(5)))

        const hero = new Hero(gridCells(9), gridCells(6));

        this.walls = new Set();
    }

    ready() {
        events.on("HERO_EXITS", this, ()=>{
            events.emit("CHANGE_LEVEL", new OutDoorLevel1())
        })
    }


}