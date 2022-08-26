import { Operator, serializeOperator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { serializeTile, Tile } from "../../../models/map/tile";

export default function tileInteractionAnnouncement(operator: Operator, tile: Tile | Tile[], announcer: Operator, mode: string, sig: string) {
    if('length' in tile) {
        operator.socket.emit("tile_interaction", {
            tiles: tile.map(tile => serializeTile(tile)),
            mode: mode,
            announcer: serializeOperator(announcer),
            sig: sig
        });
    } else {
        operator.socket.emit("tile_interaction", {
            tile: serializeTile(tile),
            mode: mode,
            announcer: serializeOperator(announcer),
            sig: sig
        });
    }
}