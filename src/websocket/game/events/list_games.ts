import { Socket } from "socket.io";
import { Visibility } from "../../../models/game";
import { getGames } from "../../../sessions";

export function listGamesMessage(socket: Socket) {
    socket.emit("games_list", getGames(Visibility.Public).map(g => g.gameId))
}