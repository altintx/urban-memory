import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { Character, Faction, parseCharacter } from "../characters/character";
import { at, getRing, Map, parseMap } from "../map/map";
import { Obstacle, parseObstacle } from "../obstacle/obstacle";
import { Objective, parseObjective } from "./objective";
import { parseSpawnPoint, SpawnPoint } from "./spawn_point";

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
};

function parseMission(json: object): Mission {
    const mission = {
        timeOfDay: enumValue(json['timeOfDay'], TimeOfDay), 
        weather: enumValue(json['weather'], Weather),
        map: parseMap(json['map']),
        spawnPoints: json['spawnPoints'].map(json => parseSpawnPoint(json)),
        objectives: json['objectives'].map(json => parseObjective(json)),
        enemies: json['enemies'].map(json => parseCharacter(json)),
        obstacles: json['obstacles'].map(json => parseObstacle(json)),
        name: new Translatable(json['name']),
        description: new Translatable(json['description'])
    }
    return mission;
}

function spawn(mission: Mission, involved: Character[]): Mission {
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
                    console.log(`placing ${character.name}`);           
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
    parseMission,
    spawn
};
