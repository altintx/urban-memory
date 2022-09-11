import { Socket } from "socket.io";
import { join, transferOperatorOrEnd } from "../../../models/game";
import { setGame as setOperatorGame } from "../../../models/characters/operator";
import { getGameById, getOperator } from "../../../sessions";
import joinedGameAnnouncement from "../announcements/joined_game";
import gameNotFoundAnnouncement from "../announcements/game_not_found";
import notLoggedInAnnouncement from "../announcements/not_logged_in";

export async function joinGameMessage(socket: Socket, { gameId }: { gameId: string }) {
    console.log('joinGameMessage', gameId);
    const operator = await getOperator(socket)
    if(!operator) notLoggedInAnnouncement(socket);
    let game = await getGameById(gameId);
    if(!game) return gameNotFoundAnnouncement(operator);
    
    if(operator.game) {
        transferOperatorOrEnd(operator.game, operator);
    }
    game = await join(game, operator);
    setOperatorGame(operator, game);
    joinedGameAnnouncement(game, operator);

}