import { Translatable } from "../../utility/strings";
import { Action, Cooldown } from "../action";
import { distanceBetween } from "../map/map";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

export const HEAL: Action = {
    "name": new Translatable({
        "en": "Heal",
        "de": "Heilen",
        "fr": "Guérir",
        "es": "Curar",
        "it": "Guarire",
        "pl": "Uleczyć",
        "pt": "Cura",
        "ru": "Лечить",
        "zh": "治疗"
    }),
    "description": new Translatable({
        "en": "Heal a unit for 10 HP.",
        "de": "Heile eine Einheit um 10 HP.",
        "fr": "Guérissez une unité de 10 HP.",
        "es": "Cura una unidad por 10 HP.",
        "it": "Guarisci un'unità per 10 HP.",
        "pl": "Ulecz jednostkę o 10 HP.",
        "pt": "Cure uma unidade por 10 HP.",
        "ru": "Исцелите юнит на 10 HP.",
        "zh": "治疗一个单位10点生命值。"
    }),
    "hasSecondarySelection": true,
    "ap": 1,
    "xp": 30,
    uuid: "6d218c7a-d5d2-47aa-a503-0717973a0008",
    "cooldown": Cooldown.None,
    available(source: Tile, destination: Tile, action: Action, mission: Mission): boolean {
        return distanceBetween(mission.map, source, destination) === 1;
    },
    
}