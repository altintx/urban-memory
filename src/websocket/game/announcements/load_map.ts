import { Operator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { Map } from "../../../models/map/map";

export function loadMapAnnouncement(game: Game, map: Map, operator: Operator) {
    game.operators.filter(o => o !== operator).map(existingOperator => {
        existingOperator.socket.emit("load_map", map);
    });
}

export default loadMapAnnouncement;