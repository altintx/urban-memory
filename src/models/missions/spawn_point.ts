import { enumValue } from "../../utility/enum";
import { Faction } from "../characters/character";

type SpawnPoint = {
    x: number;
    y: number;
    faction: Faction;
    character_uuid?: string;
}
function parseSpawnPoint (json: object): SpawnPoint {
    const faction = enumValue(json['faction'], Faction);
    const x = parseInt(json['x']);
    const y = parseInt(json['y']);
    const character_uuid = json['character_uuid'];
    return {
        x,
        y,
        faction,
        character_uuid
    };
}
function serializeSpawnPoint(sp: SpawnPoint): object {
    return {
        ...sp
    }
}
export {
    SpawnPoint,
    parseSpawnPoint,
    serializeSpawnPoint
};
