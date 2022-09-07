import { Operator } from "../../../models/characters/operator";
import { Game, serializeGame } from "../../../models/game";

export default function gameStateAnnouncement(game: Game, operator: Operator, sig = null) {
    console.log('gameStateAnnouncement');
    if(sig) {
        operator.socket.emit("game_state", serializeGame(game), sig);
    } else {
        operator.socket.emit("game_state", serializeGame(game));
        console.warn("gameStateAnnouncement: sig is null");
    }
}