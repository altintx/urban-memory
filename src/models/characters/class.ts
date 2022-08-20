import { Translatable } from "../../utility/strings";

type Class = {
    name: Translatable;
    ap: number;
    maxAp: number;
    initiativeModifier: number;
}
function parseClass(json: object): Class {
    return {
        name: new Translatable(json['name']),
        ap: parseInt(json['ap']),
        maxAp: parseInt(json['maxAp']),
        initiativeModifier: parseInt(json['initiativeModifier']),
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
