import { Socket } from "socket.io";

export default function notLoggedInAnnouncement(socket: Socket) {
    console.log('notLoggedInAnnouncement');
    return socket.emit("message", { "error": "Not logged in" });
}