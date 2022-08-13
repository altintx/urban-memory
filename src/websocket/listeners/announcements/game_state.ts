import { Operator } from "../../../models/characters/operator";
import { Game, serializeGame } from "../../../models/game";

export default function gameStateAnnouncement(game: Game, operator: Operator) {
    console.log('gameStateAnnouncement');
    operator.socket.emit("game_state", serializeGame(game));
}