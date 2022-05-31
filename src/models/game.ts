import { randomUUID } from 'crypto';
import leftGameAnnouncement from '../listeners/announcements/left_game';
import { endGame, setGame } from '../sessions';
import { Character } from './characters/character';
import { Difficulty } from './core/difficulty';
import { Operator } from './core/operator';
import { Map } from './map/map';
import { Mission } from './missions/mission';
enum Visibility { Public, Private };
type Game = {
    characters: Character[];
    workingSquad: Character[];
    maps: Map[];
    missions: Mission[];
    difficulty: Difficulty;
    gameId: string;
    operators: Operator[];
    visibility: Visibility
}

function addCharacter(character: Character, game: Game): Game {
    return Object.assign({}, game, game.characters.concat(character));
}

function newGame(): Game {
    return {
        characters: [],
        missions: [],
        difficulty: Difficulty.Easy,
        workingSquad: [],
        maps: [],
        gameId: randomUUID(),
        operators: [],
        visibility: Visibility.Public
    }
}

function transferOperatorOrEnd(game:Game, departingOperator: Operator): Game | null {
    console.log(game);
    if(game.operators.length > 1) {
        const newGame = Object.assign({}, game, { operators: game.operators.filter(o => o !== departingOperator) });
        setGame(newGame);
        leftGameAnnouncement(game, departingOperator);
        return newGame;
    } else {
        endGame(game);
        return null;
    }
}

function join(game: Game, operator: Operator): Game {
    const newGame = Object.assign({}, game, { operators: game.operators.concat(operator) });
    setGame(newGame);
    return newGame;
}

export {
    Game,
    addCharacter,
    newGame,
    transferOperatorOrEnd,
    join,
    Visibility
};
