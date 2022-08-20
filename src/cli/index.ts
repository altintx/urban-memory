import { Campaign } from '../models/campaign';
import { applyDamage, Character, Faction } from '../models/characters/character';
import { Class } from '../models/characters/class';
import { Race } from '../models/characters/race';
import { Operator } from '../models/characters/operator';
import { Difficulty, Game, Visibility } from '../models/game';
import { Mission, TimeOfDay, Weather, spawn } from '../models/missions/mission';
import { Translatable } from '../utility/strings';
import { randomUUID } from 'crypto';
import { at, Map, parseMap } from '../models/map/map';
import { Attack, AttackType, DamageInfliction, compute } from '../models/attack/attack';
import { WeaponType } from '../models/characters/weapon';

const map: Map = parseMap(require('../../resources/map/empty.json'));
const hunter: Class = {
    name: new Translatable({ en: "Hunter" }),
    ap: 2,
    maxAp: 3,
    initiativeModifier: 0,
}
const race: Race = {
    name: new Translatable({ en: 'human' })
}

const human: Operator = {
    game: null,
    name: "interactive player",
    operatorId: randomUUID(),
    socket: null
};
const lamblo: Character = {
    alive: true,
    class: hunter,
    faction: Faction.Player,
    hp: 100,
    name: "Lamblo",
    operator: human,
    race: race,
    traits: [],
    ap: hunter.ap,
    uuid: randomUUID(),
    missions: [],
    xp: 0
}
const olabom: Character = {
    alive: true,
    class: hunter,
    faction: Faction.Enemy,
    hp: 100,
    name: "Olabom",
    operator: null,
    race: race,
    traits: [],
    ap: hunter.ap,
    uuid: randomUUID(),
    missions: [],
    xp: 0,
}

const mission: Mission = {
    description: new Translatable({ en: "Make a statement" }),
    timeOfDay: TimeOfDay.DAYTIME,
    weather: Weather.CLEAR,
    name: new Translatable({ en: "Operation Bayonette" }),
    enemies: [olabom],
    obstacles: [],
    map: map,
    objectives: [{
        long: new Translatable({ en: "Defeat all the baddies" }),
        short: new Translatable({ en: "Rain fire" }),
        resolver: (game) => game.activeMission.enemies.every(c => !c.alive)
    }],
    spawnPoints: [
        { x: 10, y: 0, faction: Faction.Player}, 
        { x: 10, y: 19, faction: Faction.Enemy }
    ],
    uuid: randomUUID(),
    turns: [],
}
const campaign: Campaign = {
    missions: [mission]
}
const game: Game = {
    campaign: campaign,
    characters: [lamblo],
    difficulty: Difficulty.Easy,
    gameId: randomUUID(),
    operators: [human],
    visibility: Visibility.Private,
    workingSquad: [lamblo],
    activeMission: mission
}
human.game = game;

// TODO: bind characters to map

game.campaign.missions.forEach(mission => {
    console.log(`Mission ${mission.name}`);
    console.log(`Background: ${mission.description}`)
    let involved = game.workingSquad.concat(mission.enemies);
    let turn = 0;
    
    spawn(mission, involved);

    // console.log(mission.map.grid);

    while(game.workingSquad.some(c => c.alive) && !mission.objectives.every(o => o.resolver(game))) {
        turn++;
        involved.forEach(character => {
            character.ap = Math.min(character.ap + (character.class.ap || 2), character.class.maxAp);
        })
        involved.forEach(character => {
            if(character.alive) {
                // TODO: choose action
                while(character.ap > 0) {
                    console.log(`Turn ${turn}: ${character.name}`);
                    let action = null;
                    renderMap(map);
                    action = chooseAction(character, mission, game, involved);
                    performAction(action, game, character);
                }
            }
        })
    }
    console.log("Mission ended");
    involved.forEach(c => {
        console.log(`${c.name} is ${c.alive ? "alive" : "dead"}`);
    })
})

function renderMap(map: Map) {
    console.log(" --------------------");
    for(let y = 0; y < map.height; y++) {
        const line = ['|'];
        for(let x = 0; x < map.width; x++) {
            if(at(map, x, y).occupant) {
                line.push("*");
            } else {
                line.push(" ");
            }
        }
        line.push("|");
        console.log(line.join(""));
    }
    console.log(" --------------------");
}
function chooseAction(character: Character, mission: Mission, game: Game, involved: Character[]): any {
    const others = otherFaction(character, involved)
        
    if(character.operator == human) {
        console.log("attacking for you");
        return <Attack>{
            target: others[Math.floor(Math.random() * others.length)],
            attacker: character,
            flankers: [],
            oppressors: [],
            type: AttackType.Targetted,
            weapon: {
                damage: 10,
                optimalDistance: 4,
                name: new Translatable({ en: "Revolver" }),
                type: WeaponType.Pistol,
                spread: 0
            }
        }
    } else {
        return <Attack>{
            target: others[Math.floor(Math.random() * others.length)],
            attacker: character,
            flankers: [],
            oppressors: [],
            type: AttackType.Targetted,
            weapon: {
                damage: 10,
                optimalDistance: 4,
                name: new Translatable({ en: "Revolver" }),
                type: WeaponType.Pistol,
                spread: 0
            }
        }
    }
}

function otherFaction(character: Character, involved: Character[]) {
    return involved.filter(c => c.faction != character.faction);
}

function performAction(action: any, game: Game, character: Character) {
    if(action.type == AttackType.Targetted) {
        console.log("taking a shot");
        character.ap--;
        const r = compute(action, game);
        if(r.length === 0) console.log("Missed");
        r.forEach((result: DamageInfliction) => applyDamage(<Character>result.target, result))
    } else {
        console.log("not implemented");
    }
}

