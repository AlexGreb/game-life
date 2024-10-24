class Drawer {
    constructor(sizeGrid, colorCells, bgColor) {
        const canvas = document.getElementById('gameCanvas');
        canvas.addEventListener('click', (e) => this.handleClick(e))
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.sizeCell = Math.ceil(this.width / sizeGrid);
        this.colorCells = colorCells;
        this.bgColor = bgColor;
    }

    
    // переопределяется в script.js
    handleClick = (e) => {}
    
    drawGrid = (gridData) => {
        gridData.forEach((row, y) =>
            row.forEach((cell, x) => this.drawCell(x, y, cell))
        );
    }

    drawCell = (x, y, cell) => {
        this.ctx.clearRect(x * this.sizeCell, y * this.sizeCell, this.sizeCell, this.sizeCell);
        this.ctx.fillStyle = cell ? this.colorCells : this.bgColor;
        this.ctx.fillRect(x * this.sizeCell, y * this.sizeCell, this.sizeCell, this.sizeCell);
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

export {Drawer};
