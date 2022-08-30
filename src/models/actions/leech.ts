import { Translatable } from "../../utility/strings";
import { Action } from "../action";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

export const LEECH: Action = {
    "name": new Translatable({
        "en": "Apply leech for up to 4HP",
        "de": "Lebensraub für bis zu 4 Leben",
        "ja": "回復効果を4HPまで付与",
        "fr": "Applique un bonus de régénération pour jusqu'à 4 points de vie",
        "zh": "恢复力果，恢复4点生命值",
        "ru": "Наносит урон врагам до 4 ед."
    }),
    "ap": 1,
    "xp": 20,
    "cooldown": 4,
    uuid: "957c3e89-069a-4c1d-9eb9-67c8b0b11afa",
    available: function (source: Tile, destination: Tile, action: Action, mission: Mission): boolean {
        throw new Error("Function not implemented.");
    },
    hasSecondarySelection: true
};
