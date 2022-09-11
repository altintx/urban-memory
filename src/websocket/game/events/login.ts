import { Socket } from "socket.io";
import { newOperator } from "../../../models/characters/operator";
import { registerOperator } from "../../../sessions";
import loggedInAnnouncement from "../announcements/logged_in";

export function loginMessage(socket: Socket, { name, uuid }: { name: string, uuid: string }) {
    console.log('loginMessage', name);
    const operator = newOperator(socket, name, uuid);
    registerOperator(operator);
    loggedInAnnouncement(operator);
}