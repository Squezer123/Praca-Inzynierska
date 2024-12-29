import {
    Animations,
    DOWN, events,
    FrameIndexPattern,
    GameObject,
    heroAnimations, isPointInAnyPolygon, Polygon,
    resources,
    Sprite,
    Vector2
} from "../../Exporter.js";
import {npcTaken} from "../../helpers/level1.js";
import {createPolygon} from "../../Polygon.js";
import {buffsAndDebuffs} from "../../helpers/buffDebuffList.js";

export class Buff extends GameObject{
    constructor(x,y,name,id) {
        super({
            position: new Vector2(x,y)

        });
        this.id = id;
        this.name = name;
        this.cardOpened = false;
        this.heroPosition = null;
        this.facingDirection = DOWN;

        this.body = new Sprite({
            resource: resources.images.gem,
            frameSize: new Vector2(32,32),
            hFrames: 10,
            scale: 0.5,
            vFrames: 1,
            frame: 0,
            animations: new Animations({
                standUp: new FrameIndexPattern(heroAnimations.STAND_DOWN),

            }),
            position: new Vector2(5,-5)
        })
        events.on("HERO_POSITION", this, (position) => {
            this.heroPosition = position;
            let {x,y} = this.position;
            let objectPosition = []
            objectPosition.push(new Polygon([
                [x, y],
                [x+16, y],
                [x+16, y+16],
                [x, y+16]
            ]));
            if(isPointInAnyPolygon(objectPosition,[position.x,position.y])){
                events.emit("STOP_LOOP");
                if(!this.cardOpened){
                    this.cardOpened = true;
                    this.showBuffCard();
                }

            }
        });

        this.addChild(this.body);


        events.on('DELETE_NPC',this, (eventId)=>{
            this.handleDelete((eventId));
        })
    }

    handleDelete(id) {
        if (this.id === id) {
            for(let i = this.parent.children.length; i >=0; i--){
                if (this.parent.children[i]?.id === id){
                    this.destroy();
                    this.parent.children.splice(i, 1);
                }
            }

        }
    }
    showBuffCard(hero) {
        // Randomly pick a buff and a debuff
        const buffs = buffsAndDebuffs.filter(item => item.type === "buff");
        const debuffs = buffsAndDebuffs.filter(item => item.type === "debuff");

        let randomBuff = buffs[Math.floor(Math.random() * buffs.length)];
        let randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];


        // Create a background for the card
        const cardBackground = document.createElement('div');
        cardBackground.style.position = 'fixed';
        cardBackground.style.top = '0';
        cardBackground.style.left = '0';
        cardBackground.style.width = '100%';
        cardBackground.style.height = '100%';
        cardBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        cardBackground.style.display = 'flex';
        cardBackground.style.justifyContent = 'center';
        cardBackground.style.alignItems = 'center';
        cardBackground.style.zIndex = '1000';

        // Create the card element
        const card = document.createElement('div');
        card.style.width = '400px';
        card.style.padding = '20px';
        card.style.backgroundColor = '#fff';
        card.style.borderRadius = '10px';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        card.style.textAlign = 'center';
        card.style.fontFamily = '"Press Start 2P", cursive'; // Pixel-style font
        card.style.color = '#000'; // Black font color

        // Add the buff details
        const buffTitle = document.createElement('h2');
        buffTitle.textContent = `Buff: ${randomBuff.name}`;
        buffTitle.style.marginBottom = '10px';
        card.appendChild(buffTitle);

        const buffStats = document.createElement('ul');
        for (const [key, value] of Object.entries(randomBuff.stats)) {
            const statItem = document.createElement('li');
            statItem.textContent = `${key}: ${value}`;
            buffStats.appendChild(statItem);
        }
        card.appendChild(buffStats);

        // Add the debuff details
        const debuffTitle = document.createElement('h2');
        debuffTitle.textContent = `Debuff: ${randomDebuff.name}`;
        debuffTitle.style.marginTop = '20px';
        debuffTitle.style.marginBottom = '10px';
        card.appendChild(debuffTitle);

        const debuffStats = document.createElement('ul');
        for (const [key, value] of Object.entries(randomDebuff.stats)) {
            const statItem = document.createElement('li');
            statItem.textContent = `${key}: ${value}`;
            debuffStats.appendChild(statItem);
        }
        card.appendChild(debuffStats);

        // Add "Accept" and "Reject" buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-around';

        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accept';
        acceptButton.style.padding = '10px 20px';
        acceptButton.style.border = 'none';
        acceptButton.style.backgroundColor = '#4CAF50';
        acceptButton.style.color = '#fff';
        acceptButton.style.fontFamily = '"Press Start 2P", cursive';
        acceptButton.style.cursor = 'pointer';
        acceptButton.style.borderRadius = '5px';
        acceptButton.addEventListener('click', () => {
            document.body.removeChild(cardBackground);
            events.emit("START_LOOP");
            events.emit("HERO_APPLY_EFFECTS", {
                buff: randomBuff,
                debuff: randomDebuff
            });
            this.handleDelete(this.id);
            this.cardOpened = false;
        });

        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.style.padding = '10px 20px';
        rejectButton.style.border = 'none';
        rejectButton.style.backgroundColor = '#f44336';
        rejectButton.style.color = '#fff';
        rejectButton.style.fontFamily = '"Press Start 2P", cursive';
        rejectButton.style.cursor = 'pointer';
        rejectButton.style.borderRadius = '5px';
        rejectButton.addEventListener('click', () => {
            document.body.removeChild(cardBackground);
            events.emit("START_LOOP");
            this.handleDelete(this.id);
            this.cardOpened = false;

        });

        buttonContainer.appendChild(acceptButton);
        buttonContainer.appendChild(rejectButton);
        card.appendChild(buttonContainer);

        // Append the card to the background
        cardBackground.appendChild(card);
        document.body.appendChild(cardBackground);
    }

    destroy() {
        events.unsubscribe(this);

        this.id = null;
    }
}