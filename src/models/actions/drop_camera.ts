import { Translatable } from "../../utility/strings";
import { Action } from "../action";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

export const DROP_CAMERA: Action = {
    "name": new Translatable({
        "en": "Drop Camera",
        "de": "Kamera ablegen",
        "fr": "Déposer la caméra"
    }),
    "description": new Translatable({
        "en": "Drop a camera on this tile, to continue monitoring activity here even after you move away.",
        "de": "Lege eine Kamera auf dieses Feld, um die Aktivität hier auch nachdem du dich entfernt hast zu überwachen.",
        "fr": "Déposez une caméra sur cette case pour continuer à surveiller l'activité ici même après avoir quitté le secteur."
    }),
    "ap": 1,
    "xp": 0,
    "cooldown": 0,
    "count": 1,
    uuid: "88d6d985-8e98-407a-9229-4ba4ab9013a0",
    available: function (source: Tile, destination: Tile, action: Action, mission: Mission): boolean {
        throw new Error("Function not implemented.");
    },
    hasSecondarySelection: false
}
