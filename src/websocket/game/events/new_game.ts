import { Socket } from "socket.io";
import { newGame, transferOperatorOrEnd } from "../../../models/game";
import { setGame as setOperatorGame } from "../../../models/characters/operator";
import { getOperator, setGame } from "../../../sessions";
import joinedGameAnnouncement from "../announcements/joined_game";
import notLoggedInAnnouncement from "../announcements/not_logged_in";
import gameStateAnnouncement from "../announcements/game_state";

export function newGameMessage(socket: Socket): boolean {
    console.log('newGameMessage');
    const operator = getOperator(socket);
    if(!operator) return notLoggedInAnnouncement(socket);
    if(operator.game) {
        transferOperatorOrEnd(operator.game, operator);
    }
    const game = newGame();
    game.operators.push(operator); 
    setGame(game)
    setOperatorGame(operator, game);
    joinedGameAnnouncement(game, operator);
    gameStateAnnouncement(game, operator)
    return true;
}