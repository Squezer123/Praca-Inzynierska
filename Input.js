export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class Input {
    constructor(){

        this.heldDirections = [];

        document.addEventListener('keydown', (e) => {
           if (e.key === 'w' || e.key === 'ArrowUp'){this.onArrowPressed(UP);}
            if (e.key === 's'){this.onArrowPressed(DOWN);}
            if (e.key === 'a'){this.onArrowPressed(LEFT);}
            if (e.key === 'd'){this.onArrowPressed(RIGHT);}
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w'){this.onArrowReleased(UP);}
            if (e.key === 'ArrowDown' || e.key === 's'){this.onArrowReleased(DOWN);}
            if (e.key === 'ArrowLeft' || e.key === 'a'){this.onArrowReleased(LEFT);}
            if (e.key === 'ArrowRight' || e.key === 'd'){this.onArrowReleased(RIGHT);}
         });
    }

    get direction(){
        return this.heldDirections[0];
    }

    onArrowPressed(direction){
        console.log(direction)
        if (this.heldDirections.indexOf(direction) === -1){this.heldDirections.unshift(direction)}
    }
    onArrowReleased(direction){
        const index = this.heldDirections.indexOf(direction);
        if (index === -1){return;}
        this.heldDirections.splice(index, 1);
    }
}