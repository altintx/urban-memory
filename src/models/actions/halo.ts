import { Translatable } from "../../utility/strings"
import { Action, Cooldown } from "../action";

import { ATTACK_PRIMARY } from "./attack";

export const HALO: Action = {
    ...ATTACK_PRIMARY,
    "name": new Translatable({
        "en": "Halo",
        "de": "Heiligenschein",
        "fr": "Halo",
        "es": "Aureola",
        "it": "Aureola",
        "pl": "Światło",
        "pt": "Auréola",
        "ru": "Ореол",
        "zh": "光环",
        "ja": "光環",
        "ko": "빛의 고리",
        "nl": "Halo",
        "sv": "Haló",
        "hi": "हलो",
        "tr": "Hale",
        "vi": "hào quang",
        "th": "เฮลโล",
        "cs": "Svatozář"
    }),
    "ap": 1,
    "xp": 10,
    "cooldown": Cooldown.Long,
    uuid: "52015273-9c15-48ed-ae00-6d57a8d9afd7"
};