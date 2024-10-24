export function getGridData(sizeGrid, isRandom = false, ) {
    const data = new Array(sizeGrid).fill(0);
    for(let i = 0; i < sizeGrid; i++) {
        const row = new Array(sizeGrid).fill(0);
        for(let j = 0; j < sizeGrid; j++) {
            row[j] = isRandom ? Math.random() < 0.5 ? 1 : 0 : 0;
        }
        data[i] = row;
    }
    return data;
}

export function getNeighbors(gridData) {
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