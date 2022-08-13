import { enumValue } from "../../utility/enum";
import { Character, CharacterType } from "../characters/character";
import { parseTexture, Texture } from "../graphic/texture";
import { Obstacle, parseObstacle, serializeObstacle } from "../obstacle/obstacle";
import { isA } from '../../utility/types';
import { randomUUID } from "crypto";

enum Cover { None, Half, Full };
enum WallType { Fence, Wall };

type Tile = {
    elevation: number;
    occupant?: Character | Obstacle;
    cover: Cover;
    type?: WallType;
    openable: boolean; // doors
    textures: Texture[];
    uuid: string;
}

function parseTile(json: string | object, tileTemplates: { [key: string]: Tile } = {}): Tile {
    if (typeof json === "string") {
        if(<string>json in tileTemplates) {
            return Object.assign({}, tileTemplates[<string>json], { uuid: randomUUID() });
        } else {
            throw new Error(`Unknown Template Type "${json}"`);
        }
    } else {
        const properties = ['elevation', 'cover', 'openable', 'textures'];
        const occupant = (json) => {
            if(json) {
                return parseObstacle(json);
            }
            return null;
        }
        if("template" in json) {
            if(<string>json["template"] in tileTemplates) {
                return Object.assign({}, tileTemplates[<string>json["template"]], {
                    occupant: occupant(json["obstacle"]),
                    uuid: randomUUID()
                });
            } else {
                throw new Error(`Unknown Template Type "${json["template"]}"`);
            }
        } else {
            if(!properties.every(p => p in json)) {
                throw new Error(`Missing properties ${properties.filter(p => !(p in json))}`);
            }
            return {
                elevation: parseInt(json['elevation']),
                occupant: occupant(json['obstacle']),
                cover: enumValue(json['cover'], Cover),
                type: enumValue(json['type'], WallType, null),
                openable: !!json['openable'],
                textures: json['textures'].map(json => parseTexture(json)),
                uuid: randomUUID()
            }
        }
    }
}

function characterFor(occupant: Character): string {
    return occupant.uuid;
}

function obstacleFor(occupant: Obstacle): object {
    return serializeObstacle(occupant);
}

function serializeTile(tile: Tile): object {
    const occupant = tile.occupant?
        isA(tile.occupant, CharacterType)?
            characterFor(<Character>tile.occupant) :
            obstacleFor(<Obstacle>tile.occupant)
        :
        null;
    return {
        "cover": tile.cover,
        "elevation": tile.elevation,
        "occupant": occupant,
        "openable": tile.openable,
        "textures": tile.textures,
        "type": tile.type,
        "uuid": tile.uuid
    }
}

export {
    Tile,
    Cover,
    WallType,
    parseTile,
    serializeTile
};
