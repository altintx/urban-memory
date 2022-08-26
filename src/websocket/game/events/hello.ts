import { Socket } from "socket.io";
import helloAnnouncement from "../announcements/hello";

export function helloMessage(socket: Socket) {
    console.log('helloMessage');
    helloAnnouncement(socket);
}
