window.addEventListener('load', () => {
    //canvas
    const canvas = document.getElementById('gameCanvas');
    if(!canvas) return
    const ctx = canvas.getContext('2d');
    const canvasWithAttr = canvas.getAttribute('width');
    const canvasHeightAttr = canvas.getAttribute('height');
    const canvasWidth = parseInt(canvasWithAttr);
    const canvasHeight = parseInt(canvasHeightAttr);

    //controls

    const generationTimeInput = document.getElementById('generationTime');
    const gridSizeInput = document.getElementById('gridSize');
    const cellColorInput = document.getElementById('cellColor');
    const fieldColorInput = document.getElementById('fieldColor');
    const timeContainer = document.querySelector('.time >  span');
    const generateBtn = document.getElementById('generateBtn');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');

    //values
    let speed = parseInt(generationTimeInput?.value || 500);
    let gridSize = parseInt(gridSizeInput?.value || 500);
    let cellColor = cellColorInput.value;
    let fieldColor = fieldColorInput.value;
    const sizeCanvas = parseInt(canvas.getAttribute('width'));
    let cellSize = Math.ceil(sizeCanvas / gridSize);
    let gridData = getGridData();
    const timer = new Timer();
    let time = 0;

    let startGame = false;


    //listeners
    generateBtn.addEventListener('click', () => {
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
        const x = Math.ceil((e.clientX - rect.left) / cellSize) - 1;
        const y = Math.ceil((e.clientY - rect.top) / cellSize) - 1;
        gridData[y][x] = gridData[y][x] ? 0 : 1;
        drawGrid(gridData);
    })

    generationTimeInput.addEventListener('change', (e) => {
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

    gridSizeInput.addEventListener('change', (e) => {
        if(startGame) return
        gridSize = parseInt(e.target.value);
        cellSize = Math.ceil(sizeCanvas / gridSize);
    })

    cellColorInput.addEventListener('change', (e) => {
        cellColor = e.target.value
    });

    fieldColorInput.addEventListener('change', (e) => {
        fieldColor = e.target.value
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
        for(let i = 0; i < gridSize; i++) {
            const row = [];
            for(let j = 0; j < gridSize; j++) {
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
        // Очищаем область клетки
        ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);

        // Рисуем клетку с новым состоянием
        ctx.fillStyle = state ? cellColor : fieldColor;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
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
                // Определяем новое состояние клетки
                const newState = cell ? countAlive === 2 || countAlive === 3 : countAlive === 3;

                // Перерисовываем клетку только если её состояние изменилось
                if (cell !== newState) {
                    gridData[y][x] = newState;
                    drawCell(x, y, newState); // Перерисовка изменённой клетки
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
        timeContainer.textContent = `${time}`;
    }

    function disableBtns() {
        generateBtn.disabled = true;
    }

    function enableBtns() {
        generateBtn.disabled = false;
    }

});

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
