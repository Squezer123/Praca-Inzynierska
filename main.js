import {
    resources,
    Sprite,
    Vector2,
    GameLoop,
    Input,
    Hero,
    GameObject,
    gridCells,
    Camera,
    Rod,
    heroAnimations, events
} from './Exporter.js';
import { generateLevel } from './helpers/mapGenerator.js';
import { mapDrawer } from './helpers/mapDrawer.js';
import { Exit } from "./objects/Exit/Exit.js";

const canvas = document.querySelector("#GameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.scale(1.5, 1.5)


const mainScene = new GameObject({
  position: new Vector2(0,0)
})

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const camera = new Camera();
mainScene.addChild(camera);

let mapSize = {x:100, y:100};
var map = generateLevel(mapSize, 30, 4, 7);
mainScene.input = new Input();

mapDrawer(map, mapSize, mainScene);

let startingRoomIndex = Math.floor(Math.random() * map.rooms.length);
let {x, y} = map.rooms[startingRoomIndex];
let helpX = x+3;
let helpY = y+3;

const exit = new Exit(gridCells(x+7), gridCells(y+2));
mainScene.addChild(exit);

const rod = new Rod(gridCells(x+4), gridCells(y+2));
mainScene.addChild(rod);

const hero = new Hero(gridCells(x+2), gridCells(y+2));
mainScene.addChild(hero);

events.on("HERO_EXIT", mainScene, () => {
    // mainScene.children.forEach((child) => {
    //     console.log(child);
    //     mainScene.removeChild(child)
    // })
    // mainScene.addChild(camera);
    // mapDrawer(map, mapSize, mainScene);
    // mainScene.addChild(hero);
    console.log("test");


})

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  skySprite.drawImage(ctx, 0, 0);
  ctx.save();

  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  ctx.restore();
}



const gameLoop = new GameLoop(update, draw);
gameLoop.start();