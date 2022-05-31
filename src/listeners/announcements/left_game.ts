import { Operator } from "../../models/core/operator";
import { Game } from "../../models/game";

export default function leftGameAnnouncement(game: Game, operator: Operator) {
    game.operators.filter(o => o !== operator).map(existingOperator => {
        existingOperator.socket.emit("operator_left", {
            name: operator.name
        });
    });
}