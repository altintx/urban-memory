import { Operator } from "../../../models/characters/operator";

export default function gameNotFoundAnnouncement(operator: Operator) {
    console.log('gameNotFoundAnnouncement');
    return operator.socket.emit("message", { "error": "Game not found"})
}