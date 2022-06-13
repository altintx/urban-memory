import { Translatable } from "@app/utility/strings";

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
