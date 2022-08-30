import { Translatable } from "../../utility/strings"
import { Gear } from "./gear"

export const SNIPER_RIFLE: Gear = {
    "name": new Translatable({
        "en": "Sniper Rifle",
        "ru": "Снайперская винтовка",
        "de": "Scharfschützengewehr",
        "fr": "Fusil de sniper",
        "es": "Rifle de francotirador",
        "it": "Fucile da cecchino",
        "pl": "Karabin snajperski"
    }),
    "description": new Translatable({
        "en": "A long-range rifle that is used to take out enemies from a distance.",
        "ru": "Дальнобойная винтовка, которая используется для уничтожения врагов на расстоянии.",
        "de": "Ein Langstreckengewehr, das verwendet wird, um Feinde von einer Entfernung aus zu eliminieren.",
        "fr": "Un fusil à longue portée utilisé pour éliminer les ennemis à distance.",
        "es": "Un rifle de largo alcance que se usa para eliminar a los enemigos a distancia.",
        "it": "Un fucile a lunga portata utilizzato per eliminare gli avversari a distanza.",
        "pl": "Karabin o długim zasięgu, który służy do eliminowania wrogów z odległości."
    }),
    "type": "weapon",
    "subtype": "primary",
    "stats": {
        "damage": 10,
        "range": 10,
        "accuracy": 10,
        "critical": 10,
        "weight": 10
    },
    uuid: "a1733374-8bd9-4d35-938c-b9e59267ffb9"
}
