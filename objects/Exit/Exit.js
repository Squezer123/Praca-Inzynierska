import {events, GameObject, Polygon, resources, Sprite, Vector2} from "../../Exporter.js";

export class Exit extends GameObject{
    constructor(x,y) {
        super({
            position: new Vector2(x,y)
        });
        this.addChild(new Sprite({
            resource: resources.images.rod
        }))
    }

    ready(){
        events.on("HERO_POSITION", this, pos => {
            const roundedHeroX = Math.round(pos.x);
            const roundedHeroY = Math.round(pos.y);

            // Tworzenie polygonu dla kratki
            const gridCellPolygon = new Polygon([
                [this.position.x, this.position.y],
                [this.position.x + 16, this.position.y],
                [this.position.x + 16, this.position.y + 16],
                [this.position.x, this.position.y + 16]
            ]);

            // Sprawdzenie, czy punkt (pozycja postaci) znajduje się w polygonie kratki
            if (gridCellPolygon.containsPoint([roundedHeroX, roundedHeroY])) {
                this.onCollideWithHero();
            }
        });
    }

    onCollideWithHero(){
        this.destroy();
        events.emit("HERO_EXIT");
    }
}