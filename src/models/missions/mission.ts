import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
import { Character, Faction, parseCharacter, serializeCharacter } from "../characters/character";
import { at, getRing, Map, parseMap, serializeMap } from "../map/map";
import { Obstacle, parseObstacle, serializeObstacle } from "../obstacle/obstacle";
import { Objective, parseObjective, serializeObjective } from "./objective";
import { parseSpawnPoint, serializeSpawnPoint, SpawnPoint } from "./spawn_point";

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
        description: new Translatable(json['description'])
    }
    return mission;
}


function serializeMission(mission: Mission): object {
    return {
        map: serializeMap(mission.map),
        spawnPoints: mission.spawnPoints.map(sp => serializeSpawnPoint(sp)),
        objectives: mission.objectives.map(o => serializeObjective(o)),
        enemies: mission.enemies.map(enemy => serializeCharacter(enemy)),
        obstacles: mission.obstacles.map(obstacle => serializeObstacle(obstacle)),
        name: mission.name.translations,
        description: mission.description.translations,
        ...mission
    }
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
    serializeMission,
    spawn
};
