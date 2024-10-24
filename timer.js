class Timer {
    constructor() {
        this.lastTime = 0;
        this.deltaTime = 0;
        this.animationFrame = null;
        this.speed = 0; // Значение по умолчанию
    }

    tick = (time) => {


        if (this.lastTime === 0) {
            this.lastTime = time;
        }

        this.deltaTime = time - this.lastTime;

        if (this.deltaTime >= this.speed) {
            this.lastTime = time;
            this.cb(this.args);
        }
        if (this.animationFrame === null) return;
        this.animationFrame = requestAnimationFrame(this.tick);
    }

    clearTimer = () => {
        cancelAnimationFrame(this.animationFrame);
        this.lastTime = 0;
        this.deltaTime = 0;
        this.animationFrame = null;
    }

    start = (cb, args, speed) => {
        if (this.animationFrame !== null) return;
        this.speed = speed;
        this.cb = cb;
        this.args = args;
        this.animationFrame = requestAnimationFrame(this.tick);
    }
}


export {
    Timer
}
