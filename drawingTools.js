import { TILE_SIZE } from './Constants.js';

export function drawTileBorders(context) {
    let { width, height } = context.canvas;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < width; i += TILE_SIZE) {
        for (let j = 0; j < height; j += TILE_SIZE) {
            context.strokeStyle = 'black';
            context.strokeRect(i, j, TILE_SIZE, TILE_SIZE);
        }
    }
} 