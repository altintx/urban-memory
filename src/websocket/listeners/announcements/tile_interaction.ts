import { Operator, serializeOperator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { serializeTile, Tile } from "../../../models/map/tile";

export default function tileInteractionAnnouncement(operator: Operator, tile: Tile, announcer: Operator, mode: string, sig: string) {
    console.log('tileInteractionAnnouncement');
    operator.socket.emit("tile_interaction", {
        tile: serializeTile(tile),
        mode: mode,
        announcer: serializeOperator(announcer),
        sig: sig
    });
}