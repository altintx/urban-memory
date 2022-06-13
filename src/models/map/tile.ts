import { enumValue } from "@app/utility/enum";
import { Character } from "@app/models/characters/character";
import { Obstacle } from "@app/models/obstacle/obstacle";

enum Cover { None, Half, Full };
enum WallType { Fence, Wall };

type Tile = {
    elevation: number;
    occupant?: Character | Obstacle;
    cover: Cover;
    type?: WallType;
    openable: boolean; // doors
}

function parseTile(json: object): Tile {
    return {
        elevation: parseInt(json['elevation']),
        occupant: null,
        cover: enumValue(json['cover'], Cover),
        type: enumValue(json['type'], WallType, null),
        openable: !!json['openable']
    }
}

export {
    Tile,
    Cover,
    WallType,
    parseTile
};
