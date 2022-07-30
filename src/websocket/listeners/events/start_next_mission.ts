import { Socket } from "socket.io";
import { spawn } from "../../../models/missions/mission";
import { getOperator, setGame } from "../../../sessions";
import missionInfoAnnouncement from "../announcements/mission_info";

export function startNextMission(socket: Socket, { missionIndex = 0 }: { missionIndex: number }) {
    const operator = getOperator(socket);
    const game = operator.game;
    const mission = game.activeMission = operator.game.campaign.missions[missionIndex];
    let involved = game.workingSquad.concat(mission.enemies);
    spawn(mission, involved);
    setGame(game);
    game.operators.forEach(o => {
        missionInfoAnnouncement(game.activeMission, o)
    });
}
