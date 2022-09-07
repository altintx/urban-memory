export function unique(value: number, index: number, self: number[]): boolean {
    return self.indexOf(value) === index;
}

export function randomIndex(array: any[]): number {
    return Math.floor(Math.random() * array.length);
}
export function randomValue(array: any[]): any {
    return array[randomIndex(array)];
}
export function last(array: any[]): any {
    return array[array.length - 1];
}
