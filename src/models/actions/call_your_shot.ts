import { Translatable } from "../../utility/strings";
import { Action } from "../action";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

const CALL_YOUR_SHOT: Action = {
    "name": new Translatable({
        "en": "Call your shot",
        "de": "Rufe deinen Schuss",
        "fr": "Appelle ton tir",
        "es": "Llama a tu tiro",
        "it": "Chiamare il tuo tiro",
        "pl": "Zadzwoń do swojego strzału",
        "pt": "Chame seu tiro",
        "ru": "Призовите свой выстрел",
        "zh": "呼叫你的射击",
        "ko": "당신의 샷을 부르십시오",
        "ja": "あなたのショットを呼び出します",
        "vi": "Gọi bắn của bạn"
    }),
    "ap": 1,
    "cooldown": 3,
    "xp": 50,
    "count": 100,
    uuid: "848cfbbc-0228-4fe6-9773-4b7a3b359c93",
    available: function (source: Tile, destination: Tile, action: Action, mission: Mission): boolean {
        // there's a memoization question here
        // find all characters on squad
        // find all characters they can see
        // return true if that character is on this destination
        throw new Error("Function not implemented.");
    },
    hasSecondarySelection: false
}
