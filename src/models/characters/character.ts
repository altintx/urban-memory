import { Operator } from "../core/operator";
import {Class} from "./class";
import {Race} from "./race";

enum Faction { Player, Enemy }

type Character = {
    operator: Operator;
    class: Class;
    race: Race;
    faction: Faction;
    alive: boolean;
    name: string;
}

export {
    Character,
    Faction
};
