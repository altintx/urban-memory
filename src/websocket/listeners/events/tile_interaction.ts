import { Socket } from "socket.io";
import { getOperator, setGame } from "../../../sessions";
import { at } from "../../../models/map/map";
import styleTileAnnouncement from "../announcements/style_tile";

export enum Modes { Hovering, Selected, Passive, Clear, Point }
export function tileInteraction(socket: Socket, { x, y, mode, sig, }: { x: number, y: number, mode: string, sig: string }) {
    const operator = getOperator(socket);
    const game = operator.game;
    const tile = at(game.activeMission.map, x, y);
    game.operators.forEach(o => {
        styleTileAnnouncement(o, tile, operator, mode, sig);
    });
}
