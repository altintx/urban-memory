import { Translatable } from "../../utility/strings";
import { parseTexture, Texture } from "../graphic/texture";

type Obstacle = {
    name: Translatable;
    uuid: string;
    destructive: boolean;
    destructable: boolean;
    visible: boolean;
    coverBonus: number;
    destroyed: boolean;
    width: number;
    height: number;
    textures: Texture[];
}

function parseObstacle(json: object): Obstacle {
    return {
        name: new Translatable(json['name']),
        uuid: json['uuid'],
        destructable: !!json['destructable'],
        destructive: !!json['destructive'],
        visible: !!json['visible'],
        destroyed: !!json['destroyed'],
        coverBonus: Infinity,
        width: parseInt(json['width']),
        height: parseInt(json['height']),
        textures: json['textures'].map(json => parseTexture(json))
    }
}
function serializeObstacle(obstacle: Obstacle): object {
    return {
        ...obstacle,
        textures: obstacle.textures,
        name: obstacle.name.translations,
    }
}

export {
    Obstacle,
    parseObstacle,
    serializeObstacle
};
