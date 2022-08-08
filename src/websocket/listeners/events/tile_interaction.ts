import { Socket } from "socket.io";
import { getOperator, setGame } from "../../../sessions";
import { at } from "../../../models/map/map";
import missionInfoAnnouncement from "../announcements/mission_info";
import styleTileAnnouncement from "../announcements/style_tile";

export enum Modes { Hovering, Selected, Passive, Clear, Point }
export function tileInteraction(socket: Socket, { x, y, mode, }: { x: number, y: number, mode: string }) {
    const operator = getOperator(socket);
    const game = operator.game;
    const tile = at(game.activeMission.map, x, y);
    game.operators.forEach(o => {
        styleTileAnnouncement(o, tile, operator, mode);
    });
}
