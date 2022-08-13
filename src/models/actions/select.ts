import { Translatable } from "../../utility/strings";
import { Action } from "../action";

const SELECT_SELECT: Action = {
    name: new Translatable({
        en: "Select"
    }),
    ap: 0,
    xp: 0,
    cooldown: 0,
    uuid: "a1e8f8f0-f8f0-11e9-b210-d663bd873d93",
    available(_source, _destination, _action, _mission): boolean {
        return true;
    },
}

const SELECT_ATTENTION: Action = {
    name: new Translatable({
        en: "Attention!"
    }),
    ap: 0,
    xp: 0,
    cooldown: 0,
    uuid: "f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
    available(_source, _destination, _action, _mission): boolean {
        return true;
    },
}

export { SELECT_SELECT, SELECT_ATTENTION };