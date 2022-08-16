import { randomUUID } from 'crypto';
import {OutOfBoundsError, at, Map} from './map'; 

const oneByOneMap: Map = {
    grid: [
        { 
            elevation: 0, 
            cover: null, 
            openable: false,
            textures: [],
            uuid: 'efdsfsdfsd'
        }
    ],
    width: 1,
    height: 1,
    uuid: randomUUID()
};

describe('OutOfBoundsError', () => {
    it("Has expected properties", () => {
        const g = new OutOfBoundsError(0,0,0,0);
        expect(g.message).toBe(`Valid coordinates are (0 <= x < 0, 0 <= y < 0)`);
        expect(g.x).toBe(0);
        expect(g.y).toBe(0);
    })
});

describe("at", () => {
    it("Should retrieve a tile without boundaries", () => {
        const tile = at(oneByOneMap, 0, 0)
        expect(tile).toBe(oneByOneMap.grid[0]);
    });
    it("Should error if requested tile is out of bounds", () => {
        let success = false;
        try {
            at(oneByOneMap, 0, 1);
        } catch (e) {
            success = true; // there's got to be a better way to do this
        }
        expect(success).toBeTruthy();
    })
})