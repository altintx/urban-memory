import { enumValue } from "../../utility/enum";
import { Translatable } from "../../utility/strings";
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
    name: Translatable;
    description: Translatable;
};

function parseMission(json: object): Mission {
    const mission = {
        timeOfDay: enumValue(json['timeOfDay'], TimeOfDay), 
        weather: enumValue(json['weather'], Weather),
        map: parseMap(json['map']),
        objectives: json['objectives'].map(json => parseObjective(json)),
        enemies: json['enemies'].map(json => parseCharacter(json)),
        name: new Translatable(json['name']),
        description: new Translatable(json['description'])
    }
    return mission;
}

export {
    Mission,
    Weather,
    TimeOfDay,
    parseMission
};
