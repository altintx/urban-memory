import { randomUUID } from 'crypto';
import leftGameAnnouncement from '../websocket/game/announcements/left_game';
import { cacheCharacter, endGame, loadCharacter, loadOperator, setGame } from '../sessions';
import { Character, CharacterId, Faction, parseCharacter, serializeCharacter } from './characters/character';
import { Operator } from './characters/operator';
import { Campaign, parseCampaign } from './campaign';
import { Mission } from './missions/mission';
import { parseRace, Race, serializeRace } from './characters/race';
import { randomName } from './name';
import { randomValue } from '../utility/array';
import { Class, parseClass, serializeClass } from './characters/class';
import { enumValue } from '../utility/enum';

export enum Visibility { Public, Private };
export enum Difficulty {
    Easy, Hard
};

export type Game = {
    characters: CharacterId[];
    workingSquad: CharacterId[];
    campaign: Campaign,
    difficulty: Difficulty;
    gameId: string;
    operators: Operator[];
    visibility: Visibility;
    activeMission?: Mission;
}

export function addCharacter(character: Character, game: Game): Game {
    return Object.assign({}, game, game.characters.concat(character.uuid));
}

export async function newGame(operator: Operator, campaign: Campaign): Promise<Game> {
    const characterFactory = async (name: string, className: Class, race: Race, faction: Faction): Promise<Character> => {
        const classJson = serializeClass(className), raceJson = serializeRace(race);
        const character = await parseCharacter({
            name: name,
            uuid: randomUUID(),
            operator: operator.operatorId, 
            class: classJson,
            race: raceJson,
            faction: faction,
            alive: true,
            traits: [],
            hp: 100,
            ap: 1,
 
        });
        await cacheCharacter(character);
        return character;
    }
    const HUMAN = parseRace({ name: { en: "Human" } })
    const characters: Character[] = [];
    const genders = ['male', 'female'];
    const classes = ['hunter'].map(name => parseClass({
        name: { en: name },
        ap: 2,
        maxAp: 6
    }));
    for(let i = 0; i < 1; i++) {
        characters.push(
            await characterFactory(
                randomName(randomValue(genders)),
                randomValue(classes),
                HUMAN,
                Faction.Player
            )
        );
    }
    return {
        characters: characters.map(c => c.uuid),
        campaign: campaign,
        difficulty: Difficulty.Easy,
        workingSquad: characters.slice(0,4).map(c => c.uuid),
        gameId: randomUUID(),
        operators: [operator],
        visibility: Visibility.Public
    }
}

export function transferOperatorOrEnd(game:Game, departingOperator: Operator): Game | null {
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

export async function join(game: Game, operator: Operator): Promise<Game> {
    const characters = await Promise.all(game.characters.map(uuid => loadCharacter(uuid)));
    characters.forEach(c => {
        if(c.operator === null) {
            const assigned = Object.assign({}, c, { operator: operator });
            cacheCharacter(assigned);
            return assigned;
        } else {
            return c;
        }
    });
    const newGame = Object.assign({}, game, { operators: game.operators.concat(operator) });
    setGame(newGame);
    return newGame;
}

export function serializeGame(game: Game): object {
    return {
        missionUuid: game.activeMission?.uuid,
        characters: game.characters,
        uuid: game.gameId,
        workingSquad: game.workingSquad,
        difficulty: game.difficulty,
        visibility: game.visibility,
        campaign: game.campaign.uuid,
    }
}

export async function parseGame(json: any): Promise<Game> {
    return {
        characters: json.characters.map(c => loadCharacter(c)),
        workingSquad: json.workingSquad.map(c => loadCharacter(c)),
        campaign: await parseCampaign(json['campaign']),
        difficulty: enumValue(json['difficulty'], Difficulty),
        gameId: json.uuid,
        operators: await Promise.all(json.operators.map(o => loadOperator(o))),
        visibility: enumValue(json['visibility'], Visibility),
    }
}
