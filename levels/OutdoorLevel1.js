import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {resources} from "../Resources.js";
import {Vector2} from "../Vector2.js";
import {Exit} from "../objects/Exit/Exit.js";
import {gridCells} from "../helpers/grid.js";
import {Rod} from "../objects/Rod/Rod.js";
import {Hero} from "../objects/Hero/Hero.js";

export class OutDoorLevel1 extends Level {
    constructor() {
        super({});
        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320, 180)
        })
        this.ground = new Sprite({
            resource: resources.images.ground,
            frameSize: new Vector2(320, 180)
        })

        this.addChild(this.ground);

        const exit = new Exit(gridCells(20+7), gridCells(20+2));
        this.addChild(exit);

        const rod = new Rod(gridCells(20+4), gridCells(20+2));
        this.addChild(rod);

        const hero = new Hero(gridCells(20+2), gridCells(20+2));
        this.addChild(hero);
    }
    //...
}