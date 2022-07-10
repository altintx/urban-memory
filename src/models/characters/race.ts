import { Translatable } from "../../utility/strings";

type Race = {
    name: Translatable;
}
function parseRace(json: object): Race {
    return {
        name: new Translatable(json['name'])
    }
}

function serializeRace(r: Race): object {
    return {
        name: r.name.translations
    }
}

export {
    Race,
    parseRace,
    serializeRace
};
