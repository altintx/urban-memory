import { Operator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { serializeMission } from "../../../models/missions/mission";

export default function gameStateAnnouncement(game: Game, operator: Operator) {
    operator.socket.emit("game_state", serializeMission(game.activeMission));
}