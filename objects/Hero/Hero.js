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

export class Hero extends GameObject{
    constructor(x,y){
        super({
            position: new Vector2(x,y)
        });
        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();

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
      
        if (isPointInAnyPolygon(walls, [nextX, nextY]) || isSpaceTaken([nextX, nextY])) {
            console.log(this.position)
          this.destinationPosition.x = nextX;
          this.destinationPosition.y = nextY;
      }
        
    }

}