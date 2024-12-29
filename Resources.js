class Resources{
    constructor(){
        this.toLoad = {
            sky: "/assets/sky.png",
            caveSky:"/assets/caveSky.png",
            ground: "/assets/ground.png",
            hero: "/assets/hero.png",
            shadow: "/assets/shadow.png",
            rod: "/assets/rod.png",
            caveGround: "/assets/CaveGround.png",
            caveGround2: "/assets/CaveGround2.png",
            caveGround3: "/assets/CaveGround3.png",
            skeleton: "/assets/skeleton.png",
            exit: "/assets/exit.png",
            caveBackGround: "/assets/Preview.png",
            heroAvatar: "/assets/heroAvatar.png",
            skeletonAvatar: "/assets/skeletonAvatar.png",
            wallCave: "/assets/WallGround_darkened.png",
            caveCrack: "/assets/crackCave.png",
            bigCrack: "/assets/BigCrack.png",
            caveRocks: "/assets/CaveRocks.png",
            gem: "/assets/Gem.png",
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