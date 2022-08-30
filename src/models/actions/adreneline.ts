import { Translatable } from "../../utility/strings";
import { Action } from "../action";

const ADRENALINE: Action = {
    "name": new Translatable({
        "en": "Inject Adrenaline",
        "de": "Adrenalininjektion",
        "ja": "アドレナリンを注入",
        "fr": "Injection d'adrénaline",
        "zh": "注入血氧酸",
        "ru": "Ввести адреналин",
        "pl": "Wprowadź adrenaliny",
        "ko": "아드레날린 주입",
        "es": "Inyectar adrenalina"
    }),
    ap: -1,
    xp: 0,
    cooldown: 0,
    count: 1,
    hasSecondarySelection: false,
    uuid: "d5f8f8f0-f8f0-11e9-b210-d663bd873d93",
    available(_source, _destination, _action, _mission): boolean {
        // need to know character at source
        // need to know if character has adrenaline
        // valid if character hasn't used adrenaline yet
        
        return true;
    },
}