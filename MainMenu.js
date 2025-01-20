import { gameLoop } from "./main.js";
import { SoundPlayer } from "./Sound.js";

export class MainMenu {
    constructor() {
        this.init();
        this.music = new SoundPlayer();
        this.clickAudio = new SoundPlayer();
        this.music.setSource('/assets/Sounds/menuMusic.mp3');
        this.music.setVolume(0.2);
        this.music.play();
        this.clickAudio.setSource('/assets/Sounds/selectMenu.mp3');
        this.playGame = this.playGame.bind(this);
        this.exitApp = this.exitApp.bind(this);
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
        this.menu.style.top = '0';
        this.menu.style.fontFamily = "'Press Start 2P', cursive";

        // Create semi-transparent overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.width = '450px'; // Ustaw szerokość na 200px
        overlay.style.height = '2000px'; // Opcjonalnie możesz ustawić wysokość, np. 200px
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Czarny z 50% przezroczystości
        overlay.style.transform = 'translate(-50%, -50%)'; // Wycentrowanie względem środka
        overlay.style.zIndex = '1'; // Pozycjonowanie za przyciskami i logo
        this.menu.appendChild(overlay);

        // Create title
        const image = document.createElement('img');
        image.src = './assets/logo.png';
        image.width = 300;
        image.style.marginTop = '-300px';
        image.style.marginBottom = '100px';
        image.style.zIndex = '2'; // Pozycjonowanie nad overlay
        image.style.position = 'relative'; // Współpraca z zIndex
        this.menu.appendChild(image);

        // Create "Play" button
        const playButton = document.createElement('button');
        playButton.textContent = 'PLAY';
        playButton.style.margin = '10px';
        playButton.style.padding = '10px 20px';
        playButton.style.fontSize = '16px';
        playButton.style.cursor = 'url("/assets/cursor_default.png"), auto';
        playButton.onclick = this.playGame;
        playButton.style.fontFamily = "'Press Start 2P', cursive";
        playButton.style.zIndex = '2'; // Pozycjonowanie nad overlay
        playButton.style.position = 'relative'; // Współpraca z zIndex
        this.menu.appendChild(playButton);

        // Create "Exit" button
        const exitButton = document.createElement('button');
        exitButton.textContent = 'EXIT';
        exitButton.style.margin = '10px';
        exitButton.style.padding = '10px 20px';
        exitButton.style.fontSize = '16px';
        exitButton.onclick = this.exitApp;
        exitButton.style.cursor = 'url("/assets/cursor_default.png"), auto';
        exitButton.style.fontFamily = "'Press Start 2P', cursive";
        exitButton.style.zIndex = '2'; // Pozycjonowanie nad overlay
        exitButton.style.position = 'relative'; // Współpraca z zIndex
        this.menu.appendChild(exitButton);

        // Add container to the body
        document.body.appendChild(this.menu);
    }

    playGame = () => {
        document.getElementsByTagName('canvas')[0].style.opacity = '100';
        console.log(this.menu);
        this.menu = document.querySelector(".Menu");
        this.menu.style.zIndex = '-1000';
        this.menu.style.opacity = '0';
        console.log(this.music);
        this.music.pause();
        this.clickAudio.play();
        gameLoop.start();
    }

    exitApp = async () => {
        this.clickAudio.play();

        const { appWindow } = window.__TAURI__.window;
        await appWindow.close();
    }
}
