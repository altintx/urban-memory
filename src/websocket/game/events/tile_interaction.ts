import { Socket } from "socket.io";
import { getOperator, setGame } from "../../../sessions";
import { at } from "../../../models/map/map";
import styleTileAnnouncement from "../announcements/style_tile";
import actionsForTileAnnouncement from "../announcements/actions_for_tile";
import tileInteractionAnnouncement from "../announcements/tile_interaction";
import { actionIntention } from "./action_intention";
import ACTIONS, { NAMED_ACTIONS } from "../../../models/actions";

export enum Modes { Hovering, Select, Passive, Clear, Point }
export async function tileInteraction(socket: Socket, { x, y, mode, sig, }: { x: number, y: number, mode: string, sig: string }) {
    const map = {
        'hover': Modes.Hovering,
        'select': Modes.Select,
    }
    const operator = await getOperator(socket);
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
        actionIntention(socket, { actionId: ACTIONS[NAMED_ACTIONS.MOVE].uuid, x, y, sig: null });
    }
}
