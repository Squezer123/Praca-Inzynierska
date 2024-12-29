import { Polygon } from '../Polygon.js';

export const walls = [
    new Polygon([
        [50, 62],
        [50, 95],
        [95, 95],
        [95, 62]
    ]),
    new Polygon([
        [44, 108],
        [244, 108],
        [244, 140],
        [44, 140]
    ]),
];

export const npcTaken = [];




import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {resources} from "../Resources.js";
import {Vector2} from "../Vector2.js";
import {Exit} from "../objects/Exit/Exit.js";
import {gridCells} from "./grid.js";
import {Rod} from "../objects/Rod/Rod.js";
import {Hero} from "../objects/Hero/Hero.js";

