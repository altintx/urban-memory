import { randomUUID } from 'crypto';
import leftGameAnnouncement from '../websocket/listeners/announcements/left_game';
import { endGame, setGame } from '../sessions';
import { Character, Faction, parseCharacter, serializeCharacter } from './characters/character';
import { Operator } from './characters/operator';
import { Campaign, parseCampaign } from './campaign';
import { Mission } from './missions/mission';
import { parseRace, Race, serializeRace } from './characters/race';
import { randomName } from './name';
import { randomValue } from '../utility/array';
import { Class, parseClass, serializeClass } from './characters/class';

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
    const characterFactory = (name: string, className: Class, race: Race, faction: Faction): Character => {
        const classJson = serializeClass(className), raceJson = serializeRace(race);
        const character = parseCharacter({
            name: name,
            uuid: randomUUID(),
            operator: null, 
            class: classJson,
            race: raceJson,
            faction: faction,
            alive: true,
            traits: [],
            hp: 100,
            ap: 1,
 
        });
        return character;
    }
    const HUMAN = parseRace({ name: { en: "Human" } })
    const characters = [];
    const genders = ['male', 'female'];
    const classes = ['hunter'].map(name => parseClass({
        name: { en: name },
        ap: 2,
        maxAp: 6
    }));
    for(let i = 0; i < 1; i++) {
        characters.push(
            characterFactory(
                randomName(randomValue(genders)),
                randomValue(classes),
                HUMAN,
                Faction.Player
            )
        );
    }
    return {
        characters: characters,
        campaign: parseCampaign(require('../../resources/campaign.json')),
        difficulty: Difficulty.Easy,
        workingSquad: characters.slice(0,4),
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

function serializeGame(game: Game): object {
    return {
        missionUuid: game.activeMission?.uuid,
        characters: game.characters.map(c => c.uuid),
        uuid: game.gameId,
        workingSquad: game.workingSquad.map(c => c.uuid),
        difficulty: game.difficulty,
        visibility: game.visibility
    }
}

export {
    Game,
    addCharacter,
    newGame,
    transferOperatorOrEnd,
    join,
    Visibility,
    Difficulty,
    serializeGame
};
