import {Camera, events, GameObject, Input} from "../../Exporter.js";

export class Main extends GameObject{
    constructor() {
        super({});
        this.level = null;
        this.input = new Input();
        this.camera = new Camera();
    }

    ready() {
        events.on("CHANGE_LEVEL", this, newLevelInstance => {
            this.setLevel((newLevelInstance));
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
        this.level?.background.drawImage(ctx,0,0);
    }

    drawLand(ctx){
        this.level?.ground.drawImage(ctx,0,0);
    }

    drawForeground(ctx){

    }
}