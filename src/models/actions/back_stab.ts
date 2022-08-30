import { Translatable } from "../../utility/strings";
import { Action } from "../action";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

const BACK_STAB: Action = {
    "name": new Translatable({
        "en": "Back Stab",
        "de": "Rückwärtsstich",
        "fr": "Coup de poignard"
    }),
    "ap": 1,
    "xp": 100,
    "cooldown": 10,
    "count": 2,
    uuid: "0610e166-d452-4896-995c-bb0e001c7e62",
    available: function (source: Tile, destination: Tile, action: Action, mission: Mission): boolean {
        throw new Error("Function not implemented.");
    },
    hasSecondarySelection: true
};

export { BACK_STAB };