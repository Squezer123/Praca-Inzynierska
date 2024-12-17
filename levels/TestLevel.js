import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {events, gridCells, Hero, Polygon, resources, Vector2, walls} from "../Exporter.js";
import {Exit} from "../objects/Exit/Exit.js";
import { OutDoorLevel1 } from "./OutdoorLevel1.js";
import {generateLevel} from "../helpers/mapGenerator.js";
import {mapDrawer} from "../helpers/mapDrawer.js";
import {Npc} from "../objects/NPC/Npc.js";

export class CaveLevel1 extends Level{
    constructor() {
        super({});

        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320,180)
        })


        let mapSize = {x:100, y:100};
        var map = generateLevel(mapSize, 30, 4, 7);

        mapDrawer(map, mapSize, this);
        console.log(map)
        let randomIndex = Math.floor(Math.random() * map.rooms.length);
        let heroX = map.rooms[randomIndex].x + 1;
        let heroY = map.rooms[randomIndex].y + 1;

        let randomIndex2 = Math.floor(Math.random() * map.rooms.length);
        let exitX = map.rooms[randomIndex2].x + 1;
        let exitY = map.rooms[randomIndex2].y + 1;

        const exit = new Exit(gridCells(exitX),gridCells(exitY))
        this.addChild(exit)
        const hero = new Hero(gridCells(heroX), gridCells(heroY));
        this.addChild(hero)

        const npc = new Npc(gridCells(heroX+2), gridCells(heroY+2))
        this.addChild(npc)
        let {x,y} = hero.position;
        x +=26;
        y +=20;
        walls.push(new Polygon([
            [x, y],
            [x+16, y],
            [x+16, y+16],
            [x, y+16]
        ]),);
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