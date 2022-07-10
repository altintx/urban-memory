import { Translatable } from '../../utility/strings';
import { Game } from '../game';
type Objective = {
    short: Translatable;
    long: Translatable;
    resolver: (game: Game) => boolean;
}
function parseObjective(json: any): Objective {
    return {
        short: new Translatable(json['short']),
        long: new Translatable(json['long']),
        resolver: eval(json['resolver'] || '(game) => false')
    }
}
function serializeObjective(o: Objective): object {
    return {
        short: o.short.translations,
        long: o.long.translations
        // resolver should only live on server
    }
}
export {
    Objective,
    parseObjective,
    serializeObjective
};
