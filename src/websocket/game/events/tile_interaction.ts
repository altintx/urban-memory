import { Socket } from "socket.io";
import { at } from "../../../models/map/map";
import styleTileAnnouncement from "../announcements/style_tile";
import actionsForTileAnnouncement from "../announcements/actions_for_tile";
import tileInteractionAnnouncement from "../announcements/tile_interaction";
import { actionIntention } from "./action_intention";
import ACTIONS, { NAMED_ACTIONS } from "../../../models/actions";
import { Operator } from "../../../models/characters/operator";

export enum Modes { Hovering, Select, Passive, Clear, Point }
export async function tileInteraction(socket: Socket, { x, y, mode, sig, }: { x: number, y: number, mode: string, sig: string }, operator: Operator) {
    const map = {
        'hover': Modes.Hovering,
        'select': Modes.Select,
    }    
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
        actionIntention(socket, { actionId: ACTIONS[NAMED_ACTIONS.MOVE].uuid, x, y, sig: null }, operator);
    }
}
