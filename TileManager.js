import {TILE_SIZE} from './Constants.js';
export class TileManager {
    constructor() {
        this.tiles = {};
    }

    drawTiles(context, tileName, range) {
        context.save();
        context.fillStyle = this.tiles[tileName];
        for (let i = range[0]; i < range[1]; i++) {
            for (let j = range[2]; j < range[3]; j++) {
                context.fillRect(
                    i * TILE_SIZE,
                    j * TILE_SIZE,
                    TILE_SIZE,
                    TILE_SIZE
                );
            }
        }
        context.restore();
    }

    defineTile(name, color) {
        this.tiles[name] = color;
    }

}