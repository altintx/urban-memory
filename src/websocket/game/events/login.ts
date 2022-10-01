import { Socket } from "socket.io";
import { newOperator } from "../../../models/characters/operator";
import { registerOperator } from "../../../sessions";
import loggedInAnnouncement from "../announcements/logged_in";

export async function loginMessage(socket: Socket, { name, operatorId }: { name: string, operatorId: string }) {
    const operator = newOperator(socket, name, operatorId);
    await registerOperator(operator);
    loggedInAnnouncement(operator);
}