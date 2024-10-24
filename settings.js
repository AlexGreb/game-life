import {getGridData} from "./utils.js";

class Settings {
    constructor() {
        this.speedControl = document.getElementById('generationTime');
        this.sizeGridControl = document.getElementById('sizeGrid');
        this.colorCellControl = document.getElementById('cellColor');
        this.bgColorControl = document.getElementById('bgColor');
        this.countGenerationContainer = document.querySelector('.time >  span');
        
        this.speed = parseInt(this.speedControl?.value || 500);
        this.sizeGrid = parseInt(this.sizeGridControl?.value || 500);
        this.colorCells = this.colorCellControl.value;
        this.bgColor = this.bgColorControl.value;
    }
    
    // get settings() {
    //     return {
    //         speed: this.speed,
    //         sizeGrid: this.sizeGrid,
    //         colorCells: this.colorCells,
    //         bgColor: this.bgColor
    //     }
    // }
    
    initListeners = () => {
        this.generateCellsBtn.addEventListener('click', () => {
            // if(startGame) return
            // startGame = true;
            // disableBtns();
            // gridData = getGridData(sizeGrid, true);
            // drawer.drawGrid(gridData);
            // timer.start(tick, gridData, speed);
        });

        this.speedControl.addEventListener('change', (e) => {
            const target = e.target;
            this.speed = parseInt(target.value || target.min) ;
            target.value = this.speed;
            // if(startGame) {
            //     timer.clearTimer();
            //     timer.start(tick, gridData, speed);
            // }
        });

        this.startBtn.addEventListener('click', () => {
            // if(startGame) return;
            // startGame = true;
            // disableBtns();
            // timer.start(tick, gridData, speed)
        });

        this.sizeGridControl.addEventListener('change', (e) => {
            // if(startGame) return
            // sizeGrid = parseInt(e.target.value);
            // sizeCell = Math.ceil(canvasWidth / sizeGrid);
        });

        this.colorCellControl.addEventListener('change', (e) => {
            // colorCells = e.target.value
        });

        this.bgColorControl.addEventListener('change', (e) => {
            // bgColor = e.target.value
        })

        this.resetBtn.addEventListener('click', () => {
            // resetGame();
        });

        this.stopBtn.addEventListener('click', () => {
            // timer.clearTimer();
            // startGame = false;
        })
    }
}

export {Settings}