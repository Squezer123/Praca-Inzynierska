// import { exit } from '@tauri-apps/api/process';

import {gameLoop} from "./main.js";

export class MainMenu {
    constructor() {
        this.init();

    }

    init() {
        // Create main container
        document.getElementsByTagName('canvas')[0].style.opacity = '0';
        this.menu = document.createElement('div');
        this.menu.classList.add('Menu');
        this.menu.style.display = 'flex';
        this.menu.style.flexDirection = 'column';
        this.menu.style.justifyContent = 'center';
        this.menu.style.alignItems = 'center';
        this.menu.style.height = '100vh';
        this.menu.style.width = '100vw';

        this.menu.style.backgroundColor = '#221420';
        this.menu.style.color = '#ffffff';
        this.menu.style.position = 'absolute';
        this.menu.style.top = '100px'

        // Create title
        const image = document.createElement('img');
        image.src = './assets/Logo.png'
        image.width = 400;
        this.menu.appendChild(image);

        // Create "Play" button
        const playButton = document.createElement('button');
        playButton.textContent = 'Graj';
        playButton.style.margin = '10px';
        playButton.style.padding = '10px 20px';
        playButton.style.fontSize = '16px';
        playButton.style.cursor = 'pointer';
        playButton.onclick = this.playGame;
        this.menu.appendChild(playButton);

        // Create "Exit" button
        const exitButton = document.createElement('button');
        exitButton.textContent = 'Wyłącz';
        exitButton.style.margin = '10px';
        exitButton.style.padding = '10px 20px';
        exitButton.style.fontSize = '16px';
        exitButton.style.cursor = 'pointer';
        exitButton.onclick = this.exitApp;
        this.menu.appendChild(exitButton);

        // Add container to the body
        document.body.appendChild(this.menu);
    }

    playGame() {
        document.getElementsByTagName('canvas')[0].style.opacity = '100';
        console.log(this.menu);
        this.menu = document.querySelector(".Menu");
        this.menu.style.zIndex = '-1000';
        gameLoop.start();
    }

    async exitApp() {
        // await exit(1)
    }
}



