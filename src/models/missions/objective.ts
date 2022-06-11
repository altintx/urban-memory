import { Game } from '../game';
type Objective = {
    short: string;
    long: string;
    resolver: (game: Game) => boolean;
}
function parseObjective(json: any): Objective {
    return {
        short: json['short'] || '',
        long: json['long'] || '',
        resolver: eval(json['resolver'] || '(game) => false')
    }
}
export {
    Objective,
    parseObjective
};
