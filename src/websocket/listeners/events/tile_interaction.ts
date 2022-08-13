import { Socket } from "socket.io";
import { getOperator, setGame } from "../../../sessions";
import { at } from "../../../models/map/map";
import styleTileAnnouncement from "../announcements/style_tile";
import actionsForTileAnnouncement from "../announcements/actions_for_tile";
import tileInteractionAnnouncement from "../announcements/tile_interaction";

export enum Modes { Hovering, Select, Passive, Clear, Point }
export function tileInteraction(socket: Socket, { x, y, mode, sig, }: { x: number, y: number, mode: string, sig: string }) {
    console.log('tileInteraction', mode, sig);
    const map = {
        'hover': Modes.Hovering,
        'select': Modes.Select,
    }
    const operator = getOperator(socket);
    const game = operator.game;
    const tile = at(game.activeMission.map, x, y);
    game.operators.forEach(o => {
        styleTileAnnouncement(o, tile, operator, mode, sig);
    });
    if(mode !== 'hover') {
        actionsForTileAnnouncement(operator, tile, map[mode], sig);
        game.operators.forEach(o => {
            tileInteractionAnnouncement(o, tile, operator, map[mode], sig);
        });
    }
}
