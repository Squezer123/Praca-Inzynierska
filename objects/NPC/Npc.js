import {
    Animations,
    DOWN, events,
    FrameIndexPattern,
    GameObject,
    heroAnimations, isPointInAnyPolygon, Polygon,
    resources,
    Sprite,
    Vector2
} from "../../Exporter.js";
import {npcTaken} from "../../helpers/level1.js";
import {createPolygon} from "../../Polygon.js";

export class Npc extends GameObject{
    constructor(x,y,name,role,id) {
        super({
            position: new Vector2(x,y)

        });
        this.id = id;
        this.name = name;
        this.heroPosition = null;
        this.facingDirection = DOWN;
        this.hp = 50;
        this.maxHp = 50;
        this.int = 10;
        this.str = 10;
        this.ag = 10;
        this.armor = 50;
        this.class = role;
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
            position: new Vector2(-1,-15)
        })
        events.on("HERO_POSITION", this, (position) => {
            this.heroPosition = position;
        });



        const wall = new Polygon([
            [x, y],
            [x + 16, y],
            [x + 16, y + 16],
            [x, y + 16]
        ]);

        npcTaken.push(wall);
        this.addChild(this.body);
        events.on('HERO_REQUESTS_ACTION',this, (hero)=>{
            let newX = this.position.x - 5;
            let newY = this.position.y - 5;
            let area = [];
            area.push(createPolygon(newX,newY,26));
            console.log(this.heroPosition);
            console.log(area);
            if(isPointInAnyPolygon(area,[this.heroPosition.x,this.heroPosition.y])){
                events.emit('BATTLE_STARTS',[this,hero]);
            }
        })


        events.on('DELETE_NPC',this, (eventId)=>{
            this.handleDelete((eventId));
        })
    }

    handleDelete(id) {
        if (this.id === id) {
            for(let i = this.parent.children.length; i >=0; i--){
                if (this.parent.children[i]?.id === id){
                    this.destroy();
                    this.parent.children.splice(i, 1);
                }
            }

        }
    }

    destroy() {
        events.unsubscribe(this);

        this.id = null;
    }
}