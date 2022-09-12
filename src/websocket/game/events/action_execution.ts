import { Socket } from "socket.io";
import all from '../../../models/actions';
import { Character } from "../../../models/characters/character";
import { Operator } from "../../../models/characters/operator";
import { at } from "../../../models/map/map";
import { Tile } from "../../../models/map/tile";
import { nextCharacterInTurn, nextTurn } from "../../../models/missions/mission";
import { getOperator, setGame } from "../../../sessions";
import gameStateAnnouncement from "../announcements/game_state";
import { loadMapAnnouncement } from "../announcements/load_map";
import { memberTurnAnnouncement } from "../announcements/member_turn";
import missionInfoAnnouncement from "../announcements/mission_info";

export async function actionExecution(socket: Socket, { actionId, x1, y1, x2, y2, sig }: { actionId: string, x1: number, y1: number, x2: number, y2: number, sig: string }) {
    const action = all.find(action => action.uuid === actionId);
    const operator = await getOperator(socket);
    const game = operator.game;
    const mission = game.activeMission;
    const source = at(mission.map, x1, y1);
    const destination = at(mission.map, x2, y2);

    if(!action || !mission || !source || !destination) return;

    const character = <Character>source.occupant

    if (action.ap > character.ap) {
        return; 
    }

    if(action.available(source, destination, action, mission)) {
        character.ap -= action.ap;
        setGame(action.execute(source, destination, action, mission, game));
        if(character.ap === 0) {
            nextCharacterInTurn(mission, game);
            memberTurnAnnouncement(game, mission.turns[mission.turn]);
        }
        game.operators.forEach(sendTo => {
            missionInfoAnnouncement(mission, sendTo);
        });
        socket.emit("action_done", { actionId, sig });
    } else {
        invalidMoveAnnouncement(socket, operator, sig);
    }
}
function invalidMoveAnnouncement(socket: Socket, operator: Operator, sig: string) {
    throw new Error("Function not implemented.");
}

