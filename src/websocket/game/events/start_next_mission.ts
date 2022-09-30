import { Socket } from "socket.io";
import { Operator } from "../../../models/characters/operator";
import { nextCharacterInTurn, nextTurn, spawn } from "../../../models/missions/mission";
import { loadCharacter, setGame } from "../../../sessions";
import { memberTurnAnnouncement } from "../announcements/member_turn";
import missionInfoAnnouncement from "../announcements/mission_info";

export async function startNextMission(socket: Socket, { missionIndex = 0 }: { missionIndex: number }, operator: Operator) {
    let game = operator.game;
    const mission = game.activeMission = operator.game.campaign.missions[missionIndex];
    let involved = (await Promise.all(game.workingSquad.map(u => loadCharacter(u)))).concat(mission.enemies);
    spawn(mission, involved);
    setGame(game); // game.activeMission was assigned
    await nextTurn(mission, game);
    for(let o of game.operators) {
        missionInfoAnnouncement(game.activeMission, o)
    };
    if(!(await memberTurnAnnouncement(game, mission.turns[mission.turn]))) {
        await nextCharacterInTurn(mission, game);
        if(!(await memberTurnAnnouncement(game, mission.turns[mission.turn]))) {
            // throw new Error("Aborting infinite loop");
        }
    }
}
