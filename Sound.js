export class SoundPlayer {
    constructor() {
        this.audio = new Audio();
    }

    setSource(src) {
        this.audio.src = src;
    }

    play() {
        if (this.audio.src) {
            this.audio.play().catch((error) => {
                console.error('Błąd odtwarzania dźwięku: ', error);
            });
        } else {
            console.error('Brak źródła dźwięku.');
        }
    }

    pause() {
        this.audio.pause();
    }

    setVolume(volume) {
        this.audio.volume = Math.min(Math.max(volume, 0), 1); // Zapewnia wartość między 0 a 1
    }

    setLoop(loop) {
        this.audio.loop = loop;
    }

    isPlaying() {
        return !this.audio.paused;
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}