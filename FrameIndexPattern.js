export class FrameIndexPattern {
    constructor(animationConfig) {
        this.currentTime = 0;
        this.animationConfig = animationConfig;
        this.duration = animationConfig.duration ?? 400;
        this.lastTime = Date.now(); // Zmienna do mierzenia czasu
        this.framesPerSecond = 0; // Zmienna do przechowywania FPS
        this.frameCount = 0; // Liczba klatek, które zostały obliczone
    }

    get frame() {
        const {frames} = this.animationConfig;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame;
            }
        }
        throw "Time is less than the first frame time";
    }

    step(delta) {
        this.currentTime += delta;
        this.frameCount++; // Zwiększamy licznik klatek
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
        }

        // Oblicz FPS co 1000ms (1 sekunda)
        const currentTime = Date.now();
        if (currentTime - this.lastTime >= 1000) {
            this.framesPerSecond = this.frameCount;
            console.log(`FPS: ${this.framesPerSecond}`);
            this.lastTime = currentTime;
            this.frameCount = 0; // Resetujemy licznik klatek po każdej sekundzie
        }
    }
}