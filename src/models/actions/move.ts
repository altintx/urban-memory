import { Translatable } from "../../utility/strings";
import { Action } from "../action";

const MOVE: Action = {
    name: new Translatable({
        en: "Move"
    }),
    ap: 1,
    xp: 0,
    cooldown: 0,
    available(source, destination, action, mission): boolean {
        // find path from source to destination
        // find character's allowed movement
        // find character's remaining ap 
        // if path.length <= character.movement * action.ap
        return true;
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
