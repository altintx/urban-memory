import { Socket } from "socket.io";
import { serializeAction } from "../../../models/action";
import { ATTACK_PRIMARY, ATTACK_SECONDARY, MOVE } from "../../../models/actions";
import { SELECT_ATTENTION, SELECT_SELECT } from "../../../models/actions/select";
import { Operator } from "../../../models/characters/operator";
import { serializeTile, Tile } from "../../../models/map/tile";

enum InteractionMode { Hovering, Selecting }
function actionsForHovering(tile: Tile) {
    return [
        SELECT_SELECT,
        // SELECT_ATTENTION
    ];
}

function actionsForSelecting(tile: Tile) {
    return [
        SELECT_ATTENTION,
        ATTACK_PRIMARY,
        ATTACK_SECONDARY,
        MOVE
    ];
}

function actionsFor(tile: Tile, mode: number) {
    switch(mode) {
        case InteractionMode.Hovering:
            return actionsForHovering(tile);
        case InteractionMode.Selecting:
            return actionsForSelecting(tile);
        default: 
            return [];
    }
}

export default function actionsForTileAnnouncement(operator: Operator, tile: Tile, mode: number, sig: string) {
    console.log('actionsForTileAnnouncement');
    operator.socket.emit("actions_for_tile", {
        tile: serializeTile(tile),
        mode: mode,
        actions: actionsFor(tile, mode).map(serializeAction),
        sig: sig
    });
}
