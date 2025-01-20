import { GameObject } from '../../GameObject.js';
import { 
  Vector2,
  DOWN,
  LEFT,
  RIGHT,
  UP,
  resources,
  Sprite,
  isPointInAnyPolygon,
  walls,
  Animations,
  FrameIndexPattern,
  heroAnimations,
  moveTowards,
  events  
} from '../../Exporter.js';
import {npcTaken} from "../../helpers/level1.js";
import {SoundPlayer} from "../../Sound.js";

export class Hero extends GameObject{
    constructor(x,y,name,role){
        super({
            position: new Vector2(x,y)
        });
        this.sound = new SoundPlayer();
        this.sound.setSource('../../assets/Sounds/step.mp3');
        this.name = name;
        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.hp = 100;
        this.activeEffects = [];
        this.maxHp = 100;
        this.playSound = true;
        this.int = 10;
        this.str = 10;
        this.ag = 10;
        this.class = role;
        this.armor = 50;
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8,-26)
        });
        this.addChild(shadow);


        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32,32),
            hFrames: 4,
            vFrames: 16,
            frame: 0,
            animations: new Animations({
              standUp: new FrameIndexPattern(heroAnimations.STAND_UP),
              standDown: new FrameIndexPattern(heroAnimations.STAND_DOWN),
              standLeft: new FrameIndexPattern(heroAnimations.STAND_LEFT),
              standRight: new FrameIndexPattern(heroAnimations.STAND_RIGHT),
              walkUp: new FrameIndexPattern(heroAnimations.WALK_UP),
              walkDown: new FrameIndexPattern(heroAnimations.WALK_DOWN),
              walkLeft: new FrameIndexPattern(heroAnimations.WALK_LEFT),
              walkRight: new FrameIndexPattern(heroAnimations.WALK_RIGHT),
          
            }),
            position: new Vector2(-8,-20)

          })
          this.addChild(this.body);
    }

    step(delta, root){

        /** @type {Input} */
        const input = root.input;
        if(input?.getActionJustPressed("KeyE")){
            let t = Math.random()
            events.emit("HERO_REQUESTS_ACTION",this)
        }
        events.on("HERO_APPLY_EFFECTS", this, (effects) => {
            this.applyEffect(effects.buff);
            this.applyEffect(effects.debuff);
        });

        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;
        if (hasArrived) {this.tryMove(root);}
        this.tryEmitPosition();
    }

    tryEmitPosition(){
        if(this.lastX === this.position.x && this.lastY === this.position.y){return;}
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position);
    }



    tryMove(root){
        this.playSound = true;
        const {input} = root;
        if (!input.direction) {
          if (this.facingDirection === UP) {
            this.body.animations.play('standUp');
          }
          if (this.facingDirection === DOWN) {
            this.body.animations.play('standDown');
          }
          if (this.facingDirection === LEFT) {
            this.body.animations.play('standLeft');
          }
          if (this.facingDirection === RIGHT) {
            this.body.animations.play('standRight');
          }

          return;
        }
      
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridMoveCellSize = 1
      
        
        switch (input.direction) {
          case UP:
            nextY -= gridMoveCellSize;
            this.body.animations.play('walkUp');
            break;
          case DOWN:
            nextY += gridMoveCellSize;
            this.body.animations.play('walkDown');
            break;
          case LEFT:
            nextX -= gridMoveCellSize;
            this.body.animations.play('walkLeft');
            break;
          case RIGHT:
            nextX += gridMoveCellSize;
            this.body.animations.play('walkRight');
            break;
          default:
            break;
        }
       
        this.facingDirection = input.direction ?? this.facingDirection;
      
        // Check if the next position is a valid grid cell
      
        if (isPointInAnyPolygon(walls, [nextX, nextY]) && !isPointInAnyPolygon(npcTaken,[nextX,nextY])) {
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
            if(this.playSound){
                this.sound.play();
                this.playSound = false;
            }

      }
        
    }
    applyEffect(effect) {
        this.activeEffects.push(effect);
        this.updateStats();
    }

    removeEffect(effectName) {
        this.activeEffects = this.activeEffects.filter(effect => effect.name !== effectName);
        this.updateStats();
    }

    updateStats() {
        for (const effect of this.activeEffects) {
            if(!effect.added){
                console.log('Dodano')
                this.armor += effect.stats.armor;
                this.ag += effect.stats.agility;
                this.int += effect.stats.int;
                this.str += effect.stats.strength;
                this.maxHp += effect.stats.hp;
                this.removeEffect(effect.name)
                effect.added = true;
            }

        }

        this.hp = Math.min(this.hp, this.maxHp);

    }

}