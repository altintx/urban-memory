import { Operator } from "../../models/core/operator";

export default function gameNotFoundAnnouncement(operator: Operator) {
    return operator.socket.emit("message", { "error": "Game not found"})
}