import {GameControls} from "./gameControls.js";
import {Drawer} from './drawer.js';
import {Settings} from "./settings.js";
import {Game} from './game.js';


window.addEventListener('load', () => {
    const settings = new Settings();
    const drawer = new Drawer(settings.sizeGrid, settings.colorCells, settings.bgColor);
    const game = new Game(drawer, settings);
    const gameControls = new GameControls(game, settings, drawer);
    
    // переопределяем callback при клике на canvas 
    drawer.handleClick = (e) => {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const x = Math.ceil((e.clientX - rect.x) / drawer.sizeCell) - 1;
        const y = Math.ceil((e.clientY - rect.y) / drawer.sizeCell) - 1;
        gameControls.gridData[x][y] = gameControls.gridData[x][y] ? 0 : 1;
        drawer.drawCell(x, y, gameControls.gridData[x][y]);
    }
    
    //settings controls
    // const speedControl = document.getElementById('generationTime');
    // const sizeGridControl = document.getElementById('sizeGrid');
    //
    // const colorCellControl = document.getElementById('cellColor');
    // const bgColorControl = document.getElementById('bgColor');
    //
    // const countGenerationContainer = document.querySelector('.time >  span');
    // const generateCellsBtn = document.getElementById('generateBtn');
    // const startBtn = document.getElementById('startBtn');
    // const stopBtn = document.getElementById('stopBtn');
    // const resetBtn = document.getElementById('resetBtn');
    //
    // //values
    // let speed = parseInt(speedControl?.value || 500);
    // let sizeGrid = parseInt(sizeGridControl?.value || 500);
    // let colorCells = colorCellControl.value;
    // let bgColor = bgColorControl.value;
    //
    //
    //
    // let gridData = getGridData(sizeGrid);
    //
    // // вынести в функцию?
    // const timer = new Timer();
    // let time = 0;
    // let startGame = false;
    //
    //
    //
    //
    // //listeners
    // generateCellsBtn.addEventListener('click', () => {
    //     if(startGame) return
    //     startGame = true;
    //     disableBtns();
    //     gridData = getGridData(sizeGrid, true);
    //     drawer.drawGrid(gridData);
    //     timer.start(tick, gridData, speed);
    // })
    //
    // // canvas.addEventListener('click', (e) => {
    // //     if(startGame) return
    // //     const rect = e.target.getBoundingClientRect();
    // //     const y = Math.ceil((e.clientX - rect.x) / sizeCell) - 1;
    // //     const x = Math.ceil((e.clientY - rect.y) / sizeCell) - 1;
    // //     gridData[x][y] = gridData[x][y] ? 0 : 1;
    // //     drawGrid(gridData);
    // // })
    //
    // speedControl.addEventListener('change', (e) => {
    //     const target = e.target;
    //     speed = parseInt(target.value || target.min) ;
    //     target.value = speed;
    //     if(startGame) {
    //         timer.clearTimer();
    //         timer.start(tick, gridData, speed);
    //     }
    // })
    //
    // startBtn.addEventListener('click', () => {
    //     if(startGame) return;
    //     startGame = true;
    //     disableBtns();
    //     timer.start(tick, gridData, speed)
    // })
    //
    // sizeGridControl.addEventListener('change', (e) => {
    //     if(startGame) return
    //     sizeGrid = parseInt(e.target.value);
    //     sizeCell = Math.ceil(canvasWidth / sizeGrid);
    // })
    //
    // colorCellControl.addEventListener('change', (e) => {
    //     colorCells = e.target.value
    // });
    //
    // bgColorControl.addEventListener('change', (e) => {
    //     bgColor = e.target.value
    // })
    //
    // resetBtn.addEventListener('click', () => {
    //     resetGame();
    // });
    //
    // stopBtn.addEventListener('click', () => {
    //     timer.clearTimer();
    //     startGame = false;
    // })
    //
    // //methods
    //
    // function tick(gridData) {
    //     const neighbors = getNeighbors(gridData);
    //
    //     gridData.forEach((row, y) => {
    //         row.forEach((cell, x) => {
    //             const countAlive = neighbors[y][x];
    //             const newState = cell ? countAlive === 2 || countAlive === 3 : countAlive === 3;
    //             // Перерисовываем клетку только если её состояние изменилось
    //             if (cell !== newState) {
    //                 gridData[y][x] = newState;
    //                 drawer.drawCell(x, y, newState)
    //             }
    //         });
    //     });
    //
    //     time++;
    //     setTime(time);
    // }
    //
    // function resetGame() {
    //     timer.clearTimer();
    //     startGame = false;
    //     clearCanvas();
    //     time = 0;
    //     setTime(time);
    //     gridData = getGridData(sizeGrid);
    //     drawer.clearCanvas()
    //     // drawGrid(gridData);
    //     enableBtns()
    // }
    //
    // function setTime() {
    //     countGenerationContainer.textContent = `${time}`;
    // }
    //
    // function disableBtns() {
    //     generateCellsBtn.disabled = true;
    // }
    //
    // function enableBtns() {
    //     generateCellsBtn.disabled = false;
    // }

});


