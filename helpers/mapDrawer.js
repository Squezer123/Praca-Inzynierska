
import {Sprite, resources, Vector2} from "../Exporter.js";

export function mapDrawer(map, mapSize, mainScene){
    map.tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            console.log("tile",tile)
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
}