import { compute, AttackType, Attack } from './attack';
import { Map } from '../map/map';
import { Character, Faction } from '../characters/character';
import { Race } from '../characters/race';
import { Translatable } from '../../utility/strings';
import { Class } from '../characters/class';
import { Weapon } from '../characters/weapon';
import { WeaponType } from '../characters/weapon';
import { Difficulty, Game, Visibility } from '../game';
import { randomUUID } from 'crypto';
import { Mission, TimeOfDay, Weather } from '../missions/mission';
import { Cover } from '../map/tile';
const race: Race = {
    name: new Translatable({ en: "race" })
};
const klass: Class = {
    name: new Translatable({ en: "soldier" })
}
const character: Character = {
    alive: true,
    class: klass,
    faction: Faction.Player,
    name: "Hero",
    operator: null,
    traits: [],
    race: race
};
const character2: Character = {
    alive: true,
    class: klass,
    faction: Faction.Enemy,
    name: "Bad Guy",
    operator: null,
    traits: [],
    race: race
}
const weapon: Weapon = {
    damage: 10,
    name: new Translatable({ en: "fuzzy wuzzy" }),
    optimalDistance: 4,
    spread: 0,
    type: WeaponType.Pistol
}
const map: Map = {
    grid: [
        {
            cover: Cover.None,
            elevation: 0,
            openable: false,
            occupant: character
        },
        {
            cover: Cover.None,
            elevation: 0,
            openable: false,
            occupant: character2
        }
    ],
    height: 1,
    width: 2,
    uuid: randomUUID()
}
const mission: Mission = {
    description: new Translatable({ en: "description" }),
    enemies: [character2],
    map: map,
    name: new Translatable({ en: "name" }),
    objectives: [],
    timeOfDay: TimeOfDay.DAYTIME,
    weather: Weather.CLEAR,
}
const game: Game = {
    campaign: null,
    characters: [character],
    difficulty: Difficulty.Easy,
    gameId: randomUUID(),
    operators: [],
    visibility: Visibility.Private,
    workingSquad: [character],
    activeMission: mission
}

describe('attack', () => {
    it("a targetted attack against a weak character should succeed", () => {
        const attack: Attack = {
            attackRoll: 20,
            attacker: character,
            flankers: [],
            oppressors: [],
            target: character2, 
            type: AttackType.Targetted,
            weapon: weapon
        };    
        const r = compute(attack, game);
        expect(r.length).toBe(1);
        expect(r[0].target).toBe(character2);
        expect(r[0].baseDamage).toBeGreaterThanOrEqual(1);
    });
    it("a targetted attack against a stronger character should fail", () => {
        const attack: Attack = {
            attackRoll: 1,
            attacker: character,
            flankers: [],
            oppressors: [],
            target: character2, 
            type: AttackType.Targetted,
            weapon: weapon
        };    
        const r = compute(attack, game);
        expect(r.length).toBe(0);
    });
});