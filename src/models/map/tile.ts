import { Character } from "../characters/character";
import { Obstacle } from "../obstacle/obstacle";

enum Cover { None, Half, Full };
enum WallType { Fence, Wall };

type Wall = {
    cover: Cover;
    type: WallType;
    destructable: boolean;
    openable: boolean; // doors
}

type Tile = {
    elevation: number;
    occupant?: Character | Obstacle;
    wall: Wall[];
}

export {
    Tile,
    Cover,
    WallType,
    Wall
};
