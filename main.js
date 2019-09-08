import { TileManager } from './TileManager.js';
import { JSONManager } from './JSONManager.js';
import { TILE_SIZE } from './Constants.js';
import { drawTileBorders } from './drawingTools.js';

let canvas = document.getElementById('screen');
let context = canvas.getContext('2d');

(async function () {
    const jManager = new JSONManager('./1-1.json');
    const tiles = new TileManager();
    tiles.defineTile('earth', 'lightbrown');
    tiles.defineTile('flat', 'lightgreen');
    tiles.defineTile('default', 'lightgray');
    await jManager.fetchData();
    drawTileBorders(context);
    jManager.drawTiles(context, tiles);

    const input = new InputHandler(canvas, (r) => {
        drawTileBorders(context);
        jManager.addRange(r);
    }, () => {
        jManager.undo();
    });

    setInterval(() => {
        drawTileBorders(context);
        jManager.drawTiles(context, tiles)
    }, 200)
})();

class InputHandler {
    constructor(element, callback, undo) {
        this.callback = callback;
        this.undo = undo;
        this.point = [];
        element.addEventListener('mousedown', this.down.bind(this));
        element.addEventListener('mouseup', this.up.bind(this));
        document.addEventListener('keydown', this.key.bind(this));
    }

    down(event) {
        event.preventDefault();
        let { layerX, layerY } = event;
        this.point = [this.toIndex(layerX), this.toIndex(layerY)];
    }

    up(event) {
        event.preventDefault();
        let { layerX, layerY } = event;
        let x = this.toIndex(layerX);
        let y = this.toIndex(layerY);

        if (x < this.point[0]) {
            let a = this.point[0];
            this.point[0] = x;
            x = a;
        }

        if (y < this.point[1]) {
            let a = this.point[1];
            this.point[1] = y;
            y = a;
        }

        this.point = [this.point[0], x, this.point[1], y];
        this.callback(this.point);
    }

    key(event) {
        event.preventDefault();
        if (!(event.code === "KeyZ" && event.ctrlKey)) return;
        this.undo();
    }

    toIndex(n) {
        return Math.floor(n / TILE_SIZE);
    }
}

