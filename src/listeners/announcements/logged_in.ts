import { Operator } from "../../models/characters/operator";
import { Game } from "../../models/game";

export default function loggedInAnnouncement(operator: Operator) {
    operator.socket.emit("you_logged_in", { operatorId: operator.operatorId })
}