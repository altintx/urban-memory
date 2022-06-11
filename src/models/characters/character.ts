import { enumValue } from "../../utility/enum";
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
    name: string;
}

function parseCharacter(json: any): Character {
    return {
        operator: null,
        class: parseClass(json['class']),
        race: parseRace(json['race']),
        faction: enumValue(json['faction'], Faction),
        alive: !!json['alive'],
        name: json['name'] || 'John Doe'
    }
}

export {
    Character,
    Faction,
    parseCharacter
};
