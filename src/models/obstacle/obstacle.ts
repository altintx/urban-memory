import { Translatable } from "../../utility/strings";

type Obstacle = {
    name: Translatable;
    destructive: boolean;
    destructable: boolean;
    visible: boolean;
    coverBonus: number;
}

function parseObstacle(json: object): Obstacle {
    return {
        name: new Translatable(json['name']),
        destructable: !!json['destructable'],
        destructive: !!json['destructive'],
        visible: !!json['visible'],
        coverBonus: Infinity,
    }
}

export {
    Obstacle,
    parseObstacle
};
