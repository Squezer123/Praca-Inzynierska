class Resources{
    constructor(){
        this.toLoad = {
            sky: "/assets/sky.png",
            ground: "/assets/ground.png",
            hero: "/assets/hero.png",
            shadow: "/assets/shadow.png",
            rod: "/assets/rod.png",
            test: "/assets/test.png",
            skeleton: "/assets/skeleton.png",
            exit: "/assets/exit.png",
            caveGround: "/assets/cave-ground.png"
        };

        this.images = {};

        Object.keys(this.toLoad).forEach(key =>{
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {this.images[key].isLoaded = true;}
        })
    }
}

export const resources = new Resources();