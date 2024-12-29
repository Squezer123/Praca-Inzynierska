import {Vector2, events, resources} from "./Exporter.js";

export class GameObject {
    constructor({position}){
        this.position = position ?? new Vector2(0,0);
        this.children = [];
        this.parent = null;
        this.hasBeenCalled = false;
    }
    
    stepEntry(delta, root){
        this.children.forEach(child => {
            child.stepEntry(delta, root);
        });

        if(!this.hasBeenCalled){
            this.hasBeenCalled = true;
            this.ready();
        }

        this.step(delta, root);
    }

    ready(){

    }

    step(_delta){
    }

    draw(ctx, x, y){
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        this.drawImage(ctx, drawPosX, drawPosY);
        this.getDrawChildrenOrdered().forEach(child => {
            child.draw(ctx, drawPosX, drawPosY);
        });
    }

    getDrawChildrenOrdered(){
        return [...this.children].sort((a,b)=>{
            if(b.resource === resources.images.caveGround || b.resource === resources.images.caveGround2 || b.resource === resources.images.caveGround3)
                return 1;
            return a.position.y > b.position.y ? 1 : -1
        })
    }


    drawImage(ctx, drawPosX, drawPosY){

    }

    destroy(){
        this.children.forEach(child => {
            child.destroy();
        });
        this.parent.removeChild(this);
    }

    addChild(gameObject){
        gameObject.parent = this;
        this.children.push(gameObject);
    }

    removeChild(gameObject){
        events.unsubscribe(gameObject);
        this.children = this.children.filter(child => child !== gameObject);
    }

}