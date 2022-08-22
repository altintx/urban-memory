import { Offset, parseOffset } from "./offset";

export type AnimationCell = {
    graphic: string,
    direction: string;
    ms: number;
}

export type Texture = {
    graphic: string;
    animation: AnimationCell[];
    offset: Offset;
}

export function parseAnimationCell(json: any): any {
    return {
        graphic: json['graphic'],
        direction: json['direction'],
        ms: parseInt(json['ms'])
    };
}

export function parseTexture(json): Texture {
    return {
        graphic: json['graphic'],
        animation: json['animation'].map(json => parseAnimationCell(json)),
        offset: parseOffset(json['offset'])
    }
}