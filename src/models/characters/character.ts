import {Class} from "./class";
import {Race} from "./race";

type Character = {
    class: Class;
    race: Race;
    alignment: string; // player/enemy
    alive: boolean;
}

export {
    Character
};
