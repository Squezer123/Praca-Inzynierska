import {
    Vector2,
    GameLoop,
    events,
    Sprite,
    resources
} from './Exporter.js';
import { generateLevel } from './helpers/mapGenerator.js';
import { mapDrawer } from './helpers/mapDrawer.js';
import {Main} from "./objects/Main/Main.js";
import {OutDoorLevel1} from "./levels/OutdoorLevel1.js";
import { CaveLevel1 } from './levels/TestLevel.js';

const canvas = document.querySelector("#GameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.scale(1.5, 1.5)


const mainScene = new Main({
  position: new Vector2(0,0)
})

let mapSize = {x:100, y:100};
var map = generateLevel(mapSize, 30, 4, 7);

// mapDrawer(map, mapSize, mainScene);

mainScene.setLevel(new CaveLevel1());

let startingRoomIndex = Math.floor(Math.random() * map.rooms.length);
let {x, y} = map.rooms[startingRoomIndex];
let helpX = x+3;
let helpY = y+3;




const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainScene.drawBackground(ctx);
  ctx.save();
  if(mainScene.camera) {
      ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }
  mainScene.draw(ctx, 0, 0);

  ctx.restore();
}



const gameLoop = new GameLoop(update, draw);
gameLoop.start();