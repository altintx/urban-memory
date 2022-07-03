import { Translatable } from "../../utility/strings";

type Obstacle = {
    name: Translatable;
    destructive: boolean;
    destructable: boolean;
    visible: boolean;
    coverBonus: number;
    destroyed: boolean;
    width: number;
    height: number;
}

function parseObstacle(json: object): Obstacle {
    return {
        name: new Translatable(json['name']),
        destructable: !!json['destructable'],
        destructive: !!json['destructive'],
        visible: !!json['visible'],
        destroyed: !!json['destroyed'],
        coverBonus: Infinity,
        width: parseInt(json['width']),
        height: parseInt(json['height'])
    }
}

export {
    Obstacle,
    parseObstacle
};
