import {Sprite, resources, Vector2} from "../Exporter.js";
import {Polygon} from "../Exporter.js";
import {walls} from "../Exporter.js";
import {createPolygon} from "../Polygon.js";

export function mapDrawer(map, mapSize, mainScene) {
    map.tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            if (tile === 0) {
                let groundVariant = Math.floor(Math.random() * 3) + 1;

                switch (groundVariant) {
                    case 1: {
                        const ground1 = new Sprite({
                            resource: resources.images.caveGround,
                            frameSize: new Vector2(20, 20),
                            position: new Vector2(i * 16 + 7, j * 16)
                        });
                        mainScene.addChild(ground1);
                        break;
                    }
                    case 2: {
                        const ground2 = new Sprite({
                            resource: resources.images.caveGround,
                            frameSize: new Vector2(20, 20),
                            position: new Vector2(i * 16 + 7, j * 16)
                        });
                        mainScene.addChild(ground2);
                        break;
                    }
                    case 3: {
                        const ground3 = new Sprite({
                            resource: resources.images.caveGround,
                            frameSize: new Vector2(20, 20),
                            position: new Vector2(i * 16 + 7, j * 16)
                        });
                        mainScene.addChild(ground3);
                        break;
                    }
                }

            }
            if (tile === 1) {
                const wall = new Sprite({
                    resource: resources.images.wallCave,
                    frameSize: new Vector2(17, 17),
                    position: new Vector2(i * 16 + 7, j * 16)
                });
                mainScene.addChild(wall);
            }
        });
    });

    map.rooms.forEach(room => {
        let { x, y, w, h } = room;
        x *= 16;
        y *= 16;
        w *= 16;
        h *= 16;
        walls.push(createPolygon(x, y, w, h));
    });

    map.doors.forEach(door => {
        let { x, y } = door;
        x *= 16;
        y *= 16;

        walls.push(createPolygon(x, y, 16));
    });
}
