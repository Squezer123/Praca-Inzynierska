import {
    Animations,
    DOWN,
    FrameIndexPattern,
    GameObject,
    heroAnimations,
    resources,
    Sprite,
    Vector2
} from "../../Exporter.js";

export class Npc extends GameObject{
    constructor(x,y) {
        super({
            position: new Vector2(x,y)

        });
        this.facingDirection = DOWN;
        this.body = new Sprite({
            resource: resources.images.skeleton,
            frameSize: new Vector2(32,32),
            hFrames: 4,
            vFrames: 16,
            frame: 0,
            animations: new Animations({
                standUp: new FrameIndexPattern(heroAnimations.STAND_DOWN),
                standDown: new FrameIndexPattern(heroAnimations.STAND_UP),
                standLeft: new FrameIndexPattern(heroAnimations.STAND_LEFT),
                standRight: new FrameIndexPattern(heroAnimations.STAND_RIGHT),
                walkUp: new FrameIndexPattern(heroAnimations.WALK_UP),
                walkDown: new FrameIndexPattern(heroAnimations.WALK_DOWN),
                walkLeft: new FrameIndexPattern(heroAnimations.WALK_LEFT),
                walkRight: new FrameIndexPattern(heroAnimations.WALK_RIGHT),

            }),
            position: new Vector2(-8,-15)
        })
        this.addChild(this.body);


    }
}