import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { DamageInfliction } from "../attack/attack";
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
    hp: number;
}

function parseCharacter(json: any): Character {
    return {
        operator: null,
        class: parseClass(json['class']),
        race: parseRace(json['race']),
        faction: enumValue(json['faction'], Faction),
        alive: !!json['alive'],
        name: json['name'],
        traits: [],
        hp: parseInt(json['hp'])
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
    traits: [],
    hp: 0
};

function applyDamage(character: Character, damage: DamageInfliction) {
    const critMultiplier = damage.critical? 1.5: 1;
    character.hp -= damage.baseDamage * critMultiplier;
    return character;
}

export {
    Character,
    Faction,
    parseCharacter,
    hasTrait,
    isPlayer,
    applyDamage,
    CharacterType
};
