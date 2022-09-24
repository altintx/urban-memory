import { Socket } from "socket.io";
import { serializeAction } from "../../../models/action";
import { actionForId } from '../../../models/actions';
import { at } from "../../../models/map/map";
import { getOperator } from "../../../sessions";
import tileInteractionAnnouncement from "../announcements/tile_interaction";

export async function actionIntention(socket: Socket, { actionId, x, y, sig }: { actionId: string, x: number, y: number, sig: string }) {
    const action = actionForId(actionId);
    const operator = await getOperator(socket);
    const game = operator.game;
    const mission = game.activeMission;
    const source = at(mission.map, x, y);

    if(!action || !mission) return;
    
    if(action.hasSecondarySelection) {
        const targets = mission
            .map
            .grid
            .filter(destination => action.available(source, destination, action, mission));
        game.operators.forEach(sendTo => {
            tileInteractionAnnouncement(sendTo, targets, operator, 'possible-destination', sig);
        });
    }
    socket.emit('action_intention', serializeAction(action));
}
