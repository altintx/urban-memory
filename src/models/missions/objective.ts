import { Game } from '../game';
type Objective = {
    short: string;
    long: string;
    resolver: (game: Game) => boolean;
}
export {
    Objective
};
