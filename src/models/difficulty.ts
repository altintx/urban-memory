import { Game } from "./game";

export enum Difficulty {
    Easy, Hard
};
export function difficultyBuff(game: Game): number {
    if(game.difficulty === Difficulty.Easy) return 1;
    return 0;
}