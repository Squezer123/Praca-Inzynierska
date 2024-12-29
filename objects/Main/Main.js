import {Camera, events, GameObject, Input, isPointInAnyPolygon} from "../../Exporter.js";
import {createPolygon} from "../../Polygon.js";
import {Npc} from "../NPC/Npc.js";
import {gameLoop} from "../../main.js";
import {Battle} from "../../Battle.js";

export class Main extends GameObject{
    constructor() {
        super({});
        this.level = null;
        this.input = new Input();
        this.camera = new Camera();
    }

    ready() {
        events.on("CHANGE_LEVEL", this, newLevelInstance => {
            console.log("ZMIANA");
            this.setLevel(newLevelInstance);
        })
        events.on("BATTLE_STARTS", this, (participants) => {
            events.emit("STOP_LOOP");

            let battleWinner = new Battle(participants[0],participants[1]).BattleSimulation();
            events.on('BATTLE_END',this, ()=>{
                events.emit("DELETE_NPC",participants[0].id);
                events.emit("START_LOOP");
            })


        });
        events.on("STOP_LOOP",this,()=>{
            gameLoop.stop()
        })
        events.on("START_LOOP",this,()=>{
            gameLoop.start()
        })


    }

    setLevel(newLevelInstance){
        if (this.level){
            this.level.destroy();
        }
        this.level = newLevelInstance;
        this.addChild(this.level);

    }

    drawBackground(ctx){
        if(!this.level?.background === null)
        this.level?.background.drawImage(ctx,0,0);
    }

    

    drawForeground(ctx){

    }
}