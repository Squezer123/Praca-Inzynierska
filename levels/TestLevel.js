import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {events, gridCells, Hero, Polygon, resources, Vector2, walls} from "../Exporter.js";
import {Exit} from "../objects/Exit/Exit.js";
import { OutDoorLevel1 } from "./OutdoorLevel1.js";
import {generateLevel} from "../helpers/mapGenerator.js";
import {mapDrawer} from "../helpers/mapDrawer.js";
import {Npc} from "../objects/NPC/Npc.js";
import {Buff} from "../objects/Buff/Buff.js";

export class CaveLevel1 extends Level{
    constructor() {
        super({});

        // this.background = new Sprite({
        //     resource: resources.images.caveSky,
        //     frameSize: new Vector2(576,324),
        //     scale: 0.5,
        // })


        let mapSize = {x:100, y:100};
        let map = generateLevel(mapSize, 30, 3, 5);
        console.log(map)

        mapDrawer(map, mapSize, this);

        let randomIndex = Math.floor(Math.random() * map.rooms.length);
        let heroX = map.rooms[randomIndex].x + 1;
        let heroY = map.rooms[randomIndex].y + 1;

        let randomIndex2 = Math.floor(Math.random() * map.rooms.length);
        let exitX = map.rooms[randomIndex2].x + 1;
        let exitY = map.rooms[randomIndex2].y + 1;

        const exit = new Exit(gridCells(exitX),gridCells(exitY))
        this.addChild(exit)
        const hero = new Hero(gridCells(heroX), gridCells(heroY),"Bohater","Warrior");
        this.addChild(hero)

        const npc = new Npc(gridCells(heroX+2), gridCells(heroY+2),"Skeleton","Warrior",10);
        this.addChild(npc)

        const buff = new Buff(gridCells(heroX+1), gridCells(heroY+1),"Buff",5);
        this.addChild(buff);
        let {x,y} = hero.position;
        x +=26;
        y +=20;
        walls.push(new Polygon([
            [x, y],
            [x+16, y],
            [x+16, y+16],
            [x, y+16]
        ]));
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