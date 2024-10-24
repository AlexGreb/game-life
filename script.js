import {GameControls} from "./gameControls.js";
import {Drawer} from './drawer.js';
import {Settings} from "./settings.js";
import {Game} from './game.js';
import {getGridData} from "./utils.js";


window.addEventListener('load', () => {
    const settings = new Settings();
    const drawer = new Drawer(settings.sizeGrid);
    const game = new Game(drawer, settings);
    const gameControls = new GameControls(game, settings, drawer);

    drawer.onClick = (e) => {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const x = Math.ceil((e.clientX - rect.x) / drawer.sizeCell) - 1;
        const y = Math.ceil((e.clientY - rect.y) / drawer.sizeCell) - 1;
        gameControls.gridData[y][x] = gameControls.gridData[y][x] ? 0 : 1;
        drawer.drawCell(x, y, gameControls.gridData[y][x]);
    }

    settings.onSpeedChange = () => {
        game.stop();
        if(game.stateGame) {
            game.start(gameControls.gridData);
        }
    };
    settings.onSizeGridChange = () => {
        game.reset();
        gameControls.gridData = getGridData(settings.sizeGrid);
        drawer.sizeCell = Math.ceil(drawer.width / settings.sizeGrid);
        gameControls.enableControlsAfterStop();
    };

    gameControls.onReset = () => {
        game.reset();
    }
});


