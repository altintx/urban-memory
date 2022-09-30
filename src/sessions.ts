import { Socket } from "socket.io";
import { Character, parseCharacter, serializeCharacter } from "./models/characters/character";
import { Operator, serializeOperator } from "./models/characters/operator";
import { Game, serializeGame, Visibility } from "./models/game";
import { client, ready as redisReady } from './redis'

let operatorMap: {
    [socketId: string]: Operator
} = {};
let gamesMap: { 
    [gameId: string]: Game
} = {};
let sessions = {
    operators: operatorMap,
    games: gamesMap
};
export async function registerOperator(operator: Operator): Promise<void> {
    const key = `operator:socket:${operator.socket.id}`;
    const key2 = `operator:${operator.operatorId}`;
    const payload = JSON.stringify(serializeOperator(operator));
    await redisReady;
    await client.set(key, payload);
    await client.set(key2, payload);
    sessions.operators[operator.socket.id] = operator;
}

export async function loadOperator(uuid:string): Promise<Operator | null> {
    const key = `operator:${uuid}`;
    await redisReady;
    const operator = await client.get(key);
    if (operator) {
        return JSON.parse(operator);
    } else {
        return null;
    }
}

export async function getOperatorById(socketId: string): Promise<Operator> {
    return sessions.operators[socketId];
}

export async function endGame(game:Game): Promise<boolean> {
    delete gamesMap[game.gameId];
    await redisReady;
    const key = `game:${game.gameId}`;
    client.del(key);
    return true;
}

export async function setGame(game: Game): Promise<void> {
    console.log("setGame");
    const key = `game:${game.gameId}`;
    await redisReady;
    await client.set(key, JSON.stringify(serializeGame(game)));
    gamesMap[game.gameId] = game;
}

export async function cacheCharacter(character: Character): Promise<void> {
    console.log("cacheCharacter", character);
    const key = `character:${character.uuid}`;
    await redisReady;
    const o = serializeCharacter(character);
    client.set(key, JSON.stringify(o));
}

export async function loadCharacter(uuid: string): Promise<Character> {
    const key = `character:${uuid}`;
    console.log(`loadCharacter ${key}`);
    await redisReady;
    const json = await client.get(key);
    const character = await parseCharacter(JSON.parse(json));
    return character;
}

export function getGames(scope: Visibility | null): Game[] {
    let games = Object.values(gamesMap);
    if (scope !== null) {
        games = games.filter(g => g.visibility === scope);
    }
    return games;
}

export async function getGameById(gameId: string): Promise<Game> {
    return gamesMap[gameId];
}

export async function operatorForCharacter(character: Character): Promise<Operator> {
    const operator = Object.values(sessions.operators).find(o => o.operatorId === character.operator.operatorId && o.socket);
    if (!operator) {
        throw new Error("Operator not found for character");
    }
    return operator;
}
