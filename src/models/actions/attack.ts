import { Translatable } from "../../utility/strings";
import { Action } from "../action";
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
    uuid: "48044bbe-0817-4c1a-908c-5672ff2caba8",
    available(source, destination, action, mission): boolean {
        return available(source, destination, action, mission, {} as Weapon);
    },
    hasSecondarySelection: true
}

const ATTACK_SECONDARY: Action = {
    ...ATTACK_PRIMARY,
    name: new Translatable({
        en: "Attack (secondary)"
    }),
    cooldown: 0,
    uuid: "fb9dbab7-6e1e-408f-b74d-0706fb8d0f20",
    ap: 1
}

export { ATTACK_PRIMARY, ATTACK_SECONDARY };

