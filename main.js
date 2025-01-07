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
import {MainMenu} from "./MainMenu.js";

const canvas = document.querySelector("#GameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.scale(1.5, 1.5)

const mainScene = new Main({
  position: new Vector2(0,0)
})

mainScene.setLevel(new CaveLevel1());

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
  mainScene.input?.update();
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



export const gameLoop = new GameLoop(update, draw);
let menu = new MainMenu();

