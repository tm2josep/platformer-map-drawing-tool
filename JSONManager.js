export class JSONManager {
    constructor(url) {
        this.url = url;
        this.data = [];
    }

    addRange(range) {
        if (!this.data.find(({ tile }) => tile === 'default')) {
            this.data.push({
                tile: 'default',
                ranges: [range]
            });
            return;
        }

        let d = this.data.find(({ tile }) => tile === 'default');
        d.ranges.push(range);
    }

    undo() {
        let d = this.data.find(({tile}) => tile === 'default');
        d.ranges.pop();
    }

    async fetchData() {
        let d = await fetch(this.url).then(r => r.json());
        this.data = d.terrain;
    }

    get jsonString() {
        let obj = {};
        obj["terrain"] = this.data;
        return JSON.stringify(obj);
    }

    drawTiles(ctx, tileManager) {
        this.data.forEach(({ tile, ranges }) => {
            ranges.forEach((range) => {
                tileManager.drawTiles(ctx, tile, range)
            });
        });
    }
}