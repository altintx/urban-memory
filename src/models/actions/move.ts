import { Translatable } from "../../utility/strings";
import { Action } from "../action";
import { coordinatesForTile } from "../map/map";

const MOVE: Action = {
    name: new Translatable({
        en: "Move"
    }),
    ap: 1,
    xp: 0,
    cooldown: 0,
    available(source, destination, action, mission): boolean {
        if(!destination) return false;
        if(!source) return false;
        const [x1, y1] = coordinatesForTile(mission.map, source);
        const [x2, y2] = coordinatesForTile(mission.map, destination);
        
        if(destination.occupant) return false;
        const maxMovement = 5;
        const distance = Math.ceil(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
        if(distance <= maxMovement) return true;
        return false;
        // todo
        // find path from source to destination
        // find character's allowed movement
        // find character's remaining ap 
        // return path.length <= character.movement * action.ap
    },
}

const DASH: Action = {
    ...MOVE,
    name: new Translatable({
        en: "Dash"
    }),
    cooldown: 1,
    ap: 2
}

export { MOVE, DASH };
