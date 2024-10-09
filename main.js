import { resources } from '/Resources.js';
import { Sprite } from '/Sprite.js';
import { Vector2 } from '/Vector2.js';
import { GameLoop } from '/GameLoop.js';
import { Input } from '/Input.js';
import { UP } from './Input.js';
import { DOWN } from './Input.js';
import { LEFT } from './Input.js';
import { RIGHT } from './Input.js';
import { gridCells, isSpaceFree } from './helpers/grid.js';
import { moveTowards } from './helpers/moveTowards.js';
import { walls } from './helpers/level1.js';

document.addEventListener('keydown', function(event) {
  if (event.key === 'F3') {
    event.preventDefault();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'F12') {
    event.preventDefault();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'F7') {
    event.preventDefault();
  }
});

// document.addEventListener('keydown', function(event) {
//   if (event.key === 'F5') {
//     event.preventDefault();
//   }
// });

// document.addEventListener('contextmenu', function(event) {
//   event.preventDefault();
// });


const canvas = document.querySelector("#GameCanvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32,32),
  hFrames: 4,
  vFrames: 16,
  frame: 1,
  position: new Vector2(gridCells(2), gridCells(5))
})

const heroDestinationPositon = hero.position.duplicate();

const input = new Input();

const update = () => {

  const distance = moveTowards(hero, heroDestinationPositon, 1);

  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }

}

const tryMove = () => {
  if (!input.direction) {
    return;
  }

  let nextX = heroDestinationPositon.x;
  let nextY = heroDestinationPositon.y;
  const gridMoveCellSize = 16;

  switch (input.direction) {
    case UP:
      nextY -= gridMoveCellSize;
      hero.frame = 12;
      break;
    case DOWN:
      nextY += gridMoveCellSize;
      hero.frame = 0;
      break;
    case LEFT:
      nextX -= gridMoveCellSize;
      hero.frame = 8;
      break;
    case RIGHT:
      nextX += gridMoveCellSize;
      hero.frame = 4;
      break;
    default:
      break;
  }

  // Check if the next position is a valid grid cell

  if (isSpaceFree(walls, nextX, nextY)) {
    console.log(isSpaceFree(walls, nextX, nextY));
    console.log(walls,nextX,nextY);
    console.log("isSpaceFree");
    heroDestinationPositon.x = nextX;
    heroDestinationPositon.y = nextY;
  }
  
}


const draw = () => {
  skySprite.drawImage(ctx, 0 ,0);

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + heroOffset.y;

  hero.drawImage(ctx, heroPosX, heroPosY);

}



const gameLoop = new GameLoop(update, draw);
gameLoop.start();