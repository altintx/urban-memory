import { Socket } from "socket.io";
import { nextCharacterInTurn, nextTurn, spawn } from "../../../models/missions/mission";
import { getOperator, setGame } from "../../../sessions";
import { memberTurnAnnouncement } from "../announcements/member_turn";
import missionInfoAnnouncement from "../announcements/mission_info";

export function startNextMission(socket: Socket, { missionIndex = 0 }: { missionIndex: number }) {
    console.log('startNextMission', missionIndex);
    const operator = getOperator(socket);
    let game = operator.game;
    const mission = game.activeMission = operator.game.campaign.missions[missionIndex];
    let involved = game.workingSquad.concat(mission.enemies);
    spawn(mission, involved);
    setGame(game);
    nextTurn(mission, game);
    for(let o of game.operators) {
        missionInfoAnnouncement(game.activeMission, o)
    };
    if(!memberTurnAnnouncement(game, mission.turns[mission.turn])) {
        nextCharacterInTurn(mission, game);
        if(!memberTurnAnnouncement(game, mission.turns[mission.turn])) {
            throw new Error("Aborting infinite loop");
        }
    }
}
