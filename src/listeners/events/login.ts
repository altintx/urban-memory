import { Socket } from "socket.io";
import { newOperator } from "../../models/core/operator";
import { registerOperator } from "../../sessions";
import loggedInAnnouncement from "../announcements/logged_in";

export function loginMessage(socket: Socket, { name }: { name: string }) {
    const operator = newOperator(socket, name);
    registerOperator(operator);
    loggedInAnnouncement(operator);
}