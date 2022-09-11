import { Socket } from "socket.io";
import all from '../../../models/actions';
import { at } from "../../../models/map/map";
import { Tile } from "../../../models/map/tile";
import { getOperator } from "../../../sessions";
import tileInteractionAnnouncement from "../announcements/tile_interaction";

export async function actionIntention(socket: Socket, { actionId, x, y, sig }: { actionId: string, x: number, y: number, sig: string }) {
    console.log('actionIntention', actionId, sig);
    const action = all.find(action => action.uuid === actionId);
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
}
