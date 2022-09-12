import { Socket } from "socket.io";
import { InteractionMode, serializeAction } from "../../../models/action";
import actions, { NAMED_ACTIONS } from "../../../models/actions";
import { SELECT_ATTENTION } from "../../../models/actions/select";
import { Operator } from "../../../models/characters/operator";
import { serializeTile, Tile } from "../../../models/map/tile";

function actionsForSelecting(tile: Tile) {
    return [
        NAMED_ACTIONS.SELECT_ATTENTION,
        NAMED_ACTIONS.ATTACK_PRIMARY,
        NAMED_ACTIONS.ATTACK_SECONDARY,
        NAMED_ACTIONS.MOVE,
        NAMED_ACTIONS.DASH,
    ].map(i => actions[i])
}

function actionsFor(tile: Tile, mode: number) {
    switch(mode) {
        case InteractionMode.Select:
            return actionsForSelecting(tile);
        default: 
            return [];
    }
}

export default function actionsForTileAnnouncement(operator: Operator, tile: Tile, mode: number, sig: string) {
    operator.socket.emit("actions_for_tile", {
        tile: serializeTile(tile),
        mode: mode,
        actions: actionsFor(tile, mode).map(serializeAction),
        sig: sig
    });
}
