export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class Input {
    constructor(){

        this.heldDirections = [];
        this.keys = {};
        this.lastKeys = {};

        document.addEventListener('keydown', (e) => {

            this.keys[e.code] = true;

            if (e.key === 'w' || e.key === 'ArrowUp' || e.key === 'W'){this.onArrowPressed(UP);}
            if (e.key === 's' || e.key === 'S'){this.onArrowPressed(DOWN);}
            if (e.key === 'a' || e.key === 'A'){this.onArrowPressed(LEFT);}
            if (e.key === 'd' || e.key === 'D'){this.onArrowPressed(RIGHT);}
        });

        document.addEventListener('keyup', (e) => {

            this.keys[e.code] = false;

            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W'){this.onArrowReleased(UP);}
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S'){this.onArrowReleased(DOWN);}
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A'){this.onArrowReleased(LEFT);}
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D'){this.onArrowReleased(RIGHT);}
         });
    }

    get direction(){
        return this.heldDirections[0];
    }
    update(){
        this.lastKeys = {... this.keys};

    }

    getActionJustPressed(keyCode){
        let justPressed = false;
        if(this.keys[keyCode] && !this.lastKeys[keyCode]){
            justPressed = true;
        }
        return justPressed;

    }

    onArrowPressed(direction){
        if (this.heldDirections.indexOf(direction) === -1){this.heldDirections.unshift(direction)}
    }
    onArrowReleased(direction){
        const index = this.heldDirections.indexOf(direction);
        if (index === -1){return;}
        this.heldDirections.splice(index, 1);
    }
}