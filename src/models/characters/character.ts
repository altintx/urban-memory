import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { Operator } from "../core/operator";
import {Class, parseClass} from "./class";
import {parseRace, Race} from "./race";
import { Base } from "./traits/base";

enum Faction { Player, Enemy }

type Character = {
    operator: Operator;
    class: Class;
    race: Race;
    faction: Faction;
    alive: boolean;
    name: string;
    traits: Base[];
}

function parseCharacter(json: any): Character {
    return {
        operator: null,
        class: parseClass(json['class']),
        race: parseRace(json['race']),
        faction: enumValue(json['faction'], Faction),
        alive: !!json['alive'],
        name: json['name'],
        traits: []
    }
}

function hasTrait(character: Character, trait: any) {
   return character.traits.some(t => t instanceof trait);
}

function isPlayer(character: Character): boolean {
    return character.faction === Faction.Player;
}

const CharacterType: Character = { 
    alive: false,
    class: null,
    faction: null,
    name: null,
    operator: null,
    race: null,
    traits: []
};

export {
    Character,
    Faction,
    parseCharacter,
    hasTrait,
    isPlayer,
    CharacterType
};
