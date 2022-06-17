import { randomUUID } from 'crypto';
import leftGameAnnouncement from '../listeners/announcements/left_game';
import { endGame, setGame } from '../sessions';
import { Character } from './characters/character';
import { Operator } from './core/operator';
import { Campaign, parseCampaign } from './campaign';
import { Mission } from './missions/mission';

enum Visibility { Public, Private };
enum Difficulty {
    Easy, Hard
};

type Game = {
    characters: Character[];
    workingSquad: Character[];
    campaign: Campaign,
    difficulty: Difficulty;
    gameId: string;
    operators: Operator[];
    visibility: Visibility;
    activeMission?: Mission;
}

function addCharacter(character: Character, game: Game): Game {
    return Object.assign({}, game, game.characters.concat(character));
}

function newGame(): Game {
    return {
        characters: [],
        campaign: parseCampaign(require('../../resources/campaign.json')),
        difficulty: Difficulty.Easy,
        workingSquad: [],
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
    Visibility,
    Difficulty
};
