import { Socket } from "socket.io";
import { Operator } from "./models/characters/operator";
import { Game, Visibility } from "./models/game";

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
function registerOperator(operator: Operator): void {
    sessions.operators[operator.socket.id] = operator;
}
function getOperator(socket: Socket): Operator {
    return sessions.operators[socket.id];
}
// this should go to redis
function gameForOperator(socket: Socket): Game | null {
    const operator = sessions.operators[socket.id];
    return operator.game;    
}

function endGame(game:Game): boolean {
    delete gamesMap[game.gameId];
    return true;
}

function setGame(game: Game): void {
    gamesMap[game.gameId] = game;
}

function getGames(scope: Visibility | null): Game[] {
    let games = Object.values(gamesMap);
    if (scope !== null) {
        games = games.filter(g => g.visibility === scope);
    }
    return games;
}

function getGameById(gameId: string): Game {
    return gamesMap[gameId];
}

export {
    setGame,
    registerOperator,
    getOperator,
    gameForOperator,
    endGame,
    getGames,
    getGameById
}