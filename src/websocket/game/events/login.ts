import { Socket } from "socket.io";
import { newOperator } from "../../../models/characters/operator";
import { registerOperator } from "../../../sessions";
import loggedInAnnouncement from "../announcements/logged_in";

export function loginMessage(socket: Socket, { name }: { name: string }) {
    console.log('loginMessage', name);
    const operator = newOperator(socket, name);
    registerOperator(operator);
    loggedInAnnouncement(operator);
}