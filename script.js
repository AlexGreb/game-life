import {Timer} from "./timer.js";

window.addEventListener('load', () => {
    //canvas
    const canvas = document.getElementById('gameCanvas');
    if(!canvas) return
    const ctx = canvas.getContext('2d');
    const canvasWithAttr = canvas.getAttribute('width');
    const canvasHeightAttr = canvas.getAttribute('height');
    const canvasWidth = parseInt(canvasWithAttr);
    const canvasHeight = parseInt(canvasHeightAttr);

    //settings controls
    const speedControl = document.getElementById('generationTime');
    const sizeGridControl = document.getElementById('sizeGrid');

    const colorCellControl = document.getElementById('cellColor');
    const bgColorControl = document.getElementById('bgColor');

    const countGenerationContainer = document.querySelector('.time >  span');
    const generateCellsBtn = document.getElementById('generateBtn');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');

    //values
    let speed = parseInt(speedControl?.value || 500);
    let sizeGrid = parseInt(sizeGridControl?.value || 500);
    let colorCells = colorCellControl.value;
    let bgColor = bgColorControl.value;
    const sizeCanvas = parseInt(canvas.getAttribute('width'));
    let sizeCell = Math.ceil(sizeCanvas / sizeGrid);
    let gridData = getGridData();

    // вынести в функцию?
    const timer = new Timer();
    let time = 0;
    let startGame = false;

    //listeners
    generateCellsBtn.addEventListener('click', () => {
        if(startGame) return
        startGame = true;
        disableBtns();
        gridData = getGridData(true);
        drawGrid(gridData);
        timer.start(tick, gridData, speed);
    })

    canvas.addEventListener('click', (e) => {
        if(startGame) return
        const rect = e.target.getBoundingClientRect();
        const x = Math.ceil((e.clientX - rect.left) / sizeCell) - 1;
        const y = Math.ceil((e.clientY - rect.top) / sizeCell) - 1;
        gridData[y][x] = gridData[y][x] ? 0 : 1;
        drawGrid(gridData);
    })

    speedControl.addEventListener('change', (e) => {
        const target = e.target;
        speed = parseInt(target.value || target.min) ;
        target.value = speed;
        if(startGame) {
            timer.clearTimer();
            timer.start(tick, gridData, speed);
        }
    })

    startBtn.addEventListener('click', () => {
        if(startGame) return;
        startGame = true;
        disableBtns();
        timer.start(tick, gridData, speed)
    })

    sizeGridControl.addEventListener('change', (e) => {
        if(startGame) return
        sizeGrid = parseInt(e.target.value);
        sizeCell = Math.ceil(sizeCanvas / sizeGrid);
    })

    colorCellControl.addEventListener('change', (e) => {
        colorCells = e.target.value
    });

    bgColorControl.addEventListener('change', (e) => {
        bgColor = e.target.value
    })

    resetBtn.addEventListener('click', () => {
        resetGame();
    });

    stopBtn.addEventListener('click', () => {
        timer.clearTimer();
        startGame = false;
    })

    //methods

    function getGridData(isRandom = false) {
        const data = [];
        for(let i = 0; i < sizeGrid; i++) {
            const row = [];
            for(let j = 0; j < sizeGrid; j++) {
                row[j] = isRandom ? Math.round(Math.random()) : 0;
            }
            data.push(row);
        }
        return data;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawCell(x, y, state) {
        ctx.clearRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
        ctx.fillStyle = state ? colorCells : bgColor;
        ctx.fillRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
    }

    function drawGrid(gridData) {
        gridData.forEach((row, y) =>
            row.forEach((cell, x) => drawCell(x, y, cell))
        );
    }


    function getNeighbors(gridData) {
        const neighbors = [];
        const gridLength = gridData.length;

        for (let i = 0; i < gridLength; i++) {
            neighbors[i] = [];
            for (let j = 0; j < gridLength; j++) {
                const left = (j - 1 + gridLength) % gridLength;
                const right = (j + 1) % gridLength;
                const top = (i - 1 + gridLength) % gridLength;
                const bottom = (i + 1) % gridLength;

                neighbors[i][j] = gridData[top][left] + // слева вверх
                    gridData[top][j] + // сверху
                    gridData[top][right] + // справа вверх
                    gridData[i][left] + // слева
                    gridData[i][right] + // справа
                    gridData[bottom][left] + // слева вниз
                    gridData[bottom][j] + // снизу
                    gridData[bottom][right]; // справа вниз
            }
        }

        return neighbors;
    }



    function tick(gridData) {
        const neighbors = getNeighbors(gridData);

        gridData.forEach((row, y) => {
            row.forEach((cell, x) => {
                const countAlive = neighbors[y][x];
                const newState = cell ? countAlive === 2 || countAlive === 3 : countAlive === 3;
                // Перерисовываем клетку только если её состояние изменилось
                if (cell !== newState) {
                    gridData[y][x] = newState;
                    drawCell(x, y, newState);
                }
            });
        });

        time++;
        setTime(time);
    }

    function resetGame() {
        timer.clearTimer();
        startGame = false;
        clearCanvas();
        time = 0;
        setTime(time);
        gridData = getGridData();
        drawGrid(gridData);
        enableBtns()
    }

    function setTime() {
        countGenerationContainer.textContent = `${time}`;
    }

    function disableBtns() {
        generateCellsBtn.disabled = true;
    }

    function enableBtns() {
        generateCellsBtn.disabled = false;
    }

});


