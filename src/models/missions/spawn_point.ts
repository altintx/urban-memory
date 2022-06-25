import { enumValue } from "../../utility/enum";
import { Faction } from "../characters/character";

type SpawnPoint = {
    x: number;
    y: number;
    faction: Faction;
    character_uuid?: string;
}
function parseSpawnPoint (json: object): SpawnPoint {
    return {
        x: parseInt(json['x']),
        y: parseInt(json['y']),
        faction: enumValue(json['faction'], Faction),
        character_uuid: json['character_uuid']
    };
}
export {
    SpawnPoint,
    parseSpawnPoint
};
