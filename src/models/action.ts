import { Translatable } from "../utility/strings"
import { Game } from "./game";
import { Tile } from "./map/tile";
import { Mission } from "./missions/mission";

export enum InteractionMode { Hovering, Select, }

export enum Cooldown {
    None,
    Short,
    Long
}
export type Action = {
    name: Translatable;
    description?: Translatable;
    ap: number;
    cooldown: Cooldown;
    xp: number;
    uuid: string;
    available: (source: Tile, destination: Tile, action: Action, mission: Mission) => boolean;
    execute?: (source: Tile, destination: Tile, action: Action, mission: Mission, game: Game) => Game;
    hasSecondarySelection: boolean;
    count?: number;
    cursor?: 'auto' | 'pointer' | 'grab' | 'grabbing' | 'crosshair' | 'none';
}

export function serializeAction(action: Action): object {
    return {
        name: action.name.translations,
        ap: action.ap,
        cooldown: action.cooldown,
        xp: action.xp,
        uuid: action.uuid,
        hasSecondarySelection: action.hasSecondarySelection,
        count: action.count,
        cursor: action.cursor,
    }
}