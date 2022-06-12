import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { Operator } from "../core/operator";
import {Class, parseClass} from "./class";
import {parseRace, Race} from "./race";

enum Faction { Player, Enemy }

type Character = {
    operator: Operator;
    class: Class;
    race: Race;
    faction: Faction;
    alive: boolean;
    name: Translatable;
}

function parseCharacter(json: any): Character {
    return {
        operator: null,
        class: parseClass(json['class']),
        race: parseRace(json['race']),
        faction: enumValue(json['faction'], Faction),
        alive: !!json['alive'],
        name: new Translatable(json['name'])
    }
}

export {
    Character,
    Faction,
    parseCharacter
};
