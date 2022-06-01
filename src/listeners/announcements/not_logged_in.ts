import { Socket } from "socket.io";

export default function notLoggedInAnnouncement(socket: Socket) {
    return socket.emit("message", { "error": "Not logged in" });
}