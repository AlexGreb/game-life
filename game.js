import {getNeighbors} from "./utils.js";
import {Timer} from "./timer.js";

class Game {
    constructor(drawer, settings) {
        this.drawer = drawer;
        this.timer = new Timer();
        this.setStateGame = false;
        this.cycleCount = 0;
        this.settings = settings;
        this.generationStory = new Set();
    }

    set setStateGame(state) {
        this.isStartGame = state;
    }

    get stateGame () {
        return this.isStartGame
    }

    checkFinish = (gridData) => {
        let generation = '';
        gridData.forEach((row, i) => {
            row.forEach((col, j) => {
                generation += col.toString();
            })
        })
        if(!this.generationStory.has(generation)) {
            this.saveGeneration(generation);
            return false;
        }
        return true;
    }

    evolve = (gridData) => {
        const neighbors = getNeighbors(gridData);
        if(this.checkFinish(gridData)) {
            this.finish();
            return;
        }
        gridData.forEach((row, y) => {
            row.forEach((cell, x) => {
                const countAlive = neighbors[y][x];
                const newState = Number(cell ? countAlive === 2 || countAlive === 3 : countAlive === 3);

                // Перерисовываем клетку только если её состояние изменилось
                if (cell !== newState) {
                    gridData[y][x] = newState;
                    this.drawer.drawCell(x, y, newState)
                }
            });
        });
        this.drawer.setGenerationCount(++this.cycleCount);
    }

    start = (gridData) => {
        this.setStateGame = true;
        this.timer.start(this.evolve, gridData, this.settings.speed);
    }

    stop = () => {
        this.setStateGame = false;
        this.timer.clearTimer();
    }

    saveGeneration = (generation) => {
        this.generationStory.add(generation)
    }

    resetGenerationStory = () => {
        this.generationStory.clear();
    }

    finish = () => {
        this.resetGenerationStory();
        this.timer.clearTimer();
    }

    reset = () => {
        this.timer.clearTimer();
        this.setStateGame = false;
        this.cycleCount = 0;
        this.drawer.clearCanvas();
        this.drawer.setGenerationCount(this.cycleCount);
    }
}

export {Game}
