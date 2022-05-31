import { Operator } from "../../models/core/operator";
import { Game } from "../../models/game";

export default function joinedGameAnnouncement(game: Game, operator: Operator) {
    game.operators.filter(o => o !== operator).map(existingOperator => {
        existingOperator.socket.emit("operator_joined", {
            name: operator.name
        });
    });
    operator.socket.emit("you_joined_game", { gameId: game.gameId })
}