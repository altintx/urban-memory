import { Character } from "../characters/character";
import { Obstacle } from "../obstacle/obstacle";

enum Cover { None, Half, Full };
enum WallType { Fence, Wall };

type Wall = {
    cover: Cover;
    type: WallType;
    destructable: boolean;
}

type Tile = {
    elevation: number;
    occupant?: Character | Obstacle;
    destructive: boolean;
    destructable: boolean;
    visible: boolean;
    wall: Wall[];
}

export {
    Tile,
    Cover,
    WallType,
    Wall
};
