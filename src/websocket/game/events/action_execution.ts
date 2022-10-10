import { Socket } from "socket.io";
import { actionForId } from '../../../models/actions';
import { Character } from "../../../models/characters/character";
import { Operator } from "../../../models/characters/operator";
import { at } from "../../../models/map/map";
import { nextCharacterInTurn } from "../../../models/missions/mission";
import { setGame } from "../../../sessions";
import { memberTurnAnnouncement } from "../announcements/member_turn";
import missionInfoAnnouncement from "../announcements/mission_info";

export async function actionExecution(socket: Socket, { actionId, x1, y1, x2, y2, sig }: { actionId: string, x1: number, y1: number, x2: number, y2: number, sig: string }, operator: Operator) {
    const action = actionForId(actionId);
    const game = operator.game;
    const mission = game.activeMission;
    const source = at(mission.map, x1, y1);
    const destination = at(mission.map, x2, y2);

    if(!action || !mission || !source || !destination) return;

    const character = <Character>source.occupant

    character.ap = 2; // AP needs stored on mission

    if (action.ap > character.ap) {
        return; 
    }

    if(action.available(source, destination, action, mission)) {
        try {
            setGame(action.execute(source, destination, action, mission, game));
            character.ap -= action.ap;
            if(character.ap === 0) {
                nextCharacterInTurn(mission, game);
                memberTurnAnnouncement(game, mission.turns[mission.turn]);
            }
            game.operators.forEach(sendTo => {
                missionInfoAnnouncement(mission, sendTo);
            });    
            socket.emit("action_done", { actionId, sig });
        } catch (error) {
            invalidMoveAnnouncement(socket, operator, sig);
        }
    } else {
        invalidMoveAnnouncement(socket, operator, sig);
    }
}
function invalidMoveAnnouncement(socket: Socket, operator: Operator, sig: string) {
    socket.emit("action_error", { sig });
}

