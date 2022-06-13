import { enumValue } from "@app/utility/enum";
import { Translatable } from "@app/utility/strings";
import { Operator } from "@app/models/core/operator";
import {Class, parseClass} from "@app/models/characters/class";
import {parseRace, Race} from "@app/models/characters/race";

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
