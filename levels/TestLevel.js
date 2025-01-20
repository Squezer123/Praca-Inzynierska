import {Level} from "../objects/Level/Level.js";
import {Sprite} from "../Sprite.js";
import {events, gridCells, Hero, Polygon, resources, Vector2, walls} from "../Exporter.js";
import {Exit} from "../objects/Exit/Exit.js";
import {OutDoorLevel1} from "./OutdoorLevel1.js";
import {generateLevel} from "../helpers/mapGenerator.js";
import {mapDrawer} from "../helpers/mapDrawer.js";
import {Npc} from "../objects/NPC/Npc.js";
import {Buff} from "../objects/Buff/Buff.js";

// Funkcja do monitorowania zużycia pamięci
const logMemoryUsage = () => {
    if (performance.memory) {
        const memory = performance.memory;
        console.log('Memory usage:');
        console.log(`- Total JS Heap: ${memory.totalJSHeapSize} bytes`);
        console.log(`- Used JS Heap: ${memory.usedJSHeapSize} bytes`);
        console.log(`- JS Heap limit: ${memory.jsHeapSizeLimit} bytes`);
    } else {
        console.log('Memory API not supported in this browser');
    }
};

// Funkcja do monitorowania zużycia CPU
const logCpuUsage = () => {
    console.time('cpuUsage'); // Mierzymy czas wykonania
    // Tylko przykładowe obliczenia, by obciążyć CPU
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += i;
    }
    console.timeEnd('cpuUsage'); // Kończymy pomiar
};

export class CaveLevel1 extends Level {
    constructor() {
        super({});

        // Testowanie pamięci i CPU przed generowaniem poziomu
        console.log("Before generating level:");
        logMemoryUsage();
        logCpuUsage();

        let mapSize = {x: 100, y: 100};
        let map = generateLevel(mapSize, 30, 3, 5);

        mapDrawer(map, mapSize, this);

        let randomIndex = Math.floor(Math.random() * map.rooms.length);
        let heroX = map.rooms[randomIndex].x + 1;
        let heroY = map.rooms[randomIndex].y + 1;

        let randomIndex2 = Math.floor(Math.random() * map.rooms.length);
        let exitX = map.rooms[randomIndex2].x + 1;
        let exitY = map.rooms[randomIndex2].y + 1;

        const exit = new Exit(gridCells(exitX), gridCells(exitY));
        this.addChild(exit);
        const hero = new Hero(gridCells(heroX), gridCells(heroY), "Bohater", "Warrior");
        this.addChild(hero);

        const npc = new Npc(gridCells(heroX + 2), gridCells(heroY + 2), "Skeleton", "Warrior", 10);
        this.addChild(npc);

        const buff = new Buff(gridCells(heroX + 1), gridCells(heroY + 1), "Buff", 5);
        this.addChild(buff);

        let {x, y} = hero.position;
        x += 26;
        y += 20;
        walls.push(new Polygon([
            [x, y],
            [x + 16, y],
            [x + 16, y + 16],
            [x, y + 16]
        ]));

        // Testowanie pamięci i CPU po generowaniu poziomu
        console.log("After generating level:");
        logMemoryUsage();
        logCpuUsage();
    }

    ready() {
        events.on("HERO_EXITS", this, () => {
            events.emit("CHANGE_LEVEL", new OutDoorLevel1());
        });

        events.on("HERO_ENTERS", this, () => {
            events.emit("CHANGE_LEVEL", new CaveLevel1());
        });
    }
}

// Funkcja do testowania różnych rozmiarów mapy
const testMapSize = (size) => {
    console.log('LevelGeneration size:',size)
    console.time("LevelGeneration");
    let map = generateLevel({x: size, y: size}, 30, 3, 5);
    console.timeEnd("LevelGeneration");

    logMemoryUsage();
    logCpuUsage();
};

// Testowanie różnych rozmiarów mapy






