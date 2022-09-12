import { Operator } from "../../../models/characters/operator";
import { Game, serializeGame } from "../../../models/game";

export default function gameStateAnnouncement(game: Game, operator: Operator, sig = null) {
    if(sig) {
        operator.socket.emit("game_state", serializeGame(game), sig);
    } else {
        operator.socket.emit("game_state", serializeGame(game));
    }
}