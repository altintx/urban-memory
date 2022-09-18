import { Translatable } from "../../utility/strings";
import { isA } from "../../utility/types";
import { Action } from "../action";
import { Character, CharacterType } from "../characters/character";
import { Game } from "../game";
import { coordinatesForTile } from "../map/map";

const MOVE: Action = {
    name: new Translatable({
        en: "Move"
    }),
    ap: 1,
    cursor: 'grabbing',
    xp: 0,
    uuid: "a1e8f8f0-f8f0-11e9-b210-d663bd873d93",
    cooldown: 0,
    hasSecondarySelection: true,
    available(source, destination, action, mission): boolean {
        if(!destination) return false;
        if(!source) return false;
        const [x1, y1] = coordinatesForTile(mission.map, source);
        const [x2, y2] = coordinatesForTile(mission.map, destination);
        
        if(destination.occupant) return false;
        const maxMovement = 5 * action.ap;
        const distance = Math.abs(x2-x1) + Math.abs(y2-y1);
        return (distance <= maxMovement);
        // todo
        // find path from source to destination
        // find character's allowed movement
        // find character's remaining ap 
        // return path.length <= character.movement * action.ap
    },
    execute(source, destination, action, mission, game): Game {
        const [x1, y1] = coordinatesForTile(mission.map, source);
        const [x2, y2] = coordinatesForTile(mission.map, destination);
        const distance = Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
        const movement = Math.floor(distance / action.ap);
        if(isA(source.occupant, CharacterType) && movement <= (source.occupant as Character).ap) {
            (source.occupant as Character).ap -= movement;
            destination.occupant = source.occupant;
            source.occupant = null;
            return game;
        }
    }
}

const DASH: Action = {
    ...MOVE,
    uuid: "b1e8f8f0-f8f0-11e9-b210-d663bd873d93",
    name: new Translatable({
        en: "Dash"
    }),
    cooldown: 1,
    ap: 2,
}

export { MOVE, DASH };
