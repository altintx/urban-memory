import { parseTile, serializeTile, Tile } from './tile';
import { memoize } from '../../utility/memoize';
import { Character } from '../characters/character';
type Map = {
    grid: Tile[]; // y * height + x
    width: number;
    height: number;
    uuid: string;
}

class OutOfBoundsError extends Error {
    constructor(public x, public y, width, height) {
        super(`Valid coordinates are (0 <= x < ${width}, 0 <= y < ${height})`);
        Object.setPrototypeOf(this, OutOfBoundsError);
    }
}


function parseMap(json: any): Map {
    const templates = (json["tileTemplates"] || {})
    const templateTiles = Object.keys(templates).reduce((compiler, key) => 
        Object.assign({ [key]: parseTile(templates[key])}, compiler)
    , {})
    return {
        grid: json['grid'].map(json => parseTile(json, templateTiles)),
        width: parseInt(json['width']),
        height: parseInt(json['height']),
        uuid: json['uuid'],
    }
}

function serializeMap(map: Map): object {
    return {
        ...map,
        grid: map.grid.map(tile => serializeTile(tile)),
    };
}

function at(map: Map, x: number, y: number): Tile {
    if(y >= map.height || x >= map.width || x < 0 || y < 0) throw new OutOfBoundsError(x, y, map.width, map.height);
    return map.grid[y * map.height + x];
}

export function tileFor(map: Map, character: Character): Tile {
    return map.grid.filter(tile => tile.occupant === character)[0];
}

const distance = memoize(function _distance(x1, y1, x2, y2): number {
    const w = Math.pow(Math.abs(x2 - x1), 2);
    const h = Math.pow(Math.abs(y2 - y1), 2);
    return Math.floor(Math.sqrt(w + h));
});

const coordsForIndex = memoize(function _coordinatesForIndex(width: number, height: number, index: number) {
    const y = Math.floor(index / height);
    const x = Math.floor(index % width);
    return [x, y]; 
});

function coordinatesForTile(map: Map, tile: Tile): [number, number] {
    const ix = map.grid.indexOf(tile);
    return coordsForIndex(map.width, map.height, ix);
}

function distanceBetween(map: Map, tile1: Tile, tile2: Tile): number {
    const [x1, y1] = coordinatesForTile(map, tile1);
    const [x2, y2] = coordinatesForTile(map, tile2);
    return distance(x1, y1, x2, y2);
}

function getRing(map: Map, x1: number, y1: number, spread: number): Tile[] {
    return map.grid.reduce((tiles, tile, index) => {
        const [x2, y2] = coordsForIndex(map.width, map.height, index);
        const d = distance(x1, y1, x2, y2);
        if (d === spread) {
            return tiles.concat(tile);
        } else {
            return tiles;
        }
    }, []);
}

export {
    Map,
    parseMap,
    serializeMap,
    at,
    getRing,
    OutOfBoundsError,
    coordsForIndex,
    coordinatesForTile,
    distanceBetween,
};
