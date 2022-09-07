import { randomUUID } from "crypto";
import { serializeCharacter } from "../../../models/characters/character";
import { serializeOperator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { tileFor } from "../../../models/map/map";
import { Turn } from "../../../models/missions/turn";
import tileInteractionAnnouncement from "./tile_interaction";

export function memberTurnAnnouncement(game: Game, turn: Turn) {
    const character = turn.members[turn.member];
    const memberOperator = character.operator;
    const memberTile = tileFor(game.activeMission.map, character);

    if(!memberOperator) {
        // enemy
        console.error("Enemy turn not implemented");
        return false;
    } else {
        // player
        console.log("Player turn")
    }

    if(!memberTile) {
        throw new Error("Can't activate character as not found on board");
    }

    for (let operator of game.operators) {
        operator.socket.emit("member_turn", { "member": serializeCharacter(character), "operator": serializeOperator(memberOperator) });
        tileInteractionAnnouncement(operator, memberTile, memberOperator, "select", randomUUID());
    }
    return true;
}