import { Translatable } from "../../utility/strings";
import { Action } from "../action";
import { Character } from "../characters/character";
import { Weapon } from "../characters/weapon";
import { coordinatesForTile } from "../map/map";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

function available(source: Tile, destination: Tile, action: Action, mission: Mission, weapon: Weapon): boolean {
    const map = mission.map;
    const [x1, y1] = coordinatesForTile(map, source);
    const [x2, y2] = coordinatesForTile(map, source);
    if(!source) return false;
    if(!destination) return false;
    if(!destination.occupant) return false;
    const maxMovement = 5; // todo: source's occupant's primary weapon's range
    const distance = Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
    if(distance <= maxMovement) return true;
    return false;
}

const ATTACK_PRIMARY: Action = {
    name: new Translatable({
        en: "Attack (primary)"
    }),
    ap: 1,
    xp: 10,
    cooldown: 0,
    uuid: "e1e8f8f0-f8f0-11e9-b210-d663bd873d93",
    available(source, destination, action, mission): boolean {
        return available(source, destination, action, mission, {} as Weapon);
    },
}

const ATTACK_SECONDARY: Action = {
    ...ATTACK_PRIMARY,
    name: new Translatable({
        en: "Attack (secondary)"
    }),
    cooldown: 0,
    uuid: "f1e8f8f0-f8f0-11e9-b210-d663bd873d93",
    ap: 1
}

export { ATTACK_PRIMARY, ATTACK_SECONDARY };

