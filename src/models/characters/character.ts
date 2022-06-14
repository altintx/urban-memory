import { enumValue } from "@app/utility/enum";
import { Translatable } from "@app/utility/strings";
import { Operator } from "@app/models/core/operator";
import {Class, parseClass} from "@app/models/characters/class";
import {parseRace, Race} from "@app/models/characters/race";
import { Base } from "./traits/base";

enum Faction { Player, Enemy }

type Character = {
    operator: Operator;
    class: Class;
    race: Race;
    faction: Faction;
    alive: boolean;
    name: Translatable;
    traits: Base[];
}

function parseCharacter(json: any): Character {
    return {
        operator: null,
        class: parseClass(json['class']),
        race: parseRace(json['race']),
        faction: enumValue(json['faction'], Faction),
        alive: !!json['alive'],
        name: new Translatable(json['name']),
        traits: []
    }
}

function hasTrait(character: Character, trait: any) {
   return character.traits.some(t => t instanceof trait);
}

function isPlayer(character: Character): boolean {
    return character.faction === Faction.Player;
}

export {
    Character,
    Faction,
    parseCharacter,
    hasTrait,
    isPlayer,
};
