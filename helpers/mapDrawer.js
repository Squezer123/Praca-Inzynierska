
import {Sprite, resources, Vector2} from "../Exporter.js";
import {Polygon} from "../Exporter.js";
import {walls} from "../Exporter.js";
export function mapDrawer(map, mapSize, mainScene){
    map.tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            if(tile === 0){
                const ground = new Sprite({
                    resource: resources.images.test,
                    frameSize: new Vector2(16, 16),
                    position: new Vector2(i * 16, j * 16)
                })
                mainScene.addChild(ground);

            }
        })
    })
    console.log(map)
    map.rooms.forEach(room => {
        let { x, y, w, h } = room; // Pobieramy współrzędne i rozmiary pokoju
        x*=16;
        y*=16;
        w*=16;
        h*=16;

        // Tworzymy polygon dla ściany pokoju
        const wall = new Polygon([
            [x, y],
            [x + w, y],
            [x + w, y + h],
            [x, y + h]
        ]);

        walls.push(wall);
    })

    map.doors.forEach(door =>{

        let {x,y} = door;
        x*=16;
        y*=16;

        const wall = new Polygon([
            [x, y],
            [x + 16, y],
            [x + 16, y + 16],
            [x, y + 16]
        ]);

        walls.push(wall);
    })



}