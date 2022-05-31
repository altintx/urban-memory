import { Socket } from "socket.io";
import { join, transferOperatorOrEnd } from "../../models/game";
import { setGame as setOperatorGame } from "../../models/core/operator";
import { getGameById, getOperator } from "../../sessions";
import joinedGameAnnouncement from "../announcements/joined_game";

export function joinGameMessage(socket: Socket, { gameId }: { gameId: string }) {
    let game = getGameById(gameId);
    if(!game) {
        return socket.emit("message", { "error": "Game not found"})
    }
    const operator = getOperator(socket)
    if(operator.game) {
        transferOperatorOrEnd(operator.game, operator);
    }
    game = join(game, operator);
    setOperatorGame(operator, game);
    joinedGameAnnouncement(game, operator);

}