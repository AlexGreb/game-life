import {getGridData} from './utils.js';

class GameControls {
    constructor(game, settings, drawer) {
        this.game = game;
        this.settings = settings;
        this.drawer = drawer;
        this.generateCellsBtn = document.getElementById('generateBtn');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.gridData = getGridData(this.settings.sizeGrid);
        this.initListeners();
        
    }

    initListeners = () => {
        this.generateCellsBtn.addEventListener('click', () => {
            if(this.game.stateGame) return
            const gridData = getGridData(this.settings.sizeGrid, true);
            this.updateGridData(gridData);
            this.game.start(gridData);
            this.disableControlsAfterStart();
        });
        

        this.startBtn.addEventListener('click', () => {
            if(this.game.stateGame) return
            this.game.start(this.gridData);
            this.disableControlsAfterStart();
        });
        
        this.updateGridData = (gridData) => {
            this.gridData = gridData;
        }
        
        this.resetBtn.addEventListener('click', () => {
            this.drawer.clearCanvas();
        });

        this.stopBtn.addEventListener('click', () => {
            // timer.clearTimer();
            // startGame = false;
        })
    }
    
    disableControlsAfterStart = () => {
        this.generateCellsBtn.disabled = true;
    }

    enableControlsAfterStop = () => {
        this.generateCellsBtn.disabled = false;
    }
}

export {GameControls}