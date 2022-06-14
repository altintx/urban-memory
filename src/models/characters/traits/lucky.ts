import { Character, hasTrait } from "../character";
import { Base } from "./base";

export class LuckyTrait extends Base { } 

export const lucky = (character: Character): number => {
    if(hasTrait(character, LuckyTrait)) {
        return Math.random() >= 0.95? 1: 0;
    } else {
        return 0;
    }
}

