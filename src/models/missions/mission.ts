import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { alive, Character, Faction, initiativeFor, parseCharacter, serializeCharacter } from "../characters/character";
import { Game } from "../game";
import { at, getRing, Map, parseMap, serializeMap } from "../map/map";
import { Obstacle, parseObstacle, serializeObstacle } from "../obstacle/obstacle";
import { Objective, parseObjective, serializeObjective } from "./objective";
import { parseSpawnPoint, serializeSpawnPoint, SpawnPoint } from "./spawn_point";
import { serializeTurn, Turn } from "./turn";

enum TimeOfDay { NIGHT, SUNRISE, DAYTIME, SUNSET }
enum Weather { CLEAR, FOGGY, RAINING, WINDY}
type Mission = {
    timeOfDay: TimeOfDay;
    weather: Weather; 
    map: Map;
    objectives: Objective[];
    enemies: Character[];
    obstacles: Obstacle[];
    name: Translatable;
    description: Translatable;
    spawnPoints: SpawnPoint[];
    uuid: string;
    turns: Turn[];
    turn: number;
};

export function parseMission(json: object): Mission {
    const map = require(`../../../resources/map/${json['map']}`)
    const mission = {
        timeOfDay: enumValue(json['timeOfDay'], TimeOfDay), 
        weather: enumValue(json['weather'], Weather),
        map: parseMap(map),
        spawnPoints: json['spawnPoints'].map(json => parseSpawnPoint(json)),
        objectives: json['objectives'].map(json => parseObjective(json)),
        enemies: json['enemies'].map(json => parseCharacter(json)),
        obstacles: json['obstacles'].map(json => parseObstacle(json)),
        name: new Translatable(json['name']),
        description: new Translatable(json['description']),
        uuid: json['uuid'],
        turns: [],
        turn: 0,
    }
    return mission;
}

export function serializeMission(mission: Mission): object {
    return {
        ...mission,
        map: serializeMap(mission.map),
        spawnPoints: mission.spawnPoints.map(sp => serializeSpawnPoint(sp)),
        objectives: mission.objectives.map(o => serializeObjective(o)),
        enemies: mission.enemies.map(enemy => serializeCharacter(enemy)),
        obstacles: mission.obstacles.map(obstacle => serializeObstacle(obstacle)),
        name: mission.name.translations,
        description: mission.description.translations,
        turns: mission.turns.map(turn => serializeTurn(turn)),
    }
}

export function missionComplete(mission: Mission, game: Game): boolean {
    const enemies = mission.enemies;
    const heroes = game.characters.filter(c => c.faction === Faction.Player);
    const objectivesComplete = mission.objectives.every(o => o.resolver(game));
    const enemiesStillAlive = enemies.some(c => alive(c));
    const heroesStillAlive = heroes.some(c => alive(c));
    return objectivesComplete || !enemiesStillAlive || !heroesStillAlive;
}

const sortByInitiative = (a: Character, b: Character): number => {
    return initiativeFor(a) - initiativeFor(b);
}

export function nextTurn(mission: Mission, game: Game): boolean {
    // if there are no unsatisfied objectives, return false
    // if there are no living players, return false
    // if there are no living enemies, return false
    // compute each players initiative and sort by initiative
    // grant ap per character

    if(missionComplete(mission, game)) {
        return false;
    }
    
    if(mission.turns.length === 0) {
        mission.turns.push({
            members: game.characters.map(c => {
                c.ap = (c.class.ap || 2);
                return c;
            }).sort(sortByInitiative),
            actions: [],
            member: 0,
        } as Turn);
        mission.turn = 0;
    } else {
        const lastTurn = mission.turns[mission.turns.length - 1];
        const nextTurn = {
            members: lastTurn.members
                .filter(c => c.alive)
                .map(character => {
                    character.ap = Math.min(character.ap + (character.class.ap || 2), character.class.maxAp); 
                    return character;
                })
                .sort(sortByInitiative),
            actions: [],
            member: 0,
        } as Turn;

        mission.turns.push(nextTurn);
        mission.turn++;
    }
    return true;
}

export function nextCharacterInTurn(mission: Mission, game: Game): Mission {
    mission.turns[mission.turn].member++;
    if(mission.turns[mission.turn].member === mission.turns[mission.turn].members.length) {
        nextTurn(mission, game);
    }
    return mission;
}

export function spawn(mission: Mission, involved: Character[]): Mission {
    const heroes = involved.filter(c => c.faction === Faction.Player),
        enemies = involved.filter(c => c.faction === Faction.Enemy);
    const personFor = (faction: Faction): Character => {
        if(faction === Faction.Player) {
            return heroes.pop();
        } else {
            return enemies.pop();
        }
    }
    for (let spawnPoint of mission.spawnPoints) {
        let placed = false;
        const candidateTiles = [at(mission.map, spawnPoint.x, spawnPoint.y)].concat(getRing(mission.map, spawnPoint.x, spawnPoint.y, 1));
        while(!placed && candidateTiles.length > 0) {
            const tile = candidateTiles.pop();
            if(!tile.occupant) {
                const character = personFor(spawnPoint.faction);
                if(character) {
                    tile.occupant = character;
                    placed = true;
                }
            }
        }
    };
    return mission;
}

export {
    Mission,
    Weather,
    TimeOfDay,
};
