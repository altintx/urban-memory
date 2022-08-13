import { Translatable } from "../utility/strings"
import { Tile } from "./map/tile";
import { Mission } from "./missions/mission";

export enum Cooldown {
    None,
    Short,
    Long
}
export type Action = {
    name: Translatable;
    ap: number;
    cooldown: Cooldown;
    xp: number;
    uuid: string;
    available: (source: Tile, destination: Tile, action: Action, mission: Mission) => boolean;
}

export function serializeAction(action: Action): object {
    return {
        name: action.name.translations,
        ap: action.ap,
        cooldown: action.cooldown,
        xp: action.xp,
        uuid: action.uuid,
    }
}