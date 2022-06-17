import { Translatable } from "../../utility/strings";

type Race = {
    name: Translatable;
}
function parseRace(json: object): Race {
    return {
        name: new Translatable(json['name'])
    }
}

export {
    Race,
    parseRace
};
