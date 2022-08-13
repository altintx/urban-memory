import { serializeCharacter } from "../../../models/characters/character";
import { Operator } from "../../../models/characters/operator";
import { Mission } from "../../../models/missions/mission";
import { serializeMission } from "../../../models/missions/mission";

export default function missionInfoAnnouncement(mission: Mission, operator: Operator) {
    console.log('missionInfoAnnouncement');
    operator.socket.emit("mission_info", serializeMission(mission));
    operator.socket.emit("characters_info", operator.game.workingSquad.concat(mission.enemies).map(c => serializeCharacter(c)));
}
