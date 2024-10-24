import {getGridData} from "./utils.js";

class Settings {
    constructor() {
        this.speedControl = document.getElementById('generationTime');
        this.sizeGridControl = document.getElementById('sizeGrid');

        this.speed = parseInt(this.speedControl?.value || 500);
        this.sizeGrid = parseInt(this.sizeGridControl?.value || 500);
        this.initListeners();
    }


    initListeners = () => {
        this.speedControl.addEventListener('change', (e) => {
            const target = e.target;
            this.speed = parseInt(target.value || target.min);
            target.value = this.speed;
            this.onSpeedChange(this.speed);
        });


        this.sizeGridControl.addEventListener('change', (e) => {
            this.sizeGrid = parseInt(e.target.value);
            this.onSizeGridChange();
        });
    }

    // переопределяются
    onSpeedChange = () => {};
    onSizeGridChange = () => {};
}

export {Settings}
