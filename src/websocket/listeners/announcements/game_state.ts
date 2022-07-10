import { Game } from "../../../models/game";
import { serializeMission } from "../../../models/missions/mission";

export default function gameStateAnnouncement(game: Game) {
    game.operators.map(operator => {
        operator.socket.emit("game_state", serializeMission(game.activeMission));
    });
}