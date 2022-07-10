import { Socket } from "socket.io";
import { Visibility } from "../../../models/game";
import { getGames, getOperator, setGame } from "../../../sessions";
import missionInfoAnnouncement from "../announcements/mission_info";

export function startNextMission(socket: Socket, { missionIndex = 0 }: { missionIndex: number }) {
    const operator = getOperator(socket);
    const game = operator.game;
    game.activeMission = operator.game.campaign.missions[missionIndex];
    setGame(game);
    game.operators.forEach(o => {
        console.log("notifiying...");
        missionInfoAnnouncement(game.activeMission, o)
    });
}