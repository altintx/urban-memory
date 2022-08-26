import { Socket } from "socket.io";
import {parse} from 'accept-language-parser';

export default function helloAnnouncement(socket: Socket) {
    console.log('helloAnnouncement');
    const language = parse(socket.handshake.headers['accept-language']);
    socket.emit("hello", { language: `${language[0].code}-${language[0].region}` });
}
