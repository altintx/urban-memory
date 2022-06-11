import { enumValue } from "../../utility/enum";
import { Character, parseCharacter } from "../characters/character";
import { Map, parseMap } from "../map/map";
import { Objective, parseObjective } from "./objective";

enum TimeOfDay { NIGHT, SUNRISE, DAYTIME, SUNSET }
enum Weather { CLEAR, FOGGY, RAINING, WINDY}
type Mission = {
    timeOfDay: TimeOfDay;
    weather: Weather; 
    map: Map;
    objectives: Objective[];
    enemies: Character[];
};

function parseMission(json: object): Mission {
    const mission = {
        timeOfDay: enumValue(json['timeOfDay'], TimeOfDay), 
        weather: enumValue(json['weather'], Weather),
        map: parseMap(json['map']),
        objectives: json['objectives'].map(json => parseObjective(json)),
        enemies: json['enemies'].map(json => parseCharacter(json))
    }
    return mission;
}

export {
    Mission,
    Weather,
    TimeOfDay,
    parseMission
};
