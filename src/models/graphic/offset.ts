export type Offset = {
    x: number;
    y: number;
    z: number;
}

export function parseOffset(json: any): Offset {
    return {
        x: json[0],
        y: json[1],
        z: json[2]
    }
}