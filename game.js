import {getNeighbors} from "./utils.js";
import {Timer} from "./timer.js";

class Game {
    constructor(drawer, settings) {
        this.drawer = drawer;
        this.timer = new Timer();
        this.setStateGame = false;
        this.cycleCount = 0;
        this.settings = settings;
        // this.generationCountContainer = 
    }
    
    set setStateGame(state) {
        this.isStartGame = state;
    }
    
    get stateGame () {
        return this.isStartGame
    }
    
    evolve = (gridData) => {
        const neighbors = getNeighbors(gridData);
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

        this.cycleCount++;
        // setTime(time);
    }

    start = (gridData) => {
        this.setStateGame = true;
        this.timer.start(this.evolve, gridData, this.settings.speed);
    }
    
    stop = () => {
        this.setStateGame = false;
        this.timer.clearTimer();
    }
    
    reset = () => {
        this.timer.clearTimer();
        this.setStateGame = false;
        this.drawer.clearCanvas();
        this.cycleCount = 0;
        // setTime(time);
        // gridData = getGridData(sizeGrid);
        this.drawer.clearCanvas();
        // drawGrid(gridData);
        // enableBtns()
    }
}

export {Game}