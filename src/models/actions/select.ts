import { Translatable } from "../../utility/strings";
import { Action } from "../action";

const SELECT_ATTENTION: Action = {
    name: new Translatable({
        en: "Attention!"
    }),
    ap: 0,
    xp: 0,
    cooldown: 0,
    hasSecondarySelection: false,
    uuid: "f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
    available(_source, _destination, _action, _mission): boolean {
        return true;
    },
}

export { SELECT_ATTENTION };