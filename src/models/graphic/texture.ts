import { Offset, parseOffset } from "./offset";

export type Texture = {
    graphic: string;
    animation: any[];
    offset: Offset;
}

export function parseTexture(json): Texture {
    return {
        graphic: json['graphic'],
        animation: [],
        offset: parseOffset(json['offset'])
    }
}