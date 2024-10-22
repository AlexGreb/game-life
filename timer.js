class Timer {
    constructor() {
        this.lastTime = 0;
        this.deltaTime = 0;
        this.animationFrame = null;
    }

    tick = (time) => {
        this.deltaTime = time - this.lastTime;

        if (this.deltaTime >= this.speed) {
            this.cb(this.args);
            this.lastTime = time;
        }

        this.animationFrame = requestAnimationFrame(this.tick);
    }

    clearTimer = () => {
        cancelAnimationFrame(this.animationFrame);
        this.lastTime = 0;
        this.deltaTime = 0;
        this.animationFrame = null;
    }

    start = (cb, args, speed) => {
        this.speed = speed;
        this.cb = cb;
        this.args = args;
        requestAnimationFrame(this.tick);
    }
}

export {
    Timer
}
