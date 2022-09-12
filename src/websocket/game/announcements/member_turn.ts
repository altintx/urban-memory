import { randomUUID } from "crypto";
import { InteractionMode } from "../../../models/action";
import ACTIONS, { NAMED_ACTIONS } from "../../../models/actions";
import { serializeCharacter } from "../../../models/characters/character";
import { serializeOperator } from "../../../models/characters/operator";
import { Game } from "../../../models/game";
import { coordinatesForTile, tileFor } from "../../../models/map/map";
import { Turn } from "../../../models/missions/turn";
import { loadCharacter, operatorForCharacter } from "../../../sessions";
import { actionIntention } from "../events/action_intention";
import actionsForTileAnnouncement from "./actions_for_tile";
import tileInteractionAnnouncement from "./tile_interaction";

export async function memberTurnAnnouncement(game: Game, turn: Turn) {
    const characterUuid = turn.members[turn.member];
    const character = await loadCharacter(characterUuid);
    const memberOperator = await operatorForCharacter(character);
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
        console.error("Can't activate character as not found on board");
        return false;
    }

    for (let operator of game.operators) {
        operator.socket.emit("member_turn", { "member": serializeCharacter(character), "operator": serializeOperator(memberOperator) });
        tileInteractionAnnouncement(operator, memberTile, memberOperator, "select", randomUUID());
    }

    actionsForTileAnnouncement(memberOperator, memberTile, InteractionMode.Select, null);
    const [x, y] = coordinatesForTile(game.activeMission.map, memberTile);
    actionIntention(memberOperator.socket, { actionId: ACTIONS[NAMED_ACTIONS.MOVE].uuid, x, y, sig: null });
    return true;
}