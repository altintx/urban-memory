import { enumValue } from "../../utility/enum";
import { Character } from "../characters/character";
import { parseTexture, Texture } from "../graphic/texture";
import { Obstacle } from "../obstacle/obstacle";

enum Cover { None, Half, Full };
enum WallType { Fence, Wall };

type Tile = {
    elevation: number;
    occupant?: Character | Obstacle;
    cover: Cover;
    type?: WallType;
    openable: boolean; // doors
    textures: Texture[];
}

function parseTile(json: string | object, tileTemplates: { [key: string]: Tile } = {}): Tile {
    if (typeof json === "string") {
        if(<string>json in tileTemplates) {
            return Object.assign({}, tileTemplates[<string>json]);
        } else {
            throw new Error(`Unknown Template Type "${json}"`);
        }
    } else {
        return {
            elevation: parseInt(json['elevation']),
            occupant: null,
            cover: enumValue(json['cover'], Cover),
            type: enumValue(json['type'], WallType, null),
            openable: !!json['openable'],
            textures: json['textures'].map(json => parseTexture(json))
        }
    }
}

export {
    Tile,
    Cover,
    WallType,
    parseTile
};
