import { Translatable } from "../../utility/strings"
import { Character } from "../characters/character"
import { Mission } from "../missions/mission"

const BUFF_DEEP_POCKETS = {
    "name": new Translatable({
        "en": "Deep pockets",
        "de": "Tiefe Taschen",
        "fr": "Poche profonde",
        "es": "Bolsillos profundos",
        "it": "Tasche profonde",
        "pl": "Głębokie kieszenie",
        "pt": "Bolsos profundos",
        "ru": "Глубокие карманы",
        "zh": "深口袋",
        "ja": "深いポケット",
        "ko": "깊은 포켓"
    }),
    uuid: "f1bac4a4-f99a-4ca4-97d5-e3f18745b3bf",
    "strength": {
        "passive": 1
    },
    permute(_mission: Mission, _character: Character, _buff): Character {
        // todo
        // _character.gear.capacity += 1;
        return _character;
    }
}

export { BUFF_DEEP_POCKETS};