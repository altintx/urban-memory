import { Translatable } from "../../utility/strings";

type Class = {
    name: Translatable;
    ap: number;
    maxAp: number;
}
function parseClass(json: object): Class {
    return {
        name: new Translatable(json['name']),
        ap: parseInt(json['ap']),
        maxAp: parseInt(json['maxAp'])
    }
}
function serializeClass(k: Class): object {
    return {
        ...k,
        name: k.name.translations
    }
}
export {
    Class,
    parseClass,
    serializeClass
};
