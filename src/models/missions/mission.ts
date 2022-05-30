import { Character } from "../characters/character";
import { Map } from "../map/map";
import { Objective } from "./objective";

enum TimeOfDay { NIGHT, SUNRISE, DAYTIME, SUNSET }
enum Weather { CLEAR, FOGGY, RAINING, WINDY}
type Mission = {
    timeOfDay: TimeOfDay;
    weather: Weather; 
    map: Map
    objectives: Objective[];
    characters: Character[];
};

export {
    Mission,
    Weather,
    TimeOfDay
};
