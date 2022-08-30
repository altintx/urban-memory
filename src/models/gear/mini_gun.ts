import { Translatable } from "../../utility/strings"
import { Gear } from "./gear";

export const MINI_GUN: Gear = {
    "uuid": "c1b5b1f0-1b8f-4b9f-8b1f-0b8f4b9f8b1f",
    "name": new Translatable({
        "en": "Mini Gun",
        "de": "Minigewehr",
        "fr": "Mini fusil"
    }),
    "description": new Translatable({
        "en": "A small gun that shoots a lot of bullets",
        "de": "Ein kleines Gewehr, das viele Kugeln schießt",
        "fr": "Un petit fusil qui tire beaucoup de balles"
    }),
    "type": "weapon",
    "subtype": "primary",
    "stats": {
        "damage": 15,
        "range": 10,
        "accuracy": 0,
        "critical": 0,
        "weight": 10
    }
};
