import { Socket } from "socket.io";

export default function helloAnnouncement(socket: Socket) {
    socket.emit("hello");
}
