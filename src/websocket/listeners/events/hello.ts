import { Socket } from "socket.io";
import helloAnnouncement from "../announcements/hello";

export function helloMessage(socket: Socket) {
    helloAnnouncement(socket);
}
