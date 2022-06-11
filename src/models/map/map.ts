import { parseTile, Tile } from './tile';
type Map = {
    grid: Tile[]; // y * height + x
    width: number;
    height: number;
}

function parseMap(json: any): Map {
    return {
        grid: json['grid'].map(json => parseTile(json)),
        width: parseInt(json['width']),
        height: parseInt(json['height']),
    }
}

export {
    Map,
    parseMap
};
