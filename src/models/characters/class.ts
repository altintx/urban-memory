import { Translatable } from "../../utility/strings";

type Class = {
    name: Translatable;
}
function parseClass(json: object): Class {
    return {
        name: new Translatable(json['name'])
    }
}
export {
    Class,
    parseClass
};
