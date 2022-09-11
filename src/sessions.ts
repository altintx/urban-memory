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
    const key = `operator:${operator.socket.id}`;
    await redisReady;
    client.set(key, JSON.stringify(serializeOperator(operator)));
    sessions.operators[operator.socket.id] = operator;
}

export async function loadOperator(uuid:string): Promise<Operator | null> {
    const key = `operator:${uuid}`;
    await redisReady;
    const operator = await client.get(key);
    return operator ? JSON.parse(operator) : null;
}

export function getOperator(socket: Socket): Promise<Operator> {
    console.warn(
        "getOperator is deprecated, should look up by operator uuid instead of socket id"
    )
    // return process.env["REDIS_URL"] ? getOperatorInRedis(socket) : getOperatorInMemory(socket);
    return getOperatorInMemory(socket);
}
async function getOperatorInMemory(socket: Socket): Promise<Operator> {
    return sessions.operators[socket.id];
}
async function getOperatorInRedis(socket: Socket): Promise<Operator> {
    throw new Error("Not implemented");
}
// this should go to redis
async function gameForOperatorInRedis(socket: Socket): Promise<Game | null> {
    throw new Error("Not implemented");
}
async function gameForOperatorInMemory(socket: Socket): Promise<Game | null> {
    return sessions.operators[socket.id].game;
}
export function gameForOperator(socket: Socket): Game | null {
    const operator = sessions.operators[socket.id];
    return operator.game;    
}

export async function endGame(game:Game): Promise<boolean> {
    delete gamesMap[game.gameId];
    await redisReady;
    const key = `game:${game.gameId}`;
    client.del(key);
    return true;
}

export async function setGame(game: Game): Promise<void> {
    const key = `game:${game.gameId}`;
    await redisReady;
    await client.set(key, JSON.stringify(serializeGame(game)));
    gamesMap[game.gameId] = game;
}

export async function cacheCharacter(character: Character): Promise<void> {
    const key = `character:${character.uuid}`;
    await redisReady;
    client.set(key, JSON.stringify(serializeCharacter(character)));
}

export async function loadCharacter(uuid: string): Promise<Character> {
    const key = `character:${uuid}`;
    await redisReady;
    const json = await client.get(key);
    return parseCharacter(JSON.parse(json));
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
