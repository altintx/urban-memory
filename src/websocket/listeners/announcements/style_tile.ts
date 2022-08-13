import { Operator, serializeOperator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { serializeTile, Tile } from "../../../models/map/tile";

export default function styleTileAnnouncement(operator: Operator, tile: Tile, announcer: Operator, mode: string, sig: string) {
    console.log('styleTileAnnouncement');
    operator.socket.emit("style_tile", {
        tile: serializeTile(tile),
        mode: mode,
        announcer: serializeOperator(announcer),
        sig: sig
    });
}