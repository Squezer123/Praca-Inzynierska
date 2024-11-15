import { 
    GameObject, 
    events, 
    Vector2 } from "./Exporter.js";

export class Camera extends GameObject{
    constructor(){
        super({});
        events.on("HERO_POSITION", this, heroPosition => { 
            const personHalf = 16;
            const canvasWidth = 320;
            const canvasHeight = 180;
            const halfWidth = -personHalf + (canvasWidth / 2);
            const halfHeight = -personHalf + (canvasHeight / 2);

            this.position = new Vector2(
                -heroPosition.x + halfWidth-45,
                -heroPosition.y + halfHeight-15
            )
        });
       
    }
}