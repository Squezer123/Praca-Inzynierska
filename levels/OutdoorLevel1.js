import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {resources} from "../Resources.js";
import {Vector2} from "../Vector2.js";
import {Exit} from "../objects/Exit/Exit.js";
import {gridCells} from "../helpers/grid.js";
import {Rod} from "../objects/Rod/Rod.js";
import {Hero} from "../objects/Hero/Hero.js";
import {Entrence} from "../objects/Entrence/Entrence.js";
import { GameObject } from "../GameObject.js";
import {events} from "../Events.js";
import {CaveLevel1} from "./TestLevel.js";

export class OutDoorLevel1 extends Level {
    constructor() {
        super({});
        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320, 180)
        })
        const ground = new Sprite({
            resource: resources.images.ground,
            frameSize: new Vector2(320, 180),
            position: new Vector2(0,0),
        })

        this.addChild(ground);

        const entrence = new Entrence(gridCells(6), gridCells(4));
        this.addChild(entrence);

        // const exit = new Exit(gridCells(6), gridCells(4));
        // this.addChild(exit);

        const rod = new Rod(gridCells(20+4), gridCells(20+2));
        this.addChild(rod);

        const hero = new Hero(gridCells(6), gridCells(6));
        this.addChild(hero);
    }
    ready() {
        events.on("HERO_EXITS", this, ()=>{

            events.emit("CHANGE_LEVEL", new OutDoorLevel1())
        })

        events.on("HERO_ENTERS", this, ()=>{

            events.emit("CHANGE_LEVEL", new CaveLevel1())
        })
    }
}