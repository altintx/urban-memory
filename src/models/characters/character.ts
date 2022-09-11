import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { DamageInfliction } from "../attack/attack";
import { Operator } from "./operator";
import {Class, parseClass, serializeClass} from "./class";
import {parseRace, Race, serializeRace} from "./race";
import { Base } from "./traits/base";
import { randomUUID } from "crypto";
import { loadCharacter } from "../../sessions";

enum Faction { Player, Enemy }

export type CharacterId = string;

type Character = {
    uuid: CharacterId;
    operator: Operator;
    class: Class;
    race: Race;
    faction: Faction;
    alive: boolean;
    name: string;
    traits: Base[];
    hp: number;
    ap: number;
    xp: number;
    missions: string[];
}

function parseCharacter(json: any): Character {
    return {
        operator: json['operator'],
        class: parseClass(json['class']),
        race: parseRace(json['race']),
        faction: enumValue(json['faction'], Faction),
        alive: !!json['alive'],
        name: json['name'],
        traits: [],
        hp: parseInt(json['hp']),
        ap: parseInt(json['ap']),
        xp: parseInt(json['xp']),
        uuid: json['uuid'],
        missions: json['missions'], // .filter(uuid => isMission(uuid)) // how to know if it's a valid mission? need to know the campaign
    }
}

function serializeCharacter(character: Character): object {
    return {
        ...character,
        operator: character.operator?.operatorId,
        class: serializeClass(character.class),
        race: serializeRace(character.race),
    }
}

function hasTrait(character: Character, trait: any) {
   return character.traits.some(t => t instanceof trait);
}

function isPlayer(character: Character): boolean {
    return character.faction === Faction.Player;
}

export async function alive(character: Character | CharacterId): Promise<boolean> {
    if (typeof character === "object") {
        return character.alive;
    } else {
        const c = await loadCharacter(character);
        return c.alive;
    }
}

const CharacterType: Character = { 
    alive: false,
    class: null,
    faction: null,
    name: null,
    operator: null,
    race: null,
    traits: [],
    hp: 0,
    ap: 0,
    xp: 0,
    uuid: randomUUID(),
    missions: [],
};

function applyDamage(character: Character, damage: DamageInfliction) {
    const critMultiplier = damage.critical? 1.5: 1;
    // console.log(`hit! ${damage.baseDamage} HP ${(damage.critical && "Crit!") || ""}`);
    character.hp -= damage.baseDamage * critMultiplier;
    character.alive = character.hp > 0;
    return character;
}

function initiativeFor(character: Character): number {
    return character.xp * 3 + character.class.initiativeModifier;
}

export {
    Character,
    Faction,
    parseCharacter,
    hasTrait,
    isPlayer,
    applyDamage,
    serializeCharacter,
    CharacterType,
    initiativeFor,
};
